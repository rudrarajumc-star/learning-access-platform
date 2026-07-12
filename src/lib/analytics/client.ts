"use client";

import type { EventName, PropValue, TrackPayload } from "./types";

const VID_KEY = "lai_vid";
const SID_KEY = "lai_sid";
const SID_SEEN_KEY = "lai_sid_seen";
const OPTOUT_KEY = "lai_no_track";
const SESSION_WINDOW = 30 * 60 * 1000;

function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function trackingDisabled(): boolean {
  if (typeof window === "undefined") return true;
  const nav = navigator as Navigator & { doNotTrack?: string };
  const win = window as Window & { doNotTrack?: string };
  if (nav.doNotTrack === "1" || win.doNotTrack === "1") return true;
  try {
    return localStorage.getItem(OPTOUT_KEY) === "1";
  } catch {
    return false;
  }
}

export function setTracking(enabled: boolean) {
  try {
    if (enabled) localStorage.removeItem(OPTOUT_KEY);
    else localStorage.setItem(OPTOUT_KEY, "1");
  } catch {}
}

function visitorId(): string {
  try {
    let v = localStorage.getItem(VID_KEY);
    if (!v) {
      v = newId();
      localStorage.setItem(VID_KEY, v);
    }
    return v;
  } catch {
    return "anon";
  }
}

function sessionId(): string {
  try {
    const now = Date.now();
    const seen = Number(sessionStorage.getItem(SID_SEEN_KEY) || 0);
    let s = sessionStorage.getItem(SID_KEY);
    if (!s || now - seen > SESSION_WINDOW) {
      s = newId();
      sessionStorage.setItem(SID_KEY, s);
    }
    sessionStorage.setItem(SID_SEEN_KEY, String(now));
    return s;
  } catch {
    return "anon";
  }
}

function referrerHost(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const url = new URL(document.referrer);
    if (url.host === location.host) return undefined;
    return url.host;
  } catch {
    return undefined;
  }
}

export function track(name: EventName, props?: Record<string, PropValue>, path?: string) {
  if (trackingDisabled()) return;
  const payload: TrackPayload = {
    name,
    path: path ?? location.pathname,
    vid: visitorId(),
    sid: sessionId(),
    ref: referrerHost(),
    props,
    ts: Date.now(),
  };
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {}
}
