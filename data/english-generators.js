// Templated English questions: each "generator" produces a fresh, randomised
// question every time it's called, the same idea as data/maths-generators.js
// and data/science-generators.js. Only built for english-1 (SPaG &
// Vocabulary) — this is the one English topic that is genuinely rule-based
// rather than comprehension/inference-based, so (like a Maths formula or a
// Science equation) an answer can be generated and guaranteed correct by
// construction. Every generator here either draws from a curated bank of
// verified word pairs/sentences, or builds its wrong options mechanically
// from a rule that is always wrong regardless of which words get slotted in
// (e.g. "comma placed one word too early" is wrong no matter which
// introductory phrase is chosen).
//
// english-2 through english-5 (comprehension, fiction inference, literary
// devices, poetry) deliberately get no generators, for the same reason
// science-1 didn't: there's no safe way to template a comprehension or
// inference question and guarantee the generated "correct" answer is still
// actually correct for freshly-generated content.

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

// Shuffles `options` and reports the new index of whichever entry === the
// given correct value (all option sets used below are curated to be unique
// strings within their own question, so indexOf-after-shuffle is reliable).
function shuffleTracked(options, correctValue) {
  const shuffled = options.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return { options: shuffled, correctIndex: shuffled.indexOf(correctValue) };
}

// ---------- Synonyms ----------
const SYNONYM_BANK = [
  { word: "happy", correct: "joyful", distractors: ["furious", "anxious", "weary"] },
  { word: "big", correct: "enormous", distractors: ["tiny", "ordinary", "silent"] },
  { word: "sad", correct: "miserable", distractors: ["cheerful", "ecstatic", "calm"] },
  { word: "angry", correct: "furious", distractors: ["content", "relaxed", "cheerful"] },
  { word: "fast", correct: "rapid", distractors: ["sluggish", "stationary", "quiet"] },
  { word: "brave", correct: "courageous", distractors: ["timid", "foolish", "careless"] },
  { word: "beautiful", correct: "stunning", distractors: ["hideous", "plain", "dull"] },
  { word: "intelligent", correct: "clever", distractors: ["foolish", "careless", "lazy"] },
  { word: "tired", correct: "exhausted", distractors: ["energetic", "alert", "cheerful"] },
  { word: "quiet", correct: "silent", distractors: ["loud", "noisy", "chaotic"] },
  { word: "old", correct: "ancient", distractors: ["modern", "youthful", "new"] },
  { word: "scared", correct: "terrified", distractors: ["confident", "calm", "bold"] }
];

function synonymGenerator() {
  const item = choice(SYNONYM_BANK);
  const { options, correctIndex } = shuffleTracked([item.correct, ...item.distractors], item.correct);
  return {
    type: "mcq",
    prompt: `Which word is a synonym for '${item.word}'?`,
    options,
    correctIndex,
    explanation: `"${item.correct.charAt(0).toUpperCase() + item.correct.slice(1)}" shares the same core meaning as "${item.word}".`
  };
}

// ---------- Antonyms ----------
const ANTONYM_BANK = [
  { word: "ancient", accept: ["modern", "new", "recent", "contemporary"] },
  { word: "happy", accept: ["sad", "unhappy", "miserable"] },
  { word: "big", accept: ["small", "tiny", "little"] },
  { word: "fast", accept: ["slow"] },
  { word: "brave", accept: ["cowardly", "timid"] },
  { word: "hot", accept: ["cold", "cool"] },
  { word: "strong", accept: ["weak"] },
  { word: "full", accept: ["empty"] },
  { word: "difficult", accept: ["easy", "simple"] },
  { word: "generous", accept: ["mean", "selfish", "stingy"] },
  { word: "early", accept: ["late"] },
  { word: "increase", accept: ["decrease", "reduce"] }
];

function antonymGenerator() {
  const item = choice(ANTONYM_BANK);
  return {
    type: "short",
    prompt: `Give a word that means the opposite of '${item.word}'.`,
    accept: item.accept,
    explanation: `"${item.accept.map((a) => a.charAt(0).toUpperCase() + a.slice(1)).join('", "')}" ${item.accept.length > 1 ? "are all acceptable antonyms" : "is an acceptable antonym"} of "${item.word}".`
  };
}

