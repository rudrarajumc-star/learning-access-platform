import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://learningaccessinitiative.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep the private platform out of search results.
        disallow: [
          "/dashboard",
          "/students",
          "/tutors",
          "/sessions",
          "/topics",
          "/practice",
          "/research-scores",
          "/analytics",
          "/exports",
          "/api/",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
