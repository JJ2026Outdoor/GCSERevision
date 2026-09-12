// Templated Science questions: each "generator" produces a fresh, randomised
// question every time it's called, exactly the same idea as
// data/maths-generators.js. Only built for the parts of the Science content
// that are genuinely formula-based (Physics calculations, a genetics cross,
// balancing a chemical equation) — every formula and cross type used below
// already appears as a hand-written question in data/science.js, so this
// isn't new curriculum content, just more randomised practice on formulas
// this app already teaches. The purely recall-based topics (science-1
// Biology – Basis of Life; most of science-2's Chemistry beyond balancing;
// the non-genetics half of science-4) don't get generators for the same
// reason English's comprehension topics don't: there's no safe way to
// template a fact-recall or inference question and guarantee the generated
// answer is still correct.
//
// Each generator's `generate()` returns a question in the same shape as a
// hand-written one (type/prompt/accept/explanation); app code tags on a
// stable `id` and the topic info, same as static questions and same as the
// Maths generators.

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

// ---------- science-3: Physics — Forces, Motion & the Universe ----------
// Every formula here is already used in a hand-written science-3 question
// (speed, F=ma, weight=mg, efficiency), just re-rolled with fresh numbers.

function speedGenerator() {
  const speed = choice([5, 10, 15, 20, 25]);
  const time = choice([2, 4, 5, 8, 10]);
  const distance = speed * time;
  return {
    type: "short",
    prompt: `Calculate the speed of a car that travels ${distance}m in ${time} seconds.`,
    accept: [String(speed), `${speed}m/s`],
    explanation: `Speed = distance ÷ time = ${distance} ÷ ${time} = ${speed}m/s.`,
  };
}

function forceMassAccelerationGenerator() {
  const mass = choice([2, 5, 10, 15, 20, 25]);
  const accel = choice([1, 2, 3, 4, 5]);
  const force = mass * accel;
  return {
    type: "short",
    prompt: `Using force = mass × acceleration, find the force needed to accelerate a ${mass}kg mass at ${accel}m/s².`,
    accept: [String(force), `${force}N`],
    explanation: `Force = mass × acceleration = ${mass} × ${accel} = ${force}N.`,
  };
}

function weightGenerator() {
  const mass = choice([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20]);
  const weight = mass * 10;
  return {
    type: "short",
    prompt: `Calculate the weight of a ${mass}kg object on Earth, using gravitational field strength g = 10 N/kg.`,
    accept: [String(weight), `${weight}N`],
    explanation: `Weight = mass × g = ${mass} × 10 = ${weight}N.`,
  };
}

function efficiencyGenerator() {
  let percent, input, useful;
  do {
    percent = choice([10, 20, 25, 40, 50, 60, 75, 80, 90]);
    input = randomInt(2, 20) * 10;
    useful = (percent * input) / 100;
  } while (!Number.isInteger(useful));
  return {
    type: "short",
    prompt: `Using efficiency = (useful energy transferred ÷ input energy) × 100, calculate the efficiency of a device that usefully transfers ${useful}J of energy from an input of ${input}J. Give your answer as a percentage.`,
    accept: [String(percent), `${percent}%`],
    explanation: `Efficiency = (useful ÷ input) × 100 = (${useful} ÷ ${input}) × 100 = ${percent}%.`,
  };
}

// ---------- science-5: Physics — Radioactivity, Electricity & Energy ----------
// Formulas already used in a hand-written science-5 question (I=V/R, work
// done=F×d, ΔPE=mgh); half-life is already asked about conceptually there,
// this just adds the numeric "how much is left" version of the same idea.

function currentGenerator() {
  const current = choice([1, 2, 3, 4, 5, 6]);
  const resistance = choice([1, 2, 3, 4, 5, 10]);
  const voltage = current * resistance;
  return {
    type: "short",
    prompt: `Using current = voltage ÷ resistance, find the current when the voltage is ${voltage}V and the resistance is ${resistance}Ω.`,
    accept: [String(current), `${current}A`],
    explanation: `Current = voltage ÷ resistance = ${voltage} ÷ ${resistance} = ${current}A.`,
  };
}

function workDoneGenerator() {
  const force = choice([5, 10, 15, 20, 25, 50]);
  const distance = choice([1, 2, 3, 4, 5, 10]);
  const work = force * distance;
  return {
    type: "short",
    prompt: `Using work done = force × distance, calculate the work done when a force of ${force}N moves an object ${distance}m.`,
    accept: [String(work), `${work}J`],
    explanation: `Work done = force × distance = ${force} × ${distance} = ${work}J.`,
  };
}

