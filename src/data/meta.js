// Single source of truth for page titles and descriptions. The React pages use
// these at runtime; scripts/prerender.mjs uses the same strings at build time so
// the HTML a social scraper sees matches what the app renders.

export const SITE_ORIGIN = "https://adeoluwa.site";

export const defaultMeta = {
  title: "Adeoluwa Adeoye, Product Designer & Interface Designer",
  description:
    "Adeoluwa Adeoye is a product designer and UI/UX designer based in Lagos, Nigeria, designing digital products where clarity, motion and craft meet.",
};

export const pageMeta = {
  work: {
    title: "Product Design Projects",
    description:
      "Selected product design work by Adeoluwa Adeoye: Chef4me User, Chef4me Chef, Chef4me Web App, Brandit and Bubble.",
  },
  graphics: {
    title: "Graphic Design",
    description:
      "Graphic design by Adeoluwa Adeoye: campaign art, identity, packaging, posters and event graphics. Open for graphic design commissions, with the full archive on Behance.",
  },
  about: {
    title: "About",
    description:
      "Adeoluwa Adeoye is a product designer and UI/UX designer in Lagos, Nigeria, working across experience design, interface systems and graphic design.",
  },
  contact: {
    title: "Contact",
    description:
      "Start a project, ask a question or just say hello. Contact Adeoluwa Adeoye, interface & experience designer.",
  },
};

export const projectMeta = (project) => ({
  title: `${project.title}, Case Study`,
  description: project.tagline,
});

export const metaTitle = (title) => (title ? `${title}, Adeoluwa Adeoye` : defaultMeta.title);
