import { demoEvents } from "./demo";
import { readSince } from "./store";
import type {
  AnalyticsEvent,
  Breakdown,
  Insights,
  InsightsSummary,
  PageRow,
  TrendPoint,
} from "./types";

const DAY = 86_400_000;

const DEVICE_LABEL: Record<string, string> = {
  mobile: "Mobile",
  desktop: "Desktop",
  tablet: "Tablet",
};
const EVENT_LABEL: Record<string, string> = {
  pageview: "Page view",
  cta_click: "CTA click",
  outbound_click: "Outbound link",
  lesson_start: "Lesson started",
  lesson_complete: "Lesson completed",
  quiz_submit: "Quiz submitted",
  lead_submit: "Request sent",
  time_on_page: "Time on page",
};

function topN(counts: Map<string, number>, n: number): Breakdown[] {
  return [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}

export async function getInsights(days = 30): Promise<Insights> {
  const from = Date.now() - days * DAY;
  const real = (await readSince(from)).filter((e) => e.device !== "bot");
  const demo = demoEvents(days);
  const events = demo
    .concat(real)
    .filter((e) => e.ts >= from)
    .sort((a, b) => a.ts - b.ts);

  const pageviews = events.filter((e) => e.name === "pageview");
  const visitors = new Set(events.map((e) => e.vid)).size;
  const sessions = new Set(events.map((e) => e.sid)).size;

  const sessionSpan = new Map<string, { min: number; max: number; views: number }>();
  for (const e of events) {
    const s = sessionSpan.get(e.sid) ?? { min: e.ts, max: e.ts, views: 0 };
    s.min = Math.min(s.min, e.ts);
    s.max = Math.max(s.max, e.ts);
    if (e.name === "pageview") s.views += 1;
    sessionSpan.set(e.sid, s);
  }
  const spans = [...sessionSpan.values()];
  const durations = spans.filter((s) => s.max > s.min).map((s) => (s.max - s.min) / 1000);
  const avgSessionSeconds = durations.length
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    : 0;
  const bounced = spans.filter((s) => s.views <= 1).length;
  const bounceRate = spans.length ? Math.round((bounced / spans.length) * 100) : 0;

  const lessonStarts = events.filter((e) => e.name === "lesson_start").length;
  const lessonCompletions = events.filter((e) => e.name === "lesson_complete").length;
  const leads = events.filter((e) => e.name === "lead_submit").length;

  const summary: InsightsSummary = {
    visitors,
    sessions,
    pageviews: pageviews.length,
    events: events.length,
    avgSessionSeconds,
    bounceRate,
    lessonStarts,
    lessonCompletions,
    completionRate: lessonStarts ? Math.round((lessonCompletions / lessonStarts) * 100) : 0,
    leads,
    viewsPerSession: sessions ? Math.round((pageviews.length / sessions) * 10) / 10 : 0,
  };

  const trendMap = new Map<string, { views: number; vids: Set<string> }>();
  for (let d = days - 1; d >= 0; d--) {
    const key = new Date(Date.now() - d * DAY).toISOString().slice(0, 10);
    trendMap.set(key, { views: 0, vids: new Set() });
  }
  for (const e of events) {
    const key = new Date(e.ts).toISOString().slice(0, 10);
    const bucket = trendMap.get(key);
    if (!bucket) continue;
    bucket.vids.add(e.vid);
    if (e.name === "pageview") bucket.views += 1;
  }
  const trend: TrendPoint[] = [...trendMap.entries()].map(([date, b]) => ({
    date,
    label: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    visitors: b.vids.size,
    views: b.views,
  }));

  const pageViews = new Map<string, number>();
  const pageVisitors = new Map<string, Set<string>>();
  for (const e of pageviews) {
    pageViews.set(e.path, (pageViews.get(e.path) ?? 0) + 1);
    if (!pageVisitors.has(e.path)) pageVisitors.set(e.path, new Set());
    pageVisitors.get(e.path)!.add(e.vid);
  }
  const topPages: PageRow[] = [...pageViews.entries()]
    .map(([path, views]) => ({ path, views, visitors: pageVisitors.get(path)?.size ?? 0 }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  const firstSeen = new Map<string, AnalyticsEvent>();
  for (const e of events) {
    if (!firstSeen.has(e.vid)) firstSeen.set(e.vid, e);
  }
  const refCounts = new Map<string, number>();
  const deviceCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();
  for (const e of firstSeen.values()) {
    const source = e.ref === "direct" ? "Direct" : e.ref;
    refCounts.set(source, (refCounts.get(source) ?? 0) + 1);
    const dv = DEVICE_LABEL[e.device] ?? e.device;
    deviceCounts.set(dv, (deviceCounts.get(dv) ?? 0) + 1);
    if (e.country) {
      countryCounts.set(e.country, (countryCounts.get(e.country) ?? 0) + 1);
    }
  }

  const eventCounts = new Map<string, number>();
  for (const e of events) {
    if (e.name === "pageview" || e.name === "time_on_page") continue;
    const label = EVENT_LABEL[e.name] ?? e.name;
    eventCounts.set(label, (eventCounts.get(label) ?? 0) + 1);
  }

  const sessionsWith = (test: (e: AnalyticsEvent) => boolean) =>
    new Set(events.filter(test).map((e) => e.sid)).size;
  const visitSessions = sessions;
  const lessonSessions = sessionsWith((e) => e.path === "/lessons");
  const startSessions = sessionsWith((e) => e.name === "lesson_start");
  const completeSessions = sessionsWith((e) => e.name === "lesson_complete");
  const leadSessions = sessionsWith((e) => e.name === "lead_submit" && e.path === "/tutoring");
  const funnelRaw = [
    ["Visited the site", visitSessions],
    ["Opened lessons", lessonSessions],
    ["Started a lesson", startSessions],
    ["Finished a lesson", completeSessions],
    ["Requested a tutor", leadSessions],
  ] as const;
  const funnel = funnelRaw.map(([step, value]) => ({
    step,
    value,
    pct: visitSessions ? Math.round((value / visitSessions) * 100) : 0,
  }));

  const recent = events.slice(-40).reverse();

  return {
    summary,
    range: {
      days,
      from: new Date(from).toISOString().slice(0, 10),
      to: new Date().toISOString().slice(0, 10),
    },
    trend,
    topPages,
    referrers: topN(refCounts, 6),
    devices: topN(deviceCounts, 4),
    countries: topN(countryCounts, 6),
    events: topN(eventCounts, 6),
    funnel,
    recent,
    updatedAt: Date.now(),
    hasRealTraffic: real.length >= 25,
  };
}
