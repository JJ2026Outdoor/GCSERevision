import {
  SUBJECTS,
  buildSession,
  hasDoneDailyToday,
  flattenAnswers,
  computeTopicLevel,
  GRADES,
  getAvailablePapers,
  pickExamPaper,
  timeAllowedMinutes,
  UNCONFIRMED_TIME_ALLOWED_PAPER_KEYS
} from "./subjects.js";
import { initStorage, getMode, getCurrentProfile, setCurrentProfile, saveResult, getResults, getAllProfiles, getProfileSettings, setProfileSettings } from "./storage.js";
import { isCorrect, correctAnswerDisplay, userAnswerDisplay, optionLabel, classifyAngleDeg } from "./marking.js";
import { Stopwatch, formatTime } from "./timer.js";
import { renderDashboardScreen, SUBJECT_COLOR } from "./dashboard.js";
import { GLOSSARY } from "../data/glossary.js";
import { ASSESSOR_PIN } from "../firebase-config.js";

const WEAK_STREAK_THRESHOLD = 3;

// ---------- exam mode: Saturday rotation ----------
//
// A 4-week rotation starting the first Saturday of October each year: week 1
// = Maths, week 2 = Science, week 3 = English, week 4 = a rest week (no exam
// offered at all). Only ever offered on a Saturday, and only from the
// rotation's start date onward — every other day, and every Saturday before
// it starts, offers nothing. One shared calendar (not per-profile).
const EXAM_ROTATION_START = new Date(2026, 9, 3); // 3 Oct 2026 — first Saturday of October 2026
const EXAM_ROTATION_SUBJECTS = ["maths", "science", "english", null]; // null = rest week

function examRotationSubjectFor(date) {
  if (date.getDay() !== 6) return null; // Saturdays only (0 = Sunday ... 6 = Saturday)
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (dayStart < EXAM_ROTATION_START) return null;
  const daysSince = Math.round((dayStart - EXAM_ROTATION_START) / 86400000);
  const weekIndex = Math.floor(daysSince / 7) % EXAM_ROTATION_SUBJECTS.length;
  return EXAM_ROTATION_SUBJECTS[weekIndex];
}

const main = document.getElementById("main");
const profilePill = document.getElementById("profile-pill");
const homeLink = document.getElementById("home-link");

const BACKGROUND_THEMES = [
  { key: "default", label: "Default", swatchClass: "default" },
  { key: "cream", label: "Cream", swatchClass: "cream" },
  { key: "blue", label: "Soft blue", swatchClass: "blue" },
  { key: "green", label: "Soft green", swatchClass: "green" },
  { key: "grey", label: "Soft grey", swatchClass: "grey" },
  { key: "dark", label: "Dark", swatchClass: "dark" },
];

// Applies one profile's display settings (dyslexia font, background theme)
// to the page. Read-aloud isn't a page-wide style, so it isn't applied here
// — it's checked per-question from state.profileSettings instead.
function applyDisplaySettings(settings) {
  document.body.classList.toggle("dyslexia-mode", !!settings.dyslexia);
  BACKGROUND_THEMES.forEach((t) => document.body.classList.remove(`bg-theme-${t.key}`));
  document.body.classList.add(`bg-theme-${settings.background || "default"}`);
}

const state = {
  profile: null,
  profileSettings: { dyslexia: false, background: "default", audioHelp: false },
  subjectKey: null,
  session: null, // { mode, topicId, title, questions }
  qIndex: 0,
  answers: {},
  // Per-question "did she use this?" flags for the current session, keyed by
  // question id — surfaced to the parent/assessor view (see finishSession()
  // and renderAssessorProfile()) so a parent can see which answers had help,
  // not just which were right or wrong. Reset alongside state.answers at the
  // start of every session (startSession()).
  helpUsed: {},
  audioUsed: {},
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
function showProfileNameModal(existingName, existingSettings) {
  const settings = existingSettings || { dyslexia: false, background: "default", audioHelp: false };
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
        <div class="profile-modal-field">
          <label for="profile-name-input" style="display:block; font-size:0.85rem; color:var(--muted); margin-bottom:8px;">Enter a name</label>
          <input type="text" class="text-answer" id="profile-name-input" autocomplete="off" placeholder="e.g. Alex" value="${existingName ? escapeHtml(existingName) : ""}" />
        </div>

        <div class="profile-modal-field">
          <label class="profile-modal-checkbox">
            <input type="checkbox" id="profile-dyslexia-check" ${settings.dyslexia ? "checked" : ""} />
            Dyslexia-friendly font and spacing
          </label>
          <label class="profile-modal-checkbox">
            <input type="checkbox" id="profile-audio-check" ${settings.audioHelp ? "checked" : ""} />
            Add a "read aloud" button on questions
          </label>
        </div>

        <div class="profile-modal-field">
          <div style="font-size:0.85rem; color:var(--muted); margin-bottom:4px;">Background</div>
          <div class="profile-theme-swatches" id="profile-theme-swatches">
            ${BACKGROUND_THEMES.map(
              (t) => `<button type="button" class="theme-swatch ${t.swatchClass} ${t.key === settings.background ? "selected" : ""}" data-theme="${t.key}" title="${t.label}" aria-label="${t.label}"></button>`
            ).join("")}
          </div>
        </div>

        <button class="btn block" id="profile-name-save">Save</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById("profile-name-input");
    input.focus();
    input.select();

    let selectedTheme = settings.background || "default";
    const swatchWrap = document.getElementById("profile-theme-swatches");
    swatchWrap.querySelectorAll(".theme-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedTheme = btn.dataset.theme;
        swatchWrap.querySelectorAll(".theme-swatch").forEach((b) => b.classList.toggle("selected", b === btn));
        // Live preview so the choice can be judged against the actual app,
        // not just a small swatch — reverted if Save isn't pressed (below).
        applyDisplaySettings({ dyslexia: document.getElementById("profile-dyslexia-check").checked, background: selectedTheme });
      });
    });
    document.getElementById("profile-dyslexia-check").addEventListener("change", (e) => {
      applyDisplaySettings({ dyslexia: e.target.checked, background: selectedTheme });
    });

    function submit() {
      const clean = input.value.trim();
      const finalName = clean || existingName || "Guest";
      const finalSettings = {
        dyslexia: document.getElementById("profile-dyslexia-check").checked,
        audioHelp: document.getElementById("profile-audio-check").checked,
        background: selectedTheme,
      };
      overlay.remove();
      resolve({ name: finalName, settings: finalSettings });
    }

    document.getElementById("profile-name-save").addEventListener("click", submit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submit();
    });
    // Deliberately no click-outside-to-close and no close (✕) button here,
    // unlike the glossary/calculator modals — a profile name is required to
    // use the app at all (mirrors the old prompt(), which couldn't be
    // dismissed without a value either), so this modal always resolves via
    // Save or Enter. If closed some other way (e.g. browser back), the live
    // preview above could be left applied without saving — acceptable here
    // since applyDisplaySettings() is always re-run from saved settings on
    // the next profile load/switch anyway.
  });
}

async function promptForProfile() {
  const existing = getCurrentProfile();
  const existingSettings = existing ? getProfileSettings(existing) : undefined;
  const { name, settings } = await showProfileNameModal(existing, existingSettings);
  setCurrentProfile(name);
  setProfileSettings(name, settings);
  state.profile = name;
  state.profileSettings = settings;
  applyDisplaySettings(settings);
  updateProfilePill();
}

profilePill.addEventListener("click", async () => {
  await promptForProfile();
  renderHome();
});

// The header "Aa" button now opens the same settings modal for whichever
// profile is currently active — a quick way to adjust display/audio
// settings without re-entering the name from scratch.
const dyslexiaToggleBtn = document.getElementById("dyslexia-toggle");
if (dyslexiaToggleBtn) {
  dyslexiaToggleBtn.addEventListener("click", async () => {
    await promptForProfile();
    renderHome();
  });
}

homeLink.addEventListener("click", () => renderHome());