// ---------- Homophones ----------
// Each entry: variants of ONE sentence, only one of which uses the correct
// homophone — same shape as the existing hand-written e1q9 question, just a
// bigger bank of them so a generator can pick a fresh one each time.
const HOMOPHONE_BANK = [
  { correct: "They're going to the beach this weekend.", wrong: ["Their going to the beach this weekend.", "There going to the beach this weekend."] },
  { correct: "The dog wagged its tail happily.", wrong: ["The dog wagged it's tail happily."] },
  { correct: "You're going to love this film.", wrong: ["Your going to love this film."] },
  { correct: "Whose coat is this?", wrong: ["Who's coat is this?"] },
  { correct: "Who's coming to the party?", wrong: ["Whose coming to the party?"] },
  { correct: "We're going to be late.", wrong: ["Were going to be late.", "Where going to be late."] },
  { correct: "I don't know where I put my keys.", wrong: ["I don't know were I put my keys.", "I don't know we're I put my keys."] },
  { correct: "Their house is at the end of the road.", wrong: ["There house is at the end of the road.", "They're house is at the end of the road."] }
];

function homophoneGenerator() {
  const item = choice(HOMOPHONE_BANK);
  const { options, correctIndex } = shuffleTracked([item.correct, ...item.wrong], item.correct);
  return {
    type: "mcq",
    prompt: "Which sentence uses the correct homophone?",
    options,
    correctIndex,
    explanation: `"${item.correct}" is the version using the correct homophone.`
  };
}

// ---------- Possessive apostrophes ----------
const APOSTROPHE_OWNERS = [
  { singular: "dog", plural: "dogs" },
  { singular: "cat", plural: "cats" },
  { singular: "teacher", plural: "teachers" },
  { singular: "student", plural: "students" },
  { singular: "boy", plural: "boys" },
  { singular: "girl", plural: "girls" },
  { singular: "neighbour", plural: "neighbours" },
  { singular: "bird", plural: "birds" }
];
const APOSTROPHE_ITEMS = ["bone", "book", "bag", "lunch", "coat", "toy"];
const APOSTROPHE_PLACES = ["garden", "classroom", "car", "hallway", "kitchen", "cupboard"];
const APOSTROPHE_VERBS = ["buried", "hidden", "left", "found"];

function possessiveApostropheGenerator() {
  const scenario = choice(["singular", "plural"]);
  const owner = choice(APOSTROPHE_OWNERS);
  const item = choice(APOSTROPHE_ITEMS);
  const place = choice(APOSTROPHE_PLACES);
  const verb = choice(APOSTROPHE_VERBS);

  const correct =
    scenario === "singular"
      ? `The ${owner.singular}'s ${item} was ${verb} in the ${place}.`
      : `The ${owner.plural}' ${item} was ${verb} in the ${place}.`;
  const wrongOtherOwner =
    scenario === "singular"
      ? `The ${owner.plural}' ${item} was ${verb} in the ${place}.`
      : `The ${owner.singular}'s ${item} was ${verb} in the ${place}.`;
  const wrongNoApostrophe = `The ${owner.plural} ${item} was ${verb} in the ${place}.`;
  const wrongVerbAgreement =
    scenario === "singular"
      ? `The ${owner.singular}'s ${item} were ${verb} in the ${place}.`
      : `The ${owner.plural}' ${item} were ${verb} in the ${place}.`;

  const { options, correctIndex } = shuffleTracked([correct, wrongOtherOwner, wrongNoApostrophe, wrongVerbAgreement], correct);
  const ownerCountPhrase = scenario === "singular" ? `only one ${owner.singular} owns the ${item}` : `more than one ${owner.singular} owns the ${item}`;
  return {
    type: "mcq",
    prompt: `Which sentence uses the apostrophe correctly, given that ${ownerCountPhrase}?`,
    options,
    correctIndex,
    explanation:
      scenario === "singular"
        ? `"${owner.singular}'s" correctly shows one ${owner.singular} owns the ${item}. The other options either use the plural-owner apostrophe, drop the apostrophe entirely, or have a subject-verb agreement error ("${item} were").`
        : `"${owner.plural}'" correctly shows more than one ${owner.singular} owns the ${item} — the apostrophe goes after the "s" for a plural owner. The other options either use the single-owner apostrophe, drop the apostrophe entirely, or have a subject-verb agreement error ("${item} were").`
  };
}

