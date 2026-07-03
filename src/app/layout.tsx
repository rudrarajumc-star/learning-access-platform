import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learningaccessinitiative.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Learning Access Initiative - Free tutoring, lessons & classes",
    template: "%s · Learning Access Initiative",
  },
  description:
    "Free tutoring, live classes, English & math lessons, and learning resources for multilingual students - plus the system we use to measure whether it's working.",
  keywords: [
    "free tutoring",
    "English grammar lessons",
    "NCERT math",
    "multilingual students",
    "ESL",
    "Learning Access Initiative",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Learning Access Initiative",
    title: "Free tutoring, lessons & classes for multilingual students",
    description:
      "Free, in your language, and built to prove it works. Tutoring, live classes, English & math lessons, and resources.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Access Initiative",
    description: "Free tutoring, lessons & classes for multilingual students.",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Learning Access Initiative",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description:
    "Free tutoring, live classes, and lessons in English, math, science, social studies, and coding for multilingual students.",
  email: "hello@learningaccessinitiative.org",
  areaServed: "India",
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
