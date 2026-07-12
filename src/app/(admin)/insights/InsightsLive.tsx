"use client";

import { useEffect, useState } from "react";
import type { AnalyticsEvent, EventName } from "@/lib/analytics/types";

const LABEL: Record<EventName, string> = {
  pageview: "viewed",
  cta_click: "clicked",
  outbound_click: "left via",
  lesson_start: "started a lesson",
  lesson_complete: "finished a lesson",
  quiz_submit: "took a quiz",
  lead_submit: "requested a tutor",
  time_on_page: "read",
};

const DOT: Record<EventName, string> = {
  pageview: "#9aa6bf",
  cta_click: "#2d66f5",
  outbound_click: "#7c5cff",
  lesson_start: "#2d66f5",
  lesson_complete: "#16a578",
  quiz_submit: "#d3860a",
  lead_submit: "#16a578",
  time_on_page: "#c7cedb",
};

function ago(ts: number, now: number): string {
  const s = Math.max(0, Math.round((now - ts) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

function describe(e: AnalyticsEvent): string {
  if (e.name === "outbound_click") return `left via ${e.props.host ?? "a link"}`;
  if (e.name === "lesson_start" || e.name === "lesson_complete") {
    return `${LABEL[e.name]}${e.props.id ? ` (${e.props.id})` : ""}`;
  }
  if (e.name === "lead_submit") return `${LABEL[e.name]}${e.props.type ? ` · ${e.props.type}` : ""}`;
  if (e.name === "pageview") return `viewed ${e.path}`;
  return LABEL[e.name] ?? e.name;
}

export default function InsightsLive({ initial }: { initial: AnalyticsEvent[] }) {
  const [events, setEvents] = useState<AnalyticsEvent[]>(initial);
  const [now, setNow] = useState(() => Date.now());
  const [live, setLive] = useState(true);

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!live) return;
    let active = true;
    const poll = async () => {
      try {
        const res = await fetch("/api/insights?days=30", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (active && data?.insights?.recent) setEvents(data.insights.recent);
      } catch {}
    };
    const id = setInterval(poll, 12000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [live]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-ink-faint">
          <span className="relative flex h-2 w-2">
            <span className="live-dot h-2 w-2 rounded-full" style={{ background: live ? "#16a578" : "#9aa6bf" }} />
          </span>
          {live ? "Live" : "Paused"}
        </div>
        <button onClick={() => setLive((v) => !v)} className="text-xs font-medium text-brand hover:underline">
          {live ? "Pause" : "Resume"}
        </button>
      </div>
      <div className="max-h-[420px] space-y-0.5 overflow-y-auto pr-1">
        {events.map((e) => (
          <div key={e.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-2/60">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: DOT[e.name] ?? "#9aa6bf" }}
            />
            <span className="min-w-0 flex-1 truncate text-sm text-ink-soft">
              <span className="text-ink-faint">A visitor</span> {describe(e)}
            </span>
            <span className="shrink-0 text-[11px] uppercase tracking-wide text-ink-faint">
              {e.country ? e.country : e.device}
            </span>
            <span className="shrink-0 tabular-nums text-[11px] text-ink-faint">{ago(e.ts, now)}</span>
          </div>
        ))}
        {events.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-ink-faint">No activity yet.</p>
        )}
      </div>
    </div>
  );
}
