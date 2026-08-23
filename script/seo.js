const SITE_URL = "https://alif.mnr.bd";
const SITE_NAME = "Alif";
const DEFAULT_AUTHOR = "Abdullah Khalid Alif";
const DEFAULT_OG_IMAGE = "https://alif.mnr.bd/og-default.png";

export function setMetaTag(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function setCanonical(url) {
  let link = document.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

export function setJsonLd(data) {
  const id = "jsonld-" + (data["@type"] || "data").toLowerCase();
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function renderMeta(seo, contact) {
  const meta = seo || {};
  const title = meta?.title || "Alif — Abdullah Khalid Alif | Software Engineer";
  const description = meta?.description || "Abdullah Khalid Alif, also known as Alif, is a Software Engineer and CSE student from Bangladesh. Explore his portfolio, projects, skills, experience and contact information.";
  const keywords = meta?.keywords || "Alif, Abdullah Khalid Alif, Software Engineer, Portfolio, Bangladesh, CSE, Web Developer";
  const ogImage = meta?.og_image || DEFAULT_OG_IMAGE;
  const canonical = meta?.canonical_url || SITE_URL;
  const noIndex = meta?.no_index || false;

  document.title = title;

  setMetaTag("description", description);
  setMetaTag("keywords", keywords);
  setMetaTag("author", DEFAULT_AUTHOR);
  setMetaTag("robots", noIndex ? "noindex, nofollow" : "index, follow");
  setMetaTag("theme-color", "#050816");

  setMetaTag("og:type", "website");
  setMetaTag("og:title", meta?.og_title || title);
  setMetaTag("og:description", meta?.og_description || description);
  setMetaTag("og:image", ogImage);
  setMetaTag("og:url", canonical);
  setMetaTag("og:site_name", SITE_NAME);
  setMetaTag("og:locale", "en_US");

  setMetaTag("twitter:card", "summary_large_image");
  setMetaTag("twitter:title", meta?.og_title || title);
  setMetaTag("twitter:description", meta?.og_description || description);
  setMetaTag("twitter:image", ogImage);

  setCanonical(canonical);

  const link = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = "https://github.com/With-ALIF/logo_zone/blob/main/alif/logo.jpg?raw=true?v=" + Date.now();
  }

  injectPersonJsonLd(meta, contact);
  injectWebSiteJsonLd(meta);
}

function injectPersonJsonLd(meta, contact) {
  const sameAs = [];
  const contactData = contact || meta;
  if (contactData?.socials) {
    const s = contactData.socials;
    if (s.github?.url) sameAs.push(s.github.url);
    else if (typeof s.github === "string") sameAs.push(s.github);
    if (s.linkedin?.url) sameAs.push(s.linkedin.url);
    else if (typeof s.linkedin === "string") sameAs.push(s.linkedin);
    if (s.twitter?.url) sameAs.push(s.twitter.url);
    else if (typeof s.twitter === "string") sameAs.push(s.twitter);
    if (s.instagram?.url) sameAs.push(s.instagram.url);
    else if (typeof s.instagram === "string") sameAs.push(s.instagram);
    if (s.facebook?.url) sameAs.push(s.facebook.url);
    else if (typeof s.facebook === "string") sameAs.push(s.facebook);
    if (s.youtube?.url) sameAs.push(s.youtube.url);
    else if (typeof s.youtube === "string") sameAs.push(s.youtube);
  }

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abdullah Khalid Alif",
    "alternateName": ["Alif", "Abdullah Al Khalid Alif"],
    "url": SITE_URL,
    "jobTitle": "Software Engineer",
    "description": meta?.description || "Software Engineer and CSE student from Bangladesh",
    "image": DEFAULT_OG_IMAGE,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD"
    }
  };

  if (sameAs.length > 0) person.sameAs = sameAs;

  setJsonLd(person);
}

function injectWebSiteJsonLd(meta) {
  setJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "alternateName": "Abdullah Khalid Alif",
    "url": SITE_URL,
    "description": meta?.description || "Portfolio of Abdullah Khalid Alif"
  });
}

export function setProjectMeta(project, slug) {
  const title = project?.title
    ? `${project.title} | Alif — Abdullah Khalid Alif`
    : "Project | Alif";
  const description = project?.description
    ? `${project.title} — ${project.description}`.substring(0, 160)
    : `${project?.title || "Project"} by Abdullah Khalid Alif. Explore this project's details, technologies, and features.`;
  const image = project?.thumbnail || project?.image || DEFAULT_OG_IMAGE;
  const canonical = `${SITE_URL}/project/project.html?id=${slug}`;

  document.title = title;
  setMetaTag("description", description);
  setMetaTag("robots", "index, follow");
  setMetaTag("author", DEFAULT_AUTHOR);

  setMetaTag("og:type", "article");
  setMetaTag("og:title", title);
  setMetaTag("og:description", description);
  setMetaTag("og:image", image);
  setMetaTag("og:url", canonical);

  setMetaTag("twitter:card", "summary_large_image");
  setMetaTag("twitter:title", title);
  setMetaTag("twitter:description", description);
  setMetaTag("twitter:image", image);

  setCanonical(canonical);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project?.title || "Project",
    "description": description,
    "url": canonical,
    "image": image,
    "author": {
      "@type": "Person",
      "name": "Abdullah Khalid Alif",
      "url": SITE_URL
    }
  };

  if (project?.technologies?.length) {
    ld.technologies = project.technologies.map(t => t.name || t);
  }

  setJsonLd(ld);
}

export function setJsonLdFromData(data) {
  setJsonLd(data);
}
