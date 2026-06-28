export type Section = "Math" | "Reading & Writing";

export interface Question {
  id: string;
  section: Section;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  passage?: string;
  prompt: string;
  choices: string[];
  answer: number; // index into choices
  explanation: string;
}

export const QUESTIONS: Question[] = [
  // ---------------------------------------------------------------- Math ----
  {
    id: "m1",
    section: "Math",
    category: "Algebra",
    difficulty: "Easy",
    prompt: "If 3x + 7 = 22, what is the value of x?",
    choices: ["3", "5", "7", "15"],
    answer: 1,
    explanation: "Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.",
  },
  {
    id: "m2",
    section: "Math",
    category: "Algebra",
    difficulty: "Medium",
    prompt:
      "A gym charges a $25 sign-up fee plus $15 per month. Which equation gives the total cost C after m months?",
    choices: ["C = 15m", "C = 25m + 15", "C = 15m + 25", "C = 40m"],
    answer: 2,
    explanation:
      "The $15 is charged each month (15m) and the $25 fee is one time, so C = 15m + 25.",
  },
  {
    id: "m3",
    section: "Math",
    category: "Problem Solving",
    difficulty: "Medium",
    prompt: "A shirt that costs $40 is discounted by 25%. What is the sale price?",
    choices: ["$10", "$30", "$32", "$15"],
    answer: 1,
    explanation: "A 25% discount leaves 75%. 40 × 0.75 = $30.",
  },
  {
    id: "m4",
    section: "Math",
    category: "Problem Solving",
    difficulty: "Medium",
    prompt:
      "In a class the ratio of girls to boys is 3 to 2. If there are 30 students total, how many are boys?",
    choices: ["10", "12", "15", "18"],
    answer: 1,
    explanation:
      "3 + 2 = 5 parts. 30 ÷ 5 = 6 students per part. Boys = 2 parts = 2 × 6 = 12.",
  },
  {
    id: "m5",
    section: "Math",
    category: "Algebra",
    difficulty: "Medium",
    prompt: "If 2x + y = 11 and y = x − 1, what is the value of x?",
    choices: ["3", "4", "5", "6"],
    answer: 1,
    explanation:
      "Substitute y: 2x + (x − 1) = 11 → 3x − 1 = 11 → 3x = 12 → x = 4.",
  },
  {
    id: "m6",
    section: "Math",
    category: "Advanced Math",
    difficulty: "Hard",
    prompt: "What are the solutions to x² − 5x + 6 = 0?",
    choices: ["−2 and −3", "2 and 3", "1 and 6", "−1 and 6"],
    answer: 1,
    explanation: "Factor: (x − 2)(x − 3) = 0, so x = 2 or x = 3.",
  },
  {
    id: "m7",
    section: "Math",
    category: "Data Analysis",
    difficulty: "Medium",
    prompt:
      "The average of 5 numbers is 12. Four of them are 10, 11, 13, and 14. What is the fifth number?",
    choices: ["10", "12", "14", "18"],
    answer: 1,
    explanation:
      "Total must be 5 × 12 = 60. The four known values sum to 48, so the fifth is 60 − 48 = 12.",
  },
  {
    id: "m8",
    section: "Math",
    category: "Algebra",
    difficulty: "Medium",
    prompt: "What is the slope of the line passing through (1, 2) and (4, 11)?",
    choices: ["1/3", "2", "3", "4"],
    answer: 2,
    explanation: "Slope = (11 − 2) / (4 − 1) = 9 / 3 = 3.",
  },
  {
    id: "m9",
    section: "Math",
    category: "Advanced Math",
    difficulty: "Medium",
    prompt: "If 2ˣ = 32, what is the value of x?",
    choices: ["4", "5", "6", "16"],
    answer: 1,
    explanation: "32 = 2 × 2 × 2 × 2 × 2 = 2⁵, so x = 5.",
  },
  {
    id: "m10",
    section: "Math",
    category: "Geometry",
    difficulty: "Medium",
    prompt:
      "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
    choices: ["10", "12", "14", "48"],
    answer: 0,
    explanation: "By the Pythagorean theorem: √(6² + 8²) = √(36 + 64) = √100 = 10.",
  },

  // ---------------------------------------------------- Reading & Writing ----
  {
    id: "w1",
    section: "Reading & Writing",
    category: "Grammar",
    difficulty: "Easy",
    prompt: "Choose the option that makes the sentence grammatically correct:\n\nThe list of approved items ___ posted near the door.",
    choices: ["are", "is", "were", "have been"],
    answer: 1,
    explanation:
      "The subject is \"list\" (singular), not \"items.\" A singular subject takes \"is.\"",
  },
  {
    id: "w2",
    section: "Reading & Writing",
    category: "Grammar",
    difficulty: "Medium",
    prompt: "Which sentence is punctuated correctly?",
    choices: [
      "After the storm passed we went outside.",
      "After the storm passed, we went outside.",
      "After the storm, passed we went outside.",
      "After, the storm passed we went outside.",
    ],
    answer: 1,
    explanation:
      "An introductory clause (\"After the storm passed\") is followed by a comma before the main clause.",
  },
  {
    id: "w3",
    section: "Reading & Writing",
    category: "Grammar",
    difficulty: "Medium",
    prompt:
      "Maya studied for weeks. ___, she felt confident on test day.\n\nWhich transition best fits the blank?",
    choices: ["However", "As a result", "Nevertheless", "In contrast"],
    answer: 1,
    explanation:
      "Studying caused her confidence — a cause-and-effect relationship — so \"As a result\" fits.",
  },
  {
    id: "w4",
    section: "Reading & Writing",
    category: "Grammar",
    difficulty: "Medium",
    prompt: "The coach gave the trophy to Jamal and ___.",
    choices: ["I", "me", "myself", "mine"],
    answer: 1,
    explanation:
      "The pronoun is the object of \"to,\" so use the object form \"me\" (the coach gave it to me).",
  },
  {
    id: "w5",
    section: "Reading & Writing",
    category: "Grammar",
    difficulty: "Medium",
    prompt: "By the time we arrived, the movie ___ already started.",
    choices: ["has", "had", "have", "having"],
    answer: 1,
    explanation:
      "An action completed before another past action uses the past perfect: \"had already started.\"",
  },
  {
    id: "w6",
    section: "Reading & Writing",
    category: "Grammar",
    difficulty: "Hard",
    prompt: "Which version is the clearest and most concise?",
    choices: [
      "Due to the fact that it rained, the game was canceled.",
      "Because it rained, the game was canceled.",
      "On account of the fact that it rained, the game was canceled.",
      "Owing to the reason that it rained, the game was canceled.",
    ],
    answer: 1,
    explanation:
      "\"Because\" says the same thing without wordy filler. The SAT rewards concision.",
  },
  {
    id: "r1",
    section: "Reading & Writing",
    category: "Reading",
    difficulty: "Medium",
    passage:
      "The new library policy extends weekend hours, a change librarians hoped would draw more students. In the first month, weekend visits rose by nearly a third.",
    prompt: "The passage most strongly suggests that the policy:",
    choices: [
      "failed to attract students",
      "had its intended effect",
      "was unpopular with librarians",
      "reduced weekday visits",
    ],
    answer: 1,
    explanation:
      "Librarians hoped to draw more students, and visits rose by nearly a third — so it did what they intended.",
  },
  {
    id: "r2",
    section: "Reading & Writing",
    category: "Reading",
    difficulty: "Medium",
    passage:
      "Her argument was so cogent that even her sharpest critics found themselves nodding in agreement.",
    prompt: "As used in the sentence, \"cogent\" most nearly means:",
    choices: ["confusing", "convincing", "lengthy", "quiet"],
    answer: 1,
    explanation:
      "If critics end up agreeing, the argument was persuasive. \"Cogent\" means clear and convincing.",
  },
  {
    id: "r3",
    section: "Reading & Writing",
    category: "Reading",
    difficulty: "Easy",
    passage:
      "Diego glanced at the gray sky, grabbed his umbrella, and double-knotted his rain boots before stepping outside.",
    prompt: "It can reasonably be inferred that Diego:",
    choices: [
      "is going to the beach",
      "expects rain",
      "is late for school",
      "dislikes walking",
    ],
    answer: 1,
    explanation:
      "A gray sky, an umbrella, and rain boots all point to one inference: he expects rain.",
  },
  {
    id: "r4",
    section: "Reading & Writing",
    category: "Reading",
    difficulty: "Hard",
    passage:
      "While solar panels require a significant upfront cost, they typically pay for themselves within a decade and then provide low-cost energy for many years afterward.",
    prompt: "Which choice best states the main idea?",
    choices: [
      "Solar panels are too expensive to be worthwhile.",
      "Solar panels offer long-term savings despite a high initial cost.",
      "Solar panels work only in sunny climates.",
      "Solar panels are cheaper than every other energy source.",
    ],
    answer: 1,
    explanation:
      "The sentence concedes the high upfront cost but emphasizes that panels pay off and then save money — a long-term benefit.",
  },
];
