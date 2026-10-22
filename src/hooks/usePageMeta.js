import { useEffect } from "react";
import { defaultMeta, SITE_ORIGIN } from "../data/meta";
import { DEFAULT_OG_IMAGE } from "../data/schema";

// Keeps the document head in step with the route: title, description, share
// image and structured data. The prerendered HTML already has the right values
// for direct visits; this covers client-side navigation.
export function usePageMeta(title, description, extras = {}) {
  const { image = DEFAULT_OG_IMAGE, type = "website", schema, robots } = extras;

  useEffect(() => {
    const pageTitle = title ? `${title}, Adeoluwa Adeoye` : defaultMeta.title;
    const pageDescription = description || defaultMeta.description;

    document.title = pageTitle;

    const set = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };

    set('meta[name="description"]', "content", pageDescription);
    set('meta[property="og:type"]', "content", type);
    set('meta[property="og:title"]', "content", pageTitle);
    set('meta[property="og:description"]', "content", pageDescription);
    set('meta[property="og:image"]', "content", image.url);
    set('meta[property="og:image:secure_url"]', "content", image.url);
    set('meta[property="og:image:width"]', "content", String(image.width));
    set('meta[property="og:image:height"]', "content", String(image.height));
    set('meta[property="og:image:alt"]', "content", image.alt);
    set('meta[name="twitter:title"]', "content", pageTitle);
    set('meta[name="twitter:description"]', "content", pageDescription);
    set('meta[name="twitter:image"]', "content", image.url);
    set('meta[name="twitter:image:alt"]', "content", image.alt);

    // Always the production origin so a deploy URL or localhost never becomes
    // the canonical.
    const path = window.location.pathname.replace(/\/+$/, "");
    const url = path ? `${SITE_ORIGIN}${path}` : `${SITE_ORIGIN}/`;
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);

    if (schema) {
      const script = document.querySelector("script[data-schema]");
      if (script) {
        // `</script>` inside a string would end the block early.
        script.textContent = JSON.stringify(schema).replace(/</g, "\\u003c");
      }
    }

    // Keep the soft 404 out of the index without leaving the tag behind when
    // the visitor navigates somewhere real.
    let robotsMeta = document.querySelector('meta[name="robots"][data-route]');
    if (robots) {
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.setAttribute("name", "robots");
        robotsMeta.setAttribute("data-route", "");
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute("content", robots);
    } else if (robotsMeta) {
      robotsMeta.remove();
    }
  }, [title, description, image, type, schema, robots]);
}
