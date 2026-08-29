import { SUBJECTS, buildSession, hasDoneDailyToday } from "./subjects.js";
import { initStorage, getMode, getCurrentProfile, setCurrentProfile, saveResult, getResults } from "./storage.js";
import { isCorrect, correctAnswerDisplay, userAnswerDisplay } from "./marking.js";
import { Stopwatch, formatTime } from "./timer.js";
import { renderDashboardScreen } from "./dashboard.js";

const WEAK_STREAK_THRESHOLD = 3;

const main = document.getElementById("main");
const profilePill = document.getElementById("profile-pill");
const homeLink = document.getElementById("home-link");

const state = {
  profile: null,
  subjectKey: null,
  session: null, // { mode, topicId, title, questions }
  qIndex: 0,
  answers: {},
  stopwatch: null,
};

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function updateProfilePill() {
  const badge = getMode() === "cloud" ? '<span class="sync-badge cloud">Synced</span>' : '<span class="sync-badge local">This device</span>';
  profilePill.innerHTML = `${escapeHtml(state.profile || "Choose profile")} ${badge}`;
}

async function promptForProfile() {
  const existing = getCurrentProfile();
  const name = window.prompt("Who's revising? (e.g. Dad, or your name)", existing || "");
  const clean = (name || "").trim();
  const finalName = clean || existing || "Guest";
  setCurrentProfile(finalName);
  state.profile = finalName;
  updateProfilePill();
}

profilePill.addEventListener("click", async () => {
  await promptForProfile();
  renderHome();
});

homeLink.addEventListener("click", () => renderHome());

async function boot() {
  const { mode } = await initStorage();
  if (mode === "local") {
    console.info("Using on-device storage. Add a firebase-config.js to sync between devices — see README.md.");
  }
  const existing = getCurrentProfile();
  if (existing) {
    state.profile = existing;
  } else {
    await promptForProfile();
  }
  updateProfilePill();
  renderHome();
}

// ---------- shared helpers ----------

function flattenAnswers(results) {
  const sorted = [...results].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const flat = [];
  sorted.forEach((r) => (r.answers || []).forEach((a) => flat.push(a)));
  return flat;
}

// Trailing wrong-streak per topic: how many times in a row (most recent
// first) a question from that topic was answered incorrectly.
function computeWeakTopics(flatAnswers) {
  const byTopic = {};
  flatAnswers.forEach((a) => {
    if (!byTopic[a.topicId]) byTopic[a.topicId] = [];
    byTopic[a.topicId].push(a);
  });
  const streaks = [];
  Object.entries(byTopic).forEach(([topicId, list]) => {
    let streak = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      if (!list[i].correct) streak += 1;
      else break;
    }
    if (streak > 0) streaks.push({ topicId, topicTitle: list[list.length - 1].topicTitle, streak });
  });
  return streaks.sort((a, b) => b.streak - a.streak);
}

// ---------- HOME ----------

async function renderHome() {
  main.innerHTML = `<div class="empty-state">Loading your progress…</div>`;
  const results = await getResults({ profile: state.profile });

  const subjectCards = Object.values(SUBJECTS)
    .map((subject) => {
      const subjectResults = results.filter((r) => r.subject === subject.key);
      let subtitle = "No sessions yet";
      if (subjectResults.length) {
        const avg = Math.round(subjectResults.reduce((sum, r) => sum + r.percentage, 0) / subjectResults.length);
        subtitle = `${subjectResults.length} session${subjectResults.length === 1 ? "" : "s"} · avg ${avg}%`;
      }
      return `
        <button class="subject-card ${subject.className}" data-subject="${subject.key}">
          <h3>${subject.name}</h3>
          <p>${subtitle}</p>
        </button>
      `;
    })
    .join("");

  main.innerHTML = `
    <div class="card">
      <div>
        <strong>Hi ${escapeHtml(state.profile)} 👋</strong>
        <div style="color:var(--muted); font-size:0.85rem; margin-top:2px;">Pick a subject — 5 random questions, however long it takes</div>
      </div>
      <div class="subject-grid">${subjectCards}</div>
    </div>
    <button class="btn secondary" id="dashboard-btn">📈 View progress dashboard</button>
  `;

  main.querySelectorAll("[data-subject]").forEach((btn) => {
    btn.addEventListener("click", () => renderSubject(btn.dataset.subject));
  });
  document.getElementById("dashboard-btn").addEventListener("click", () => renderDashboard());
}

