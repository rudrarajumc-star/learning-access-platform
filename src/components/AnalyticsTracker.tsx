"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/client";
import type { EventName, PropValue } from "@/lib/analytics/types";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const startRef = useRef(Date.now());
  const depthRef = useRef(0);

  useEffect(() => {
    track("pageview", undefined, pathname);
    startRef.current = Date.now();
    depthRef.current = 0;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.round((doc.scrollTop / max) * 100)) : 100;
      if (pct > depthRef.current) depthRef.current = pct;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const flush = () => {
      const seconds = Math.round((Date.now() - startRef.current) / 1000);
      if (seconds >= 2) {
        track("time_on_page", { seconds, depth: depthRef.current }, pathname);
        startRef.current = Date.now();
      }
    };
    const onHidden = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onHidden);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHidden);
      flush();
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const tagged = target?.closest?.("[data-track]") as HTMLElement | null;
      if (tagged) {
        const name = tagged.getAttribute("data-track") as EventName;
        const id = tagged.getAttribute("data-track-id");
        const props: Record<string, PropValue> = {};
        if (id) props.id = id;
        if (name) track(name, Object.keys(props).length ? props : undefined);
        return;
      }
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (link && link.host && link.host !== location.host) {
        track("outbound_click", { host: link.host });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
