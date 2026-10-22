// Build-time renderer. scripts/prerender.mjs imports this to write the real
// page markup into each route's HTML file, so a crawler that never runs
// JavaScript still gets the case-study copy, not an empty <div id="root">.
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./hooks/useTheme";
import { preloadForPath } from "./pages/registry";

const tree = (pathname) => (
  <ThemeProvider>
    <MemoryRouter initialEntries={[pathname]}>
      <App />
    </MemoryRouter>
  </ThemeProvider>
);

export async function render(pathname) {
  // The page chunks are code-split; resolve this route's chunk first so the
  // render produces the page rather than the Suspense fallback.
  await preloadForPath(pathname);

  return renderToStaticMarkup(tree(pathname));
}
