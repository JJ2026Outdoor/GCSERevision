export function normalize(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[\s,]+/g, "")
    .replace(/^£/, "")
    .replace(/\.$/, "");
}

export function isCorrect(question, userAnswer) {
  if (userAnswer === undefined || userAnswer === null || userAnswer === "") return false;
  if (question.type === "mcq") {
    return Number(userAnswer) === question.correctIndex;
  }
  if (question.type === "short") {
    const norm = normalize(userAnswer);
    return question.accept.some((a) => normalize(a) === norm);
  }
  if (question.type === "numberline") {
    if (typeof userAnswer !== "number" || Number.isNaN(userAnswer)) return false;
    const { correct, tolerance = 0 } = question.numberline;
    return Math.abs(userAnswer - correct) <= tolerance;
  }
  return false;
}

export function correctAnswerDisplay(question) {
  if (question.type === "mcq") return question.options[question.correctIndex];
  if (question.type === "numberline") return question.numberline.correctLabel || String(question.numberline.correct);
  return question.accept[0];
}

export function userAnswerDisplay(question, userAnswer) {
  if (userAnswer === undefined || userAnswer === null || userAnswer === "") return "(no answer given)";
  if (question.type === "mcq") return question.options[Number(userAnswer)];
  if (question.type === "numberline") return `${userAnswer}${question.numberline.unitLabel ? " " + question.numberline.unitLabel : ""}`;
  return String(userAnswer);
}
