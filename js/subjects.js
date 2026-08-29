import { MATHS_TESTS } from "../data/maths.js";
import { SCIENCE_TESTS } from "../data/science.js";
import { ENGLISH_TESTS } from "../data/english.js";
import { MATHS_GENERATORS } from "../data/maths-generators.js";
import { PAST_PAPER_QUESTIONS } from "../data/past-papers.js";

export const SUBJECTS = {
  maths: {
    key: "maths",
    name: "Maths",
    fullName: "GCSE Mathematics and Numeracy (Foundation)",
    className: "maths",
    topics: MATHS_TESTS
  },
  science: {
    key: "science",
    name: "Science",
    fullName: "GCSE The Sciences (Double Award)",
    className: "science",
    topics: SCIENCE_TESTS
  },
  english: {
    key: "english",
    name: "English",
    fullName: "GCSE English Language and Literature",
    className: "english",
    topics: ENGLISH_TESTS
  }
};

// Each "topic" (data/*.js calls these "tests") is a bank of ~8 questions on
// one area, e.g. Maths > Algebra. A session (daily mixed, or topic practice)
// draws 5 random questions from a pool built from one or more topics, so the
// same topic doesn't show the identical 5 questions every time.

export function getTopic(subjectKey, topicId) {
  const subject = SUBJECTS[subjectKey];
  if (!subject) return null;
  return subject.topics.find((t) => t.id === topicId) || null;
}

function tagQuestions(topic) {
  return topic.questions.map((q) => ({
    ...q,
    topicId: topic.id,
    topicTitle: topic.title,
    passage: topic.passage || null
  }));
}

// Maths also draws from randomised "generator" questions (see
// data/maths-generators.js) — each one is re-rolled with fresh numbers every
// time it's included in a pool, which is what gives Maths near-unlimited
// variety on top of the hand-written banks. Other subjects are fact- and
// comprehension-based, which doesn't template the same way, so they rely on
// a larger hand-written bank instead.
function generatorsForSubject(subjectKey) {
  return subjectKey === "maths" ? MATHS_GENERATORS : [];
}

function tagGenerated(subjectKey, generatorDef) {
  const topic = getTopic(subjectKey, generatorDef.topicId);
  const q = generatorDef.generate();
  return {
    ...q,
    id: generatorDef.id,
    topicId: generatorDef.topicId,
    topicTitle: topic ? topic.title : generatorDef.topicId,
    passage: null,
    generated: true,
    // grade/hint live on the generator descriptor (fixed per generator),
    // not on the freshly-generated question itself.
    grade: generatorDef.grade,
    hint: generatorDef.hint
  };
}

// Real past-paper questions (see data/past-papers.js) are folded into the
// same pools as the hand-written and generated ones, tagged with `pastPaper`
// so the UI can show a small "which paper this came from" stamp. Only Maths
// has any right now — more subjects/papers can be added the same way later.
function pastPapersForSubject(subjectKey) {
  return PAST_PAPER_QUESTIONS.filter((q) => getTopic(subjectKey, q.topicId) !== null);
}

function tagPastPaper(subjectKey, q) {
  const topic = getTopic(subjectKey, q.topicId);
  return {
    ...q,
    topicTitle: topic ? topic.title : q.topicId,
    passage: null,
    pastPaper: true
  };
}

export function getSubjectQuestionPool(subjectKey) {
  const subject = SUBJECTS[subjectKey];
  if (!subject) return [];
  const generated = generatorsForSubject(subjectKey).map((g) => tagGenerated(subjectKey, g));
  const pastPapers = pastPapersForSubject(subjectKey).map((q) => tagPastPaper(subjectKey, q));
  return [...subject.topics.flatMap(tagQuestions), ...generated, ...pastPapers];
}

export function getTopicQuestionPool(subjectKey, topicId) {
  const topic = getTopic(subjectKey, topicId);
  if (!topic) return [];
  const generated = generatorsForSubject(subjectKey)
    .filter((g) => g.topicId === topicId)
    .map((g) => tagGenerated(subjectKey, g));
  const pastPapers = pastPapersForSubject(subjectKey)
    .filter((q) => q.topicId === topicId)
    .map((q) => tagPastPaper(subjectKey, q));
  return [...tagQuestions(topic), ...generated, ...pastPapers];
}

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const SESSION_LENGTH = 5;

// The real grade ladder Wales uses for these double-award GCSEs (English
// Language and Literature, Mathematics and Numeracy, The Sciences) is a
// paired-letter scale — GG, FF, EE, DD, CC, BB, AA, A*A*. This app only
// covers Foundation-tier content, which realistically tops out well below
// the highest bands, so questions are graded across the bottom 5 of those —
// GG (easiest) through CC (hardest) — rather than the full 8-point scale.
export const GRADES = ["GG", "FF", "EE", "DD", "CC"];
const LEVEL_UP_STREAK = 3; // matches the "3 wrong in a row" weak-topic threshold, mirrored the other way

