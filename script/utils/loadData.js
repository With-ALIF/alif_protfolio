import { supabase } from "../../config/supabase.js";

export function clearCache() {
  sessionStorage.removeItem("portfolio_cache");
}

const DEFAULT_LOGO = '<a href="/"><img src="https://github.com/With-ALIF/logo_zone/blob/main/alif/logo.jpg?raw=true" alt="Alif" style="height:40px;"></a>';

async function loadSiteContent(section) {
  try {
    const res = await supabase.from("alif_site_content").select("data").eq("section", section).single();
    if (!res.error && res.data) return res.data.data;
  } catch {}
  return null;
}

async function loadProjects() {
  let items = [];
  try {
    const res = await supabase.from("alif_projects").select("*").eq("is_published", true).order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return {
    title: "Featured <span class='text-gradient'>Projects</span>",
    items: items.map(p => ({
      id: p.id, title: p.title, description: p.description,
      tags: p.tags || [], image: p.image, github: p.github,
      demo: p.demo, slug: p.slug, show_github: p.show_github,
    }))
  };
}

async function loadSkills() {
  let items = [];
  try {
    const res = await supabase.from("alif_skills").select("*").order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return {
    title: "Technical <span class='text-gradient'>Skill</span>",
    items: items.map(s => ({ name: s.name, icon: s.icon, level: s.level }))
  };
}

async function loadEducation() {
  let items = [];
  try {
    const res = await supabase.from("alif_education").select("*").order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return items.map(e => ({
    logo: e.logo, degree: e.degree, institute: e.institute,
    district: e.district, class: e.class, year: e.year, description: e.description,
  }));
}

async function loadExperience() {
  let items = [];
  try {
    const res = await supabase.from("alif_experience").select("*").order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return items.map(e => ({
    role: e.role, company: e.company, logo: e.logo,
    duration: e.duration, description: e.description,
  }));
}

async function loadTools() {
  let items = [];
  try {
    const res = await supabase.from("alif_tools").select("*").order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return { items: items.map(t => ({ name: t.name, icon: t.icon })) };
}

async function loadReviews() {
  let items = [];
  try {
    const res = await supabase.from("alif_reviews").select("*").eq("is_published", true);
    if (!res.error && res.data) items = res.data;
  } catch {}
  return { items: items.map(r => ({ name: r.name, image: r.image, comment: r.comment })) };
}

async function loadServices() {
  let items = [];
  try {
    const res = await supabase.from("alif_services").select("*").order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return {
    title: "Services",
    items: items.map(s => ({ title: s.title, icon: s.icon, description: s.description }))
  };
}

async function loadWorkflow() {
  let items = [];
  try {
    const res = await supabase.from("alif_workflow").select("*").order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return items.map(w => ({
    year: w.year, title: w.title, role: w.role, status: w.status, logo: w.logo,
  }));
}

async function loadCertificates() {
  let items = [];
  try {
    const res = await supabase.from("alif_certificates").select("*").eq("is_published", true).order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return {
    title: "My <span class='text-gradient'>Achievements</span>",
    items: items.map(c => ({
      id: c.id, title: c.title, issuer: c.issuer, image: c.image,
      description: c.description, issued_date: c.issued_date,
      featured: c.featured,
    }))
  };
}

async function loadTags() {
  let items = [];
  try {
    const res = await supabase.from("alif_tag").select("*").order("sort_order", { ascending: true });
    if (!res.error && res.data) items = res.data;
  } catch {}
  return items.map(t => ({ name: t.name, icon: t.icon }));
}

export async function loadAllData() {
  const [
    meta, logo, navigator, hero, about, contact, footer, stats, seo,
    projects, skills, education, experience, tools,
    reviews, services, workflow, certificates, tags
  ] = await Promise.all([
    loadSiteContent("meta"),
    loadSiteContent("logo"),
    loadSiteContent("navigator"),
    loadSiteContent("hero"),
    loadSiteContent("about"),
    loadSiteContent("contact"),
    loadSiteContent("footer"),
    loadSiteContent("stats"),
    loadSiteContent("seo"),
    loadProjects(),
    loadSkills(),
    loadEducation(),
    loadExperience(),
    loadTools(),
    loadReviews(),
    loadServices(),
    loadWorkflow(),
    loadCertificates(),
    loadTags(),
  ]);

  return {
    meta, 
    logo: (logo && logo.html) ? logo : { html: DEFAULT_LOGO },
    navigator, hero, about, contact, footer, stats, seo,
    projects, skills, education, experience, tools,
    reviews, services, workflow, certificates, tags,
  };
}
