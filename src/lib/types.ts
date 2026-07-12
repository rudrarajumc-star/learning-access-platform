export type SubjectName = "Math" | "English";

export type EnglishLevel = "Emerging" | "Developing" | "Proficient";

export type PromptCondition =
  | "basic"
  | "grade_level"
  | "multilingual_learner"
  | "simple_english"
  | "culturally_accessible"
  | "scaffolded_tutor";

export interface Center {
  id: string;
  name: string;
  city: string;
  region: string;
  country: string;
}

export interface Tutor {
  id: string;
  name: string;
  subjects: SubjectName[];
  languages: string[];
  centerId: string;
  active: boolean;
}

export interface Student {
  id: string;
  gradeLevel: number;
  primaryLanguage: string;
  englishLevel: EnglishLevel;
  centerId: string;
  joinDate: string;
  baselineMath: number;
  baselineEnglish: number;
  currentMath: number;
  currentEnglish: number;
  status: "active" | "paused" | "graduated";
}

export interface Topic {
  id: string;
  subject: SubjectName;
  name: string;
  gradeBand: string;
  difficulty: 1 | 2 | 3;
}

export interface Session {
  id: string;
  studentId: string;
  tutorId: string;
  date: string;
  durationMinutes: number;
  subject: SubjectName;
  topicId: string;
  weakArea: string;
  engagement: number;
  notes: string;
  nextStep: string;
}

export interface PracticeProblem {
  id: string;
  topicId: string;
  difficulty: 1 | 2 | 3;
  languageLevel: EnglishLevel;
  promptCondition: PromptCondition;
  generatedByAi: boolean;
  problemText: string;
  answer: string;
  explanation: string;
}

export interface RubricScore {
  id: string;
  problemId: string;
  scorer: string;
  correctness: number;
  topicAlignment: number;
  difficultyFit: number;
  clarity: number;
  languageBurden: number;
  scaffolding: number;
  tutorUsefulness: number;
  culturalAccessibility: number;
  errorFlag: boolean;
}

export interface Dataset {
  centers: Center[];
  tutors: Tutor[];
  students: Student[];
  topics: Topic[];
  sessions: Session[];
  problems: PracticeProblem[];
  scores: RubricScore[];
}
