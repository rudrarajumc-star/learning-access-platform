"use client";

import { useMemo, useState } from "react";
import { Chip } from "@/components/ui";
import { downloadCsv } from "@/lib/csv";

export interface SessionRow {
  id: string;
  date: string;
  student: string;
  tutor: string;
  subject: string;
  topic: string;
  weakArea: string;
  duration: number;
  engagement: number;
  notes: string;
  nextStep: string;
}

export default function SessionsClient({
  rows,
  students,
  tutors,
  topics,
}: {
  rows: SessionRow[];
  students: string[];
  tutors: string[];
  topics: { name: string; subject: string }[];
}) {
  const [data, setData] = useState(rows);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () =>
      data.filter(
        (r) =>
          q === "" ||
          [r.student, r.tutor, r.topic, r.weakArea].some((v) =>
            v.toLowerCase().includes(q.toLowerCase())
          )
      ),
    [data, q]
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          className="input max-w-sm"
          placeholder="Search sessions by student, tutor, topic…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="text-xs text-ink-faint">{filtered.length} sessions</span>
        <div className="ml-auto flex gap-2">
          <button
            className="btn-ghost"
            onClick={() => downloadCsv("sessions", filtered as unknown as Record<string, unknown>[])}
          >
            Export CSV
          </button>
          <button className="btn-primary" onClick={() => setOpen(true)}>
            + Log session
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="border-b border-border bg-surface-2/50">
              <tr>
                <th className="th">Date</th>
                <th className="th">Student</th>
                <th className="th">Tutor</th>
                <th className="th">Topic</th>
                <th className="th">Weak area</th>
                <th className="th">Min</th>
                <th className="th">Engage</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-2/40">
                  <td className="td whitespace-nowrap">{r.date}</td>
                  <td className="td font-mono text-ink">{r.student}</td>
                  <td className="td">{r.tutor}</td>
                  <td className="td">
                    <Chip tone={r.subject === "Math" ? "brand" : "warn"}>{r.subject}</Chip>{" "}
                    <span className="text-ink">{r.topic}</span>
                  </td>
                  <td className="td">{r.weakArea}</td>
                  <td className="td tabular-nums">{r.duration}</td>
                  <td className="td tabular-nums">{r.engagement}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <LogSessionModal
          students={students}
          tutors={tutors}
          topics={topics}
          onClose={() => setOpen(false)}
          onSave={(row) => {
            setData((d) => [row, ...d]);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function LogSessionModal({
  students,
  tutors,
  topics,
  onClose,
  onSave,
}: {
  students: string[];
  tutors: string[];
  topics: { name: string; subject: string }[];
  onClose: () => void;
  onSave: (r: SessionRow) => void;
}) {
  const [form, setForm] = useState({
    student: students[0],
    tutor: tutors[0],
    date: "2026-06-23",
    topic: topics[0].name,
    weakArea: "",
    duration: 60,
    engagement: 4,
    notes: "",
    nextStep: "",
  });
  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));
  const subject = topics.find((t) => t.name === form.topic)?.subject ?? "Math";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="card w-full max-w-lg p-5 fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Log tutoring session</h2>
          <button className="text-ink-faint hover:text-ink" onClick={onClose}>✕</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Student">
            <select className="input" value={form.student} onChange={(e) => set("student", e.target.value)}>
              {students.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Tutor">
            <select className="input" value={form.tutor} onChange={(e) => set("tutor", e.target.value)}>
              {tutors.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Date">
            <input type="date" className="input" value={form.date} onChange={(e) => set("date", e.target.value)} />
          </Field>
          <Field label="Topic">
            <select className="input" value={form.topic} onChange={(e) => set("topic", e.target.value)}>
              {topics.map((t) => <option key={t.name}>{t.name}</option>)}
            </select>
          </Field>
          <Field label="Weak area">
            <input className="input" placeholder="e.g. common denominators" value={form.weakArea} onChange={(e) => set("weakArea", e.target.value)} />
          </Field>
          <Field label="Duration (min)">
            <input type="number" className="input" value={form.duration} onChange={(e) => set("duration", Number(e.target.value))} />
          </Field>
          <Field label="Engagement (1–5)">
            <input type="number" min={1} max={5} className="input" value={form.engagement} onChange={(e) => set("engagement", Number(e.target.value))} />
          </Field>
          <Field label="Next step">
            <input className="input" placeholder="e.g. assign 5 scaffolded problems" value={form.nextStep} onChange={(e) => set("nextStep", e.target.value)} />
          </Field>
          <div className="col-span-2">
            <Field label="Notes">
              <textarea className="input" rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
            </Field>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            onClick={() =>
              onSave({
                id: `S-NEW-${Math.floor(Math.random() * 9999)}`,
                date: form.date,
                student: form.student,
                tutor: form.tutor,
                subject,
                topic: form.topic,
                weakArea: form.weakArea || "—",
                duration: form.duration,
                engagement: form.engagement,
                notes: form.notes,
                nextStep: form.nextStep,
              })
            }
          >
            Save session
          </button>
        </div>
      </div>
    </div>
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
