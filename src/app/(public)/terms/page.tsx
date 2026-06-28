export const metadata = { title: "Terms of Use · Learning Access Initiative" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">Terms</div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight2 text-ink">Terms of Use</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: June 28, 2026</p>

      <div className="mt-4 rounded-xl border border-[#f3d9a8] bg-[#fdf6e7] p-4 text-sm text-ink-soft">
        Plain-language terms for the Learning Access Initiative. Have a lawyer review before launch.
        Not legal advice.
      </div>

      <div className="mt-8 space-y-7 text-ink-soft">
        <Section title="Using our services">
          The Learning Access Initiative offers free tutoring, classes, and learning resources. By
          using this site or our services, you agree to these terms.
        </Section>
        <Section title="No cost, no guarantees">
          Our services are free. We work hard to help students improve, but we can&apos;t promise
          specific grades, scores, or outcomes.
        </Section>
        <Section title="Students and parents">
          If a student is a minor, a parent or guardian should sign them up or consent to their
          participation. Parents and guardians are responsible for supervising a child&apos;s use of
          online classes and outside resources.
        </Section>
        <Section title="Be respectful">
          Tutoring works because everyone is kind and safe. Harassment, discrimination, or misuse of
          our services or classes isn&apos;t allowed, and we may end participation to keep everyone
          safe.
        </Section>
        <Section title="Volunteers">
          Volunteering as a tutor is not employment, and tutors act on behalf of the initiative only
          as agreed.
        </Section>
        <Section title="Outside resources">
          We link to independent learning sites for convenience. We don&apos;t control them and
          aren&apos;t responsible for their content.
        </Section>
        <Section title="Changes">
          We may update these terms; the date above shows the latest version.
        </Section>
        <Section title="Contact">
          Questions? Email{" "}
          <a className="font-medium text-brand hover:underline" href="mailto:hello@learningaccessinitiative.org">hello@learningaccessinitiative.org</a>.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-1.5 text-lg font-semibold text-ink">{title}</h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