// ---------- SUBJECT (mixed CTA + topic picker) ----------

async function renderSubject(subjectKey) {
  const subject = SUBJECTS[subjectKey];
  state.subjectKey = subjectKey;
  main.innerHTML = `<div class="empty-state">Loading…</div>`;
  const results = await getResults({ profile: state.profile, subject: subjectKey });
  const doneToday = hasDoneDailyToday(results, subjectKey);
  const flat = flattenAnswers(results);

  const byTopic = {};
  flat.forEach((a) => {
    if (!byTopic[a.topicId]) byTopic[a.topicId] = { correct: 0, total: 0 };
    byTopic[a.topicId].total += 1;
    if (a.correct) byTopic[a.topicId].correct += 1;
  });

  const topicRows = subject.topics
    .map((topic) => {
      const stat = byTopic[topic.id];
      const meta = stat ? `${Math.round((stat.correct / stat.total) * 100)}% accuracy · ${stat.total} answered` : "Not tried yet";
      return `
        <div class="test-row" data-topic="${topic.id}">
          <div>
            <div><strong>${escapeHtml(topic.title)}</strong></div>
            <div class="meta">${meta}</div>
          </div>
        </div>
      `;
    })
    .join("");

  const topicSectionHtml = doneToday
    ? `
      <div class="card">
        <h3 style="margin-top:0;">Or practice one topic</h3>
        <div class="test-list">${topicRows}</div>
      </div>
    `
    : `
      <div class="card locked-card">
        <h3 style="margin-top:0;">🔒 Topic practice</h3>
        <div style="color:var(--muted); font-size:0.9rem;">Finish today's 5 first to unlock picking a topic.</div>
      </div>
    `;

  main.innerHTML = `
    <span class="back-link" id="back-home">&larr; All subjects</span>
    <div class="card">
      <h2 style="margin-top:0;">${subject.name}</h2>
      <div style="color:var(--muted); font-size:0.88rem; margin-top:-8px;">${subject.fullName}</div>
      <button class="btn block" id="daily-btn" style="margin-top:16px;">🔀 Today's 5 (mixed topics)</button>
      ${doneToday ? `<div style="text-align:center; color:var(--muted); font-size:0.8rem; margin-top:6px;">✅ Already done today — do it again anytime</div>` : ""}
    </div>
    ${topicSectionHtml}
    <button class="btn secondary" id="dashboard-btn">📈 View progress dashboard</button>
  `;

  document.getElementById("back-home").addEventListener("click", renderHome);
  document.getElementById("dashboard-btn").addEventListener("click", () => renderDashboard(subjectKey));
  document.getElementById("daily-btn").addEventListener("click", () => startSession(subjectKey, { mode: "daily" }));
  if (doneToday) {
    main.querySelectorAll("[data-topic]").forEach((row) => {
      row.addEventListener("click", () => startSession(subjectKey, { mode: "topic", topicId: row.dataset.topic }));
    });
  }
}

// ---------- SESSION RUNNER ----------

async function startSession(subjectKey, { mode, topicId }) {
  const priorResults = await getResults({ profile: state.profile, subject: subjectKey });
  // Topic practice is gated behind finishing today's mixed 5 first — enforce
  // it here too, not just in the UI, in case this is reached some other way
  // (e.g. a future deep link).
  if (mode === "topic" && !hasDoneDailyToday(priorResults, subjectKey)) {
    renderSubject(subjectKey);
    return;
  }
  const session = buildSession(subjectKey, { mode, topicId }, priorResults);
  state.subjectKey = subjectKey;
  state.session = session;
  state.qIndex = 0;
  state.answers = {};
  if (state.stopwatch) state.stopwatch.stop();
  state.stopwatch = new Stopwatch({ onTick: updateClock });
  renderQuestion();
  state.stopwatch.start();
}

