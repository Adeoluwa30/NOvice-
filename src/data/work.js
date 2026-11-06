// The Projects page is one page with three tabs, each on its own URL so a tab
// can be shared, prerendered and indexed on its own. `/work/:slug` is still a
// case study; these fixed paths win over the slug route.
export const WORK_TABS = [
  { id: "product", path: "/work", label: "Product design" },
  { id: "graphics", path: "/work/graphics", label: "Graphics" },
  { id: "motion", path: "/work/motion", label: "Motion" },
];

const clean = (pathname) => pathname.replace(/\/+$/, "") || "/";

export const workTabFor = (pathname) => WORK_TABS.find((tab) => tab.path === clean(pathname)) || null;
