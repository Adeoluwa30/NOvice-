// Single source of truth for page titles and descriptions. The React pages use
// these at runtime; scripts/prerender.mjs uses the same strings at build time so
// the HTML a social scraper sees matches what the app renders.

export const SITE_ORIGIN = "https://adeoluwa.site";

export const defaultMeta = {
  title: "Adeoluwa Adeoye, Product Designer: UI/UX, Brand & Motion",
  description:
    "Adeoluwa Adeoye is a product designer in Lagos, Nigeria, working worldwide across UI/UX, design systems, brand and motion: mobile apps, web platforms and the identity around them.",
};

// `work`, `graphics` and `motion` are the three tabs of the Projects page.
export const pageMeta = {
  work: {
    title: "Product Design Projects",
    description:
      "Product design case studies by Adeoluwa Adeoye: Chef4me User, Chef4me Chef, Chef4me Web App, Brandit and Bubble, with SecureComply on the way.",
  },
  graphics: {
    title: "Graphic Design Projects",
    description:
      "Graphic design by Adeoluwa Adeoye: campaign art, identity, packaging, posters and event graphics. Open for graphic design commissions, with the full archive on Behance.",
  },
  motion: {
    title: "Motion Design Projects",
    description:
      "Motion design by Adeoluwa Adeoye: product and UI animation, micro-interactions, motion graphics and social video. Open for motion commissions.",
  },
  about: {
    title: "About",
    description:
      "Adeoluwa Adeoye is a product designer in Lagos, Nigeria, working across UX, interface design, design systems, brand and motion for teams worldwide.",
  },
  contact: {
    title: "Contact",
    description:
      "Start a project, ask a question or just say hello. Contact Adeoluwa Adeoye, product designer for UI/UX, brand and motion.",
  },
};

export const projectMeta = (project) => ({
  title: `${project.title}, Case Study`,
  description: project.tagline,
});

export const metaTitle = (title) => (title ? `${title}, Adeoluwa Adeoye` : defaultMeta.title);
