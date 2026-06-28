import ContactForm from "./ContactForm";

export const metadata = { title: "Contact · Learning Access Initiative" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-brand">Contact</div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight2 text-ink">Get in touch.</h1>
      <p className="mt-3 text-ink-soft">
        Questions about tutoring, classes, volunteering, or a partnership? Send a note and a real
        person will reply. You can also email us directly at{" "}
        <a href="mailto:hello@learningaccessinitiative.org" className="font-medium text-brand hover:underline">
          hello@learningaccessinitiative.org
        </a>
        .
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
