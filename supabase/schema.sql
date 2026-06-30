create extension if not exists "pgcrypto";

create table if not exists centers (
  id           text primary key,            -- short code, e.g. HYD
  name         text not null,
  city         text,
  region       text,
  country      text,
  created_at   timestamptz default now()
);

create table if not exists tutors (
  id           text primary key,
  name         text not null,
  email        text,
  subjects     text[] default '{}',
  languages    text[] default '{}',
  center_id    text references centers(id),
  active       boolean default true,
  created_at   timestamptz default now()
);

-- Store anonymized codes only - no raw PII.
create table if not exists students (
  id                 text primary key,      -- anonymized code, e.g. HYD-014
  grade_level        int,
  primary_language   text,
  english_level      text check (english_level in ('Emerging','Developing','Proficient')),
  center_id          text references centers(id),
  join_date          date,
  baseline_math      int,
  baseline_english   int,
  current_math       int,
  current_english    int,
  status             text check (status in ('active','paused','graduated')) default 'active',
  notes              text,
  created_at         timestamptz default now()
);

create table if not exists topics (
  id           text primary key,
  subject      text check (subject in ('Math','English')),
  name         text not null,
  grade_band   text,
  difficulty   int check (difficulty between 1 and 3),
  description  text
);

create table if not exists sessions (
  id                text primary key default gen_random_uuid()::text,
  student_id        text references students(id) on delete cascade,
  tutor_id          text references tutors(id),
  session_date      date not null,
  duration_minutes  int not null,
  subject           text,
  topic_id          text references topics(id),
  weak_area         text,
  engagement        int check (engagement between 1 and 5),
  notes             text,
  next_step         text,
  created_at        timestamptz default now()
);
create index if not exists sessions_student_idx on sessions(student_id);
create index if not exists sessions_tutor_idx   on sessions(tutor_id);
create index if not exists sessions_topic_idx   on sessions(topic_id);

create table if not exists practice_problems (
  id                text primary key default gen_random_uuid()::text,
  topic_id          text references topics(id),
  difficulty        int check (difficulty between 1 and 3),
  language_level    text,
  prompt_condition  text check (prompt_condition in
                      ('basic','grade_level','multilingual_learner',
                       'simple_english','culturally_accessible','scaffolded_tutor')),
  generated_by_ai   boolean default false,
  problem_text      text,
  answer            text,
  explanation       text,
  created_at        timestamptz default now()
);

create table if not exists rubric_scores (
  id                      text primary key default gen_random_uuid()::text,
  problem_id              text references practice_problems(id) on delete cascade,
  scorer                  text,
  correctness             int check (correctness between 1 and 5),
  topic_alignment         int check (topic_alignment between 1 and 5),
  difficulty_fit          int check (difficulty_fit between 1 and 5),
  clarity                 int check (clarity between 1 and 5),
  language_burden         int check (language_burden between 1 and 5),
  scaffolding             int check (scaffolding between 1 and 5),
  tutor_usefulness        int check (tutor_usefulness between 1 and 5),
  cultural_accessibility  int check (cultural_accessibility between 1 and 5),
  error_flag              boolean default false,
  notes                   text,
  created_at              timestamptz default now()
);
create index if not exists rubric_problem_idx on rubric_scores(problem_id);

create table if not exists resources (
  id             text primary key default gen_random_uuid()::text,
  title          text,
  subject        text,
  topic          text,
  grade_level    text,
  language_level text,
  file_url       text,
  external_link  text,
  uploaded_by    text,
  created_at     timestamptz default now()
);

-- Enable Row Level Security in production and add policies per role
-- (admin = full, tutor = assigned rows, viewer = read-only).
-- alter table students enable row level security;  -- etc.