// ---------- Irregular verb past tense ----------
const IRREGULAR_VERBS = [
  { infinitive: "write", past: "wrote" },
  { infinitive: "go", past: "went" },
  { infinitive: "see", past: "saw" },
  { infinitive: "eat", past: "ate" },
  { infinitive: "take", past: "took" },
  { infinitive: "give", past: "gave" },
  { infinitive: "begin", past: "began" },
  { infinitive: "break", past: "broke" },
  { infinitive: "choose", past: "chose" },
  { infinitive: "drive", past: "drove" },
  { infinitive: "speak", past: "spoke" },
  { infinitive: "swim", past: "swam" },
  { infinitive: "throw", past: "threw" },
  { infinitive: "fly", past: "flew" },
  { infinitive: "know", past: "knew" },
  { infinitive: "bring", past: "brought" },
  { infinitive: "buy", past: "bought" },
  { infinitive: "catch", past: "caught" },
  { infinitive: "teach", past: "taught" },
  { infinitive: "think", past: "thought" }
];

function irregularVerbGenerator() {
  const item = choice(IRREGULAR_VERBS);
  return {
    type: "short",
    prompt: `What is the past tense of the verb 'to ${item.infinitive}'?`,
    accept: [item.past],
    explanation: `"${item.past.charAt(0).toUpperCase() + item.past.slice(1)}" is the simple past tense of "${item.infinitive}".`
  };
}

// ---------- Word class identification ----------
const WORD_CLASS_BANK = [
  { sentence: "She ran QUICKLY to the shop.", word: "quickly", answer: "adverb" },
  { sentence: "The RED car sped past.", word: "red", answer: "adjective" },
  { sentence: "The cat SAT under the table.", word: "sat", answer: "verb" },
  { sentence: "The CAT sat under the table.", word: "cat", answer: "noun" },
  { sentence: "The cat sat UNDER the table.", word: "under", answer: "preposition" },
  { sentence: "He ANGRILY slammed the door.", word: "angrily", answer: "adverb" },
  { sentence: "The HAPPY child laughed.", word: "happy", answer: "adjective" },
  { sentence: "SHE laughed loudly.", word: "she", answer: "pronoun" },
  { sentence: "He walked slowly BUT surely.", word: "but", answer: "conjunction" },
  { sentence: "The DOG barked all night.", word: "dog", answer: "noun" },
  { sentence: "They QUICKLY finished their homework.", word: "quickly", answer: "adverb" },
  { sentence: "The teacher SPOKE clearly.", word: "spoke", answer: "verb" },
  { sentence: "The tall BUILDING loomed overhead.", word: "building", answer: "noun" },
  { sentence: "We waited BESIDE the river.", word: "beside", answer: "preposition" },
  { sentence: "I like tea AND coffee.", word: "and", answer: "conjunction" }
];

function wordClassGenerator() {
  const item = choice(WORD_CLASS_BANK);
  return {
    type: "short",
    prompt: `What word class (part of speech) is the underlined word? "${item.sentence}"`,
    accept: [item.answer],
    explanation: `"${item.word.charAt(0).toUpperCase() + item.word.slice(1)}" is a${/^[aeiou]/.test(item.answer) ? "n" : ""} ${item.answer} here.`
  };
}

