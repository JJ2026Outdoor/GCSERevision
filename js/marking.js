export function normalize(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[\s,]+/g, "")
    .replace(/^£/, "")
    .replace(/\.$/, "");
}

// MCQ options can be a plain string (most questions) or a picture option
// `{ label, svg }` (Geometry & Measures questions where the choice is a
// shape, not a word — e.g. "which of these is a cylinder"). This always
// resolves to the text label, so results/assessor review text never shows
// a raw option object.
export function optionLabel(option) {
  return typeof option === "string" ? option : option.label;
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
  if (question.type === "grid-shade") {
    if (!Array.isArray(userAnswer)) return false;
    if (question.matchMode === "count") {
      return userAnswer.length === question.targetCount;
    }
    if (question.matchMode === "exact") {
      if (userAnswer.length !== question.targetShaded.length) return false;
      const target = new Set(question.targetShaded);
      return userAnswer.every((cell) => target.has(cell));
    }
    return false;
  }
  return false;
}

export function correctAnswerDisplay(question) {
  if (question.type === "mcq") return optionLabel(question.options[question.correctIndex]);
  if (question.type === "numberline") return question.numberline.correctLabel || String(question.numberline.correct);
  if (question.type === "grid-shade") {
    return question.matchMode === "count"
      ? `${question.targetCount} cells shaded (any ${question.targetCount})`
      : `Cells shaded: ${question.targetShaded.slice().sort((a, b) => a - b).join(", ")}`;
  }
  return question.accept[0];
}

export function userAnswerDisplay(question, userAnswer) {
  if (userAnswer === undefined || userAnswer === null || userAnswer === "") return "(no answer given)";
  if (question.type === "mcq") return optionLabel(question.options[Number(userAnswer)]);
  if (question.type === "numberline") return `${userAnswer}${question.numberline.unitLabel ? " " + question.numberline.unitLabel : ""}`;
  if (question.type === "grid-shade") {
    if (!Array.isArray(userAnswer) || userAnswer.length === 0) return "(no cells shaded)";
    return `${userAnswer.length} cell${userAnswer.length === 1 ? "" : "s"} shaded`;
  }
  return String(userAnswer);
}