function gpeGenerator() {
  const mass = choice([1, 2, 5, 10, 20]);
  const height = choice([1, 2, 5, 10]);
  const gpe = mass * 10 * height;
  return {
    type: "short",
    prompt: `Using ΔPE = mass × gravitational field strength × change in height, calculate the gravitational potential energy gained when a ${mass}kg object is raised ${height}m, using g = 10 N/kg.`,
    accept: [String(gpe), `${gpe}J`],
    explanation: `ΔPE = mass × g × height = ${mass} × 10 × ${height} = ${gpe}J.`,
  };
}

function halfLifeGenerator() {
  const halfLifeDays = choice([2, 5, 10]);
  const halfLivesElapsed = choice([1, 2, 3, 4]);
  const elapsedDays = halfLifeDays * halfLivesElapsed;
  const remainingMass = choice([1, 2, 5, 10]);
  const initialMass = remainingMass * Math.pow(2, halfLivesElapsed);
  return {
    type: "short",
    prompt: `A radioactive sample starts with a mass of ${initialMass}g. Its half-life is ${halfLifeDays} days. What mass remains after ${elapsedDays} days?`,
    accept: [String(remainingMass), `${remainingMass}g`],
    explanation: `${elapsedDays} days ÷ ${halfLifeDays}-day half-life = ${halfLivesElapsed} half-lives. Halve the mass ${halfLivesElapsed} time${halfLivesElapsed === 1 ? "" : "s"}: ${initialMass}g → ${remainingMass}g.`,
  };
}

// ---------- science-2: Chemistry — Matter & How They Behave ----------
// The existing hand-written science-2 topic already asks a "find the
// missing number" balancing question (2Mg + O2 → 2MgO), so this generalises
// that exact question style to a small set of other real, correctly
// balanced equations (verified atom-by-atom before shipping), each time
// blanking a random one of the coefficients.

const BALANCED_EQUATIONS = [
  { reactants: [["Mg", 2], ["O2", 1]], products: [["MgO", 2]] },
  { reactants: [["Na", 2], ["Cl2", 1]], products: [["NaCl", 2]] },
  { reactants: [["CH4", 1], ["O2", 2]], products: [["CO2", 1], ["H2O", 2]] },
];

function formatSpecies(species, coeff, isBlank) {
  if (isBlank) return `__${species}`;
  return coeff === 1 ? species : `${coeff}${species}`;
}

function balanceEquationGenerator() {
  const eq = choice(BALANCED_EQUATIONS);
  const entries = [
    ...eq.reactants.map(([species, coeff]) => ({ species, coeff, side: "reactant" })),
    ...eq.products.map(([species, coeff]) => ({ species, coeff, side: "product" })),
  ];
  const blankIndex = randomInt(0, entries.length - 1);
  const reactantsStr = entries
    .filter((e) => e.side === "reactant")
    .map((e, i) => formatSpecies(e.species, e.coeff, entries.indexOf(e) === blankIndex))
    .join(" + ");
  const productsStr = entries
    .filter((e) => e.side === "product")
    .map((e) => formatSpecies(e.species, e.coeff, entries.indexOf(e) === blankIndex))
    .join(" + ");
  const answer = entries[blankIndex].coeff;
  const fullEquation = `${entries
    .filter((e) => e.side === "reactant")
    .map((e) => formatSpecies(e.species, e.coeff, false))
    .join(" + ")} → ${entries
    .filter((e) => e.side === "product")
    .map((e) => formatSpecies(e.species, e.coeff, false))
    .join(" + ")}`;
  return {
    type: "short",
    prompt: `Balance this equation by finding the missing number: ${reactantsStr} → ${productsStr}. What number goes in the gap?`,
    accept: [String(answer)],
    explanation: `The fully balanced equation is ${fullEquation} — the same number of atoms of each element must appear on both sides.`,
  };
}

// ---------- science-4: Biology & Chemistry — Continuity of Life / Bonding & Resources ----------
// The existing hand-written science-4 topic already has a Bb × Bb
// monohybrid cross question, so this generalises the three standard
// monohybrid cross patterns (heterozygous × heterozygous, heterozygous ×
// homozygous recessive, homozygous dominant × homozygous recessive) across
// a small set of real dominant/recessive trait pairs.

const GENETICS_TRAITS = [
  { letter: "T", dominant: "tall", recessive: "short", organism: "pea plants" },
  { letter: "R", dominant: "round seeds", recessive: "wrinkled seeds", organism: "pea plants" },
  { letter: "B", dominant: "brown eyes", recessive: "blue eyes", organism: "humans" },
  { letter: "H", dominant: "hairy leaves", recessive: "smooth leaves", organism: "a species of plant" },
];

