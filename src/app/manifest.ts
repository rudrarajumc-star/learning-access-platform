import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Learning Access Initiative",
    short_name: "Learning Access",
    description: "Free tutoring, lessons, classes, and learning resources for multilingual students.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9fb",
    theme_color: "#2d66f5",
    icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
