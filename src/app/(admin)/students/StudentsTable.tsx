"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Chip } from "@/components/ui";
import { downloadCsv } from "@/lib/csv";

export interface StudentRow {
  id: string;
  grade: number;
  language: string;
  english: string;
  center: string;
  status: string;
  baseline: number;
  current: number;
  improvement: number;
}

const statusTone: Record<string, "good" | "warn" | "neutral"> = {
  active: "good",
  paused: "warn",
  graduated: "neutral",
};

export default function StudentsTable({ rows }: { rows: StudentRow[] }) {
  const [q, setQ] = useState("");
  const [center, setCenter] = useState("All");
  const [status, setStatus] = useState("All");

  const centers = ["All", ...Array.from(new Set(rows.map((r) => r.center)))];
  const statuses = ["All", "active", "paused", "graduated"];

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (center === "All" || r.center === center) &&
          (status === "All" || r.status === status) &&
          (q === "" ||
            r.id.toLowerCase().includes(q.toLowerCase()) ||
            r.language.toLowerCase().includes(q.toLowerCase()))
      ),
    [rows, q, center, status]
  );

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        <input
          className="input max-w-xs"
          placeholder="Search by code or language…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="input max-w-[160px]" value={center} onChange={(e) => setCenter(e.target.value)}>
          {centers.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select className="input max-w-[140px]" value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-ink-faint">{filtered.length} students</span>
          <button
            className="btn-ghost"
            onClick={() => downloadCsv("students", filtered as unknown as Record<string, unknown>[])}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="border-b border-border bg-surface-2/50">
            <tr>
              <th className="th">Code</th>
              <th className="th">Grade</th>
              <th className="th">Language</th>
              <th className="th">English</th>
              <th className="th">Center</th>
              <th className="th">Status</th>
              <th className="th">Improvement</th>
              <th className="th"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-2/40">
                <td className="td font-mono font-medium text-ink">{r.id}</td>
                <td className="td">{r.grade}</td>
                <td className="td">{r.language}</td>
                <td className="td">{r.english}</td>
                <td className="td">{r.center}</td>
                <td className="td">
                  <Chip tone={statusTone[r.status] ?? "neutral"}>{r.status}</Chip>
                </td>
                <td className="td">
                  <span className={r.improvement >= 0 ? "font-medium text-good" : "text-bad"}>
                    {r.improvement >= 0 ? "+" : ""}
                    {r.improvement}
                  </span>{" "}
                  <span className="text-ink-faint">({r.baseline}→{r.current})</span>
                </td>
                <td className="td text-right">
                  <Link href={`/students/${r.id}`} className="text-xs font-medium text-brand hover:underline">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="td py-10 text-center text-ink-faint">
                  No students match those filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
