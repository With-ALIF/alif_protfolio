-- Project Details table (run after schema.sql)

CREATE TABLE IF NOT EXISTS project_details (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE project_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON project_details FOR SELECT USING (true);
CREATE POLICY "Auth write" ON project_details FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Seed all 6 project details
INSERT INTO project_details (id, data) VALUES

('portfolio-website', '{
  "id": "portfolio-website",
  "title": "Portfolio Website",
  "category": "Portfolio Platform",
  "status": "Completed",
  "featured": true,
  "description": "A performance-driven portfolio platform built with Vanilla JavaScript, featuring schema-driven JSON rendering for dynamic project management and scalable frontend architecture.",
  "fullDescription": "This portfolio platform is a production-grade digital showcase built for scalability, maintainability, and high-performance user experiences. Developed with Vanilla JavaScript (ES6+) and a modular frontend architecture, it utilizes schema-driven JSON rendering to dynamically generate project pages and technical case studies without requiring structural HTML changes. Its decoupled, data-driven system separates content management from the presentation layer, improving flexibility and development efficiency. Leveraging CSS3 Flexbox and strict responsive design principles, the platform features optimized asset delivery, lazy-loaded media, lightweight runtime execution, and layouts fully aligned with modern accessibility standards. The result is a polished, extensible, and performance-focused portfolio experience designed for professional presentation and seamless long-term content integration.",
  "thumbnail": "https://i.postimg.cc/5yzJwhXB/pic.png",
  "gallery": [{"image":"https://i.postimg.cc/5yzJwhXB/pic.png","title":"Homepage Overview"},{"image":"https://i.postimg.cc/htKj6VQd/uuuu.png","title":"Project Details Interface"},{"image":"https://raw.githubusercontent.com/alif982/picture/refs/heads/main/alifcover.jpg","title":"About Me"}],
  "tags": ["Frontend Architecture","Dynamic Rendering","JSON Schema","Performance Optimization","Responsive Design"],
  "technologies": [{"name":"HTML5","icon":"https://github.com/With-ALIF/logo_zone/blob/main/images/html5..png?raw=true"},{"name":"CSS3","icon":"https://github.com/With-ALIF/logo_zone/blob/main/images/css3.png?raw=true"},{"name":"Vanilla JavaScript","icon":"https://github.com/With-ALIF/logo_zone/blob/main/images/JavaScript.png?raw=true"},{"name":"Flexbox","icon":"https://i.postimg.cc/tTNhPTY7/flexbox.png"},{"name":"Responsive Design","icon":"https://cdn-icons-png.flaticon.com/512/2535/2535547.png"},{"name":"JSON Data Structure","icon":"https://i.postimg.cc/VN374df4/json.png"}],
  "features": ["Fully dynamic project architecture powered by modular JSON data.","Dedicated project detail pages rendered through URL-based routing.","Modern responsive interface optimized for desktop, tablet, and mobile devices.","Interactive gallery system with scalable media presentation.","Reusable UI rendering components for streamlined frontend development.","Expandable project ecosystem designed for future scalability and maintainability."],
  "timeline": [{"title":"Research & Architecture Planning","detail":"Designed the core content architecture, navigation flow, and scalable JSON schemas for dynamic rendering.","date":"Phase 1"},{"title":"UI Components & Responsive Layouts","detail":"Built semantic HTML5 structures and structured CSS3 layouts using Flexbox for strict responsive design.","date":"Phase 2"},{"title":"Core Logic & JSON Rendering","detail":"Developed Vanilla JavaScript modules to parse JSON data and dynamically inject project pages without code changes.","date":"Phase 3"},{"title":"Performance Optimization & Testing","detail":"Implemented lazy-loading for media, minimized runtime overhead, and ensured modern web accessibility standards.","date":"Phase 4"},{"title":"Final Polishing & Deployment","detail":"Conducted cross-device performance audits, refined the polished UX, and successfully deployed the platform.","date":"Phase 5"}],
  "statistics": [{"label":"Total Sections","value":"14"},{"label":"Performance Score","value":"95%"},{"label":"Project Assets","value":"12"},{"label":"Core Technologies","value":"4"}],
  "challenges": ["Implementing dynamic routing and project rendering without using modern frontend frameworks like React.","Designing a scalable JSON schema capable of handling diverse project content and media structures.","Ensuring fast loading speeds and smooth performance across low-end mobile devices.","Preventing UI crashes or broken layouts when dealing with missing, incomplete, or invalid JSON data."],
  "solutions": ["Developed a robust Vanilla JavaScript rendering module to handle dynamic asynchronous data injection natively.","Created a lightweight, decoupled manifest-driven JSON architecture for independent content management.","Optimized frontend structures by implementing lazy-loaded media, compressed assets, and minimal runtime execution.","Built robust fallback UI states, image placeholders, and structured error handling into the data pipeline."],
  "results": ["Achieved absolute content flexibility with a 100% JSON-powered dynamic portfolio platform.","Drastically reduced maintenance overhead, allowing new project additions without touching structural HTML/CSS code.","Delivered a near-instantaneous browsing experience with high-performance execution across all device tiers.","Ensured modern web accessibility standards, cross-browser consistency, and fully responsive fluid layouts."],
  "github": "https://github.com/With-ALIF/alif_protfolio",
  "demo": "https://alif.mnr.bd/"
}'),

('alif-tools', '{
  "id": "alif-tools",
  "title": "ALIF Tools",
  "category": "Web Application",
  "featured": true,
  "status": "Completed",
  "description": "A modern and privacy-focused online platform designed for processing PDF and image files through a fast, lightweight, and user-friendly web experience.",
  "fullDescription": "ALIF Tools is a professionally engineered web-based utility platform developed to simplify PDF and image processing through a fast, privacy-centric user experience. Achieving an exceptional 98/100 performance optimization rating, the platform features a modular frontend architecture powered by React and TypeScript. Dedicated client-side workflows handle file manipulation and conversion efficiently, eliminating the need for software installation. Built with a strong focus on lightweight rendering, responsive design, and strict accessibility standards, the system ensures swift browser interactions. User privacy is guaranteed as files are processed instantly without permanent storage. Architected for scalability, ALIF Tools seamlessly supports future integrations like AI workflows while maintaining its elite performance standards.",
  "thumbnail": "https://github.com/With-ALIF/logo_zone/blob/main/project/alif-tools.png?raw=true",
  "demo": "https://alif-tools.vercel.app",
  "github": "https://github.com/With-ALIF/alif-tools",
  "technologies": [{"name":"React 19","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{"name":"TypeScript","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},{"name":"Tailwind CSS","icon":"https://github.com/With-ALIF/logo_zone/blob/main/images/tailwind.png?raw=true"},{"name":"Next.js","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"}],
  "tags": ["PDF Tools","Image Processing","File Conversion","Productivity","TypeScript","Privacy Focused"],
  "features": ["Dynamic browser-based PDF and image processing workflows.","Privacy-first file handling with instant processing and automatic deletion.","Modern responsive UI optimized for desktop, tablet, and mobile devices.","Scalable architecture prepared for future AI-powered enhancements."],
  "statistics": [{"label":"Available Tools","value":"8+"},{"label":"Core Technologies","value":"9"},{"label":"Reusable Components","value":"15+"},{"label":"Performance Score","value":"92%"}],
  "challenges": ["Designing a scalable architecture capable of supporting multiple independent processing tools.","Maintaining responsive performance while handling browser-based file processing workflows.","Ensuring consistent UI/UX across different utilities and screen sizes."],
  "solutions": ["Developed a modular React and TypeScript architecture for scalable feature integration.","Optimized frontend rendering and lightweight asset delivery for improved performance.","Implemented reusable UI components and centralized utility configurations."],
  "results": ["Delivered a fast and responsive browser-based utility platform.","Established a scalable foundation for future productivity and AI-powered tools.","Improved user accessibility through installation-free web utilities."],
  "timeline": [{"date":"Phase 1","title":"Project Planning & Architecture","detail":"Defined platform structure, modular architecture, and processing workflows."},{"date":"Phase 2","title":"Frontend System Development","detail":"Built responsive interfaces, reusable components, and routing systems."},{"date":"Phase 3","title":"PDF & Image Tool Integration","detail":"Integrated processing utilities for image and PDF manipulation."},{"date":"Phase 4","title":"Performance Optimization","detail":"Optimized rendering, responsiveness, and lightweight asset delivery."},{"date":"Phase 5","title":"Future Scalability Preparation","detail":"Prepared the platform architecture for AI-powered and advanced productivity features."}],
  "gallery": [{"image":"https://i.postimg.cc/wjzCkVRY/home.png","title":"Homepage Interface"},{"image":"https://i.postimg.cc/W1syZ1xT/pdf0009.png","title":"PDF Processing Tools"},{"image":"https://i.postimg.cc/rp1zPgQv/0000.png","title":"Image Editing Utilities"}]
}'),

('alif-blog', '{
  "id": "alif-blog",
  "title": "Alif Blog",
  "featured": true,
  "status": "Under Development",
  "description": "Alif Blog — A modern portfolio blog showcasing web development projects, tech insights, tutorials, and creative digital experiences by Alif.",
  "fullDescription": "Alif Blog is a highly structured, performance-oriented blogging ecosystem optimized for multi-language display (English and Bangla). Built on Next.js 15 and Firebase, it addresses localization challenges by enabling asynchronous, non-blocking database writes alongside automated AI processes.",
  "thumbnail": "https://i.postimg.cc/6qwX4cy3/blog009.png",
  "demo": "https://alif-blog.vercel.app/",
  "github": "https://github.com/With-ALIF/blog_site",
  "technologies": [{"name":"Next.js 15","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"},{"name":"React 19","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{"name":"TypeScript","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},{"name":"Firebase Firestore","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"},{"name":"Tailwind CSS","icon":"https://github.com/With-ALIF/logo_zone/blob/main/images/tailwind.png?raw=true"}],
  "tags": ["Full-Stack Development","AI-Powered Workflow","Bilingual (Bengali/English)","CMS Dashboard","Database Management"],
  "features": ["Bilingual switching (English ↔ Bangla) via dynamic Context Providers.","AI semantic search using cosine-similarity vector embeddings.","Admin workspace with Markdown editor, split preview, and post scheduling.","Nested comment system with automated avatar generation."],
  "statistics": [{"label":"Tech Stack","value":"12"},{"label":"Components","value":"45"},{"label":"Performance","value":"95"},{"label":"Accessibility","value":"98"}],
  "challenges": ["Maintaining synchronized bilingual content without causing UI latency.","Improving semantic search accuracy across translated and culturally varied queries.","Preventing race conditions in real-time multilingual data streams."],
  "solutions": ["Built a non-blocking async architecture for smooth Firebase operations.","Optimized bilingual synchronization for fast multilingual rendering.","Integrated AI-powered semantic search using vector embeddings."],
  "timeline": [{"date":"Phase 1","title":"Project Foundation","detail":"Initialized Next.js 15 architecture, multilingual routing, and Tailwind-Shadcn UI system."},{"date":"Phase 2","title":"Localization Engine","detail":"Built bilingual state management and dynamic English-Bangla content synchronization."},{"date":"Phase 3","title":"Database Infrastructure","detail":"Implemented asynchronous Firebase CRUD operations with optimized collection structures."},{"date":"Phase 4","title":"AI Semantic System","detail":"Integrated Google Genkit pipelines with vector embedding semantic search."},{"date":"Phase 5","title":"Admin Command Center","detail":"Developed advanced dashboards, markdown editors, analytics, and scheduling modules."}],
  "gallery": [{"image":"https://i.postimg.cc/Wz5k4TV3/blogpage890.png","title":"Blog Page Layout"},{"image":"https://i.postimg.cc/k5PBqBSZ/admincms.png","title":"Admin CMS Dashboard"}],
  "database": {"name":"Firebase Firestore","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg","description":"A Firebase Firestore database powering the blogging ecosystem."}
}'),

('tutor-flow', '{
  "id": "tutor-flow",
  "title": "Tuition Hub BD",
  "category": "Education Management",
  "featured": true,
  "status": "Completed",
  "description": "A comprehensive platform to manage tuition hubs — tracking students, attendance, fees, and hub statistics in one centralized digital solution.",
  "fullDescription": "TutorFlow is a full-featured tuition hub management system built to eliminate the hassle of manual record-keeping. It provides tuition center owners, individual tutors, and educational institutions with a streamlined dashboard to manage student profiles, mark daily attendance, monitor fee payments, and view hub-wide statistics.",
  "thumbnail": "https://i.postimg.cc/pL1W46B8/tutor.png",
  "demo": "https://tuition.mnr.bd/",
  "github": "https://github.com/With-ALIF/tutorflow",
  "technologies": [{"name":"React","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{"name":"TypeScript","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},{"name":"Supabase","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"},{"name":"Vite","icon":"https://img.icons8.com/fluent/1200/vite.jpg"},{"name":"lucide-react","icon":"https://i.postimg.cc/7hPSNkzP/lucide.png"}],
  "tags": ["Education","Dashboard","Tuition Management","Attendance","Fee Tracking"],
  "features": ["Student Management: Maintain detailed student profiles.","Attendance Tracking: Mark and review daily attendance with full historical records.","Fee Management: Monitor pending payments and view complete payment histories.","Dashboard Overview: Get real-time hub statistics and a summary of recent activities."],
  "statistics": [{"label":"Core Modules","value":"4"},{"label":"Tech Stack","value":"9"},{"label":"Performance Score","value":"95"},{"label":"Security Score","value":"94"}],
  "challenges": ["Scalable Firestore structure for multiple batches and students.","Real-time attendance sync without excessive Firestore read costs.","Intuitive UI for non-technical tuition center owners."],
  "solutions": ["Hierarchical Firestore structure: hubs → batches → students.","Firestore listeners with optimistic UI to minimize reads.","Clean Tailwind + Framer Motion UI with low learning curve."],
  "results": ["Eliminated manual attendance and fee record-keeping.","Single dashboard for all hub operations.","Real-time data sync with Firebase Firestore."],
  "timeline": [{"date":"Week 1","title":"Planning & Design","detail":"Defined requirements and designed Firestore data model and UI wireframes."},{"date":"Week 2","title":"Authentication & Setup","detail":"Configured Vite + React + TypeScript, integrated Firebase Auth and Firestore."},{"date":"Week 3","title":"Student Management","detail":"Built student profiles, enrollment flow, and batch management modules."},{"date":"Week 4","title":"Attendance Tracking","detail":"Implemented daily attendance marking with real-time Firestore sync."},{"date":"Week 5","title":"Fee Management & Dashboard","detail":"Developed fee monitoring, payment history, and hub statistics dashboard."},{"date":"Week 6","title":"Polish & Deployment","detail":"Added Framer Motion animations, responsive UI refinements, and deployed production build."}],
  "gallery": [{"image":"https://i.postimg.cc/pL1W46B8/tutor.png","title":"Hub Dashboard Overview"},{"image":"https://i.postimg.cc/LsCxzz2Y/tutor01.png","title":"Student Management Panel"},{"image":"https://i.postimg.cc/fy4jKCFR/tutor02.png","title":"Attendance Tracking View"},{"image":"https://i.postimg.cc/wvND7JBf/tutor023png.png","title":"Fee Management Screen"}],
  "database": {"name":"Supabase","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg","description":"A Supabase database powering the tuition hub."}
}'),

('web-poll', '{
  "id": "web-poll",
  "title": "Web Poll",
  "featured": true,
  "status": "Under Active Development",
  "description": "A comprehensive, AI-powered full-stack automation platform designed to generate, manage, and programmatically deploy interactive quiz polls to Telegram channels.",
  "fullDescription": "TeleQuiz is an advanced, high-density dashboard system that streamlines the operational pipeline for content creators managing educational Telegram channels. Integrated with the Google GenAI SDK (Gemini Pro), it converts unstructured raw text directly into normalized, schema-compliant quiz datasets.",
  "thumbnail": "https://i.postimg.cc/bvDdtxq3/polldashboard.png",
  "demo": "https://poll.mnr.bd/",
  "github": "https://github.com/With-ALIF/Web_Poll",
  "technologies": [{"name":"Vite","icon":"https://img.icons8.com/fluent/1200/vite.jpg"},{"name":"TypeScript","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},{"name":"Supabase","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"},{"name":"Lucide React","icon":"https://i.postimg.cc/7hPSNkzP/lucide.png"}],
  "tags": ["AI-Content Generation","Telegram Automation","MCQ Content Management","Role-Based Access Control","Cloud Run Application"],
  "features": ["AI quiz generation with real-time JSON parsing and character limit validation.","Manual quiz editor with transactional option and explanation validation.","Telegram queue engine for batched poll and photo message routing.","Printable exam paper generator with watermark and 2-column layout."],
  "statistics": [{"label":"Tech Stack","value":"10"},{"label":"Components","value":"34"},{"label":"Performance","value":"96"},{"label":"Security","value":"95"}],
  "challenges": ["Preventing double-voting without requiring intrusive user authentication.","Handling database write spikes during high-traffic viral polling events.","Syncing real-time poll results across thousands of concurrent browsers."],
  "solutions": ["Hybrid client fingerprinting with web crypto signatures and anonymized IP hashing.","Redis write-behind cache to absorb voting bursts.","SSE-based pub/sub with 1-second debounced aggregation for real-time UI updates."],
  "timeline": [{"title":"Architecture & Core Database Design","detail":"Established the core system layout, set up the multi-tenant database infrastructure.","date":"Phase 1"},{"title":"Authentication & Multi-Role Pipeline","detail":"Implemented secure identity workflows alongside granular access matrices.","date":"Phase 2"},{"title":"Real-Time Event Synchronization Engine","detail":"Built live stream adapters linking local view managers with background transactional collections.","date":"Phase 3"},{"title":"Optimization & Concurrent Load Mitigation","detail":"Deployed asynchronous write-behind routines to absorb concurrent submission traffic spikes.","date":"Phase 4"},{"title":"Content Integrity & Anti-Bot Shield","detail":"Integrated behavioral analysis layers and client side tracking.","date":"Phase 5"},{"title":"Desktop Publishing & Canvas Subsystems","detail":"Rolled out adjacent high-density tools including multi-column layout builders.","date":"Phase 6"},{"title":"Global Analytics Monitoring & Deployment","detail":"Finalized the unified metric dashboards and launched the containerized infrastructure.","date":"Phase 7"}],
  "gallery": [{"image":"https://i.postimg.cc/bvDdtxq3/polldashboard.png","title":"Homepage Overview"},{"image":"https://i.postimg.cc/zvVqs5Vm/channel09099.png","title":"Channel Page Interface"},{"image":"https://i.postimg.cc/mkzGdw5r/exam.png","title":"Exam Paper Generator"},{"image":"https://i.postimg.cc/bvmcpM7K/admin.png","title":"Admin CMS Dashboard"}],
  "database": {"name":"Supabase","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg","description":"A Supabase database that stores real-time poll data."}
}'),

('sot-payment-management-system', '{
  "id": "sot-payment-management-system",
  "title": "Payment Management Dashboard",
  "category": "Finance & Administration",
  "featured": true,
  "status": "Completed",
  "description": "A modern, responsive payment management dashboard for tracking student payments, filtering transactions, and exporting PDF reports.",
  "fullDescription": "A full-featured Payment Management Dashboard built with React, TypeScript, and Tailwind CSS. It enables admins to manage student payments across multiple courses and payment methods, with powerful search, sort, filter, bulk delete, and manual edit capabilities.",
  "thumbnail": "https://i.postimg.cc/cLjmCdmJ/sot0000.png",
  "demo": "https://paymet-sot.vercel.app/",
  "github": "https://github.com/With-ALIF/sot_ledger",
  "technologies": [{"name":"React","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{"name":"TypeScript","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},{"name":"Firebase","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"},{"name":"Lucide React","icon":"https://i.postimg.cc/7hPSNkzP/lucide.png"},{"name":"jsPDF","icon":"https://cdn-icons-png.flaticon.com/512/4726/4726010.png"}],
  "tags": ["Dashboard","Finance","Payment","PDF Export","Telegram Bot","Admin Panel"],
  "features": ["Dashboard stats with method-wise payment breakdown.","Search, sort, and filter transactions by multiple attributes.","Course management with per-course payment statistics.","PDF export and Telegram notifications with summary reports."],
  "statistics": [{"label":"Payment Methods","value":"5"},{"label":"Technologies Used","value":"9"},{"label":"Export Format","value":"PDF"},{"label":"Future Improvements","value":"4"}],
  "challenges": ["Managing real-time payment data across multiple courses and methods simultaneously.","Building a secure admin panel without exposing Telegram bot credentials in code.","Generating professional PDF reports with dynamic filtered data."],
  "solutions": ["Used Firebase real-time subscriptions to keep payment data in sync.","Built dynamic Telegram settings UI so bot token and channel ID are stored in the database.","Integrated jsPDF + jspdf-autotable to generate structured PDF reports."],
  "results": ["Centralized payment tracking across all courses and methods in one dashboard.","Eliminated hardcoded credentials with dynamic admin-controlled Telegram settings.","Enabled one-click professional PDF export for filtered payment reports."],
  "timeline": [{"date":"Week 1","title":"Planning & Setup","detail":"Defined features, set up React + TypeScript + Vite, and configured Supabase schema."},{"date":"Week 2","title":"Authentication & Admin Panel","detail":"Implemented secure admin login and dynamic Telegram bot settings UI."},{"date":"Week 3","title":"Payment Management","detail":"Built payment list with search, sort, filter, manual edit, and bulk delete."},{"date":"Week 4","title":"Course Management","detail":"Added course CRUD with logo support, course-wise payment linking and statistics."},{"date":"Week 5","title":"PDF Export & Notifications","detail":"Integrated jsPDF for payment reports and Telegram alerts."},{"date":"Week 6","title":"Polish & Deployment","detail":"Refined glassmorphism UI, added Framer Motion animations, tested on mobile, and deployed."}],
  "gallery": [{"image":"https://i.postimg.cc/cLjmCdmJ/sot0000.png","title":"Dashboard Overview"},{"image":"https://i.postimg.cc/V6S56cDh/000000.png","title":"Payment List & Filters"}],
  "database": {"name":"Firebase Firestore","icon":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg","description":"A Firebase Firestore database that securely stores and manages student payment transaction ledgers."}
}')

ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now();