const MONOHYBRID_CROSSES = [
  {
    recessivePercent: 25,
    describe: (t) => `Two ${t.organism} that are both heterozygous (${t.letter}${t.letter.toLowerCase()}) for this gene are crossed.`,
    workingOut: (t) =>
      `${t.letter}${t.letter.toLowerCase()} × ${t.letter}${t.letter.toLowerCase()} gives offspring genotypes ${t.letter}${t.letter} : ${t.letter}${t.letter.toLowerCase()} : ${t.letter.toLowerCase()}${t.letter.toLowerCase()} in a 1:2:1 ratio — only the ${t.letter.toLowerCase()}${t.letter.toLowerCase()} quarter shows ${t.recessive}, so 25%.`,
  },
  {
    recessivePercent: 50,
    describe: (t) => `A heterozygous (${t.letter}${t.letter.toLowerCase()}) ${t.organism} is crossed with a homozygous recessive (${t.letter.toLowerCase()}${t.letter.toLowerCase()}) one.`,
    workingOut: (t) =>
      `${t.letter}${t.letter.toLowerCase()} × ${t.letter.toLowerCase()}${t.letter.toLowerCase()} gives offspring genotypes ${t.letter}${t.letter.toLowerCase()} : ${t.letter.toLowerCase()}${t.letter.toLowerCase()} in a 1:1 ratio, so half (50%) show ${t.recessive}.`,
  },
  {
    recessivePercent: 0,
    describe: (t) => `A homozygous dominant (${t.letter}${t.letter}) ${t.organism} is crossed with a homozygous recessive (${t.letter.toLowerCase()}${t.letter.toLowerCase()}) one.`,
    workingOut: (t) =>
      `${t.letter}${t.letter} × ${t.letter.toLowerCase()}${t.letter.toLowerCase()} gives every offspring the genotype ${t.letter}${t.letter.toLowerCase()}, which shows ${t.dominant} — so 0% show ${t.recessive}.`,
  },
];

function monohybridRatioGenerator() {
  const trait = choice(GENETICS_TRAITS);
  const cross = choice(MONOHYBRID_CROSSES);
  return {
    type: "short",
    prompt: `In ${trait.organism}, ${trait.dominant} (${trait.letter}) is dominant over ${trait.recessive} (${trait.letter.toLowerCase()}). ${cross.describe(trait)} What percentage of the offspring would be expected to show ${trait.recessive}?`,
    accept: [String(cross.recessivePercent), `${cross.recessivePercent}%`],
    explanation: cross.workingOut(trait),
  };
}

export const SCIENCE_GENERATORS = [
  { id: "s3gen-speed", topicId: "science-3", grade: "FF", hint: "Speed = distance ÷ time.", generate: speedGenerator },
  { id: "s3gen-force", topicId: "science-3", grade: "EE", hint: "Force = mass × acceleration.", generate: forceMassAccelerationGenerator },
  { id: "s3gen-weight", topicId: "science-3", grade: "GG", hint: "Weight = mass × gravitational field strength (g = 10 N/kg on Earth).", generate: weightGenerator },
  { id: "s3gen-efficiency", topicId: "science-3", grade: "DD", hint: "Work out useful ÷ input as a fraction first, then multiply by 100 to turn it into a percentage.", generate: efficiencyGenerator },
  { id: "s5gen-current", topicId: "science-5", grade: "FF", hint: "Current = voltage ÷ resistance.", generate: currentGenerator },
  { id: "s5gen-workdone", topicId: "science-5", grade: "GG", hint: "Work done = force × distance.", generate: workDoneGenerator },
  { id: "s5gen-gpe", topicId: "science-5", grade: "EE", hint: "Gravitational potential energy = mass × g × height, using g = 10 N/kg.", generate: gpeGenerator },
  { id: "s5gen-halflife", topicId: "science-5", grade: "DD", hint: "Work out how many half-lives have passed, then halve the mass that many times.", generate: halfLifeGenerator },
  { id: "s2gen-balance", topicId: "science-2", grade: "EE", hint: "Count the atoms of each element on both sides of the arrow — they must match. Work out what number is missing to balance them.", generate: balanceEquationGenerator },
  { id: "s4gen-genetics", topicId: "science-4", grade: "EE", hint: "Draw out a Punnett square with the two parents' alleles to see what fraction of offspring get each genotype.", generate: monohybridRatioGenerator },
];
