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
    default: "Learning Access Initiative — Free tutoring & SAT prep",
    template: "%s · Learning Access Initiative",
  },
  description:
    "Free tutoring, live classes, SAT practice, and learning resources for multilingual students — plus the system we use to measure whether it's working.",
  keywords: [
    "free tutoring",
    "SAT prep",
    "multilingual students",
    "ESL",
    "free SAT practice",
    "Learning Access Initiative",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Learning Access Initiative",
    title: "Free tutoring, SAT prep & classes for multilingual students",
    description:
      "Free, in your language, and built to prove it works. Tutoring, live classes, SAT practice, and resources.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Access Initiative",
    description: "Free tutoring, SAT prep & classes for multilingual students.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
