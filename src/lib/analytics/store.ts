import { promises as fs } from "fs";
import path from "path";
import type { AnalyticsEvent } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "analytics.jsonl");

let memory: AnalyticsEvent[] = [];
let canWriteFile = true;

export async function recordEvent(event: AnalyticsEvent): Promise<void> {
  memory.push(event);
  if (memory.length > 50000) memory = memory.slice(-40000);
  if (!canWriteFile) return;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(FILE, JSON.stringify(event) + "\n", "utf8");
  } catch {
    canWriteFile = false;
  }
}

export async function readSince(fromTs: number): Promise<AnalyticsEvent[]> {
  let fromFile: AnalyticsEvent[] = [];
  try {
    const raw = await fs.readFile(FILE, "utf8");
    for (const line of raw.split("\n")) {
      if (!line) continue;
      try {
        const e = JSON.parse(line) as AnalyticsEvent;
        if (e.ts >= fromTs) fromFile.push(e);
      } catch {}
    }
  } catch {
    fromFile = [];
  }
  const seen = new Set(fromFile.map((e) => e.id));
  const inMemory = memory.filter((e) => e.ts >= fromTs && !seen.has(e.id));
  return fromFile.concat(inMemory);
}
