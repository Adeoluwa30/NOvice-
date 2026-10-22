import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

// A single smooth-scroll instance drives the page. Overlays (the menu) pause it
// instead of collapsing the document with CSS, which used to reset the scroll
// position to the top on phones.
let activeLenis = null;

export function setScrollLocked(locked) {
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
    // the CSS scroll lock already covers the menu there.
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothWheel: true,
      // Phones get the same eased scrolling as the desktop wheel.
      syncTouch: true,
      syncTouchLerp: 0.075,
    });
    lenisRef.current = lenis;
    activeLenis = lenis;
    if (import.meta.env.DEV) window.__lenis = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
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
