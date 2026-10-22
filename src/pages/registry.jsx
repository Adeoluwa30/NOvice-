/**
 * Code-split pages, rendered without a Suspense boundary.
 *
 * A Suspense boundary on the server leaves hydration markers that the static
 * prerendered HTML does not carry, so the page chunk is resolved before
 * hydration and each page renders as a plain component. The chunk is still
 * fetched on demand: a page that has not loaded yet renders nothing until its
 * import settles, which happens under the route-wipe on navigations.
 */
import { useEffect, useState } from "react";

const loaders = {
  Home: () => import("./Home"),
  Work: () => import("./Work"),
  Project: () => import("./Project"),
  About: () => import("./About"),
  Contact: () => import("./Contact"),
  NotFound: () => import("./NotFound"),
};

const loaded = new Map();
const pending = new Map();

function load(name) {
  if (loaded.has(name)) return Promise.resolve();
  if (!pending.has(name)) {
    pending.set(
      name,
      loaders[name]()
        .then((module) => {
          loaded.set(name, module.default);
          pending.delete(name);
        })
        .catch((error) => {
          // Let a later navigation retry instead of caching the failure.
          pending.delete(name);
          throw error;
        })
    );
  }
  return pending.get(name);
}

export function PageView({ name }) {
  const [entry, setEntry] = useState(() => ({
    name,
    Component: loaded.get(name) || null,
  }));

  useEffect(() => {
    let active = true;
    const show = () => {
      if (active) setEntry({ name, Component: loaded.get(name) });
    };

    if (loaded.has(name)) show();
    else load(name).then(show).catch(() => {});

    return () => {
      active = false;
    };
  }, [name]);

  // Never paint the previous route's page while the next chunk loads.
  const Component = entry.name === name ? entry.Component : null;
  return Component ? <Component /> : null;
}

export function pageForPath(pathname) {
  if (pathname.startsWith("/work/")) return "Project";
  if (pathname.startsWith("/work")) return "Work";
  if (pathname.startsWith("/about")) return "About";
  if (pathname.startsWith("/contact")) return "Contact";
  if (pathname === "/" || pathname === "") return "Home";
  return "NotFound";
}

// Resolve the page before hydration so the first client render matches the
// prerendered markup exactly.
export function preloadForPath(pathname) {
  return load(pageForPath(pathname));
}
