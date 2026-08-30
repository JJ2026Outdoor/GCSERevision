import { SUBJECTS } from "./subjects.js";

// Subject identity colours — must match style.css and pass the dataviz
// colour-contrast/CVD checks (validated: PASS with text labels always present
// alongside colour, which every use here satisfies via tab labels/legends).
export const SUBJECT_COLOR = {
  maths: "#2f5fd6",
  science: "#1f9d55",
  english: "#b3541e",
};

const SUBJECT_MILESTONES = [25, 100, 250, 500];
const PERFECT_DAY_TIERS = [
  { name: "Bronze", threshold: 1, css: "bronze" },
  { name: "Silver", threshold: 10, css: "silver" },
  { name: "Gold", threshold: 25, css: "gold" },
  { name: "Platinum", threshold: 50, css: "platinum" },
];

function trophyHTML({ locked, colorVar, tierClass, label, title }) {
  const style = colorVar ? `style="color:${colorVar}"` : "";
  const cls = ["trophy", locked ? "locked" : "", tierClass || ""].filter(Boolean).join(" ");
  return `
    <div class="${cls}" ${style} title="${title}">
      <svg viewBox="0 0 64 64" width="40" height="40" aria-hidden="true">
        <path d="M16 10H6v4c0 8 5 13 10 14" fill="none" stroke="currentColor" stroke-width="3"/>
        <path d="M48 10h10v4c0 8-5 13-10 14" fill="none" stroke="currentColor" stroke-width="3"/>
        <path d="M16 8h32v6c0 10-6 16-14 18v8h8a2 2 0 010 4H22a2 2 0 010-4h8v-8C22 30 16 24 16 14V8z" fill="currentColor"/>
        <rect x="24" y="46" width="16" height="4" rx="1" fill="currentColor"/>
        <rect x="20" y="50" width="24" height="4" rx="1" fill="currentColor"/>
      </svg>
      <div class="trophy-num">${label}</div>
    </div>
  `;
}

function renderTrophyShelf(allResults) {
  function attempted(subjectKey) {
    return allResults
      .filter((r) => r.subject === subjectKey)
      .reduce((sum, r) => sum + (r.answers ? r.answers.length : 0), 0);
  }

  // "Perfect 5-a-day" is deliberately scoped to mode === "daily" only —
  // a 100% on topic practice doesn't count.
  const perfectCount = allResults.filter((r) => r.mode === "daily" && r.percentage === 100).length;

  const subjectTracks = Object.values(SUBJECTS)
    .map((subject) => {
      const count = attempted(subject.key);
      const trophies = SUBJECT_MILESTONES.map((m) => {
        const unlocked = count >= m;
        return trophyHTML({
          locked: !unlocked,
          colorVar: SUBJECT_COLOR[subject.key],
          label: m,
          title: unlocked
            ? `${subject.name}: ${m} questions attempted — unlocked!`
            : `${subject.name}: ${count}/${m} questions attempted`,
        });
      }).join("");
      return `<div class="trophy-track"><div class="trophy-track-label">${subject.name}</div><div class="trophy-row">${trophies}</div></div>`;
    })
    .join("");

  const globalTrophies = PERFECT_DAY_TIERS.map((tier) => {
    const unlocked = perfectCount >= tier.threshold;
    return trophyHTML({
      locked: !unlocked,
      tierClass: tier.css,
      label: tier.threshold,
      title: unlocked
        ? `${tier.name}: ${tier.threshold}+ perfect 5-a-days — unlocked!`
        : `${tier.name}: ${perfectCount}/${tier.threshold} perfect 5-a-days`,
    });
  }).join("");

  return `
    <div class="card trophy-shelf">
      <h3 style="margin-top:0;">🏆 Milestones</h3>
      ${subjectTracks}
      <div class="trophy-track">
        <div class="trophy-track-label">Perfect 5-a-days (${perfectCount} so far)</div>
        <div class="trophy-row">${globalTrophies}</div>
      </div>
    </div>
  `;
}

