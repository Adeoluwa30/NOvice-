import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./hooks/useTheme";
import { pageForPath, preloadForPath } from "./pages/registry";
import "./styles/main.css";

const container = document.getElementById("root");
const here = window.location.pathname.replace(/\/+$/, "") || "/";
const renderedFor = container.dataset.prerendered;
// Only hydrate markup that was rendered for this URL. The 404 page is served
// for every unknown path, so it also counts for any path that resolves to the
// 404 view; a mistyped case-study URL resolves to the case-study view instead
// and is rendered fresh rather than hydrated over the wrong markup.
const matches =
  container.hasChildNodes() &&
  (renderedFor === here ||
    (renderedFor === "/404" && pageForPath(here) === "NotFound"));
// Read by App so a prerendered page skips the intro overlay.
window.__ADE_PRERENDERED = matches;

const app = (
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// Prerendered routes arrive with their page already in the container. Resolve
// that page's chunk first so the first client render matches the markup, then
// hydrate instead of throwing the HTML away.
if (matches) {
  preloadForPath(window.location.pathname)
    .catch(() => {})
    .then(() => hydrateRoot(container, app));
} else {
  // Keep whatever is on screen until the right page's chunk is ready, then
  // replace it in one step instead of flashing an empty page.
  preloadForPath(window.location.pathname)
    .catch(() => {})
    .then(() => {
      container.replaceChildren();
      createRoot(container).render(app);
    });
}
