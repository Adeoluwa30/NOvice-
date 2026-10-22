// Writes a static HTML file per route so link previews and crawlers get the
// right title, description, canonical URL, share card and structured data
// without running JavaScript. Each file is the built index.html with only its
// <head> swapped, so the React app still boots and takes over as before.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { projects } from "../src/data/projects.js";
import {
  defaultMeta,
  metaTitle,
  pageMeta,
  projectMeta,
  SITE_ORIGIN as ORIGIN,
} from "../src/data/meta.js";
import {
  DEFAULT_OG_IMAGE,
  aboutSchema,
  contactSchema,
  homeSchema,
  ogImageFor,
  projectSchema,
  workSchema,
} from "../src/data/schema.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Overridable so a development build can be prerendered when debugging.
const dist = path.join(root, process.env.DIST_DIR || "dist");
const ssr = path.join(root, process.env.SSR_DIR || "dist-ssr");
const { render } = await import(pathToFileURL(path.join(ssr, "entry-server.js")).href);

const routes = [
  {
    path: "/",
    title: defaultMeta.title,
    description: defaultMeta.description,
    priority: "1.0",
    image: DEFAULT_OG_IMAGE,
    type: "website",
    schema: homeSchema(),
  },
  ...[
    ["/work", pageMeta.work, "0.9", workSchema],
    ["/about", pageMeta.about, "0.8", aboutSchema],
    ["/contact", pageMeta.contact, "0.7", contactSchema],
  ].map(([routePath, meta, priority, build]) => ({
    path: routePath,
    title: metaTitle(meta.title),
    description: meta.description,
    priority,
    image: DEFAULT_OG_IMAGE,
    type: "website",
    schema: build(meta),
  })),
  ...projects.map((project) => {
    const meta = projectMeta(project);
    const title = metaTitle(meta.title);
    return {
      path: `/work/${project.slug}`,
      title,
      description: meta.description,
      priority: "0.8",
      image: ogImageFor(project),
      type: "article",
      schema: projectSchema(project, { ...meta, title }),
    };
  }),
  {
    path: "/404",
    file: "404.html",
    title: "Page not found, Adeoluwa Adeoye",
    description: "That page doesn't exist. The work, the story and the contact details are one click away.",
    image: DEFAULT_OG_IMAGE,
    type: "website",
    schema: null,
    robots: "noindex, follow",
    inSitemap: false,
  },
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
  const image = escapeAttribute(route.image.url);
  const imageAlt = escapeAttribute(route.image.alt);
  const schema = route.schema ? JSON.stringify(route.schema).replace(/</g, "\\u003c") : null;

  const swaps = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
    [/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`],
    [/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta\s+property="og:type"\s+content=")[^"]*(")/, `$1${route.type}$2`],
    [/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta\s+property="og:image"\s+content=")[^"]*(")/, `$1${image}$2`],
    [/(<meta\s+property="og:image:secure_url"\s+content=")[^"]*(")/, `$1${image}$2`],
    [/(<meta\s+property="og:image:type"\s+content=")[^"]*(")/, `$1${route.image.mime}$2`],
    [/(<meta\s+property="og:image:width"\s+content=")[^"]*(")/, `$1${route.image.width}$2`],
    [/(<meta\s+property="og:image:height"\s+content=")[^"]*(")/, `$1${route.image.height}$2`],
    [/(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/, `$1${imageAlt}$2`],
    [/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`],
    [/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${description}$2`],
    [/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/, `$1${image}$2`],
    [/(<meta\s+name="twitter:image:alt"\s+content=")[^"]*(")/, `$1${imageAlt}$2`],
    // A page with no meaningful schema (the 404) ships no block at all rather
    // than an empty graph.
    schema
      ? [
          /<script type="application\/ld\+json" data-schema>[\s\S]*?<\/script>/,
          `<script type="application/ld+json" data-schema>${schema}</script>`,
        ]
      : [/\s*<script type="application\/ld\+json" data-schema>[\s\S]*?<\/script>/, ""],
  ];

  let html = swaps.reduce(
    (output, [pattern, replacement]) => output.replace(pattern, replacement),
    template
  );

  if (route.robots) {
    html = html.replace("</head>", `  <meta name="robots" content="${route.robots}" />\n  </head>`);
  }

  // Fail the build rather than ship a page with the wrong share card or schema.
  const checks = [`<title>${title}</title>`, `href="${url}"`, `content="${image}"`];
  if (schema) checks.push(`data-schema>${schema.slice(0, 24)}`);
  for (const check of checks) {
    if (!html.includes(check)) {
      throw new Error(`Could not apply ${check.slice(0, 40)} for ${route.path}. Did index.html change shape?`);
    }
  }

  return html;
};

const rootPlaceholder = '<div id="root"></div>';
// Re-running the prerender must start from an empty container, so a previous
// run's markup is stripped out of the template first.
const template = (
  await readFile(path.join(dist, "index.html"), "utf8")
).replace(/<div id="root">[\s\S]*<\/div>\s*(?=<\/body>)/, rootPlaceholder + "\n    ");

if (!template.includes(rootPlaceholder)) {
  throw new Error("dist/index.html no longer has an empty #root to fill.");
}

for (const route of routes) {
  const file =
    route.file !== undefined
      ? path.join(dist, route.file)
      : route.path === "/"
        ? path.join(dist, "index.html")
        : path.join(dist, `${route.path.slice(1)}.html`);

  const appHtml = await render(route.path);

  // Guard against silently shipping an empty shell if a component fails.
  if (!appHtml.includes("<main") || appHtml.length < 4000) {
    throw new Error(`Server render for ${route.path} produced no page body.`);
  }

  const html = withMeta(template, route).replace(
    rootPlaceholder,
    `<div id="root">${appHtml}</div>`
  );

  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((route) => route.inSitemap !== false)
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

console.log(`Prerendered ${routes.length} pages (including 404.html) and wrote sitemap.xml`);
