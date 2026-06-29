import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdminMobileNav from "@/components/AdminMobileNav";
import Logo from "@/components/Logo";
import { signOut } from "@/lib/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-3 border-b border-border bg-surface/80 px-5 backdrop-blur">
          <div className="flex items-center gap-3 text-sm text-ink-faint">
            <AdminMobileNav />
            <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
              <Logo className="h-7 w-7" />
              <span className="font-semibold text-ink">Learning Access</span>
            </Link>
            <Link href="/" className="hidden hover:text-brand md:block">
              View public site
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sessions" className="hidden btn-primary sm:inline-flex">
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
