import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://cvmmpnpvstrwgfmhfplw.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bW1wbnB2c3Ryd2dmbWhmcGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NzI3MDQsImV4cCI6MjA5NzM0ODcwNH0.v0almOw_atds8v44EXDiwnAMPE9EhHg8WE4YltTDbzM";
const SITE_URL = "https://alif.mnr.bd";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function handler(req, res) {
  try {
    const urls = [];

    urls.push({
      loc: SITE_URL + "/",
      changefreq: "weekly",
      priority: "1.0",
      lastmod: new Date().toISOString().split("T")[0]
    });

    const { data: projects } = await supabase
      .from("alif_projects")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (projects) {
      for (const p of projects) {
        const slug = p.slug || p.title.toLowerCase().replace(/\s+/g, "-");
        urls.push({
          loc: `${SITE_URL}/project/project.html?id=${slug}`,
          changefreq: "monthly",
          priority: "0.8",
          lastmod: p.updated_at ? new Date(p.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]
        });
      }
    }

    const sections = ["about", "skills", "experience", "education", "services", "reviews", "workflow", "tools", "certificates"];
    for (const section of sections) {
      urls.push({
        loc: `${SITE_URL}/#${section}`,
        changefreq: "monthly",
        priority: "0.6",
        lastmod: new Date().toISOString().split("T")[0]
      });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(u => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    res.status(200).send(xml);
  } catch (err) {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
  }
}