// Flattens every session's `answers` array (in date order) into one list —
// used both for weak-topic detection (app.js) and for working out a topic's
// current difficulty level (below).
export function flattenAnswers(results) {
  const sorted = [...results].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const flat = [];
  sorted.forEach((r) => (r.answers || []).forEach((a) => flat.push(a)));
  return flat;
}

// Everyone starts a topic at the easiest band. 3 correct answers in a row on
// that topic (across any session, daily or topic-practice) nudges the next
// questions up one grade; any wrong answer nudges back down one grade — never
// a hard reset to the bottom on a single slip. This is deliberately the
// mirror image of the existing "3 wrong in a row" weak-topic flag: that one
// flags for remedial practice, this one raises the ceiling as she improves.
export function computeTopicLevel(flatAnswers, topicId) {
  let level = 0;
  let streak = 0;
  flatAnswers
    .filter((a) => a.topicId === topicId)
    .forEach((a) => {
      if (a.correct) {
        streak += 1;
        if (streak >= LEVEL_UP_STREAK) {
          level = Math.min(level + 1, GRADES.length - 1);
          streak = 0;
        }
      } else {
        level = Math.max(level - 1, 0);
        streak = 0;
      }
    });
  return level;
}

function gradeIndex(q) {
  const idx = GRADES.indexOf(q.grade);
  return idx === -1 ? Math.floor(GRADES.length / 2) : idx; // any ungraded question defaults to the middle band
}

// Picks `n` questions from `pool`, biased toward grade band `level`: tries an
// exact match first, then widens to both neighbouring bands, then the next
// pair out, and so on — at each step preferring questions not in
// `excludeIds` (last session's set, so the same batch doesn't repeat) before
// re-using them. Degrades gracefully: a topic with little content at the
// exact right level still gets a full session, just from the nearest bands
// available rather than a random assortment.
function drawGraded(pool, level, n, excludeIds) {
  const picked = [];
  const pickedIds = new Set();
  for (let radius = 0; radius <= GRADES.length && picked.length < n; radius++) {
    const band = pool.filter((q) => !pickedIds.has(q.id) && Math.abs(gradeIndex(q) - level) === radius);
    const ordered = [...shuffle(band.filter((q) => !excludeIds.has(q.id))), ...shuffle(band.filter((q) => excludeIds.has(q.id)))];
    for (const q of ordered) {
      if (picked.length >= n) break;
      picked.push(q);
      pickedIds.add(q.id);
    }
  }
  return picked;
}

// mode: "daily" draws exactly one question from EVERY topic in the subject
// (so a subject with 5 topics always covers all 5 in one go); "topic" draws
// all 5 from a single topic. Both are graded: each draw is biased toward
// that topic's current level (see computeTopicLevel) rather than picked
// uniformly at random, so a session gets a little harder as she gets
// consecutive answers right on that topic, and eases off again if something
// is a genuine struggle.
//
// priorResults (this profile's past sessions for this subject, oldest first)
// drives both the level calculation and the "don't repeat last time's exact
// set" exclusion described above drawGraded.
export function buildSession(subjectKey, { mode, topicId } = { mode: "daily" }, priorResults = []) {
  const subject = SUBJECTS[subjectKey];
  const flat = flattenAnswers(priorResults);

  if (mode === "topic") {
    const pool = getTopicQuestionPool(subjectKey, topicId);
    const n = Math.min(SESSION_LENGTH, pool.length);
    const level = computeTopicLevel(flat, topicId);
    const matchingPrior = priorResults.filter((r) => r.mode === "topic" && r.topicId === topicId);
    const lastSession = matchingPrior[matchingPrior.length - 1];
    const excludeIds = new Set(lastSession ? (lastSession.answers || []).map((a) => a.questionId) : []);
    const questions = shuffle(drawGraded(pool, level, n, excludeIds));
    const topic = getTopic(subjectKey, topicId);
    return { mode, topicId, title: topic.title, questions };
  }

  const matchingPrior = priorResults.filter((r) => r.mode === "daily" && r.topicId === null);
  const lastSession = matchingPrior[matchingPrior.length - 1];
  const excludeIds = new Set(lastSession ? (lastSession.answers || []).map((a) => a.questionId) : []);
  const topics = subject.topics;
  const questions = [];
  for (let i = 0; i < SESSION_LENGTH; i++) {
    const topic = topics[i % topics.length];
    const pool = getTopicQuestionPool(subjectKey, topic.id);
    const level = computeTopicLevel(flat, topic.id);
    const [picked] = drawGraded(pool, level, 1, excludeIds);
    if (picked) questions.push(picked);
  }
  return { mode: "daily", topicId: null, title: "Today's 5 (Mixed)", questions: shuffle(questions) };
}

function todayKey() {
  return new Date().toDateString();
}

export function hasDoneDailyToday(results, subjectKey) {
  return results.some((r) => r.subject === subjectKey && r.mode === "daily" && new Date(r.timestamp).toDateString() === todayKey());
}
