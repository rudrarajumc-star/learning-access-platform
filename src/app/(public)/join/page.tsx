import Link from "next/link";
import JoinForm from "./JoinForm";

export const metadata = {
  title: "Volunteer",
  description: "Volunteer as a tutor. An hour a week changes things for a kid who's falling behind.",
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">Volunteer</div>
      <h1 className="mt-2 text-3xl font-bold text-ink">Help a kid out.</h1>
      <p className="mt-3 text-ink-soft">
        An hour a week is enough. If you can explain fractions or read with a 4th grader, you can do
        this. Tell us a bit about you and we&apos;ll find you a student.
      </p>
      <div className="mt-8">
        <JoinForm />
      </div>
      <p className="mt-6 text-center text-sm text-ink-faint">
        Looking for tutoring instead?{" "}
        <Link href="/tutoring" className="font-medium text-brand hover:underline">
          Request a tutor here.
        </Link>
      </p>
    </div>
  );
}
