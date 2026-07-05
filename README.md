# Learning Access Initiative

Free tutoring, live classes, and a full self-study curriculum for multilingual students who
can't get help anywhere else. This is the whole thing: the public website families use to sign
up, the in-app lessons students learn from, and the private platform our tutors use to track who
we're helping and whether it's actually working.

It started as a spreadsheet of every kid I tutored. It got messy fast. This is what it turned
into once I wanted to answer one question honestly: is this helping?

**Reach so far:** 114+ students tutored, 1,000+ tutoring hours, 6 volunteer tutors, 3 learning
centers, most of them in Hyderabad.

> Runs with zero setup: `npm install && npm run dev`. It ships with a seeded demo dataset,
> working forms, and a shared-code login, so the whole thing is browsable immediately. Each
> production piece (email, database, real auth, custom domain) turns on through env vars.

## What's inside

**For students and families (public)**
- **Request a tutor** and **live class** schedule, free, in the language spoken at home.
- **Lessons** you can work through in the browser across five subjects: English grammar
  (Wren & Martin style), and NCERT-aligned math, science, social studies, and beginner coding
  by age group. Every topic has a worked example and practice, English and coding lessons end
  with an **auto-graded quiz**, and a **My Progress** dashboard tracks completion with rings and
  a printable certificate when you finish a subject.
- **Learn** hub linking 20+ vetted free resources, **LGBTQ+ support** with real helplines
  (India and international), plus Mission, Impact, FAQ, and Contact pages.

**For staff (behind a login)**
- Dashboard, student profiles, session logging, weak-topic tracking, analytics, and one-click
  CSV export. Students are tracked by anonymous codes, never names.

**Under the hood**
- Fully responsive with a real mobile menu, keyboard-accessible (skip link, focus rings),
  custom 404 and error pages, per-page SEO with a dynamic Open Graph image, a web manifest,
  `FAQPage` and `EducationalOrganization` structured data, security headers, and motion that
  respects `prefers-reduced-motion`.

## Built with

Next.js 15 (App Router), TypeScript, Tailwind CSS, and Recharts. Progress is stored client-side;
the seeded data layer is written to swap cleanly for Supabase (Postgres + Auth) in production.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint, clean
```

Staff login: use **Tutor login** with the access code `lai-2026` (change it via `LA_ACCESS_CODE`).
Edit headline stats in `src/lib/siteStats.ts`. Replace `public/logo.svg` to change the logo
everywhere.

## Going to production

1. Push this repo to GitHub.
2. Import it on [Vercel](https://vercel.com) and deploy. Add the env vars from `.env.local.example`.
3. Buy a domain and connect it in Vercel, then set `NEXT_PUBLIC_SITE_URL`.
4. For form emails, create a [Resend](https://resend.com) key and set `RESEND_API_KEY` and
   `LEAD_NOTIFY_EMAIL`. Until then, submissions are logged server-side.
5. To store real student data, create a Supabase project, run `supabase/schema.sql`, set the
   `NEXT_PUBLIC_SUPABASE_*` vars, and swap the helpers in `src/lib/queries.ts` (the return shapes
   already match, so the UI doesn't change).
6. Before launch: have `/privacy` and `/terms` reviewed (we collect minors' data) and re-verify
   the helpline numbers.

## Structure

```
src/
  app/
    (public)/   home, tutoring, lessons, classes, learn, lgbtq, impact, mission,
                join, faq, contact, privacy, terms, progress, login
    (admin)/    dashboard, students, sessions, analytics, research-scores, exports
    api/lead/   form submission handler (email-ready)
  components/   UI, charts, and animation primitives (Reveal, Tilt, CountUp, HeroFX)
  lib/          types, seed data, queries, csv, auth, siteStats
supabase/schema.sql   Postgres schema mirroring the data model
```