async function boot() {
  const { mode } = await initStorage();
  if (mode === "local") {
    console.info("Using on-device storage. Add a firebase-config.js to sync between devices — see README.md.");
  }
  const existing = getCurrentProfile();
  if (existing) {
    state.profile = existing;
    state.profileSettings = getProfileSettings(existing);
    applyDisplaySettings(state.profileSettings);
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

// ---------- number-line questions (draggable marker) ----------
//
// A question can carry `type: "numberline"` instead of "mcq"/"short", with a
// `numberline` field: { min, max, step?, correct, tolerance, correctLabel?,
// ticks?: [{ value, label }], unitLabel? }. The learner drags (or taps, or
// arrow-keys while focused) a marker along a horizontal track; the answer
// stored is the snapped numeric value under the marker when they last moved
// it. `tolerance` is how far either side of `correct` still counts — the
// skill being tested is roughly locating a value on a scale, not landing on
// a single pixel, so this app's questions should always set a sensible
// tolerance (e.g. ±0.05 on a 0–1 probability scale) rather than 0.
//
// All the drag/keyboard listeners below are attached to elements created by
// this same render pass (inside #main), the same pattern every other
// question type already uses — so like the mcq option buttons and the
// short-answer input, they're automatically discarded (no manual cleanup
// needed) the next time renderQuestion() replaces main.innerHTML.
function clampNumberLine(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function snapNumberLine(value, min, step) {
  if (!step) return value;
  const snapped = Math.round((value - min) / step) * step + min;
  // Rounds away floating-point noise like 0.30000000000000004.
  return Math.round(snapped * 1e9) / 1e9;
}

function renderNumberLineHtml(nl, savedAnswer) {
  const initial = savedAnswer !== undefined ? savedAnswer : (nl.min + nl.max) / 2;
  const ticks = nl.ticks && nl.ticks.length ? nl.ticks : [{ value: nl.min, label: String(nl.min) }, { value: nl.max, label: String(nl.max) }];
  const ticksHtml = ticks
    .map((t) => {
      const pct = ((t.value - nl.min) / (nl.max - nl.min)) * 100;
      return `<div class="numberline-tick" style="left:${pct}%"><span class="numberline-tick-mark"></span><span class="numberline-tick-label">${escapeHtml(t.label)}</span></div>`;
    })
    .join("");
  return `
    <div class="numberline-wrap">
      <div class="numberline-value" id="nl-value">${savedAnswer !== undefined ? escapeHtml(`${savedAnswer}${nl.unitLabel ? " " + nl.unitLabel : ""}`) : "Drag the marker onto the line"}</div>
      <div class="numberline-track" id="nl-track">
        <div class="numberline-fill" id="nl-fill"></div>
        ${ticksHtml}
        <div class="numberline-marker" id="nl-marker" tabindex="0" role="slider" aria-valuemin="${nl.min}" aria-valuemax="${nl.max}" aria-valuenow="${initial}" aria-label="Answer position on the number line"></div>
      </div>
    </div>
  `;
}

function setupNumberLine(q, savedAnswer) {
  const nl = q.numberline;
  const track = document.getElementById("nl-track");
  const marker = document.getElementById("nl-marker");
  const fill = document.getElementById("nl-fill");
  const valueLabel = document.getElementById("nl-value");
  const hasAnswer = savedAnswer !== undefined;
  let value = hasAnswer ? savedAnswer : (nl.min + nl.max) / 2;

  function paint(answered) {
    const pct = ((value - nl.min) / (nl.max - nl.min)) * 100;
    marker.style.left = `${pct}%`;
    fill.style.width = `${pct}%`;
    marker.setAttribute("aria-valuenow", String(value));
    valueLabel.textContent = answered ? `${value}${nl.unitLabel ? " " + nl.unitLabel : ""}` : "Drag the marker onto the line";
  }

  // Only writes state.answers[q.id] once the learner actually moves the
  // marker — the starting position drawn at the midpoint (or wherever a
  // previous visit left it) is just a visual default, not an answer, so
  // leaving a question untouched still correctly counts as "no answer
  // given" rather than silently marking a guess right or wrong.
  function commit(newValue) {
    value = newValue;
    state.answers[q.id] = value;
    paint(true);
  }

  paint(hasAnswer);

  function valueFromClientX(clientX) {
    const rect = track.getBoundingClientRect();
    const fraction = clampNumberLine((clientX - rect.left) / rect.width, 0, 1);
    const raw = nl.min + fraction * (nl.max - nl.min);
    return snapNumberLine(clampNumberLine(raw, nl.min, nl.max), nl.min, nl.step);
  }

  let dragging = false;
  track.addEventListener("pointerdown", (e) => {
    dragging = true;
    track.setPointerCapture(e.pointerId);
    commit(valueFromClientX(e.clientX));
    e.preventDefault();
  });
  track.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    commit(valueFromClientX(e.clientX));
  });
  const endDrag = (e) => {
    dragging = false;
    if (track.hasPointerCapture && track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
  };
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  marker.addEventListener("keydown", (e) => {
    const step = nl.step || (nl.max - nl.min) / 20;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      commit(snapNumberLine(clampNumberLine(value - step, nl.min, nl.max), nl.min, nl.step));
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      commit(snapNumberLine(clampNumberLine(value + step, nl.min, nl.max), nl.min, nl.step));
      e.preventDefault();
    }
  });
}

// A static (non-draggable) replay of a numberline question for the results/
// assessor screens: shows the tolerance band around the correct value, a
// marker at the correct value, and — when the learner actually answered —
// a second marker at wherever they left it, so "how close was I" is visible
// at a glance instead of just two numbers in text. `userValue` is the raw
// numeric answer (or undefined if the question was left unanswered).
function renderNumberLineReviewHtml(nl, userValue, wasCorrect) {
  const pct = (v) => ((clampNumberLine(v, nl.min, nl.max) - nl.min) / (nl.max - nl.min)) * 100;
  const tol = nl.tolerance || 0;
  const bandLeft = pct(nl.correct - tol);
  const bandRight = pct(nl.correct + tol);
  const ticks = nl.ticks && nl.ticks.length ? nl.ticks : [{ value: nl.min, label: String(nl.min) }, { value: nl.max, label: String(nl.max) }];
  const ticksHtml = ticks
    .map((t) => `<div class="numberline-tick" style="left:${pct(t.value)}%"><span class="numberline-tick-mark"></span><span class="numberline-tick-label">${escapeHtml(t.label)}</span></div>`)
    .join("");
  const hasUserValue = userValue !== undefined && userValue !== null;
  // Coloured red/green by whether that answer was actually marked correct —
  // this widget also appears (unconditionally) in the assessor view for
  // correct answers, so it can't just assume "shown = wrong".
  const userMarkerClass = wasCorrect ? "numberline-marker-user-correct" : "numberline-marker-user-incorrect";
  const userMarkerHtml = hasUserValue
    ? `<div class="numberline-marker numberline-marker-user ${userMarkerClass}" style="left:${pct(userValue)}%" title="Your answer"></div>`
    : "";
  return `
    <div class="numberline-review">
      <div class="numberline-track numberline-track-readonly">
        <div class="numberline-tolerance-band" style="left:${bandLeft}%; width:${Math.max(0, bandRight - bandLeft)}%;"></div>
        ${ticksHtml}
        <div class="numberline-marker numberline-marker-correct" style="left:${pct(nl.correct)}%" title="Correct answer"></div>
        ${userMarkerHtml}
      </div>
      <div class="numberline-review-legend">
        ${hasUserValue ? `<span><span class="legend-dot ${wasCorrect ? "legend-dot-user-correct" : "legend-dot-user-incorrect"}"></span>Your answer</span>` : ""}
        <span><span class="legend-dot legend-dot-correct"></span>Correct answer${tol ? " (± tolerance shown)" : ""}</span>
      </div>
    </div>
  `;
}

// ---------- grid-shade questions (tap-to-toggle grid) ----------
//
// A question can carry `type: "grid-shade"` instead of "mcq"/"short"/
// "numberline", with top-level fields: `rows`, `cols`, `givenShaded` (an
// array of pre-shaded, non-toggleable cell indices), `matchMode: "count" |
// "exact"`, and either `targetCount` (matchMode "count" — any N cells
// shaded is correct, position doesn't matter, e.g. "shade 3/8 of this
// grid") or `targetShaded` (matchMode "exact" — the shaded set must match
// this exact array of cell indices, given cells included, e.g. "shade
// cells so the pattern has rotational symmetry"). Cells are indexed
// row-major, 0-based: index = row * cols + col.
//
// Like numberline, the stored answer (a plain array of shaded cell
// indices, given cells included) is only written to state.answers[q.id]
// once the learner actually taps a cell or hits "Clear my shading" — the
// given cells are drawn as shaded from the start, but that's a starting
// position, not an answer, so an untouched question still correctly
// counts as unanswered.
function renderGridShadeHtml(q, savedAnswer) {
  const total = q.rows * q.cols;
  const given = q.givenShaded || [];
  const shaded = new Set(savedAnswer || given);
  const givenSet = new Set(given);
  const cellsHtml = Array.from({ length: total }, (_, i) => {
    const isGiven = givenSet.has(i);
    const isShaded = shaded.has(i);
    return `<button type="button" class="grid-shade-cell ${isShaded ? "shaded" : ""} ${isGiven ? "given" : ""}" data-index="${i}" ${isGiven ? "disabled" : ""} aria-label="Cell ${i + 1}${isShaded ? ", shaded" : ", not shaded"}"></button>`;
  }).join("");
  return `
    <div class="grid-shade-wrap">
      <div class="grid-shade" id="grid-shade" style="grid-template-columns: repeat(${q.cols}, 1fr);">
        ${cellsHtml}
      </div>
      <div class="grid-shade-hint-row">
        <button class="btn secondary small" id="grid-shade-clear" type="button">Clear my shading</button>
      </div>
    </div>
  `;
}

function setupGridShade(q, savedAnswer) {
  const grid = document.getElementById("grid-shade");
  const clearBtn = document.getElementById("grid-shade-clear");
  const given = q.givenShaded || [];

  grid.querySelectorAll(".grid-shade-cell").forEach((cell) => {
    if (cell.disabled) return; // given cells aren't toggleable
    cell.addEventListener("click", () => {
      const index = Number(cell.dataset.index);
      const current = new Set(state.answers[q.id] || savedAnswer || given);
      if (current.has(index)) current.delete(index);
      else current.add(index);
      state.answers[q.id] = [...current];
      cell.classList.toggle("shaded", current.has(index));
      cell.setAttribute("aria-label", `Cell ${index + 1}${current.has(index) ? ", shaded" : ", not shaded"}`);
    });
  });

  clearBtn.addEventListener("click", () => {
    state.answers[q.id] = [...given];
    grid.querySelectorAll(".grid-shade-cell").forEach((cell) => {
      const index = Number(cell.dataset.index);
      const isShaded = given.includes(index);
      cell.classList.toggle("shaded", isShaded);
      cell.setAttribute("aria-label", `Cell ${index + 1}${isShaded ? ", shaded" : ", not shaded"}`);
    });
  });
}

// ---------- click-a-side questions (tap a labelled side/segment of a shape) ----------
//
// A question can carry `type: "click-a-side"` with top-level fields:
// `points` (array of `{ id, x, y }` vertex positions in the SVG's own
// coordinate space), `segments` (array of `{ id, from, to, label? }`, each
// naming two point ids to draw a line between), `correctSegmentIds` (array —
// usually one id, but e.g. "click either parallel side" needs two),
// optional `circle` (`{ cx, cy, r }`, a decorative non-interactive circle —
// for radius/diameter/chord questions), optional `viewBox` (defaults to
// "0 0 240 200"), and optional `showLabels` (defaults true — draws each
// point's id as a small letter next to its vertex). Pure vector geometry, no
// image assets: every segment is drawn twice — a thin visible line, and an
// invisible wide-stroke line on top that actually receives the click/tap
// (a thin line is a poor-quality target on a touchscreen).
function renderClickSideHtml(q, savedAnswer) {
  const viewBox = q.viewBox || "0 0 240 200";
  const pt = (id) => q.points.find((p) => p.id === id);
  const circleHtml = q.circle ? `<circle cx="${q.circle.cx}" cy="${q.circle.cy}" r="${q.circle.r}" class="click-side-bg-circle" />` : "";
  const lineHtml = q.segments
    .map((seg) => {
      const from = pt(seg.from);
      const to = pt(seg.to);
      const selected = savedAnswer === seg.id ? "selected" : "";
      return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" class="click-side-line ${selected}" data-line-for="${seg.id}" />`;
    })
    .join("");
  const hitHtml = q.segments
    .map((seg) => {
      const from = pt(seg.from);
      const to = pt(seg.to);
      return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" class="click-side-hit" data-segment-id="${seg.id}" pointer-events="all" tabindex="0" role="button" aria-label="Side ${escapeHtml(seg.label || seg.id)}" />`;
    })
    .join("");
  const labelsHtml =
    q.showLabels === false
      ? ""
      : q.points
          .map((p) => `<text x="${p.x + (p.labelDx ?? 0)}" y="${p.y + (p.labelDy ?? -8)}" class="click-side-point-label">${escapeHtml(p.id)}</text>`)
          .join("");
  const savedSeg = savedAnswer ? q.segments.find((s) => s.id === savedAnswer) : null;
  return `
    <div class="click-side-wrap">
      <svg viewBox="${viewBox}" class="click-side-svg" id="click-side-svg">
        ${circleHtml}
        ${lineHtml}
        ${hitHtml}
        ${labelsHtml}
      </svg>
      <div class="click-side-status" id="click-side-status">${savedSeg ? `Selected: ${escapeHtml(savedSeg.label || savedSeg.id)}` : "Tap a side to select it"}</div>
    </div>
  `;
}

function setupClickSide(q) {
  const svg = document.getElementById("click-side-svg");
  const status = document.getElementById("click-side-status");

  function select(segmentId) {
    state.answers[q.id] = segmentId;
    svg.querySelectorAll(".click-side-line").forEach((line) => {
      line.classList.toggle("selected", line.dataset.lineFor === segmentId);
    });
    const seg = q.segments.find((s) => s.id === segmentId);
    status.textContent = `Selected: ${seg ? seg.label || seg.id : segmentId}`;
  }

  svg.querySelectorAll(".click-side-hit").forEach((hit) => {
    const line = svg.querySelector(`.click-side-line[data-line-for="${hit.dataset.segmentId}"]`);
    hit.addEventListener("click", () => select(hit.dataset.segmentId));
    hit.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(hit.dataset.segmentId);
      }
    });
    if (line) {
      hit.addEventListener("pointerenter", () => line.classList.add("hovered"));
      hit.addEventListener("pointerleave", () => line.classList.remove("hovered"));
      hit.addEventListener("focus", () => line.classList.add("hovered"));
      hit.addEventListener("blur", () => line.classList.remove("hovered"));
    }
  });
}

