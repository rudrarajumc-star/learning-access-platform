import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import MobileNav from "@/components/MobileNav";
import ScrollProgress from "@/components/ScrollProgress";
import Logo from "@/components/Logo";

const nav = [
  { href: "/tutoring", label: "Free Tutoring" },
  { href: "/lessons", label: "Lessons" },
  { href: "/classes", label: "Classes" },
  { href: "/learn", label: "Learn" },
  { href: "/lgbtq", label: "LGBTQ+ Support" },
  { href: "/join", label: "Volunteer" },
];

const footerNav = [
  ...nav,
  { href: "/impact", label: "Impact" },
  { href: "/mission", label: "Mission" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <header className="sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="group flex items-center gap-2">
            <Logo className="h-9 w-9 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6" />
            <span className="font-semibold leading-tight text-ink">Learning Access Initiative</span>
          </Link>
          <PublicNav items={nav} />
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden text-sm text-ink-soft hover:text-ink lg:block">Tutor login</Link>
            <Link href="/tutoring" className="hidden btn-primary shine sm:inline-flex">Get free tutoring</Link>
            <MobileNav items={nav} />
          </div>
        </div>
      </header>

      <main id="content">{children}</main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-sm text-ink-soft">
              Learning Access Initiative · learningaccessinitiative.org
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-faint">
            {footerNav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-ink">{n.label}</Link>
            ))}
            <Link href="/progress" className="hover:text-ink">My Progress</Link>
            <Link href="/faq" className="hover:text-ink">FAQ</Link>
            <Link href="/research" className="hover:text-ink">Research</Link>
            <Link href="/contact" className="hover:text-ink">Contact</Link>
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
            <Link href="/login" className="hover:text-ink">Tutor login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
