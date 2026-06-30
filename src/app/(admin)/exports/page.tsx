import { PageHeader } from "@/components/ui";
import { centerName, db, improvement, topic, tutorName } from "@/lib/queries";
import ExportClient from "./ExportClient";

export default function ExportsPage() {
  const exports = [
    {
      key: "students",
      label: "Students",
      description: "Anonymized learner records with baseline/current scores and improvement.",
      rows: db.students.map((s) => ({
        code: s.id,
        grade: s.gradeLevel,
        language: s.primaryLanguage,
        english_level: s.englishLevel,
        center: centerName(s.centerId),
        status: s.status,
        baseline_math: s.baselineMath,
        current_math: s.currentMath,
        baseline_english: s.baselineEnglish,
        current_english: s.currentEnglish,
        improvement: improvement(s),
      })),
    },
    {
      key: "tutors",
      label: "Tutors",
      description: "Tutor roster with subjects, languages, and total logged hours.",
      rows: db.tutors.map((t) => ({
        id: t.id,
        name: t.name,
        center: centerName(t.centerId),
        subjects: t.subjects.join("|"),
        languages: t.languages.join("|"),
        active: t.active,
        hours: Math.round(db.sessions.filter((s) => s.tutorId === t.id).reduce((a, s) => a + s.durationMinutes, 0) / 60),
      })),
    },
    {
      key: "sessions",
      label: "Sessions",
      description: "Full session log - topic, weak area, engagement, and next step.",
      rows: db.sessions.map((s) => ({
        id: s.id,
        date: s.date,
        student: s.studentId,
        tutor: tutorName(s.tutorId),
        subject: s.subject,
        topic: topic(s.topicId)?.name,
        weak_area: s.weakArea,
        duration_min: s.durationMinutes,
        engagement: s.engagement,
        next_step: s.nextStep,
      })),
    },
    {
      key: "weak_topics",
      label: "Weak topics",
      description: "Aggregated weak-topic counts across all sessions.",
      rows: db.topics.map((t) => ({
        topic: t.name,
        subject: t.subject,
        students_affected: new Set(db.sessions.filter((s) => s.topicId === t.id).map((s) => s.studentId)).size,
        sessions: db.sessions.filter((s) => s.topicId === t.id).length,
      })),
    },
    {
      key: "practice_problems",
      label: "Practice problems",
      description: "Problem bank with topic, difficulty, language level, and prompt condition.",
      rows: db.problems.map((p) => ({
        id: p.id,
        topic: topic(p.topicId)?.name,
        difficulty: p.difficulty,
        language_level: p.languageLevel,
        prompt_condition: p.promptCondition,
        ai_generated: p.generatedByAi,
        problem: p.problemText,
        answer: p.answer,
      })),
    },
    {
      key: "research_dataset",
      label: "Research dataset",
      description: "Rater-level rubric scores joined to prompt condition - ready for analysis.",
      rows: db.scores.map((r) => {
        const p = db.problems.find((x) => x.id === r.problemId);
        return {
          score_id: r.id,
          problem_id: r.problemId,
          prompt_condition: p?.promptCondition,
          topic: topic(p?.topicId ?? "")?.name,
          scorer: r.scorer,
          correctness: r.correctness,
          topic_alignment: r.topicAlignment,
          difficulty_fit: r.difficultyFit,
          clarity: r.clarity,
          language_burden: r.languageBurden,
          scaffolding: r.scaffolding,
          tutor_usefulness: r.tutorUsefulness,
          cultural_accessibility: r.culturalAccessibility,
          error_flag: r.errorFlag,
        };
      }),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Exports"
        subtitle="Pull any table as a CSV for reports, grant write-ups, or digging into the research data."
      />
      <ExportClient exports={exports} />
    </div>
  );
}
