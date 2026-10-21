import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringNodeRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [moved, setMoved] = useState(false);
  const [fast, setFast] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pointer.x, y: pointer.y };
    let last = { x: pointer.x, y: pointer.y, t: performance.now() };
    let fastTimer;
    let frame;

    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      setMoved(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      }

      // Speed check: flag a fast wiggle so the ring flares and stays findable.
      const now = performance.now();
      const dt = now - last.t;
      if (dt > 0) {
        const dist = Math.hypot(pointer.x - last.x, pointer.y - last.y);
        const speed = dist / dt; // px per ms
        if (speed > 1.1) {
          setFast(true);
          window.clearTimeout(fastTimer);
          fastTimer = window.setTimeout(() => setFast(false), 200);
        }
      }
      last = { x: pointer.x, y: pointer.y, t: now };
    };

    const render = () => {
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;
      if (ringNodeRef.current) {
        ringNodeRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const onOver = (event) => {
      const target = event.target.closest("[data-cursor]");
      if (target) {
        setActive(true);
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringNodeRef.current) ringNodeRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringNodeRef.current) ringNodeRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fastTimer);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className={`cursor ${moved ? "is-ready" : ""}`} aria-hidden="true">
      <div className="cursor__dot" ref={dotRef} />
      <div
        className={`cursor__ring ${active ? "is-active" : ""} ${fast ? "is-fast" : ""}`}
        ref={ringNodeRef}
      >
        <span>{label}</span>
      </div>
    </div>
  );
}
