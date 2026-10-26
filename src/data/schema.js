// Structured data for search engines. The same builders run in the browser
// (on client-side navigation) and in scripts/prerender.mjs, so the markup a
// crawler reads is always identical to what the app would have rendered.

import { projects } from "./projects.js";
import { graphics } from "./graphics.js";
import { SITE_ORIGIN, defaultMeta } from "./meta.js";
import { site, faqs } from "../site.js";

const PERSON_ID = `${SITE_ORIGIN}/#person`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_ORIGIN}/assets/og-adeoluwa.jpg`,
  width: 1200,
  height: 630,
  mime: "image/jpeg",
  alt: "Portrait of Adeoluwa Adeoye, product designer, Lagos.",
};

// Search engines read this as the image of the person, so it stays the
// full-resolution portrait rather than the cropped share card.
export const PORTRAIT_IMAGE = {
  url: `${SITE_ORIGIN}/assets/portrait-1400.webp`,
  width: 1400,
  height: 1874,
};

export const ogImageFor = (project) =>
  project
    ? {
        url: `${SITE_ORIGIN}${project.thumb}`,
        width: 1600,
        height: 1067,
        mime: "image/webp",
        alt: `${project.title}, ${project.kind.toLowerCase()} case study by Adeoluwa Adeoye`,
      }
    : DEFAULT_OG_IMAGE;

const workNode = (project) => ({
  "@type": "CreativeWork",
  "@id": `${SITE_ORIGIN}/work/${project.slug}#work`,
  name: project.title,
  url: `${SITE_ORIGIN}/work/${project.slug}`,
  description: project.tagline,
  image: `${SITE_ORIGIN}${project.thumb}`,
  creator: { "@id": PERSON_ID },
  datePublished: project.year,
  genre: project.discipline,
  about: project.industry,
});

const personNode = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  jobTitle: site.role,
  description: defaultMeta.description,
  url: `${SITE_ORIGIN}/`,
  email: `mailto:${site.email}`,
  image: {
    "@type": "ImageObject",
    url: PORTRAIT_IMAGE.url,
    width: PORTRAIT_IMAGE.width,
    height: PORTRAIT_IMAGE.height,
    caption: `${site.name}, ${site.role}`,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: site.socials.map((social) => social.href),
  knowsAbout: [
    "Experience design",
    "Interface design",
    "Design systems",
    "Product design",
    "Graphic design",
  ],
});

const websiteNode = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_ORIGIN}/`,
  name: site.name,
  description: defaultMeta.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
});

const breadcrumbs = (trail) => ({
  "@type": "BreadcrumbList",
  "@id": `${SITE_ORIGIN}${trail[trail.length - 1][1]}#breadcrumbs`,
  itemListElement: trail.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`,
  })),
});

const itemList = (nodes) => ({
  "@type": "ItemList",
  name: "Selected projects",
  numberOfItems: nodes.length,
  itemListElement: nodes.map((node, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: node,
  })),
});

const page = (type, path, title, description) => ({
  "@type": type,
  "@id": `${path === "/" ? SITE_ORIGIN + "/" : SITE_ORIGIN + path}#page`,
  url: path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`,
  name: title,
  description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  inLanguage: "en",
});

const graph = (nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

export function homeSchema() {
  return graph([
    personNode(),
    websiteNode(),
    {
      ...page(
        "ProfilePage",
        "/",
        defaultMeta.title,
        defaultMeta.description
      ),
      mainEntity: { "@id": PERSON_ID },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: PORTRAIT_IMAGE.url,
        width: PORTRAIT_IMAGE.width,
        height: PORTRAIT_IMAGE.height,
      },
    },
    itemList(projects.map(workNode)),
  ]);
}

export function workSchema(meta) {
  return graph([
    personNode(),
    websiteNode(),
    page("CollectionPage", "/work", `Projects, ${site.name}`, meta.description),
    breadcrumbs([
      ["Home", "/"],
      ["Projects", "/work"],
    ]),
    itemList(projects.map(workNode)),
  ]);
}

export function projectSchema(project, meta) {
  return graph([
    personNode(),
    {
      ...workNode(project),
      "@type": ["CreativeWork", "Article"],
      headline: meta.title,
      abstract: project.summary,
      keywords: [project.discipline, project.industry, project.platform]
        .filter(Boolean)
        .join(", "),
      author: { "@id": PERSON_ID },
    },
    page("WebPage", `/work/${project.slug}`, meta.title, meta.description),
    ...(project.faqs?.length
      ? [
          {
            "@type": "FAQPage",
            "@id": `${SITE_ORIGIN}/work/${project.slug}#faq`,
            mainEntity: project.faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
        ]
      : []),
    breadcrumbs([
      ["Home", "/"],
      ["Projects", "/work"],
      [project.title, `/work/${project.slug}`],
    ]),
  ]);
}

export function graphicsSchema(meta) {
  return graph([
    personNode(),
    websiteNode(),
    page(
      "CollectionPage",
      "/graphics",
      `Graphic design, ${site.name}`,
      meta.description
    ),
    {
      "@type": "ImageGallery",
      "@id": `${SITE_ORIGIN}/graphics#gallery`,
      name: `Graphic design, ${site.name}`,
      description: meta.description,
      about: { "@id": PERSON_ID },
      image: graphics.map((piece) => `${SITE_ORIGIN}${piece.src}`),
    },
    breadcrumbs([
      ["Home", "/"],
      ["Graphics", "/graphics"],
    ]),
  ]);
}

export function aboutSchema(meta) {
  return graph([
    personNode(),
    websiteNode(),
    {
      ...page("AboutPage", "/about", `About, ${site.name}`, meta.description),
      mainEntity: { "@id": PERSON_ID },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: PORTRAIT_IMAGE.url,
        width: PORTRAIT_IMAGE.width,
        height: PORTRAIT_IMAGE.height,
      },
    },
    breadcrumbs([
      ["Home", "/"],
      ["About", "/about"],
    ]),
  ]);
}

export function contactSchema(meta) {
  return graph([
    personNode(),
    websiteNode(),
    {
      ...page("ContactPage", "/contact", `Contact, ${site.name}`, meta.description),
      mainEntity: { "@id": PERSON_ID },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/contact#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    breadcrumbs([
      ["Home", "/"],
      ["Contact", "/contact"],
    ]),
  ]);
}

export { PERSON_ID, WEBSITE_ID };
