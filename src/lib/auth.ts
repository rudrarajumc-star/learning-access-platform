export const SESSION_COOKIE = "la_session";

export const SESSION_VALUE = process.env.LA_SESSION_SECRET || "la.s3ssion.k9f2qd";

export const ACCESS_CODE = process.env.LA_ACCESS_CODE || "lai-2026";

export const PROTECTED_PREFIXES = [
  "/dashboard",
  "/students",
  "/tutors",
  "/sessions",
  "/topics",
  "/practice",
  "/research-scores",
  "/analytics",
  "/exports",
];
