// Short teaching lessons, one per skill, shown before the day's first revision session
// when the learner has been getting a topic wrong (see js/lessons.js for how one is picked).
//
// Each lesson: a short explanation (sections), one worked example, common mistakes to watch
// for, a pool of 4 check questions (2 are asked) and `keywords` — words that tend to appear in
// questions on that skill. js/lessons.js compares the keywords with the questions she has
// recently got wrong, so the lesson taught is the one that matches what she was struggling
// with; if nothing matches it falls back to the least recently taught lesson in the topic.
//
// A lesson can also serve other topics via `alsoTopics` — past papers mix content from several
// units under one topic, so e.g. the electricity and radioactivity lessons also cover science-3.
//
// A lesson can also serve other topics via `alsoTopics` — past papers mix content from several
// units under one topic, so e.g. the electricity and radioactivity lessons also cover science-3.
//
// All wording is original. Maths is pitched at Foundation tier and written after auditing the
// skills that the app's own question bank and past papers actually test; Science follows the
// five science topics in data/science.js (Units 1-6 of the WJEC GCSE Science course).
export const LESSONS = [
 {
  "id": "maths-n1",
  "subject": "maths",
  "topicId": "maths-1",
  "title": "Fractions, decimals and percentages",
  "why": "Number questions often ask you to switch between fractions, decimals and percentages, or to find a percentage of an amount.",
  "sections": [
   {
    "h": "Three ways to write the same amount",
    "p": [
     "A fraction, a decimal and a percentage can all describe the same amount. For example ½ = 0.5 = 50%."
    ],
    "list": [
     "Percent means “out of 100”, so 35% is 35/100.",
     "Fraction → decimal: divide the top by the bottom (7 ÷ 20 = 0.35).",
     "Decimal → percentage: multiply by 100 (0.35 × 100 = 35%).",
     "Decimal → fraction: write it over 10, 100 or 1000, then simplify (0.375 = 375/1000 = 3/8)."
    ]
   },
   {
    "h": "Finding a percentage of an amount",
    "p": [
     "Build it up from 10% and 1%."
    ],
    "list": [
     "10% = divide by 10.",
     "5% = half of 10%.",
     "1% = divide by 100.",
     "Or turn the percentage into a decimal and multiply: 15% of 240 = 0.15 × 240."
    ]
   }
  ],
  "worked": {
   "title": "Find 15% of 240",
   "steps": [
    "10% of 240 = 24",
    "5% of 240 = 12 (half of 24)",
    "15% = 24 + 12 = 36"
   ],
   "answer": "36"
  },
  "watch": [
   "Simplify a fraction fully: keep dividing the top and bottom by the same number until nothing more goes into both.",
   "A percentage can be more than 100%: 150% of a number is bigger than the number."
  ],
  "checks": [
   {
    "id": "maths-n1-c1",
    "type": "short",
    "prompt": "Write 7/20 as a percentage.",
    "accept": [
     "35%",
     "35"
    ],
    "explanation": "7 ÷ 20 = 0.35, and 0.35 × 100 = 35%."
   },
   {
    "id": "maths-n1-c2",
    "type": "short",
    "prompt": "Work out 20% of 150.",
    "accept": [
     "30"
    ],
    "explanation": "10% of 150 = 15, so 20% = 30."
   },
   {
    "id": "maths-n1-c3",
    "type": "short",
    "prompt": "Write 0.45 as a fraction in its simplest form.",
    "accept": [
     "9/20"
    ],
    "explanation": "0.45 = 45/100. Divide top and bottom by 5 to get 9/20."
   },
   {
    "id": "maths-n1-c4",
    "type": "mcq",
    "prompt": "Which of these is the same as 0.6?",
    "options": [
     "0.6%",
     "6%",
     "60%",
     "1/6"
    ],
    "correctIndex": 2,
    "explanation": "0.6 × 100 = 60%."
   }
  ],
  "keywords": [
   "percentage",
   "fraction",
   "decimal",
   "% of",
   "simplest form",
   "shade"
  ],
  "alsoTopics": [
   "maths-5"
  ]
 },
 {
  "id": "maths-n2",
  "subject": "maths",
  "topicId": "maths-1",
  "title": "Rounding, estimating and standard form",
  "why": "You are often asked to round to a given accuracy, to estimate an answer, or to write very big numbers in standard form.",
  "sections": [
   {
    "h": "Rounding",
    "p": [
     "Look at the digit just after the place you are rounding to. If it is 5 or more, round up; if it is 4 or less, leave it."
    ],
    "list": [
     "Decimal places (dp): count the digits after the decimal point.",
     "Significant figures (sf): count from the first digit that is not zero.",
     "Nearest 10, 100 or 1000: look at the digit to the right of that place."
    ]
   },
   {
    "h": "Estimating",
    "p": [
     "Round every number to 1 significant figure, then work it out."
    ],
    "list": [
     "78 × 21 ≈ 80 × 20 = 1600."
    ]
   },
   {
    "h": "Standard form",
    "p": [
     "Standard form is a number between 1 and 10 multiplied by a power of 10."
    ],
    "list": [
     "3.4 × 10⁵ means move the decimal point 5 places to the right: 340 000.",
     "Very small numbers use negative powers: 0.0007 = 7 × 10⁻⁴."
    ]
   }
  ],
  "worked": {
   "title": "Round 4.8562 to 2 decimal places",
   "steps": [
    "The second decimal place is 5 (4.85|62).",
    "The next digit is 6, which is 5 or more, so round up.",
    "4.85 becomes 4.86."
   ],
   "answer": "4.86"
  },
  "watch": [
   "Rounding up a 9 carries over: 3.49 to 1 dp is 3.5.",
   "When you estimate, round first and only then calculate."
  ],
  "checks": [
   {
    "id": "maths-n2-c1",
    "type": "short",
    "prompt": "Round 3482 to the nearest hundred.",
    "accept": [
     "3500"
    ],
    "explanation": "The tens digit is 8, so round the hundreds up: 3500."
   },
   {
    "id": "maths-n2-c2",
    "type": "short",
    "prompt": "Round 0.07463 to 2 significant figures.",
    "accept": [
     "0.075"
    ],
    "explanation": "The first significant figure is 7, the second is 4, and the next digit is 6, so round up to 0.075."
   },
   {
    "id": "maths-n2-c3",
    "type": "short",
    "prompt": "Write 5.2 × 10⁴ as an ordinary number.",
    "accept": [
     "52000"
    ],
    "explanation": "Move the decimal point 4 places right: 52 000."
   },
   {
    "id": "maths-n2-c4",
    "type": "mcq",
    "prompt": "Estimate 49 × 31 by rounding each number to 1 significant figure.",
    "options": [
     "1500",
     "2000",
     "150",
     "1200"
    ],
    "correctIndex": 0,
    "explanation": "49 ≈ 50 and 31 ≈ 30, and 50 × 30 = 1500."
   }
  ],
  "keywords": [
   "round",
   "decimal place",
   "significant",
   "estimate",
   "standard form",
   "nearest",
   "10^"
  ]
 },
 {
  "id": "maths-n3",
  "subject": "maths",
  "topicId": "maths-1",
  "title": "Primes, multiples, powers and BIDMAS",
  "why": "These are the rules behind a lot of number questions: what makes a number prime, how to find an LCM or HCF, how to handle powers and which part of a calculation to do first.",
  "sections": [
   {
    "h": "Factors, multiples and primes",
    "p": [],
    "list": [
     "A factor divides exactly into a number (factors of 12: 1, 2, 3, 4, 6, 12).",
     "A multiple is in the times table (multiples of 6: 6, 12, 18…).",
     "A prime number has exactly two factors: 1 and itself (2, 3, 5, 7, 11, 13…). 1 is not prime.",
     "LCM (lowest common multiple): list the multiples of each number and pick the smallest that appears in both lists.",
     "HCF (highest common factor): list the factors of each number and pick the largest that appears in both."
    ]
   },
   {
    "h": "Powers (indices)",
    "p": [
     "a³ means a × a × a."
    ],
    "list": [
     "Multiplying with the same base: add the powers (2³ × 2² = 2⁵).",
     "Dividing with the same base: subtract the powers (2⁵ ÷ 2² = 2³)."
    ]
   },
   {
    "h": "Order of operations — BIDMAS",
    "p": [
     "Do Brackets first, then Indices, then Division and Multiplication (left to right), then Addition and Subtraction (left to right)."
    ],
    "list": [
     "2 + 3 × 4 = 14, not 20, because multiplication comes before addition."
    ]
   }
  ],
  "worked": {
   "title": "Find the LCM of 6 and 8",
   "steps": [
    "Multiples of 6: 6, 12, 18, 24, 30…",
    "Multiples of 8: 8, 16, 24, 32…",
    "The first number in both lists is 24."
   ],
   "answer": "24"
  },
  "watch": [
   "The LCM is never smaller than the numbers themselves; the HCF is never bigger.",
   "You can only add powers when the base number is the same."
  ],
  "checks": [
   {
    "id": "maths-n3-c1",
    "type": "mcq",
    "prompt": "Which of these is a prime number?",
    "options": [
     "27",
     "21",
     "29",
     "33"
    ],
    "correctIndex": 2,
    "explanation": "29 has only two factors, 1 and 29. The others divide by 3."
   },
   {
    "id": "maths-n3-c2",
    "type": "short",
    "prompt": "Find the highest common factor (HCF) of 12 and 18.",
    "accept": [
     "6"
    ],
    "explanation": "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. The largest in both is 6."
   },
   {
    "id": "maths-n3-c3",
    "type": "short",
    "prompt": "Work out 3 + 4 × 5 − 2.",
    "accept": [
     "21"
    ],
    "explanation": "Multiply first: 4 × 5 = 20. Then 3 + 20 − 2 = 21."
   },
   {
    "id": "maths-n3-c4",
    "type": "short",
    "prompt": "Write 5⁴ × 5³ as a single power of 5.",
    "accept": [
     "5^7",
     "5⁷"
    ],
    "explanation": "Add the powers: 4 + 3 = 7, so 5⁷."
   }
  ],
  "keywords": [
   "prime",
   "factor",
   "multiple",
   "lcm",
   "hcf",
   "lowest common",
   "highest common",
   "power",
   "index",
   "brackets",
   "calculate 30"
  ]
 },
 {
  "id": "maths-n4",
  "subject": "maths",
  "topicId": "maths-1",
  "title": "Place value, negative numbers and money",
  "why": "Basic number questions test whether you can write and order numbers, work with negatives and follow money going in and out of an account.",
  "sections": [
   {
    "h": "Place value",
    "p": [
     "Each digit's value depends on its place. In 20 306 the 2 is 20 000, the 0 in the thousands place is nothing, the 3 is 300, the 0 in the tens place is nothing and the 6 is 6."
    ],
    "list": [
     "“Twenty thousand, three hundred and six” is written 20 306. The 0 holds the empty tens place.",
     "Write numbers in words in the same order: thirty thousand, one hundred and fifty-two = 30 152."
    ]
   },
   {
    "h": "Negative numbers",
    "p": [
     "Picture a number line. Numbers further left are smaller."
    ],
    "list": [
     "−10 is lower than −7, and −7 is lower than 0.",
     "Order −7, 0, −10, 11 from lowest: −10, −7, 0, 11.",
     "Two minus signs together make a plus: 5 − (−3) = 8. But −4 − 6 = −10."
    ]
   },
   {
    "h": "Money and bank statements",
    "p": [
     "Balance = money you started with + money paid in − money paid out. Work one line at a time."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "Noor starts with £350.00. Wages of £750.00 are paid in, then she pays £575.00 rent. What is her balance?",
   "steps": [
    "£350.00 + £750.00 = £1100.00",
    "£1100.00 − £575.00 = £525.00"
   ],
   "answer": "£525.00"
  },
  "watch": [
   "A number line is your friend: the further left, the smaller the number.",
   "On a statement, take one line at a time and write the new balance each time."
  ],
  "checks": [
   {
    "id": "maths-n4-c1",
    "type": "short",
    "prompt": "Write four thousand and thirty-five in figures.",
    "accept": [
     "4035"
    ],
    "explanation": "Four thousand = 4000, thirty-five = 35, with no hundreds: 4035."
   },
   {
    "id": "maths-n4-c2",
    "type": "mcq",
    "prompt": "Which list shows −3, 5, −8 and 0 in order, starting with the lowest?",
    "options": [
     "0, −3, −8, 5",
     "5, 0, −3, −8",
     "−8, −3, 0, 5",
     "−3, −8, 0, 5"
    ],
    "correctIndex": 2,
    "explanation": "The lowest is −8, then −3, then 0, then 5."
   },
   {
    "id": "maths-n4-c3",
    "type": "short",
    "prompt": "Work out −4 − 6.",
    "accept": [
     "-10",
     "−10"
    ],
    "explanation": "Start at −4 and go 6 further down: −10."
   },
   {
    "id": "maths-n4-c4",
    "type": "short",
    "prompt": "A bank balance is £420. A payment of £135 goes out and £60 is paid in. What is the new balance, in pounds?",
    "accept": [
     "345"
    ],
    "explanation": "420 − 135 = 285, and 285 + 60 = 345."
   }
  ],
  "keywords": [
   "figures",
   "in words",
   "place value",
   "order",
   "lowest",
   "smallest",
   "negative",
   "balance",
   "bank",
   "statement",
   "−",
   "subtract",
   "add ",
   "£",
   "pitch",
   "per night",
   "holiday",
   "total",
   "cost"
  ]
 },
 {
  "id": "maths-n5",
  "subject": "maths",
  "topicId": "maths-1",
  "title": "Squares, cubes, roots and using a calculator",
  "why": "These questions use special numbers and powers, and often expect you to use a calculator sensibly and round at the end.",
  "sections": [
   {
    "h": "Squares, cubes and roots",
    "p": [],
    "list": [
     "A square number is a number times itself: 1, 4, 9, 16, 25, 36, 49… (13² = 169).",
     "A cube number is a number times itself twice: 1, 8, 27, 64, 125… (2³ = 8).",
     "A square root undoes a square: √81 = 9.",
     "A power like 3⁵ means five 3s multiplied together: 3 × 3 × 3 × 3 × 3 = 243."
    ]
   },
   {
    "h": "Calculating with them",
    "p": [],
    "list": [
     "Do powers and roots before multiplying or adding (BIDMAS): 7² × 2³ = 49 × 8 = 392.",
     "For a root of a calculation, work out inside the root first: √(14 − 9) = √5."
    ]
   },
   {
    "h": "Using a calculator",
    "p": [],
    "list": [
     "Use the brackets keys for anything on the top or bottom of a fraction.",
     "Do not round until the very last step.",
     "Then round as the question asks (for example to 1 decimal place)."
    ]
   }
  ],
  "worked": {
   "title": "Calculate 7² × 2³",
   "steps": [
    "7² = 49",
    "2³ = 8",
    "49 × 8 = 392"
   ],
   "answer": "392"
  },
  "watch": [
   "Do not confuse squaring with doubling: 7² = 49, not 14.",
   "Round only your final answer, not the numbers along the way."
  ],
  "checks": [
   {
    "id": "maths-n5-c1",
    "type": "short",
    "prompt": "Write down √81.",
    "accept": [
     "9"
    ],
    "explanation": "9 × 9 = 81, so √81 = 9."
   },
   {
    "id": "maths-n5-c2",
    "type": "short",
    "prompt": "Work out 3⁵.",
    "accept": [
     "243"
    ],
    "explanation": "3 × 3 × 3 × 3 × 3 = 243."
   },
   {
    "id": "maths-n5-c3",
    "type": "mcq",
    "prompt": "Which of these is a cube number?",
    "options": [
     "49",
     "24",
     "36",
     "27"
    ],
    "correctIndex": 3,
    "explanation": "27 = 3 × 3 × 3. (36 and 49 are square numbers.)"
   },
   {
    "id": "maths-n5-c4",
    "type": "short",
    "prompt": "Work out √(14 − 9) + 4. Give your answer correct to 1 decimal place.",
    "accept": [
     "6.2"
    ],
    "explanation": "√5 = 2.236…, and 2.236… + 4 = 6.236…, which is 6.2 to 1 decimal place."
   }
  ],
  "keywords": [
   "square",
   "cube",
   "root",
   "√",
   "²",
   "³",
   "power",
   "calculator",
   "decimal place",
   "index",
   "⁴",
   "⁵",
   "^"
  ]
 },
 {
  "id": "maths-n6",
  "subject": "maths",
  "topicId": "maths-1",
  "title": "Fractions of amounts, comparing fractions and decimals",
  "why": "You will be asked for a fraction of an amount, to work backwards from a fraction, to compare fractions and to divide by decimals.",
  "sections": [
   {
    "h": "A fraction of an amount",
    "p": [
     "Divide by the bottom number, then multiply by the top number."
    ],
    "list": [
     "3/4 of 120: 120 ÷ 4 = 30, then 30 × 3 = 90.",
     "Working backwards: if 1/3 of a number is 477, the number is 477 × 3 = 1431."
    ]
   },
   {
    "h": "Comparing fractions",
    "p": [
     "Turn them into decimals (or percentages) so they are easy to compare."
    ],
    "list": [
     "7/10 = 0.7 and 3/4 = 0.75, so 3/4 is larger."
    ]
   },
   {
    "h": "Dividing by a decimal",
    "p": [
     "Multiply both numbers by 10 (or 100) until the number you are dividing by is a whole number."
    ],
    "list": [
     "20 ÷ 0.4 → multiply both by 10 → 200 ÷ 4 = 50."
    ]
   }
  ],
  "worked": {
   "title": "Find 3/4 of 120",
   "steps": [
    "120 ÷ 4 = 30",
    "30 × 3 = 90"
   ],
   "answer": "90"
  },
  "watch": [
   "Divide by the bottom first, then multiply by the top.",
   "When you change one number in a division, change the other in the same way."
  ],
  "checks": [
   {
    "id": "maths-n6-c1",
    "type": "short",
    "prompt": "Find 2/5 of 60.",
    "accept": [
     "24"
    ],
    "explanation": "60 ÷ 5 = 12, and 12 × 2 = 24."
   },
   {
    "id": "maths-n6-c2",
    "type": "mcq",
    "prompt": "Which is larger, 5/8 or 0.6?",
    "options": [
     "0.6",
     "You cannot tell",
     "They are equal",
     "5/8"
    ],
    "correctIndex": 3,
    "explanation": "5/8 = 0.625, which is bigger than 0.6."
   },
   {
    "id": "maths-n6-c3",
    "type": "short",
    "prompt": "1/4 of a number is 35. What is the number?",
    "accept": [
     "140"
    ],
    "explanation": "The whole number is 4 quarters: 35 × 4 = 140."
   },
   {
    "id": "maths-n6-c4",
    "type": "short",
    "prompt": "Work out 12 ÷ 0.3.",
    "accept": [
     "40"
    ],
    "explanation": "Multiply both by 10: 120 ÷ 3 = 40."
   }
  ],
  "keywords": [
   "fraction",
   "of ",
   "3/4",
   "1/3",
   "2/5",
   "÷",
   "divide",
   "decimal",
   "0.4",
   "which test",
   "compare"
  ]
 },
 {
  "id": "maths-a1",
  "subject": "maths",
  "topicId": "maths-2",
  "title": "Simplifying, expanding and factorising",
  "why": "Algebra questions often ask you to tidy up an expression, multiply out brackets or put brackets back in.",
  "sections": [
   {
    "h": "Collecting like terms",
    "p": [
     "Like terms have exactly the same letter part. Add or subtract their numbers, keeping the sign in front of each term."
    ],
    "list": [
     "5a + 3b − 2a + b = 3a + 4b.",
     "A letter on its own, like b, means 1b."
    ]
   },
   {
    "h": "Expanding brackets",
    "p": [
     "Multiply every term inside the bracket by the term outside."
    ],
    "list": [
     "3(x + 4) = 3x + 12.",
     "Then collect like terms: 3(x + 4) − 2x = 3x + 12 − 2x = x + 12."
    ]
   },
   {
    "h": "Factorising",
    "p": [
     "Factorising is expanding backwards: take the biggest number (or letter) that goes into every term and write it outside a bracket."
    ],
    "list": [
     "6x + 9 = 3(2x + 3)."
    ]
   }
  ],
  "worked": {
   "title": "Expand and simplify 2(x + 5) + 3x",
   "steps": [
    "Expand: 2x + 10 + 3x",
    "Collect like terms: 5x + 10"
   ],
   "answer": "5x + 10"
  },
  "watch": [
   "Multiply every term in the bracket, not just the first one.",
   "“Factorise fully” means take out the highest common factor: 4x + 8 = 4(x + 2), not 2(2x + 4)."
  ],
  "checks": [
   {
    "id": "maths-a1-c1",
    "type": "short",
    "prompt": "Simplify 7a + 2b − 3a + 5b.",
    "accept": [
     "4a+7b",
     "7b+4a"
    ],
    "explanation": "a terms: 7a − 3a = 4a. b terms: 2b + 5b = 7b."
   },
   {
    "id": "maths-a1-c2",
    "type": "short",
    "prompt": "Expand and simplify 4(x + 2) − 3x.",
    "accept": [
     "x+8",
     "8+x"
    ],
    "explanation": "4x + 8 − 3x = x + 8."
   },
   {
    "id": "maths-a1-c3",
    "type": "short",
    "prompt": "Factorise fully: 8x + 12.",
    "accept": [
     "4(2x+3)"
    ],
    "explanation": "The highest common factor of 8 and 12 is 4, so 8x + 12 = 4(2x + 3)."
   },
   {
    "id": "maths-a1-c4",
    "type": "mcq",
    "prompt": "Expand 5(y − 3).",
    "options": [
     "5y − 15",
     "5y − 3",
     "y − 15",
     "5y + 15"
    ],
    "correctIndex": 0,
    "explanation": "5 × y = 5y and 5 × (−3) = −15."
   }
  ],
  "keywords": [
   "simplify",
   "expand",
   "factorise",
   "brackets",
   "like terms"
  ]
 },
 {
  "id": "maths-a2",
  "subject": "maths",
  "topicId": "maths-2",
  "title": "Solving equations and inequalities",
  "why": "Solving means finding the value of the letter that makes the equation true.",
  "sections": [
   {
    "h": "Solving an equation",
    "p": [
     "Do the same to both sides until the letter is on its own. Undo the + or − first, then undo the × or ÷."
    ],
    "list": [
     "4x − 7 = 13 → add 7 to both sides: 4x = 20 → divide both sides by 4: x = 5.",
     "Check by putting x = 5 back in: 4 × 5 − 7 = 13 ✓."
    ]
   },
   {
    "h": "Letters on both sides",
    "p": [
     "Collect the letters on one side first."
    ],
    "list": [
     "5x + 2 = 3x + 10 → subtract 3x: 2x + 2 = 10 → subtract 2: 2x = 8 → x = 4."
    ]
   },
   {
    "h": "Inequalities",
    "p": [
     "Solve them like equations. The answer is a range of values."
    ],
    "list": [
     "2x + 1 > 9 → 2x > 8 → x > 4.",
     "x > 4 means x can be any number bigger than 4 (but not 4 itself)."
    ]
   }
  ],
  "worked": {
   "title": "Solve 3x + 5 = 20",
   "steps": [
    "Subtract 5 from both sides: 3x = 15",
    "Divide both sides by 3: x = 5"
   ],
   "answer": "x = 5"
  },
  "watch": [
   "Whatever you do to one side, do to the other.",
   "Always check your answer by putting it back into the original equation."
  ],
  "checks": [
   {
    "id": "maths-a2-c1",
    "type": "short",
    "prompt": "Solve 5x + 3 = 28.",
    "accept": [
     "5",
     "x=5"
    ],
    "explanation": "Subtract 3: 5x = 25. Divide by 5: x = 5."
   },
   {
    "id": "maths-a2-c2",
    "type": "short",
    "prompt": "Solve 2x − 9 = 7.",
    "accept": [
     "8",
     "x=8"
    ],
    "explanation": "Add 9: 2x = 16. Divide by 2: x = 8."
   },
   {
    "id": "maths-a2-c3",
    "type": "short",
    "prompt": "Solve 6x + 1 = 4x + 9.",
    "accept": [
     "4",
     "x=4"
    ],
    "explanation": "Subtract 4x: 2x + 1 = 9. Subtract 1: 2x = 8. Divide by 2: x = 4."
   },
   {
    "id": "maths-a2-c4",
    "type": "mcq",
    "prompt": "Solve the inequality 3x + 2 > 14.",
    "options": [
     "x > 5.33",
     "x > 4",
     "x < 4",
     "x > 12"
    ],
    "correctIndex": 1,
    "explanation": "Subtract 2: 3x > 12. Divide by 3: x > 4."
   }
  ],
  "keywords": [
   "solve",
   "equation",
   "inequality",
   "find x"
  ]
 },
 {
  "id": "maths-a3",
  "subject": "maths",
  "topicId": "maths-2",
  "title": "Substitution, sequences and straight lines",
  "why": "These questions give you a rule and ask you to use it: put numbers into a formula, find a term in a sequence, or read a straight-line equation.",
  "sections": [
   {
    "h": "Substitution",
    "p": [
     "Replace each letter with its number, keeping the order of operations."
    ],
    "list": [
     "If y = 3x − 2 and x = 4, then y = 3 × 4 − 2 = 10."
    ]
   },
   {
    "h": "Sequences and the nth term",
    "p": [
     "If a sequence goes up by the same amount each time, the nth term is (step)n + something."
    ],
    "list": [
     "3, 7, 11, 15 goes up by 4, so start with 4n. When n = 1, 4n = 4 but the first term is 3, so subtract 1: nth term = 4n − 1.",
     "To find the 6th term, put n = 6 into the rule."
    ]
   },
   {
    "h": "Straight-line graphs",
    "p": [
     "An equation in the form y = mx + c makes a straight line."
    ],
    "list": [
     "m is the gradient (how steep it is). Gradient = change in y ÷ change in x.",
     "c is where the line crosses the y-axis.",
     "y = 2x − 1 has gradient 2 and crosses the y-axis at −1."
    ]
   }
  ],
  "worked": {
   "title": "The nth term of a sequence is 4n + 1. Find the 6th term.",
   "steps": [
    "Put n = 6: 4 × 6 + 1",
    "Multiply first: 24 + 1 = 25"
   ],
   "answer": "25"
  },
  "watch": [
   "n is the term number, not the term itself.",
   "Multiply before you add: 4 × 6 + 1, not 4 × (6 + 1)."
  ],
  "checks": [
   {
    "id": "maths-a3-c1",
    "type": "mcq",
    "prompt": "If y = 2x + 5, what is y when x = 3?",
    "options": [
     "10",
     "16",
     "11",
     "8"
    ],
    "correctIndex": 2,
    "explanation": "2 × 3 + 5 = 6 + 5 = 11."
   },
   {
    "id": "maths-a3-c2",
    "type": "short",
    "prompt": "The nth term of a sequence is 3n − 2. Find the 5th term.",
    "accept": [
     "13"
    ],
    "explanation": "3 × 5 − 2 = 15 − 2 = 13."
   },
   {
    "id": "maths-a3-c3",
    "type": "short",
    "prompt": "Find the nth term of the sequence 5, 9, 13, 17, …",
    "accept": [
     "4n+1",
     "1+4n"
    ],
    "explanation": "It goes up by 4, so start with 4n. When n = 1, 4n = 4, and the first term is 5, so add 1: 4n + 1."
   },
   {
    "id": "maths-a3-c4",
    "type": "short",
    "prompt": "A line has the equation y = 3x + 4. What is its gradient?",
    "accept": [
     "3"
    ],
    "explanation": "In y = mx + c, the gradient is m. Here m = 3."
   }
  ],
  "keywords": [
   "nth term",
   "substitut",
   "if y",
   "gradient",
   "straight line",
   "y ="
  ]
 },
 {
  "id": "maths-a4",
  "subject": "maths",
  "topicId": "maths-2",
  "title": "Forming expressions and equations, and number machines",
  "why": "Many algebra questions start in words. You need to turn them into an expression or an equation, then work with it.",
  "sections": [
   {
    "h": "Words into algebra",
    "p": [
     "Use a letter for the unknown number."
    ],
    "list": [
     "3 more than n → n + 3.",
     "5 times n → 5n.",
     "7 less than b → b − 7.",
     "8 boxes with a apples in each → 8a.",
     "Yang is b years old. Catrin is 7 years younger → b − 7."
    ]
   },
   {
    "h": "“Think of a number”",
    "p": [
     "Write the steps as an equation, then solve it."
    ],
    "list": [
     "Multiply by 8, then add 34, to get 170: 8n + 34 = 170 → 8n = 136 → n = 17."
    ]
   },
   {
    "h": "Number machines",
    "p": [
     "Going forwards, do each operation in order. To go backwards from the output, do the inverse operations in reverse order."
    ],
    "list": [
     "Input → × 4 → − 3 → output. If the output is 21: add 3 (24), then divide by 4: the input is 6."
    ]
   }
  ],
  "worked": {
   "title": "Ffion thinks of a number. She multiplies it by 8, then adds 34, to get 170. What is her number?",
   "steps": [
    "Equation: 8n + 34 = 170",
    "Subtract 34: 8n = 136",
    "Divide by 8: n = 17"
   ],
   "answer": "17"
  },
  "watch": [
   "“7 less than b” is b − 7, not 7 − b.",
   "When you work backwards, use the inverse operations in reverse order."
  ],
  "checks": [
   {
    "id": "maths-a4-c1",
    "type": "short",
    "prompt": "Yang is b years old. Catrin is 7 years younger than Yang. Write down Catrin's age in terms of b.",
    "accept": [
     "b-7",
     "b−7"
    ],
    "explanation": "Younger means less: b − 7."
   },
   {
    "id": "maths-a4-c2",
    "type": "short",
    "prompt": "I think of a number, multiply it by 3, then add 5. The answer is 26. What is my number?",
    "accept": [
     "7"
    ],
    "explanation": "3n + 5 = 26 → 3n = 21 → n = 7."
   },
   {
    "id": "maths-a4-c3",
    "type": "mcq",
    "prompt": "A box holds x pencils. Which expression gives the number of pencils in 6 boxes?",
    "options": [
     "x + 6",
     "x ÷ 6",
     "6 − x",
     "6x"
    ],
    "correctIndex": 3,
    "explanation": "6 boxes each holding x pencils: 6 × x = 6x."
   },
   {
    "id": "maths-a4-c4",
    "type": "short",
    "prompt": "A number machine is: input → × 4 → − 3 → output. The output is 21. What was the input?",
    "accept": [
     "6"
    ],
    "explanation": "Work backwards: 21 + 3 = 24, then 24 ÷ 4 = 6."
   }
  ],
  "keywords": [
   "think of a number",
   "in terms of",
   "years old",
   "number machine",
   "input",
   "output",
   "write down",
   "boxes",
   "expression",
   "younger",
   "older",
   "more than",
   "thinks of a number"
  ]
 },
 {
  "id": "maths-a5",
  "subject": "maths",
  "topicId": "maths-2",
  "title": "Using formulae, and substituting negative numbers",
  "why": "Formula questions give you a rule with letters and ask you to put numbers in. Negative numbers are where most marks are lost.",
  "sections": [
   {
    "h": "Substituting into a formula",
    "p": [
     "Replace each letter with its number and follow BIDMAS."
    ],
    "list": [
     "Cost = 15 × miles + 50. For 8 miles: 15 × 8 + 50 = 170.",
     "Put negative numbers in brackets: 2t + 4w with t = −5 and w = 8 is 2 × (−5) + 4 × 8 = −10 + 32 = 22."
    ]
   },
   {
    "h": "Negative numbers in multiplying",
    "p": [],
    "list": [
     "Positive × negative = negative.",
     "Negative × negative = positive.",
     "(−3) × (−4) = 12."
    ]
   },
   {
    "h": "Finding a letter inside a formula",
    "p": [
     "Substitute the values you know, then solve the equation that is left."
    ],
    "list": [
     "18x + 5y = t with x = 2.5 and t = 60: 45 + 5y = 60 → 5y = 15 → y = 3."
    ]
   }
  ],
  "worked": {
   "title": "Find the value of 2t + 4w when t = −5 and w = 8",
   "steps": [
    "2 × (−5) = −10",
    "4 × 8 = 32",
    "−10 + 32 = 22"
   ],
   "answer": "22"
  },
  "watch": [
   "Write brackets around a negative number when you substitute it.",
   "Two negatives multiplied together make a positive."
  ],
  "checks": [
   {
    "id": "maths-a5-c1",
    "type": "short",
    "prompt": "Find the value of 3a + 2b when a = −4 and b = 5.",
    "accept": [
     "-2",
     "−2"
    ],
    "explanation": "3 × (−4) = −12 and 2 × 5 = 10, so −12 + 10 = −2."
   },
   {
    "id": "maths-a5-c2",
    "type": "short",
    "prompt": "Use the formula C = 12n + 30 to find C when n = 7.",
    "accept": [
     "114"
    ],
    "explanation": "12 × 7 = 84, and 84 + 30 = 114."
   },
   {
    "id": "maths-a5-c3",
    "type": "short",
    "prompt": "Use the formula 4x + 3y = t to find y when x = 2 and t = 26.",
    "accept": [
     "6"
    ],
    "explanation": "4 × 2 = 8, so 8 + 3y = 26 → 3y = 18 → y = 6."
   },
   {
    "id": "maths-a5-c4",
    "type": "mcq",
    "prompt": "What is (−3) × (−4)?",
    "options": [
     "7",
     "−7",
     "−12",
     "12"
    ],
    "correctIndex": 3,
    "explanation": "A negative times a negative is positive: 12."
   }
  ],
  "keywords": [
   "formula",
   "find the value of",
   "when",
   "use the formula",
   "cost =",
   "charge",
   "t =",
   "substitut"
  ]
 },
 {
  "id": "maths-a6",
  "subject": "maths",
  "topicId": "maths-2",
  "title": "Linear sequences: missing terms and changing gaps",
  "why": "Sequence questions ask for the next term, for missing terms, or for a rule when the gaps change.",
  "sections": [
   {
    "h": "A linear sequence has the same gap every time",
    "p": [
     "Find the gap between two neighbouring terms and keep adding it (or subtracting it)."
    ],
    "list": [
     "31, __, __, 16, 11: the gap is −5, so the sequence is 31, 26, 21, 16, 11.",
     "4, 28, 52, 76: the gap is +24, so the next term is 100."
    ]
   },
   {
    "h": "When the gaps change",
    "p": [
     "Write down the gaps and look at how the gaps change."
    ],
    "list": [
     "2, 5, 10, 17, 26: gaps are 3, 5, 7, 9. They go up by 2, so the next gap is 11 and the next term is 37.",
     "18, 16, 12, 6: gaps are −2, −4, −6, so the next gap is −8 and the next term is −2."
    ]
   }
  ],
  "worked": {
   "title": "Write the next term: 2, 5, 10, 17, 26, …",
   "steps": [
    "Gaps: 3, 5, 7, 9",
    "The gaps go up by 2, so the next gap is 11",
    "26 + 11 = 37"
   ],
   "answer": "37"
  },
  "watch": [
   "Check the gap between every pair of terms, not just the first two.",
   "A gap of −5 means you subtract 5 each time."
  ],
  "checks": [
   {
    "id": "maths-a6-c1",
    "type": "short",
    "prompt": "Write the next term in the sequence 4, 28, 52, 76, …",
    "accept": [
     "100"
    ],
    "explanation": "The gap is 24: 76 + 24 = 100."
   },
   {
    "id": "maths-a6-c2",
    "type": "short",
    "prompt": "Write the next term: 2, 5, 10, 17, 26, …",
    "accept": [
     "37"
    ],
    "explanation": "Gaps 3, 5, 7, 9 → next gap 11 → 26 + 11 = 37."
   },
   {
    "id": "maths-a6-c3",
    "type": "short",
    "prompt": "The sequence 18, 16, 12, 6, … has gaps that change. What is the next term?",
    "accept": [
     "-2",
     "−2"
    ],
    "explanation": "Gaps: −2, −4, −6, so the next gap is −8. 6 − 8 = −2."
   },
   {
    "id": "maths-a6-c4",
    "type": "short",
    "prompt": "A linear sequence starts 50, __, __, 35. Find the second term.",
    "accept": [
     "45"
    ],
    "explanation": "Three gaps take you from 50 to 35, so each gap is −5. The second term is 45."
   }
  ],
  "keywords": [
   "sequence",
   "next term",
   "missing",
   "gap",
   "linear"
  ],
  "alsoTopics": [
   "maths-1"
  ]
 },
 {
  "id": "maths-r1",
  "subject": "maths",
  "topicId": "maths-3",
  "title": "Ratio: simplifying and sharing",
  "why": "Ratio questions ask you to simplify a ratio, to share an amount in a ratio, or to find one part when another is known.",
  "sections": [
   {
    "h": "Simplifying a ratio",
    "p": [
     "Divide both parts by the biggest number that goes into both."
    ],
    "list": [
     "24 : 36 → divide both by 12 → 2 : 3."
    ]
   },
   {
    "h": "Sharing an amount in a ratio",
    "p": [],
    "list": [
     "Add the parts to get the total number of shares.",
     "Find one share: amount ÷ total parts.",
     "Multiply one share by each part.",
     "Check the shares add back up to the total."
    ]
   },
   {
    "h": "When one part is known",
    "p": [
     "Boys : girls = 3 : 5 and there are 15 girls."
    ],
    "list": [
     "5 parts = 15, so 1 part = 3.",
     "Boys = 3 parts = 3 × 3 = 9."
    ]
   }
  ],
  "worked": {
   "title": "Share £60 in the ratio 2 : 3",
   "steps": [
    "Total parts: 2 + 3 = 5",
    "One share: £60 ÷ 5 = £12",
    "2 parts = £24 and 3 parts = £36",
    "Check: 24 + 36 = 60 ✓"
   ],
   "answer": "£24 and £36"
  },
  "watch": [
   "Ratio order matters: 2 : 3 is not the same as 3 : 2.",
   "Always check the shares add up to the total."
  ],
  "checks": [
   {
    "id": "maths-r1-c1",
    "type": "short",
    "prompt": "Simplify the ratio 18 : 30.",
    "accept": [
     "3:5"
    ],
    "explanation": "Divide both by 6: 18 ÷ 6 = 3 and 30 ÷ 6 = 5."
   },
   {
    "id": "maths-r1-c2",
    "type": "short",
    "prompt": "Share £72 in the ratio 5 : 4. How much is the larger share, in pounds?",
    "accept": [
     "40"
    ],
    "explanation": "5 + 4 = 9 parts. £72 ÷ 9 = £8 per part. The larger share is 5 × 8 = £40."
   },
   {
    "id": "maths-r1-c3",
    "type": "short",
    "prompt": "Red and blue counters are in the ratio 2 : 7. There are 14 red counters. How many blue counters are there?",
    "accept": [
     "49"
    ],
    "explanation": "2 parts = 14, so 1 part = 7. Blue = 7 × 7 = 49."
   },
   {
    "id": "maths-r1-c4",
    "type": "mcq",
    "prompt": "Which ratio is equivalent to 4 : 6?",
    "options": [
     "3 : 2",
     "8 : 10",
     "1 : 2",
     "2 : 3"
    ],
    "correctIndex": 3,
    "explanation": "Divide both parts by 2: 4 : 6 = 2 : 3."
   }
  ],
  "keywords": [
   "ratio",
   "share",
   "simplest form"
  ]
 },
 {
  "id": "maths-r2",
  "subject": "maths",
  "topicId": "maths-3",
  "title": "Proportion, best value and converting units",
  "why": "Proportion questions ask how one amount changes when another does, which deal is cheaper, or how to change units.",
  "sections": [
   {
    "h": "Direct proportion (the unitary method)",
    "p": [
     "If you double one amount, the other doubles too. Find the value of 1 first, then multiply."
    ],
    "list": [
     "A recipe for 4 people uses 200 g of flour. For 1 person: 200 ÷ 4 = 50 g. For 10 people: 50 × 10 = 500 g."
    ]
   },
   {
    "h": "Best value",
    "p": [
     "Work out the price for the same amount, such as per kg or per 100 g, and compare."
    ],
    "list": [
     "3 kg for £4.50 → £1.50 per kg.",
     "5 kg for £7.00 → £1.40 per kg, so this is the better value."
    ]
   },
   {
    "h": "Reading a conversion graph",
    "p": [
     "A straight-line conversion graph links two units. Find the value on one axis, go across (or up) to the line, then read the matching value on the other axis."
    ],
    "list": [
     "If 1 mile is about 1.6 km, then 30 miles is about 30 × 1.6 = 48 km."
    ]
   },
   {
    "h": "Converting units",
    "p": [],
    "list": [
     "1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.",
     "1 kg = 1000 g, 1 litre = 1000 ml.",
     "Going to a smaller unit: multiply. Going to a bigger unit: divide.",
     "2.5 kg = 2.5 × 1000 = 2500 g."
    ]
   }
  ],
  "worked": {
   "title": "A recipe for 4 people uses 200 g of flour. How much for 10 people?",
   "steps": [
    "For 1 person: 200 ÷ 4 = 50 g",
    "For 10 people: 50 × 10 = 500 g"
   ],
   "answer": "500 g"
  },
  "watch": [
   "Compare like with like: the same unit and the same amount.",
   "The cheapest total price is not always the best value."
  ],
  "checks": [
   {
    "id": "maths-r2-c1",
    "type": "short",
    "prompt": "5 pens cost £3.50. How much do 8 pens cost, in pounds?",
    "accept": [
     "5.60",
     "5.6"
    ],
    "explanation": "1 pen = £3.50 ÷ 5 = £0.70. 8 pens = 8 × 0.70 = £5.60."
   },
   {
    "id": "maths-r2-c2",
    "type": "mcq",
    "prompt": "Which is better value: 500 g of pasta for £1.20, or 2 kg of pasta for £4.40?",
    "options": [
     "2 kg for £4.40",
     "They are the same",
     "You cannot tell",
     "500 g for £1.20"
    ],
    "correctIndex": 0,
    "explanation": "500 g costs £1.20, so 2 kg would cost 4 × £1.20 = £4.80. £4.40 is cheaper, so 2 kg is better value."
   },
   {
    "id": "maths-r2-c3",
    "type": "short",
    "prompt": "Convert 3.6 km into metres.",
    "accept": [
     "3600"
    ],
    "explanation": "1 km = 1000 m, so 3.6 × 1000 = 3600 m."
   },
   {
    "id": "maths-r2-c4",
    "type": "short",
    "prompt": "A recipe for 6 people uses 300 ml of milk. How many ml of milk are needed for 4 people?",
    "accept": [
     "200",
     "200ml"
    ],
    "explanation": "For 1 person: 300 ÷ 6 = 50 ml. For 4 people: 50 × 4 = 200 ml."
   },
   {
    "id": "maths-r2-c5",
    "type": "short",
    "prompt": "How many centimetres are there in 4.58 m?",
    "accept": [
     "458",
     "458cm"
    ],
    "explanation": "1 m = 100 cm, so 4.58 × 100 = 458 cm."
   },
   {
    "id": "maths-r2-c6",
    "type": "short",
    "prompt": "Write 3729 grams in kilograms.",
    "accept": [
     "3.729",
     "3.729kg"
    ],
    "explanation": "1 kg = 1000 g, so divide by 1000: 3.729 kg."
   },
   {
    "id": "maths-r2-c7",
    "type": "short",
    "prompt": "Using 1 mile ≈ 1.6 km, roughly how many kilometres is 30 miles?",
    "accept": [
     "48",
     "48km"
    ],
    "explanation": "30 × 1.6 = 48 km."
   }
  ],
  "keywords": [
   "proportion",
   "recipe",
   "best value",
   "better value",
   "per kg",
   "convert",
   "cost of",
   "conversion",
   "centimetres",
   "kilograms",
   "grams",
   "metres"
  ],
  "alsoTopics": [
   "maths-1"
  ]
 },
 {
  "id": "maths-r3",
  "subject": "maths",
  "topicId": "maths-3",
  "title": "Percentage change, speed, distance and time",
  "why": "Two very common ratio-and-proportion questions: increasing or decreasing an amount by a percentage, and using speed = distance ÷ time.",
  "sections": [
   {
    "h": "Percentage increase and decrease",
    "p": [
     "Find the percentage of the amount, then add it (increase) or take it away (decrease)."
    ],
    "list": [
     "Increase £80 by 25%: 25% of 80 = 20, so 80 + 20 = £100.",
     "Quick way: an increase of 25% is × 1.25. A decrease of 15% is × 0.85."
    ]
   },
   {
    "h": "Speed, distance and time",
    "p": [],
    "list": [
     "Speed = distance ÷ time.",
     "Distance = speed × time.",
     "Time = distance ÷ speed.",
     "150 miles in 3 hours: 150 ÷ 3 = 50 mph."
    ]
   },
   {
    "h": "Watch the units",
    "p": [
     "If the speed is in miles per hour, the time must be in hours: 30 minutes = 0.5 hours."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "Increase £80 by 25%",
   "steps": [
    "25% of 80 = 20",
    "80 + 20 = 100"
   ],
   "answer": "£100"
  },
  "watch": [
   "“Increase by 25%” does not mean multiply by 25%. The answer should be bigger than the start.",
   "Turn minutes into hours before using mph."
  ],
  "checks": [
   {
    "id": "maths-r3-c1",
    "type": "short",
    "prompt": "Decrease £50 by 20%. Give your answer in pounds.",
    "accept": [
     "40"
    ],
    "explanation": "20% of 50 = 10. 50 − 10 = £40."
   },
   {
    "id": "maths-r3-c2",
    "type": "short",
    "prompt": "A train travels 240 km in 3 hours. What is its average speed in km/h?",
    "accept": [
     "80"
    ],
    "explanation": "Speed = distance ÷ time = 240 ÷ 3 = 80 km/h."
   },
   {
    "id": "maths-r3-c3",
    "type": "short",
    "prompt": "A cyclist rides at 12 mph for 2.5 hours. How far does she ride, in miles?",
    "accept": [
     "30"
    ],
    "explanation": "Distance = speed × time = 12 × 2.5 = 30 miles."
   },
   {
    "id": "maths-r3-c4",
    "type": "mcq",
    "prompt": "A coat costs £60 and has 15% off in a sale. What is the sale price?",
    "options": [
     "£9",
     "£45",
     "£51",
     "£69"
    ],
    "correctIndex": 2,
    "explanation": "15% of 60 = 9. 60 − 9 = £51."
   }
  ],
  "keywords": [
   "speed",
   "mph",
   "increase",
   "decrease",
   "average speed",
   "distance"
  ]
 },
 {
  "id": "maths-r4",
  "subject": "maths",
  "topicId": "maths-3",
  "title": "Ratio problems: differences, multiples and mixing",
  "why": "Harder ratio questions give you a difference, say “three times as many”, or ask you to mix things in a ratio.",
  "sections": [
   {
    "h": "“Three times as many”",
    "p": [
     "That is a ratio of 3 : 1."
    ],
    "list": [
     "24 players, three times as many forwards as backs → 3 : 1 → 4 parts = 24 → 1 part = 6 → forwards = 18."
    ]
   },
   {
    "h": "Using a known difference",
    "p": [
     "If the ratio is 5 : 3 and the difference is 12, the difference is 5 − 3 = 2 parts."
    ],
    "list": [
     "2 parts = 12, so 1 part = 6.",
     "The amounts are 30 and 18."
    ]
   },
   {
    "h": "Mixing and diluting",
    "p": [
     "A drink is 1 part cordial to 4 parts water."
    ],
    "list": [
     "With 170 ml of cordial you need 4 × 170 = 680 ml of water.",
     "The total drink is 5 × 170 = 850 ml."
    ]
   }
  ],
  "worked": {
   "title": "Amy and Ben share sweets in the ratio 5 : 3. Amy gets 12 more than Ben. How many does Ben get?",
   "steps": [
    "Difference in parts: 5 − 3 = 2",
    "2 parts = 12, so 1 part = 6",
    "Ben has 3 parts = 18"
   ],
   "answer": "18"
  },
  "watch": [
   "Work out what one part is first; everything else follows from it.",
   "Check that your amounts fit the ratio and the information you were given."
  ],
  "checks": [
   {
    "id": "maths-r4-c1",
    "type": "short",
    "prompt": "Amy and Ben share sweets in the ratio 5 : 3. Amy gets 12 more sweets than Ben. How many sweets does Ben get?",
    "accept": [
     "18"
    ],
    "explanation": "2 parts = 12, so 1 part = 6. Ben has 3 × 6 = 18."
   },
   {
    "id": "maths-r4-c2",
    "type": "short",
    "prompt": "Orange squash is mixed with water in the ratio 1 : 4. How many ml of water are needed with 150 ml of squash?",
    "accept": [
     "600",
     "600ml"
    ],
    "explanation": "4 × 150 = 600 ml."
   },
   {
    "id": "maths-r4-c3",
    "type": "short",
    "prompt": "A squad has 24 players. There are three times as many forwards as backs. How many forwards are there?",
    "accept": [
     "18"
    ],
    "explanation": "Ratio 3 : 1 makes 4 parts. 24 ÷ 4 = 6, so forwards = 3 × 6 = 18."
   },
   {
    "id": "maths-r4-c4",
    "type": "mcq",
    "prompt": "Red and blue beads are in the ratio 3 : 2. There are 30 beads. How many are blue?",
    "options": [
     "10",
     "18",
     "20",
     "12"
    ],
    "correctIndex": 3,
    "explanation": "5 parts = 30, so 1 part = 6. Blue = 2 × 6 = 12."
   }
  ],
  "keywords": [
   "ratio",
   "three times as many",
   "more players",
   "share",
   "mix",
   "dilut",
   "cordial",
   "split",
   "times as many",
   "drink",
   "jug",
   "ml"
  ]
 },
 {
  "id": "maths-r5",
  "subject": "maths",
  "topicId": "maths-3",
  "title": "Percentages: one amount as a percentage of another, and percentage change",
  "why": "These questions compare amounts using percentages: how big is one number as a percentage of another, and by what percentage did something change?",
  "sections": [
   {
    "h": "One amount as a percentage of another",
    "p": [
     "Divide the part by the whole, then multiply by 100."
    ],
    "list": [
     "18 out of 30: 18 ÷ 30 = 0.6 → 60%."
    ]
   },
   {
    "h": "Percentage change",
    "p": [
     "Percentage change = change ÷ original × 100."
    ],
    "list": [
     "A price goes from £40 to £46. The change is £6. 6 ÷ 40 = 0.15 → 15% increase."
    ]
   },
   {
    "h": "Comparing surveys of different sizes",
    "p": [
     "Turn each result into a percentage so the comparison is fair."
    ],
    "list": [
     "Survey A: 18 out of 30 = 60%. Survey B: 8 out of 20 = 40%."
    ]
   }
  ],
  "worked": {
   "title": "A price goes up from £40 to £46. What is the percentage increase?",
   "steps": [
    "Change = 46 − 40 = 6",
    "6 ÷ 40 = 0.15",
    "0.15 × 100 = 15%"
   ],
   "answer": "15%"
  },
  "watch": [
   "Always divide by the ORIGINAL amount when you find a percentage change.",
   "A percentage increase and a percentage decrease are different sizes when the starting amounts differ."
  ],
  "checks": [
   {
    "id": "maths-r5-c1",
    "type": "short",
    "prompt": "Write 18 out of 30 as a percentage.",
    "accept": [
     "60",
     "60%"
    ],
    "explanation": "18 ÷ 30 = 0.6 = 60%."
   },
   {
    "id": "maths-r5-c2",
    "type": "short",
    "prompt": "A price increases from £50 to £56. What is the percentage increase?",
    "accept": [
     "12",
     "12%"
    ],
    "explanation": "Change = 6. 6 ÷ 50 = 0.12 = 12%."
   },
   {
    "id": "maths-r5-c3",
    "type": "short",
    "prompt": "A shirt costing £40 is reduced to £34. What is the percentage reduction?",
    "accept": [
     "15",
     "15%"
    ],
    "explanation": "Change = 6. 6 ÷ 40 = 0.15 = 15%."
   },
   {
    "id": "maths-r5-c4",
    "type": "mcq",
    "prompt": "In Survey A, 12 out of 20 people prefer tea. In Survey B, 15 out of 30 prefer tea. Which survey has the higher percentage who prefer tea?",
    "options": [
     "They are the same",
     "Survey A",
     "You cannot tell",
     "Survey B"
    ],
    "correctIndex": 1,
    "explanation": "A: 12/20 = 60%. B: 15/30 = 50%. Survey A is higher."
   }
  ],
  "keywords": [
   "as a percentage",
   "percentage",
   "%",
   "decreased",
   "increased",
   "claims",
   "reduced",
   "percent",
   "survey"
  ]
 },
 {
  "id": "maths-g1",
  "subject": "maths",
  "topicId": "maths-4",
  "title": "Angles and shapes",
  "why": "Many geometry questions use one angle fact to find a missing angle, or ask you to name or describe a shape.",
  "sections": [
   {
    "h": "Angle facts",
    "p": [],
    "list": [
     "Angles on a straight line add up to 180°.",
     "Angles around a point add up to 360°.",
     "Angles in a triangle add up to 180°.",
     "Angles in a quadrilateral add up to 360°.",
     "Complementary angles add up to 90°.",
     "Vertically opposite angles are equal."
    ]
   },
   {
    "h": "Triangles",
    "p": [],
    "list": [
     "Equilateral: 3 equal sides and three 60° angles.",
     "Isosceles: 2 equal sides and 2 equal angles.",
     "Scalene: no equal sides and no equal angles.",
     "Right-angled: one angle is 90°."
    ]
   },
   {
    "h": "Shapes and symmetry",
    "p": [],
    "list": [
     "Pentagon = 5 sides, hexagon = 6, octagon = 8.",
     "A trapezium has one pair of parallel sides.",
     "The order of rotational symmetry is how many times a shape looks the same in one full turn."
    ]
   }
  ],
  "worked": {
   "title": "The angles in a triangle are 50°, 65° and x°. Find x.",
   "steps": [
    "Angles in a triangle add up to 180°",
    "50 + 65 = 115",
    "x = 180 − 115 = 65"
   ],
   "answer": "65°"
  },
  "watch": [
   "Say the fact out loud before you use it: “angles in a triangle add up to 180°”.",
   "Do not mix up complementary (90°) and angles on a straight line (180°)."
  ],
  "checks": [
   {
    "id": "maths-g1-c1",
    "type": "short",
    "prompt": "The angles in a triangle are 72°, 48° and x°. Find x.",
    "accept": [
     "60",
     "60°"
    ],
    "explanation": "180 − (72 + 48) = 180 − 120 = 60°."
   },
   {
    "id": "maths-g1-c2",
    "type": "short",
    "prompt": "Two angles on a straight line are 115° and y°. Find y.",
    "accept": [
     "65",
     "65°"
    ],
    "explanation": "Angles on a straight line add up to 180°: 180 − 115 = 65°."
   },
   {
    "id": "maths-g1-c3",
    "type": "short",
    "prompt": "Find the angle that is complementary to 28°.",
    "accept": [
     "62",
     "62°"
    ],
    "explanation": "Complementary angles add up to 90°: 90 − 28 = 62°."
   },
   {
    "id": "maths-g1-c4",
    "type": "mcq",
    "prompt": "How many sides does a hexagon have?",
    "options": [
     "6",
     "8",
     "5",
     "7"
    ],
    "correctIndex": 0,
    "explanation": "Hex means six."
   }
  ],
  "keywords": [
   "angle",
   "triangle",
   "straight line",
   "complementary",
   "hexagon",
   "quadrilateral",
   "symmetry",
   "polygon"
  ]
 },
 {
  "id": "maths-g2",
  "subject": "maths",
  "topicId": "maths-4",
  "title": "Perimeter, area, volume and circles",
  "why": "These are the measure formulas you need to know and use: which one to pick, and what the units are.",
  "sections": [
   {
    "h": "Perimeter and area",
    "p": [],
    "list": [
     "Perimeter is the distance around the outside: add all the sides. Units: cm.",
     "Area is the space inside. Units: cm² (square units).",
     "Rectangle: length × width. Square: side × side.",
     "Triangle: ½ × base × height (the height is the perpendicular height)."
    ]
   },
   {
    "h": "Volume",
    "p": [
     "Volume of a cuboid = length × width × height. Units: cm³ (cubic units)."
    ],
    "list": []
   },
   {
    "h": "Circles",
    "p": [],
    "list": [
     "Diameter = 2 × radius.",
     "Circumference = π × diameter (or 2 × π × radius).",
     "Area = π × radius × radius.",
     "Use the value of π the question gives you (such as 22/7 or 3.14), or the π button on your calculator."
    ]
   }
  ],
  "worked": {
   "title": "A circle has radius 7 cm. Find its circumference. Use π = 22/7.",
   "steps": [
    "Diameter = 2 × 7 = 14 cm",
    "Circumference = π × diameter = 22/7 × 14",
    "22 × 14 ÷ 7 = 44"
   ],
   "answer": "44 cm"
  },
  "watch": [
   "Area is in squared units, volume in cubed units, perimeter in plain units.",
   "For a triangle, use the perpendicular height, not the sloping side."
  ],
  "checks": [
   {
    "id": "maths-g2-c1",
    "type": "short",
    "prompt": "Find the area of a triangle with base 10 cm and height 6 cm. Give your answer in cm².",
    "accept": [
     "30",
     "30cm²",
     "30cm2"
    ],
    "explanation": "½ × 10 × 6 = 30 cm²."
   },
   {
    "id": "maths-g2-c2",
    "type": "short",
    "prompt": "Find the volume of a cuboid measuring 5 cm by 4 cm by 3 cm. Give your answer in cm³.",
    "accept": [
     "60",
     "60cm³",
     "60cm3"
    ],
    "explanation": "5 × 4 × 3 = 60 cm³."
   },
   {
    "id": "maths-g2-c3",
    "type": "short",
    "prompt": "A circle has diameter 10 cm. Find its circumference. Use π = 3.14.",
    "accept": [
     "31.4",
     "31.4cm"
    ],
    "explanation": "Circumference = π × diameter = 3.14 × 10 = 31.4 cm."
   },
   {
    "id": "maths-g2-c4",
    "type": "mcq",
    "prompt": "A rectangle is 9 cm long and 4 cm wide. What is its perimeter?",
    "options": [
     "13 cm",
     "26 cm",
     "52 cm",
     "36 cm"
    ],
    "correctIndex": 1,
    "explanation": "9 + 4 + 9 + 4 = 26 cm. (36 cm would be the area, in cm².)"
   }
  ],
  "keywords": [
   "perimeter",
   "area",
   "volume",
   "circle",
   "circumference",
   "cuboid",
   "radius",
   "diameter"
  ]
 },
 {
  "id": "maths-g3",
  "subject": "maths",
  "topicId": "maths-4",
  "title": "Pythagoras, coordinates and bearings",
  "why": "These questions all start by drawing a right-angled triangle: finding a missing side, the distance between two points, or a bearing.",
  "sections": [
   {
    "h": "Pythagoras' theorem",
    "p": [
     "It only works in right-angled triangles: a² + b² = c², where c is the hypotenuse (the longest side, opposite the right angle)."
    ],
    "list": [
     "To find the hypotenuse: square the two short sides, add them, then square root. 3 and 4 → 9 + 16 = 25 → √25 = 5.",
     "To find a short side: square the hypotenuse, subtract the other square, then square root."
    ]
   },
   {
    "h": "Distance between two points",
    "p": [
     "Draw a right-angled triangle between the points. The horizontal and vertical differences are the two short sides."
    ],
    "list": [
     "A(2, 2) to B(8, 10): across 6, up 8 → 36 + 64 = 100 → distance = 10."
    ]
   },
   {
    "h": "Bearings",
    "p": [
     "A bearing is measured from north, clockwise, and written with three figures (045°, 090°, 270°)."
    ],
    "list": [
     "Due east is 090°, due south is 180°, due west is 270°.",
     "In the example above the angle from north is tan⁻¹(6 ÷ 8) ≈ 37°, so the bearing of B from A is 037°."
    ]
   }
  ],
  "worked": {
   "title": "Find the hypotenuse of a right-angled triangle with short sides 5 cm and 12 cm",
   "steps": [
    "5² + 12² = 25 + 144 = 169",
    "√169 = 13"
   ],
   "answer": "13 cm"
  },
  "watch": [
   "Add the squares to find the hypotenuse; subtract to find a short side.",
   "For a bearing: start at north, turn clockwise, and give three figures."
  ],
  "checks": [
   {
    "id": "maths-g3-c1",
    "type": "short",
    "prompt": "A right-angled triangle has shorter sides 6 cm and 8 cm. Find the length of the hypotenuse in cm.",
    "accept": [
     "10",
     "10cm"
    ],
    "explanation": "36 + 64 = 100, and √100 = 10."
   },
   {
    "id": "maths-g3-c2",
    "type": "short",
    "prompt": "In a right-angled triangle the hypotenuse is 13 cm and one short side is 5 cm. Find the other short side in cm.",
    "accept": [
     "12",
     "12cm"
    ],
    "explanation": "13² − 5² = 169 − 25 = 144, and √144 = 12."
   },
   {
    "id": "maths-g3-c3",
    "type": "short",
    "prompt": "Point P is at (1, 2) and point Q is at (4, 6). Find the distance PQ.",
    "accept": [
     "5"
    ],
    "explanation": "Across 3, up 4: 9 + 16 = 25, and √25 = 5."
   },
   {
    "id": "maths-g3-c4",
    "type": "mcq",
    "prompt": "What is the three-figure bearing of due east?",
    "options": [
     "090°",
     "270°",
     "180°",
     "009°"
    ],
    "correctIndex": 0,
    "explanation": "North is 000°, east is 090°, south is 180° and west is 270°."
   }
  ],
  "keywords": [
   "pythagoras",
   "hypotenuse",
   "bearing",
   "coordinates",
   "distance between",
   "right-angled"
  ]
 },
 {
  "id": "maths-g4",
  "subject": "maths",
  "topicId": "maths-4",
  "title": "Parallel lines and angle reasoning",
  "why": "Angle questions with parallel lines and isosceles triangles need you to spot the angle rule and, often, to say which rule you used.",
  "sections": [
   {
    "h": "Angles with parallel lines",
    "p": [
     "When a straight line crosses two parallel lines:"
    ],
    "list": [
     "Alternate angles (Z shape) are equal.",
     "Corresponding angles (F shape) are equal.",
     "Co-interior angles (C shape) add up to 180°."
    ]
   },
   {
    "h": "Isosceles triangles",
    "p": [],
    "list": [
     "Two sides are equal, and the two angles opposite them (the base angles) are equal.",
     "If the base angles are 40° each, the third angle is 180 − 80 = 100°."
    ]
   },
   {
    "h": "Giving reasons",
    "p": [
     "Write the rule in words next to your working."
    ],
    "list": [
     "Angles on a straight line add up to 180°.",
     "Angles around a point add up to 360°."
    ]
   }
  ],
  "worked": {
   "title": "Two parallel lines are crossed by a straight line. One angle is 65°. What is the co-interior angle?",
   "steps": [
    "Co-interior angles add up to 180°",
    "180 − 65 = 115"
   ],
   "answer": "115°"
  },
  "watch": [
   "Look for the Z, F or C shape before you choose a rule.",
   "Do not just write an answer: name the rule you used."
  ],
  "checks": [
   {
    "id": "maths-g4-c1",
    "type": "short",
    "prompt": "Two parallel lines are crossed by a straight line. One angle is 70°. What is the size of the alternate (Z-shaped) angle?",
    "accept": [
     "70",
     "70°"
    ],
    "explanation": "Alternate angles are equal, so it is 70°."
   },
   {
    "id": "maths-g4-c2",
    "type": "short",
    "prompt": "Two parallel lines are crossed by a straight line. One angle is 70°. What is the size of the co-interior (C-shaped) angle?",
    "accept": [
     "110",
     "110°"
    ],
    "explanation": "Co-interior angles add up to 180°: 180 − 70 = 110°."
   },
   {
    "id": "maths-g4-c3",
    "type": "short",
    "prompt": "An isosceles triangle has two equal angles of 40°. What is the third angle?",
    "accept": [
     "100",
     "100°"
    ],
    "explanation": "180 − 40 − 40 = 100°."
   },
   {
    "id": "maths-g4-c4",
    "type": "mcq",
    "prompt": "Two parallel lines are crossed by a straight line. Which pair of angles is always equal?",
    "options": [
     "Alternate angles",
     "Angles on a straight line",
     "Angles in a triangle",
     "Co-interior angles"
    ],
    "correctIndex": 0,
    "explanation": "Alternate (Z) angles are equal. Co-interior angles add up to 180°."
   }
  ],
  "keywords": [
   "parallel",
   "alternate",
   "corresponding",
   "isosceles",
   "co-interior",
   "give a reason",
   "straight line"
  ]
 },
 {
  "id": "maths-g5",
  "subject": "maths",
  "topicId": "maths-4",
  "title": "Composite shapes, prisms, cylinders and density",
  "why": "These questions combine simple shapes, or ask for the volume of a prism or cylinder, or use mass and density.",
  "sections": [
   {
    "h": "Composite shapes",
    "p": [
     "Split the shape into rectangles, triangles and semicircles. Find each area and add them."
    ],
    "list": [
     "For the perimeter, only count the outside edges — not the line where two shapes join.",
     "Area of a trapezium = ½ × (a + b) × h, where a and b are the parallel sides."
    ]
   },
   {
    "h": "Prisms and cylinders",
    "p": [],
    "list": [
     "Volume of a prism = area of the cross-section × length.",
     "Volume of a cylinder = π × r² × h."
    ]
   },
   {
    "h": "Density",
    "p": [],
    "list": [
     "Density = mass ÷ volume.",
     "Mass = density × volume."
    ]
   }
  ],
  "worked": {
   "title": "A cylinder has radius 3 cm and height 10 cm. Find its volume. Use π = 3.14.",
   "steps": [
    "Area of the circle = 3.14 × 3 × 3 = 28.26",
    "Volume = 28.26 × 10 = 282.6 cm³"
   ],
   "answer": "282.6 cm³"
  },
  "watch": [
   "Square the radius, not the whole π × r.",
   "Check the units: mass in grams and volume in cm³ give density in g/cm³."
  ],
  "checks": [
   {
    "id": "maths-g5-c1",
    "type": "short",
    "prompt": "A prism has a cross-section area of 12 cm² and a length of 8 cm. Find its volume in cm³.",
    "accept": [
     "96",
     "96cm³",
     "96cm3"
    ],
    "explanation": "12 × 8 = 96 cm³."
   },
   {
    "id": "maths-g5-c2",
    "type": "short",
    "prompt": "Find the volume of a cylinder with radius 2 cm and height 5 cm. Use π = 3.14. Give your answer in cm³.",
    "accept": [
     "62.8"
    ],
    "explanation": "3.14 × 2 × 2 × 5 = 62.8 cm³."
   },
   {
    "id": "maths-g5-c3",
    "type": "short",
    "prompt": "A metal block has a volume of 50 cm³ and a mass of 400 g. Find its density in g/cm³.",
    "accept": [
     "8"
    ],
    "explanation": "Density = 400 ÷ 50 = 8 g/cm³."
   },
   {
    "id": "maths-g5-c4",
    "type": "short",
    "prompt": "A trapezium has parallel sides of 6 cm and 10 cm and a height of 4 cm. Find its area in cm².",
    "accept": [
     "32",
     "32cm²",
     "32cm2"
    ],
    "explanation": "½ × (6 + 10) × 4 = 32 cm²."
   }
  ],
  "keywords": [
   "composite",
   "joined",
   "semicircle",
   "prism",
   "cylinder",
   "volume",
   "density",
   "mass",
   "fence",
   "area of",
   "trapezium"
  ]
 },
 {
  "id": "maths-g6",
  "subject": "maths",
  "topicId": "maths-4",
  "title": "Scale drawings, maps and congruent shapes",
  "why": "Scale questions turn a distance on a map or drawing into a real distance (or back again), and congruence asks whether two shapes are identical.",
  "sections": [
   {
    "h": "Using a scale",
    "p": [
     "A scale tells you how much real distance 1 cm on the drawing stands for."
    ],
    "list": [
     "1 cm represents 4.5 km: 8 cm on the map is 8 × 4.5 = 36 km.",
     "To go from real life to the drawing, divide: 14 m at 1 cm to 2 m is 14 ÷ 2 = 7 cm."
    ]
   },
   {
    "h": "Distances on a grid",
    "p": [
     "Find the distance on the grid (by measuring, or with Pythagoras), then multiply by the scale."
    ],
    "list": []
   },
   {
    "h": "Congruent shapes",
    "p": [],
    "list": [
     "Congruent shapes are exactly the same shape and size.",
     "They can be turned round or flipped over and still be congruent.",
     "Shapes that are the same shape but different sizes are similar, not congruent."
    ]
   }
  ],
  "worked": {
   "title": "On a map, 1 cm represents 4.5 km. Two towns are 8 cm apart on the map. How far apart are they?",
   "steps": [
    "Distance = 8 × 4.5",
    "= 36 km"
   ],
   "answer": "36 km"
  },
  "watch": [
   "Multiply to get real distances from a drawing; divide to go the other way.",
   "Check your units — km, m or cm."
  ],
  "checks": [
   {
    "id": "maths-g6-c1",
    "type": "short",
    "prompt": "On a map, 1 cm represents 5 km. Two towns are 7 cm apart on the map. How far apart are they in real life, in km?",
    "accept": [
     "35",
     "35km"
    ],
    "explanation": "7 × 5 = 35 km."
   },
   {
    "id": "maths-g6-c2",
    "type": "short",
    "prompt": "On a scale drawing, 1 cm represents 2 m. A wall is 14 m long. How long is it on the drawing, in cm?",
    "accept": [
     "7",
     "7cm"
    ],
    "explanation": "14 ÷ 2 = 7 cm."
   },
   {
    "id": "maths-g6-c3",
    "type": "mcq",
    "prompt": "Two shapes are congruent. What must be true?",
    "options": [
     "They are the same shape but different sizes",
     "They are the same shape and the same size",
     "They have the same perimeter only",
     "They have the same area only"
    ],
    "correctIndex": 1,
    "explanation": "Congruent means identical in shape and size."
   },
   {
    "id": "maths-g6-c4",
    "type": "short",
    "prompt": "On a map with a scale of 1 cm to 250 m, a path is 6 cm long. What is its real length in metres?",
    "accept": [
     "1500",
     "1500m"
    ],
    "explanation": "6 × 250 = 1500 m."
   }
  ],
  "keywords": [
   "scale",
   "map",
   "represents",
   "congruent",
   "coordinate",
   "drawing",
   "km",
   "1cm"
  ]
 },
 {
  "id": "maths-s1",
  "subject": "maths",
  "topicId": "maths-5",
  "title": "Probability",
  "why": "Probability questions ask how likely something is, always as a value from 0 to 1.",
  "sections": [
   {
    "h": "The probability scale",
    "p": [
     "Probability runs from 0 (impossible) to 1 (certain). It can be written as a fraction, a decimal or a percentage. It can never be more than 1 or less than 0."
    ],
    "list": []
   },
   {
    "h": "Working it out",
    "p": [
     "Probability = number of ways it can happen ÷ total number of equally likely outcomes."
    ],
    "list": [
     "A bag has 4 red and 6 blue balls. The total is 10, so P(red) = 4/10 = 2/5."
    ]
   },
   {
    "h": "Probabilities add up to 1",
    "p": [],
    "list": [
     "P(not A) = 1 − P(A).",
     "If the probabilities are 0.2, 0.35 and x, then x = 1 − (0.2 + 0.35) = 0.45.",
     "A dice showing “greater than 4” means 5 or 6: 2 out of 6 = 1/3."
    ]
   }
  ],
  "worked": {
   "title": "A fair dice is rolled. What is the probability of a number greater than 4?",
   "steps": [
    "Numbers greater than 4: 5 and 6 (2 outcomes)",
    "Total outcomes: 6",
    "Probability = 2/6 = 1/3"
   ],
   "answer": "1/3"
  },
  "watch": [
   "Simplify your fraction if you can.",
   "The total is all the possible outcomes, not just the “other” ones."
  ],
  "checks": [
   {
    "id": "maths-s1-c1",
    "type": "short",
    "prompt": "A bag has 3 red, 5 blue and 2 green counters. What is the probability of picking a blue counter? Give your answer as a fraction in its simplest form.",
    "accept": [
     "1/2"
    ],
    "explanation": "There are 10 counters and 5 are blue: 5/10 = 1/2."
   },
   {
    "id": "maths-s1-c2",
    "type": "short",
    "prompt": "The probability that it rains tomorrow is 0.3. What is the probability that it does not rain?",
    "accept": [
     "0.7",
     "7/10"
    ],
    "explanation": "1 − 0.3 = 0.7."
   },
   {
    "id": "maths-s1-c3",
    "type": "short",
    "prompt": "A fair 6-sided dice is rolled. What is the probability of an even number? Give your answer as a fraction in its simplest form.",
    "accept": [
     "1/2"
    ],
    "explanation": "Even numbers: 2, 4, 6, so 3 out of 6 = 1/2."
   },
   {
    "id": "maths-s1-c4",
    "type": "mcq",
    "prompt": "Which of these could NOT be a probability?",
    "options": [
     "0.25",
     "0",
     "1",
     "1.2"
    ],
    "correctIndex": 3,
    "explanation": "Probabilities are never bigger than 1."
   }
  ],
  "keywords": [
   "probability",
   "probabilities",
   "chosen at random",
   "dice",
   "bag",
   "spinner"
  ]
 },
 {
  "id": "maths-s2",
  "subject": "maths",
  "topicId": "maths-5",
  "title": "Averages and range",
  "why": "Statistics questions ask you to find or use the mean, median, mode and range.",
  "sections": [
   {
    "h": "The four measures",
    "p": [],
    "list": [
     "Mean: add up all the values and divide by how many there are.",
     "Median: the middle value once the numbers are in order (if there are two in the middle, find the number halfway between them).",
     "Mode: the value that appears most often.",
     "Range: the biggest value minus the smallest — it measures how spread out the values are."
    ]
   },
   {
    "h": "Working backwards from a mean",
    "p": [
     "Total = mean × number of values."
    ],
    "list": [
     "The mean of four numbers is 9, so the total is 36.",
     "Three of them are 5, 8 and 11 (total 24), so the fourth is 36 − 24 = 12."
    ]
   },
   {
    "h": "Which average?",
    "p": [],
    "list": [
     "The mean is affected by very high or very low values.",
     "The median is not affected by extreme values.",
     "The mode is the only average you can use for categories such as “favourite colour”."
    ]
   }
  ],
  "worked": {
   "title": "Find the median of 5, 9, 2, 8, 6",
   "steps": [
    "Put in order: 2, 5, 6, 8, 9",
    "The middle value is 6"
   ],
   "answer": "6"
  },
  "watch": [
   "Put the numbers in order before you find the median.",
   "The range is one number (biggest − smallest), not two."
  ],
  "checks": [
   {
    "id": "maths-s2-c1",
    "type": "short",
    "prompt": "Find the median of 7, 3, 9, 1, 5.",
    "accept": [
     "5"
    ],
    "explanation": "In order: 1, 3, 5, 7, 9. The middle value is 5."
   },
   {
    "id": "maths-s2-c2",
    "type": "short",
    "prompt": "Find the mean of 4, 6, 8, 10, 12.",
    "accept": [
     "8"
    ],
    "explanation": "Total = 40. 40 ÷ 5 = 8."
   },
   {
    "id": "maths-s2-c3",
    "type": "short",
    "prompt": "Find the range of 15, 3, 9, 21, 12.",
    "accept": [
     "18"
    ],
    "explanation": "21 − 3 = 18."
   },
   {
    "id": "maths-s2-c4",
    "type": "short",
    "prompt": "The mean of three numbers is 7. Two of the numbers are 5 and 6. Find the third number.",
    "accept": [
     "10"
    ],
    "explanation": "Total = 3 × 7 = 21. 21 − (5 + 6) = 10."
   }
  ],
  "keywords": [
   "mean",
   "median",
   "mode",
   "range",
   "average"
  ]
 },
 {
  "id": "maths-s3",
  "subject": "maths",
  "topicId": "maths-5",
  "title": "Reading charts and scatter graphs",
  "why": "Data questions ask you to read values from a chart or graph, or to describe what a scatter graph shows.",
  "sections": [
   {
    "h": "Reading a chart",
    "p": [],
    "list": [
     "Check the scale first: what is each gridline worth?",
     "Bar chart: read the height of the bar.",
     "Line graph: go across from the time, then up or down to the line.",
     "Pie chart: the whole circle is the total, and each sector is a fraction of it."
    ]
   },
   {
    "h": "Pie charts",
    "p": [
     "Fraction of the circle × total = number of items."
    ],
    "list": [
     "A quarter of a circle for 60 people is 15 people.",
     "To find an angle: (number ÷ total) × 360°. For 12 out of 30 pupils: 12/30 × 360 = 144°."
    ]
   },
   {
    "h": "Scatter graphs",
    "p": [],
    "list": [
     "Positive correlation: as one goes up, the other goes up (points slope upwards).",
     "Negative correlation: as one goes up, the other goes down (points slope downwards).",
     "No correlation: the points are scattered with no pattern.",
     "A line of best fit goes through the middle of the points and can be used to estimate values."
    ]
   }
  ],
  "worked": {
   "title": "30 pupils were asked their favourite sport. 12 said football. What angle is the football sector on a pie chart?",
   "steps": [
    "Fraction = 12/30",
    "Angle = 12/30 × 360°",
    "= 144°"
   ],
   "answer": "144°"
  },
  "watch": [
   "Check the axis scale — bars may go up in 2s or 5s, not 1s.",
   "Correlation shows a link, but it does not prove one thing causes the other."
  ],
  "checks": [
   {
    "id": "maths-s3-c1",
    "type": "mcq",
    "prompt": "A scatter graph has points sloping downwards from left to right. What type of correlation is this?",
    "options": [
     "No correlation",
     "Negative",
     "Positive",
     "Perfect"
    ],
    "correctIndex": 1,
    "explanation": "As one value goes up the other goes down: negative correlation."
   },
   {
    "id": "maths-s3-c2",
    "type": "short",
    "prompt": "In a survey of 60 people, a pie chart sector covers a quarter of the circle. How many people does that sector show?",
    "accept": [
     "15"
    ],
    "explanation": "A quarter of 60 = 60 ÷ 4 = 15."
   },
   {
    "id": "maths-s3-c3",
    "type": "short",
    "prompt": "A pie chart is drawn for 30 pupils. 12 of them choose football. What is the angle of the football sector, in degrees?",
    "accept": [
     "144",
     "144°"
    ],
    "explanation": "12/30 × 360 = 144°."
   },
   {
    "id": "maths-s3-c4",
    "type": "mcq",
    "prompt": "On a bar chart the vertical axis goes up in 2s. The top of the ‘cats’ bar is halfway between the 6 and 8 lines. How many cats?",
    "options": [
     "6",
     "7",
     "8",
     "14"
    ],
    "correctIndex": 1,
    "explanation": "Halfway between 6 and 8 is 7."
   }
  ],
  "keywords": [
   "scatter",
   "correlation",
   "pie chart",
   "bar chart",
   "line graph",
   "chart",
   "graph"
  ]
 },
 {
  "id": "maths-s4",
  "subject": "maths",
  "topicId": "maths-5",
  "title": "Listing outcomes and combining probabilities",
  "why": "Harder probability questions ask you to list every possible outcome or to combine the probabilities of two events.",
  "sections": [
   {
    "h": "Listing outcomes",
    "p": [
     "List them in an organised way so you don't miss any."
    ],
    "list": [
     "Flipping a coin twice: HH, HT, TH, TT — 4 outcomes.",
     "One card from each of two bags: if Bag A has 5 cards and Bag B has 4, there are 5 × 4 = 20 possible pairs."
    ]
   },
   {
    "h": "Independent events: “and” means multiply",
    "p": [
     "If one event does not affect the other, P(A and B) = P(A) × P(B)."
    ],
    "list": [
     "P(phone on Saturday) = 0.2 and P(boxes on Sunday) = 0.6, so P(both) = 0.2 × 0.6 = 0.12."
    ]
   },
   {
    "h": "“Or” means add (when both can't happen together)",
    "p": [],
    "list": [
     "P(red or blue) = P(red) + P(blue).",
     "A tree diagram: multiply along the branches, then add the branches that give the outcome you want."
    ]
   }
  ],
  "worked": {
   "title": "P(rain on Saturday) = 0.4 and P(rain on Sunday) = 0.5. What is P(rain on both days)? The days are independent.",
   "steps": [
    "“Both” means multiply",
    "0.4 × 0.5 = 0.2"
   ],
   "answer": "0.2"
  },
  "watch": [
   "Do not add probabilities for “and” — multiply them.",
   "A probability of “or” for two different results is the sum, never more than 1."
  ],
  "checks": [
   {
    "id": "maths-s4-c1",
    "type": "short",
    "prompt": "A coin is flipped twice. How many different outcomes are there altogether?",
    "accept": [
     "4"
    ],
    "explanation": "HH, HT, TH, TT: 4 outcomes."
   },
   {
    "id": "maths-s4-c2",
    "type": "short",
    "prompt": "The probability of rain on Saturday is 0.4 and on Sunday is 0.5. The days are independent. What is the probability of rain on both days?",
    "accept": [
     "0.2"
    ],
    "explanation": "0.4 × 0.5 = 0.2."
   },
   {
    "id": "maths-s4-c3",
    "type": "short",
    "prompt": "A spinner has P(red) = 0.3 and P(blue) = 0.45. What is the probability it lands on red or blue?",
    "accept": [
     "0.75"
    ],
    "explanation": "0.3 + 0.45 = 0.75."
   },
   {
    "id": "maths-s4-c4",
    "type": "short",
    "prompt": "Bag A has cards 1, 2, 3 and Bag B has cards 4, 5. One card is taken from each bag. How many possible pairs are there?",
    "accept": [
     "6"
    ],
    "explanation": "3 × 2 = 6 pairs."
   }
  ],
  "keywords": [
   "probability",
   "either",
   "both",
   "and then",
   "bag",
   "cards",
   "chosen at random",
   "tree",
   "spinner",
   "dice",
   "independent",
   "saturday"
  ]
 },
 {
  "id": "maths-s5",
  "subject": "maths",
  "topicId": "maths-5",
  "title": "Collecting data: questionnaires, pictograms and two-way tables",
  "why": "Data questions ask you to design a fair question, read a pictogram or fill in a two-way table.",
  "sections": [
   {
    "h": "Good questionnaire boxes",
    "p": [
     "Response boxes must not overlap and must cover every possible answer."
    ],
    "list": [
     "Good: “Less than 2 hours”, “2 to less than 4 hours”, “4 to less than 6 hours”, “6 hours or more”.",
     "Bad: “0–2”, “2–4”, “4–6” (2 could go in two boxes)."
    ]
   },
   {
    "h": "Pictograms and frequency tables",
    "p": [
     "Read the key first."
    ],
    "list": [
     "If one symbol stands for 4 people, then 3½ symbols = 14 people."
    ]
   },
   {
    "h": "Two-way tables and comparing groups",
    "p": [],
    "list": [
     "Rows and columns each add up to a total; find a missing number by subtracting.",
     "Compare groups of different sizes with percentages or fractions."
    ]
   }
  ],
  "worked": {
   "title": "In a pictogram each symbol represents 4 people. A row has 3½ symbols. How many people is that?",
   "steps": [
    "3 symbols = 3 × 4 = 12",
    "½ symbol = 2",
    "12 + 2 = 14"
   ],
   "answer": "14"
  },
  "watch": [
   "Always check the key on a pictogram.",
   "Boxes such as “0–2, 2–4” overlap. Use “less than” to avoid that."
  ],
  "checks": [
   {
    "id": "maths-s5-c1",
    "type": "short",
    "prompt": "In a pictogram, each symbol represents 4 people. A row has 3 and a half symbols. How many people is that?",
    "accept": [
     "14"
    ],
    "explanation": "3 × 4 = 12 and half a symbol = 2, so 14."
   },
   {
    "id": "maths-s5-c2",
    "type": "mcq",
    "prompt": "Which set of response boxes is best for “How many hours a week do you exercise?”",
    "options": [
     "0 to 1, 3 to 4, 6 to 7",
     "Less than 2, 2 to less than 4, 4 to less than 6, 6 or more",
     "1 to 2, 2 to 3",
     "0 to 2, 2 to 4, 4 to 6"
    ],
    "correctIndex": 1,
    "explanation": "They do not overlap and they cover every possible answer."
   },
   {
    "id": "maths-s5-c3",
    "type": "short",
    "prompt": "A two-way table shows 30 pupils. 18 are girls. 7 of the girls walk to school. How many girls do NOT walk to school?",
    "accept": [
     "11"
    ],
    "explanation": "18 − 7 = 11."
   },
   {
    "id": "maths-s5-c4",
    "type": "short",
    "prompt": "In a survey, 24 out of 60 people chose tea. What percentage chose tea?",
    "accept": [
     "40",
     "40%"
    ],
    "explanation": "24 ÷ 60 = 0.4 = 40%."
   }
  ],
  "keywords": [
   "survey",
   "questionnaire",
   "tick-box",
   "hypothesis",
   "frequency",
   "table",
   "pictogram",
   "how many people",
   "tally",
   "group",
   "two-way"
  ]
 },
 {
  "id": "science-w1",
  "subject": "science",
  "topicId": "science-1",
  "title": "Working scientifically: variables, resolution and reliable results",
  "why": "Many exam questions are about how an investigation is planned and how its results are handled, whatever the topic.",
  "sections": [
   {
    "h": "Variables",
    "p": [],
    "list": [
     "The independent variable is the one you change on purpose.",
     "The dependent variable is the one you measure.",
     "Control variables are kept the same so that the test is fair.",
     "Example: effect of temperature on how fast an enzyme works. Independent = temperature; dependent = time taken (or rate); controls = pH, enzyme concentration, volume of solution."
    ]
   },
   {
    "h": "Measuring well",
    "p": [],
    "list": [
     "Resolution is the smallest change an instrument can show — the smallest division on its scale.",
     "Accurate: close to the true value. Precise: repeat readings are close to each other.",
     "Repeat readings and take a mean to make the results more reliable."
    ]
   },
   {
    "h": "Handling results",
    "p": [],
    "list": [
     "An anomalous result does not fit the pattern. Check for a mistake, repeat it, and leave it out of the mean.",
     "Mean = total ÷ number of values.",
     "Describe a relationship in words: “as the temperature increases, the rate increases”, or “there is no relationship”.",
     "A larger, random sample gives more reliable results; repeating a survey over several years shows whether there is a trend."
    ]
   }
  ],
  "worked": {
   "title": "Five readings are 82, 78, 21, 81 and 79. Find the mean, leaving out the anomaly",
   "steps": [
    "21 is far from the others, so it is anomalous",
    "Add the other four: 82 + 78 + 81 + 79 = 320",
    "320 ÷ 4 = 80"
   ],
   "answer": "80"
  },
  "watch": [
   "The independent variable is what YOU change; the dependent variable is what you MEASURE.",
   "Do not include an anomalous result in the mean."
  ],
  "checks": [
   {
    "id": "science-w1-c1",
    "type": "mcq",
    "prompt": "In an investigation into how temperature affects the rate of an enzyme-controlled reaction, which is the independent variable?",
    "options": [
     "pH",
     "Rate of the reaction",
     "Volume of enzyme",
     "Temperature"
    ],
    "correctIndex": 3,
    "explanation": "Temperature is what you change on purpose."
   },
   {
    "id": "science-w1-c2",
    "type": "mcq",
    "prompt": "Which of these should be a control variable in that investigation?",
    "options": [
     "The pH of the solution",
     "The temperature",
     "The time taken",
     "The colour of the beaker"
    ],
    "correctIndex": 0,
    "explanation": "pH must be kept the same so that only temperature affects the result."
   },
   {
    "id": "science-w1-c3",
    "type": "short",
    "prompt": "Five readings are 80, 82, 21, 79 and 81. The reading of 21 is anomalous. Calculate the mean of the other four readings.",
    "accept": [
     "80.5"
    ],
    "explanation": "80 + 82 + 79 + 81 = 322, and 322 ÷ 4 = 80.5."
   },
   {
    "id": "science-w1-c4",
    "type": "mcq",
    "prompt": "What does the resolution of a measuring instrument mean?",
    "options": [
     "How close the reading is to the true value",
     "How many times it has been repeated",
     "The smallest change in a quantity that the instrument can show",
     "The largest value it can measure"
    ],
    "correctIndex": 2,
    "explanation": "Resolution is the smallest division or change that can be read."
   },
   {
    "id": "science-w1-c5",
    "type": "mcq",
    "prompt": "Why are readings repeated in an investigation?",
    "options": [
     "To spot anomalies and calculate a mean, making the results more reliable",
     "To reduce the number of control variables",
     "To make the equipment last longer",
     "To change the independent variable"
    ],
    "correctIndex": 0,
    "explanation": "Repeats let you spot anomalies and average out random errors."
   }
  ],
  "keywords": [
   "variable",
   "resolution",
   "anomal",
   "repeat",
   "reliab",
   "accura",
   "precis",
   "controlled",
   "independent",
   "dependent",
   "mean",
   "sample",
   "investigation",
   "experiment",
   "trial",
   "conclusion",
   "hypothesis",
   "method",
   "inaccuracy",
   "water bath",
   "investigat"
  ],
  "alsoTopics": [
   "science-2",
   "science-3",
   "science-4",
   "science-5"
  ]
 },
 {
  "id": "science-b1",
  "subject": "science",
  "topicId": "science-1",
  "title": "Cells and levels of organisation",
  "why": "Biology starts with cells: what is inside them, how they are different in plants and animals, and how cells build up into whole organisms.",
  "sections": [
   {
    "h": "Parts of a cell",
    "p": [],
    "list": [
     "Nucleus: contains the genetic material and controls the cell.",
     "Cytoplasm: where most chemical reactions happen.",
     "Cell membrane: controls what goes into and out of the cell.",
     "Mitochondria: where aerobic respiration releases energy.",
     "Ribosomes: where proteins are made."
    ]
   },
   {
    "h": "Extra parts in plant cells",
    "p": [],
    "list": [
     "Cell wall: made of cellulose, supports and strengthens the cell.",
     "Chloroplasts: contain chlorophyll for photosynthesis.",
     "Permanent vacuole: filled with cell sap."
    ]
   },
   {
    "h": "Levels of organisation",
    "p": [
     "Cells are grouped together to do a job."
    ],
    "list": [
     "Cell → tissue → organ → organ system → organism.",
     "Muscle cells → muscle tissue → stomach (organ) → digestive system → a human."
    ]
   }
  ],
  "worked": {
   "title": "Put these in order, smallest first: organ, cell, organism, tissue, organ system",
   "steps": [
    "The smallest is the cell",
    "Cells make a tissue, tissues make an organ",
    "Organs make an organ system, and systems make the organism"
   ],
   "answer": "cell → tissue → organ → organ system → organism"
  },
  "watch": [
   "Cell wall (plants, rigid) and cell membrane (all cells, controls what passes) are different parts.",
   "Only plant cells have chloroplasts and a permanent vacuole."
  ],
  "checks": [
   {
    "id": "science-b1-c1",
    "type": "mcq",
    "prompt": "Which part of a cell contains its genetic material?",
    "options": [
     "Cell membrane",
     "Cytoplasm",
     "Mitochondria",
     "Nucleus"
    ],
    "correctIndex": 3,
    "explanation": "The nucleus contains the genetic material (DNA)."
   },
   {
    "id": "science-b1-c2",
    "type": "mcq",
    "prompt": "Where does aerobic respiration mainly take place in a cell?",
    "options": [
     "Mitochondria",
     "Ribosomes",
     "Nucleus",
     "Cell wall"
    ],
    "correctIndex": 0,
    "explanation": "Mitochondria release energy from glucose by aerobic respiration."
   },
   {
    "id": "science-b1-c3",
    "type": "mcq",
    "prompt": "Which of these lists the levels of organisation from smallest to largest?",
    "options": [
     "Organ, tissue, cell, organism",
     "Cell, tissue, organ, organ system",
     "Cell, organ, tissue, organ system",
     "Tissue, cell, organ system, organ"
    ],
    "correctIndex": 1,
    "explanation": "Cells make tissues, tissues make organs, and organs make organ systems."
   },
   {
    "id": "science-b1-c4",
    "type": "mcq",
    "prompt": "Which structure is found in plant cells but NOT in animal cells?",
    "options": [
     "Mitochondria",
     "Cell membrane",
     "Chloroplast",
     "Nucleus"
    ],
    "correctIndex": 2,
    "explanation": "Chloroplasts are only found in plant cells (and some algae)."
   }
  ],
  "keywords": [
   "nucleus",
   "genetic material",
   "cell",
   "organelle",
   "levels of organisation",
   "tissue",
   "organ",
   "mitochondria",
   "chloroplast",
   "cell"
  ]
 },
 {
  "id": "science-b2",
  "subject": "science",
  "topicId": "science-1",
  "title": "Diffusion, osmosis, active transport and gas exchange",
  "why": "Substances have to move into and out of cells. You need to know the three ways they do it, and how the lungs are built for it.",
  "sections": [
   {
    "h": "Diffusion",
    "p": [
     "Diffusion is the net movement of particles from where they are in a high concentration to where they are in a low concentration. It does not need energy."
    ],
    "list": [
     "Oxygen diffuses from the air in the lungs into the blood.",
     "It is faster with a steeper concentration gradient, a higher temperature, a larger surface area and a shorter distance."
    ]
   },
   {
    "h": "Osmosis",
    "p": [
     "Osmosis is the movement of water across a partially permeable membrane from a dilute solution (high water concentration) to a more concentrated solution (low water concentration)."
    ],
    "list": [
     "A plant cell in pure water takes in water and becomes firm (turgid).",
     "A potato chip in strong sugar solution loses water and its mass goes down."
    ]
   },
   {
    "h": "Active transport",
    "p": [
     "Active transport moves substances against a concentration gradient (from low to high). It needs energy from respiration."
    ],
    "list": [
     "Root hair cells take up mineral ions from the soil this way."
    ]
   },
   {
    "h": "Gas exchange in the lungs",
    "p": [],
    "list": [
     "Alveoli have thin walls, a huge surface area and a rich blood supply.",
     "Oxygen diffuses into the blood and carbon dioxide diffuses out."
    ]
   }
  ],
  "worked": {
   "title": "A potato chip is put in a very concentrated sugar solution. What happens to its mass, and why?",
   "steps": [
    "Water is at a higher concentration inside the chip than in the solution",
    "Water moves out by osmosis",
    "The mass of the chip decreases"
   ],
   "answer": "Its mass decreases"
  },
  "watch": [
   "Osmosis is only about WATER moving; diffusion is about particles in general.",
   "Active transport is the only one of the three that needs energy."
  ],
  "checks": [
   {
    "id": "science-b2-c1",
    "type": "short",
    "prompt": "What is the name of the process where water moves across a partially permeable membrane from a high water concentration to a low water concentration?",
    "accept": [
     "osmosis"
    ],
    "explanation": "This is the definition of osmosis."
   },
   {
    "id": "science-b2-c2",
    "type": "mcq",
    "prompt": "Which process needs energy from respiration?",
    "options": [
     "Active transport",
     "Osmosis",
     "Evaporation",
     "Diffusion"
    ],
    "correctIndex": 0,
    "explanation": "Active transport moves substances against a concentration gradient using energy."
   },
   {
    "id": "science-b2-c3",
    "type": "mcq",
    "prompt": "Which feature makes the alveoli good for gas exchange?",
    "options": [
     "A small surface area",
     "Thick walls",
     "A very thin wall",
     "No blood supply"
    ],
    "correctIndex": 2,
    "explanation": "A thin wall (one cell thick) gives a short diffusion distance."
   },
   {
    "id": "science-b2-c4",
    "type": "mcq",
    "prompt": "A potato chip is placed in a very concentrated sugar solution. What happens to its mass?",
    "options": [
     "It increases",
     "It doubles",
     "It stays the same",
     "It decreases"
    ],
    "correctIndex": 3,
    "explanation": "Water leaves the chip by osmosis, so its mass decreases."
   }
  ],
  "keywords": [
   "diffusion",
   "osmosis",
   "partially permeable",
   "membrane",
   "active transport",
   "alveoli",
   "gas exchange",
   "concentration",
   "asthma",
   "respiratory"
  ]
 },
 {
  "id": "science-b3",
  "subject": "science",
  "topicId": "science-1",
  "title": "Photosynthesis and transport in plants",
  "why": "Plants make their own food. You need to know what goes in, what comes out, what limits the rate and how water and sugars move around the plant.",
  "sections": [
   {
    "h": "Photosynthesis",
    "p": [
     "Plants use light energy to make glucose in the chloroplasts, using the green pigment chlorophyll."
    ],
    "list": [
     "carbon dioxide + water → glucose + oxygen",
     "Symbol equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂"
    ]
   },
   {
    "h": "What affects the rate",
    "p": [],
    "list": [
     "Light intensity, carbon dioxide concentration and temperature (up to an optimum).",
     "The factor in shortest supply is the limiting factor: it stops the rate from going up even if the others increase."
    ]
   },
   {
    "h": "Transport in plants",
    "p": [],
    "list": [
     "Xylem: carries water and mineral ions from the roots up to the leaves.",
     "Phloem: carries the sugars made in the leaves to where they are needed or stored."
    ]
   }
  ],
  "worked": {
   "title": "A plant has plenty of light and warmth, but very little carbon dioxide. What limits the rate of photosynthesis?",
   "steps": [
    "Photosynthesis needs light, carbon dioxide and a suitable temperature",
    "Light and temperature are fine",
    "Carbon dioxide is in short supply, so it is the limiting factor"
   ],
   "answer": "Carbon dioxide concentration"
  },
  "watch": [
   "Oxygen is a PRODUCT of photosynthesis, not something the plant needs for it.",
   "Xylem carries water up; phloem carries sugars (food)."
  ],
  "checks": [
   {
    "id": "science-b3-c1",
    "type": "mcq",
    "prompt": "Which of these is a product of photosynthesis?",
    "options": [
     "Nitrogen",
     "Glucose",
     "Carbon dioxide",
     "Water"
    ],
    "correctIndex": 1,
    "explanation": "Glucose (and oxygen) are made; carbon dioxide and water are the raw materials."
   },
   {
    "id": "science-b3-c2",
    "type": "mcq",
    "prompt": "What is the role of xylem in a plant?",
    "options": [
     "Absorbing light",
     "Carrying water and minerals up from the roots",
     "Storing starch",
     "Carrying sugars from the leaves"
    ],
    "correctIndex": 1,
    "explanation": "Xylem transports water and mineral ions up the plant."
   },
   {
    "id": "science-b3-c3",
    "type": "short",
    "prompt": "Name the green pigment in chloroplasts that absorbs light for photosynthesis.",
    "accept": [
     "chlorophyll"
    ],
    "explanation": "Chlorophyll absorbs light energy."
   },
   {
    "id": "science-b3-c4",
    "type": "mcq",
    "prompt": "A plant has plenty of light and warmth but very little carbon dioxide. What is the limiting factor?",
    "options": [
     "Temperature",
     "Oxygen concentration",
     "Carbon dioxide concentration",
     "Light intensity"
    ],
    "correctIndex": 2,
    "explanation": "The factor in shortest supply limits the rate: here it is carbon dioxide."
   }
  ],
  "keywords": [
   "photosynthesis",
   "chlorophyll",
   "chloroplast",
   "light",
   "carbon dioxide",
   "xylem",
   "phloem",
   "limiting factor",
   "glucose",
   "leaf",
   "transpir"
  ]
 },
 {
  "id": "science-b4",
  "subject": "science",
  "topicId": "science-1",
  "title": "Respiration",
  "why": "All living things respire. You need to know the equation, where it happens and what changes when there is not enough oxygen.",
  "sections": [
   {
    "h": "Aerobic respiration",
    "p": [
     "Aerobic respiration uses oxygen to release energy from glucose. It happens in the mitochondria."
    ],
    "list": [
     "glucose + oxygen → carbon dioxide + water (+ energy)",
     "The energy is used for movement, keeping warm and building new molecules."
    ]
   },
   {
    "h": "Anaerobic respiration",
    "p": [
     "When there is not enough oxygen, cells can respire without it, but it releases much less energy."
    ],
    "list": [
     "In muscles: glucose → lactic acid (+ a little energy).",
     "In yeast (fermentation): glucose → ethanol + carbon dioxide."
    ]
   },
   {
    "h": "During exercise",
    "p": [
     "Muscles need more energy, so breathing rate and heart rate go up to bring in more oxygen and take away carbon dioxide."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "Write the word equation for aerobic respiration",
   "steps": [
    "Reactants: glucose and oxygen",
    "Products: carbon dioxide and water",
    "glucose + oxygen → carbon dioxide + water"
   ],
   "answer": "glucose + oxygen → carbon dioxide + water (+ energy)"
  },
  "watch": [
   "Respiration is not the same as breathing: respiration releases energy inside cells.",
   "Anaerobic respiration releases far less energy than aerobic respiration."
  ],
  "checks": [
   {
    "id": "science-b4-c1",
    "type": "short",
    "prompt": "Complete the word equation for aerobic respiration: glucose + oxygen → carbon dioxide + ____",
    "accept": [
     "water"
    ],
    "explanation": "Aerobic respiration produces carbon dioxide and water."
   },
   {
    "id": "science-b4-c2",
    "type": "mcq",
    "prompt": "Which substance is made in muscle cells during anaerobic respiration?",
    "options": [
     "Carbon dioxide only",
     "Ethanol",
     "Lactic acid",
     "Oxygen"
    ],
    "correctIndex": 2,
    "explanation": "In muscles, anaerobic respiration makes lactic acid."
   },
   {
    "id": "science-b4-c3",
    "type": "mcq",
    "prompt": "Where in the cell does aerobic respiration mainly happen?",
    "options": [
     "Cell wall",
     "Nucleus",
     "Ribosomes",
     "Mitochondria"
    ],
    "correctIndex": 3,
    "explanation": "Mitochondria."
   },
   {
    "id": "science-b4-c4",
    "type": "mcq",
    "prompt": "Why does your breathing rate increase during exercise?",
    "options": [
     "To supply more oxygen and remove more carbon dioxide",
     "To cool the lungs",
     "To get rid of oxygen",
     "To make less lactic acid"
    ],
    "correctIndex": 0,
    "explanation": "Muscle cells respire faster so they need more oxygen and produce more carbon dioxide."
   }
  ],
  "keywords": [
   "respiration",
   "aerobic",
   "anaerobic",
   "glucose + oxygen",
   "lactic acid",
   "mitochondria",
   "exercise",
   "energy",
   "oxygen"
  ]
 },
 {
  "id": "science-b5",
  "subject": "science",
  "topicId": "science-1",
  "title": "Enzymes and digestion",
  "why": "Enzymes speed up reactions in the body. You need to know how they work, what changes them and what they do in digestion.",
  "sections": [
   {
    "h": "Enzymes",
    "p": [
     "Enzymes are biological catalysts made of protein. They speed up reactions and are not used up."
    ],
    "list": [
     "Lock and key model: the shape of the substrate matches the enzyme's active site.",
     "Enzymes work best at an optimum temperature and pH. If it is too hot, the enzyme changes shape (denatures) and the substrate no longer fits."
    ]
   },
   {
    "h": "Digestive enzymes",
    "p": [],
    "list": [
     "Amylase breaks down starch into sugars.",
     "Protease breaks down protein into amino acids.",
     "Lipase breaks down fats (lipids) into fatty acids and glycerol."
    ]
   },
   {
    "h": "Bile",
    "p": [
     "Bile is made in the liver and stored in the gall bladder. It is not an enzyme."
    ],
    "list": [
     "It breaks large fat drops into small droplets (emulsifies), giving a bigger surface area for lipase to work.",
     "It also neutralises stomach acid."
    ]
   }
  ],
  "worked": {
   "title": "An enzyme's activity rises to a peak at 37°C, then drops quickly above 45°C. Explain why it drops",
   "steps": [
    "Above the optimum the enzyme's shape changes",
    "It has denatured",
    "The substrate no longer fits the active site, so activity falls"
   ],
   "answer": "The enzyme has denatured"
  },
  "watch": [
   "Bile is not an enzyme; it helps enzymes by emulsifying fats.",
   "A denatured enzyme cannot be “fixed” by cooling it down again."
  ],
  "checks": [
   {
    "id": "science-b5-c1",
    "type": "mcq",
    "prompt": "Which organ produces bile?",
    "options": [
     "Pancreas",
     "Small intestine",
     "Stomach",
     "Liver"
    ],
    "correctIndex": 3,
    "explanation": "Bile is made in the liver and stored in the gall bladder."
   },
   {
    "id": "science-b5-c2",
    "type": "short",
    "prompt": "Name the enzyme that breaks down fats (lipids) during digestion.",
    "accept": [
     "lipase"
    ],
    "explanation": "Lipase breaks fats into fatty acids and glycerol."
   },
   {
    "id": "science-b5-c3",
    "type": "mcq",
    "prompt": "What happens to an enzyme at a temperature far above its optimum?",
    "options": [
     "It becomes denatured",
     "It works faster",
     "It turns into a substrate",
     "It is used up"
    ],
    "correctIndex": 0,
    "explanation": "The active site changes shape, so the substrate no longer fits."
   },
   {
    "id": "science-b5-c4",
    "type": "mcq",
    "prompt": "What does the lock and key model explain?",
    "options": [
     "Why enzymes are used up",
     "Why the shape of the substrate must fit the enzyme's active site",
     "Why bile is alkaline",
     "Why enzymes need light"
    ],
    "correctIndex": 1,
    "explanation": "Each enzyme's active site fits a particular substrate."
   }
  ],
  "keywords": [
   "enzyme",
   "bile",
   "lipase",
   "amylase",
   "protease",
   "digestion",
   "denature",
   "lock and key",
   "substrate",
   "liver",
   "fats",
   "enzyme",
   "water bath",
   "temperature"
  ]
 },
 {
  "id": "science-b6",
  "subject": "science",
  "topicId": "science-1",
  "title": "The heart, blood vessels and blood",
  "why": "The circulatory system carries oxygen and nutrients round the body. You need to know the heart chambers, the three types of vessel and what is in blood.",
  "sections": [
   {
    "h": "The heart",
    "p": [
     "The heart is a double pump: the right side sends blood to the lungs and the left side sends blood to the body."
    ],
    "list": [
     "The atria receive blood; the ventricles pump it out.",
     "The left ventricle has the thickest wall because it pumps blood round the whole body."
    ]
   },
   {
    "h": "Blood vessels",
    "p": [],
    "list": [
     "Arteries carry blood away from the heart (thick, muscular walls, high pressure).",
     "Veins carry blood back to the heart (valves stop backflow).",
     "Capillaries are one cell thick, so substances can pass between the blood and the body cells."
    ]
   },
   {
    "h": "Blood",
    "p": [],
    "list": [
     "Red blood cells carry oxygen (they contain haemoglobin).",
     "White blood cells fight infection.",
     "Platelets help blood clot.",
     "Plasma carries dissolved substances such as glucose and carbon dioxide."
    ]
   }
  ],
  "worked": {
   "title": "Which chambers pump blood out of the heart?",
   "steps": [
    "Atria receive blood coming in",
    "Ventricles push blood out to the lungs and the body"
   ],
   "answer": "The ventricles"
  },
  "watch": [
   "Arteries go Away from the heart; veins go back in.",
   "Atria = in; ventricles = out."
  ],
  "checks": [
   {
    "id": "science-b6-c1",
    "type": "mcq",
    "prompt": "Which blood vessel carries blood away from the heart?",
    "options": [
     "Vein",
     "Capillary",
     "Vena cava",
     "Artery"
    ],
    "correctIndex": 3,
    "explanation": "Arteries carry blood away from the heart."
   },
   {
    "id": "science-b6-c2",
    "type": "mcq",
    "prompt": "Which chambers of the heart pump blood out?",
    "options": [
     "The ventricles",
     "The valves",
     "The atria",
     "The veins"
    ],
    "correctIndex": 0,
    "explanation": "The ventricles have thick muscular walls and pump blood out."
   },
   {
    "id": "science-b6-c3",
    "type": "mcq",
    "prompt": "Which vessels let substances pass between the blood and body cells?",
    "options": [
     "Arteries",
     "Valves",
     "Veins",
     "Capillaries"
    ],
    "correctIndex": 3,
    "explanation": "Capillaries are one cell thick."
   },
   {
    "id": "science-b6-c4",
    "type": "mcq",
    "prompt": "Which part of the blood carries oxygen?",
    "options": [
     "Red blood cells",
     "Plasma",
     "White blood cells",
     "Platelets"
    ],
    "correctIndex": 0,
    "explanation": "Red blood cells contain haemoglobin, which carries oxygen."
   }
  ],
  "keywords": [
   "heart",
   "artery",
   "vein",
   "capillary",
   "ventricle",
   "atrium",
   "blood",
   "circulat",
   "red blood",
   "white blood",
   "vessel"
  ]
 },
 {
  "id": "science-b7",
  "subject": "science",
  "topicId": "science-1",
  "title": "Ecosystems, food chains and energy",
  "why": "Living things depend on each other and on their surroundings. You need the food-chain vocabulary and to know why energy is lost at each step.",
  "sections": [
   {
    "h": "Food chains",
    "p": [],
    "list": [
     "A producer makes its own food by photosynthesis (for example grass).",
     "Primary consumers eat producers; secondary consumers eat primary consumers.",
     "Each step is a trophic level. A predator hunts prey."
    ]
   },
   {
    "h": "Energy in food chains",
    "p": [
     "Only about 10% of the energy passes on to the next trophic level. The rest is lost as heat, movement and waste."
    ],
    "list": [
     "That is why food chains are short and there are fewer organisms at higher levels.",
     "If a producer stores 1000 kJ, the primary consumer gets about 100 kJ and the secondary consumer about 10 kJ."
    ]
   },
   {
    "h": "Factors in an ecosystem",
    "p": [],
    "list": [
     "Abiotic factors are non-living: temperature, light intensity, water, pH, oxygen.",
     "Biotic factors are living: predators, food supply, disease, competition."
    ]
   }
  ],
  "worked": {
   "title": "A producer stores 2000 kJ. About 10% passes on at each step. How much reaches the secondary consumer?",
   "steps": [
    "Primary consumer: 10% of 2000 = 200 kJ",
    "Secondary consumer: 10% of 200 = 20 kJ"
   ],
   "answer": "20 kJ"
  },
  "watch": [
   "Producers are at the start of the food chain; the arrows show the direction the energy goes.",
   "Abiotic = non-living, biotic = living."
  ],
  "checks": [
   {
    "id": "science-b7-c1",
    "type": "mcq",
    "prompt": "In a food chain, what do we call an organism that makes its own food?",
    "options": [
     "Producer",
     "Decomposer",
     "Consumer",
     "Predator"
    ],
    "correctIndex": 0,
    "explanation": "Producers make their own food by photosynthesis."
   },
   {
    "id": "science-b7-c2",
    "type": "short",
    "prompt": "What term describes the non-living factors in an ecosystem, such as temperature, light and water availability?",
    "accept": [
     "abiotic",
     "abiotic factors",
     "abioticfactors"
    ],
    "explanation": "Abiotic factors are non-living."
   },
   {
    "id": "science-b7-c3",
    "type": "mcq",
    "prompt": "In a food chain, what generally happens to the energy available at each trophic level?",
    "options": [
     "It doubles",
     "It stays the same",
     "It decreases",
     "It increases"
    ],
    "correctIndex": 2,
    "explanation": "Energy is lost as heat, movement and waste at every step."
   },
   {
    "id": "science-b7-c4",
    "type": "short",
    "prompt": "A producer stores 2000 kJ of energy. Assuming 10% passes to each next level, how much energy (in kJ) reaches the secondary consumer?",
    "accept": [
     "20",
     "20kj"
    ],
    "explanation": "2000 → 200 → 20 kJ."
   }
  ],
  "keywords": [
   "food chain",
   "producer",
   "consumer",
   "trophic",
   "ecosystem",
   "abiotic",
   "biotic",
   "energy",
   "predator",
   "prey",
   "food web"
  ]
 },
 {
  "id": "science-b8",
  "subject": "science",
  "topicId": "science-1",
  "title": "Food tests and enzyme practicals",
  "why": "You need the reagents and colour changes for the food tests, and how they are used in an enzyme investigation.",
  "sections": [
   {
    "h": "The four food tests",
    "p": [],
    "list": [
     "Starch: add iodine solution. Brown → blue-black if starch is present.",
     "Sugar (glucose): add Benedict's solution and heat in a water bath. Blue → green → yellow → orange/brick red.",
     "Protein: add biuret reagent. Blue → purple (lilac).",
     "Fat: shake with ethanol, then add water. A cloudy white emulsion forms."
    ]
   },
   {
    "h": "Benedict's test on a sample such as urine",
    "p": [
     "Put a sample in a test tube, add Benedict's solution, and warm it in a water bath for a few minutes. Any colour change from blue means a reducing sugar is present."
    ],
    "list": []
   },
   {
    "h": "Enzyme investigation",
    "p": [
     "To time how fast amylase digests starch, take samples at intervals and add iodine. When the iodine stays brown, all the starch has gone."
    ],
    "list": [
     "The shorter the time, the faster the enzyme is working."
    ]
   }
  ],
  "worked": {
   "title": "After adding iodine solution to a food sample the colour changes from brown to blue-black. What does this show?",
   "steps": [
    "Iodine is the test for starch",
    "Blue-black means starch is present"
   ],
   "answer": "Starch is present"
  },
  "watch": [
   "Benedict's test needs heating; the iodine test does not.",
   "A blue Benedict's solution that stays blue means NO reducing sugar."
  ],
  "checks": [
   {
    "id": "science-b8-c1",
    "type": "mcq",
    "prompt": "In an iodine test a colour change from brown to blue-black is seen. Which food is present?",
    "options": [
     "Starch",
     "Protein",
     "Sugar",
     "Fat"
    ],
    "correctIndex": 0,
    "explanation": "Blue-black with iodine means starch."
   },
   {
    "id": "science-b8-c2",
    "type": "mcq",
    "prompt": "Which test is used for glucose (a reducing sugar)?",
    "options": [
     "Ethanol emulsion",
     "Iodine",
     "Biuret",
     "Benedict's"
    ],
    "correctIndex": 3,
    "explanation": "Benedict's solution, heated."
   },
   {
    "id": "science-b8-c3",
    "type": "mcq",
    "prompt": "A positive Benedict's test on a sugar sample gives which final colour?",
    "options": [
     "Brick red / orange",
     "Blue-black",
     "Purple",
     "Blue"
    ],
    "correctIndex": 0,
    "explanation": "Blue turns green, yellow, then orange or brick red."
   },
   {
    "id": "science-b8-c4",
    "type": "mcq",
    "prompt": "Biuret reagent turns purple when which nutrient is present?",
    "options": [
     "Glucose",
     "Fat",
     "Starch",
     "Protein"
    ],
    "correctIndex": 3,
    "explanation": "Biuret tests for protein."
   }
  ],
  "keywords": [
   "iodine",
   "benedict",
   "starch",
   "biuret",
   "food test",
   "enzyme",
   "urine",
   "agar",
   "sample",
   "colour change"
  ]
 },
 {
  "id": "science-b9",
  "subject": "science",
  "topicId": "science-1",
  "title": "Ecology surveys and human effects on ecosystems",
  "why": "Questions about surveys and pollution ask how to collect fair data and what happens when fertiliser reaches a pond.",
  "sections": [
   {
    "h": "Surveys",
    "p": [],
    "list": [
     "A quadrat is a square frame used to sample a small area. Place it at random positions (for example using random numbers for coordinates) so the sample is unbiased.",
     "Count the organisms in each quadrat and calculate the mean per m².",
     "Estimate a total: mean per m² × total area. A mean of 6 plants per m² over 200 m² is about 1200 plants.",
     "A transect is a line across a habitat (for example from shade into light) with quadrats at intervals."
    ]
   },
   {
    "h": "Reliable data",
    "p": [
     "Sample several different areas across the whole habitat, not just one, and repeat the survey over several years to see trends in biodiversity."
    ],
    "list": []
   },
   {
    "h": "Fertiliser and eutrophication",
    "p": [],
    "list": [
     "Fertiliser runs into a pond, so algae grow rapidly (an algal bloom).",
     "The algae block light, so plants below die.",
     "Bacteria decompose the dead plants and use up the oxygen, so fish and other animals die."
    ]
   }
  ],
  "worked": {
   "title": "A quadrat survey finds a mean of 6 plants per m². The field is 200 m². Estimate the total number of plants",
   "steps": [
    "Total = mean per m² × area",
    "6 × 200 = 1200"
   ],
   "answer": "About 1200 plants"
  },
  "watch": [
   "Random placement avoids bias — you are not choosing the “best-looking” spots.",
   "One area is not representative of a whole moorland."
  ],
  "checks": [
   {
    "id": "science-b9-c1",
    "type": "mcq",
    "prompt": "Why should quadrats be placed at random?",
    "options": [
     "To find the most plants",
     "To use fewer quadrats",
     "To make counting easier",
     "To avoid bias in the sample"
    ],
    "correctIndex": 3,
    "explanation": "Random placement gives an unbiased sample."
   },
   {
    "id": "science-b9-c2",
    "type": "short",
    "prompt": "A quadrat survey finds a mean of 6 plants per m². The field has an area of 200 m². Estimate the total number of plants.",
    "accept": [
     "1200"
    ],
    "explanation": "6 × 200 = 1200."
   },
   {
    "id": "science-b9-c3",
    "type": "mcq",
    "prompt": "After fertiliser runs into a pond, algae multiply and later the fish die. What is the main reason the fish die?",
    "options": [
     "The algae eat the fish",
     "They eat the fertiliser",
     "Decomposing bacteria use up the oxygen in the water",
     "The pond gets colder"
    ],
    "correctIndex": 2,
    "explanation": "Bacteria decomposing dead plants use up the oxygen."
   },
   {
    "id": "science-b9-c4",
    "type": "mcq",
    "prompt": "Scientists sampled several areas spread across the whole moorland rather than one small area. Why?",
    "options": [
     "It was cheaper",
     "To avoid repeating the survey",
     "So the results are representative of the whole moorland",
     "To count fewer plants"
    ],
    "correctIndex": 2,
    "explanation": "Sampling widely makes the results more representative."
   }
  ],
  "keywords": [
   "quadrat",
   "biodiversity",
   "survey",
   "sample",
   "fertiliser",
   "algae",
   "pond",
   "population",
   "habitat",
   "moorland",
   "transect",
   "abundance",
   "species"
  ]
 },
 {
  "id": "science-b10",
  "subject": "science",
  "topicId": "science-1",
  "title": "Transpiration and the respiratory system (asthma)",
  "why": "Two applied topics that come up in past papers: water loss from plants and what happens in an asthma attack.",
  "sections": [
   {
    "h": "Transpiration",
    "p": [
     "Transpiration is the loss of water vapour from a plant, mostly through stomata in the leaves. It pulls more water up the xylem."
    ],
    "list": [
     "It is faster in hot, sunny, windy and dry conditions.",
     "A plant that loses more mass over a few hours has transpired more (lost more water)."
    ]
   },
   {
    "h": "The respiratory system and asthma",
    "p": [
     "Air passes down the trachea, into the bronchi and bronchioles, and into the alveoli, where gas exchange happens."
    ],
    "list": [
     "In asthma the airways (bronchioles) become inflamed and narrow, so less air reaches the alveoli and less oxygen gets into the blood.",
     "A reliever inhaler relaxes the muscles around the airways and opens them again."
    ]
   }
  ],
  "worked": {
   "title": "Why does an asthma attack make breathing difficult?",
   "steps": [
    "The airways become inflamed and narrower",
    "Less air can flow to the alveoli",
    "So less oxygen can enter the blood"
   ],
   "answer": "The narrowed airways let less air reach the lungs"
  },
  "watch": [
   "Stomata are where most water is lost.",
   "In an investigation, more mass lost means more transpiration."
  ],
  "checks": [
   {
    "id": "science-b10-c1",
    "type": "mcq",
    "prompt": "Through which structures do plants lose most water vapour?",
    "options": [
     "Xylem",
     "Stomata",
     "Roots",
     "Flowers"
    ],
    "correctIndex": 1,
    "explanation": "Stomata on the leaves."
   },
   {
    "id": "science-b10-c2",
    "type": "mcq",
    "prompt": "Which conditions cause the fastest transpiration?",
    "options": [
     "Cool, still, humid",
     "Cold and wet",
     "Dark and cool",
     "Hot, windy, dry"
    ],
    "correctIndex": 3,
    "explanation": "Heat, wind and dry air all increase transpiration."
   },
   {
    "id": "science-b10-c3",
    "type": "mcq",
    "prompt": "Why does an asthma attack make breathing difficult?",
    "options": [
     "The airways become narrower so less air reaches the lungs",
     "The alveoli burst",
     "The heart stops",
     "The lungs fill with blood"
    ],
    "correctIndex": 0,
    "explanation": "Inflamed, narrowed airways reduce airflow."
   },
   {
    "id": "science-b10-c4",
    "type": "mcq",
    "prompt": "Plant A lost more mass than Plant B over 7 hours, in identical conditions. What does this show?",
    "options": [
     "Plant A transpired more",
     "Plant A had no stomata",
     "Plant B respired more",
     "Plant A photosynthesised more"
    ],
    "correctIndex": 0,
    "explanation": "The extra mass lost was water lost by transpiration."
   }
  ],
  "keywords": [
   "transpiration",
   "stomata",
   "asthma",
   "bronchioles",
   "airways",
   "mass lost",
   "lung",
   "inhaler",
   "breathing",
   "plant lost"
  ]
 },
 {
  "id": "science-c1",
  "subject": "science",
  "topicId": "science-2",
  "title": "Atomic structure and isotopes",
  "why": "Every chemistry topic starts with atoms: what is inside them, how to work out the numbers, and what an isotope is.",
  "sections": [
   {
    "h": "Inside an atom",
    "p": [
     "An atom has a small nucleus containing protons and neutrons, with electrons in shells around it."
    ],
    "list": [
     "Proton: relative charge +1, relative mass 1.",
     "Neutron: charge 0, relative mass 1.",
     "Electron: charge −1, very small mass.",
     "An atom has no overall charge because the number of protons equals the number of electrons."
    ]
   },
   {
    "h": "The numbers",
    "p": [],
    "list": [
     "Atomic number = number of protons.",
     "Mass number = protons + neutrons.",
     "Neutrons = mass number − atomic number.",
     "Electrons fill shells: 2 in the first, 8 in the second, 8 in the third."
    ]
   },
   {
    "h": "Isotopes",
    "p": [
     "Isotopes are atoms of the same element (same number of protons) with different numbers of neutrons."
    ],
    "list": [
     "Carbon-12 and carbon-14 both have 6 protons, but 6 and 8 neutrons."
    ]
   }
  ],
  "worked": {
   "title": "A chlorine atom has atomic number 17 and mass number 35. How many protons, electrons and neutrons?",
   "steps": [
    "Protons = atomic number = 17",
    "Electrons = protons = 17",
    "Neutrons = 35 − 17 = 18"
   ],
   "answer": "17 protons, 17 electrons, 18 neutrons"
  },
  "watch": [
   "Mass number is protons PLUS neutrons; atomic number is just the protons.",
   "Isotopes have the same number of protons but different numbers of neutrons."
  ],
  "checks": [
   {
    "id": "science-c1-c1",
    "type": "mcq",
    "prompt": "What is found in the nucleus of an atom?",
    "options": [
     "Protons and electrons",
     "Protons and neutrons",
     "Neutrons and electrons",
     "Only electrons"
    ],
    "correctIndex": 1,
    "explanation": "The nucleus contains protons and neutrons."
   },
   {
    "id": "science-c1-c2",
    "type": "mcq",
    "prompt": "The atomic number of an element tells you the number of…",
    "options": [
     "protons",
     "neutrons",
     "shells",
     "protons plus neutrons"
    ],
    "correctIndex": 0,
    "explanation": "Atomic number = number of protons."
   },
   {
    "id": "science-c1-c3",
    "type": "short",
    "prompt": "Isotopes of the same element have the same number of protons but a different number of what?",
    "accept": [
     "neutrons"
    ],
    "explanation": "Different numbers of neutrons give different mass numbers."
   },
   {
    "id": "science-c1-c4",
    "type": "short",
    "prompt": "An atom has atomic number 11 and mass number 23. How many neutrons does it have?",
    "accept": [
     "12"
    ],
    "explanation": "Neutrons = 23 − 11 = 12."
   }
  ],
  "keywords": [
   "atom",
   "nucleus",
   "proton",
   "neutron",
   "electron",
   "atomic number",
   "mass number",
   "isotope",
   "shell"
  ]
 },
 {
  "id": "science-c2",
  "subject": "science",
  "topicId": "science-2",
  "title": "The periodic table",
  "why": "The periodic table organises the elements. You need to know how it is laid out and what the groups tell you.",
  "sections": [
   {
    "h": "Layout",
    "p": [],
    "list": [
     "Elements are in order of atomic number.",
     "Columns are groups. Rows are periods.",
     "The group number is the number of electrons in the outer shell (for groups 1 to 7).",
     "Metals are on the left and in the middle; non-metals are on the right."
    ]
   },
   {
    "h": "Groups to know",
    "p": [],
    "list": [
     "Group 1 (alkali metals): soft, reactive metals. They get MORE reactive going down the group.",
     "Group 7 (halogens): non-metals that exist as pairs of atoms (Cl₂, Br₂). They get LESS reactive going down.",
     "Group 0 (noble gases): unreactive because they have a full outer shell of electrons."
    ]
   },
   {
    "h": "Metals and non-metals",
    "p": [],
    "list": [
     "Metals: shiny, good conductors of heat and electricity, malleable.",
     "Non-metals: dull, poor conductors, brittle when solid."
    ]
   }
  ],
  "worked": {
   "title": "An element is in Group 2, Period 3. What does this tell you?",
   "steps": [
    "Group 2 means 2 electrons in the outer shell",
    "Period 3 means 3 shells of electrons",
    "(It is magnesium, with electron arrangement 2, 8, 2)"
   ],
   "answer": "2 outer electrons and 3 shells"
  },
  "watch": [
   "The group number gives the outer electrons, and the period number gives the number of shells.",
   "Reactivity goes UP down group 1 but DOWN going down group 7."
  ],
  "checks": [
   {
    "id": "science-c2-c1",
    "type": "short",
    "prompt": "Group 0 elements (the noble gases) are unreactive because they have a full what?",
    "accept": [
     "outer shell",
     "full outer shell",
     "outer electron shell",
     "shell",
     "outer energy level"
    ],
    "explanation": "They have a full outer shell of electrons, so they do not need to gain, lose or share any."
   },
   {
    "id": "science-c2-c2",
    "type": "mcq",
    "prompt": "Where are non-metals generally found on the periodic table?",
    "options": [
     "On the left",
     "On the right",
     "In the middle block",
     "In the bottom row only"
    ],
    "correctIndex": 1,
    "explanation": "Non-metals are on the right-hand side."
   },
   {
    "id": "science-c2-c3",
    "type": "mcq",
    "prompt": "An element has 2 electrons in its outer shell. Which group is it in?",
    "options": [
     "Group 6",
     "Group 2",
     "Group 0",
     "Group 1"
    ],
    "correctIndex": 1,
    "explanation": "The group number equals the number of outer electrons."
   },
   {
    "id": "science-c2-c4",
    "type": "mcq",
    "prompt": "What happens to the reactivity of the Group 1 metals as you go down the group?",
    "options": [
     "It stays the same",
     "It increases",
     "It decreases",
     "They become unreactive"
    ],
    "correctIndex": 1,
    "explanation": "They become more reactive going down Group 1."
   }
  ],
  "keywords": [
   "periodic table",
   "group",
   "period",
   "noble gas",
   "alkali",
   "halogen",
   "metal",
   "non-metal",
   "outer shell",
   "reactiv"
  ]
 },
 {
  "id": "science-c3",
  "subject": "science",
  "topicId": "science-2",
  "title": "States of matter and separating mixtures",
  "why": "Substances change state, and mixtures can be separated because their parts have different properties.",
  "sections": [
   {
    "h": "States of matter",
    "p": [],
    "list": [
     "Solid: particles close together in fixed positions, vibrating.",
     "Liquid: particles close together but able to slide past each other.",
     "Gas: particles far apart, moving quickly in random directions."
    ]
   },
   {
    "h": "Changes of state",
    "p": [],
    "list": [
     "Melting: solid → liquid. Freezing: liquid → solid.",
     "Evaporating or boiling: liquid → gas. Condensing: gas → liquid.",
     "Subliming: solid → gas directly."
    ]
   },
   {
    "h": "Separating mixtures",
    "p": [],
    "list": [
     "Filtration: separates an insoluble solid from a liquid.",
     "Evaporation or crystallisation: gets a dissolved solid back from a solution.",
     "Simple distillation: gets the solvent (e.g. fresh water from seawater) by evaporating and condensing it.",
     "Fractional distillation: separates liquids with different boiling points.",
     "Chromatography: separates coloured substances."
    ]
   }
  ],
  "worked": {
   "title": "How can you get fresh water from seawater?",
   "steps": [
    "Heat the seawater so the water evaporates",
    "The salt stays behind",
    "Cool the water vapour so it condenses into fresh water — this is distillation"
   ],
   "answer": "Distillation"
  },
  "watch": [
   "Melting and freezing are opposites, and so are evaporating and condensing.",
   "Filtration cannot separate a dissolved solid — the solution just passes through."
  ],
  "checks": [
   {
    "id": "science-c3-c1",
    "type": "mcq",
    "prompt": "Which term describes the change of state from a liquid to a gas?",
    "options": [
     "Freezing",
     "Evaporating",
     "Melting",
     "Condensing"
    ],
    "correctIndex": 1,
    "explanation": "Liquid to gas is evaporating (or boiling)."
   },
   {
    "id": "science-c3-c2",
    "type": "mcq",
    "prompt": "Which process is used to obtain fresh water from seawater by evaporating the water and then condensing it?",
    "options": [
     "Chromatography",
     "Sieving",
     "Distillation",
     "Filtration"
    ],
    "correctIndex": 2,
    "explanation": "That is simple distillation."
   },
   {
    "id": "science-c3-c3",
    "type": "mcq",
    "prompt": "Which method separates an insoluble solid from a liquid?",
    "options": [
     "Crystallisation",
     "Distillation",
     "Chromatography",
     "Filtration"
    ],
    "correctIndex": 3,
    "explanation": "Filtration."
   },
   {
    "id": "science-c3-c4",
    "type": "mcq",
    "prompt": "In which state of matter are the particles far apart and moving quickly in random directions?",
    "options": [
     "Liquid",
     "Solid",
     "Gas",
     "All three"
    ],
    "correctIndex": 2,
    "explanation": "Gas."
   }
  ],
  "keywords": [
   "state",
   "solid",
   "liquid",
   "gas",
   "melting",
   "evaporat",
   "condens",
   "distillation",
   "filtration",
   "separat",
   "mixture",
   "chromatography"
  ]
 },
 {
  "id": "science-c4",
  "subject": "science",
  "topicId": "science-2",
  "title": "Chemical equations and conservation of mass",
  "why": "You need to write and balance equations and to explain why mass does not change in a reaction.",
  "sections": [
   {
    "h": "Word and symbol equations",
    "p": [],
    "list": [
     "Word equation: magnesium + oxygen → magnesium oxide.",
     "Symbol equation: 2Mg + O₂ → 2MgO.",
     "Some elements exist as pairs of atoms (diatomic): H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂."
    ]
   },
   {
    "h": "Balancing",
    "p": [
     "There must be the same number of each type of atom on both sides. Only change the big numbers in front of formulae, never the small numbers inside them."
    ],
    "list": [
     "H₂ + O₂ → H₂O is not balanced (2 oxygen atoms on the left, 1 on the right).",
     "2H₂ + O₂ → 2H₂O is balanced (4 H and 2 O on each side)."
    ]
   },
   {
    "h": "Conservation of mass",
    "p": [
     "Atoms are not made or destroyed in a chemical reaction; they are rearranged. So the total mass of the reactants equals the total mass of the products."
    ],
    "list": [
     "If a gas escapes from an open container, the mass seems to go down."
    ]
   }
  ],
  "worked": {
   "title": "Balance: __Mg + O₂ → 2MgO",
   "steps": [
    "Right side: 2 magnesium atoms and 2 oxygen atoms",
    "Left side has 2 oxygen atoms already",
    "So we need 2 magnesium atoms: 2Mg"
   ],
   "answer": "2"
  },
  "watch": [
   "Balance by changing the numbers in front, not the small numbers in formulae.",
   "Mass appears to drop only if a gas escapes."
  ],
  "checks": [
   {
    "id": "science-c4-c1",
    "type": "short",
    "prompt": "Balance this equation by finding the missing number: __Mg + O₂ → 2MgO. What number goes in the blank?",
    "accept": [
     "2"
    ],
    "explanation": "There are 2 Mg atoms on the right, so 2Mg on the left."
   },
   {
    "id": "science-c4-c2",
    "type": "mcq",
    "prompt": "According to the law of conservation of mass, what happens to atoms in a chemical reaction?",
    "options": [
     "They are rearranged, with none made or lost",
     "They turn into energy",
     "New atoms are created",
     "They are destroyed"
    ],
    "correctIndex": 0,
    "explanation": "Atoms are rearranged, not created or destroyed."
   },
   {
    "id": "science-c4-c3",
    "type": "short",
    "prompt": "Balance this equation: __H₂ + O₂ → 2H₂O. What number goes in the blank?",
    "accept": [
     "2"
    ],
    "explanation": "2H₂O has 4 H atoms, so we need 2H₂ on the left."
   },
   {
    "id": "science-c4-c4",
    "type": "mcq",
    "prompt": "Which of these exists as a diatomic molecule?",
    "options": [
     "Helium",
     "Oxygen (O₂)",
     "Iron",
     "Carbon"
    ],
    "correctIndex": 1,
    "explanation": "Oxygen exists as O₂. Helium is a single atom; iron and carbon are not diatomic."
   }
  ],
  "keywords": [
   "equation",
   "balance",
   "word equation",
   "conservation",
   "reactant",
   "product",
   "diatomic",
   "o2",
   "mass"
  ]
 },
 {
  "id": "science-c5",
  "subject": "science",
  "topicId": "science-2",
  "title": "Rates of reaction and energy changes",
  "why": "Some reactions are fast and some are slow, and reactions can release or take in heat.",
  "sections": [
   {
    "h": "What affects the rate",
    "p": [],
    "list": [
     "A higher temperature, a higher concentration, a larger surface area (smaller pieces or powder) and a catalyst all speed a reaction up.",
     "A catalyst speeds up a reaction and is not used up.",
     "Reactions go faster because particles collide more often and with more energy."
    ]
   },
   {
    "h": "Reading rate graphs",
    "p": [],
    "list": [
     "A steeper line means a faster reaction.",
     "The line goes flat when one reactant is used up and the reaction has finished."
    ]
   },
   {
    "h": "Energy changes",
    "p": [],
    "list": [
     "Exothermic: releases heat to the surroundings, so the temperature rises (burning, neutralisation).",
     "Endothermic: takes in heat from the surroundings, so the temperature falls."
    ]
   }
  ],
  "worked": {
   "title": "On a graph of gas volume against time, acid X gives a steeper line than acid Y. What does that tell you?",
   "steps": [
    "A steeper line means more gas per second",
    "So the reaction with acid X is faster"
   ],
   "answer": "The reaction with acid X is faster"
  },
  "watch": [
   "A catalyst is not used up in the reaction.",
   "Exothermic = heat exits (temperature rises); endothermic = heat enters (temperature falls)."
  ],
  "checks": [
   {
    "id": "science-c5-c1",
    "type": "short",
    "prompt": "What term describes a substance that speeds up a reaction without being used up itself?",
    "accept": [
     "catalyst"
    ],
    "explanation": "A catalyst speeds up a reaction and is not used up."
   },
   {
    "id": "science-c5-c2",
    "type": "mcq",
    "prompt": "Which change would make a reaction between marble chips and acid SLOWER?",
    "options": [
     "Using smaller marble chips",
     "Lowering the temperature",
     "Adding a catalyst",
     "Using more concentrated acid"
    ],
    "correctIndex": 1,
    "explanation": "Lower temperature means fewer, less energetic collisions."
   },
   {
    "id": "science-c5-c3",
    "type": "mcq",
    "prompt": "A reaction releases heat to the surroundings and the temperature rises. What is this called?",
    "options": [
     "Exothermic",
     "Neutralisation",
     "Endothermic",
     "Reduction"
    ],
    "correctIndex": 0,
    "explanation": "Exothermic reactions release heat."
   },
   {
    "id": "science-c5-c4",
    "type": "mcq",
    "prompt": "On a graph of gas volume against time for two reactions, which one is faster?",
    "options": [
     "They are always the same",
     "The one with the steeper line",
     "The one that finishes with more gas",
     "The one with the flatter line"
    ],
    "correctIndex": 1,
    "explanation": "A steeper line means more gas per second, so a faster reaction."
   }
  ],
  "keywords": [
   "rate",
   "catalyst",
   "temperature",
   "concentration",
   "surface area",
   "exothermic",
   "endothermic",
   "collision",
   "speed",
   "graph",
   "react"
  ]
 },
 {
  "id": "science-c6",
  "subject": "science",
  "topicId": "science-2",
  "title": "The atmosphere and climate change",
  "why": "You need to know what air is made of and how human activity is changing the atmosphere.",
  "sections": [
   {
    "h": "What air is made of",
    "p": [],
    "list": [
     "About 78% nitrogen.",
     "About 21% oxygen.",
     "About 0.04% carbon dioxide, plus small amounts of argon and water vapour."
    ]
   },
   {
    "h": "The greenhouse effect",
    "p": [
     "Greenhouse gases such as carbon dioxide and methane trap heat in the atmosphere."
    ],
    "list": [
     "Burning fossil fuels and deforestation add carbon dioxide; farming adds methane.",
     "More greenhouse gases lead to global warming and climate change: rising sea levels and more extreme weather."
    ]
   },
   {
    "h": "Other pollutants from burning fuels",
    "p": [],
    "list": [
     "Sulfur dioxide causes acid rain.",
     "Carbon monoxide is a toxic gas.",
     "Soot (particulates) harms breathing and dirties buildings."
    ]
   }
  ],
  "worked": {
   "title": "In 100 dm³ of air, roughly how much is nitrogen?",
   "steps": [
    "Air is about 78% nitrogen",
    "78% of 100 dm³ = 78 dm³"
   ],
   "answer": "About 78 dm³"
  },
  "watch": [
   "Nitrogen is the biggest gas in air, not oxygen.",
   "Carbon dioxide is a very small part of air but has a big effect on climate."
  ],
  "checks": [
   {
    "id": "science-c6-c1",
    "type": "short",
    "prompt": "What is the name of the gas that makes up about 78% of the Earth's atmosphere?",
    "accept": [
     "nitrogen"
    ],
    "explanation": "Air is about 78% nitrogen."
   },
   {
    "id": "science-c6-c2",
    "type": "mcq",
    "prompt": "Which gas, released by burning fossil fuels, is most associated with the greenhouse effect and climate change?",
    "options": [
     "Oxygen",
     "Nitrogen",
     "Carbon dioxide",
     "Helium"
    ],
    "correctIndex": 2,
    "explanation": "Carbon dioxide is the main greenhouse gas from burning fossil fuels."
   },
   {
    "id": "science-c6-c3",
    "type": "mcq",
    "prompt": "Approximately what percentage of air is oxygen?",
    "options": [
     "78%",
     "5%",
     "21%",
     "50%"
    ],
    "correctIndex": 2,
    "explanation": "About 21%."
   },
   {
    "id": "science-c6-c4",
    "type": "mcq",
    "prompt": "Which gas from burning fossil fuels causes acid rain?",
    "options": [
     "Sulfur dioxide",
     "Oxygen",
     "Helium",
     "Nitrogen"
    ],
    "correctIndex": 0,
    "explanation": "Sulfur dioxide dissolves in rainwater to make acid rain."
   }
  ],
  "keywords": [
   "atmosphere",
   "greenhouse",
   "climate",
   "nitrogen",
   "carbon dioxide",
   "fossil fuel",
   "global warming",
   "acid rain",
   "air"
  ]
 },
 {
  "id": "science-c7",
  "subject": "science",
  "topicId": "science-2",
  "title": "Ions, formulae of ionic compounds and flame tests",
  "why": "You need to work out formulae from ion charges, recognise flame test colours and explain conduction.",
  "sections": [
   {
    "h": "Ion charges",
    "p": [
     "Ions of elements in groups 1, 2 and 3 have charges of +1, +2 and +3. Ions in groups 5, 6 and 7 have charges of −3, −2 and −1."
    ],
    "list": []
   },
   {
    "h": "Formulae of ionic compounds",
    "p": [
     "The total positive charge must equal the total negative charge."
    ],
    "list": [
     "Na⁺ and Cl⁻ → NaCl.",
     "Mg²⁺ and Cl⁻ need two chlorides → MgCl₂.",
     "Mg²⁺ and O²⁻ → MgO. Na⁺ and O²⁻ → Na₂O."
    ]
   },
   {
    "h": "Flame tests",
    "p": [
     "The colour comes from the metal ion."
    ],
    "list": [
     "Lithium: crimson red. Sodium: yellow. Potassium: lilac. Calcium: orange-red. Copper: blue-green."
    ]
   },
   {
    "h": "Conduction",
    "p": [],
    "list": [
     "Ionic compounds conduct when molten or dissolved because the ions are free to move (not as solids).",
     "Simple covalent substances do not conduct because they have no charged particles that can move."
    ]
   }
  ],
  "worked": {
   "title": "Magnesium chloride contains Mg²⁺ and Cl⁻ ions. What is its formula?",
   "steps": [
    "One Mg²⁺ has a charge of +2",
    "Each Cl⁻ has −1, so two are needed",
    "MgCl₂"
   ],
   "answer": "MgCl₂"
  },
  "watch": [
   "Balance the charges, do not just write the symbols side by side.",
   "Ionic compounds do not conduct as solids."
  ],
  "checks": [
   {
    "id": "science-c7-c1",
    "type": "mcq",
    "prompt": "Sodium chloride contains the ions Na⁺ and Cl⁻. What is its formula?",
    "options": [
     "Na₂Cl₂",
     "NaCl",
     "Na₂Cl",
     "NaCl₂"
    ],
    "correctIndex": 1,
    "explanation": "One +1 and one −1 balance."
   },
   {
    "id": "science-c7-c2",
    "type": "mcq",
    "prompt": "Magnesium chloride contains the ions Mg²⁺ and Cl⁻. What is its formula?",
    "options": [
     "MgCl",
     "Mg₂Cl₂",
     "MgCl₂",
     "Mg₂Cl"
    ],
    "correctIndex": 2,
    "explanation": "One Mg²⁺ needs two Cl⁻ to balance the charges."
   },
   {
    "id": "science-c7-c3",
    "type": "mcq",
    "prompt": "A flame test on sodium chloride gives which colour, because of the sodium ions?",
    "options": [
     "Yellow",
     "Crimson red",
     "Lilac",
     "Blue-green"
    ],
    "correctIndex": 0,
    "explanation": "Sodium gives a yellow flame."
   },
   {
    "id": "science-c7-c4",
    "type": "mcq",
    "prompt": "Why do simple covalent substances not conduct electricity?",
    "options": [
     "They have high melting points",
     "They are always gases",
     "They contain free electrons",
     "They contain no charged particles that are free to move"
    ],
    "correctIndex": 3,
    "explanation": "There are no free ions or electrons to carry charge."
   }
  ],
  "keywords": [
   "ion",
   "formula",
   "flame test",
   "sodium chloride",
   "magnesium chloride",
   "ionic",
   "conduct",
   "charge",
   "mg²",
   "na⁺",
   "cl⁻"
  ]
 },
 {
  "id": "science-c8",
  "subject": "science",
  "topicId": "science-2",
  "title": "Chromatography, indicators and preparing salts",
  "why": "Practical chemistry skills that appear in exams: calculating Rf, reading the pH colours and making pure crystals.",
  "sections": [
   {
    "h": "Chromatography",
    "p": [
     "A spot of each substance is put on a pencil line. A solvent moves up the paper and carries substances different distances."
    ],
    "list": [
     "A pure substance gives one spot; a mixture gives several.",
     "Rf = distance moved by the spot ÷ distance moved by the solvent front. Example: 4.2 ÷ 5.0 = 0.84. Rf has no units and is never more than 1."
    ]
   },
   {
    "h": "Universal indicator",
    "p": [],
    "list": [
     "Red: pH 1–2 (strong acid). Orange: 3–4. Yellow: 5–6.",
     "Green: pH 7 (neutral).",
     "Blue: 8–9. Purple: 10 and above (strong alkali)."
    ]
   },
   {
    "h": "Preparing a soluble salt",
    "p": [],
    "list": [
     "Add excess magnesium to warm dilute hydrochloric acid until no more fizzing (so all the acid has reacted).",
     "Filter off the unreacted magnesium.",
     "Heat the solution to evaporate some water, then leave to cool so crystals of magnesium chloride form. Dry them."
    ]
   }
  ],
  "worked": {
   "title": "In a chromatogram a spot moved 4.2 cm and the solvent front moved 5.0 cm. Find the Rf value",
   "steps": [
    "Rf = spot distance ÷ solvent front distance",
    "4.2 ÷ 5.0 = 0.84"
   ],
   "answer": "0.84"
  },
  "watch": [
   "Measure the spot from the start line, and use the same start line for the solvent front.",
   "Use excess of the solid so you know all the acid has been used up."
  ],
  "checks": [
   {
    "id": "science-c8-c1",
    "type": "short",
    "prompt": "In a chromatogram a spot moved 4.2 cm from the start line and the solvent front moved 5.0 cm. Calculate the Rf value.",
    "accept": [
     "0.84"
    ],
    "explanation": "4.2 ÷ 5.0 = 0.84."
   },
   {
    "id": "science-c8-c2",
    "type": "mcq",
    "prompt": "Universal indicator turns which colour in a neutral solution?",
    "options": [
     "Purple",
     "Green",
     "Yellow",
     "Red"
    ],
    "correctIndex": 1,
    "explanation": "Neutral (pH 7) is green."
   },
   {
    "id": "science-c8-c3",
    "type": "mcq",
    "prompt": "Why is excess magnesium used when making magnesium chloride from magnesium and hydrochloric acid?",
    "options": [
     "To make the solution acidic",
     "To make sure all the acid has reacted",
     "To make the crystals bigger",
     "To speed up the reaction"
    ],
    "correctIndex": 1,
    "explanation": "Excess metal ensures no acid is left."
   },
   {
    "id": "science-c8-c4",
    "type": "mcq",
    "prompt": "How is the leftover magnesium removed from the solution?",
    "options": [
     "Filtration",
     "Evaporation",
     "Chromatography",
     "Distillation"
    ],
    "correctIndex": 0,
    "explanation": "Filtration removes the insoluble solid."
   }
  ],
  "keywords": [
   "chromatogram",
   "chromatography",
   "solvent front",
   "rf",
   "indicator",
   "ph",
   "crystals",
   "salt",
   "universal",
   "prepared",
   "magnesium chloride",
   "magnesium ribbon"
  ],
  "alsoTopics": [
   "science-4"
  ]
 },
 {
  "id": "science-c9",
  "subject": "science",
  "topicId": "science-2",
  "title": "Alkanes, alkenes, polymers, cracking and fire",
  "why": "More about hydrocarbons: what they are called, how they are broken up and joined together, and what a fire needs.",
  "sections": [
   {
    "h": "Alkanes and alkenes",
    "p": [],
    "list": [
     "Alkanes have only single bonds: methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀.",
     "Alkenes have a C=C double bond: ethene C₂H₄, propene C₃H₆. Bromine water turns from orange to colourless with an alkene."
    ]
   },
   {
    "h": "Polymers",
    "p": [
     "In addition polymerisation many small ethene molecules (monomers) join together in a long chain, making poly(ethene). The C=C double bonds open up so the molecules can join."
    ],
    "list": []
   },
   {
    "h": "Cracking",
    "p": [
     "Long-chain hydrocarbons are broken into shorter, more useful alkanes and alkenes. It needs a high temperature and a catalyst."
    ],
    "list": []
   },
   {
    "h": "Fire",
    "p": [
     "A fire needs fuel, oxygen and heat. Foam puts a fire out by stopping oxygen reaching the fuel."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "An alkane has the formula C₂H₆. What is its name?",
   "steps": [
    "One carbon is methane, two is ethane, three is propane",
    "C₂H₆ has two carbons: ethane"
   ],
   "answer": "Ethane"
  },
  "watch": [
   "Alkenes have a double bond and are “unsaturated”; alkanes are “saturated”.",
   "Cracking makes SHORTER molecules."
  ],
  "checks": [
   {
    "id": "science-c9-c1",
    "type": "mcq",
    "prompt": "An alkane has the molecular formula C₂H₆. What is its name?",
    "options": [
     "Ethene",
     "Propane",
     "Methane",
     "Ethane"
    ],
    "correctIndex": 3,
    "explanation": "Two carbon atoms: ethane."
   },
   {
    "id": "science-c9-c2",
    "type": "mcq",
    "prompt": "Which TWO conditions are needed for cracking long-chain hydrocarbons?",
    "options": [
     "High pressure and light",
     "Low temperature and water",
     "High temperature and a catalyst",
     "Low temperature and a catalyst"
    ],
    "correctIndex": 2,
    "explanation": "Cracking needs heat and a catalyst."
   },
   {
    "id": "science-c9-c3",
    "type": "mcq",
    "prompt": "How does foam put out a car engine fire?",
    "options": [
     "It cools the engine to freezing",
     "It stops oxygen reaching the fuel",
     "It adds more heat",
     "It removes the fuel"
    ],
    "correctIndex": 1,
    "explanation": "It smothers the fire and cuts off the oxygen supply."
   },
   {
    "id": "science-c9-c4",
    "type": "mcq",
    "prompt": "When ethene molecules form poly(ethene), what happens to the C=C double bonds?",
    "options": [
     "They stay the same",
     "They open up so the molecules can join together",
     "They turn into single atoms",
     "They join to oxygen"
    ],
    "correctIndex": 1,
    "explanation": "The double bonds open to link the monomers into a chain."
   }
  ],
  "keywords": [
   "alkane",
   "alkene",
   "ethene",
   "polymer",
   "cracking",
   "c2h6",
   "foam",
   "fire",
   "double bond",
   "monomer",
   "poly",
   "carrier bag"
  ],
  "alsoTopics": [
   "science-4"
  ]
 },
 {
  "id": "science-c10",
  "subject": "science",
  "topicId": "science-2",
  "title": "Bond energies and energy calculations",
  "why": "Reactions involve breaking bonds (energy in) and making bonds (energy out).",
  "sections": [
   {
    "h": "The idea",
    "p": [],
    "list": [
     "Breaking bonds takes in energy (endothermic).",
     "Making bonds releases energy (exothermic).",
     "Overall energy change = energy released by making bonds − energy taken in by breaking bonds. If more is released than taken in, the reaction is exothermic."
    ]
   },
   {
    "h": "Example",
    "p": [
     "Each O–H bond that forms releases 464 kJ. A water molecule has two O–H bonds."
    ],
    "list": [
     "Forming one water molecule releases 2 × 464 = 928 kJ."
    ]
   }
  ],
  "worked": {
   "title": "Each O–H bond that forms releases 464 kJ. How much energy is released when one water molecule forms?",
   "steps": [
    "A water molecule has 2 O–H bonds",
    "2 × 464 = 928"
   ],
   "answer": "928 kJ"
  },
  "watch": [
   "Bond BREAKING takes energy IN; bond MAKING gives energy OUT.",
   "A reaction is exothermic when more energy is released than taken in."
  ],
  "checks": [
   {
    "id": "science-c10-c1",
    "type": "short",
    "prompt": "Each O–H bond that forms releases 464 kJ. How much energy is released when one water molecule (with two O–H bonds) forms? Give your answer in kJ.",
    "accept": [
     "928",
     "928kj"
    ],
    "explanation": "2 × 464 = 928 kJ."
   },
   {
    "id": "science-c10-c2",
    "type": "mcq",
    "prompt": "What kind of change is breaking chemical bonds?",
    "options": [
     "Endothermic — it takes in energy",
     "Neither",
     "Both at once",
     "Exothermic — it releases energy"
    ],
    "correctIndex": 0,
    "explanation": "Breaking bonds needs energy: endothermic."
   },
   {
    "id": "science-c10-c3",
    "type": "mcq",
    "prompt": "A reaction releases more energy when bonds form than it takes in to break bonds. Overall the reaction is…",
    "options": [
     "endothermic",
     "exothermic",
     "reversible only",
     "neutral"
    ],
    "correctIndex": 1,
    "explanation": "More released than taken in is exothermic."
   },
   {
    "id": "science-c10-c4",
    "type": "short",
    "prompt": "Breaking bonds takes in 1000 kJ and making new bonds releases 1300 kJ. How much more energy (in kJ) is released than taken in?",
    "accept": [
     "300",
     "300kj"
    ],
    "explanation": "1300 − 1000 = 300 kJ."
   }
  ],
  "keywords": [
   "bond",
   "kj",
   "energy released",
   "bond energy",
   "o-h",
   "o–h",
   "breaking"
  ]
 },
 {
  "id": "science-p1",
  "subject": "science",
  "topicId": "science-3",
  "title": "Speed, distance-time graphs and velocity-time graphs",
  "why": "Motion questions use speed = distance ÷ time and ask you to read the shape of a graph.",
  "sections": [
   {
    "h": "Speed",
    "p": [],
    "list": [
     "Speed = distance ÷ time (metres per second, m/s).",
     "A car travelling 100 m in 20 s has a speed of 100 ÷ 20 = 5 m/s.",
     "Acceleration = change in velocity ÷ time (m/s²)."
    ]
   },
   {
    "h": "Distance-time graphs",
    "p": [],
    "list": [
     "The gradient (steepness) is the speed.",
     "A horizontal line means the object is stationary.",
     "A straight sloping line means constant speed; a steeper line means faster.",
     "A line going back down means it is returning."
    ]
   },
   {
    "h": "Velocity-time graphs",
    "p": [],
    "list": [
     "The gradient is the acceleration.",
     "A horizontal line means constant speed.",
     "The area under the line is the distance travelled."
    ]
   }
  ],
  "worked": {
   "title": "A car travels 100 m in 20 s. What is its speed?",
   "steps": [
    "Speed = distance ÷ time",
    "100 ÷ 20 = 5"
   ],
   "answer": "5 m/s"
  },
  "watch": [
   "Distance-time graph: flat = stopped. Velocity-time graph: flat = constant speed.",
   "Use the right units: m/s for speed, m/s² for acceleration."
  ],
  "checks": [
   {
    "id": "science-p1-c1",
    "type": "short",
    "prompt": "Calculate the speed of a car that travels 100 m in 20 seconds. Give your answer in m/s.",
    "accept": [
     "5",
     "5m/s"
    ],
    "explanation": "Speed = distance ÷ time = 100 ÷ 20 = 5 m/s."
   },
   {
    "id": "science-p1-c2",
    "type": "mcq",
    "prompt": "On a distance-time graph, what does the gradient (slope) of the line represent?",
    "options": [
     "Time",
     "Distance",
     "Speed",
     "Acceleration"
    ],
    "correctIndex": 2,
    "explanation": "Gradient of a distance-time graph = speed."
   },
   {
    "id": "science-p1-c3",
    "type": "mcq",
    "prompt": "On a distance-time graph, a horizontal line means the object is…",
    "options": [
     "returning to the start",
     "moving at constant speed",
     "stationary",
     "accelerating"
    ],
    "correctIndex": 2,
    "explanation": "The distance is not changing, so it is stationary."
   },
   {
    "id": "science-p1-c4",
    "type": "short",
    "prompt": "A car accelerates from 0 to 20 m/s in 5 seconds. What is its acceleration in m/s²?",
    "accept": [
     "4",
     "4m/s²"
    ],
    "explanation": "Acceleration = change in velocity ÷ time = 20 ÷ 5 = 4 m/s²."
   }
  ],
  "keywords": [
   "speed",
   "distance-time",
   "velocity-time",
   "gradient",
   "acceleration",
   "m/s",
   "graph",
   "journey"
  ]
 },
 {
  "id": "science-p2",
  "subject": "science",
  "topicId": "science-3",
  "title": "Forces, Newton's laws and weight",
  "why": "Forces questions use resultant force, F = m × a and weight = m × g, plus Newton's third law.",
  "sections": [
   {
    "h": "Resultant force",
    "p": [
     "Add forces acting the same way; subtract forces acting in opposite directions."
    ],
    "list": [
     "10 N to the right and 4 N to the left: resultant = 6 N to the right.",
     "Balanced forces (resultant zero): a stationary object stays still and a moving object keeps a constant velocity."
    ]
   },
   {
    "h": "Force, mass and acceleration",
    "p": [
     "Force = mass × acceleration (N = kg × m/s²)."
    ],
    "list": [
     "To accelerate a 10 kg mass at 2 m/s² needs 10 × 2 = 20 N."
    ]
   },
   {
    "h": "Weight",
    "p": [
     "Weight = mass × gravitational field strength (g = 10 N/kg on Earth in these questions). Weight is a force, measured in newtons; mass is measured in kilograms."
    ],
    "list": [
     "A 5 kg object weighs 5 × 10 = 50 N."
    ]
   },
   {
    "h": "Newton's third law",
    "p": [
     "If object A exerts a force on object B, then B exerts an equal and opposite force on A. The two forces act on different objects."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "What force is needed to accelerate a 10 kg mass at 2 m/s²?",
   "steps": [
    "Force = mass × acceleration",
    "10 × 2 = 20"
   ],
   "answer": "20 N"
  },
  "watch": [
   "Mass is in kg and does not change; weight is in N and depends on gravity.",
   "Newton's third-law pairs act on DIFFERENT objects."
  ],
  "checks": [
   {
    "id": "science-p2-c1",
    "type": "short",
    "prompt": "Using force = mass × acceleration, find the force needed to accelerate a 10 kg mass at 2 m/s². Give your answer in newtons.",
    "accept": [
     "20",
     "20n"
    ],
    "explanation": "F = ma = 10 × 2 = 20 N."
   },
   {
    "id": "science-p2-c2",
    "type": "short",
    "prompt": "Calculate the weight of a 5 kg object on Earth, using g = 10 N/kg. Give your answer in newtons.",
    "accept": [
     "50",
     "50n"
    ],
    "explanation": "Weight = mass × g = 5 × 10 = 50 N."
   },
   {
    "id": "science-p2-c3",
    "type": "mcq",
    "prompt": "Two forces of 10 N and 4 N act on an object in opposite directions. What is the resultant force?",
    "options": [
     "40 N",
     "6 N",
     "14 N",
     "2.5 N"
    ],
    "correctIndex": 1,
    "explanation": "Subtract when forces are opposite: 10 − 4 = 6 N."
   },
   {
    "id": "science-p2-c4",
    "type": "mcq",
    "prompt": "According to Newton's third law, if body A exerts a force on body B, what happens?",
    "options": [
     "B exerts an equal and opposite force on A",
     "B exerts a bigger force on A",
     "Nothing",
     "A stops moving"
    ],
    "correctIndex": 0,
    "explanation": "The forces are equal in size and opposite in direction, acting on different bodies."
   }
  ],
  "keywords": [
   "force",
   "newton",
   "resultant",
   "weight",
   "mass",
   "acceleration",
   "newton's",
   "third law",
   "f = m",
   "gravitational"
  ]
 },
 {
  "id": "science-p3",
  "subject": "science",
  "topicId": "science-3",
  "title": "Stopping distances and terminal velocity",
  "why": "You need to know what makes up a stopping distance and why a falling object reaches a top speed.",
  "sections": [
   {
    "h": "Stopping distance",
    "p": [
     "Stopping distance = thinking distance + braking distance."
    ],
    "list": [
     "Thinking distance goes up with speed, tiredness, alcohol, drugs and distractions.",
     "Braking distance goes up with speed, wet or icy roads, worn brakes or tyres, and a heavier load."
    ]
   },
   {
    "h": "Terminal velocity",
    "p": [
     "A falling object speeds up, but as it goes faster the air resistance on it increases."
    ],
    "list": [
     "When air resistance equals its weight, the resultant force is zero, so it stops accelerating and falls at a constant speed: the terminal velocity.",
     "A parachute increases air resistance, so the terminal velocity is lower."
    ]
   }
  ],
  "worked": {
   "title": "Thinking distance is 12 m and braking distance is 24 m. What is the stopping distance?",
   "steps": [
    "Stopping distance = thinking distance + braking distance",
    "12 + 24 = 36"
   ],
   "answer": "36 m"
  },
  "watch": [
   "Wet roads and worn tyres affect BRAKING distance; tiredness and distractions affect THINKING distance.",
   "At terminal velocity the object is not accelerating, but it is still moving."
  ],
  "checks": [
   {
    "id": "science-p3-c1",
    "type": "short",
    "prompt": "What term describes the constant speed a falling object reaches once air resistance balances its weight?",
    "accept": [
     "terminal velocity",
     "terminal speed"
    ],
    "explanation": "This is terminal velocity."
   },
   {
    "id": "science-p3-c2",
    "type": "mcq",
    "prompt": "Which factor increases the THINKING distance of a driver?",
    "options": [
     "A heavy load",
     "Worn tyres",
     "A wet road",
     "Tiredness"
    ],
    "correctIndex": 3,
    "explanation": "Tiredness slows reaction time, so the driver travels further before braking."
   },
   {
    "id": "science-p3-c3",
    "type": "mcq",
    "prompt": "A skydiver is falling at terminal velocity. Which statement is true?",
    "options": [
     "Weight equals air resistance",
     "Air resistance is greater than weight",
     "There is no air resistance",
     "Weight is greater than air resistance"
    ],
    "correctIndex": 0,
    "explanation": "The forces are balanced, so the resultant force is zero."
   },
   {
    "id": "science-p3-c4",
    "type": "short",
    "prompt": "A car's thinking distance is 15 m and its braking distance is 30 m. What is its stopping distance in metres?",
    "accept": [
     "45",
     "45m"
    ],
    "explanation": "15 + 30 = 45 m."
   }
  ],
  "keywords": [
   "stopping distance",
   "thinking distance",
   "braking distance",
   "terminal velocity",
   "air resistance",
   "skydiver",
   "falling",
   "reaction time"
  ]
 },
 {
  "id": "science-p4",
  "subject": "science",
  "topicId": "science-3",
  "title": "Energy stores, efficiency and energy resources",
  "why": "Energy questions ask which store energy is in, how efficient something is, and what energy resources are renewable.",
  "sections": [
   {
    "h": "Energy stores",
    "p": [],
    "list": [
     "Kinetic (moving), gravitational potential (raised up), chemical, elastic, thermal.",
     "Energy is transferred, never used up: the total stays the same (conservation of energy).",
     "Most wasted energy ends up as thermal energy in the surroundings."
    ]
   },
   {
    "h": "Efficiency",
    "p": [
     "Efficiency = useful energy transferred ÷ total energy supplied × 100%."
    ],
    "list": [
     "A device supplied with 200 J that transfers 40 J usefully: 40 ÷ 200 × 100 = 20%."
    ]
   },
   {
    "h": "Energy resources",
    "p": [],
    "list": [
     "Renewable: solar, wind, hydroelectric, tidal, geothermal, biofuels.",
     "Non-renewable: coal, oil, natural gas (fossil fuels) and nuclear fuel."
    ]
   }
  ],
  "worked": {
   "title": "A device is supplied with 200 J and transfers 50 J usefully. What is its efficiency?",
   "steps": [
    "Efficiency = 50 ÷ 200",
    "= 0.25",
    "× 100 = 25%"
   ],
   "answer": "25%"
  },
  "watch": [
   "Efficiency can never be more than 100%.",
   "Renewable resources will not run out; non-renewable ones will."
  ],
  "checks": [
   {
    "id": "science-p4-c1",
    "type": "short",
    "prompt": "A device is supplied with 200 J of energy and 50 J is useful. What is its efficiency as a percentage?",
    "accept": [
     "25",
     "25%"
    ],
    "explanation": "50 ÷ 200 × 100 = 25%."
   },
   {
    "id": "science-p4-c2",
    "type": "mcq",
    "prompt": "Which energy store increases when an object is lifted higher above the ground?",
    "options": [
     "Gravitational potential",
     "Thermal only",
     "Chemical",
     "Kinetic"
    ],
    "correctIndex": 0,
    "explanation": "Gravitational potential energy increases with height."
   },
   {
    "id": "science-p4-c3",
    "type": "mcq",
    "prompt": "Which of these is a renewable energy resource used to generate electricity?",
    "options": [
     "Oil",
     "Natural gas",
     "Coal",
     "Wind"
    ],
    "correctIndex": 3,
    "explanation": "Wind will not run out."
   },
   {
    "id": "science-p4-c4",
    "type": "mcq",
    "prompt": "Where does most wasted energy usually end up?",
    "options": [
     "As thermal energy in the surroundings",
     "In a chemical store",
     "As electricity",
     "As light in space"
    ],
    "correctIndex": 0,
    "explanation": "Wasted energy is usually transferred as heat to the surroundings."
   }
  ],
  "keywords": [
   "energy",
   "efficiency",
   "renewable",
   "non-renewable",
   "store",
   "kinetic",
   "potential",
   "wasted",
   "fossil",
   "transfer"
  ]
 },
 {
  "id": "science-p5",
  "subject": "science",
  "topicId": "science-3",
  "title": "Waves and the electromagnetic spectrum",
  "why": "You need the wave vocabulary, how to use wave speed = frequency × wavelength, and the order of the electromagnetic spectrum.",
  "sections": [
   {
    "h": "Wave features",
    "p": [],
    "list": [
     "Amplitude: the maximum displacement of a wave from its rest position.",
     "Wavelength: the distance from one point on a wave to the same point on the next (peak to peak).",
     "Frequency: the number of waves passing a point each second, in hertz (Hz).",
     "Wave speed = frequency × wavelength (m/s = Hz × m)."
    ]
   },
   {
    "h": "Two kinds of wave",
    "p": [],
    "list": [
     "Transverse waves (light, water ripples): the vibrations are at right angles to the direction of travel.",
     "Longitudinal waves (sound): the vibrations are parallel to the direction of travel.",
     "Sound needs a medium (particles) and cannot travel through a vacuum. Electromagnetic waves can."
    ]
   },
   {
    "h": "The electromagnetic spectrum",
    "p": [
     "From lowest frequency (longest wavelength) to highest:"
    ],
    "list": [
     "Radio, microwave, infrared, visible light, ultraviolet, X-ray, gamma.",
     "Gamma rays have the smallest wavelength, the highest frequency and the most energy."
    ]
   }
  ],
  "worked": {
   "title": "A wave has frequency 5 Hz and wavelength 2 m. What is its speed?",
   "steps": [
    "Speed = frequency × wavelength",
    "5 × 2 = 10"
   ],
   "answer": "10 m/s"
  },
  "watch": [
   "Amplitude is measured from the rest position, not from the bottom of a trough to the top of a peak.",
   "Higher frequency means shorter wavelength."
  ],
  "checks": [
   {
    "id": "science-p5-c1",
    "type": "mcq",
    "prompt": "Which of these wave types needs particles to travel through and cannot travel through a vacuum?",
    "options": [
     "Radio waves",
     "Light",
     "Sound",
     "X-rays"
    ],
    "correctIndex": 2,
    "explanation": "Sound is a longitudinal wave that needs a medium."
   },
   {
    "id": "science-p5-c2",
    "type": "mcq",
    "prompt": "Which region of the electromagnetic spectrum has the smallest wavelength and highest frequency?",
    "options": [
     "Infrared",
     "Radio waves",
     "Gamma rays",
     "Ultraviolet"
    ],
    "correctIndex": 2,
    "explanation": "Gamma rays."
   },
   {
    "id": "science-p5-c3",
    "type": "short",
    "prompt": "A wave has a frequency of 5 Hz and a wavelength of 2 m. What is its speed in m/s?",
    "accept": [
     "10",
     "10m/s"
    ],
    "explanation": "Speed = frequency × wavelength = 5 × 2 = 10 m/s."
   },
   {
    "id": "science-p5-c4",
    "type": "short",
    "prompt": "What term describes the maximum displacement of a wave from its undisturbed (rest) position?",
    "accept": [
     "amplitude"
    ],
    "explanation": "That is the amplitude."
   }
  ],
  "keywords": [
   "wave",
   "amplitude",
   "wavelength",
   "frequency",
   "electromagnetic",
   "spectrum",
   "sound",
   "transverse",
   "longitudinal",
   "gamma",
   "radio"
  ]
 },
 {
  "id": "science-p6",
  "subject": "science",
  "topicId": "science-3",
  "title": "The Solar System",
  "why": "You need to know how the Solar System formed and what keeps it together.",
  "sections": [
   {
    "h": "How it formed",
    "p": [
     "The Sun and planets formed from a huge cloud of gas and dust. Gravity pulled the material together; most of it made the Sun, and the rest formed the planets."
    ],
    "list": []
   },
   {
    "h": "What holds it together",
    "p": [],
    "list": [
     "Gravity keeps the planets in orbit around the Sun, and moons in orbit around planets.",
     "The planets in order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."
    ]
   },
   {
    "h": "Types of planet",
    "p": [],
    "list": [
     "Mercury, Venus, Earth and Mars are small and rocky.",
     "Jupiter, Saturn, Uranus and Neptune are large, made mostly of gas and ice."
    ]
   },
   {
    "h": "Telescopes",
    "p": [
     "Space-based telescopes are above the atmosphere, so they avoid its blurring and absorption and can detect wavelengths that the atmosphere blocks. Ground-based telescopes are cheaper and easier to repair."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "What caused the Sun and planets to form?",
   "steps": [
    "A cloud of gas and dust existed",
    "Gravity pulled the material together",
    "Most of it formed the Sun; the rest formed the planets"
   ],
   "answer": "Gravity pulling together a cloud of gas and dust"
  },
  "watch": [
   "Gravity is the force keeping planets in orbit.",
   "Do not mix up the Solar System (our Sun and its planets) with the Universe."
  ],
  "checks": [
   {
    "id": "science-p6-c1",
    "type": "mcq",
    "prompt": "According to current understanding, what caused the Sun and planets to form?",
    "options": [
     "A huge explosion of the Sun",
     "Planets colliding at random",
     "Gravity pulling together a cloud of gas and dust",
     "Magnetic fields alone"
    ],
    "correctIndex": 2,
    "explanation": "Gravity pulled a cloud of gas and dust together."
   },
   {
    "id": "science-p6-c2",
    "type": "mcq",
    "prompt": "What keeps the planets in orbit around the Sun?",
    "options": [
     "Friction",
     "Air resistance",
     "Magnetism",
     "Gravity"
    ],
    "correctIndex": 3,
    "explanation": "The Sun's gravity keeps planets in orbit."
   },
   {
    "id": "science-p6-c3",
    "type": "mcq",
    "prompt": "Which planet is closest to the Sun?",
    "options": [
     "Mercury",
     "Venus",
     "Earth",
     "Mars"
    ],
    "correctIndex": 0,
    "explanation": "Mercury."
   },
   {
    "id": "science-p6-c4",
    "type": "mcq",
    "prompt": "Which of these planets are small and rocky?",
    "options": [
     "Jupiter and Saturn",
     "Mercury and Mars",
     "Saturn and Neptune",
     "Uranus and Neptune"
    ],
    "correctIndex": 1,
    "explanation": "Mercury, Venus, Earth and Mars are the rocky planets."
   },
   {
    "id": "science-p6-c5",
    "type": "mcq",
    "prompt": "Which is an advantage of a space-based telescope compared with a ground-based one?",
    "options": [
     "It avoids the blurring and absorption caused by the atmosphere",
     "It can be larger",
     "It is easier to repair",
     "It is cheaper to build"
    ],
    "correctIndex": 0,
    "explanation": "Above the atmosphere the images are clearer and more wavelengths can be detected."
   }
  ],
  "keywords": [
   "solar system",
   "planet",
   "sun",
   "gravity",
   "orbit",
   "universe",
   "gas and dust",
   "formed",
   "telescope",
   "astronomers",
   "space-based"
  ]
 },
 {
  "id": "science-p7",
  "subject": "science",
  "topicId": "science-3",
  "title": "Colour of light, filters and total internal reflection",
  "why": "How we see colour, what filters do, and when light is totally reflected inside glass.",
  "sections": [
   {
    "h": "Seeing colour",
    "p": [],
    "list": [
     "White light is a mixture of colours.",
     "A green leaf looks green because it reflects green light and absorbs the other colours.",
     "White surfaces reflect all colours; black surfaces absorb all colours.",
     "A white screen reflects whatever colour light shines on it."
    ]
   },
   {
    "h": "Filters",
    "p": [
     "A filter lets its own colour(s) through and absorbs the rest."
    ],
    "list": [
     "White light through a red filter: only red light comes out.",
     "A yellow filter lets red and green through (it blocks blue). Red and green light together look yellow."
    ]
   },
   {
    "h": "Total internal reflection",
    "p": [
     "When light travelling in a denser material such as glass hits the boundary with air at an angle greater than the critical angle, all of the light is reflected back inside."
    ],
    "list": [
     "This is how optical fibres carry light signals."
    ]
   }
  ],
  "worked": {
   "title": "White light shines through a red filter. What colour comes out?",
   "steps": [
    "The red filter lets red light through",
    "It absorbs the other colours"
   ],
   "answer": "Red"
  },
  "watch": [
   "A coloured object reflects its own colour and absorbs the others.",
   "Total internal reflection needs light to go from a denser material to a less dense one."
  ],
  "checks": [
   {
    "id": "science-p7-c1",
    "type": "mcq",
    "prompt": "A green leaf appears green in white light because it…",
    "options": [
     "reflects green light and absorbs the other colours",
     "reflects all colours",
     "absorbs green light",
     "emits green light"
    ],
    "correctIndex": 0,
    "explanation": "It reflects green and absorbs the rest."
   },
   {
    "id": "science-p7-c2",
    "type": "mcq",
    "prompt": "White light passes through a red filter. What comes out?",
    "options": [
     "No light",
     "Red light",
     "White light",
     "Blue light"
    ],
    "correctIndex": 1,
    "explanation": "The filter passes only red light."
   },
   {
    "id": "science-p7-c3",
    "type": "mcq",
    "prompt": "A yellow filter lets red and green light through. What colour does a white screen appear when this light shines on it?",
    "options": [
     "Blue",
     "White",
     "Black",
     "Yellow"
    ],
    "correctIndex": 3,
    "explanation": "A mixture of red and green looks yellow."
   },
   {
    "id": "science-p7-c4",
    "type": "mcq",
    "prompt": "In which situation can total internal reflection occur?",
    "options": [
     "Light passing straight through a lens",
     "Light hitting a black surface",
     "Light in glass hitting a glass–air boundary at an angle greater than the critical angle",
     "Light going from air into glass"
    ],
    "correctIndex": 2,
    "explanation": "It happens only inside the denser material, above the critical angle."
   }
  ],
  "keywords": [
   "colour",
   "filter",
   "appears green",
   "white light",
   "screen",
   "total internal reflection",
   "optical fibre",
   "critical angle",
   "reflect",
   "absorb"
  ]
 },
 {
  "id": "science-d1",
  "subject": "science",
  "topicId": "science-4",
  "title": "Cell division: mitosis and meiosis",
  "why": "Cells divide in two different ways for two different jobs.",
  "sections": [
   {
    "h": "Chromosomes",
    "p": [
     "Human body cells have 46 chromosomes (23 pairs) in the nucleus. Genes are found on chromosomes."
    ],
    "list": []
   },
   {
    "h": "Mitosis",
    "p": [],
    "list": [
     "The cell copies its DNA, then divides once.",
     "It makes 2 genetically identical body cells.",
     "It is used for growth, repair and asexual reproduction."
    ]
   },
   {
    "h": "Meiosis",
    "p": [],
    "list": [
     "Makes 4 genetically different gametes (sex cells: sperm and egg).",
     "Each gamete has half the number of chromosomes: 23.",
     "At fertilisation the 23 + 23 chromosomes join to make 46 again."
    ]
   }
  ],
  "worked": {
   "title": "A sperm cell (23 chromosomes) fertilises an egg cell (23 chromosomes). How many chromosomes does the new cell have?",
   "steps": [
    "23 + 23 = 46"
   ],
   "answer": "46"
  },
  "watch": [
   "Mitosis makes identical cells; meiosis makes different cells with half the chromosomes.",
   "Gametes have half the chromosome number so that fertilisation restores the full number."
  ],
  "checks": [
   {
    "id": "science-d1-c1",
    "type": "short",
    "prompt": "New, genetically identical body cells are produced by which type of cell division?",
    "accept": [
     "mitosis"
    ],
    "explanation": "Mitosis produces genetically identical cells."
   },
   {
    "id": "science-d1-c2",
    "type": "mcq",
    "prompt": "How many chromosomes are in a normal human gamete (sex cell)?",
    "options": [
     "23",
     "92",
     "12",
     "46"
    ],
    "correctIndex": 0,
    "explanation": "Gametes have half the normal number: 23."
   },
   {
    "id": "science-d1-c3",
    "type": "mcq",
    "prompt": "What is mitosis used for?",
    "options": [
     "Making gametes",
     "Growth and repair",
     "Fertilisation",
     "Causing mutations"
    ],
    "correctIndex": 1,
    "explanation": "Mitosis is used for growth and repair."
   },
   {
    "id": "science-d1-c4",
    "type": "mcq",
    "prompt": "Which type of cell division produces gametes?",
    "options": [
     "Mitosis",
     "Osmosis",
     "Meiosis",
     "Diffusion"
    ],
    "correctIndex": 2,
    "explanation": "Meiosis produces gametes."
   }
  ],
  "keywords": [
   "mitosis",
   "meiosis",
   "cell division",
   "chromosome",
   "gamete",
   "identical",
   "growth",
   "fertilisation"
  ],
  "alsoTopics": [
   "science-1"
  ]
 },
 {
  "id": "science-d2",
  "subject": "science",
  "topicId": "science-4",
  "title": "DNA, genes and inheritance",
  "why": "You need the genetics vocabulary and to complete a simple Punnett square.",
  "sections": [
   {
    "h": "Key words",
    "p": [],
    "list": [
     "DNA carries the genetic code. A gene is a section of DNA that codes for a specific protein.",
     "Alleles are different versions of the same gene.",
     "Dominant allele: shown if at least one copy is present (capital letter, B). Recessive allele: only shown when two copies are present (small letter, b).",
     "Homozygous: two identical alleles (BB or bb). Heterozygous: two different alleles (Bb).",
     "Genotype is the alleles someone has; phenotype is the feature you can see."
    ]
   },
   {
    "h": "Punnett squares",
    "p": [
     "Cross Bb × Bb: the possible children are BB, Bb, Bb and bb."
    ],
    "list": [
     "That is 3 showing the dominant feature (75%) and 1 showing the recessive feature (25%, or ¼)."
    ]
   },
   {
    "h": "Mutations",
    "p": [
     "A mutation is a change in the DNA sequence of a gene. Most have no effect or are harmful; a few can be beneficial."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "Two heterozygous parents (Bb × Bb) have a child. What is the chance the child is bb?",
   "steps": [
    "Possible children: BB, Bb, Bb, bb",
    "One of the four is bb"
   ],
   "answer": "1/4 (25%)"
  },
  "watch": [
   "Recessive features only show when the child has two copies of the recessive allele.",
   "Heterozygous means two DIFFERENT alleles."
  ],
  "checks": [
   {
    "id": "science-d2-c1",
    "type": "mcq",
    "prompt": "Which term describes a section of DNA that codes for a specific protein?",
    "options": [
     "Gene",
     "Cell",
     "Chromosome",
     "Allele"
    ],
    "correctIndex": 0,
    "explanation": "A gene is a section of DNA that codes for a protein."
   },
   {
    "id": "science-d2-c2",
    "type": "mcq",
    "prompt": "An organism has the alleles Aa. What term describes this?",
    "options": [
     "Homozygous recessive",
     "Mutation",
     "Homozygous dominant",
     "Heterozygous"
    ],
    "correctIndex": 3,
    "explanation": "Two different alleles = heterozygous."
   },
   {
    "id": "science-d2-c3",
    "type": "short",
    "prompt": "Two heterozygous parents (Bb × Bb) have children. What fraction of their children are likely to show the recessive feature (bb)? Give your answer as a fraction.",
    "accept": [
     "1/4",
     "0.25",
     "25%"
    ],
    "explanation": "One of the four squares in the Punnett square is bb: 1/4."
   },
   {
    "id": "science-d2-c4",
    "type": "short",
    "prompt": "What is the term for a change in the DNA sequence of a gene?",
    "accept": [
     "mutation"
    ],
    "explanation": "A change in DNA is a mutation."
   },
   {
    "id": "science-d2-c5",
    "type": "mcq",
    "prompt": "Black coat colour (G) is dominant over brown (g). A homozygous black dog (GG) is crossed with a brown dog (gg). What are the offspring?",
    "options": [
     "All brown (gg)",
     "All black (Gg)",
     "Half black, half brown",
     "Three black to one brown"
    ],
    "correctIndex": 1,
    "explanation": "Every puppy gets G from one parent and g from the other: Gg, which is black because G is dominant."
   },
   {
    "id": "science-d2-c6",
    "type": "short",
    "prompt": "A breeder records 27 black puppies and 9 brown puppies. Express the ratio of black to brown in its simplest form.",
    "accept": [
     "3:1"
    ],
    "explanation": "27 : 9 → divide both by 9 → 3 : 1."
   }
  ],
  "keywords": [
   "dna",
   "gene",
   "allele",
   "dominant",
   "recessive",
   "heterozygous",
   "homozygous",
   "punnett",
   "mutation",
   "genotype",
   "phenotype",
   "inherit",
   "black",
   "brown",
   "heterozygous",
   "cross",
   "litter",
   "dogs",
   "puppies",
   "coat"
  ],
  "alsoTopics": [
   "science-1"
  ]
 },
 {
  "id": "science-d3",
  "subject": "science",
  "topicId": "science-4",
  "title": "Evolution and natural selection",
  "why": "Species change over many generations. You need to be able to explain natural selection and give evidence.",
  "sections": [
   {
    "h": "Natural selection",
    "p": [],
    "list": [
     "Individuals in a species vary.",
     "Those best adapted to their environment are more likely to survive, breed and pass on their alleles.",
     "Over many generations the species changes (evolution)."
    ]
   },
   {
    "h": "Evidence for evolution",
    "p": [],
    "list": [
     "Fossils show how organisms have changed over time.",
     "Antibiotic-resistant bacteria: resistant bacteria survive treatment, reproduce and pass on the resistance.",
     "DNA comparisons show how closely related species are."
    ]
   },
   {
    "h": "Selective breeding",
    "p": [
     "Humans choose parents with desirable features to breed from. It is different from natural selection because humans do the choosing."
    ],
    "list": []
   },
   {
    "h": "Extinction",
    "p": [
     "If a habitat changes and a species cannot adapt, its numbers fall and it may die out (become extinct). Horses, for example, evolved to be taller as forests changed to open grassland."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "Explain how bacteria become resistant to an antibiotic",
   "steps": [
    "A few bacteria have an allele that makes them resistant",
    "The antibiotic kills the non-resistant ones",
    "The resistant bacteria survive and reproduce, passing on the resistance"
   ],
   "answer": "Natural selection"
  },
  "watch": [
   "Organisms do not change on purpose; the ones with useful alleles survive and pass them on.",
   "Selective breeding is chosen by humans; natural selection is caused by the environment."
  ],
  "checks": [
   {
    "id": "science-d3-c1",
    "type": "mcq",
    "prompt": "Which of these is used as evidence for evolution by natural selection?",
    "options": [
     "Rock colour",
     "Star maps",
     "The fossil record",
     "Weather records"
    ],
    "correctIndex": 2,
    "explanation": "Fossils show how organisms have changed over time."
   },
   {
    "id": "science-d3-c2",
    "type": "mcq",
    "prompt": "In natural selection, which organisms are most likely to survive and reproduce?",
    "options": [
     "Those best adapted to their environment",
     "The oldest ones",
     "The ones with fewest offspring",
     "The largest ones"
    ],
    "correctIndex": 0,
    "explanation": "Best adapted survive and pass on their alleles."
   },
   {
    "id": "science-d3-c3",
    "type": "mcq",
    "prompt": "Why do antibiotics become less effective against some bacteria?",
    "options": [
     "Bacteria get bigger",
     "The bacteria learn to avoid them",
     "Antibiotics stop working when stored",
     "Resistant bacteria survive and reproduce, passing on the resistance"
    ],
    "correctIndex": 3,
    "explanation": "Natural selection increases the proportion of resistant bacteria."
   },
   {
    "id": "science-d3-c4",
    "type": "mcq",
    "prompt": "What is selective breeding?",
    "options": [
     "Animals choosing their own mates",
     "Humans choosing parents with desired features to breed from",
     "The extinction of a species",
     "A mutation in a gene"
    ],
    "correctIndex": 1,
    "explanation": "Humans choose which organisms to breed."
   },
   {
    "id": "science-d3-c5",
    "type": "mcq",
    "prompt": "What is likely to happen to a species that cannot adapt to a changing habitat?",
    "options": [
     "It will evolve instantly",
     "It will change into a new species at once",
     "It may die out (become extinct)",
     "Its population will double"
    ],
    "correctIndex": 2,
    "explanation": "If it cannot adapt, it is likely to decline and may become extinct."
   }
  ],
  "keywords": [
   "evolution",
   "natural selection",
   "fossil",
   "adapt",
   "survive",
   "resistan",
   "selective breeding",
   "extinct",
   "variation",
   "horse",
   "habitat",
   "grassland",
   "forest",
   "adapt",
   "evolved"
  ],
  "alsoTopics": [
   "science-1"
  ]
 },
 {
  "id": "science-d4",
  "subject": "science",
  "topicId": "science-4",
  "title": "Communicable disease and how the body defends itself",
  "why": "You need to know what causes infectious disease, how it spreads and how vaccines and antibiotics work.",
  "sections": [
   {
    "h": "Pathogens",
    "p": [
     "Pathogens are micro-organisms that cause disease: bacteria, viruses, fungi and protists."
    ],
    "list": [
     "They spread through the air (droplets), in water and food, by direct contact and by animals such as mosquitoes."
    ]
   },
   {
    "h": "Body defences",
    "p": [],
    "list": [
     "Skin, mucus and stomach acid act as barriers.",
     "White blood cells engulf pathogens and make antibodies and antitoxins."
    ]
   },
   {
    "h": "Vaccination",
    "p": [
     "A vaccine contains a dead or weakened pathogen (or part of one). The white blood cells make antibodies and memory cells, so the body can respond faster and stronger if the real pathogen arrives."
    ],
    "list": []
   },
   {
    "h": "Treatments",
    "p": [],
    "list": [
     "Antibiotics kill bacteria but do not work against viruses.",
     "Painkillers only treat the symptoms."
    ]
   }
  ],
  "worked": {
   "title": "Why does a vaccine not make you ill?",
   "steps": [
    "It contains a dead or weakened pathogen (or a part of it)",
    "That is enough to make white blood cells produce antibodies",
    "But it cannot cause the disease"
   ],
   "answer": "It contains a harmless form of the pathogen"
  },
  "watch": [
   "Antibiotics do not work on viruses.",
   "A vaccine stimulates the immune system in advance; it does not cure an existing infection."
  ],
  "checks": [
   {
    "id": "science-d4-c1",
    "type": "short",
    "prompt": "What is the general term for micro-organisms, such as bacteria, viruses and fungi, that cause disease?",
    "accept": [
     "pathogens",
     "pathogen"
    ],
    "explanation": "They are called pathogens."
   },
   {
    "id": "science-d4-c2",
    "type": "mcq",
    "prompt": "What does vaccination introduce into the body to trigger an immune response without causing the disease?",
    "options": [
     "A dead or weakened pathogen",
     "Painkillers",
     "Antibiotics",
     "Extra red blood cells"
    ],
    "correctIndex": 0,
    "explanation": "A harmless form of the pathogen (or its antigens)."
   },
   {
    "id": "science-d4-c3",
    "type": "mcq",
    "prompt": "Antibiotics are effective against which type of pathogen?",
    "options": [
     "None of them",
     "Bacteria",
     "All pathogens",
     "Viruses"
    ],
    "correctIndex": 1,
    "explanation": "Antibiotics kill bacteria but not viruses."
   },
   {
    "id": "science-d4-c4",
    "type": "mcq",
    "prompt": "Which of these is a communicable (infectious) disease?",
    "options": [
     "Osteoporosis",
     "Cataracts",
     "Scurvy",
     "Measles"
    ],
    "correctIndex": 3,
    "explanation": "Measles is caused by a virus and spreads from person to person."
   }
  ],
  "keywords": [
   "pathogen",
   "vaccin",
   "antibiotic",
   "bacteria",
   "virus",
   "communicable",
   "infectious",
   "disease",
   "white blood",
   "immune",
   "antibod"
  ],
  "alsoTopics": [
   "science-1"
  ]
 },
 {
  "id": "science-d5",
  "subject": "science",
  "topicId": "science-4",
  "title": "The nervous system and reflexes",
  "why": "You need to know the path of a nerve impulse and why reflexes are fast.",
  "sections": [
   {
    "h": "The pathway",
    "p": [],
    "list": [
     "Stimulus → receptor → sensory neurone → CNS (brain or spinal cord) → motor neurone → effector → response.",
     "Receptors detect stimuli; effectors (muscles or glands) carry out the response."
    ]
   },
   {
    "h": "Reflex arcs",
    "p": [
     "A reflex is a fast, automatic, protective response that does not involve thinking."
    ],
    "list": [
     "In a reflex arc the sensory neurone passes the message to a relay neurone in the spinal cord, then to a motor neurone.",
     "This bypasses the brain, which makes it faster."
    ]
   }
  ],
  "worked": {
   "title": "Put in order: effector, receptor, relay neurone, sensory neurone, motor neurone",
   "steps": [
    "Receptor detects the stimulus",
    "Sensory neurone → relay neurone → motor neurone",
    "Effector responds"
   ],
   "answer": "receptor → sensory neurone → relay neurone → motor neurone → effector"
  },
  "watch": [
   "The relay neurone connects the sensory neurone to the motor neurone in a reflex arc.",
   "Effectors are muscles or glands; receptors detect stimuli."
  ],
  "checks": [
   {
    "id": "science-d5-c1",
    "type": "short",
    "prompt": "In a reflex arc, what is the name of the neurone that connects a sensory neurone to a motor neurone in the spinal cord?",
    "accept": [
     "relay",
     "relay neurone",
     "relay neuron"
    ],
    "explanation": "The relay neurone."
   },
   {
    "id": "science-d5-c2",
    "type": "mcq",
    "prompt": "Which is the correct order for a reflex arc?",
    "options": [
     "Receptor, motor neurone, relay neurone, sensory neurone, effector",
     "Stimulus, effector, motor neurone, relay neurone, sensory neurone, receptor",
     "Stimulus, receptor, sensory neurone, relay neurone, motor neurone, effector",
     "Stimulus, sensory neurone, receptor, effector, motor neurone"
    ],
    "correctIndex": 2,
    "explanation": "Stimulus → receptor → sensory → relay → motor → effector."
   },
   {
    "id": "science-d5-c3",
    "type": "mcq",
    "prompt": "What is a reflex action?",
    "options": [
     "A fast, automatic response without conscious thought",
     "A response only in the brain",
     "A voluntary movement",
     "A slow, thought-out response"
    ],
    "correctIndex": 0,
    "explanation": "Reflexes are automatic and rapid."
   },
   {
    "id": "science-d5-c4",
    "type": "mcq",
    "prompt": "What is an effector?",
    "options": [
     "A hormone",
     "A muscle or gland that produces a response",
     "A type of neurone in the brain",
     "A cell that detects a stimulus"
    ],
    "correctIndex": 1,
    "explanation": "Effectors are muscles or glands."
   }
  ],
  "keywords": [
   "reflex",
   "neurone",
   "nervous",
   "stimulus",
   "receptor",
   "effector",
   "spinal cord",
   "relay",
   "impulse",
   "response"
  ],
  "alsoTopics": [
   "science-1"
  ]
 },
 {
  "id": "science-d6",
  "subject": "science",
  "topicId": "science-4",
  "title": "Bonding: ionic, covalent and metallic",
  "why": "The type of bonding explains a substance's properties.",
  "sections": [
   {
    "h": "Ionic bonding",
    "p": [
     "Between a metal and a non-metal: electrons are transferred."
    ],
    "list": [
     "The metal atom loses electrons to make a positive ion; the non-metal gains them to make a negative ion. Sodium chloride: Na⁺ and Cl⁻.",
     "Giant lattices with high melting points. They conduct electricity when molten or dissolved, but not as solids (the ions cannot move)."
    ]
   },
   {
    "h": "Covalent bonding",
    "p": [
     "Between non-metal atoms: pairs of electrons are shared."
    ],
    "list": [
     "Small molecules (water, carbon dioxide) have low melting points and do not conduct.",
     "Giant covalent structures (diamond) have very high melting points."
    ]
   },
   {
    "h": "Metallic bonding",
    "p": [
     "Positive metal ions in a lattice, surrounded by a “sea” of delocalised electrons. This lets metals conduct and be shaped (malleable)."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "Why can molten sodium chloride conduct electricity?",
   "steps": [
    "It is made of Na⁺ and Cl⁻ ions",
    "When molten the ions are free to move",
    "Moving charged particles carry the current"
   ],
   "answer": "Its ions are free to move"
  },
  "watch": [
   "Ionic = transfer of electrons; covalent = sharing of electrons.",
   "Ionic compounds do not conduct as solids because the ions are fixed in place."
  ],
  "checks": [
   {
    "id": "science-d6-c1",
    "type": "mcq",
    "prompt": "Which type of bonding involves the transfer of electrons between a metal and a non-metal to form charged ions?",
    "options": [
     "Covalent",
     "Metallic",
     "Ionic",
     "Hydrogen"
    ],
    "correctIndex": 2,
    "explanation": "Ionic bonding."
   },
   {
    "id": "science-d6-c2",
    "type": "mcq",
    "prompt": "Which type of bonding involves atoms sharing electrons, typically between two non-metals?",
    "options": [
     "Metallic",
     "Ionic",
     "None",
     "Covalent"
    ],
    "correctIndex": 3,
    "explanation": "Covalent bonding."
   },
   {
    "id": "science-d6-c3",
    "type": "mcq",
    "prompt": "Why do ionic compounds conduct electricity when molten but not when solid?",
    "options": [
     "They are cooler when solid",
     "The ions are free to move when molten",
     "Solid ionic compounds have no ions",
     "They contain free electrons when molten"
    ],
    "correctIndex": 1,
    "explanation": "Ions can only carry charge when they are free to move."
   },
   {
    "id": "science-d6-c4",
    "type": "mcq",
    "prompt": "Which of these has metallic bonding?",
    "options": [
     "Water",
     "Sodium chloride",
     "Copper",
     "Carbon dioxide"
    ],
    "correctIndex": 2,
    "explanation": "Copper is a metal."
   }
  ],
  "keywords": [
   "bonding",
   "ionic",
   "covalent",
   "metallic",
   "electrons",
   "ion",
   "lattice",
   "transfer",
   "sharing"
  ],
  "alsoTopics": [
   "science-2"
  ]
 },
 {
  "id": "science-d7",
  "subject": "science",
  "topicId": "science-4",
  "title": "Reactivity, acids and salts",
  "why": "You need the reactivity series and the two reactions that make salts.",
  "sections": [
   {
    "h": "The reactivity series",
    "p": [
     "From most to least reactive: potassium, sodium, calcium, magnesium, aluminium, (carbon), zinc, iron, (hydrogen), copper, silver, gold."
    ],
    "list": [
     "A more reactive metal displaces a less reactive metal from its compound."
    ]
   },
   {
    "h": "Making salts",
    "p": [],
    "list": [
     "Metal + acid → salt + hydrogen. (A lighted splint gives a squeaky pop.)",
     "Acid + alkali → salt + water. This is neutralisation.",
     "Hydrochloric acid makes chlorides, sulfuric acid makes sulfates, nitric acid makes nitrates."
    ]
   },
   {
    "h": "The pH scale",
    "p": [
     "Below 7 is acidic, 7 is neutral and above 7 is alkaline."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "Write the word equation for magnesium reacting with hydrochloric acid",
   "steps": [
    "Metal + acid → salt + hydrogen",
    "magnesium + hydrochloric acid → magnesium chloride + hydrogen"
   ],
   "answer": "magnesium + hydrochloric acid → magnesium chloride + hydrogen"
  },
  "watch": [
   "Metal + acid gives hydrogen; acid + alkali gives water.",
   "The name of the salt starts with the metal and ends with the acid's ending (chloride, sulfate, nitrate)."
  ],
  "checks": [
   {
    "id": "science-d7-c1",
    "type": "mcq",
    "prompt": "Which of these metals is the most reactive?",
    "options": [
     "Copper",
     "Potassium",
     "Iron",
     "Zinc"
    ],
    "correctIndex": 1,
    "explanation": "Potassium is at the top of the reactivity series."
   },
   {
    "id": "science-d7-c2",
    "type": "short",
    "prompt": "When a metal reacts with a dilute acid, a salt is produced along with which gas?",
    "accept": [
     "hydrogen"
    ],
    "explanation": "Metal + acid → salt + hydrogen."
   },
   {
    "id": "science-d7-c3",
    "type": "short",
    "prompt": "What type of reaction occurs between an acid and an alkali, producing a salt and water?",
    "accept": [
     "neutralisation",
     "neutralization"
    ],
    "explanation": "That is neutralisation."
   },
   {
    "id": "science-d7-c4",
    "type": "mcq",
    "prompt": "Zinc reacts with sulfuric acid. What salt is formed?",
    "options": [
     "Zinc nitrate",
     "Zinc chloride",
     "Zinc sulfate",
     "Zinc oxide"
    ],
    "correctIndex": 2,
    "explanation": "Sulfuric acid makes sulfates."
   }
  ],
  "keywords": [
   "reactivity",
   "reactive",
   "acid",
   "alkali",
   "salt",
   "neutralis",
   "metal",
   "hydrogen",
   "ph",
   "displace"
  ],
  "alsoTopics": [
   "science-2"
  ]
 },
 {
  "id": "science-d8",
  "subject": "science",
  "topicId": "science-4",
  "title": "Crude oil and hydrocarbons",
  "why": "Crude oil is a vital resource. You need to know what it is made of, how it is separated and what happens when it burns.",
  "sections": [
   {
    "h": "What crude oil is",
    "p": [
     "Crude oil is a mixture of hydrocarbons: compounds containing only hydrogen and carbon."
    ],
    "list": [
     "Most are alkanes: methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀."
    ]
   },
   {
    "h": "Fractional distillation",
    "p": [
     "Crude oil is heated and the vapour rises up a column that is hot at the bottom and cooler at the top. Hydrocarbons condense at different heights depending on their boiling points."
    ],
    "list": [
     "Short chains: low boiling points, flow easily, catch fire easily (top of the column).",
     "Long chains: high boiling points, thick and sticky (bottom of the column)."
    ]
   },
   {
    "h": "Burning hydrocarbons",
    "p": [
     "Complete combustion: hydrocarbon + oxygen → carbon dioxide + water."
    ],
    "list": [
     "With too little oxygen, carbon monoxide and soot form (incomplete combustion)."
    ]
   }
  ],
  "worked": {
   "title": "Write the word equation for methane burning completely in oxygen",
   "steps": [
    "Hydrocarbon + oxygen → carbon dioxide + water",
    "methane + oxygen → carbon dioxide + water"
   ],
   "answer": "methane + oxygen → carbon dioxide + water"
  },
  "watch": [
   "A hydrocarbon has ONLY hydrogen and carbon.",
   "Longer chains have higher boiling points and are more viscous."
  ],
  "checks": [
   {
    "id": "science-d8-c1",
    "type": "mcq",
    "prompt": "Crude oil is mainly a mixture of which type of compound?",
    "options": [
     "Carbohydrates",
     "Metals",
     "Salts",
     "Hydrocarbons"
    ],
    "correctIndex": 3,
    "explanation": "Hydrocarbons contain only hydrogen and carbon."
   },
   {
    "id": "science-d8-c2",
    "type": "mcq",
    "prompt": "Which process separates crude oil into fractions?",
    "options": [
     "Electrolysis",
     "Fractional distillation",
     "Filtration",
     "Chromatography"
    ],
    "correctIndex": 1,
    "explanation": "Fractional distillation."
   },
   {
    "id": "science-d8-c3",
    "type": "mcq",
    "prompt": "A hydrocarbon burns completely in oxygen. Which two products form?",
    "options": [
     "Carbon monoxide and soot",
     "Carbon dioxide and water",
     "Hydrogen and oxygen",
     "Carbon and hydrogen"
    ],
    "correctIndex": 1,
    "explanation": "Carbon dioxide and water."
   },
   {
    "id": "science-d8-c4",
    "type": "mcq",
    "prompt": "Compared with short-chain hydrocarbons, long-chain hydrocarbons have…",
    "options": [
     "no boiling point",
     "higher boiling points",
     "lower boiling points",
     "the same boiling point"
    ],
    "correctIndex": 1,
    "explanation": "Longer molecules have stronger forces between them, so higher boiling points."
   }
  ],
  "keywords": [
   "crude oil",
   "hydrocarbon",
   "alkane",
   "fraction",
   "distillation",
   "fuel",
   "combustion",
   "methane",
   "burn"
  ],
  "alsoTopics": [
   "science-2"
  ]
 },
 {
  "id": "science-d9",
  "subject": "science",
  "topicId": "science-4",
  "title": "DNA structure and base pairing",
  "why": "You need to know the shape of DNA and the base-pairing rule, and to use it in percentage questions.",
  "sections": [
   {
    "h": "Structure",
    "p": [],
    "list": [
     "DNA is a double helix: two strands twisted together.",
     "Each strand has a sequence of four bases: A, T, C and G.",
     "The order of the bases codes for the order of amino acids in a protein; a gene is a section of DNA."
    ]
   },
   {
    "h": "The base-pairing rule",
    "p": [
     "A always pairs with T, and C always pairs with G."
    ],
    "list": [
     "If 20% of the bases are G, then 20% are C.",
     "That leaves 100 − 40 = 60% for A and T together, so 30% A and 30% T."
    ]
   }
  ],
  "worked": {
   "title": "In a sample of DNA, 20% of the bases are guanine (G). What percentage are adenine (A)?",
   "steps": [
    "G pairs with C, so C is also 20%",
    "G + C = 40%",
    "A + T = 60%, and A = T, so A = 30%"
   ],
   "answer": "30%"
  },
  "watch": [
   "Do not mix up the pairs: A–T and C–G.",
   "A and T are always equal in amount, and so are C and G."
  ],
  "checks": [
   {
    "id": "science-d9-c1",
    "type": "mcq",
    "prompt": "Which bases pair together in DNA?",
    "options": [
     "A with T, and C with G",
     "A with G, and T with C",
     "A with C, and T with G",
     "A with A"
    ],
    "correctIndex": 0,
    "explanation": "A pairs with T; C pairs with G."
   },
   {
    "id": "science-d9-c2",
    "type": "mcq",
    "prompt": "What shape is a DNA molecule?",
    "options": [
     "Sphere",
     "Single strand",
     "Cube",
     "Double helix"
    ],
    "correctIndex": 3,
    "explanation": "Double helix."
   },
   {
    "id": "science-d9-c3",
    "type": "short",
    "prompt": "In a sample of DNA, 20% of the bases are guanine (G). What percentage of the bases are cytosine (C)?",
    "accept": [
     "20",
     "20%"
    ],
    "explanation": "G pairs with C, so there are equal amounts: 20%."
   },
   {
    "id": "science-d9-c4",
    "type": "short",
    "prompt": "In the same sample (20% G), what percentage of the bases are adenine (A)?",
    "accept": [
     "30",
     "30%"
    ],
    "explanation": "G + C = 40%, so A + T = 60%. A = T, so A = 30%."
   }
  ],
  "keywords": [
   "dna",
   "bases",
   "guanine",
   "base-pairing",
   "double helix",
   "adenine",
   "cytosine",
   "thymine",
   "gene",
   "code"
  ],
  "alsoTopics": [
   "science-1"
  ]
 },
 {
  "id": "science-d10",
  "subject": "science",
  "topicId": "science-4",
  "title": "Variation and sex determination",
  "why": "Why organisms of the same species differ, and how sex is inherited.",
  "sections": [
   {
    "h": "Variation",
    "p": [
     "Variation means differences between individuals of the same species."
    ],
    "list": [
     "Genetic variation comes from different alleles inherited from parents.",
     "Environmental variation comes from things like diet, climate and accidents.",
     "Many features (such as height) are caused by both.",
     "Identical twins have the same genes, so differences between them show the effect of the environment."
    ]
   },
   {
    "h": "Sex chromosomes",
    "p": [],
    "list": [
     "Human females have XX and males have XY. The same is true of rabbits.",
     "A Punnett square for XX × XY gives XX, XX, XY, XY: a 50% chance of a boy and 50% of a girl."
    ]
   }
  ],
  "worked": {
   "title": "A mother (XX) and father (XY) have a child. What is the chance it is a boy?",
   "steps": [
    "Mother's eggs all carry X",
    "Father's sperm carry X or Y equally",
    "Boy = XY: 1 in 2"
   ],
   "answer": "50%"
  },
  "watch": [
   "Variation is a difference between individuals, not between species.",
   "The father determines the sex of the child because only he can pass on a Y."
  ],
  "checks": [
   {
    "id": "science-d10-c1",
    "type": "mcq",
    "prompt": "Which is the correct definition of “variation”?",
    "options": [
     "Differences between individuals of the same species",
     "A change in one gene only",
     "Differences between species",
     "Growth of an organism"
    ],
    "correctIndex": 0,
    "explanation": "Variation is differences between individuals of the same species."
   },
   {
    "id": "science-d10-c2",
    "type": "mcq",
    "prompt": "Identical twins brought up in different places differ in mass. What causes these differences?",
    "options": [
     "Different genes",
     "The environment",
     "Mutations at birth",
     "Their chromosomes"
    ],
    "correctIndex": 1,
    "explanation": "They have the same genes, so the differences come from the environment."
   },
   {
    "id": "science-d10-c3",
    "type": "short",
    "prompt": "In rabbits, females have the sex chromosomes XX. What sex chromosomes does a male rabbit have?",
    "accept": [
     "xy"
    ],
    "explanation": "Males have XY."
   },
   {
    "id": "science-d10-c4",
    "type": "mcq",
    "prompt": "A mother (XX) and father (XY) have a child. What is the chance that it is a boy?",
    "options": [
     "100%",
     "50%",
     "25%",
     "75%"
    ],
    "correctIndex": 1,
    "explanation": "Half of the father's sperm carry Y."
   }
  ],
  "keywords": [
   "variation",
   "sex chromosome",
   "xx",
   "xy",
   "environment",
   "identical twins",
   "characteristics",
   "genes"
  ],
  "alsoTopics": [
   "science-1"
  ]
 },
 {
  "id": "science-e1",
  "subject": "science",
  "topicId": "science-5",
  "title": "Radioactivity: alpha, beta, gamma and background radiation",
  "why": "Unstable nuclei give out radiation. You need to know the three types and how they compare.",
  "sections": [
   {
    "h": "The three types",
    "p": [],
    "list": [
     "Alpha: a helium nucleus (2 protons + 2 neutrons). The most ionising but the least penetrating: stopped by paper or a few centimetres of air.",
     "Beta: a fast-moving electron. Stopped by a thin sheet of aluminium.",
     "Gamma: a high-frequency electromagnetic wave. The least ionising but the most penetrating: reduced by thick lead or concrete."
    ]
   },
   {
    "h": "Background radiation",
    "p": [
     "Low-level radiation that is around us all the time, from rocks (radon gas), cosmic rays, food and medical sources."
    ],
    "list": [
     "A Geiger–Müller tube detects radiation."
    ]
   },
   {
    "h": "Danger",
    "p": [
     "Ionising radiation can damage cells and cause cancer, so safe handling matters."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "Which type of radiation would be stopped by a sheet of paper?",
   "steps": [
    "Alpha is the least penetrating",
    "Paper stops it"
   ],
   "answer": "Alpha"
  },
  "watch": [
   "Most ionising = least penetrating (alpha); least ionising = most penetrating (gamma).",
   "Radioactive decay is random: you cannot predict when a particular nucleus will decay."
  ],
  "checks": [
   {
    "id": "science-e1-c1",
    "type": "mcq",
    "prompt": "Which type of radiation is the most ionising but has the least penetrating power (it is stopped by paper)?",
    "options": [
     "Gamma",
     "Alpha",
     "Beta",
     "X-ray"
    ],
    "correctIndex": 1,
    "explanation": "Alpha."
   },
   {
    "id": "science-e1-c2",
    "type": "mcq",
    "prompt": "Which type of radioactive decay is a fast-moving electron?",
    "options": [
     "Alpha",
     "Gamma",
     "Neutron",
     "Beta"
    ],
    "correctIndex": 3,
    "explanation": "Beta radiation."
   },
   {
    "id": "science-e1-c3",
    "type": "short",
    "prompt": "What name is given to the low-level radiation present in the environment all the time, from rocks, cosmic rays and other sources?",
    "accept": [
     "background radiation",
     "background"
    ],
    "explanation": "Background radiation."
   },
   {
    "id": "science-e1-c4",
    "type": "mcq",
    "prompt": "Which type of radiation is a high-frequency electromagnetic wave?",
    "options": [
     "Alpha",
     "Beta",
     "All three",
     "Gamma"
    ],
    "correctIndex": 3,
    "explanation": "Gamma rays are electromagnetic waves."
   }
  ],
  "keywords": [
   "radioactiv",
   "alpha",
   "beta",
   "gamma",
   "radiation",
   "background",
   "ionis",
   "penetrat",
   "decay",
   "nuclei",
   "geiger",
   "radon",
   "radiation"
  ],
  "alsoTopics": [
   "science-3"
  ]
 },
 {
  "id": "science-e2",
  "subject": "science",
  "topicId": "science-5",
  "title": "Half-life",
  "why": "Half-life questions come up a lot: calculations and reading them off a graph.",
  "sections": [
   {
    "h": "What half-life means",
    "p": [
     "The half-life is the time taken for the number of radioactive nuclei (or the activity) to halve."
    ],
    "list": []
   },
   {
    "h": "Calculating",
    "p": [
     "Halve the amount once for every half-life."
    ],
    "list": [
     "64 g, after 3 half-lives: 64 → 32 → 16 → 8 g.",
     "Activity 800 counts/min, half-life 5 days: 5 days → 400, 10 days → 200, 15 days → 100. So it takes 15 days to fall to 100."
    ]
   },
   {
    "h": "From a graph",
    "p": [
     "Read the starting value. Find half of it on the vertical axis. Read across to the curve and down to the time axis. That time is the half-life."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "A sample has a half-life of 5 days. How long does it take for the activity to fall from 800 to 100 counts/min?",
   "steps": [
    "800 → 400 (1 half-life)",
    "400 → 200 (2 half-lives)",
    "200 → 100 (3 half-lives)",
    "3 × 5 days = 15 days"
   ],
   "answer": "15 days"
  },
  "watch": [
   "Count how many halvings you need first, then multiply by the half-life.",
   "Half-life is a time, not a fraction."
  ],
  "checks": [
   {
    "id": "science-e2-c1",
    "type": "short",
    "prompt": "What is the term for the time taken for the number of radioactive nuclei in a sample to halve?",
    "accept": [
     "half-life",
     "half life",
     "halflife"
    ],
    "explanation": "That is the half-life."
   },
   {
    "id": "science-e2-c2",
    "type": "short",
    "prompt": "A sample has a half-life of 5 days. How many days does it take for its activity to fall from 800 to 100 counts per minute?",
    "accept": [
     "15",
     "15days"
    ],
    "explanation": "800 → 400 → 200 → 100 is 3 half-lives: 3 × 5 = 15 days."
   },
   {
    "id": "science-e2-c3",
    "type": "short",
    "prompt": "A sample contains 64 g of a radioactive isotope. How many grams remain after 3 half-lives?",
    "accept": [
     "8",
     "8g"
    ],
    "explanation": "64 → 32 → 16 → 8."
   },
   {
    "id": "science-e2-c4",
    "type": "mcq",
    "prompt": "The activity of a sample falls from 200 to 50 counts per second in 10 minutes. What is its half-life?",
    "options": [
     "20 minutes",
     "10 minutes",
     "2.5 minutes",
     "5 minutes"
    ],
    "correctIndex": 3,
    "explanation": "200 → 100 → 50 is 2 half-lives, so each is 10 ÷ 2 = 5 minutes."
   }
  ],
  "keywords": [
   "half-life",
   "half life",
   "decay",
   "activity",
   "counts",
   "radioactive",
   "halve",
   "half"
  ],
  "alsoTopics": [
   "science-3"
  ]
 },
 {
  "id": "science-e3",
  "subject": "science",
  "topicId": "science-5",
  "title": "Electric circuits: current, voltage and resistance",
  "why": "Circuit questions use V = I × R and the rules for series and parallel circuits.",
  "sections": [
   {
    "h": "Ohm's law",
    "p": [
     "Voltage = current × resistance (V = I × R). Current is in amps (A), voltage in volts (V) and resistance in ohms (Ω)."
    ],
    "list": [
     "Current = voltage ÷ resistance. With 12 V and 4 Ω: 12 ÷ 4 = 3 A."
    ]
   },
   {
    "h": "Series circuits",
    "p": [],
    "list": [
     "The same current flows through every component.",
     "The voltages across the components add up to the supply voltage.",
     "Total resistance is the sum of the resistances."
    ]
   },
   {
    "h": "Parallel circuits",
    "p": [],
    "list": [
     "The voltage across each branch is the same as the supply voltage.",
     "The currents in the branches add up to the total current."
    ]
   },
   {
    "h": "Meters",
    "p": [
     "An ammeter goes in series with a component; a voltmeter goes in parallel."
    ],
    "list": []
   },
   {
    "h": "Power",
    "p": [
     "Power = voltage × current (in watts, W)."
    ],
    "list": [
     "A generator giving 230 V and 10.5 A has a power of 230 × 10.5 = 2415 W.",
     "A 2800 W kettle on 230 V needs 2800 ÷ 230 ≈ 12.2 A, which is more than the generator can supply."
    ]
   },
   {
    "h": "Variable resistors and switches",
    "p": [],
    "list": [
     "In a series circuit, increasing the resistance of a variable resistor increases the total resistance, so the current goes down.",
     "Voltages in series add up to the supply: a 6 V supply with 2.4 V across the variable resistor leaves 3.6 V across the lamp.",
     "A switch in the main wire controls the whole circuit; a switch in one branch of a parallel circuit controls only that branch."
    ]
   }
  ],
  "worked": {
   "title": "Find the current when the voltage is 12 V and the resistance is 4 Ω",
   "steps": [
    "Current = voltage ÷ resistance",
    "12 ÷ 4 = 3"
   ],
   "answer": "3 A"
  },
  "watch": [
   "Series: same current. Parallel: same voltage.",
   "Choose the version of the equation that makes the unknown the subject."
  ],
  "checks": [
   {
    "id": "science-e3-c1",
    "type": "short",
    "prompt": "Using current = voltage ÷ resistance, find the current in amps when the voltage is 12 V and the resistance is 4 Ω.",
    "accept": [
     "3",
     "3a"
    ],
    "explanation": "12 ÷ 4 = 3 A."
   },
   {
    "id": "science-e3-c2",
    "type": "mcq",
    "prompt": "In a series circuit, what is true of the current at different points in the circuit?",
    "options": [
     "It is highest near the battery",
     "It is different at every point",
     "It is the same everywhere",
     "It is zero in the middle"
    ],
    "correctIndex": 2,
    "explanation": "There is only one path, so the current is the same everywhere."
   },
   {
    "id": "science-e3-c3",
    "type": "mcq",
    "prompt": "In a parallel circuit, what is true of the voltage across each branch?",
    "options": [
     "It is shared out between the branches",
     "It is the same as the supply voltage",
     "It is zero",
     "It is always 12 V"
    ],
    "correctIndex": 1,
    "explanation": "Each branch has the full supply voltage across it."
   },
   {
    "id": "science-e3-c4",
    "type": "short",
    "prompt": "A current of 2 A flows through a 6 Ω resistor. What is the voltage across it in volts?",
    "accept": [
     "12",
     "12v"
    ],
    "explanation": "V = I × R = 2 × 6 = 12 V."
   },
   {
    "id": "science-e3-c5",
    "type": "short",
    "prompt": "A generator produces 230 V and a maximum current of 10.5 A. Using power = voltage × current, calculate its maximum power in watts.",
    "accept": [
     "2415",
     "2415w"
    ],
    "explanation": "230 × 10.5 = 2415 W."
   },
   {
    "id": "science-e3-c6",
    "type": "mcq",
    "prompt": "In a series circuit, the resistance of a variable resistor is increased. What happens to the current?",
    "options": [
     "It decreases",
     "It increases",
     "It doubles",
     "It stays the same"
    ],
    "correctIndex": 0,
    "explanation": "More resistance in the circuit means less current."
   },
   {
    "id": "science-e3-c7",
    "type": "short",
    "prompt": "A series circuit has a 6 V supply. The variable resistor has 2.4 V across it. What is the voltage across the lamp, in volts?",
    "accept": [
     "3.6",
     "3.6v"
    ],
    "explanation": "6 − 2.4 = 3.6 V."
   },
   {
    "id": "science-e3-c8",
    "type": "mcq",
    "prompt": "In a parallel circuit, switch 1 is in the main wire and switch 2 is in the branch containing lamp A only. Which statement is correct?",
    "options": [
     "Switch 1 turns off only lamp A",
     "Neither switch does anything",
     "Switch 2 turns off only lamp A; switch 1 turns off everything",
     "Switch 2 turns off every lamp"
    ],
    "correctIndex": 2,
    "explanation": "A switch in one branch controls only that branch; a switch in the main wire controls the whole circuit."
   }
  ],
  "keywords": [
   "current",
   "voltage",
   "resistance",
   "circuit",
   "series",
   "parallel",
   "ohm",
   "amps",
   "volts",
   "v = i",
   "power",
   "generator",
   "variable resistor",
   "switch",
   "lamp",
   "kettle",
   "230",
   "transformer"
  ],
  "alsoTopics": [
   "science-3"
  ]
 },
 {
  "id": "science-e4",
  "subject": "science",
  "topicId": "science-5",
  "title": "Work, potential energy, kinetic energy and power",
  "why": "Energy calculations all follow a formula. Know which one to use and give the units.",
  "sections": [
   {
    "h": "Work done",
    "p": [
     "Work done = force × distance (in joules, J, when force is in N and distance in m)."
    ],
    "list": [
     "20 N moving an object 5 m: 20 × 5 = 100 J."
    ]
   },
   {
    "h": "Potential and kinetic energy",
    "p": [],
    "list": [
     "Gravitational potential energy = mass × gravitational field strength × height (J = kg × N/kg × m). With g = 10 N/kg: a 4 kg object lifted 5 m gains 4 × 10 × 5 = 200 J.",
     "Kinetic energy = ½ × mass × speed². A 2 kg object at 3 m/s: ½ × 2 × 3² = 9 J."
    ]
   },
   {
    "h": "Power",
    "p": [
     "Power = energy transferred ÷ time (in watts, W)."
    ],
    "list": [
     "600 J in 30 s: 600 ÷ 30 = 20 W."
    ]
   }
  ],
  "worked": {
   "title": "A force of 20 N moves an object 5 m. How much work is done?",
   "steps": [
    "Work done = force × distance",
    "20 × 5 = 100"
   ],
   "answer": "100 J"
  },
  "watch": [
   "For kinetic energy, square the speed BEFORE multiplying.",
   "Always quote the unit: J for energy, W for power."
  ],
  "checks": [
   {
    "id": "science-e4-c1",
    "type": "short",
    "prompt": "Using work done = force × distance, calculate the work done, in joules, when a force of 20 N moves an object 5 m.",
    "accept": [
     "100",
     "100j"
    ],
    "explanation": "20 × 5 = 100 J."
   },
   {
    "id": "science-e4-c2",
    "type": "short",
    "prompt": "Calculate the gravitational potential energy gained by a 4 kg object lifted 5 m. Use g = 10 N/kg. Give your answer in joules.",
    "accept": [
     "200",
     "200j"
    ],
    "explanation": "m × g × h = 4 × 10 × 5 = 200 J."
   },
   {
    "id": "science-e4-c3",
    "type": "short",
    "prompt": "A machine transfers 600 J of energy in 30 seconds. What is its power in watts?",
    "accept": [
     "20",
     "20w"
    ],
    "explanation": "Power = 600 ÷ 30 = 20 W."
   },
   {
    "id": "science-e4-c4",
    "type": "short",
    "prompt": "Calculate the kinetic energy of a 2 kg object moving at 3 m/s. Give your answer in joules.",
    "accept": [
     "9",
     "9j"
    ],
    "explanation": "½ × 2 × 3² = ½ × 2 × 9 = 9 J."
   }
  ],
  "keywords": [
   "work done",
   "gravitational potential",
   "kinetic energy",
   "power",
   "joule",
   "watt",
   "force × distance",
   "energy"
  ],
  "alsoTopics": [
   "science-3"
  ]
 },
 {
  "id": "science-e5",
  "subject": "science",
  "topicId": "science-5",
  "title": "Electromagnetism, transformers and the National Grid",
  "why": "You need to know how motors work, what a transformer does and why electricity is sent at high voltage.",
  "sections": [
   {
    "h": "The motor effect",
    "p": [
     "A wire carrying a current in a magnetic field feels a force. This is the motor effect, used in electric motors."
    ],
    "list": [
     "Reversing the current or the magnetic field reverses the force."
    ]
   },
   {
    "h": "Transformers",
    "p": [
     "A transformer has two coils wound on an iron core. It changes the voltage of an alternating supply."
    ],
    "list": [
     "More turns on the secondary coil than the primary: step-up (voltage increases).",
     "Fewer turns on the secondary: step-down.",
     "Vₛ ÷ Vₚ = Nₛ ÷ Nₚ. With 100 turns on the primary and 400 on the secondary and 20 V in: Vₛ = 20 × 4 = 80 V."
    ]
   },
   {
    "h": "The National Grid",
    "p": [
     "The National Grid connects power stations to homes and businesses."
    ],
    "list": [
     "Step-up transformers raise the voltage to very high values for transmission. This means a lower current, so less energy is wasted as heat in the cables.",
     "Step-down transformers lower the voltage again before it reaches homes."
    ]
   },
   {
    "h": "Generators",
    "p": [
     "Moving a magnet in a coil (or a coil in a magnetic field) induces a voltage. This is how a generator works."
    ],
    "list": [
     "The voltage is bigger with faster movement, a stronger magnet or more turns on the coil.",
     "In a fair test of a generator, keep the same coil and change only one thing at a time."
    ]
   }
  ],
  "worked": {
   "title": "A transformer has 100 turns on the primary coil and 400 on the secondary. The input is 20 V. What is the output?",
   "steps": [
    "Turns ratio = 400 ÷ 100 = 4",
    "Output = 20 × 4 = 80 V"
   ],
   "answer": "80 V"
  },
  "watch": [
   "Transformers only work with alternating current.",
   "High voltage means low current, which means less energy is lost as heat."
  ],
  "checks": [
   {
    "id": "science-e5-c1",
    "type": "mcq",
    "prompt": "What do we call the force between a magnet and a current-carrying wire, used in electric motors?",
    "options": [
     "The motor effect",
     "The generator effect",
     "Static electricity",
     "Induction"
    ],
    "correctIndex": 0,
    "explanation": "That is the motor effect."
   },
   {
    "id": "science-e5-c2",
    "type": "mcq",
    "prompt": "What is the name for a device that increases or decreases voltage using two coils with different numbers of turns?",
    "options": [
     "A resistor",
     "A generator",
     "A transformer",
     "A motor"
    ],
    "correctIndex": 2,
    "explanation": "A transformer."
   },
   {
    "id": "science-e5-c3",
    "type": "mcq",
    "prompt": "Why is electricity transmitted at very high voltage in the National Grid?",
    "options": [
     "It makes the electricity travel faster",
     "It is safer for houses",
     "It makes the cables cheaper to build",
     "It reduces the current, so less energy is wasted as heat"
    ],
    "correctIndex": 3,
    "explanation": "A higher voltage means a lower current for the same power, so less heat is lost."
   },
   {
    "id": "science-e5-c4",
    "type": "short",
    "prompt": "A transformer has 100 turns on the primary coil and 400 turns on the secondary coil. The primary voltage is 20 V. What is the secondary voltage in volts?",
    "accept": [
     "80",
     "80v"
    ],
    "explanation": "Turns ratio 4:1, so 20 × 4 = 80 V."
   },
   {
    "id": "science-e5-c5",
    "type": "mcq",
    "prompt": "How can the voltage produced by a simple AC generator be increased?",
    "options": [
     "Using a weaker magnet",
     "Turning it faster",
     "Using fewer turns of wire",
     "Turning it more slowly"
    ],
    "correctIndex": 1,
    "explanation": "Faster movement (or a stronger magnet or more turns) gives a bigger induced voltage."
   }
  ],
  "keywords": [
   "motor effect",
   "transformer",
   "national grid",
   "magnet",
   "coil",
   "turns",
   "electromagnet",
   "step-up",
   "step-down",
   "transmission",
   "generator",
   "step-up",
   "step up",
   "coil",
   "induc",
   "230v"
  ],
  "alsoTopics": [
   "science-3"
  ]
 },
 {
  "id": "science-e6",
  "subject": "science",
  "topicId": "science-5",
  "title": "Light, refraction and medical imaging",
  "why": "You need to know how light bends in glass and how radiation is used to look inside the body.",
  "sections": [
   {
    "h": "Refraction",
    "p": [
     "Light changes speed when it enters a different material, and that can change its direction."
    ],
    "list": [
     "Going from air into glass (denser): light slows down and bends towards the normal.",
     "Going from glass back into air: light speeds up and bends away from the normal."
    ]
   },
   {
    "h": "Imaging the body",
    "p": [],
    "list": [
     "X-rays pass through soft tissue but are absorbed by bone, so they show broken bones.",
     "A CT scan uses X-rays to build up a detailed 3D image of the inside of the body.",
     "Ultrasound uses high-frequency sound waves and does not use ionising radiation (used for pregnancy scans)."
    ]
   },
   {
    "h": "Risk",
    "p": [
     "X-rays and gamma rays are ionising, so scans are only used when the benefit outweighs the risk."
    ],
    "list": []
   },
   {
    "h": "Investigating refraction",
    "p": [
     "Shine a ray of light into a glass block and measure the angle of incidence and the angle of refraction from the normal with a protractor."
    ],
    "list": [
     "Independent variable: the angle of incidence. Dependent variable: the angle of refraction.",
     "Entering glass, the angle of refraction is smaller than the angle of incidence (about 26° for an incidence of 40°).",
     "Repeat each reading and take a mean; leave out any anomalous reading."
    ]
   }
  ],
  "worked": {
   "title": "Light passes from air into glass. What happens to its speed and direction?",
   "steps": [
    "Glass is denser, so the light slows down",
    "It bends towards the normal"
   ],
   "answer": "It slows down and bends towards the normal"
  },
  "watch": [
   "Slows down = bends towards the normal; speeds up = bends away from it.",
   "Ultrasound does not use X-rays."
  ],
  "checks": [
   {
    "id": "science-e6-c1",
    "type": "mcq",
    "prompt": "What happens to the speed of light as it passes from air into glass (a denser material)?",
    "options": [
     "It speeds up",
     "It slows down",
     "It stays the same",
     "It stops"
    ],
    "correctIndex": 1,
    "explanation": "Light slows down in a denser material."
   },
   {
    "id": "science-e6-c2",
    "type": "mcq",
    "prompt": "Which medical imaging technique uses X-rays to build up a detailed 3D image of the inside of the body?",
    "options": [
     "Ultrasound",
     "Endoscope",
     "CT scan",
     "Thermometer"
    ],
    "correctIndex": 2,
    "explanation": "CT scan."
   },
   {
    "id": "science-e6-c3",
    "type": "mcq",
    "prompt": "When light enters a glass block from air at an angle, in which direction does it bend?",
    "options": [
     "Away from the normal",
     "Towards the normal",
     "Back into the air",
     "It does not bend"
    ],
    "correctIndex": 1,
    "explanation": "It slows down and bends towards the normal."
   },
   {
    "id": "science-e6-c4",
    "type": "mcq",
    "prompt": "Which imaging technique uses high-frequency sound waves instead of ionising radiation?",
    "options": [
     "Ultrasound",
     "Gamma camera",
     "CT scan",
     "X-ray"
    ],
    "correctIndex": 0,
    "explanation": "Ultrasound."
   },
   {
    "id": "science-e6-c5",
    "type": "mcq",
    "prompt": "In an investigation into refraction, which is the independent variable?",
    "options": [
     "Angle of refraction",
     "Mass of the glass block",
     "Angle of incidence",
     "Colour of the ray"
    ],
    "correctIndex": 2,
    "explanation": "The angle of incidence is what you change; the angle of refraction is what you measure."
   },
   {
    "id": "science-e6-c6",
    "type": "mcq",
    "prompt": "A ray of light enters a glass block from air at an angle of incidence of 40°. Which is the most likely angle of refraction?",
    "options": [
     "40°",
     "90°",
     "54°",
     "26°"
    ],
    "correctIndex": 3,
    "explanation": "Light bends towards the normal on entering glass, so the angle of refraction is smaller than 40°."
   }
  ],
  "keywords": [
   "refraction",
   "light",
   "glass",
   "normal",
   "x-ray",
   "ct scan",
   "ultrasound",
   "medical",
   "imaging",
   "speed of light",
   "refraction",
   "ray box",
   "protractor",
   "angle of incidence",
   "angle of refraction",
   "perspex"
  ],
  "alsoTopics": [
   "science-3"
  ]
 },
 {
  "id": "science-e7",
  "subject": "science",
  "topicId": "science-5",
  "title": "The expanding Universe",
  "why": "You need to know the evidence that the Universe is expanding.",
  "sections": [
   {
    "h": "Redshift",
    "p": [
     "When a galaxy is moving away, the wavelengths of its light are stretched. The light is shifted towards the red end of the spectrum: redshift."
    ],
    "list": [
     "Light from distant galaxies is redshifted.",
     "The further away a galaxy is, the greater its redshift, which means it is moving away faster."
    ]
   },
   {
    "h": "What it shows",
    "p": [
     "The observations show that the whole Universe is expanding."
    ],
    "list": [
     "Going back in time, everything was closer together. This leads to the Big Bang theory: the Universe began from a very small, hot, dense region about 14 billion years ago and has been expanding ever since."
    ]
   }
  ],
  "worked": {
   "title": "What does the redshift of light from distant galaxies show?",
   "steps": [
    "Redshifted light means the galaxies are moving away",
    "More distant galaxies are moving away faster",
    "So the Universe is expanding"
   ],
   "answer": "The Universe is expanding"
  },
  "watch": [
   "Redshift means the wavelength has increased.",
   "Do not confuse the Solar System with the whole Universe."
  ],
  "checks": [
   {
    "id": "science-e7-c1",
    "type": "mcq",
    "prompt": "What does the observed redshift of light from distant galaxies provide evidence for?",
    "options": [
     "Galaxies are getting closer",
     "The Sun is getting hotter",
     "The Earth is moving in a circle",
     "The Universe is expanding"
    ],
    "correctIndex": 3,
    "explanation": "Redshift shows galaxies moving away, so the Universe is expanding."
   },
   {
    "id": "science-e7-c2",
    "type": "mcq",
    "prompt": "What has happened to the wavelength of light that is redshifted?",
    "options": [
     "It has increased",
     "It has decreased",
     "It has become zero",
     "It has not changed"
    ],
    "correctIndex": 0,
    "explanation": "The wavelength has been stretched."
   },
   {
    "id": "science-e7-c3",
    "type": "mcq",
    "prompt": "Compared with nearby galaxies, distant galaxies show…",
    "options": [
     "no redshift at all",
     "a greater redshift",
     "the same redshift",
     "a smaller redshift"
    ],
    "correctIndex": 1,
    "explanation": "The further away, the greater the redshift."
   },
   {
    "id": "science-e7-c4",
    "type": "mcq",
    "prompt": "Which theory says the Universe began from a very small, hot, dense state and has been expanding ever since?",
    "options": [
     "Natural selection",
     "Continental drift",
     "Big Bang",
     "Steady State"
    ],
    "correctIndex": 2,
    "explanation": "The Big Bang theory."
   }
  ],
  "keywords": [
   "universe",
   "redshift",
   "expan",
   "galaxies",
   "big bang",
   "wavelength",
   "distant"
  ],
  "alsoTopics": [
   "science-3"
  ]
 },
 {
  "id": "science-e8",
  "subject": "science",
  "topicId": "science-5",
  "title": "Background radiation: counts, anomalies and radon",
  "why": "Questions on the background radiation practical ask you to average counts, spot anomalies, convert to a count rate and explain the risks of radon.",
  "sections": [
   {
    "h": "Handling the counts",
    "p": [],
    "list": [
     "Repeat the count several times (for example six 2-minute trials).",
     "An anomalous result is very different from the others (21 among results near 80). Check it, then leave it out of the mean.",
     "Mean of 82, 78, 81, 79 and 77 = 397 ÷ 5 = 79.4 counts.",
     "Count rate = counts ÷ time. 79.4 counts in 120 s is 79.4 ÷ 120 = 0.66 counts per second."
    ]
   },
   {
    "h": "Radon",
    "p": [
     "Radon is a radioactive gas from some rocks (for example in parts of Pembrokeshire). It gets into buildings."
    ],
    "list": [
     "It gives out alpha radiation. If breathed in, alpha particles damage cells in the lungs, so a very high level raises the risk of lung cancer.",
     "Good ventilation lowers the level."
    ]
   },
   {
    "h": "Isotopes",
    "p": [
     "Radon-220 and radon-222 are isotopes: they have the same number of protons but different numbers of neutrons."
    ],
    "list": []
   }
  ],
  "worked": {
   "title": "The mean count in 120 seconds was 79.4. What is the count rate per second?",
   "steps": [
    "Count rate = counts ÷ time",
    "79.4 ÷ 120 = 0.66… ≈ 0.66"
   ],
   "answer": "0.66 counts per second"
  },
  "watch": [
   "An anomalous result is not included in the mean.",
   "Different isotopes have different numbers of NEUTRONS."
  ],
  "checks": [
   {
    "id": "science-e8-c1",
    "type": "short",
    "prompt": "Calculate the mean of these five counts: 82, 78, 81, 79 and 77.",
    "accept": [
     "79.4"
    ],
    "explanation": "Total = 397, and 397 ÷ 5 = 79.4."
   },
   {
    "id": "science-e8-c2",
    "type": "short",
    "prompt": "The mean count in 120 seconds was 79.4. Calculate the mean count rate in counts per second. Give your answer to 2 decimal places.",
    "accept": [
     "0.66"
    ],
    "explanation": "79.4 ÷ 120 = 0.6616…, which is 0.66."
   },
   {
    "id": "science-e8-c3",
    "type": "mcq",
    "prompt": "Why is a very high level of radon gas a health concern?",
    "options": [
     "It turns skin blue",
     "Alpha particles from radon can damage lung cells and increase the risk of lung cancer",
     "It makes air too hot",
     "It cuts off oxygen completely"
    ],
    "correctIndex": 1,
    "explanation": "Radon gives out alpha radiation, which damages cells if breathed in."
   },
   {
    "id": "science-e8-c4",
    "type": "mcq",
    "prompt": "Radon-220 and radon-222 are isotopes of radon. What does this mean?",
    "options": [
     "They have the same number of protons but different numbers of neutrons",
     "They have different numbers of electrons only",
     "They are different elements",
     "They have different numbers of protons"
    ],
    "correctIndex": 0,
    "explanation": "Isotopes have the same number of protons and different numbers of neutrons."
   }
  ],
  "keywords": [
   "background radiation",
   "radon",
   "counts",
   "anomalous",
   "count rate",
   "isotope",
   "trial",
   "radiation",
   "pembrokeshire",
   "lung"
  ],
  "alsoTopics": [
   "science-3"
  ]
 }
];