// ---------- Word class of TWO words in a line of poetry (WJEC Unit 1 Q1a style) ----------
// Mirrors Unit 1 Q1a, which underlines two words from a line of a poem and asks
// for their word class (1 mark; the mark scheme accepts "adjective" or
// "modifier"). Every line below is original (not taken from any set poem), and
// every pair is two words of the SAME class used unambiguously in that line —
// no words like "run" or "silver" that could reasonably be read as another
// class. CAPITALS mark the two words, as in the single-word generator above.
const WORD_CLASS_PAIR_BANK = [
  // adjectives (the mark scheme also accepts "modifier")
  { line: "Not a FANCY card or a SHINY ribbon.", words: ["fancy", "shiny"], answer: "adjective" },
  { line: "The COLD, GREY sea rolled in.", words: ["cold", "grey"], answer: "adjective" },
  { line: "A TALL, NARROW door creaked open.", words: ["tall", "narrow"], answer: "adjective" },
  { line: "Beneath the HUGE, HOLLOW sky we waited.", words: ["huge", "hollow"], answer: "adjective" },
  { line: "The GENTLE rain fell on the ANCIENT hills.", words: ["gentle", "ancient"], answer: "adjective" },
  { line: "She wore a BRIGHT, SOFT scarf.", words: ["bright", "soft"], answer: "adjective" },
  { line: "Only a LONELY, QUIET street remained.", words: ["lonely", "quiet"], answer: "adjective" },
  // nouns
  { line: "The MOON hung over the SEA.", words: ["moon", "sea"], answer: "noun" },
  { line: "Bring me the BREAD and the WINE.", words: ["bread", "wine"], answer: "noun" },
  { line: "The BIRD sang in the GARDEN.", words: ["bird", "garden"], answer: "noun" },
  { line: "Her LAUGHTER filled the HALL.", words: ["laughter", "hall"], answer: "noun" },
  { line: "The CHILDREN chased the BALL.", words: ["children", "ball"], answer: "noun" },
  { line: "Night fell on the VILLAGE and the FIELDS.", words: ["village", "fields"], answer: "noun" },
  { line: "The SOLDIER carried his RIFLE.", words: ["soldier", "rifle"], answer: "noun" },
  // verbs
  { line: "She RAN and JUMPED across the stream.", words: ["ran", "jumped"], answer: "verb" },
  { line: "The wind HOWLED and ROARED.", words: ["howled", "roared"], answer: "verb" },
  { line: "We LAUGHED and DANCED all night.", words: ["laughed", "danced"], answer: "verb" },
  { line: "He WROTE a letter and POSTED it.", words: ["wrote", "posted"], answer: "verb" },
  { line: "The children SANG and CLAPPED.", words: ["sang", "clapped"], answer: "verb" },
  { line: "Snow FELL and COVERED the village.", words: ["fell", "covered"], answer: "verb" },
  // adverbs
  { line: "He spoke SOFTLY and SLOWLY.", words: ["softly", "slowly"], answer: "adverb" },
  { line: "She ran QUICKLY and QUIETLY.", words: ["quickly", "quietly"], answer: "adverb" },
  { line: "The bell rang LOUDLY and CLEARLY.", words: ["loudly", "clearly"], answer: "adverb" },
  { line: "They waited PATIENTLY and CALMLY.", words: ["patiently", "calmly"], answer: "adverb" },
  { line: "The rain fell GENTLY and STEADILY.", words: ["gently", "steadily"], answer: "adverb" },
  { line: "He held her hand TENDERLY and FIRMLY.", words: ["tenderly", "firmly"], answer: "adverb" }
];
const WORD_CLASS_JOB = {
  adjective: "describe nouns (things, people or places)",
  noun: "name things, people or places",
  verb: "show actions",
  adverb: "say how an action is done"
};

function wordClassPairGenerator() {
  const item = choice(WORD_CLASS_PAIR_BANK);
  const accept = [item.answer, item.answer + "s"];
  if (item.answer === "adjective") accept.push("modifier", "modifiers"); // WJEC mark scheme accepts both terms
  const [w1, w2] = item.words;
  return {
    type: "short",
    prompt: `What is the word class of the two words in capitals in this line? (1 mark)  “${item.line}”`,
    accept,
    explanation: `“${w1}” and “${w2}” are both ${item.answer}s — they ${WORD_CLASS_JOB[item.answer]}.${item.answer === "adjective" ? " (In the real exam, “modifier” is also accepted.)" : ""}`
  };
}

// ---------- Comma after an introductory phrase ----------
// Builds all four options mechanically from one intro phrase + one main
// clause, so it's correct by construction rather than needing a pre-written
// bank of wrong sentences: the "right" comma position is always right after
// the introductory phrase, and each wrong option moves it one word early
// or late — a rule that holds regardless of which phrase/clause get picked
// (verified against every bank entry having 3+ words on each side).
const COMMA_INTRO_PHRASES = [
  "After the long journey",
  "Before the match started",
  "Although it was raining",
  "Once the bell rang",
  "Despite her nerves",
  "When the sun set",
  "Since it was getting late",
  "While the kettle boiled"
];
const COMMA_MAIN_CLAUSES = [
  "we finally arrived home",
  "the team celebrated wildly",
  "she smiled with relief",
  "they packed up quickly",
  "he walked onto the field",
  "everyone cheered loudly",
  "she made a cup of tea",
  "the children ran outside"
];

