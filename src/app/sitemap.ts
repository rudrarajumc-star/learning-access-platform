import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://learningaccessinitiative.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tutoring",
    "/sat",
    "/classes",
    "/learn",
    "/lgbtq",
    "/impact",
    "/mission",
    "/join",
    "/research",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
