import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// A single smooth-scroll instance drives the page. Overlays (the menu) pause it
// instead of collapsing the document with CSS, which used to reset the scroll
// position to the top on phones.
let activeLenis = null;
let pendingLock = false;

export function setScrollLocked(locked) {
  pendingLock = locked;
  if (!activeLenis) return;
  if (locked) activeLenis.stop();
  else activeLenis.start();
}

export function useLenis() {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    // Phones and tablets keep their native scrolling. Lenis' touch sync is a
    // permanent rAF loop that competes with the platform's own inertia, and
    // the CSS scroll lock already covers the menu there. The chunk is only
    // requested on devices that will actually use it.
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    let cancelled = false;
    let lenis = null;
    let frame;

    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;

        lenis = new Lenis({
          duration: 1.15,
          lerp: 0.09,
          wheelMultiplier: 1,
          smoothWheel: true,
        });
        lenisRef.current = lenis;
        activeLenis = lenis;
        if (pendingLock) lenis.stop();
        if (import.meta.env.DEV) window.__lenis = lenis;

        const raf = (time) => {
          lenis.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      })
      .catch(() => {
        // Native scrolling is the fallback if the chunk cannot load.
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      if (!lenis) return;
      lenis.destroy();
      lenisRef.current = null;
      if (activeLenis === lenis) activeLenis = null;
      if (import.meta.env.DEV && window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    // No Lenis means the document still has CSS smooth scrolling, so a route
    // change has to jump to the top without gliding there.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname]);

  return lenisRef;
}
