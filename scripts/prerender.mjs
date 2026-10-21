// Writes a static HTML file per route so link previews and crawlers get the
// right title, description and canonical URL without running JavaScript.
// Each file is the built index.html with only its <head> meta swapped, so the
// React app still boots and takes over exactly as before.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.js";
import {
  defaultMeta,
  metaTitle,
  pageMeta,
  projectMeta,
  SITE_ORIGIN as ORIGIN,
} from "../src/data/meta.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const routes = [
  { path: "/", title: defaultMeta.title, description: defaultMeta.description, priority: "1.0" },
  ...[
    ["/work", pageMeta.work, "0.9"],
    ["/about", pageMeta.about, "0.8"],
    ["/contact", pageMeta.contact, "0.7"],
  ].map(([routePath, meta, priority]) => ({
    path: routePath,
    title: metaTitle(meta.title),
    description: meta.description,
    priority,
  })),
  ...projects.map((project) => {
    const meta = projectMeta(project);
    return {
      path: `/work/${project.slug}`,
      title: metaTitle(meta.title),
      description: meta.description,
      priority: "0.8",
    };
  }),
];

const escapeAttribute = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const withMeta = (template, route) => {
  const url = route.path === "/" ? `${ORIGIN}/` : `${ORIGIN}${route.path}`;
  const title = escapeAttribute(route.title);
  const description = escapeAttribute(route.description);

  const swaps = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
    [/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`],
    [/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${description}$2`],
  ];

  const html = swaps.reduce((output, [pattern, replacement]) => output.replace(pattern, replacement), template);

  // Fail the build rather than ship a page with the wrong share card.
  if (!html.includes(`<title>${title}</title>`) || !html.includes(`href="${url}"`)) {
    throw new Error(`Could not apply meta tags for ${route.path}. Did index.html change shape?`);
  }

  return html;
};

const template = await readFile(path.join(dist, "index.html"), "utf8");

for (const route of routes) {
  const file =
    route.path === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, `${route.path.slice(1)}.html`);

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, withMeta(template, route));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${ORIGIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

await writeFile(path.join(dist, "sitemap.xml"), sitemap);

console.log(`Prerendered ${routes.length} routes and wrote sitemap.xml`);
