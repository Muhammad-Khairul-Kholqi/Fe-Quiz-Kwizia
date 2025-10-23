import {
    writeFileSync
} from "fs";

const baseUrl = "https://kwizia.vercel.app";

const routes = [{
        loc: "/",
        priority: 1.0
    },
    {
        loc: "/blog",
        priority: 0.8
    },
    {
        loc: "/leaderboard",
        priority: 0.8
    },
    {
        loc: "/faq",
        priority: 0.6
    },
    {
        loc: "/contact-us",
        priority: 0.6
    },
    {
        loc: "/signin",
        priority: 0.3
    },
    {
        loc: "/signup",
        priority: 0.3
    },
];

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `
  <url>
    <loc>${baseUrl}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

writeFileSync("public/sitemap.xml", sitemap);
console.log("✅ sitemap.xml berhasil dibuat di folder public/");
