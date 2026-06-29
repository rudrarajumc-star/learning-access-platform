"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { adminGroups as groups } from "@/lib/adminNav";

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-5 py-4">
        <Logo className="h-8 w-8" />
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
