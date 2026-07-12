export type EventName =
  | "pageview"
  | "cta_click"
  | "outbound_click"
  | "lesson_start"
  | "lesson_complete"
  | "quiz_submit"
  | "lead_submit"
  | "time_on_page";

export const EVENT_NAMES: EventName[] = [
  "pageview",
  "cta_click",
  "outbound_click",
  "lesson_start",
  "lesson_complete",
  "quiz_submit",
  "lead_submit",
  "time_on_page",
];

export type DeviceType = "mobile" | "tablet" | "desktop" | "bot";

export type PropValue = string | number | boolean;

export interface TrackPayload {
  name: EventName;
  path: string;
  vid: string;
  sid: string;
  ref?: string;
  props?: Record<string, PropValue>;
  ts?: number;
}

export interface AnalyticsEvent {
  id: string;
  name: EventName;
  path: string;
  vid: string;
  sid: string;
  device: DeviceType;
  ref: string;
  country: string;
  props: Record<string, PropValue>;
  ts: number;
}

export interface InsightsSummary {
  visitors: number;
  sessions: number;
  pageviews: number;
  events: number;
  avgSessionSeconds: number;
  bounceRate: number;
  lessonStarts: number;
  lessonCompletions: number;
  completionRate: number;
  leads: number;
  viewsPerSession: number;
}

export interface TrendPoint {
  date: string;
  label: string;
  visitors: number;
  views: number;
}

export interface Breakdown {
  name: string;
  value: number;
}

export interface PageRow {
  path: string;
  views: number;
  visitors: number;
}

export interface FunnelStep {
  step: string;
  value: number;
  pct: number;
}

export interface Insights {
  summary: InsightsSummary;
  range: { days: number; from: string; to: string };
  trend: TrendPoint[];
  topPages: PageRow[];
  referrers: Breakdown[];
  devices: Breakdown[];
  countries: Breakdown[];
  events: Breakdown[];
  funnel: FunnelStep[];
  recent: AnalyticsEvent[];
  updatedAt: number;
  hasRealTraffic: boolean;
}