function updateClock(elapsed) {
  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.textContent = formatTime(elapsed);
}

function renderQuestion() {
  const session = state.session;
  const q = session.questions[state.qIndex];
  const total = session.questions.length;
  const pct = Math.round((state.qIndex / total) * 100);
  const savedAnswer = state.answers[q.id];

  const passageHtml = q.passage ? `<div class="passage-box">${escapeHtml(q.passage)}</div>` : "";
  const paperBadgeHtml = q.source ? `<span class="paper-badge" title="${escapeHtml(q.source.label)} — ${escapeHtml(q.source.paper)}">${escapeHtml(q.source.code)} paper</span>` : "";

  let answerHtml = "";
  if (q.type === "mcq") {
    answerHtml = `<div class="option-list">${q.options
      .map((opt, i) => `<button class="option-btn ${savedAnswer === i ? "selected" : ""}" data-index="${i}">${escapeHtml(opt)}</button>`)
      .join("")}</div>`;
  } else {
    answerHtml = `<input type="text" class="text-answer" id="short-answer" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer" value="${savedAnswer !== undefined ? escapeHtml(savedAnswer) : ""}" />`;
  }

  const isLast = state.qIndex === total - 1;

  main.innerHTML = `
    <div class="timer-bar">
      <div>⏱ <span class="clock" id="clock">0:00</span></div>
      <div style="color:var(--muted); font-size:0.85rem;">${escapeHtml(q.topicTitle || session.title)}</div>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="question-number-row">
      <div class="question-number">Question ${state.qIndex + 1} of ${total}</div>
      ${paperBadgeHtml}
    </div>
    ${passageHtml}
    <p class="question-prompt">${escapeHtml(q.prompt)}</p>
    ${answerHtml}
    <div class="nav-row">
      <button class="btn" id="next-btn">${isLast ? "Finish" : "Next question"}</button>
    </div>
  `;
  updateClock(state.stopwatch.elapsed);

  if (q.type === "mcq") {
    main.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.answers[q.id] = Number(btn.dataset.index);
        main.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });
  } else {
    const input = document.getElementById("short-answer");
    input.addEventListener("input", () => {
      state.answers[q.id] = input.value;
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("next-btn").click();
    });
    input.focus();
  }

  document.getElementById("next-btn").addEventListener("click", () => {
    if (isLast) {
      finishSession();
    } else {
      state.qIndex += 1;
      renderQuestion();
    }
  });
}

async function finishSession() {
  const durationSeconds = state.stopwatch ? state.stopwatch.stop() : 0;
  const session = state.session;

  const details = session.questions.map((q) => {
    const userAnswer = state.answers[q.id];
    const correct = isCorrect(q, userAnswer);
    return {
      questionId: q.id,
      topicId: q.topicId,
      topicTitle: q.topicTitle,
      prompt: q.prompt,
      correct,
      userAnswerDisplay: userAnswerDisplay(q, userAnswer),
      correctAnswerDisplay: correctAnswerDisplay(q),
      explanation: q.explanation,
      source: q.source || null,
    };
  });
  const score = details.filter((d) => d.correct).length;
  const total = details.length;
  const percentage = Math.round((score / total) * 100);

  const priorResults = await getResults({ profile: state.profile, subject: state.subjectKey });
  const priorMatching = priorResults.filter((r) => r.mode === session.mode && r.topicId === session.topicId);
  const previousBest = priorMatching.length ? Math.max(...priorMatching.map((r) => r.percentage)) : null;
  const previousLast = priorMatching.length ? priorMatching[priorMatching.length - 1].percentage : null;

  const record = {
    profile: state.profile,
    subject: state.subjectKey,
    mode: session.mode,
    topicId: session.topicId,
    sessionTitle: session.title,
    score,
    total,
    percentage,
    durationSeconds,
    timestamp: new Date().toISOString(),
    answers: details.map(({ questionId, topicId, topicTitle, correct, userAnswerDisplay: u, correctAnswerDisplay: c }) => ({
      questionId,
      topicId,
      topicTitle,
      correct,
      userAnswer: u,
      correctAnswer: c,
    })),
  };

  await saveResult(record);

  const weakTopics = computeWeakTopics(flattenAnswers([...priorResults, record])).filter((w) => w.streak >= WEAK_STREAK_THRESHOLD);

  renderResults(record, details, { previousBest, previousLast, weakTopic: weakTopics[0] || null });
}

