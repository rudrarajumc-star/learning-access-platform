import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Logo className="h-8 w-8" />
        <span className="font-semibold text-ink">Learning Access</span>
      </Link>
      <div className="text-6xl font-extrabold tracking-tight2 text-brand">404</div>
      <h1 className="mt-3 text-2xl font-bold text-ink">We couldn&apos;t find that page.</h1>
      <p className="mt-2 max-w-sm text-ink-soft">
        It may have moved, or the link might be a little off. Let&apos;s get you back on track.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary px-5 py-2.5 text-base">Go home</Link>
        <Link href="/learn" className="btn-ghost px-5 py-2.5 text-base">Browse resources</Link>
      </div>
    </div>
  );
}