// ---------- drag-a-radius questions (drag a radius around a circle, angle classified live) ----------
//
// A question can carry `type: "drag-a-radius"` with top-level fields:
// `circle` (`{ cx, cy, r }`, defaults to `{ cx: 100, cy: 100, r: 80 }` on a
// "0 0 200 200" viewBox), `fixedAngleDeg` (the static reference radius,
// default 0 = pointing right/east), `correctClass` (one of "acute", "right",
// "obtuse", "straight", "reflex" — what the learner must drag the moving
// radius to form with the fixed one), and optional `classTolerance` (degrees
// either side of exactly 90°/180° that still count as "right"/"straight" —
// see classifyAngleDeg() in marking.js, the single source of truth both this
// live label and the actual marking use). Angles are measured in degrees,
// clockwise from the fixed radius, wrapped into [0, 360) — pure vector
// geometry (atan2 on the drag position), no image assets.
function pointFromClientToSvg(svg, clientX, clientY) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: clientX, y: clientY };
  const loc = pt.matrixTransform(ctm.inverse());
  return { x: loc.x, y: loc.y };
}

function angleFromCentreDeg(cx, cy, x, y) {
  let deg = (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
  if (deg < 0) deg += 360;
  return deg;
}

function describeAngleLive(deg, tol) {
  const label = { acute: "Acute angle", right: "Right angle", obtuse: "Obtuse angle", straight: "Straight line", reflex: "Reflex angle" }[classifyAngleDeg(deg, tol)];
  return `${label} (${Math.round(deg)}°)`;
}

function arcPathD(cx, cy, arcR, fromDeg, toDeg) {
  const fromRad = (fromDeg * Math.PI) / 180;
  const toRad = (toDeg * Math.PI) / 180;
  const sx = cx + arcR * Math.cos(fromRad);
  const sy = cy + arcR * Math.sin(fromRad);
  const ex = cx + arcR * Math.cos(toRad);
  const ey = cy + arcR * Math.sin(toRad);
  const delta = ((toDeg - fromDeg) % 360 + 360) % 360;
  const largeArc = delta > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${arcR} ${arcR} 0 ${largeArc} 1 ${ex} ${ey}`;
}

function renderDragRadiusHtml(q, savedAnswer) {
  const c = q.circle || { cx: 100, cy: 100, r: 80 };
  const viewBox = q.viewBox || "0 0 200 200";
  const fixedDeg = q.fixedAngleDeg ?? 0;
  const fixedRad = (fixedDeg * Math.PI) / 180;
  const fx = c.cx + c.r * Math.cos(fixedRad);
  const fy = c.cy + c.r * Math.sin(fixedRad);
  const currentDeg = savedAnswer !== undefined ? savedAnswer : (fixedDeg + 90) % 360;
  const currentRad = (currentDeg * Math.PI) / 180;
  const mx = c.cx + c.r * Math.cos(currentRad);
  const my = c.cy + c.r * Math.sin(currentRad);
  const arcR = Math.max(18, c.r * 0.3);
  return `
    <div class="drag-radius-wrap">
      <div class="drag-radius-label" id="drag-radius-label">${savedAnswer !== undefined ? escapeHtml(describeAngleLive(currentDeg, q.classTolerance)) : "Drag the blue handle around the circle"}</div>
      <svg viewBox="${viewBox}" class="drag-radius-svg" id="drag-radius-svg" touch-action="none">
        <circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" class="drag-radius-circle" />
        <path d="${arcPathD(c.cx, c.cy, arcR, fixedDeg, currentDeg)}" class="drag-radius-arc" id="drag-radius-arc" />
        <line x1="${c.cx}" y1="${c.cy}" x2="${fx}" y2="${fy}" class="drag-radius-fixed" />
        <line x1="${c.cx}" y1="${c.cy}" x2="${mx}" y2="${my}" class="drag-radius-moving" id="drag-radius-moving-line" />
        <circle cx="${mx}" cy="${my}" r="9" class="drag-radius-handle" id="drag-radius-handle" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="360" aria-valuenow="${Math.round(currentDeg)}" aria-label="Drag to change the angle, currently ${Math.round(currentDeg)} degrees" />
      </svg>
    </div>
  `;
}

function setupDragRadius(q, savedAnswer) {
  const c = q.circle || { cx: 100, cy: 100, r: 80 };
  const fixedDeg = q.fixedAngleDeg ?? 0;
  const arcR = Math.max(18, c.r * 0.3);
  const svg = document.getElementById("drag-radius-svg");
  const handle = document.getElementById("drag-radius-handle");
  const movingLine = document.getElementById("drag-radius-moving-line");
  const arc = document.getElementById("drag-radius-arc");
  const label = document.getElementById("drag-radius-label");
  let deg = savedAnswer !== undefined ? savedAnswer : (fixedDeg + 90) % 360;

  function paint(answered) {
    const rad = (deg * Math.PI) / 180;
    const mx = c.cx + c.r * Math.cos(rad);
    const my = c.cy + c.r * Math.sin(rad);
    handle.setAttribute("cx", mx);
    handle.setAttribute("cy", my);
    handle.setAttribute("aria-valuenow", String(Math.round(deg)));
    handle.setAttribute("aria-label", `Drag to change the angle, currently ${Math.round(deg)} degrees`);
    movingLine.setAttribute("x2", mx);
    movingLine.setAttribute("y2", my);
    arc.setAttribute("d", arcPathD(c.cx, c.cy, arcR, fixedDeg, deg));
    label.textContent = answered ? describeAngleLive(deg, q.classTolerance) : "Drag the blue handle around the circle";
  }

  function commit(newDeg) {
    deg = newDeg;
    state.answers[q.id] = deg;
    paint(true);
  }

  paint(savedAnswer !== undefined);

  let dragging = false;
  function degFromPointer(e) {
    const loc = pointFromClientToSvg(svg, e.clientX, e.clientY);
    return angleFromCentreDeg(c.cx, c.cy, loc.x, loc.y);
  }
  handle.addEventListener("pointerdown", (e) => {
    dragging = true;
    handle.setPointerCapture(e.pointerId);
    commit(degFromPointer(e));
    e.preventDefault();
  });
  handle.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    commit(degFromPointer(e));
  });
  const endDrag = (e) => {
    dragging = false;
    if (handle.hasPointerCapture && handle.hasPointerCapture(e.pointerId)) handle.releasePointerCapture(e.pointerId);
  };
  handle.addEventListener("pointerup", endDrag);
  handle.addEventListener("pointercancel", endDrag);

  handle.addEventListener("keydown", (e) => {
    const step = 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      commit(((deg - step) % 360 + 360) % 360);
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      commit((deg + step) % 360);
      e.preventDefault();
    }
  });
}

// ---------- click-a-region questions (tap one or more shapes/points on a diagram) ----------
//
// A question can carry `type: "click-a-region"` with top-level fields:
// `viewBox` (defaults to "0 0 300 300"), `background` (array of purely
// decorative, non-interactive SVG element descriptors — map outlines,
// bearing lines, axes, north arrows — each `{ kind: "line"|"circle"|
// "polygon"|"path"|"text", ...attrs }`, see renderBackgroundElementHtml()),
// `regions` (array of clickable targets — `{ id, shape: "polygon"|"circle",
// points? (polygon: array of {x,y}), cx?, cy?, r? (circle), hitR? (circle
// only — invisible click-target radius, defaults to r+8 or 16, whichever's
// bigger, since a plotted dot is a poor touch target at its true radius),
// label? }`), `selectMode` ("single", the default — pick exactly one region,
// like click-a-side; or "multi" — toggle any number on/off, exact-set
// match required, like grid-shade's "exact" mode), and `correctRegionIds`
// (array of region ids — in "single" mode any one of these counts correct,
// e.g. "either of these two shapes"; in "multi" mode the learner's full
// selection must match this set exactly).
//
// This generalises click-a-side from "pick one labelled side of a fixed
// shape" to "pick one or more regions on an arbitrary diagram" — shape-
// matching (click the congruent shapes), a point plotted from given data
// (click the bearing intersection, click the outlier on a scatter plot),
// anything where the correct answer is "click here" rather than a typed
// value. Polygon regions are drawn with a real (if faint) fill so the whole
// interior — not just the outline — receives clicks; circle regions get an
// invisible, larger hit-circle layered on top of the visible dot, same
// thin-visible/wide-hit-target split as click-a-side's segment lines.
// Every background element carries pointer-events="none" directly (not just
// via the CSS class) so a decorative element can never steal a click meant
// for an interactive region beneath or beside it — this bit us once during
// this type's own smoke test (a shape's letter label, positioned right at
// its centroid, silently absorbed clicks meant for the shape itself) so the
// fix is applied at both layers rather than relying on style.css alone.
function renderBackgroundElementHtml(el) {
  const cls = `click-region-bg-el ${el.className || ""}`;
  if (el.kind === "line") {
    return `<line x1="${el.x1}" y1="${el.y1}" x2="${el.x2}" y2="${el.y2}" class="${cls}" pointer-events="none" ${el.dash ? `stroke-dasharray="${el.dash}"` : ""} />`;
  }
  if (el.kind === "circle") {
    return `<circle cx="${el.cx}" cy="${el.cy}" r="${el.r}" class="${cls}" pointer-events="none" />`;
  }
  if (el.kind === "polygon") {
    const pts = el.points.map((p) => `${p.x},${p.y}`).join(" ");
    return `<polygon points="${pts}" class="${cls}" pointer-events="none" />`;
  }
  if (el.kind === "path") {
    return `<path d="${el.d}" class="${cls}" pointer-events="none" />`;
  }
  if (el.kind === "text") {
    return `<text x="${el.x}" y="${el.y}" text-anchor="${el.anchor || "middle"}" class="${cls}" pointer-events="none">${escapeHtml(el.text)}</text>`;
  }
  return "";
}

function clickRegionLabel(q, id) {
  const r = (q.regions || []).find((x) => x.id === id);
  return r ? r.label || r.id : id;
}

function renderClickRegionHtml(q, savedAnswer) {
  const viewBox = q.viewBox || "0 0 300 300";
  const selectMode = q.selectMode || "single";
  const selectedIds = new Set(selectMode === "multi" ? savedAnswer || [] : savedAnswer !== undefined ? [savedAnswer] : []);
  const bgHtml = (q.background || []).map(renderBackgroundElementHtml).join("");
  const shapesHtml = q.regions
    .map((r) => {
      const selected = selectedIds.has(r.id) ? "selected" : "";
      const label = escapeHtml(r.label || r.id);
      if (r.shape === "polygon") {
        const pts = r.points.map((p) => `${p.x},${p.y}`).join(" ");
        return `<polygon points="${pts}" class="click-region-shape click-region-polygon ${selected}" data-region-id="${r.id}" tabindex="0" role="button" aria-label="${label}" />`;
      }
      const hitR = r.hitR || Math.max(r.r + 8, 16);
      return `<g class="click-region-circle-group" data-region-id="${r.id}">
        <circle cx="${r.cx}" cy="${r.cy}" r="${r.r}" class="click-region-shape click-region-dot ${selected}" />
        <circle cx="${r.cx}" cy="${r.cy}" r="${hitR}" class="click-region-hit" data-region-id="${r.id}" pointer-events="all" tabindex="0" role="button" aria-label="${label}" />
      </g>`;
    })
    .join("");
  const labelsHtml = q.regions
    .filter((r) => r.labelPos)
    .map((r) => `<text x="${r.labelPos.x}" y="${r.labelPos.y}" class="click-region-point-label" pointer-events="none">${escapeHtml(r.label || r.id)}</text>`)
    .join("");
  const hint = q.selectHint || (selectMode === "multi" ? "Tap the regions to select them" : "Tap a region to select it");
  const statusText =
    selectedIds.size === 0
      ? hint
      : `Selected: ${[...selectedIds].map((id) => clickRegionLabel(q, id)).join(", ")}`;

  return `
    <div class="click-region-wrap">
      <svg viewBox="${viewBox}" class="click-region-svg" id="click-region-svg">
        ${bgHtml}
        ${shapesHtml}
        ${labelsHtml}
      </svg>
      <div class="click-region-status" id="click-region-status">${escapeHtml(statusText)}</div>
      ${selectMode === "multi" ? `<div class="click-region-hint-row"><button class="btn secondary small" id="click-region-clear" type="button">Clear my selection</button></div>` : ""}
    </div>
  `;
}

function setupClickRegion(q, savedAnswer) {
  const svg = document.getElementById("click-region-svg");
  const status = document.getElementById("click-region-status");
  const selectMode = q.selectMode || "single";
  const hint = q.selectHint || (selectMode === "multi" ? "Tap the regions to select them" : "Tap a region to select it");

  function shapeElFor(id) {
    const r = q.regions.find((x) => x.id === id);
    if (!r) return null;
    return r.shape === "polygon"
      ? svg.querySelector(`.click-region-polygon[data-region-id="${id}"]`)
      : svg.querySelector(`g.click-region-circle-group[data-region-id="${id}"] .click-region-dot`);
  }

  function paint(selectedIds) {
    q.regions.forEach((r) => {
      const shapeEl = shapeElFor(r.id);
      if (shapeEl) shapeEl.classList.toggle("selected", selectedIds.has(r.id));
    });
  }

  const interactiveEls = svg.querySelectorAll(".click-region-polygon, .click-region-hit");

  if (selectMode === "multi") {
    let current = new Set(savedAnswer || []);
    function toggle(id) {
      if (current.has(id)) current.delete(id);
      else current.add(id);
      state.answers[q.id] = [...current];
      paint(current);
      status.textContent = current.size ? `Selected: ${[...current].map((i) => clickRegionLabel(q, i)).join(", ")}` : hint;
    }
    interactiveEls.forEach((el) => {
      el.addEventListener("click", () => toggle(el.dataset.regionId));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle(el.dataset.regionId);
        }
      });
    });
    const clearBtn = document.getElementById("click-region-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        current = new Set();
        state.answers[q.id] = [];
        paint(current);
        status.textContent = hint;
      });
    }
  } else {
    function select(id) {
      state.answers[q.id] = id;
      paint(new Set([id]));
      status.textContent = `Selected: ${clickRegionLabel(q, id)}`;
    }
    interactiveEls.forEach((el) => {
      el.addEventListener("click", () => select(el.dataset.regionId));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select(el.dataset.regionId);
        }
      });
    });
  }

  interactiveEls.forEach((el) => {
    const shapeEl = shapeElFor(el.dataset.regionId);
    if (!shapeEl) return;
    el.addEventListener("pointerenter", () => shapeEl.classList.add("hovered"));
    el.addEventListener("pointerleave", () => shapeEl.classList.remove("hovered"));
    el.addEventListener("focus", () => shapeEl.classList.add("hovered"));
    el.addEventListener("blur", () => shapeEl.classList.remove("hovered"));
  });
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
// Reads text aloud using the browser's built-in Web Speech API — no
// external service, no API key, works offline. Voice quality varies by
// device/OS (this is the browser/OS's own voice, not something the app
// controls). Cancels any speech already in progress first, so tapping
// "Read aloud" again (or on a new question) doesn't overlap two readings.
function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Sorry, this browser doesn't support reading text aloud.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

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

  const examSubjectKey = examRotationSubjectFor(new Date());
  const examBannerHtml = examSubjectKey
    ? `
      <div class="card" id="exam-banner" style="border:2px solid ${SUBJECT_COLOR[examSubjectKey]};">
        <strong>📝 This week's exam: ${escapeHtml(SUBJECTS[examSubjectKey].name)}</strong>
        <div style="color:var(--muted); font-size:0.85rem; margin-top:2px;">A full, timed real past paper — no hints, no read-aloud, just like the real thing.</div>
        <button class="btn block" id="exam-start-btn" style="margin-top:12px;">Start this week's exam</button>
      </div>
    `
    : "";

  main.innerHTML = `
    <div class="card">
      <div>
        <strong>Hi ${escapeHtml(state.profile)} 👋</strong>
        <div style="color:var(--muted); font-size:0.85rem; margin-top:2px;">Pick a subject — 5 random questions, however long it takes</div>
      </div>
      <div class="subject-grid">${subjectCards}</div>
    </div>
    ${examBannerHtml}
    ${buildCalendarHtml(results)}
    <button class="btn secondary" id="dashboard-btn">📈 View progress dashboard</button>
    <div class="assessor-link" id="assessor-link">🔍 Assessor / parent view</div>
  `;

  main.querySelectorAll("[data-subject]").forEach((btn) => {
    btn.addEventListener("click", () => renderSubject(btn.dataset.subject));
  });
  document.getElementById("assessor-link").addEventListener("click", openAssessorView);
  document.getElementById("dashboard-btn").addEventListener("click", () => renderDashboard());
  const examStartBtn = document.getElementById("exam-start-btn");
  if (examStartBtn) examStartBtn.addEventListener("click", () => startExam(examSubjectKey));
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
  beginSession(subjectKey, session);
}

