import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const DURATION = 1300;

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const startRef = useRef(0);
  const doneRef = useRef(false);

  const finish = (instant = false) => {
    if (doneRef.current) return;
    doneRef.current = true;
    setProgress(100);
    setLeaving(true);
    window.setTimeout(() => onDone(), instant ? 700 : 950);
  };

  useEffect(() => {
    document.body.classList.add("is-locked");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      finish(true);
      return undefined;
    }

    startRef.current = performance.now();
    let frame;
    const tick = (now) => {
      const elapsed = now - startRef.current;
      const raw = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - raw, 2.2);
      setProgress(Math.round(eased * 100));
      if (raw < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => finish(), 260);
      }
    };
    frame = requestAnimationFrame(tick);

    const skip = () => {
      if (performance.now() - startRef.current > 350) finish(true);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.body.classList.remove("is-locked");
    };
  }, []);

  return (
    <div
      className={`loader ${leaving ? "is-leaving" : ""} ${progress > 8 ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      <div className="loader__grid">
        <span>Portfolio</span>
        <span>2026</span>
      </div>

      <div className="loader__center">
        <div className="loader__logo">
          <Logo size={220} />
        </div>
        <div className="loader__word">
          {["A", "d", "E"].map((letter, i) => (
            <span key={letter} style={{ "--i": i }}>
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className="loader__grid loader__grid--bottom">
        <span>Interface &amp; Experience Designer</span>
        <span className="loader__bar" style={{ "--progress": progress / 100 }}>
          <span />
        </span>
        <span className="loader__count">{String(progress).padStart(3, "0")}%</span>
        <span>Lagos, Nigeria</span>
      </div>
    </div>
  );
}
