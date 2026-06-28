"use client";

import { downloadCsv } from "@/lib/csv";

export default function ExportClient({
  exports,
}: {
  exports: { key: string; label: string; description: string; rows: Record<string, unknown>[] }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {exports.map((e) => (
        <div key={e.key} className="card flex flex-col p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
              </svg>
            </div>
            <div className="font-medium text-ink">{e.label}</div>
          </div>
          <p className="mt-2 flex-1 text-xs text-ink-soft">{e.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-ink-faint">{e.rows.length.toLocaleString()} rows</span>
            <button className="btn-ghost" onClick={() => downloadCsv(e.key, e.rows)}>
              Download CSV
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
