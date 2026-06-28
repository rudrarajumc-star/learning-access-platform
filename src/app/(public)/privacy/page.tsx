export const metadata = { title: "Privacy Policy · Learning Access Initiative" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">Privacy</div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight2 text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: June 28, 2026</p>

      <div className="mt-4 rounded-xl border border-[#f3d9a8] bg-[#fdf6e7] p-4 text-sm text-ink-soft">
        This is a plain-language policy written for the Learning Access Initiative. Because we work
        with children, please have it reviewed by a lawyer before you officially launch. It is not
        legal advice.
      </div>

      <div className="prose-lap mt-8 space-y-7 text-ink-soft">
        <Section title="Who we are">
          The Learning Access Initiative provides free tutoring, classes, and learning resources for
          students, including students learning in a second language. This policy explains what
          information we collect and how we handle it.
        </Section>

        <Section title="What we collect">
          <ul className="ml-5 list-disc space-y-1">
            <li><b>When you contact us or sign up:</b> a name (a first name is fine), the way you want us to reach you, the subject a student needs help with, and languages spoken at home.</li>
            <li><b>For enrolled students:</b> we work from anonymized codes wherever possible. We may keep grade level, baseline and current scores, weak topics, and tutor session notes to measure progress.</li>
            <li><b>Basic technical data:</b> standard server logs from our hosting provider. We do not use invasive tracking.</li>
          </ul>
        </Section>

        <Section title="Children's privacy & parental consent">
          We knowingly work with minors. A parent or guardian should submit the request form, or be
          aware of and consent to a student&apos;s participation. We collect the minimum information
          needed to provide tutoring, and a parent or guardian may review, correct, or request
          deletion of their child&apos;s information at any time by emailing us.
        </Section>

        <Section title="How we use information">
          To match students with tutors, run sessions and classes, measure whether our help is
          working, and reply to you. That&apos;s it.
        </Section>

        <Section title="How we share it">
          We do <b>not</b> sell personal information. We share it only with the tutors and
          coordinators who need it to help a student, and with service providers that run the site
          (for example, our hosting and email providers). We may disclose information if required by
          law.
        </Section>

        <Section title="How we protect it">
          Access is limited to people who need it. We prefer anonymized student codes over names in
          our systems, and we keep information only as long as it&apos;s useful for tutoring and
          reporting.
        </Section>

        <Section title="Other sites we link to">
          Our resources page links to independent sites (such as Khan Academy). We don&apos;t control
          them; their own privacy policies apply when you visit them.
        </Section>

        <Section title="Your choices">
          You can ask us to show you what we have, fix it, or delete it. Email{" "}
          <a className="font-medium text-brand hover:underline" href="mailto:privacy@learningaccessinitiative.org">privacy@learningaccessinitiative.org</a>.
        </Section>

        <Section title="Changes">
          If we update this policy, we&apos;ll change the date at the top and post the new version
          here.
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
