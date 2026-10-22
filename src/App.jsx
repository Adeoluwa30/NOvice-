import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import RouteWipe from "./components/RouteWipe";
import { useLenis } from "./hooks/useLenis";

// Each page is its own chunk. A visitor reading the home page never downloads
// the case-study template, and the loader covers the first chunk request.
import { PageView } from "./pages/registry";

const labelFor = (pathname) => {
  if (pathname === "/") return "Index";
  if (pathname.startsWith("/work/")) return "Case study";
  if (pathname.startsWith("/work")) return "Projects";
  if (pathname.startsWith("/about")) return "About";
  if (pathname.startsWith("/contact")) return "Contact";
  return "404";
};

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
      <RouteWipe key={`wipe-${location.pathname}`} label={labelFor(location.pathname)} />

      {/* The route wipe covers the page swap, so the content itself does not
          need an exit animation (which also kept hydrated pages from ever
          completing a navigation). */}
      <main id="main" key={`page-${location.pathname}`}>
        <Routes location={location}>
          <Route path="/" element={<PageView name="Home" />} />
          <Route path="/work" element={<PageView name="Work" />} />
          <Route path="/work/:slug" element={<PageView name="Project" />} />
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