function commaIntroGenerator() {
  const intro = choice(COMMA_INTRO_PHRASES);
  const main = choice(COMMA_MAIN_CLAUSES);
  const introWords = intro.split(" ");
  const mainWords = main.split(" ");

  const correct = `${intro}, ${main}.`;
  const wrongEarlyInIntro = `${introWords[0]}, ${introWords.slice(1).join(" ")} ${main}.`;
  const wrongLateInIntro = `${introWords.slice(0, -1).join(" ")}, ${introWords[introWords.length - 1]} ${main}.`;
  const wrongInMain = `${intro} ${mainWords[0]}, ${mainWords.slice(1).join(" ")}.`;

  const { options, correctIndex } = shuffleTracked([correct, wrongEarlyInIntro, wrongLateInIntro, wrongInMain], correct);
  return {
    type: "mcq",
    prompt: "Which version has the comma in the correct place?",
    options,
    correctIndex,
    explanation: `A comma is used after an introductory phrase or subordinate clause ("${intro}"), before the main clause begins ("${main}").`
  };
}

// ---------- Formal vs informal register ----------
const REGISTER_BANK = [
  {
    formal: "I intend to purchase a coffee later this afternoon.",
    informal: ["Gonna grab a coffee later, yeah?", "Coffee later? Sound good?", "Wanna get coffee?"]
  },
  {
    formal: "I would be grateful if you could reply at your earliest convenience.",
    informal: ["Hit me back ASAP!", "Text me back, yeah?", "Lemme know quick."]
  },
  {
    formal: "The committee has decided to postpone the meeting until next week.",
    informal: ["They're pushing the meeting back, apparently.", "Meeting's off till next week, I think.", "Meeting's been shoved back."]
  },
  {
    formal: "I sincerely apologise for the inconvenience this may have caused.",
    informal: ["Sorry 'bout that, my bad.", "Oops, sorry!", "My fault, sorry."]
  },
  {
    formal: "We would like to invite you to attend the ceremony.",
    informal: ["Wanna come to the thing?", "You coming to the ceremony or nah?", "Fancy coming along?"]
  },
  {
    formal: "Please do not hesitate to contact us should you require further assistance.",
    informal: ["Just gimme a shout if you need owt.", "Holler if you need anything.", "Text us if you're stuck."]
  }
];

function formalRegisterGenerator() {
  const item = choice(REGISTER_BANK);
  const { options, correctIndex } = shuffleTracked([item.formal, ...item.informal], item.formal);
  return {
    type: "mcq",
    prompt: "Which of these is written in a more FORMAL register?",
    options,
    correctIndex,
    explanation: "Formal register avoids contractions and casual/slang phrasing, using fuller, more precise wording."
  };
}

export const ENGLISH_GENERATORS = [
  { id: "e1gen-synonym", topicId: "english-1", grade: "GG", hint: "Look for the word with the closest meaning, not just a related idea.", generate: synonymGenerator },
  { id: "e1gen-antonym", topicId: "english-1", grade: "GG", hint: "Think of a word describing the opposite idea.", generate: antonymGenerator },
  { id: "e1gen-homophone", topicId: "english-1", grade: "GG", hint: "Work out which meaning is needed in the sentence, then match it to the correct spelling.", generate: homophoneGenerator },
  { id: "e1gen-apostrophe", topicId: "english-1", grade: "GG", hint: "Work out how many owners there are first, then decide where the apostrophe goes.", generate: possessiveApostropheGenerator },
  { id: "e1gen-verbtense", topicId: "english-1", grade: "GG", hint: "Irregular verbs don't just add '-ed' — think about how you'd say it happened yesterday.", generate: irregularVerbGenerator },
  { id: "e1gen-wordclass", topicId: "english-1", grade: "FF", hint: "Ask what job the underlined word is doing in the sentence — naming something, describing it, showing an action, or linking words together.", generate: wordClassGenerator },
  { id: "e1gen-wordclasspair", topicId: "english-1", grade: "GG", hint: "Both words do the same job. Ask what that job is: naming something, describing something, showing an action, or saying how an action is done.", generate: wordClassPairGenerator },
  { id: "e1gen-commaintro", topicId: "english-1", grade: "FF", hint: "A comma usually goes right after an introductory phrase, before the main part of the sentence begins.", generate: commaIntroGenerator },
  { id: "e1gen-register", topicId: "english-1", grade: "EE", hint: "Look for the option that avoids contractions and casual slang, using fuller, more precise wording.", generate: formalRegisterGenerator }
];