// Picks which real paper is due (pickExamPaper — least-recently-sat first),
// builds the whole-paper session, and starts it running against a countdown
// instead of the normal count-up clock. No daily-done gate here — exam mode
// is independent of daily/topic practice.
async function startExam(subjectKey) {
  const priorResults = await getResults({ profile: state.profile, subject: subjectKey });
  const paper = pickExamPaper(subjectKey, priorResults);
  if (!paper) {
    renderHome();
    return;
  }
  const session = buildSession(subjectKey, { mode: "exam", paperKey: paper.key }, priorResults);
  beginSession(subjectKey, session);
}

// Manual override reached from the assessor view's new "Exam papers" list —
// starts one specific real paper immediately, for a chosen profile, bypassing
// both the Saturday rotation gate and pickExamPaper()'s "least recently sat"
// auto-selection entirely. The profile being browsed in assessor view isn't
// necessarily the one currently active on this device (assessor view can
// look at any profile's history), so this switches the active profile first
// — exactly like tapping the profile pill — so the resulting session, and
// the screen the app lands on afterwards, both belong to the right child.
async function startExamFromAssessor(profileName, subjectKey, paperKey) {
  setCurrentProfile(profileName);
  state.profile = profileName;
  state.profileSettings = getProfileSettings(profileName);
  applyDisplaySettings(state.profileSettings);
  updateProfilePill();
  const priorResults = await getResults({ profile: profileName, subject: subjectKey });
  const session = buildSession(subjectKey, { mode: "exam", paperKey }, priorResults);
  beginSession(subjectKey, session);
}

