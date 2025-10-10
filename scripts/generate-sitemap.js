import fs from "fs";
import path from "path";

const baseUrl = "https://kwizia.vercel.app";

const routes = [
    "/",
    "/blog",
    "/leaderboard",
    "/faq",
    "/contact-us",
    "/signin",
    "/signup"
];

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <priority>${
      route === "/" ? "1.0" : route.startsWith("/blog") ? "0.8" : "0.6"
    }</priority>
  </url>`
  )
  .join("")}
</urlset>`;

const outputPath = path.resolve("public", "sitemap.xml");
fs.writeFileSync(outputPath, sitemap.trim());

console.log("✅ Sitemap generated successfully:", outputPath);
