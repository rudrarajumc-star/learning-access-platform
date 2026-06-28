"use client";

import { useEffect, useRef } from "react";

export default function HeroFX() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spot.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="aurora" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div
        ref={spot}
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx, 50%) var(--my, 30%), rgb(var(--brand) / 0.13), transparent 70%)",
        }}
      />
    </>
  );
}
