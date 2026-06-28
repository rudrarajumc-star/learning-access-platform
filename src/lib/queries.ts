import { dataset } from "./seed";
import type { PromptCondition, RubricScore, Student } from "./types";

export const db = dataset;

export const centerName = (id: string) => db.centers.find((c) => c.id === id)?.name ?? id;
export const tutorName = (id: string) => db.tutors.find((t) => t.id === id)?.name ?? id;
export const topic = (id: string) => db.topics.find((t) => t.id === id);
export const student = (id: string) => db.students.find((s) => s.id === id);

export const improvement = (s: Student) =>
  Math.round(
    ((s.currentMath - s.baselineMath) + (s.currentEnglish - s.baselineEnglish)) / 2
  );

export function kpis() {
  const totalMinutes = db.sessions.reduce((a, s) => a + s.durationMinutes, 0);
  const improvements = db.students.map(improvement);
  return {
    totalStudents: db.students.length,
    activeStudents: db.students.filter((s) => s.status === "active").length,
    totalSessions: db.sessions.length,
    totalHours: Math.round(totalMinutes / 60),
    activeTutors: db.tutors.filter((t) => t.active).length,
    centers: db.centers.length,
    problems: db.problems.length,
    avgImprovement: Math.round(improvements.reduce((a, b) => a + b, 0) / improvements.length),
  };
}

export function sessionsByWeek() {
  const buckets = new Map<string, number>();
  for (const s of db.sessions) {
    const d = new Date(s.date);
    const day = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((day + 6) % 7));
    const key = monday.toISOString().slice(0, 10);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([week, sessions]) => ({
      week: new Date(week).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sessions,
    }));
}

export function studentsByCenter() {
  return db.centers.map((c) => ({
    center: c.city,
    students: db.students.filter((s) => s.centerId === c.id).length,
  }));
}

export function weakTopics() {
  const rows = db.topics.map((t) => {
    const mentions = db.sessions.filter((s) => s.topicId === t.id);
    const studentsAffected = new Set(mentions.map((s) => s.studentId)).size;
    return {
      topicId: t.id,
      topic: t.name,
      subject: t.subject,
      studentsAffected,
      sessions: mentions.length,
      suggested: `${t.name} practice set`,
    };
  });
  return rows.sort((a, b) => b.sessions - a.sessions);
}

export function tutorHours() {
  return db.tutors
    .map((t) => ({
      tutor: t.name,
      hours: Math.round(
        db.sessions.filter((s) => s.tutorId === t.id).reduce((a, s) => a + s.durationMinutes, 0) / 60
      ),
    }))
    .sort((a, b) => b.hours - a.hours);
}

export function improvementBySubject() {
  const avg = (sel: (s: Student) => number) =>
    Math.round((db.students.reduce((a, s) => a + sel(s), 0) / db.students.length) * 10) / 10;
  return [
    { subject: "Math", baseline: avg((s) => s.baselineMath), current: avg((s) => s.currentMath) },
    { subject: "English", baseline: avg((s) => s.baselineEnglish), current: avg((s) => s.currentEnglish) },
  ];
}

const RUBRIC_KEYS: (keyof RubricScore)[] = [
  "correctness",
  "topicAlignment",
  "difficultyFit",
  "clarity",
  "scaffolding",
  "tutorUsefulness",
  "culturalAccessibility",
];

export function promptConditionStats() {
  const conditions: PromptCondition[] = [
    "basic",
    "grade_level",
    "multilingual_learner",
    "simple_english",
    "culturally_accessible",
    "scaffolded_tutor",
  ];
  const labels: Record<PromptCondition, string> = {
    basic: "Basic",
    grade_level: "Grade-level",
    multilingual_learner: "Multilingual",
    simple_english: "Simple English",
    culturally_accessible: "Culturally accessible",
    scaffolded_tutor: "Scaffolded",
  };
  return conditions.map((cond) => {
    const problemIds = new Set(db.problems.filter((p) => p.promptCondition === cond).map((p) => p.id));
    const rows = db.scores.filter((s) => problemIds.has(s.problemId));
    const mean = (k: keyof RubricScore) =>
      rows.length
        ? Math.round((rows.reduce((a, r) => a + (r[k] as number), 0) / rows.length) * 10) / 10
        : 0;
    return {
      condition: cond,
      label: labels[cond],
      n: rows.length,
      correctness: mean("correctness"),
      clarity: mean("clarity"),
      difficultyFit: mean("difficultyFit"),
      tutorUsefulness: mean("tutorUsefulness"),
      culturalAccessibility: mean("culturalAccessibility"),
      overall:
        Math.round(
          (RUBRIC_KEYS.reduce((a, k) => a + mean(k), 0) / RUBRIC_KEYS.length) * 10
        ) / 10,
    };
  });
}

export function recentActivity() {
  return db.sessions.slice(0, 6).map((s) => {
    const t = topic(s.topicId);
    return {
      id: s.id,
      student: s.studentId,
      tutor: tutorName(s.tutorId),
      text: `${t?.name ?? s.subject} session · ${s.durationMinutes} min · weak area: ${s.weakArea}`,
      date: s.date,
    };
  });
}
