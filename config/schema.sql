-- Supabase SQL Schema for Alif Portfolio (Relational)
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. STATIC / PAGE-LEVEL CONTENT (JSONB)
-- ============================================
CREATE TABLE IF NOT EXISTS site_content (
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
CREATE TABLE IF NOT EXISTS projects (
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
CREATE TABLE IF NOT EXISTS skills (
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
CREATE TABLE IF NOT EXISTS education (
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
CREATE TABLE IF NOT EXISTS experience (
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
CREATE TABLE IF NOT EXISTS services (
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
CREATE TABLE IF NOT EXISTS reviews (
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
CREATE TABLE IF NOT EXISTS workflow (
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
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Public read for all tables
CREATE POLICY "Public read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read" ON education FOR SELECT USING (true);
CREATE POLICY "Public read" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read" ON services FOR SELECT USING (true);
CREATE POLICY "Public read" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read" ON workflow FOR SELECT USING (true);
CREATE POLICY "Public read" ON tools FOR SELECT USING (true);

-- Authenticated write for all tables
CREATE POLICY "Auth write" ON site_content FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON skills FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON education FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON experience FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON services FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON reviews FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON workflow FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON tools FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- SEED: site_content (static sections)
-- ============================================
INSERT INTO site_content (section, data) VALUES
('meta', '{"title":"Alif Portfolio","description":"Creative developer portfolio showcasing innovative digital solutions"}'),
('logo', '{"html":"<span>ALIF</span>"}'),
('navigator', '[{"label":"Home","link":"#home"},{"label":"About","link":"#about"},{"label":"Skills","link":"#skills-section"},{"label":"Projects","link":"#projects-section"},{"label":"Education","link":"#education-section"},{"label":"Contact","link":"#contact-section"}]'),
('hero', '{"subtitle":"","title":{"line1":"","line2":"Abdullah Al Khalid "},"description":"I design and build modern, scalable, and user-focused digital products using HTML, CSS, and modern frontend technologies.","buttons":[{"text":"View Projects","link":"#projects-section","style":"primary"},{"text":"Contact Me","link":"#contact","style":"outline"},{"text":"View CV","link":"https://drive.google.com/file/d/1JwUfj1EirIkfMbFvtW1mS1Ftm2bf5LWT/view?usp=drive_link","style":"cv"}]}'),
('about', '{"label":"About Me","title":"Passionate about <span class=''text-gradient''>creating impactful</span> solutions","paragraphs":["I am a Frontend Web Developer from Bangladesh with hands-on experience in building scalable, production-ready web applications. I focus on creating clean, efficient, and user-centric interfaces that deliver real value through performance, usability, and maintainable code.","My work emphasizes responsive design, cross-browser compatibility, and accessibility to ensure a seamless and inclusive user experience across all devices and platforms. I strive to build interfaces that are both visually appealing and functionally robust.","I am a continuous learner who actively explores modern frontend technologies, tools, and best practices to stay up to date with the evolving web ecosystem. I enjoy improving my skills through real-world problem solving and applying what I learn to practical projects.","I am currently pursuing a Bachelor''s degree in Computer Science and Engineering (CSE) at Begum Rokeya University, Rangpur (BRUR). I aspire to grow as a high-impact software engineer by contributing to challenging projects and continuously improving through real-world problem solving."]}'),
('contact', '{"title":"<span class=''text-gradient''>Contact</span>","details":{"email":"alifbrur16@gmail.com","location":"Rangpur, Bangladesh","socials":{"facebook":"https://www.facebook.com/withALIF","github":"https://github.com/With-ALIF","instagram":"https://www.instagram.com/withalif_2025","whatsapp":"https://wa.me/8801328571768","linkedin":"https://www.linkedin.com/in/with-alif/","telegram":"https://t.me/ALIF1230"}}}'),
('footer', '{"text":"© 2025 | All rights reserved."}'),
('stats', '[{"number":"1+","label":"Years Experience"},{"number":"25+","label":"Projects Completed"},{"number":"4+","label":"Happy Clients"},{"number":"10+","label":"Live Websites"}]')
ON CONFLICT (section) DO UPDATE SET data = EXCLUDED.data, updated_at = now();

-- ============================================
-- SEED: projects
-- ============================================
INSERT INTO projects (title, slug, description, image, github, demo, featured, is_published, sort_order) VALUES
('Portfolio Website', 'portfolio-website', 'A modern responsive portfolio built with clean UI and animations.', 'https://i.postimg.cc/5yzJwhXB/pic.png', 'https://github.com/With-ALIF/alif_protfolio', 'https://alif.mnr.bd/', true, true, 1),
('Alif Tools', 'alif-tools', 'ALIF Tools is a modern, fast, and privacy-focused online platform for processing PDF and image files with ease.', 'https://github.com/With-ALIF/logo_zone/blob/main/project/alif-tools.png?raw=true', 'https://github.com/With-ALIF/alif-tools', 'https://alif-tools.vercel.app/', true, true, 2),
('Alif Blog', 'alif-blog', 'A dynamic digital space by Alif, delivering curated tech insights, breaking industry news, and deep-dive tutorials for the modern web.', 'https://i.postimg.cc/6qwX4cy3/blog009.png', 'https://github.com/With-ALIF/blog_site', 'https://alif-blog.vercel.app/', true, true, 3),
('Tutor Flow', 'tutor-flow', 'Tutor Flow is an interactive platform that connects tutors with students, providing structured learning paths and session management.', 'https://github.com/alif982/picture/blob/main/New%20folder/tutorflow.webp?raw=true', 'https://github.com/With-ALIF/tutorflow', 'https://tuition.mnr.bd/', true, true, 4),
('Web Poll', 'web-poll', 'Web Poll is a web-based polling application that allows users to create and participate in online polls.', 'https://i.postimg.cc/bvDdtxq3/polldashboard.png', 'https://github.com/With-ALIF/Web_Poll', 'https://poll.mnr.bd/', true, true, 5),
('SOT Payment Management System', 'sot-payment-management-system', 'A comprehensive payment management system for handling various payment gateways and transactions.', 'https://i.postimg.cc/cLjmCdmJ/sot0000.png', 'https://github.com/With-ALIF/sot_ledger', 'https://paymet-sot.vercel.app/', true, true, 6);

-- ============================================
-- SEED: skills
-- ============================================
INSERT INTO skills (name, icon, level, sort_order) VALUES
('HTML', 'https://github.com/With-ALIF/logo_zone/blob/main/images/html5..png?raw=true', 75, 1),
('CSS', 'https://github.com/With-ALIF/logo_zone/blob/main/images/css3.png?raw=true', 50, 2),
('JavaScript', 'https://github.com/With-ALIF/logo_zone/blob/main/images/JavaScript.png?raw=true', 40, 3),
('Java', 'https://github.com/With-ALIF/logo_zone/blob/main/images/java.webp?raw=true', 35, 4),
('C', 'https://github.com/With-ALIF/logo_zone/blob/main/images/c.png?raw=true', 30, 5),
('Python', 'https://github.com/With-ALIF/logo_zone/blob/main/images/python.png?raw=true', 20, 6),
('Typescript', 'https://github.com/With-ALIF/logo_zone/blob/main/images/TypeScript.png?raw=true', 10, 7),
('Tailwind CSS', 'https://github.com/With-ALIF/logo_zone/blob/main/images/tailwind.png?raw=true', 5, 8);

-- ============================================
-- SEED: education
-- ============================================
INSERT INTO education (degree, institute, district, class, year, description, logo, sort_order) VALUES
('B.Sc in Computer Science', 'Begum Rokeya University', 'Rangpur', 'Undergraduate', '2023 - Studying', 'Focused on software development, web technologies, and problem solving.', 'https://github.com/With-ALIF/logo_zone/blob/main/education/brur_optimized.png?raw=true', 1),
('Higher Secondary Certificate', 'Milestone College', 'Dhaka', 'Intermediate', '2021 - 2023', 'Completed higher secondary education with a science background.', 'https://github.com/With-ALIF/logo_zone/blob/main/education/mc.jpeg?raw=true', 2),
('Secondary School Certificate', 'Ideal Residential Model School', 'Dinajpur', 'Class 9 to 10', '2019 - 2021', 'Completed secondary education with a science background.', 'https://github.com/With-ALIF/logo_zone/blob/main/education/download.jpeg?raw=true', 3),
('Junior School Certificate', 'Maddhapara Granite Mine School', 'Dinajpur', 'Class 6 to 8', '2016 - 2018', 'Completed junior level education.', 'https://github.com/With-ALIF/logo_zone/blob/main/education/mgms.jpg?raw=true', 4),
('Primary School Certificate', 'Doly Model Pre-Cadet School', 'Dinajpur', 'Class 2 to 5', '2012 - 2015', 'Completed primary education.', 'https://i.postimg.cc/Z5FPLC2J/Chat-GPT-Image-May-27-2026-08-16-48-PM.png', 5),
('Early Education', 'Ashim Uddin Standard Kindergarten School', 'Lalmonirhat', 'Nursery to Class 1', '2010 - 2011', 'Early childhood and foundational education.', 'https://i.postimg.cc/5trX5Jx3/asim.png', 6);

-- ============================================
-- SEED: experience
-- ============================================
INSERT INTO experience (role, company, logo, duration, description, sort_order) VALUES
('Web Developer', 'MNR World', 'https://github.com/With-ALIF/logo_zone/blob/main/person/naimur.png?raw=true', '2025 - Present', 'Implementing and reviewing web applications to ensure optimal performance and user experience.', 1);

-- ============================================
-- SEED: services
-- ============================================
INSERT INTO services (title, icon, description, sort_order) VALUES
('Web Development', 'code', 'Building fast, responsive, and scalable websites using modern technologies.', 1),
('Modern Website', 'monitor', 'Creating modern, clean, and user-friendly websites with best UI practices.', 2),
('Frontend Development', 'brush', 'I excel in frontend development, crafting intuitive and engaging user interfaces with expertise in HTML and CSS.', 3),
('Website Maintenance', 'wrench', 'Already have a website or web application but need ongoing maintenance? I provide reliable and efficient services.', 4);

-- ============================================
-- SEED: reviews
-- ============================================
INSERT INTO reviews (name, image, comment, is_published) VALUES
('Md. Shuyaib', 'https://github.com/With-ALIF/logo_zone/blob/main/person/shuyaib.jpg?raw=true', 'Alif demonstrates an exceptional ability to simplify complex problems, a quality that distinctly sets his work apart. Collaborating with him on the MNR Study project significantly strengthened thoughts about his ability.', true),
('Rafiuzzaman', 'https://github.com/With-ALIF/logo_zone/blob/main/person/rafiuzzaman.jpg?raw=true', 'My friend Alif, has successfully completed numerous projects with honesty, dedication, and professionalism. His sincere approach to work and strong commitment to quality consistently deliver excellent results.', true);

-- ============================================
-- SEED: workflow
-- ============================================
INSERT INTO workflow (title, role, year, status, logo, sort_order) VALUES
('STUDY ON TELEGRAM', 'ADMIN & DEVELOPER', '2024 - Present', 'Active', 'https://i.postimg.cc/XNQfQ063/sot.jpg', 1),
('MNR World', 'WEB DEVELOPER', '2025 - Present', 'Active', 'https://github.com/With-ALIF/logo_zone/blob/main/person/naimur.png?raw=true', 2);

-- ============================================
-- SEED: tools
-- ============================================
INSERT INTO tools (name, icon, sort_order) VALUES
('GitHub', 'https://github.com/With-ALIF/logo_zone/blob/main/images/GitHub.png?raw=true', 1),
('VS Code', 'https://github.com/With-ALIF/logo_zone/blob/main/images/VS%20Code.png?raw=true', 2),
('Vercel', 'https://cdn.dribbble.com/userupload/43626927/file/original-041aee49c4e9471da3d0987f70853baa.jpg?format=webp&resize=400x300&vertical=center', 3),
('Netlify', 'https://github.com/With-ALIF/logo_zone/blob/main/images/Netlify.png?raw=true', 4);
