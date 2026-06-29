"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="text-2xl font-bold text-ink">Something went wrong.</h1>
      <p className="mt-2 max-w-sm text-ink-soft">
        Sorry about that. Try again, and if it keeps happening let us know.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn-primary px-5 py-2.5 text-base">Try again</button>
        <Link href="/" className="btn-ghost px-5 py-2.5 text-base">Go home</Link>
      </div>
    </div>
  );
}
