-- Supabase SQL Schema for Alif Portfolio (Relational)
-- ============================================
-- 1. STATIC / PAGE-LEVEL CONTENT (JSONB)
-- ============================================
CREATE TABLE IF NOT EXISTS alif_site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT UNIQUE NOT NULL,
  data JSONB NOT NULL,
  is_published BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS alif_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  github TEXT DEFAULT '',
  demo TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 3. SKILLS
-- ============================================
CREATE TABLE IF NOT EXISTS alif_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '',
  level INTEGER DEFAULT 0 CHECK (level >= 0 AND level <= 100),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. EDUCATION
-- ============================================
CREATE TABLE IF NOT EXISTS alif_education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  degree TEXT NOT NULL,
  institute TEXT DEFAULT '',
  district TEXT DEFAULT '',
  class TEXT DEFAULT '',
  year TEXT DEFAULT '',
  description TEXT DEFAULT '',
  logo TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 5. EXPERIENCE
-- ============================================
CREATE TABLE IF NOT EXISTS alif_experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT DEFAULT '',
  logo TEXT DEFAULT '',
  duration TEXT DEFAULT '',
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 6. SERVICES
-- ============================================
CREATE TABLE IF NOT EXISTS alif_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT DEFAULT 'code',
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 7. REVIEWS
-- ============================================
CREATE TABLE IF NOT EXISTS alif_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT DEFAULT '',
  comment TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 8. WORKFLOW
-- ============================================
CREATE TABLE IF NOT EXISTS alif_workflow (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  role TEXT DEFAULT '',
  year TEXT DEFAULT '',
  status TEXT DEFAULT '',
  logo TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 9. TOOLS
-- ============================================
CREATE TABLE IF NOT EXISTS alif_tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 10. PROJECT DETAILS
-- ============================================

create table public.alif_project_details (
  id text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  title text not null default ''::text,
  description text null default ''::text,
  full_description text null default ''::text,
  github_url text null default ''::text,
  demo_url text null default ''::text,
  thumbnail_url text null default ''::text,
  status text null default 'Planned'::text,
  featured boolean null default false,
  tags jsonb null default '[]'::jsonb,
  technologies jsonb null default '[]'::jsonb,
  features jsonb null default '[]'::jsonb,
  gallery jsonb null default '[]'::jsonb,
  timeline jsonb null default '[]'::jsonb,
  challenges jsonb null default '[]'::jsonb,
  solutions jsonb null default '[]'::jsonb,
  statistics jsonb null default '{}'::jsonb,
  database_info jsonb null default '{}'::jsonb,
  constraint project_details_pkey primary key (id)
) TABLESPACE pg_default;


-- ============================================
-- TAGS / TECHNOLOGY ICONS
-- ============================================
CREATE TABLE IF NOT EXISTS alif_tag (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE alif_site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_workflow ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_project_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE alif_tag ENABLE ROW LEVEL SECURITY;

-- Public read for all tables
CREATE POLICY "Public read" ON alif_site_content FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_skills FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_education FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_experience FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_services FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_reviews FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_workflow FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_tools FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_project_details FOR SELECT USING (true);
CREATE POLICY "Public read" ON alif_tag FOR SELECT USING (true);

-- Authenticated write for all tables
CREATE POLICY "Auth write" ON alif_site_content FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_skills FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_education FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_experience FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_services FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_reviews FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_workflow FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_tools FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_project_details FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON alif_tag FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
