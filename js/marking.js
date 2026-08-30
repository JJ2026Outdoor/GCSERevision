export function normalize(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[\s,]+/g, "")
    .replace(/^£/, "")
    .replace(/\.$/, "");
}

// Classifies an angle (degrees, measured clockwise from the fixed radius,
// wrapped into [0, 360)) into the standard GCSE angle-type buckets. `tol`
// widens the right-angle and straight-line bands either side of exactly 90°
// and 180° — dragging a handle to *precisely* 90.000° isn't realistic, so a
// few degrees either side still counts as "right"/"straight" rather than
// spilling into "acute"/"obtuse"/"reflex". Shared by isCorrect() (scoring)
// and app.js (live label while the learner is dragging), so both always
// agree on what a given angle is called.
export function classifyAngleDeg(deg, tol = 4) {
  const d = ((deg % 360) + 360) % 360;
  if (Math.abs(d - 90) <= tol) return "right";
  if (Math.abs(d - 180) <= tol) return "straight";
  if (d > 0 && d < 90) return "acute";
  if (d > 90 && d < 180) return "obtuse";
  return "reflex";
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
  if (question.type === "click-a-side") {
    return question.correctSegmentIds.includes(userAnswer);
  }
  if (question.type === "drag-a-radius") {
    if (typeof userAnswer !== "number" || Number.isNaN(userAnswer)) return false;
    return classifyAngleDeg(userAnswer, question.classTolerance) === question.correctClass;
  }
  return false;
}

function segmentLabel(question, segmentId) {
  const seg = (question.segments || []).find((s) => s.id === segmentId);
  return seg ? seg.label || seg.id : segmentId;
}

const ANGLE_CLASS_LABEL = {
  acute: "an acute angle (less than 90°)",
  right: "a right angle (90°)",
  obtuse: "an obtuse angle (between 90° and 180°)",
  straight: "a straight line (180°)",
  reflex: "a reflex angle (more than 180°)",
};

export function correctAnswerDisplay(question) {
  if (question.type === "mcq") return optionLabel(question.options[question.correctIndex]);
  if (question.type === "numberline") return question.numberline.correctLabel || String(question.numberline.correct);
  if (question.type === "grid-shade") {
    return question.matchMode === "count"
      ? `${question.targetCount} cells shaded (any ${question.targetCount})`
      : `Cells shaded: ${question.targetShaded.slice().sort((a, b) => a - b).join(", ")}`;
  }
  if (question.type === "click-a-side") {
    return question.correctSegmentIds.map((id) => segmentLabel(question, id)).join(" or ");
  }
  if (question.type === "drag-a-radius") {
    return question.correctLabel || ANGLE_CLASS_LABEL[question.correctClass] || question.correctClass;
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
  if (question.type === "click-a-side") {
    return segmentLabel(question, userAnswer);
  }
  if (question.type === "drag-a-radius") {
    const tol = question.classTolerance;
    return `${Math.round(userAnswer)}° — ${ANGLE_CLASS_LABEL[classifyAngleDeg(userAnswer, tol)]}`;
  }
  return String(userAnswer);
}
