// Templated Maths questions: each "generator" produces a fresh, randomised
// question every time it's called, so the same generator never shows the
// same numbers twice in a row. This is what gives Maths near-unlimited
// variety, on top of the hand-written questions in maths.js. Numbers are
// deliberately constrained so answers always come out clean (whole numbers
// or simple fractions) — no messy recurring decimals.
//
// Each generator's `generate()` returns a question in the same shape as a
// hand-written one (type/prompt/accept-or-options/explanation); app code
// tags on a stable `id` and the topic info, same as static questions.

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ---------- maths-1: Number ----------

function percentOfGenerator() {
  const percent = choice([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]);
  let base, value;
  do {
    base = randomInt(2, 40) * 10;
    value = (percent * base) / 100;
  } while (!Number.isInteger(value));
  return {
    type: "short",
    prompt: `Work out ${percent}% of ${base}.`,
    accept: [String(value)],
    explanation: `${percent}% of ${base} = (${percent}/100) × ${base} = ${value}.`,
  };
}

function roundingGenerator() {
  const whole = randomInt(1, 20);
  const d1 = randomInt(0, 9);
  const d2 = randomInt(0, 9);
  const d3 = randomInt(1, 9);
  const number = Number(`${whole}.${d1}${d2}${d3}`);
  const rounded = Number(number.toFixed(2));
  return {
    type: "short",
    prompt: `Round ${number} to 2 decimal places.`,
    accept: [rounded.toFixed(2), String(rounded)],
    explanation: `The third decimal digit is ${d3}, so round the second decimal ${d3 >= 5 ? "up" : "down (it stays the same)"}: ${number} → ${rounded.toFixed(2)}.`,
  };
}

function standardFormGenerator() {
  const intPart = randomInt(1, 9);
  const decDigit = randomInt(0, 9);
  const exponent = randomInt(3, 6);
  const c = `${intPart}.${decDigit}`;
  const ordinary = (intPart * 10 + decDigit) * Math.pow(10, exponent - 1);
  return {
    type: "short",
    prompt: `Write ${c} × 10^${exponent} as an ordinary number.`,
    accept: [String(ordinary)],
    explanation: `Multiplying by 10^${exponent} moves the decimal point ${exponent} places to the right: ${c} → ${ordinary}.`,
  };
}

// ---------- maths-2: Algebra ----------

function solveLinearGenerator() {
  const a = randomInt(2, 6);
  let x = randomInt(-9, 9);
  if (x === 0) x = 2;
  const b = randomInt(-15, 15);
  const c = a * x + b;
  const bStr = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`;
  const cStr = c >= 0 ? String(c) : `−${Math.abs(c)}`;
  return {
    type: "short",
    prompt: `Solve ${a}x ${bStr} = ${cStr}. Find x.`,
    accept: [String(x), `x=${x}`],
    explanation: `${a}x ${bStr} = ${cStr} → ${a}x = ${c - b} → x = ${c - b} ÷ ${a} = ${x}.`,
  };
}

function nthTermGenerator() {
  const a = randomInt(2, 6);
  const b = randomInt(-5, 10);
  const k = randomInt(4, 12);
  const value = a * k + b;
  const bStr = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`;
  return {
    type: "short",
    prompt: `The nth term of a sequence is ${a}n ${bStr}. Find the ${ordinal(k)} term.`,
    accept: [String(value)],
    explanation: `Substitute n = ${k}: ${a} × ${k} ${bStr} = ${value}.`,
  };
}

function expandSimplifyGenerator() {
  const c = randomInt(3, 6);
  const d = randomInt(1, 9);
  const e = randomInt(1, c - 1);
  const constant = c * d;
  const coeff = c - e;
  const coeffStr = coeff === 1 ? "x" : `${coeff}x`;
  const eStr = e === 1 ? "x" : `${e}x`;
  return {
    type: "short",
    prompt: `Expand and simplify ${c}(x + ${d}) − ${eStr}.`,
    accept: [`${coeffStr}+${constant}`],
    explanation: `${c}(x + ${d}) = ${c}x + ${constant}. Then ${c}x + ${constant} − ${eStr} = ${coeffStr} + ${constant}.`,
  };
}

// ---------- maths-3: Ratio & Proportion ----------

function shareRatioGenerator() {
  const p = randomInt(1, 6);
  const q = randomInt(1, 6);
  const unit = randomInt(2, 20);
  const amount = (p + q) * unit;
  const larger = Math.max(p, q) * unit;
  return {
    type: "short",
    prompt: `Share £${amount} in the ratio ${p}:${q}. What is the larger share, in pounds?`,
    accept: [String(larger), `£${larger}`],
    explanation: `Total parts = ${p + q}. One part = £${amount} ÷ ${p + q} = £${unit}. Larger share = ${Math.max(p, q)} × £${unit} = £${larger}.`,
  };
}

function percentChangeGenerator() {
  const increase = Math.random() < 0.5;
  const percent = choice([5, 10, 15, 20, 25, 30, 40, 50]);
  let base, changeAmt;
  do {
    base = randomInt(2, 40) * 10;
    changeAmt = (percent * base) / 100;
  } while (!Number.isInteger(changeAmt));
  const result = increase ? base + changeAmt : base - changeAmt;
  return {
    type: "short",
    prompt: `${increase ? "Increase" : "Decrease"} £${base} by ${percent}%.`,
    accept: [String(result), `£${result}`],
    explanation: `${percent}% of ${base} = ${changeAmt}. ${base} ${increase ? "+" : "−"} ${changeAmt} = ${result}.`,
  };
}

