import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import { useLenis } from "./hooks/useLenis";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Project from "./pages/Project";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useLenis();

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Cursor />
      <Nav />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<Project />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