function beginSession(subjectKey, session) {
  state.subjectKey = subjectKey;
  state.session = session;
  state.qIndex = 0;
  state.answers = {};
  state.helpUsed = {};
  state.audioUsed = {};
  state.examFinishing = false;
  if (state.stopwatch) state.stopwatch.stop();
  state.stopwatch = new Stopwatch({ onTick: updateClock });
  renderQuestion();
  state.stopwatch.start();
}

function updateClock(elapsed) {
  const clockEl = document.getElementById("clock");
  if (!clockEl) return;
  const session = state.session;
  if (session && session.mode === "exam") {
    const totalSeconds = session.timeAllowedMinutes * 60;
    const remaining = totalSeconds - elapsed;
    clockEl.textContent = formatTime(Math.max(remaining, 0));
    // Reuses the existing (already-styled, previously-unused) .low class —
    // style.css already has a rule for it (.timer-bar .clock.low), just
    // nothing in app.js ever toggled it before exam mode existed.
    clockEl.classList.toggle("low", remaining <= 300 && remaining > 0); // last 5 minutes
    // Auto-submit the moment time runs out. Guarded by state.examFinishing
    // so this fires exactly once — onTick keeps calling after remaining
    // drops below zero (the stopwatch itself doesn't stop on its own), and
    // finishSession() is async, so without the guard every tick before it
    // resolves would kick off another finishSession() call.
    if (remaining <= 0 && !state.examFinishing) {
      state.examFinishing = true;
      finishSession({ timedOut: true });
    }
  } else {
    clockEl.textContent = formatTime(elapsed);
  }
}

