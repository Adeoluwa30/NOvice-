import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./hooks/useTheme";
import { preloadForPath } from "./pages/registry";
import "./styles/main.css";

const container = document.getElementById("root");
// Read by App so a prerendered page skips the intro overlay.
window.__ADE_PRERENDERED = container.hasChildNodes();

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
if (container.hasChildNodes()) {
  preloadForPath(window.location.pathname)
    .catch(() => {})
    .then(() => hydrateRoot(container, app));
} else {
  createRoot(container).render(app);
}
