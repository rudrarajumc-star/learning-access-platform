import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { signOut } from "@/lib/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-3 border-b border-border bg-surface/80 px-5 backdrop-blur">
          <div className="flex items-center gap-2 text-sm text-ink-faint">
            <Link href="/" className="hover:text-brand">
              View public site
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sessions" className="btn-primary">
              Log a session
            </Link>
            <form action={signOut}>
              <button type="submit" className="btn-ghost">
                Log out
              </button>
            </form>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-6">{children}</main>
      </div>
    </div>
  );
}
