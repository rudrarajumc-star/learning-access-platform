import type {
  Center,
  Dataset,
  EnglishLevel,
  PracticeProblem,
  PromptCondition,
  RubricScore,
  Session,
  Student,
  SubjectName,
  Topic,
  Tutor,
} from "./types";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260623);
const pick = <T,>(arr: T[]) => arr[Math.floor(rnd() * arr.length)];
const between = (a: number, b: number) => Math.round(a + rnd() * (b - a));

const centers: Center[] = [
  { id: "HYD", name: "Hyderabad Center", city: "Hyderabad", region: "Telangana", country: "India" },
  { id: "POD", name: "Poduru Center", city: "Poduru", region: "Andhra Pradesh", country: "India" },
  { id: "BHI", name: "Bhimavaram Center", city: "Bhimavaram", region: "Andhra Pradesh", country: "India" },
];

const tutorNames = [
  "Rudra", "Anika", "Priya", "Karthik", "Meena", "Arjun", "Lakshmi", "Vivek",
];
const tutors: Tutor[] = tutorNames.map((name, i) => ({
  id: `T-${String(i + 1).padStart(2, "0")}`,
  name,
  subjects: (i % 3 === 0 ? ["Math", "English"] : i % 2 === 0 ? ["Math"] : ["English"]) as SubjectName[],
  languages: i % 2 === 0 ? ["Telugu", "English"] : ["Telugu", "Hindi", "English"],
  centerId: centers[i % centers.length].id,
  active: i !== 7,
}));

const topicSeed: [SubjectName, string, string, 1 | 2 | 3][] = [
  ["Math", "Fractions", "5-7", 2],
  ["Math", "Linear equations", "7-9", 3],
  ["Math", "Word problems", "5-8", 3],
  ["Math", "Decimals", "5-7", 1],
  ["Math", "Ratios & proportions", "6-8", 2],
  ["English", "Subject-verb agreement", "5-8", 2],
  ["English", "Reading inference", "6-9", 3],
  ["English", "Vocabulary", "5-9", 1],
  ["English", "Verb tense", "5-8", 2],
  ["English", "Pronouns", "5-7", 1],
];
const topics: Topic[] = topicSeed.map(([subject, name, gradeBand, difficulty], i) => ({
  id: `TP-${String(i + 1).padStart(2, "0")}`,
  subject,
  name,
  gradeBand,
  difficulty,
}));

const languages = ["Telugu", "Telugu", "Telugu", "Hindi", "Tamil"];
const englishLevels: EnglishLevel[] = ["Emerging", "Developing", "Proficient"];
const students: Student[] = [];
const perCenter = [42, 36, 26]
centers.forEach((center, ci) => {
  for (let n = 1; n <= perCenter[ci]; n++) {
    const baselineMath = between(38, 70);
    const baselineEnglish = between(35, 68);
    const growthM = between(4, 22);
    const growthE = between(3, 20);
    const status: Student["status"] = rnd() < 0.84 ? "active" : rnd() < 0.6 ? "paused" : "graduated";
    students.push({
      id: `${center.id}-${String(n).padStart(3, "0")}`,
      gradeLevel: between(4, 9),
      primaryLanguage: pick(languages),
      englishLevel: pick(englishLevels),
      centerId: center.id,
      joinDate: `2025-${String(between(8, 12)).padStart(2, "0")}-${String(between(1, 27)).padStart(2, "0")}`,
      baselineMath,
      baselineEnglish,
      currentMath: Math.min(98, baselineMath + growthM),
      currentEnglish: Math.min(98, baselineEnglish + growthE),
      status,
    });
  }
});

const weakAreasByTopic: Record<string, string[]> = {
  Fractions: ["common denominators", "mixed numbers", "fraction word problems"],
  "Linear equations": ["isolating variables", "two-step equations", "negative coefficients"],
  "Word problems": ["translating words to equations", "multi-step reasoning"],
  Decimals: ["place value", "decimal alignment"],
  "Ratios & proportions": ["setting up proportions", "unit rates"],
  "Subject-verb agreement": ["plural subjects", "collective nouns"],
  "Reading inference": ["implied meaning", "drawing conclusions"],
  Vocabulary: ["context clues", "academic words"],
  "Verb tense": ["past vs. present", "irregular verbs"],
  Pronouns: ["pronoun agreement", "ambiguous reference"],
};
const noteTemplates = [
  "Student understood the visual model but struggled to apply it to word problems.",
  "Good progress on the core skill; needs more reps with mixed examples.",
  "Confused two related concepts early, then self-corrected by the end.",
  "Strong engagement; ready to move to the next difficulty band.",
  "Language load was high - broke the problem into smaller steps.",
];
const nextSteps = [
  "Assign 5 scaffolded practice problems.",
  "Review prerequisite skill next session.",
  "Increase difficulty to grade-level set.",
  "Pair with a simple-English worksheet.",
  "Re-test the weak area in two sessions.",
];

