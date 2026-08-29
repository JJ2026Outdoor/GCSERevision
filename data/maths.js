// GCSE Mathematics and Numeracy (Double Award) — WJEC, Foundation tier.
// Verified against the uploaded spec: content is organised into 4 strands
// (Number, Algebra, Geometry & Measures, Statistics & Probability) spread
// across Unit 1 (Financial Maths/calculator), Unit 2 (non-calculator) and
// Unit 3 (calculator). The 5 tests below split "Number" into two (Number,
// and Ratio & Proportion) for finer-grained revision — same content, just
// grouped differently for 5x5-minute tests instead of the spec's 4 strands.
// Questions are standard Foundation-tier topics but not copied verbatim from
// the spec — double check tricky ones (e.g. Pythagoras, inequalities) against
// the actual paper style closer to exam time.
//
// Question shape:
//   type: "short"  -> answer typed in a text box, matched against `accept` (case/space-insensitive)
//   type: "mcq"    -> pick one of `options`, correct one is `correctIndex`
export const MATHS_TESTS = [
  {
    id: "maths-1",
    title: "Number",
    questions: [
      { id: "m1q1", type: "short", prompt: "Write 0.375 as a fraction in its simplest form.", accept: ["3/8"], explanation: "0.375 = 375/1000. Dividing top and bottom by 125 gives 3/8." },
      { id: "m1q2", type: "short", prompt: "Work out 15% of 240.", accept: ["36"], explanation: "10% of 240 = 24. 5% of 240 = 12. 15% = 24 + 12 = 36." },
      { id: "m1q3", type: "mcq", prompt: "Which of these numbers is a prime number?", options: ["51", "57", "59", "63"], correctIndex: 2, explanation: "59 only divides exactly by 1 and itself. 51 = 3×17, 57 = 3×19, 63 = 7×9, so none of those are prime." },
      { id: "m1q4", type: "short", prompt: "Round 4.8562 to 2 decimal places.", accept: ["4.86"], explanation: "The third decimal digit is 6, so round the second decimal up: 4.85 → 4.86." },
      { id: "m1q5", type: "short", prompt: "Write 3.4 × 10^5 as an ordinary number.", accept: ["340000", "340,000"], explanation: "Multiplying by 10^5 moves the decimal point 5 places to the right: 3.4 → 340000." },
      { id: "m1q6", type: "mcq", prompt: "Which list shows the numbers in order from smallest to largest?", options: ["-3, -1, 0.5, 2", "-1, -3, 0.5, 2", "2, 0.5, -1, -3", "-3, 0.5, -1, 2"], correctIndex: 0, explanation: "On a number line, -3 is the smallest, then -1, then 0.5, then 2." },
      { id: "m1q7", type: "short", prompt: "Find the Lowest Common Multiple (LCM) of 6 and 8.", accept: ["24"], explanation: "Multiples of 6: 6, 12, 18, 24. Multiples of 8: 8, 16, 24. The first one they share is 24." },
      { id: "m1q8", type: "short", prompt: "Work out 2^3 × 2^2. Give your answer as a single power of 2.", accept: ["2^5", "2**5"], explanation: "When multiplying powers of the same number, add the indices: 3 + 2 = 5, so the answer is 2^5 (which equals 32)." }
    ]
  },
  {
    id: "maths-2",
    title: "Algebra",
    questions: [
      { id: "m2q1", type: "short", prompt: "Simplify 5a + 3b − 2a + b.", accept: ["3a+4b"], explanation: "Collect the a terms: 5a − 2a = 3a. Collect the b terms: 3b + b = 4b. Answer: 3a + 4b." },
      { id: "m2q2", type: "short", prompt: "Expand and simplify 3(x + 4) − 2x.", accept: ["x+12"], explanation: "3(x + 4) = 3x + 12. Then 3x + 12 − 2x = x + 12." },
      { id: "m2q3", type: "short", prompt: "Solve 4x − 7 = 13. Find x.", accept: ["5", "x=5"], explanation: "Add 7 to both sides: 4x = 20. Divide by 4: x = 5." },
      { id: "m2q4", type: "mcq", prompt: "If y = 3x − 2, what is y when x = 4?", options: ["8", "10", "12", "14"], correctIndex: 1, explanation: "3 × 4 = 12, then 12 − 2 = 10." },
      { id: "m2q5", type: "short", prompt: "The nth term of a sequence is 4n + 1. Find the 6th term.", accept: ["25"], explanation: "Substitute n = 6: 4 × 6 + 1 = 25." },
      { id: "m2q6", type: "short", prompt: "Factorise fully: 6x + 9.", accept: ["3(2x+3)"], explanation: "The highest common factor of 6 and 9 is 3. 6x ÷ 3 = 2x and 9 ÷ 3 = 3, so it factorises to 3(2x + 3)." },
      { id: "m2q7", type: "mcq", prompt: "Solve the inequality 2x + 1 > 9.", options: ["x > 4", "x > 5", "x < 4", "x > 3"], correctIndex: 0, explanation: "Subtract 1 from both sides: 2x > 8. Divide by 2: x > 4." },
      { id: "m2q8", type: "short", prompt: "Write down the next term in the sequence 2, 5, 10, 17, 26, ...", accept: ["37"], explanation: "The differences between terms are 3, 5, 7, 9, 11 (odd numbers going up by 2 each time). The next difference is 11, so 26 + 11 = 37." }
    ]
  },
  {
    id: "maths-3",
    title: "Ratio & Proportion",
    questions: [
      { id: "m3q1", type: "short", prompt: "Share £60 in the ratio 2:3. What is the larger share, in pounds?", accept: ["36", "£36"], explanation: "There are 5 total parts, so one part = £60 ÷ 5 = £12. The larger share is 3 parts = 3 × £12 = £36." },
      { id: "m3q2", type: "mcq", prompt: "A recipe for 4 people needs 200g of flour. How much flour is needed for 10 people?", options: ["400g", "450g", "500g", "600g"], correctIndex: 2, explanation: "200g ÷ 4 = 50g per person. 50g × 10 = 500g." },
      { id: "m3q3", type: "short", prompt: "Increase £80 by 25%.", accept: ["100", "£100"], explanation: "25% of 80 = 20. 80 + 20 = 100." },
      { id: "m3q4", type: "short", prompt: "A car travels 150 miles in 3 hours. What is its average speed in mph?", accept: ["50"], explanation: "Speed = distance ÷ time = 150 ÷ 3 = 50 mph." },
      { id: "m3q5", type: "mcq", prompt: "Which is better value: 3kg of rice for £4.50, or 5kg of rice for £7.00?", options: ["3kg for £4.50", "5kg for £7.00", "They are the same value", "Cannot tell"], correctIndex: 1, explanation: "£4.50 ÷ 3 = £1.50 per kg. £7.00 ÷ 5 = £1.40 per kg. The 5kg bag is cheaper per kg." },
      { id: "m3q6", type: "short", prompt: "Convert 2.5 kg into grams.", accept: ["2500", "2500g"], explanation: "1 kg = 1000g, so 2.5 × 1000 = 2500g." },
      { id: "m3q7", type: "short", prompt: "Simplify the ratio 24:36 to its simplest form.", accept: ["2:3"], explanation: "The highest common factor of 24 and 36 is 12. 24 ÷ 12 = 2 and 36 ÷ 12 = 3." },
      { id: "m3q8", type: "short", prompt: "In a class, the ratio of boys to girls is 3:5. There are 15 girls. How many boys are there?", accept: ["9"], explanation: "15 girls ÷ 5 parts = 3 per part. Boys = 3 parts × 3 = 9." }
    ]
  },
  {
    id: "maths-4",
    title: "Geometry & Measures",
    questions: [
      { id: "m4q1", type: "short", prompt: "Find the size of an angle that is complementary to 35°.", accept: ["55", "55°"], explanation: "Complementary angles add up to 90°. 90 − 35 = 55°." },
      { id: "m4q2", type: "short", prompt: "The angles in a triangle are 50°, 65° and x°. Find x.", accept: ["65", "65°"], explanation: "Angles in a triangle sum to 180°. 180 − 50 − 65 = 65°." },
      { id: "m4q3", type: "short", prompt: "Find the area of a rectangle with length 8cm and width 5cm.", accept: ["40", "40cm2", "40cm^2"], explanation: "Area of a rectangle = length × width = 8 × 5 = 40cm²." },
      { id: "m4q4", type: "short", prompt: "Find the perimeter of a square with side length 6cm.", accept: ["24", "24cm"], explanation: "Perimeter of a square = 4 × side length = 4 × 6 = 24cm." },
      { id: "m4q5", type: "mcq", prompt: "A right-angled triangle has shorter sides 3cm and 4cm. What is the length of the hypotenuse?", options: ["5cm", "6cm", "7cm", "12cm"], correctIndex: 0, explanation: "By Pythagoras' theorem: 3² + 4² = 9 + 16 = 25. The square root of 25 is 5cm." },
      { id: "m4q6", type: "short", prompt: "Find the volume of a cuboid with length 4cm, width 3cm and height 2cm.", accept: ["24", "24cm3", "24cm^3"], explanation: "Volume of a cuboid = length × width × height = 4 × 3 × 2 = 24cm³." },
      { id: "m4q7", type: "short", prompt: "A circle has radius 7cm. Using π ≈ 22/7, find its circumference.", accept: ["44", "44cm"], explanation: "Circumference = 2πr = 2 × 22/7 × 7 = 44cm." },
      { id: "m4q8", type: "mcq", prompt: "What do we call a triangle with no equal sides and no equal angles?", options: ["Isosceles", "Equilateral", "Scalene", "Right-angled"], correctIndex: 2, explanation: "A scalene triangle has three different side lengths and three different angles." }
    ]
  },
  {
    id: "maths-5",
    title: "Probability & Statistics",
    questions: [
      { id: "m5q1", type: "short", prompt: "A bag has 4 red and 6 blue balls. What is the probability of picking a red ball? Give your answer as a fraction in simplest form.", accept: ["2/5"], explanation: "4 red out of 10 total balls = 4/10, which simplifies to 2/5." },
      { id: "m5q2", type: "short", prompt: "Find the mean of these numbers: 3, 7, 8, 10, 12.", accept: ["8"], explanation: "The total is 3+7+8+10+12 = 40. There are 5 numbers, so the mean is 40 ÷ 5 = 8." },
      { id: "m5q3", type: "short", prompt: "Find the median of these numbers: 5, 9, 2, 8, 6.", accept: ["6"], explanation: "Ordered: 2, 5, 6, 8, 9. The middle value is 6." },
      { id: "m5q4", type: "mcq", prompt: "Which measure of average is most affected by one extreme (very high or low) value?", options: ["Mean", "Median", "Mode", "Range"], correctIndex: 0, explanation: "The mean uses every value in its calculation, so one unusually large or small value pulls it a long way. The median and mode are much less affected." },
      { id: "m5q5", type: "short", prompt: "The probabilities of three outcomes are 0.2, 0.35 and x. The probabilities must sum to 1. Find x.", accept: ["0.45"], explanation: "1 − 0.2 − 0.35 = 0.45." },
      { id: "m5q6", type: "short", prompt: "Find the range of these numbers: 12, 5, 18, 9, 3.", accept: ["15"], explanation: "Range = largest − smallest = 18 − 3 = 15." },
      { id: "m5q7", type: "mcq", prompt: "On a scatter graph, points that slope upward from left to right show...", options: ["No correlation", "Negative correlation", "Positive correlation", "Zero correlation"], correctIndex: 2, explanation: "An upward trend means as one variable increases, so does the other — this is positive correlation." },
      { id: "m5q8", type: "short", prompt: "A fair six-sided dice is rolled once. What is the probability of rolling a number greater than 4? Give your answer as a fraction in simplest form.", accept: ["1/3"], explanation: "Numbers greater than 4 are 5 and 6 — that's 2 out of 6 outcomes, which simplifies to 1/3." }
    ]
  }
];
