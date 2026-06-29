export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export const adminGroups: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: "M3 12h7V3H3v9Zm0 9h7v-7H3v7Zm11 0h7V12h-7v9Zm0-18v7h7V3h-7Z" },
      { href: "/analytics", label: "Analytics", icon: "M4 19V5m5 14V9m5 10V12m5 7V7" },
    ],
  },
  {
    heading: "Operations",
    items: [
      { href: "/students", label: "Students", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" },
      { href: "/tutors", label: "Tutors", icon: "M12 14l9-5-9-5-9 5 9 5Zm0 0v6m-5-3.5V12" },
      { href: "/sessions", label: "Sessions", icon: "M8 7V3m8 4V3M4 11h16M5 21h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1Z" },
      { href: "/topics", label: "Weak Topics", icon: "M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3Zm0 6v6m-3-3h6" },
    ],
  },
  {
    heading: "Learning & Research",
    items: [
      { href: "/practice", label: "Practice Bank", icon: "M5 4h14a1 1 0 0 1 1 1v14l-4-3H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" },
      { href: "/research-scores", label: "Research Scores", icon: "M9 3v2m6-2v2M5 8h14M6 21h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Zm3-4 2 2 4-4" },
      { href: "/exports", label: "Exports", icon: "M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" },
    ],
  },
];
