# Learning Access Initiative

A full-stack platform for a free tutoring nonprofit serving multilingual, low-resource students.
It has two sides: a **public website** (free tutoring, live classes, in-app English & math
lessons, and a curated learning-resource hub) and a **private staff platform** (dashboards,
student/session tracking, analytics, CSV export, and an AI practice-problem research workflow).

> Runs with **zero setup** — `npm install && npm run dev`. It ships with a deterministic seeded
> demo dataset, working forms, and a shared-code login, so the whole thing is browsable
> immediately. Each production piece (email, database, real auth, domain) flips on via env vars.

## Features

**Public site**
- **Free tutoring** request form, **live class** schedule + recordings, in-app **Lessons**
  (Wren & Martin–style English grammar lessons and NCERT-aligned math by age group, with worked
  examples), **LGBTQ+ support** with vetted helplines (India + US/international), and a **Learn**
  hub linking 20+ free resources.
- Volunteer + contact forms, Mission/Impact/Research pages.
- Animated, responsive UI: cursor-spotlight hero, scroll reveals, 3D-tilt cards, count-up stats,
  animated charts; full mobile menu and `prefers-reduced-motion` support.
- Production basics: keyboard-accessible (skip link, focus rings), custom 404 + error pages,
  per-page SEO with a dynamic Open Graph image, web manifest, and security headers.

**Staff platform** (behind login)
- Dashboard, Students (+ profiles), Sessions, Tutors, Weak-Topic tracker, Practice Bank,
  Research Scores (prompt-condition comparison), Analytics, and CSV Exports.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Recharts · seeded demo data
(swappable for Supabase/Postgres + Auth) · deployable on Vercel.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # eslint (clean)
```

Staff login: **Tutor login** → access code `lai-2026` (change via `LA_ACCESS_CODE`).

## Going to production

1. **GitHub** — push this repo (see below).
2. **Vercel** — import the repo, deploy. Add env vars from `.env.local.example`.
3. **Domain** — buy one, add it in Vercel → Settings → Domains, set the DNS records.
4. **Forms → email** — create a [Resend](https://resend.com) key; set `RESEND_API_KEY` and
   `LEAD_NOTIFY_EMAIL`. Until then, submissions log to the server console.
5. **Database + real logins** — create a Supabase project, run `supabase/schema.sql`, set the
   `NEXT_PUBLIC_SUPABASE_*` vars, then move the helpers in `src/lib/queries.ts` to Supabase
   (return shapes already match, so the UI doesn't change).
6. **Before launch** — have `/privacy` and `/terms` reviewed (you collect minors' data), verify the
   helpline numbers, and set a real contact email.

## Project structure

```
src/
  app/
    (public)/   marketing + student-facing: home, tutoring, lessons, classes, learn,
                lgbtq, impact, mission, join, contact, privacy, terms, login
    (admin)/    staff platform: dashboard, students, sessions, research-scores, exports, …
    api/lead/   form submission handler (email-ready)
    sitemap.ts · robots.ts · icon.svg
  components/   UI, charts, animation primitives (Reveal, Tilt, CountUp, HeroFX), Logo
  lib/          types, seed data, queries (the Supabase swap point), csv, auth, actions
supabase/schema.sql   Postgres schema mirroring the data model
public/logo.svg       brand logo (replace with your own file to rebrand everywhere)
```
