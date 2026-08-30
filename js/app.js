import { SUBJECTS, buildSession, hasDoneDailyToday, flattenAnswers, computeTopicLevel, GRADES } from "./subjects.js";
import { initStorage, getMode, getCurrentProfile, setCurrentProfile, saveResult, getResults, getAllProfiles } from "./storage.js";
import { isCorrect, correctAnswerDisplay, userAnswerDisplay } from "./marking.js";
import { Stopwatch, formatTime } from "./timer.js";
import { renderDashboardScreen, SUBJECT_COLOR } from "./dashboard.js";
import { GLOSSARY } from "../data/glossary.js";
import { ASSESSOR_PIN } from "../firebase-config.js";

const WEAK_STREAK_THRESHOLD = 3;

const main = document.getElementById("main");
const profilePill = document.getElementById("profile-pill");
const homeLink = document.getElementById("home-link");

// ---------- dyslexia-friendly display toggle ----------
// A per-device display preference (not tied to a profile or synced) — swaps
// in a dyslexia-tailored font (Lexend) plus roomier spacing and a softer,
// off-white background instead of stark white/black. See style.css's
// .dyslexia-mode block for the actual overrides.
const DYSLEXIA_KEY = "gcse_dyslexia_mode_v1";

function applyDyslexiaMode(on) {
  document.body.classList.toggle("dyslexia-mode", on);
  const btn = document.getElementById("dyslexia-toggle");
  if (btn) btn.setAttribute("aria-pressed", String(on));
}

function initDyslexiaToggle() {
  let stored = "0";
  try {
    stored = localStorage.getItem(DYSLEXIA_KEY) || "0";
  } catch (err) {
    // localStorage can be unavailable (e.g. private browsing); just default off.
  }
  applyDyslexiaMode(stored === "1");
  document.getElementById("dyslexia-toggle").addEventListener("click", () => {
    const isOn = !document.body.classList.contains("dyslexia-mode");
    applyDyslexiaMode(isOn);
    try {
      localStorage.setItem(DYSLEXIA_KEY, isOn ? "1" : "0");
    } catch (err) {
      // Best-effort only — the toggle still works for this page view.
    }
  });
}
initDyslexiaToggle();

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

// In-page modal for entering a profile name, replacing window.prompt().
// Native prompt()/confirm()/alert() dialogs are unreliable across browsers —
// notably, Safari on iOS can silently suppress all future prompt() calls
// after a user (even accidentally) ticks "Prevent this page from creating
// additional dialogs", after which prompt() returns null with no dialog
// shown at all, and there is no way for the page to detect or undo that.
// A same-page modal (same overlay pattern as the glossary/calculator) has
// no such failure mode and is also more accessible — it's keyboard- and
// screen-reader-navigable, unlike the native prompt, which some
// accessibility tools handle inconsistently.
function showProfileNameModal(existingName) {
  return new Promise((resolve) => {
    const existingOverlay = document.getElementById("profile-name-overlay");
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "profile-name-overlay";
    overlay.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <strong>Who's revising?</strong>
        </div>
        <label for="profile-name-input" style="display:block; font-size:0.85rem; color:var(--muted); margin-bottom:8px;">Enter a name</label>
        <input type="text" class="text-answer" id="profile-name-input" autocomplete="off" placeholder="e.g. Alex" value="${existingName ? escapeHtml(existingName) : ""}" />
        <button class="btn block" id="profile-name-save">Save</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById("profile-name-input");
    input.focus();
    input.select();

    function submit() {
      const clean = input.value.trim();
      overlay.remove();
      resolve(clean || existingName || "Guest");
    }

    document.getElementById("profile-name-save").addEventListener("click", submit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submit();
    });
    // Deliberately no click-outside-to-close and no close (✕) button here,
    // unlike the glossary/calculator modals — a profile name is required to
    // use the app at all (mirrors the old prompt(), which couldn't be
    // dismissed without a value either), so this modal always resolves via
    // Save or Enter.
  });
}

