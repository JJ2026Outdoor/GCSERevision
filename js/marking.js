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
  return false;
}

export function correctAnswerDisplay(question) {
  if (question.type === "mcq") return question.options[question.correctIndex];
  return question.accept[0];
}

export function userAnswerDisplay(question, userAnswer) {
  if (userAnswer === undefined || userAnswer === null || userAnswer === "") return "(no answer given)";
  if (question.type === "mcq") return question.options[Number(userAnswer)];
  return String(userAnswer);
}