let trendChart = null;
let topicChart = null;

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function fmtDuration(seconds) {
  if (seconds === undefined || seconds === null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function flattenAnswers(results) {
  const sorted = [...results].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const flat = [];
  sorted.forEach((r) => (r.answers || []).forEach((a) => flat.push(a)));
  return flat;
}

export async function renderDashboardScreen(main, { profile, preselectSubject, getResults, onBack, escapeHtml }) {
  const allResults = await getResults({ profile });
  let selectedSubject = preselectSubject && SUBJECTS[preselectSubject] ? preselectSubject : "all";

  main.innerHTML = `
    <span class="back-link" id="dash-back">&larr; Home</span>
    <div class="card">
      <h2 style="margin-top:0;">Progress dashboard — ${escapeHtml(profile)}</h2>
    </div>
    ${renderTrophyShelf(allResults)}
    <div class="card">
      <div class="dash-tabs" id="dash-tabs">
        <button class="dash-tab" data-subject="all">All subjects</button>
        ${Object.values(SUBJECTS)
          .map((s) => `<button class="dash-tab" data-subject="${s.key}">${s.name}</button>`)
          .join("")}
      </div>
      <div id="dash-body"></div>
    </div>
  `;

  document.getElementById("dash-back").addEventListener("click", onBack);
  const tabButtons = main.querySelectorAll(".dash-tab");

  function setActiveTab() {
    tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.subject === selectedSubject));
  }

  function attachTabHandlers() {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedSubject = btn.dataset.subject;
        setActiveTab();
        renderBody();
      });
    });
  }

  function renderBody() {
    const body = document.getElementById("dash-body");
    const filtered = selectedSubject === "all" ? allResults : allResults.filter((r) => r.subject === selectedSubject);

    if (!allResults.length) {
      body.innerHTML = `<div class="empty-state">No sessions yet. Finish a 5-question session and your progress will show up here.</div>`;
      return;
    }

    const sessionsDone = filtered.length;
    const avg = sessionsDone ? Math.round(filtered.reduce((s, r) => s + r.percentage, 0) / sessionsDone) : 0;
    const best = sessionsDone ? Math.max(...filtered.map((r) => r.percentage)) : 0;
    const durations = filtered.map((r) => r.durationSeconds).filter((d) => d !== undefined && d !== null);
    const avgDuration = durations.length ? Math.round(durations.reduce((s, d) => s + d, 0) / durations.length) : null;

    body.innerHTML = `
      <div class="stat-row">
        <div class="stat-box"><div class="num">${sessionsDone}</div><div class="lbl">Sessions done</div></div>
        <div class="stat-box"><div class="num">${avg}%</div><div class="lbl">Average score</div></div>
        <div class="stat-box"><div class="num">${best}%</div><div class="lbl">Best score</div></div>
      </div>
      ${avgDuration !== null ? `<div class="stat-row" style="grid-template-columns: 1fr;"><div class="stat-box"><div class="num">⏱ ${fmtDuration(avgDuration)}</div><div class="lbl">Average time per 5 questions</div></div></div>` : ""}
      <div class="chart-wrap"><canvas id="trend-canvas" height="180"></canvas></div>
      ${selectedSubject !== "all" ? `<div class="chart-wrap" id="topic-wrap"><h4 style="margin:0 0 10px 0;">Accuracy by topic</h4><div id="topic-bars"></div></div>` : ""}
      <div class="card" style="margin-top:0;">
        <h3 style="margin-top:0;">Recent attempts</h3>
        <div class="history-list">${renderHistory(filtered)}</div>
      </div>
    `;

    renderTrendChart(filtered, selectedSubject);
    if (selectedSubject !== "all") renderTopicBars(filtered, selectedSubject);
  }

  function renderHistory(filtered) {
    if (!filtered.length) return `<div class="empty-state">No attempts yet in this view.</div>`;
    const recent = [...filtered].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 15);
    return recent
      .map((r) => {
        const subject = SUBJECTS[r.subject];
        return `
        <div class="history-row">
          <div>
            <strong>${escapeHtml(subject ? subject.name : r.subject)}</strong> — ${escapeHtml(r.sessionTitle || "")}
            <div style="color:var(--muted); font-size:0.78rem;">${fmtDate(r.timestamp)} · ⏱ ${fmtDuration(r.durationSeconds)}</div>
          </div>
          <div class="pct" style="color:${SUBJECT_COLOR[r.subject] || "var(--text)"}">${r.percentage}%</div>
        </div>
      `;
      })
      .join("");
  }

  function renderTrendChart(filtered, subjectKey) {
    const canvas = document.getElementById("trend-canvas");
    if (!canvas) return;
    if (trendChart) {
      trendChart.destroy();
      trendChart = null;
    }
    if (!filtered.length) return;

    // x = attempt number (1, 2, 3...) rather than calendar date — avoids
    // needing a date-adapter dependency, and handles subjects with different
    // numbers of attempts cleanly. The actual date is kept on each point for
    // the tooltip.
    function toSeries(results) {
      return [...results]
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map((r, i) => ({ x: i + 1, y: r.percentage, timestamp: r.timestamp }));
    }

    let datasets;
    if (subjectKey === "all") {
      datasets = Object.values(SUBJECTS)
        .map((s) => ({
          label: s.name,
          data: toSeries(allResults.filter((r) => r.subject === s.key)),
          borderColor: SUBJECT_COLOR[s.key],
          backgroundColor: SUBJECT_COLOR[s.key],
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.25,
        }))
        .filter((d) => d.data.length);
    } else {
      datasets = [
        {
          label: SUBJECTS[subjectKey].name,
          data: toSeries(filtered),
          borderColor: SUBJECT_COLOR[subjectKey],
          backgroundColor: SUBJECT_COLOR[subjectKey],
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.25,
        },
      ];
    }

    const maxAttempts = Math.max(1, ...datasets.map((d) => d.data.length));

    trendChart = new Chart(canvas.getContext("2d"), {
      type: "line",
      data: { datasets },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "linear",
            min: 1,
            max: Math.max(2, maxAttempts),
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { stepSize: 1, callback: (v) => (Number.isInteger(v) ? `#${v}` : "") },
            title: { display: true, text: "Attempt number" },
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { callback: (v) => v + "%" },
          },
        },
        plugins: {
          legend: { display: subjectKey === "all", labels: { usePointStyle: true } },
          tooltip: {
            callbacks: {
              title: (items) => (items.length && items[0].raw.timestamp ? fmtDate(items[0].raw.timestamp) : ""),
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
            },
          },
        },
      },
    });
  }

  function renderTopicBars(filtered, subjectKey) {
    const wrap = document.getElementById("topic-bars");
    if (!wrap) return;
    const subject = SUBJECTS[subjectKey];
    // Grouped from individual answers (not whole sessions), so a topic gets
    // credit for questions it appeared in during "Today's 5 (mixed)" too,
    // not just dedicated topic-practice sessions.
    const flat = flattenAnswers(filtered);
    const byTopic = {};
    flat.forEach((a) => {
      if (!byTopic[a.topicId]) byTopic[a.topicId] = { correct: 0, total: 0 };
      byTopic[a.topicId].total += 1;
      if (a.correct) byTopic[a.topicId].correct += 1;
    });
    const rows = subject.topics.map((t) => {
      const agg = byTopic[t.id];
      const avg = agg ? Math.round((agg.correct / agg.total) * 100) : null;
      return { title: t.title, avg, count: agg ? agg.total : 0 };
    });

    wrap.innerHTML = rows
      .map(
        (r) => `
      <div class="topic-bar-row">
        <div class="topic-name">${r.title}</div>
        <div class="topic-bar-track"><div class="topic-bar-fill" style="width:${r.avg ?? 0}%; background:${SUBJECT_COLOR[subjectKey]}"></div></div>
        <div class="topic-bar-pct">${r.avg === null ? "—" : r.avg + "%"}</div>
      </div>
    `
      )
      .join("");
  }

  attachTabHandlers();
  setActiveTab();
  renderBody();
}    