function speedGenerator() {
  const time = randomInt(2, 8);
  const speed = randomInt(20, 80);
  const distance = speed * time;
  return {
    type: "short",
    prompt: `A car travels ${distance} miles in ${time} hours. What is its average speed in mph?`,
    accept: [String(speed)],
    explanation: `Speed = distance ÷ time = ${distance} ÷ ${time} = ${speed} mph.`,
  };
}

// ---------- maths-4: Geometry & Measures ----------

function rectangleAreaGenerator() {
  const l = randomInt(3, 20);
  const w = randomInt(2, 15);
  const area = l * w;
  return {
    type: "short",
    prompt: `Find the area of a rectangle with length ${l}cm and width ${w}cm.`,
    accept: [String(area), `${area}cm2`, `${area}cm^2`],
    explanation: `Area = length × width = ${l} × ${w} = ${area}cm².`,
  };
}

function cuboidVolumeGenerator() {
  const l = randomInt(2, 10);
  const w = randomInt(2, 10);
  const h = randomInt(2, 10);
  const vol = l * w * h;
  return {
    type: "short",
    prompt: `Find the volume of a cuboid with length ${l}cm, width ${w}cm and height ${h}cm.`,
    accept: [String(vol), `${vol}cm3`, `${vol}cm^3`],
    explanation: `Volume = length × width × height = ${l} × ${w} × ${h} = ${vol}cm³.`,
  };
}

const PYTHAGOREAN_TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [9, 12, 15],
  [20, 21, 29],
];

function pythagorasGenerator() {
  const [a, b, c] = choice(PYTHAGOREAN_TRIPLES);
  const scale = randomInt(1, 3);
  const sa = a * scale;
  const sb = b * scale;
  const sc = c * scale;
  return {
    type: "short",
    prompt: `A right-angled triangle has shorter sides ${sa}cm and ${sb}cm. Find the length of the hypotenuse.`,
    accept: [String(sc), `${sc}cm`],
    explanation: `By Pythagoras' theorem: ${sa}² + ${sb}² = ${sa * sa} + ${sb * sb} = ${sc * sc}. The square root of ${sc * sc} is ${sc}cm.`,
  };
}

// ---------- maths-5: Probability & Statistics ----------

function meanGenerator() {
  const n = randomInt(4, 6);
  const nums = Array.from({ length: n }, () => randomInt(1, 20));
  let total = nums.reduce((s, x) => s + x, 0);
  const remainder = total % n;
  if (remainder !== 0) {
    nums[n - 1] += n - remainder;
    total = nums.reduce((s, x) => s + x, 0);
  }
  const mean = total / n;
  return {
    type: "short",
    prompt: `Find the mean of these numbers: ${nums.join(", ")}.`,
    accept: [String(mean)],
    explanation: `Total = ${nums.join(" + ")} = ${total}. Divide by ${n} numbers: ${total} ÷ ${n} = ${mean}.`,
  };
}

function rangeGenerator() {
  const n = randomInt(4, 6);
  const nums = Array.from({ length: n }, () => randomInt(1, 30));
  const range = Math.max(...nums) - Math.min(...nums);
  return {
    type: "short",
    prompt: `Find the range of these numbers: ${nums.join(", ")}.`,
    accept: [String(range)],
    explanation: `Range = largest − smallest = ${Math.max(...nums)} − ${Math.min(...nums)} = ${range}.`,
  };
}

function probabilityGenerator() {
  const colorPairs = [
    ["red", "blue"],
    ["green", "yellow"],
    ["black", "white"],
    ["orange", "purple"],
  ];
  const [colorA, colorB] = choice(colorPairs);
  const countA = randomInt(2, 8);
  const countB = randomInt(2, 8);
  const total = countA + countB;
  const g = gcd(countA, total);
  const simplified = `${countA / g}/${total / g}`;
  return {
    type: "short",
    prompt: `A bag has ${countA} ${colorA} balls and ${countB} ${colorB} balls. What is the probability of picking a ${colorA} ball? Give your answer as a fraction in simplest form.`,
    accept: [simplified],
    explanation: `${countA} ${colorA} out of ${total} total balls = ${countA}/${total}${g > 1 ? `, which simplifies to ${simplified}` : ""}.`,
  };
}

export const MATHS_GENERATORS = [
  { id: "m1gen-percent", topicId: "maths-1", generate: percentOfGenerator },
  { id: "m1gen-round", topicId: "maths-1", generate: roundingGenerator },
  { id: "m1gen-standardform", topicId: "maths-1", generate: standardFormGenerator },
  { id: "m2gen-linear", topicId: "maths-2", generate: solveLinearGenerator },
  { id: "m2gen-nthterm", topicId: "maths-2", generate: nthTermGenerator },
  { id: "m2gen-expand", topicId: "maths-2", generate: expandSimplifyGenerator },
  { id: "m3gen-shareratio", topicId: "maths-3", generate: shareRatioGenerator },
  { id: "m3gen-percentchange", topicId: "maths-3", generate: percentChangeGenerator },
  { id: "m3gen-speed", topicId: "maths-3", generate: speedGenerator },
  { id: "m4gen-rectarea", topicId: "maths-4", generate: rectangleAreaGenerator },
  { id: "m4gen-cuboidvol", topicId: "maths-4", generate: cuboidVolumeGenerator },
  { id: "m4gen-pythagoras", topicId: "maths-4", generate: pythagorasGenerator },
  { id: "m5gen-mean", topicId: "maths-5", generate: meanGenerator },
  { id: "m5gen-range", topicId: "maths-5", generate: rangeGenerator },
  { id: "m5gen-probability", topicId: "maths-5", generate: probabilityGenerator },
];