async function promptForProfile() {
  const existing = getCurrentProfile();
  const finalName = await showProfileNameModal(existing);
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

// Used when a question doesn't have its own `hint` (shouldn't normally
// happen, but keeps the help button useful for anything added later without
// one).
function genericHint(q) {
  if (q.type === "mcq") {
    return "Read each option carefully and rule out any that are clearly wrong before picking one.";
  }
  return "Read the question slowly, note down what you're given, and think about exactly what it's asking you to find.";
}

// ---------- question charts (graph-reading questions) ----------
//
// Any question can carry an optional `chart` field — { type: "line" | "bar"
// | "pie" | "scatter", labels: [...] (omit for scatter), datasets: [{
// label?, data: [...] }], xLabel?, yLabel? } — and gets rendered above the
// prompt via Chart.js (already loaded for the dashboard). A scatter
// dataset's `data` is an array of {x, y} points instead of a plain value
// array, matching Chart.js's own scatter format. A single-series line/bar/
// scatter uses that subject's identity colour; a pie or multi-series chart
// uses a small fixed colour-blind-safe categorical order (never cycled,
// same rule as the dashboard) so a 2nd/3rd series is always the same hue,
// not re-picked.
const CHART_CATEGORICAL = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4"];

// Every Chart.js instance currently on screen, so we can destroy() them
// before wiping main.innerHTML — otherwise old chart objects keep a
// reference to a canvas that no longer exists in the page.
let activeCharts = [];
function destroyActiveCharts() {
  activeCharts.forEach((c) => c && c.destroy());
  activeCharts = [];
}

function buildChartConfig(subjectKey, chart) {
  const isPie = chart.type === "pie";
  const isScatter = chart.type === "scatter";
  const multiSeries = chart.datasets.length > 1;
  const dyslexia = document.body.classList.contains("dyslexia-mode");
  Chart.defaults.font.family = dyslexia ? "'Lexend', sans-serif" : "system-ui, -apple-system, sans-serif";
  Chart.defaults.font.size = dyslexia ? 13 : 12;

  const datasets = chart.datasets.map((ds, i) => {
    if (isPie) {
      return {
        label: ds.label || "",
        data: ds.data,
        backgroundColor: chart.labels.map((_, j) => CHART_CATEGORICAL[j % CHART_CATEGORICAL.length]),
        borderColor: "#ffffff",
        borderWidth: 2,
      };
    }
    const color = multiSeries ? CHART_CATEGORICAL[i % CHART_CATEGORICAL.length] : SUBJECT_COLOR[subjectKey] || "#2a78d6";
    if (isScatter) {
      return {
        label: ds.label || "",
        data: ds.data,
        showLine: false,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 5,
      };
    }
    return {
      label: ds.label || "",
      data: ds.data,
      borderColor: color,
      backgroundColor: chart.type === "line" ? "transparent" : color,
      borderWidth: chart.type === "line" ? 3 : 0,
      pointRadius: chart.type === "line" ? 4 : 0,
      pointBackgroundColor: color,
      tension: 0.15,
      borderRadius: chart.type === "bar" ? 4 : 0,
    };
  });

  const xScale = {
    title: { display: !!chart.xLabel, text: chart.xLabel || "" },
    grid: { color: "rgba(0,0,0,0.06)" },
  };
  if (isScatter) xScale.type = "linear";

  return {
    type: isScatter ? "scatter" : chart.type,
    data: isScatter ? { datasets } : { labels: chart.labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 250 },
      plugins: {
        legend: { display: isPie || multiSeries, labels: { boxWidth: 12 } },
        tooltip: { enabled: true },
      },
      scales: isPie
        ? {}
        : {
            x: xScale,
            y: {
              title: { display: !!chart.yLabel, text: chart.yLabel || "" },
              grid: { color: "rgba(0,0,0,0.06)" },
              beginAtZero: !isScatter,
            },
          },
    },
  };
}

function renderChartCanvas(canvasId, subjectKey, chart) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const instance = new Chart(canvas.getContext("2d"), buildChartConfig(subjectKey, chart));
  activeCharts.push(instance);
  return instance;
}

