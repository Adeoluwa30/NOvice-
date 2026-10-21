import { useEffect } from "react";
import { defaultMeta, SITE_ORIGIN } from "../data/meta";

// Keeps the document head in step with the route. The static HTML already has
// the right values for direct visits; this covers client-side navigation.
export function usePageMeta(title, description) {
  useEffect(() => {
    const pageTitle = title ? `${title}, Adeoluwa Adeoye` : defaultMeta.title;
    const pageDescription = description || defaultMeta.description;

    document.title = pageTitle;

    const set = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };

    set('meta[name="description"]', "content", pageDescription);
    set('meta[property="og:title"]', "content", pageTitle);
    set('meta[property="og:description"]', "content", pageDescription);
    set('meta[name="twitter:title"]', "content", pageTitle);
    set('meta[name="twitter:description"]', "content", pageDescription);

    // Always the production origin so a deploy URL or localhost never becomes
    // the canonical.
    const path = window.location.pathname.replace(/\/+$/, "");
    const url = path ? `${SITE_ORIGIN}${path}` : `${SITE_ORIGIN}/`;
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
  }, [title, description]);
}
