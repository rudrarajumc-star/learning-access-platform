import Link from "next/link";
import { signIn } from "@/lib/actions";
import Logo from "@/components/Logo";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from = "/dashboard", error } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24">
      <Logo className="h-14 w-14" />
      <h1 className="mt-4 text-2xl font-bold text-ink">Staff sign in</h1>
      <p className="mt-1 text-center text-sm text-ink-soft">
        Coordinators and tutors only. Everything past this point is student data.
      </p>

      <form action={signIn} className="card mt-8 w-full space-y-4 p-6">
        <input type="hidden" name="from" value={from} />

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Your name or email</span>
          <input
            name="email"
            className="input"
            placeholder="so we know who logged a session"
            autoComplete="username"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-ink-soft">Access code</span>
          <input
            name="code"
            type="password"
            required
            className="input"
            placeholder="••••••••"
            autoComplete="current-password"
            autoFocus
          />
        </label>

        {error && (
          <p className="rounded-lg bg-[#fce8e6] px-3 py-2 text-sm text-bad">
            That code didn&apos;t work. Check with the coordinator.
          </p>
        )}

        <button type="submit" className="btn-primary w-full py-2.5">
          Sign in
        </button>
      </form>

      <Link href="/" className="mt-6 text-sm text-ink-faint hover:text-ink">
        Back to the site
      </Link>
    </div>
  );
}
