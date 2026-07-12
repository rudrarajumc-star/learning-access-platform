import type { AnalyticsEvent, DeviceType, EventName, PropValue } from "./types";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LANDING: [string, number][] = [
  ["/", 34],
  ["/tutoring", 20],
  ["/lessons", 16],
  ["/lgbtq", 10],
  ["/learn", 8],
  ["/impact", 6],
  ["/classes", 4],
  ["/join", 2],
];
const NEXT_PATHS = [
  "/tutoring",
  "/lessons",
  "/classes",
  "/learn",
  "/impact",
  "/mission",
  "/faq",
  "/progress",
  "/join",
  "/contact",
];
const REFERRERS: [string, number][] = [
  ["direct", 36],
  ["google.com", 27],
  ["instagram.com", 12],
  ["l.facebook.com", 8],
  ["wa.me", 6],
  ["youtube.com", 5],
  ["reddit.com", 3],
  ["bing.com", 3],
];
const DEVICES: [DeviceType, number][] = [
  ["mobile", 64],
  ["desktop", 28],
  ["tablet", 8],
];
const COUNTRIES: [string, number][] = [
  ["IN", 71],
  ["US", 12],
  ["AE", 6],
  ["GB", 4],
  ["CA", 3],
  ["SG", 2],
  ["AU", 2],
];
const LESSON_IDS = [
  "subject-verb-agreement",
  "tenses-overview",
  "fractions",
  "linear-equations",
  "reading-inference",
  "photosynthesis",
];

const DAY = 86_400_000;

function weightedPick<T>(rows: [T, number][], r: number): T {
  const total = rows.reduce((a, [, w]) => a + w, 0);
  let x = r * total;
  for (const [value, w] of rows) {
    x -= w;
    if (x <= 0) return value;
  }
  return rows[0][0];
}

let cache: { day: number; events: AnalyticsEvent[] } | null = null;

export function demoEvents(days: number): AnalyticsEvent[] {
  const now = Date.now();
  const startOfToday = Math.floor(now / DAY) * DAY;
  if (cache && cache.day === startOfToday) {
    return cache.events.filter((e) => e.ts >= now - days * DAY && e.ts <= now);
  }

  const rnd = mulberry32(0x1a5e ^ startOfToday);
  const events: AnalyticsEvent[] = [];
  const returning: string[] = [];
  let seq = 0;
  const id = () => `demo-${(seq++).toString(36)}`;

  const window = 45;
  for (let d = window; d >= 0; d--) {
    const dayStart = startOfToday - d * DAY;
    const dow = new Date(dayStart).getDay();
    const weekend = dow === 0 || dow === 6 ? 0.72 : 1;
    const growth = 0.55 + (window - d) / window;
    const visitorsToday = Math.round((18 + rnd() * 12) * weekend * growth);

    for (let v = 0; v < visitorsToday; v++) {
      const reuse = returning.length > 40 && rnd() < 0.22;
      const vid = reuse ? returning[Math.floor(rnd() * returning.length)] : `v-${id()}`;
      if (!reuse) returning.push(vid);
      const sid = `s-${id()}`;
      const device = weightedPick(DEVICES, rnd());
      const ref = weightedPick(REFERRERS, rnd());
      const country = weightedPick(COUNTRIES, rnd());

      const hour = 7 + Math.floor(rnd() * 15);
      let t = dayStart + hour * 3_600_000 + Math.floor(rnd() * 3_600_000);

      const push = (name: EventName, path: string, props: Record<string, PropValue> = {}) => {
        events.push({ id: id(), name, path, vid, sid, device, ref, country, props, ts: t });
      };

      const landing = weightedPick(LANDING, rnd());
      push("pageview", landing);

      const depth = 2 + Math.floor(rnd() * 5);
      const extra = rnd() < 0.42 ? 0 : 1 + Math.floor(rnd() * 4);
      let last = landing;
      for (let p = 0; p < extra; p++) {
        t += 12_000 + Math.floor(rnd() * 140_000);
        last = NEXT_PATHS[Math.floor(rnd() * NEXT_PATHS.length)];
        push("pageview", last);
      }

      if ((landing === "/lessons" || last === "/lessons") && rnd() < 0.6) {
        t += 20_000 + Math.floor(rnd() * 90_000);
        const lessonId = LESSON_IDS[Math.floor(rnd() * LESSON_IDS.length)];
        push("lesson_start", "/lessons", { id: lessonId });
        if (rnd() < 0.5) {
          t += 60_000 + Math.floor(rnd() * 200_000);
          push("quiz_submit", "/lessons", { id: lessonId, score: 1 + Math.floor(rnd() * 5) });
        }
        if (rnd() < 0.38) {
          t += 40_000 + Math.floor(rnd() * 120_000);
          push("lesson_complete", "/lessons", { id: lessonId });
        }
      }

      if ((last === "/tutoring" || landing === "/tutoring") && rnd() < 0.14) {
        t += 30_000 + Math.floor(rnd() * 120_000);
        push("lead_submit", "/tutoring", { type: "Tutor request" });
      }
      if (last === "/join" && rnd() < 0.1) {
        t += 30_000 + Math.floor(rnd() * 120_000);
        push("lead_submit", "/join", { type: "Volunteer" });
      }

      const seconds = 20 + depth * 18 + Math.floor(rnd() * 90);
      push("time_on_page", landing, { seconds, depth: 30 + Math.floor(rnd() * 70) });
    }
  }

  events.sort((a, b) => a.ts - b.ts);
  cache = { day: startOfToday, events };
  return events.filter((e) => e.ts >= now - days * DAY && e.ts <= now);
}
