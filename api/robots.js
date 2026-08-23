export default function handler(req, res) {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /admin/index.html
Disallow: /admin/panel.html

Sitemap: https://alif.mnr.bd/sitemap.xml`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
  res.status(200).send(robots);
}
