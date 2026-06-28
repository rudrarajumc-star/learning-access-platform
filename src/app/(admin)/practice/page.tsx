import { PageHeader } from "@/components/ui";
import { db, topic } from "@/lib/queries";
import PracticeClient, { ProblemRow } from "./PracticeClient";

export default function PracticePage() {
  const rows: ProblemRow[] = db.problems.map((p) => {
    const t = topic(p.topicId);
    return {
      id: p.id,
      topic: t?.name ?? "",
      subject: t?.subject ?? "Math",
      difficulty: p.difficulty,
      languageLevel: p.languageLevel,
      promptCondition: p.promptCondition,
      generatedByAi: p.generatedByAi,
      problemText: p.problemText,
      answer: p.answer,
      explanation: p.explanation,
    };
  });

  return (
    <div>
      <PageHeader
        title="Practice problem bank"
        subtitle="Human- and AI-authored problems, tagged by topic, difficulty, language level, and prompt condition."
      />
      <PracticeClient rows={rows} topics={db.topics.map((t) => ({ name: t.name, subject: t.subject }))} />
    </div>
  );
}
