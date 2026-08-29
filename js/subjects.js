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
    generated: true
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

// mode: "daily" pulls from every topic in the subject; "topic" pulls from one.
//
// priorResults (this profile's past sessions for this subject, oldest first)
// is used to avoid repeating the exact same 5-question set two sessions in a
// row: whatever appeared in the most recent matching session (same mode, and
// same topic for topic-mode) is excluded from the draw where possible. With
// small pools (~8 questions per topic) this can't guarantee full variety
// forever — see README — but it stops the same batch showing up back to back.
export function buildSession(subjectKey, { mode, topicId } = { mode: "daily" }, priorResults = []) {
  const pool = mode === "topic" ? getTopicQuestionPool(subjectKey, topicId) : getSubjectQuestionPool(subjectKey);
  const n = Math.min(SESSION_LENGTH, pool.length);

  const matchingTopicId = mode === "topic" ? topicId : null;
  const matchingPrior = priorResults.filter((r) => r.mode === mode && r.topicId === matchingTopicId);
  const lastSession = matchingPrior[matchingPrior.length - 1];
  const excludeIds = new Set(lastSession ? (lastSession.answers || []).map((a) => a.questionId) : []);

  const fresh = pool.filter((q) => !excludeIds.has(q.id));
  let questions;
  if (fresh.length >= n) {
    questions = shuffle(fresh).slice(0, n);
  } else {
    const usedButNeeded = shuffle(pool.filter((q) => excludeIds.has(q.id))).slice(0, n - fresh.length);
    questions = shuffle([...fresh, ...usedButNeeded]);
  }

  const topic = mode === "topic" ? getTopic(subjectKey, topicId) : null;
  return {
    mode,
    topicId: mode === "topic" ? topicId : null,
    title: mode === "topic" ? topic.title : "Today's 5 (Mixed)",
    questions
  };
}

function todayKey() {
  return new Date().toDateString();
}

export function hasDoneDailyToday(results, subjectKey) {
  return results.some((r) => r.subject === subjectKey && r.mode === "daily" && new Date(r.timestamp).toDateString() === todayKey());
}
