"use client";

import { useMemo, useState } from "react";
import { Card, Chip } from "@/components/ui";
import { downloadCsv } from "@/lib/csv";

export interface ProblemRow {
  id: string;
  topic: string;
  subject: string;
  difficulty: number;
  languageLevel: string;
  promptCondition: string;
  generatedByAi: boolean;
  problemText: string;
  answer: string;
  explanation: string;
}

const condLabel: Record<string, string> = {
  basic: "Basic",
  grade_level: "Grade-level",
  multilingual_learner: "Multilingual",
  simple_english: "Simple English",
  culturally_accessible: "Culturally accessible",
  scaffolded_tutor: "Scaffolded",
};

const diffLabel = ["", "Easy", "Medium", "Hard"];

export default function PracticeClient({
  rows,
  topics,
}: {
  rows: ProblemRow[];
  topics: { name: string; subject: string }[];
}) {
  const [data, setData] = useState(rows);
  const [topicF, setTopicF] = useState("All");
  const [condF, setCondF] = useState("All");
  const [diffF, setDiffF] = useState("All");

  const filtered = useMemo(
    () =>
      data.filter(
        (r) =>
          (topicF === "All" || r.topic === topicF) &&
          (condF === "All" || r.promptCondition === condF) &&
          (diffF === "All" || diffLabel[r.difficulty] === diffF)
      ),
    [data, topicF, condF, diffF]
  );

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Generator
          topics={topics}
          onGenerate={(row) => setData((d) => [row, ...d])}
        />
      </div>

      <div className="lg:col-span-2">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <select className="input max-w-[150px]" value={topicF} onChange={(e) => setTopicF(e.target.value)}>
            <option>All</option>
            {topics.map((t) => <option key={t.name}>{t.name}</option>)}
          </select>
          <select className="input max-w-[160px]" value={condF} onChange={(e) => setCondF(e.target.value)}>
            <option value="All">All conditions</option>
            {Object.entries(condLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select className="input max-w-[120px]" value={diffF} onChange={(e) => setDiffF(e.target.value)}>
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-ink-faint">{filtered.length} problems</span>
            <button className="btn-ghost" onClick={() => downloadCsv("practice_problems", filtered as unknown as Record<string, unknown>[])}>
              Export CSV
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.slice(0, 40).map((r) => (
            <div key={r.id} className="card p-4">
              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                <Chip tone={r.subject === "Math" ? "brand" : "warn"}>{r.topic}</Chip>
                <Chip>{diffLabel[r.difficulty]}</Chip>
                <Chip>{r.languageLevel}</Chip>
                <Chip tone="brand">{condLabel[r.promptCondition] ?? r.promptCondition}</Chip>
                {r.generatedByAi && <Chip tone="good">AI-generated</Chip>}
                <span className="ml-auto font-mono text-[11px] text-ink-faint">{r.id}</span>
              </div>
              <p className="text-sm text-ink">{r.problemText}</p>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-xs font-medium text-brand">Show answer & explanation</summary>
                <div className="mt-2 rounded-lg bg-surface-2 p-3 text-ink-soft">
                  <div><span className="font-medium text-ink">Answer:</span> {r.answer}</div>
                  <div className="mt-1"><span className="font-medium text-ink">Explanation:</span> {r.explanation}</div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Generator({
  topics,
  onGenerate,
}: {
  topics: { name: string; subject: string }[];
  onGenerate: (r: ProblemRow) => void;
}) {
  const [topic, setTopic] = useState(topics[0].name);
  const [cond, setCond] = useState("multilingual_learner");
  const [diff, setDiff] = useState(2);
  const [lang, setLang] = useState("Simple English");
  const [busy, setBusy] = useState(false);

  const subject = topics.find((t) => t.name === topic)?.subject ?? "Math";

  const generate = () => {
    setBusy(true);
    // Drafts a new item under the chosen prompt condition and drops it into the
    // bank so it can be edited and scored. Wire this to your model endpoint to
    // pull real generations; the tagging stays the same either way.
    setTimeout(() => {
      onGenerate({
        id: `P-${Math.floor(1000 + Math.random() * 8999)}`,
        topic,
        subject,
        difficulty: diff,
        languageLevel: lang,
        promptCondition: cond,
        generatedByAi: true,
        problemText: `Draft ${topic.toLowerCase()} problem (${lang}, ${diffLabel[diff].toLowerCase()}). Open to edit the wording before assigning.`,
        answer: "fill in",
        explanation: "Add the worked solution, then score it on the Research page.",
      });
      setBusy(false);
    }, 600);
  };

  return (
    <Card title="Draft a problem with AI">
      <p className="mb-3 text-xs text-ink-soft">
        Pick a topic and how you want it framed. We save the prompt condition with the problem so
        we can compare them later.
      </p>
      <div className="space-y-3">
        <Field label="Topic">
          <select className="input" value={topic} onChange={(e) => setTopic(e.target.value)}>
            {topics.map((t) => <option key={t.name}>{t.name}</option>)}
          </select>
        </Field>
        <Field label="Prompt condition">
          <select className="input" value={cond} onChange={(e) => setCond(e.target.value)}>
            {Object.entries(condLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Difficulty">
            <select className="input" value={diff} onChange={(e) => setDiff(Number(e.target.value))}>
              <option value={1}>Easy</option>
              <option value={2}>Medium</option>
              <option value={3}>Hard</option>
            </select>
          </Field>
          <Field label="Language level">
            <select className="input" value={lang} onChange={(e) => setLang(e.target.value)}>
              <option>Emerging</option>
              <option>Simple English</option>
              <option>Developing</option>
              <option>Proficient</option>
            </select>
          </Field>
        </div>
        <button className="btn-primary w-full" onClick={generate} disabled={busy}>
          {busy ? "Drafting…" : "Draft problem"}
        </button>
      </div>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