const sessions: Session[] = [];
let sid = 1;
const endDate = new Date("2026-06-23");
const activeStudents = students.filter((s) => s.status !== "graduated");
for (let week = 0; week < 14; week++) {
  const sessionsThisWeek = between(24, 38);
  for (let k = 0; k < sessionsThisWeek; k++) {
    const student = pick(activeStudents);
    const tutor = pick(tutors.filter((t) => t.active));
    const subject: SubjectName = pick(tutor.subjects);
    const topic = pick(topics.filter((t) => t.subject === subject));
    const d = new Date(endDate);
    d.setDate(d.getDate() - (week * 7 + between(0, 6)));
    sessions.push({
      id: `S-${String(sid++).padStart(4, "0")}`,
      studentId: student.id,
      tutorId: tutor.id,
      date: d.toISOString().slice(0, 10),
      durationMinutes: pick([30, 45, 45, 60, 60, 90]),
      subject,
      topicId: topic.id,
      weakArea: pick(weakAreasByTopic[topic.name] ?? ["fundamentals"]),
      engagement: between(3, 5),
      notes: pick(noteTemplates),
      nextStep: pick(nextSteps),
    });
  }
}
sessions.sort((a, b) => (a.date < b.date ? 1 : -1));

const promptConditions: PromptCondition[] = [
  "basic",
  "grade_level",
  "multilingual_learner",
  "simple_english",
  "culturally_accessible",
  "scaffolded_tutor",
];
const sampleProblems: Record<string, { p: string; a: string; e: string }> = {
  Fractions: {
    p: "A student has 1/3 of a notebook filled and then fills 1/6 more. How much of the notebook is filled now?",
    a: "1/2",
    e: "1/3 = 2/6. 2/6 + 1/6 = 3/6 = 1/2.",
  },
  "Linear equations": {
    p: "Solve for x:  3x + 4 = 19.",
    a: "x = 5",
    e: "Subtract 4 from both sides: 3x = 15. Divide by 3: x = 5.",
  },
  "Word problems": {
    p: "A bus travels 40 km in the morning and 25 km in the evening. How far does it travel in 5 days?",
    a: "325 km",
    e: "Per day: 40 + 25 = 65 km. Over 5 days: 65 × 5 = 325 km.",
  },
  "Reading inference": {
    p: "Ravi packed an umbrella and rubber boots before leaving. What can you infer about the weather?",
    a: "It is likely going to rain.",
    e: "Umbrellas and rubber boots are used in rain, so the clues imply wet weather.",
  },
  "Subject-verb agreement": {
    p: "Choose the correct verb: The group of students (is / are) ready.",
    a: "is",
    e: "\"Group\" is a singular collective noun, so it takes the singular verb \"is.\"",
  },
};
const problems: PracticeProblem[] = [];
let pid = 1;
topics.forEach((topic) => {
  const base = sampleProblems[topic.name] ?? {
    p: `Practice item for ${topic.name}.`,
    a: "-",
    e: "Worked solution provided to the tutor.",
  };
  promptConditions.forEach((cond) => {
    const copies = cond === "basic" || cond === "grade_level" ? 2 : 1;
    for (let c = 0; c < copies; c++) {
      problems.push({
        id: `P-${String(pid++).padStart(4, "0")}`,
        topicId: topic.id,
        difficulty: topic.difficulty,
        languageLevel: pick(englishLevels),
        promptCondition: cond,
        generatedByAi: cond !== "basic" || rnd() > 0.3,
        problemText: base.p,
        answer: base.a,
        explanation: base.e,
      });
    }
  });
});

const conditionProfile: Record<PromptCondition, Partial<Record<keyof RubricScore, number>>> = {
  basic: { clarity: 3.7, difficultyFit: 3.2, tutorUsefulness: 3.4, culturalAccessibility: 3.5, correctness: 4.4 },
  grade_level: { clarity: 4.0, difficultyFit: 4.1, tutorUsefulness: 3.8, culturalAccessibility: 3.7, correctness: 4.5 },
  multilingual_learner: { clarity: 4.4, difficultyFit: 4.0, tutorUsefulness: 4.2, culturalAccessibility: 4.4, correctness: 4.3 },
  simple_english: { clarity: 4.6, difficultyFit: 3.8, tutorUsefulness: 4.1, culturalAccessibility: 4.3, correctness: 4.4 },
  culturally_accessible: { clarity: 4.2, difficultyFit: 3.6, tutorUsefulness: 4.0, culturalAccessibility: 4.6, correctness: 4.1 },
  scaffolded_tutor: { clarity: 4.3, difficultyFit: 4.4, tutorUsefulness: 4.6, culturalAccessibility: 4.2, correctness: 4.5 },
};
const scorers = ["R. Rudraraju", "A. Sharma", "Volunteer Panel"];
const jitter = (mean: number) => Math.max(1, Math.min(5, Math.round((mean + (rnd() - 0.5) * 0.9) * 10) / 10));
const scores: RubricScore[] = [];
let rsid = 1;
problems.forEach((prob) => {
  const profile = conditionProfile[prob.promptCondition];
  const raters = between(1, 2);
  for (let r = 0; r < raters; r++) {
    const clarity = jitter(profile.clarity ?? 4);
    scores.push({
      id: `RS-${String(rsid++).padStart(4, "0")}`,
      problemId: prob.id,
      scorer: pick(scorers),
      correctness: jitter(profile.correctness ?? 4.3),
      topicAlignment: jitter(4.2),
      difficultyFit: jitter(profile.difficultyFit ?? 3.8),
      clarity,
      languageBurden: jitter(6 - (profile.culturalAccessibility ?? 4)),
      scaffolding: jitter(prob.promptCondition === "scaffolded_tutor" ? 4.6 : 3.6),
      tutorUsefulness: jitter(profile.tutorUsefulness ?? 3.8),
      culturalAccessibility: jitter(profile.culturalAccessibility ?? 3.8),
      errorFlag: rnd() < 0.05,
    });
  }
});

export const dataset: Dataset = {
  centers,
  tutors,
  students,
  topics,
  sessions,
  problems,
  scores,
};
