"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const groups: { heading: string; items: { href: string; label: string; icon: string }[] }[] = [
  {
    heading: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: "M3 12h7V3H3v9Zm0 9h7v-7H3v7Zm11 0h7V12h-7v9Zm0-18v7h7V3h-7Z" },
      { href: "/analytics", label: "Analytics", icon: "M4 19V5m5 14V9m5 10V12m5 7V7" },
    ],
  },
  {
    heading: "Operations",
    items: [
      { href: "/students", label: "Students", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" },
      { href: "/tutors", label: "Tutors", icon: "M12 14l9-5-9-5-9 5 9 5Zm0 0v6m-5-3.5V12" },
      { href: "/sessions", label: "Sessions", icon: "M8 7V3m8 4V3M4 11h16M5 21h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1Z" },
      { href: "/topics", label: "Weak Topics", icon: "M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3Zm0 6v6m-3-3h6" },
    ],
  },
  {
    heading: "Learning & Research",
    items: [
      { href: "/practice", label: "Practice Bank", icon: "M5 4h14a1 1 0 0 1 1 1v14l-4-3H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" },
      { href: "/research-scores", label: "Research Scores", icon: "M9 3v2m6-2v2M5 8h14M6 21h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Zm3-4 2 2 4-4" },
      { href: "/exports", label: "Exports", icon: "M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" },
    ],
  },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-5 py-4">
        <img src="/logo.svg" alt="Learning Access" className="h-8 w-8" />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-ink">Learning Access</div>
          <div className="text-[11px] text-ink-faint">Platform</div>
        </div>
      </Link>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-2">
        {groups.map((g) => (
          <div key={g.heading}>
            <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
              {g.heading}
            </div>
            <div className="space-y-0.5">
              {g.items.map((it) => {
                const active = path === it.href || path.startsWith(it.href + "/");
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      active
                        ? "bg-brand-soft font-medium text-brand"
                        : "text-ink-soft hover:bg-surface-2"
                    }`}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={it.icon} />
                    </svg>
                    {it.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold text-ink-soft">
            RR
          </div>
          <div className="leading-tight">
            <div className="text-xs font-medium text-ink">R. Rudraraju</div>
            <div className="text-[10px] text-ink-faint">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
