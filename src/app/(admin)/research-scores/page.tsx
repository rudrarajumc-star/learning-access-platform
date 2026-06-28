import { Card, Chip, PageHeader, ScoreBar } from "@/components/ui";
import { ConditionBar } from "@/components/charts";
import { db, promptConditionStats, topic } from "@/lib/queries";
import RubricForm from "./RubricForm";

export default function ResearchPage() {
  const stats = promptConditionStats();
  const best = [...stats].sort((a, b) => b.overall - a.overall)[0];
  const sampleProblem = db.problems[1];
  const sampleTopic = topic(sampleProblem.topicId);

  return (
    <div>
      <PageHeader
        title="Research scores"
        subtitle={`Beyond Student Labels — does prompt wording change AI practice-problem quality? n = ${db.scores.length} rubric ratings.`}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Overall quality by prompt condition" className="lg:col-span-2">
          <ConditionBar data={stats} />
          <p className="mt-3 text-xs text-ink-soft">
            <span className="font-medium text-ink">Finding:</span> the{" "}
            <span className="font-medium text-brand">{best.label}</span> condition scores highest
            overall ({best.overall}/5). Language-aware prompts (Multilingual, Simple English)
            consistently beat the Basic baseline on clarity and cultural accessibility — the
            dimensions that matter most for low-resource multilingual learners.
          </p>
        </Card>

        <Card title="Score a problem">
          <div className="mb-3 rounded-lg border border-border bg-surface-2 p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <Chip tone="brand">{sampleTopic?.name}</Chip>
              <Chip tone="good">AI-generated</Chip>
            </div>
            <p className="text-sm text-ink">{sampleProblem.problemText}</p>
          </div>
          <RubricForm problemId={sampleProblem.id} />
        </Card>
      </div>

      <Card title="Prompt condition comparison" className="mt-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="border-b border-border bg-surface-2/50">
              <tr>
                <th className="th">Prompt condition</th>
                <th className="th">n</th>
                <th className="th">Correctness</th>
                <th className="th">Clarity</th>
                <th className="th">Difficulty fit</th>
                <th className="th">Tutor usefulness</th>
                <th className="th">Cultural access</th>
                <th className="th">Overall</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => (
                <tr key={s.condition} className="border-b border-border last:border-0 hover:bg-surface-2/40">
                  <td className="td font-medium text-ink">{s.label}</td>
                  <td className="td tabular-nums">{s.n}</td>
                  <td className="td"><ScoreBar value={s.correctness} /></td>
                  <td className="td"><ScoreBar value={s.clarity} /></td>
                  <td className="td"><ScoreBar value={s.difficultyFit} /></td>
                  <td className="td"><ScoreBar value={s.tutorUsefulness} /></td>
                  <td className="td"><ScoreBar value={s.culturalAccessibility} /></td>
                  <td className="td font-semibold text-ink tabular-nums">{s.overall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Each cell is the mean rater score (1–5) across all problems generated under that
          condition. Export the full rater-level dataset from the Exports page for analysis.
        </p>
      </Card>
    </div>
  );
}
