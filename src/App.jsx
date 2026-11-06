import { useEffect, useRef, useState } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import RouteWipe from "./components/RouteWipe";
import { useLenis } from "./hooks/useLenis";
import { workTabFor } from "./data/work";

// Each page is its own chunk. A visitor reading the home page never downloads
// the case-study template, and the loader covers the first chunk request.
import { PageView } from "./pages/registry";

const labelFor = (pathname) => {
  if (pathname === "/") return "Home";
  if (workTabFor(pathname)) return "Projects";
  if (pathname.startsWith("/work/")) return "Case study";
  if (pathname.startsWith("/about")) return "About";
  if (pathname.startsWith("/contact")) return "Contact";
  return "404";
};

// The three Projects tabs are one page: moving between them swaps the tab
// content in place instead of remounting the page behind a route wipe.
const pageKeyFor = (pathname) => (workTabFor(pathname) ? "/work" : pathname);

export default function App() {
  // The intro is a first-impression moment, not a tax on every visit: repeats
  // within the same session go straight to the page.
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    // A prerendered page is already on screen, so an intro overlay would only
    // hide content the visitor can already read.
    if (window.__ADE_PRERENDERED) return false;
    try {
      return !window.sessionStorage.getItem("ade-visited");
    } catch (error) {
      return true;
    }
  });
  // The intro is a client-only flourish: showing it during the server render
  // would put loader markup in the prerendered page and break hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const location = useLocation();
  // The wipe is a transition between pages, not an intro: the first paint
  // already shows the page, so covering it with a sheet only delays it. The
  // router's key is read once and never changes, so only real navigations
  // (not the mount re-render) replay the sheet.
  const pageKey = pageKeyFor(location.pathname);
  const wipe = useRef({ pageKey, key: location.key });
  if (wipe.current.pageKey !== pageKey) wipe.current = { pageKey, key: location.key };
  const wipeKey = wipe.current.key;
  const introKey = useRef(wipeKey);
  useLenis();

  const finishLoading = () => {
    setLoading(false);
    try {
      window.sessionStorage.setItem("ade-visited", "1");
    } catch (error) {
      /* storage can be unavailable in private mode */
    }
  };

  return (
    <>
      {mounted && loading && <Loader onDone={finishLoading} />}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Cursor />
      <Nav />
      {wipeKey !== introKey.current && (
        <RouteWipe key={`wipe-${wipeKey}`} label={labelFor(location.pathname)} />
      )}

      {/* The route wipe covers the page swap, so the content itself does not
          need an exit animation (which also kept hydrated pages from ever
          completing a navigation). */}
      <main id="main" key={`page-${pageKey}`}>
        <Routes location={location}>
          <Route path="/" element={<PageView name="Home" />} />
          <Route path="/work" element={<PageView name="Work" />} />
          <Route path="/work/graphics" element={<PageView name="Work" />} />
          <Route path="/work/motion" element={<PageView name="Work" />} />
          <Route path="/work/:slug" element={<PageView name="Project" />} />
          {/* Graphics moved under Projects. Vercel answers the old URL with a
              permanent redirect; this covers the dev server and in-app links. */}
          <Route path="/graphics" element={<Navigate to="/work/graphics" replace />} />
          <Route path="/about" element={<PageView name="About" />} />
          <Route path="/contact" element={<PageView name="Contact" />} />
          <Route path="*" element={<PageView name="NotFound" />} />
        </Routes>
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
