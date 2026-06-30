import Link from "next/link";
import { promptConditionStats, db } from "@/lib/queries";

export default function PublicResearchPage() {
  const stats = [...promptConditionStats()].sort((a, b) => b.overall - a.overall);
  const best = stats[0];
  const baseline = promptConditionStats().find((s) => s.condition === "basic")!;

  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">Research</div>
      <h1 className="mt-2 text-3xl font-bold text-ink">Beyond Student Labels</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Does AI generate different-quality practice problems depending on how we describe the
        student&apos;s level, language background, or the prompt wording?
      </p>

      <div className="mt-8 card p-6">
        <h2 className="font-semibold text-ink">Method</h2>
        <p className="mt-2 text-sm text-ink-soft">
          We generate practice problems for the same set of topics under six prompt conditions, then
          have raters score each problem on an 8-dimension rubric (correctness, clarity, difficulty
          fit, language burden, scaffolding, tutor usefulness, cultural accessibility, and topic
          alignment). The platform stores {db.scores.length} rater-level scores across{" "}
          {db.problems.length} problems and exports the dataset for analysis.
        </p>
      </div>

      <div className="mt-6 card p-6">
        <h2 className="font-semibold text-ink">Early finding</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The <span className="font-medium text-brand">{best.label}</span> condition currently scores
          highest overall ({best.overall}/5), versus {baseline.overall}/5 for the unguided{" "}
          <span className="font-medium">Basic</span> baseline. Language-aware prompts gain the most on
          clarity and cultural accessibility - the dimensions that matter most for multilingual
          learners.
        </p>
        <div className="mt-4 space-y-2">
          {stats.map((s) => {
            const max = Math.max(...stats.map((x) => x.overall));
            return (
              <div key={s.condition} className="flex items-center gap-3">
                <div className="w-36 text-sm text-ink-soft">{s.label}</div>
                <div className="h-5 flex-1 overflow-hidden rounded bg-surface-2">
                  <div className="h-full rounded bg-brand" style={{ width: `${(s.overall / max) * 100}%` }} />
                </div>
                <div className="w-10 text-right text-sm font-medium tabular-nums text-ink">{s.overall}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface p-5 text-sm text-ink-soft">
        Want the full methodology and dataset?{" "}
        <Link href="/dashboard" className="font-medium text-brand hover:underline">
          Explore the live research workspace →
        </Link>
      </div>
    </div>
  );
}