// A lightweight overlay (not a full screen change) so it can be opened from
// mid-question without losing her place or resetting the stopwatch. Shows
// every term for the subject, filtered live by a search box.
function showGlossaryModal(subjectKey) {
  const terms = GLOSSARY[subjectKey] || [];
  const existing = document.getElementById("glossary-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "glossary-overlay";
  overlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <strong>📖 ${escapeHtml(SUBJECTS[subjectKey].name)} key words</strong>
        <button class="modal-close" id="glossary-close" aria-label="Close">✕</button>
      </div>
      <input type="text" class="text-answer" id="glossary-search" placeholder="Search a word…" autocomplete="off" style="margin-bottom:12px;" />
      <div class="glossary-list" id="glossary-list"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const listEl = document.getElementById("glossary-list");
  function renderList(filter) {
    const f = filter.trim().toLowerCase();
    const filtered = terms.filter((t) => !f || t.term.toLowerCase().includes(f) || t.definition.toLowerCase().includes(f));
    listEl.innerHTML = filtered.length
      ? filtered.map((t) => `<div class="glossary-item"><strong>${escapeHtml(t.term)}</strong><div>${escapeHtml(t.definition)}</div></div>`).join("")
      : `<div class="empty-state">No matching words.</div>`;
  }
  renderList("");

  document.getElementById("glossary-search").addEventListener("input", (e) => renderList(e.target.value));
  document.getElementById("glossary-close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// Basic four-function calculator, maths only. Same overlay pattern as the
// glossary modal — a lightweight non-blocking popup, not a screen change.
function showCalculatorModal() {
  const existing = document.getElementById("calculator-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "calculator-overlay";
  overlay.innerHTML = `
    <div class="modal-card calculator-card">
      <div class="modal-header">
        <strong>🧮 Calculator</strong>
        <button class="modal-close" id="calc-close" aria-label="Close">✕</button>
      </div>
      <input type="text" class="text-answer calc-display" id="calc-display" readonly value="0" />
      <div class="calc-grid">
        ${["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "=", "+"]
          .map((k) => `<button class="calc-key ${"÷×−+=".includes(k) ? "calc-op" : ""}" data-key="${k}">${k}</button>`)
          .join("")}
        <button class="calc-key calc-clear" data-key="C">C</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  let expr = "";
  const display = document.getElementById("calc-display");

  function render() {
    display.value = expr === "" ? "0" : expr;
  }

  function toEvalString(s) {
    return s.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
  }

  overlay.querySelectorAll(".calc-key").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      if (key === "C") {
        expr = "";
      } else if (key === "=") {
        try {
          // Only digits, ., and the four operators reach here — expr is
          // built exclusively from this keypad, never free text input.
          const result = Function(`"use strict"; return (${toEvalString(expr)})`)();
          expr = Number.isFinite(result) ? String(Math.round(result * 1e10) / 1e10) : "Error";
        } catch {
          expr = "Error";
        }
      } else {
        if (expr === "Error") expr = "";
        expr += key;
      }
      render();
    });
  });

  document.getElementById("calc-close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
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

// ---------- STREAK CALENDAR ----------

// A simple current-month grid on the home screen: a tick for any day with at
// least one completed session (any subject), a small dot for a day that was
// missed. "Missed" only applies from her first-ever session onward — days
// before she started aren't counted against her, and future days (including
// today, until she's done something) are left neutral rather than flagged.
function buildCalendarHtml(results) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0

  const doneDates = new Set(results.map((r) => new Date(r.timestamp).toDateString()));
  const timestamps = results.map((r) => new Date(r.timestamp).getTime());
  const firstSessionDay = timestamps.length ? new Date(Math.min(...timestamps)).toDateString() : null;
  const firstSessionTime = timestamps.length ? new Date(firstSessionDay).getTime() : null;

  let cells = "";
  for (let i = 0; i < startWeekday; i++) cells += `<div class="cal-cell empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = date.toDateString();
    const isToday = dateStr === now.toDateString();
    const isFuture = date.getTime() > new Date(now.toDateString()).getTime();
    const done = doneDates.has(dateStr);
    const beforeStart = firstSessionTime === null || date.getTime() < firstSessionTime;

    let cls = "cal-cell";
    let marker = "";
    if (isFuture) {
      cls += " future";
    } else if (done) {
      cls += " done";
      marker = "✅";
    } else if (!beforeStart) {
      cls += " missed";
      marker = "●";
    }
    if (isToday) cls += " today";
    cells += `<div class="${cls}"><span class="cal-day">${d}</span><span class="cal-marker">${marker}</span></div>`;
  }

  const monthLabel = now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return `
    <div class="card">
      <h3 style="margin-top:0;">${escapeHtml(monthLabel)}</h3>
      <div class="cal-weekdays">${["M", "T", "W", "T", "F", "S", "S"].map((d) => `<div>${d}</div>`).join("")}</div>
      <div class="cal-grid">${cells}</div>
      <div class="cal-legend"><span>✅ Practised</span><span>● Missed</span></div>
    </div>
  `;
}

// ---------- HOME ----------

async function renderHome() {
  destroyActiveCharts();
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
    ${buildCalendarHtml(results)}
    <button class="btn secondary" id="dashboard-btn">📈 View progress dashboard</button>
    <div class="assessor-link" id="assessor-link">🔍 Assessor / parent view</div>
  `;

  main.querySelectorAll("[data-subject]").forEach((btn) => {
    btn.addEventListener("click", () => renderSubject(btn.dataset.subject));
  });
  document.getElementById("assessor-link").addEventListener("click", openAssessorView);
  document.getElementById("dashboard-btn").addEventListener("click", () => renderDashboard());
}

// ---------- SUBJECT (mixed CTA + topic picker) ----------

async function renderSubject(subjectKey) {
  destroyActiveCharts();
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
      const level = GRADES[computeTopicLevel(flat, topic.id)];
      return `
        <div class="test-row" data-topic="${topic.id}">
          <div>
            <div><strong>${escapeHtml(topic.title)}</strong> <span class="grade-badge grade-${level}" title="Current level — questions here are drawn around this grade">${level}</span></div>
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
    <div class="nav-row">
      <button class="btn secondary" id="dashboard-btn">📈 Dashboard</button>
      <button class="btn secondary" id="glossary-btn">📖 Key words</button>
    </div>
  `;

  document.getElementById("back-home").addEventListener("click", renderHome);
  document.getElementById("dashboard-btn").addEventListener("click", () => renderDashboard(subjectKey));
  document.getElementById("glossary-btn").addEventListener("click", () => showGlossaryModal(subjectKey));
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
  destroyActiveCharts();
  const session = state.session;
  const q = session.questions[state.qIndex];
  const total = session.questions.length;
  const pct = Math.round((state.qIndex / total) * 100);
  const savedAnswer = state.answers[q.id];

  const passageHtml = q.passage ? `<div class="passage-box">${escapeHtml(q.passage)}</div>` : "";
  const chartHtml = q.chart ? `<div class="chart-wrap"><canvas id="question-chart"></canvas></div>` : "";
  const paperBadgeHtml = q.source ? `<span class="paper-badge" title="${escapeHtml(q.source.label)} — ${escapeHtml(q.source.paper)}">${escapeHtml(q.source.code)} paper</span>` : "";
  const hintText = q.hint || genericHint(q);

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
    ${chartHtml}
    <p class="question-prompt">${escapeHtml(q.prompt)}</p>
    <div class="help-row">
      <button class="btn secondary small" id="help-btn" type="button">🤔 Need help?</button>
      <button class="btn secondary small" id="glossary-btn" type="button">📖 Key words</button>
      ${state.subjectKey === "maths" ? `<button class="btn secondary small" id="calc-btn" type="button">🧮 Calculator</button>` : ""}
    </div>
    <div class="hint-box" id="hint-box" hidden>${escapeHtml(hintText)}</div>
    ${answerHtml}
    <div class="nav-row">
      <button class="btn" id="next-btn">${isLast ? "Finish" : "Next question"}</button>
    </div>
  `;
  updateClock(state.stopwatch.elapsed);
  if (q.chart) renderChartCanvas("question-chart", state.subjectKey, q.chart);

  const helpBtn = document.getElementById("help-btn");
  const hintBox = document.getElementById("hint-box");
  helpBtn.addEventListener("click", () => {
    hintBox.hidden = !hintBox.hidden;
    helpBtn.textContent = hintBox.hidden ? "🤔 Need help?" : "🙈 Hide hint";
  });
  document.getElementById("glossary-btn").addEventListener("click", () => showGlossaryModal(state.subjectKey));
  const calcBtn = document.getElementById("calc-btn");
  if (calcBtn) calcBtn.addEventListener("click", showCalculatorModal);

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
      grade: q.grade || null,
      chart: q.chart || null,
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
    // Stores the full question text and explanation alongside each answer
    // (not just the questionId) so a session stays fully reviewable later —
    // in the assessor view, or if this question ever changes or is removed
    // from the data files down the line — without needing to re-look it up
    // from live content.
    answers: details.map(({ questionId, topicId, topicTitle, prompt, correct, userAnswerDisplay: u, correctAnswerDisplay: c, explanation, source, grade, chart }) => ({
      questionId,
      topicId,
      topicTitle,
      prompt,
      correct,
      userAnswer: u,
      correctAnswer: c,
      explanation,
      source,
      grade,
      chart,
    })),
  };

  // Work out which topics got harder as a direct result of this session, by
  // comparing each touched topic's level before vs. after — used for a small
  // "levelled up" callout on the results screen.
  const touchedTopicIds = [...new Set(details.map((d) => d.topicId))];
  const flatBefore = flattenAnswers(priorResults);
  const flatAfter = flattenAnswers([...priorResults, record]);
  const leveledUp = touchedTopicIds
    .map((topicId) => ({
      topicId,
      topicTitle: details.find((d) => d.topicId === topicId).topicTitle,
      before: computeTopicLevel(flatBefore, topicId),
      after: computeTopicLevel(flatAfter, topicId),
    }))
    .filter((t) => t.after > t.before);

  await saveResult(record);

  const weakTopics = computeWeakTopics(flatAfter).filter((w) => w.streak >= WEAK_STREAK_THRESHOLD);

  renderResults(record, details, { previousBest, previousLast, weakTopic: weakTopics[0] || null, leveledUp });
}

// ---------- RESULTS ----------

const GRADE_DESCRIPTIONS = {
  GG: "Easiest band — basic recall",
  FF: "Easy",
  EE: "Medium",
  DD: "Harder",
  CC: "Hardest band — top of Foundation tier",
};

function renderResults(record, details, { previousBest, previousLast, weakTopic, leveledUp = [] }) {
  destroyActiveCharts();
  let improvementHtml = "";
  if (previousLast !== null) {
    const delta = record.percentage - previousLast;
    const arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "→";
    const color = delta > 0 ? "var(--good)" : delta < 0 ? "var(--bad)" : "var(--muted)";
    improvementHtml = `<div style="color:${color}; font-weight:700; margin-top:6px;">${arrow} ${delta > 0 ? "+" : ""}${delta}% vs last time${previousBest !== null ? ` (best so far: ${previousBest}%)` : ""}</div>`;
  } else {
    improvementHtml = `<div style="color:var(--muted); margin-top:6px;">First time doing this one — nice work getting started!</div>`;
  }

  const levelUpHtml = leveledUp.length
    ? `
      <div class="card" style="border-left: 5px solid var(--good);">
        🎉 ${leveledUp.map((t) => `<strong>${escapeHtml(t.topicTitle)}</strong> levelled up to grade ${GRADES[t.after]}`).join(", ")} — the next questions on ${leveledUp.length === 1 ? "that topic" : "those topics"} will be a little tougher.
      </div>
    `
    : "";

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
      (d, i) => `
      <div class="result-item ${d.correct ? "correct" : "incorrect"}">
        <div class="tag">${d.correct ? "Correct" : "Incorrect"} · ${escapeHtml(d.topicTitle)} ${
        d.grade ? `<span class="grade-badge grade-${d.grade}" title="${escapeHtml(GRADE_DESCRIPTIONS[d.grade] || "")}">${d.grade}</span>` : ""
      } ${
        d.source ? `<span class="paper-badge" title="${escapeHtml(d.source.label)} — ${escapeHtml(d.source.paper)}">${escapeHtml(d.source.code)} paper</span>` : ""
      }</div>
        <div style="font-weight:600; margin-top:4px;">${escapeHtml(d.prompt)}</div>
        ${!d.correct && d.chart ? `<div class="chart-wrap result-chart-wrap"><canvas id="result-chart-${i}"></canvas></div>` : ""}
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
    ${levelUpHtml}
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

  details.forEach((d, i) => {
    if (!d.correct && d.chart) renderChartCanvas(`result-chart-${i}`, record.subject, d.chart);
  });

  document.getElementById("retry-btn").addEventListener("click", () => startSession(state.subjectKey, { mode: record.mode, topicId: record.topicId }));
  document.getElementById("subject-btn").addEventListener("click", () => renderSubject(state.subjectKey));
  const weakBtn = document.getElementById("practice-weak-btn");
  if (weakBtn) {
    weakBtn.addEventListener("click", () => startSession(state.subjectKey, { mode: "topic", topicId: weakTopic.topicId }));
  }
}

// ---------- ASSESSOR / PARENT VIEW ----------
//
// A read-only screen for seeing every profile's full session history,
// question by question — not just the aggregate stats the dashboard shows.
// It's gated behind a single shared PIN set in firebase-config.js (see
// ASSESSOR_PIN there) — the SAME PIN on every device, not one each device
// invents for itself on first use (that would let anyone who opens the
// link set their own PIN and walk straight in). This is still NOT real
// security: it's a plain-text password sitting in a public file, readable
// by anyone who views the page source. It stops a casual visitor clicking
// their way in; it does not stop someone who goes looking for it. In
// cloud-sync mode all profiles already share one Firestore collection with
// no per-profile access rules, so this view doesn't reveal anything that
// wasn't already reachable in principle — it just makes it usable.

function openAssessorView() {
  if (!ASSESSOR_PIN || ASSESSOR_PIN === "CHANGE_ME") {
    window.alert(
      "The assessor view needs a PIN set before it can be used.\n\nOpen firebase-config.js, change ASSESSOR_PIN from \"CHANGE_ME\" to whatever you like, then upload it."
    );
    return;
  }
  const entered = window.prompt("Enter the assessor PIN:");
  if (entered === null) return;
  if (entered !== ASSESSOR_PIN) {
    window.alert("Incorrect PIN.");
    return;
  }
  renderAssessorProfiles();
}

async function renderAssessorProfiles() {
  destroyActiveCharts();
  main.innerHTML = `<div class="empty-state">Loading profiles…</div>`;
  const profiles = await getAllProfiles();

  if (!profiles.length) {
    main.innerHTML = `
      <span class="back-link" id="back-home">&larr; Back</span>
      <div class="empty-state">No sessions recorded yet for any profile.</div>
    `;
    document.getElementById("back-home").addEventListener("click", renderHome);
    return;
  }

  const rows = await Promise.all(
    profiles.map(async (name) => {
      const results = await getResults({ profile: name });
      const avg = results.length ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length) : null;
      return `
        <div class="test-row" data-profile="${escapeHtml(name)}">
          <div>
            <div><strong>${escapeHtml(name)}</strong></div>
            <div class="meta">${results.length} session${results.length === 1 ? "" : "s"}${avg !== null ? ` · avg ${avg}%` : ""}</div>
          </div>
        </div>
      `;
    })
  );

  main.innerHTML = `
    <span class="back-link" id="back-home">&larr; Back</span>
    <div class="card">
      <h2 style="margin-top:0;">Assessor view</h2>
      <div style="color:var(--muted); font-size:0.88rem; margin-top:-8px;">Pick a profile to see its full session-by-session history.</div>
      <div class="test-list" style="margin-top:14px;">${rows.join("")}</div>
    </div>
  `;
  document.getElementById("back-home").addEventListener("click", renderHome);
  main.querySelectorAll("[data-profile]").forEach((row) => {
    row.addEventListener("click", () => renderAssessorProfile(row.dataset.profile));
  });
}

async function renderAssessorProfile(profileName) {
  destroyActiveCharts();
  const initializedSessions = new Set();
  main.innerHTML = `<div class="empty-state">Loading…</div>`;
  const results = (await getResults({ profile: profileName })).slice().reverse(); // newest first

  const sessionRows = results
    .map((r, i) => {
      const date = new Date(r.timestamp).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
      const subjectName = SUBJECTS[r.subject] ? SUBJECTS[r.subject].name : r.subject;
      return `
        <div class="card assessor-session">
          <div class="assessor-session-head" data-toggle="${i}">
            <div>
              <strong>${escapeHtml(subjectName)}</strong> — ${escapeHtml(r.sessionTitle)}
              <div class="meta">${escapeHtml(date)} · ${formatTime(r.durationSeconds || 0)}</div>
            </div>
            <div class="pct" style="font-weight:800;">${r.percentage}%</div>
          </div>
          <div class="assessor-session-body" id="assessor-body-${i}" hidden>
            ${(r.answers || [])
              .map(
                (a, j) => `
              <div class="result-item ${a.correct ? "correct" : "incorrect"}">
                <div class="tag">${a.correct ? "Correct" : "Incorrect"} · ${escapeHtml(a.topicTitle || "")} ${
                  a.grade ? `<span class="grade-badge grade-${a.grade}">${a.grade}</span>` : ""
                } ${a.source ? `<span class="paper-badge">${escapeHtml(a.source.code)} paper</span>` : ""}</div>
                <div style="font-weight:600; margin-top:4px;">${escapeHtml(a.prompt || "(question text not recorded for this older session)")}</div>
                ${a.chart ? `<div class="chart-wrap result-chart-wrap"><canvas id="assessor-chart-${i}-${j}"></canvas></div>` : ""}
                <div class="answers">Answer given: <strong>${escapeHtml(a.userAnswer)}</strong>${
                  a.correct ? "" : `<br/>Correct answer: <strong>${escapeHtml(a.correctAnswer)}</strong>`
                }</div>
                ${a.explanation ? `<div class="explanation">${escapeHtml(a.explanation)}</div>` : ""}
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");

  main.innerHTML = `
    <span class="back-link" id="back-assessor">&larr; All profiles</span>
    <div class="card">
      <h2 style="margin-top:0;">${escapeHtml(profileName)}</h2>
      <div style="color:var(--muted); font-size:0.88rem; margin-top:-8px;">${results.length} session${results.length === 1 ? "" : "s"} recorded — tap one to see every question and answer.</div>
    </div>
    ${sessionRows || `<div class="empty-state">No sessions yet.</div>`}
  `;

  document.getElementById("back-assessor").addEventListener("click", renderAssessorProfiles);
  main.querySelectorAll("[data-toggle]").forEach((head) => {
    head.addEventListener("click", () => {
      const i = head.dataset.toggle;
      const body = document.getElementById(`assessor-body-${i}`);
      body.hidden = !body.hidden;
      // Charts can't size themselves correctly while their container is
      // hidden (display:none), so they're only built the first time a
      // session is expanded, not up-front for every session on the page.
      if (!body.hidden && !initializedSessions.has(i)) {
        initializedSessions.add(i);
        (results[i].answers || []).forEach((a, j) => {
          if (a.chart) renderChartCanvas(`assessor-chart-${i}-${j}`, results[i].subject, a.chart);
        });
      }
    });
  });
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
