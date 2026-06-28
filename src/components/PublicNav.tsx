"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicNav({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <nav className="hidden items-center gap-6 lg:flex">
      {items.map((it) => {
        const active = path === it.href;
        return (
          <Link
            key={it.href}
            href={it.href}
            data-active={active}
            className={`navlink text-sm transition-colors ${
              active ? "font-medium text-ink" : "text-ink-soft hover:text-ink"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