// Same same-page-modal pattern as showProfileNameModal()/showAssessorPinModal()
// — used here to confirm ending an exam early, rather than window.confirm(),
// which iOS Safari can silently and permanently suppress after one accidental
// dismissal, with no way for the page to detect it.
function showConfirmModal(title, message, confirmLabel) {
  return new Promise((resolve) => {
    const existing = document.getElementById("confirm-modal-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "confirm-modal-overlay";
    overlay.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <strong>${escapeHtml(title)}</strong>
          <button class="modal-close" id="confirm-modal-close" aria-label="Close">✕</button>
        </div>
        <p style="margin-top:0;">${escapeHtml(message)}</p>
        <button class="btn block" id="confirm-modal-confirm">${escapeHtml(confirmLabel)}</button>
        <button class="btn secondary block" id="confirm-modal-cancel" style="margin-top:8px;">Cancel</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const close = (result) => {
      overlay.remove();
      resolve(result);
    };
    document.getElementById("confirm-modal-close").addEventListener("click", () => close(false));
    document.getElementById("confirm-modal-cancel").addEventListener("click", () => close(false));
    document.getElementById("confirm-modal-confirm").addEventListener("click", () => close(true));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close(false);
    });
  });
}

function renderQuestion() {
  destroyActiveCharts();
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
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
    // Options are usually plain strings, but Geometry & Measures questions
    // can use picture options instead — `{ label, svg }` — for things like
    // "which of these is a cylinder" that don't have a sensible text form.
    const hasPictureOptions = q.options.some((opt) => typeof opt === "object");
    answerHtml = `<div class="option-list ${hasPictureOptions ? "option-list-picture" : ""}">${q.options
      .map((opt, i) => {
        const selected = savedAnswer === i ? "selected" : "";
        if (typeof opt === "object") {
          return `<button class="option-btn option-btn-picture ${selected}" data-index="${i}">
            <span class="option-picture">${opt.svg}</span>
            <span class="option-picture-label">${escapeHtml(opt.label)}</span>
          </button>`;
        }
        return `<button class="option-btn ${selected}" data-index="${i}">${escapeHtml(opt)}</button>`;
      })
      .join("")}</div>`;
  } else if (q.type === "numberline") {
    answerHtml = renderNumberLineHtml(q.numberline, savedAnswer);
  } else if (q.type === "grid-shade") {
    answerHtml = renderGridShadeHtml(q, savedAnswer);
  } else if (q.type === "click-a-side") {
    answerHtml = renderClickSideHtml(q, savedAnswer);
  } else if (q.type === "drag-a-radius") {
    answerHtml = renderDragRadiusHtml(q, savedAnswer);
  } else if (q.type === "click-a-region") {
    answerHtml = renderClickRegionHtml(q, savedAnswer);
  } else {
    answerHtml = `<input type="text" class="text-answer" id="short-answer" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer" value="${savedAnswer !== undefined ? escapeHtml(savedAnswer) : ""}" />`;
  }

  const isLast = state.qIndex === total - 1;

  // Exam mode simulates sitting the real paper: no hints, no read-aloud, no
  // glossary lookup — none of those exist in a real exam hall. The
  // calculator is the one exception, and even that's gated by whether THIS
  // specific paper actually allows one — every Maths past paper's own
  // `source.paper` label already says "Calculator-Allowed" or
  // "Non-Calculator", so that's checked directly rather than assuming every
  // Maths paper allows one the way normal practice mode does.
  const isExam = session.mode === "exam";
  const paperIsNonCalculator = !!(q.source && q.source.paper && q.source.paper.includes("Non-Calculator"));
  const showCalcBtn = state.subjectKey === "maths" && !(isExam && paperIsNonCalculator);
  const helpRowButtons = [
    !isExam ? `<button class="btn secondary small" id="help-btn" type="button">🤔 Need help?</button>` : "",
    !isExam ? `<button class="btn secondary small" id="glossary-btn" type="button">📖 Key words</button>` : "",
    showCalcBtn ? `<button class="btn secondary small" id="calc-btn" type="button">🧮 Calculator</button>` : "",
    !isExam && state.profileSettings && state.profileSettings.audioHelp ? `<button class="btn secondary small" id="read-aloud-btn" type="button">🔊 Read aloud</button>` : ""
  ].join("");
  const timerLabel = isExam ? "⏳ Time left" : "⏱";

  main.innerHTML = `
    <div class="timer-bar">
      <div>${timerLabel} <span class="clock" id="clock">0:00</span></div>
      <div style="color:var(--muted); font-size:0.85rem;">${isExam ? "Exam: " : ""}${escapeHtml(q.topicTitle || session.title)}</div>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="question-number-row">
      <div class="question-number">Question ${state.qIndex + 1} of ${total}</div>
      ${paperBadgeHtml}
    </div>
    ${passageHtml}
    ${chartHtml}
    <p class="question-prompt">${escapeHtml(q.prompt)}</p>
    ${helpRowButtons ? `<div class="help-row">${helpRowButtons}</div>` : ""}
    ${!isExam ? `<div class="hint-box" id="hint-box" hidden>${escapeHtml(hintText)}</div>` : ""}
    ${answerHtml}
    <div class="nav-row">
      <button class="btn" id="next-btn">${isLast ? "Finish" : "Next question"}</button>
    </div>
    ${isExam ? `<button class="btn secondary block" id="finish-exam-btn" type="button" style="margin-top:10px;">🏁 Finish exam now</button>` : ""}
  `;
  updateClock(state.stopwatch.elapsed);
  if (q.chart) renderChartCanvas("question-chart", state.subjectKey, q.chart);
  if (q.type === "numberline") setupNumberLine(q, savedAnswer);
  if (q.type === "grid-shade") setupGridShade(q, savedAnswer);
  if (q.type === "click-a-side") setupClickSide(q);
  if (q.type === "drag-a-radius") setupDragRadius(q, savedAnswer);
  if (q.type === "click-a-region") setupClickRegion(q, savedAnswer);

  // help-btn/hint-box/glossary-btn don't exist during exam mode (see
  // helpRowButtons above), so these are all null-guarded rather than assumed
  // present the way they always were before exam mode existed.
  const helpBtn = document.getElementById("help-btn");
  const hintBox = document.getElementById("hint-box");
  if (helpBtn && hintBox) {
    helpBtn.addEventListener("click", () => {
      hintBox.hidden = !hintBox.hidden;
      helpBtn.textContent = hintBox.hidden ? "🤔 Need help?" : "🙈 Hide hint";
      // Recorded the moment she opens it, never cleared even if she closes it
      // again — the parent-facing question is "did she need a hint on this
      // one", not "is the hint currently showing".
      if (!hintBox.hidden) state.helpUsed[q.id] = true;
    });
  }
  const glossaryBtn = document.getElementById("glossary-btn");
  if (glossaryBtn) glossaryBtn.addEventListener("click", () => showGlossaryModal(state.subjectKey));
  const calcBtn = document.getElementById("calc-btn");
  if (calcBtn) calcBtn.addEventListener("click", showCalculatorModal);
  const finishExamBtn = document.getElementById("finish-exam-btn");
  if (finishExamBtn) {
    finishExamBtn.addEventListener("click", async () => {
      const unanswered = session.questions.filter((sq) => state.answers[sq.id] === undefined).length;
      const message = unanswered
        ? `You still have ${unanswered} question${unanswered === 1 ? "" : "s"} unanswered — those will be marked wrong. Finish the exam now?`
        : "Finish the exam now?";
      const confirmed = await showConfirmModal("Finish exam", message, "Yes, finish now");
      if (confirmed) finishSession();
    });
  }
  const readAloudBtn = document.getElementById("read-aloud-btn");
  if (readAloudBtn) {
    readAloudBtn.addEventListener("click", () => {
      state.audioUsed[q.id] = true;
      const parts = [];
      if (q.passage) parts.push(q.passage);
      parts.push(q.prompt);
      if (q.type === "mcq") {
        q.options.forEach((opt, i) => parts.push(`Option ${i + 1}: ${optionLabel(opt)}`));
      }
      if (q.type === "numberline") {
        parts.push(`Drag the marker to a position between ${q.numberline.min} and ${q.numberline.max}${q.numberline.unitLabel ? " " + q.numberline.unitLabel : ""}`);
      }
      if (q.type === "grid-shade") {
        parts.push(`Tap cells to shade them on a ${q.rows} by ${q.cols} grid. ${q.matchMode === "count" ? `Shade ${q.targetCount} cells in total.` : "Shade cells to match the pattern described."}`);
      }
      if (q.type === "click-a-side") {
        parts.push(`Tap the side of the shape that answers the question. The sides are: ${q.segments.map((s) => s.label || s.id).join(", ")}.`);
      }
      if (q.type === "drag-a-radius") {
        parts.push("Drag the blue handle around the circle until the angle it makes with the fixed grey line matches what's asked for.");
      }
      if (q.type === "click-a-region") {
        const modeText = (q.selectMode || "single") === "multi" ? "Tap all the regions on the diagram that answer the question." : "Tap the one region on the diagram that answers the question.";
        parts.push(modeText);
      }
      speakText(parts.join(". "));
    });
  }

  if (q.type === "mcq") {
    main.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.answers[q.id] = Number(btn.dataset.index);
        main.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });
  } else if (q.type === "numberline") {
    // Dragging/keyboard interaction is already wired up by setupNumberLine()
    // above (called right after this markup was inserted into the page).
  } else if (q.type === "grid-shade") {
    // Tap-to-toggle interaction is already wired up by setupGridShade()
    // above, same reasoning as the numberline branch.
  } else if (q.type === "click-a-side" || q.type === "drag-a-radius" || q.type === "click-a-region") {
    // Click/drag interaction is already wired up by setupClickSide()/
    // setupDragRadius()/setupClickRegion() above, same reasoning as the
    // numberline branch.
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

// timedOut is only ever true when the exam countdown itself calls this (see
// updateClock()) — every other path (the normal "Finish" button, and the
// exam-mode "Finish exam now" button) means she ended it herself.
async function finishSession({ timedOut = false } = {}) {
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
      numberline: q.numberline || null,
      // null (not undefined) when unanswered/not applicable — Firestore
      // rejects undefined field values, and this object gets persisted
      // as part of the session record below.
      userAnswerRaw: (q.type === "numberline" || q.type === "drag-a-radius") && userAnswer !== undefined ? userAnswer : null,
      // Whether she opened the hint box or used read-aloud on this specific
      // question — surfaced as a small icon per question in the assessor
      // view, and rolled up into a per-subject "% of questions using help"
      // stat there too. Plain booleans (never undefined) — Firestore-safe.
      usedHint: !!state.helpUsed[q.id],
      usedAudio: !!state.audioUsed[q.id],
    };
  });
  const score = details.filter((d) => d.correct).length;
  const total = details.length;
  const percentage = Math.round((score / total) * 100);

  const priorResults = await getResults({ profile: state.profile, subject: state.subjectKey });
  // Exam mode's "previous attempts" comparison is scoped to the SAME real
  // paper (paperKey), not just the same mode — otherwise sitting Science
  // Unit 5 would get compared against a completely different paper (Unit 2)
  // just because both happen to be "exam" mode sessions.
  const priorMatching = priorResults.filter((r) =>
    r.mode === session.mode && (session.mode === "exam" ? r.paperKey === session.paperKey : r.topicId === session.topicId)
  );
  const previousBest = priorMatching.length ? Math.max(...priorMatching.map((r) => r.percentage)) : null;
  const previousLast = priorMatching.length ? priorMatching[priorMatching.length - 1].percentage : null;

  const record = {
    profile: state.profile,
    subject: state.subjectKey,
    mode: session.mode,
    topicId: session.topicId,
    // null (not undefined — Firestore-safe, same convention as every other
    // optional field here) outside exam mode, where there's no single real
    // paper to identify a session by.
    paperKey: session.paperKey || null,
    timeAllowedMinutes: session.timeAllowedMinutes || null,
    timedOut,
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
    answers: details.map(({ questionId, topicId, topicTitle, prompt, correct, userAnswerDisplay: u, correctAnswerDisplay: c, explanation, source, grade, chart, numberline, userAnswerRaw, usedHint, usedAudio }) => ({
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
      numberline,
      userAnswerRaw,
      usedHint,
      usedAudio,
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
        ${!d.correct && d.numberline ? renderNumberLineReviewHtml(d.numberline, d.userAnswerRaw, d.correct) : ""}
        <div class="answers">Your answer: <strong>${escapeHtml(d.userAnswerDisplay)}</strong>${
          d.correct ? "" : `<br/>Correct answer: <strong>${escapeHtml(d.correctAnswerDisplay)}</strong>`
        }</div>
        ${!d.correct ? `<div class="explanation">${escapeHtml(d.explanation)}</div>` : ""}
      </div>
    `
    )
    .join("");

  const isExamResult = record.mode === "exam";
  const timeSummary = isExamResult
    ? `⏱ ${record.timedOut ? "Time ran out at" : "Finished in"} ${formatTime(record.durationSeconds)}${record.timeAllowedMinutes ? ` (${record.timeAllowedMinutes} min allowed)` : ""}`
    : `⏱ Completed in ${formatTime(record.durationSeconds)}`;

  main.innerHTML = `
    <div class="card score-hero">
      <div class="big">${record.percentage}%</div>
      <div class="sub">${record.score} out of ${record.total} correct — ${escapeHtml(record.sessionTitle)}</div>
      <div style="color:var(--muted); margin-top:4px;">${timeSummary}</div>
      ${improvementHtml}
    </div>
    ${levelUpHtml}
    ${recommendationHtml}
    <div class="card">
      <h3 style="margin-top:0;">Review your answers</h3>
      ${items}
    </div>
    <div class="nav-row">
      ${isExamResult ? "" : `<button class="btn secondary" id="retry-btn">Do 5 more like this</button>`}
      <button class="btn" id="subject-btn">Back to ${escapeHtml(SUBJECTS[state.subjectKey].name)}</button>
    </div>
  `;

  details.forEach((d, i) => {
    if (!d.correct && d.chart) renderChartCanvas(`result-chart-${i}`, record.subject, d.chart);
  });

  const retryBtn = document.getElementById("retry-btn");
  if (retryBtn) retryBtn.addEventListener("click", () => startSession(state.subjectKey, { mode: record.mode, topicId: record.topicId }));
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

// In-page modal for the assessor PIN, replacing window.prompt() — same
// reasoning as the profile-name modal fix: prompt() can be silently
// suppressed by the browser (notably Safari on iOS) with no way for the
// page to detect it, which would make this view permanently inaccessible
// with no visible error. A same-page modal has no such failure mode.
function showAssessorPinModal() {
  return new Promise((resolve) => {
    const existing = document.getElementById("assessor-pin-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "assessor-pin-overlay";
    overlay.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <strong>Assessor PIN</strong>
          <button class="modal-close" id="assessor-pin-close" aria-label="Close">✕</button>
        </div>
        <input type="password" inputmode="numeric" class="text-answer" id="assessor-pin-input" autocomplete="off" placeholder="Enter PIN" />
        <button class="btn block" id="assessor-pin-submit">Continue</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById("assessor-pin-input");
    input.focus();

    function close(value) {
      overlay.remove();
      resolve(value);
    }

    document.getElementById("assessor-pin-close").addEventListener("click", () => close(null));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close(null);
    });
    document.getElementById("assessor-pin-submit").addEventListener("click", () => close(input.value));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") close(input.value);
    });
  });
}

async function openAssessorView() {
  if (!ASSESSOR_PIN || ASSESSOR_PIN === "CHANGE_ME") {
    window.alert(
      "The assessor view needs a PIN set before it can be used.\n\nOpen firebase-config.js, change ASSESSOR_PIN from \"CHANGE_ME\" to whatever you like, then upload it."
    );
    return;
  }
  const entered = await showAssessorPinModal();
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

  // Same weak-topic detection already used to steer in-session difficulty
  // (computeWeakTopics/WEAK_STREAK_THRESHOLD, above) — surfaced here as a
  // quick "where does she need help" summary, grouped by subject, rather
  // than making a parent scroll through every session looking for a pattern.
  const chronological = results.slice().reverse(); // oldest first, for streak calculation
  const weakBySubject = Object.values(SUBJECTS)
    .map((subject) => {
      const subjectResults = chronological.filter((r) => r.subject === subject.key);
      const flat = flattenAnswers(subjectResults);
      const weak = computeWeakTopics(flat).filter((w) => w.streak >= WEAK_STREAK_THRESHOLD);
      return { subject, weak };
    })
    .filter((s) => s.weak.length);

  const weakSummaryHtml = weakBySubject.length
    ? `
      <div class="card">
        <h3 style="margin-top:0;">Currently struggling with</h3>
        ${weakBySubject
          .map(
            (s) => `
          <div style="margin-bottom:10px;">
            <div style="font-weight:700; color:${SUBJECT_COLOR[s.subject.key]};">${escapeHtml(s.subject.name)}</div>
            ${s.weak
              .map((w) => `<div style="font-size:0.9rem; margin-left:4px;">${escapeHtml(w.topicTitle)} — ${w.streak} wrong in a row (most recent)</div>`)
              .join("")}
          </div>
        `
          )
          .join("")}
      </div>
    `
    : "";

  // How much she's leaning on the hint button / read-aloud, per subject —
  // computed straight off each session's own recorded answers (usedHint/
  // usedAudio, set in finishSession()) rather than via flattenAnswers(),
  // since that helper's field set is defined in subjects.js and isn't
  // guaranteed to pass these two booleans through. Older sessions recorded
  // before this feature existed simply have no usedHint/usedAudio on their
  // answers, which reads as "not used" here — an honest default, not a
  // guess, since help wasn't tracked at all before now.
  const helpAudioBySubject = Object.values(SUBJECTS)
    .map((subject) => {
      const subjectResults = chronological.filter((r) => r.subject === subject.key);
      const allAnswers = subjectResults.flatMap((r) => r.answers || []);
      const total = allAnswers.length;
      const usedHintCount = allAnswers.filter((a) => a.usedHint).length;
      const usedAudioCount = allAnswers.filter((a) => a.usedAudio).length;
      const usedEitherCount = allAnswers.filter((a) => a.usedHint || a.usedAudio).length;
      return { subject, total, usedHintCount, usedAudioCount, usedEitherCount };
    })
    .filter((s) => s.total > 0);

  const helpSummaryHtml = helpAudioBySubject.length
    ? `
      <div class="card">
        <h3 style="margin-top:0;">Help &amp; audio use</h3>
        <div style="color:var(--muted); font-size:0.85rem; margin-top:-6px; margin-bottom:10px;">Share of questions where she opened the hint (🤔) or used read-aloud (🔊) at least once.</div>
        ${helpAudioBySubject
          .map((s) => {
            const pct = Math.round((s.usedEitherCount / s.total) * 100);
            return `
          <div style="margin-bottom:8px;">
            <div style="font-weight:700; color:${SUBJECT_COLOR[s.subject.key]};">${escapeHtml(s.subject.name)}</div>
            <div style="font-size:0.9rem; margin-left:4px;">${pct}% of ${s.total} questions — 🤔 ${s.usedHintCount} &middot; 🔊 ${s.usedAudioCount}</div>
          </div>
        `;
          })
          .join("")}
      </div>
    `
    : "";

  // Lets a parent start any real exam paper immediately, for this profile,
  // from inside the assessor view — the point being to test the exam flow
  // (or run a specific paper on demand) without waiting for the next
  // rotation Saturday. Every real paper across all 3 subjects is listed via
  // getAvailablePapers(), independent of pickExamPaper()'s rotation logic —
  // this is a deliberate manual override, not the automatic weekly pick.
  const examPapersHtml = `
    <div class="card">
      <h3 style="margin-top:0;">Exam papers</h3>
      <div style="color:var(--muted); font-size:0.85rem; margin-top:-6px; margin-bottom:10px;">Start any real past paper for ${escapeHtml(
        profileName
      )} right now — useful for testing, or to run one outside the usual Saturday rotation. Switches the active profile to ${escapeHtml(profileName)} and jumps straight into it.</div>
      ${Object.values(SUBJECTS)
        .map((subject) => {
          const papers = getAvailablePapers(subject.key);
          if (!papers.length) return "";
          return `
            <div style="margin-bottom:12px;">
              <div style="font-weight:700; color:${SUBJECT_COLOR[subject.key]};">${escapeHtml(subject.name)}</div>
              ${papers
                .map((p) => {
                  const mins = timeAllowedMinutes(p.key);
                  const unconfirmed = UNCONFIRMED_TIME_ALLOWED_PAPER_KEYS.includes(p.key);
                  return `
                <div class="test-row" data-start-paper="${escapeHtml(p.key)}" data-subject="${subject.key}">
                  <div>
                    <div><strong>${escapeHtml(p.paper)}</strong></div>
                    <div class="meta">${p.count} question${p.count === 1 ? "" : "s"} · ${mins} min${unconfirmed ? " (time unconfirmed)" : ""}</div>
                  </div>
                  <button class="btn secondary small" type="button">Start</button>
                </div>
              `;
                })
                .join("")}
            </div>
          `;
        })
        .join("")}
    </div>
  `;

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
                } ${a.source ? `<span class="paper-badge">${escapeHtml(a.source.code)} paper</span>` : ""}${
                  a.usedHint ? `<span class="help-badge" title="Used the hint">🤔</span>` : ""
                }${a.usedAudio ? `<span class="help-badge" title="Used read-aloud">🔊</span>` : ""}</div>
                <div style="font-weight:600; margin-top:4px;">${escapeHtml(a.prompt || "(question text not recorded for this older session)")}</div>
                ${a.chart ? `<div class="chart-wrap result-chart-wrap"><canvas id="assessor-chart-${i}-${j}"></canvas></div>` : ""}
                ${a.numberline ? renderNumberLineReviewHtml(a.numberline, a.userAnswerRaw, a.correct) : ""}
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
    ${weakSummaryHtml}
    ${helpSummaryHtml}
    ${examPapersHtml}
    ${sessionRows || `<div class="empty-state">No sessions yet.</div>`}
  `;

  document.getElementById("back-assessor").addEventListener("click", renderAssessorProfiles);
  main.querySelectorAll("[data-start-paper]").forEach((row) => {
    row.addEventListener("click", () => startExamFromAssessor(profileName, row.dataset.subject, row.dataset.startPaper));
  });
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
