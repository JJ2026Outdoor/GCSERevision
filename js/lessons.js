import { LESSONS } from "../data/lessons.js";

// ---------- picking today's lesson ----------
//
// A learner who has been getting a topic wrong (the same "3 wrong in a row" rule the app
// already uses to flag weak topics) is taught ONE short lesson per day, before her first
// revision session of that day. Pure functions with no DOM or storage access, so they can be
// tested directly.

// A lesson belongs to its own topic and to any others listed in `alsoTopics` (past papers mix
// content from several units under one topic, so one lesson can serve more than one).
export function lessonsForTopic(subjectKey, topicId) {
  return LESSONS.filter((l) => l.subject === subjectKey && (l.topicId === topicId || (l.alsoTopics || []).includes(topicId)));
}

export function subjectsWithLessons() {
  return [...new Set(LESSONS.map((l) => l.subject))];
}

export function getLesson(id) {
  return LESSONS.find((l) => l.id === id) || null;
}

function startOfDayKey(d) {
  return new Date(d).toDateString();
}

// weak: [{ subject, topicId, topicTitle, streak }] — weak topics across the subjects that have
//   lessons (streak = how many wrong answers in a row).
// lessonRecords: this profile's saved lesson records ({ topicId, lessonId, timestamp, ... }).
// Returns { lesson, weak } or null when no lesson is due today.
//
// Rules:
//  1. Only one lesson per calendar day — if one has already been done today, nothing is due.
//  2. Only weak topics that actually have a lesson count.
//  3. Rotate: the weak topic taught longest ago (or never) goes first, so five weak topics get
//     five different lessons on five different days. Ties go to the longer wrong streak.
//  4. Within that topic, teach the lesson that matches what she has actually been getting wrong:
//     each lesson has `keywords`, and the wrong-answer prompts in weak.prompts (the questions in
//     the current wrong streak) are searched for them. The best match wins — but a lesson taught
//     in the last 3 days is skipped while another is available, so she isn't taught the same
//     thing on consecutive days. If nothing matches (or no prompts are given), it falls back to
//     the lesson seen least recently, never-seen first in the order they are written.
export function pickLessonForToday({ weak, lessonRecords, now = new Date() }) {
  const today = startOfDayKey(now);
  if (lessonRecords.some((r) => startOfDayKey(r.timestamp) === today)) return null;

  const candidates = weak.filter((w) => lessonsForTopic(w.subject, w.topicId).length > 0);
  if (!candidates.length) return null;

  const lastTopicAt = (topicId) =>
    lessonRecords.filter((r) => r.topicId === topicId).reduce((m, r) => Math.max(m, new Date(r.timestamp).getTime()), 0);

  const ordered = candidates.slice().sort((a, b) => {
    const d = lastTopicAt(a.topicId) - lastTopicAt(b.topicId);
    if (d !== 0) return d;
    if (b.streak !== a.streak) return b.streak - a.streak;
    return a.topicId < b.topicId ? -1 : 1;
  });
  const chosen = ordered[0];

  const text = (chosen.prompts || []).join(" ").toLowerCase();
  const recentCut = new Date(now).getTime() - 3 * 86400000;
  const lastLessonAt = (lessonId) =>
    lessonRecords.filter((r) => r.lessonId === lessonId).reduce((m, r) => Math.max(m, new Date(r.timestamp).getTime()), 0);

  const scored = lessonsForTopic(chosen.subject, chosen.topicId).map((l, i) => ({
    l,
    i,
    t: lastLessonAt(l.id),
    // Longer keywords are more specific ("pythagoras" says more than "angle"), so weight by length.
    score: text ? (l.keywords || []).filter((k) => text.includes(k.toLowerCase())).reduce((n, k) => n + k.length, 0) : 0
  }));
  const fresh = scored.filter((x) => x.t < recentCut);
  const pool = fresh.length ? fresh : scored;
  pool.sort((a, b) => b.score - a.score || a.t - b.t || a.i - b.i);

  return { lesson: pool[0].l, weak: chosen };
}

// Picks 2 distinct check questions from a lesson's pool of 4.
export function pickChecks(lesson, n = 2) {
  const pool = lesson.checks.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}
