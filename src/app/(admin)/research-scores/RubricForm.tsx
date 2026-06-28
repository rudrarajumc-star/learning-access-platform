"use client";

import { useState } from "react";

const criteria = [
  "Correctness",
  "Topic alignment",
  "Difficulty fit",
  "Clarity",
  "Language accessibility",
  "Scaffolding",
  "Tutor usefulness",
  "Cultural accessibility",
];

export default function RubricForm({ problemId }: { problemId: string }) {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(criteria.map((c) => [c, 4]))
  );
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <div className="space-y-2.5">
        {criteria.map((c) => (
          <div key={c} className="flex items-center justify-between gap-3">
            <span className="text-sm text-ink-soft">{c}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setScores((s) => ({ ...s, [c]: n }));
                    setSaved(false);
                  }}
                  className={`h-7 w-7 rounded-md text-xs font-medium transition-colors ${
                    scores[c] === n
                      ? "bg-brand text-white"
                      : "bg-surface-2 text-ink-soft hover:bg-border"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-ink-faint">Scoring {problemId}</span>
        <button
          className="btn-primary"
          onClick={() => setSaved(true)}
        >
          {saved ? "✓ Saved to dataset" : "Save scores"}
        </button>
      </div>
    </div>
  );
}