// ---------- RESULTS ----------

function renderResults(record, details, { previousBest, previousLast, weakTopic }) {
  let improvementHtml = "";
  if (previousLast !== null) {
    const delta = record.percentage - previousLast;
    const arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "→";
    const color = delta > 0 ? "var(--good)" : delta < 0 ? "var(--bad)" : "var(--muted)";
    improvementHtml = `<div style="color:${color}; font-weight:700; margin-top:6px;">${arrow} ${delta > 0 ? "+" : ""}${delta}% vs last time${previousBest !== null ? ` (best so far: ${previousBest}%)` : ""}</div>`;
  } else {
    improvementHtml = `<div style="color:var(--muted); margin-top:6px;">First time doing this one — nice work getting started!</div>`;
  }

  const recommendationHtml =
    weakTopic && weakTopic.topicId
      ? `
      <div class="card" style="border-left: 5px solid var(--bad);">
        <strong>⚠️ ${escapeHtml(weakTopic.topicTitle)}</strong> has been wrong ${weakTopic.streak} times in a row.
        <div style="margin-top:10px;">
          <button class="btn" id="practice-weak-btn">Practise ${escapeHtml(weakTopic.topicTitle)} now (5 more)</button>
        </div>
      </div>
    `
      : "";

  const items = details
    .map(
      (d) => `
      <div class="result-item ${d.correct ? "correct" : "incorrect"}">
        <div class="tag">${d.correct ? "Correct" : "Incorrect"} · ${escapeHtml(d.topicTitle)} ${
        d.source ? `<span class="paper-badge" title="${escapeHtml(d.source.label)} — ${escapeHtml(d.source.paper)}">${escapeHtml(d.source.code)} paper</span>` : ""
      }</div>
        <div style="font-weight:600; margin-top:4px;">${escapeHtml(d.prompt)}</div>
        <div class="answers">Your answer: <strong>${escapeHtml(d.userAnswerDisplay)}</strong>${
          d.correct ? "" : `<br/>Correct answer: <strong>${escapeHtml(d.correctAnswerDisplay)}</strong>`
        }</div>
        ${!d.correct ? `<div class="explanation">${escapeHtml(d.explanation)}</div>` : ""}
      </div>
    `
    )
    .join("");

  main.innerHTML = `
    <div class="card score-hero">
      <div class="big">${record.percentage}%</div>
      <div class="sub">${record.score} out of ${record.total} correct — ${escapeHtml(record.sessionTitle)}</div>
      <div style="color:var(--muted); margin-top:4px;">⏱ Completed in ${formatTime(record.durationSeconds)}</div>
      ${improvementHtml}
    </div>
    ${recommendationHtml}
    <div class="card">
      <h3 style="margin-top:0;">Review your answers</h3>
      ${items}
    </div>
    <div class="nav-row">
      <button class="btn secondary" id="retry-btn">Do 5 more like this</button>
      <button class="btn" id="subject-btn">Back to ${escapeHtml(SUBJECTS[state.subjectKey].name)}</button>
    </div>
  `;

  document.getElementById("retry-btn").addEventListener("click", () => startSession(state.subjectKey, { mode: record.mode, topicId: record.topicId }));
  document.getElementById("subject-btn").addEventListener("click", () => renderSubject(state.subjectKey));
  const weakBtn = document.getElementById("practice-weak-btn");
  if (weakBtn) {
    weakBtn.addEventListener("click", () => startSession(state.subjectKey, { mode: "topic", topicId: weakTopic.topicId }));
  }
}

// ---------- DASHBOARD ----------

async function renderDashboard(preselectSubject) {
  main.innerHTML = `<div class="empty-state">Loading dashboard…</div>`;
  await renderDashboardScreen(main, {
    profile: state.profile,
    preselectSubject,
    getResults,
    onBack: renderHome,
    escapeHtml,
  });
}

boot();
