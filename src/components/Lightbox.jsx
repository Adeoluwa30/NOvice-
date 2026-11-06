import { useEffect, useRef } from "react";
import { setScrollLocked } from "../hooks/useLenis";

/**
 * The full-size view shared by the graphics wall and the motion reel. A
 * lightbox that leaves the page scrolling underneath is disorienting, so smooth
 * scroll pauses while it is open, Escape closes it, the close button takes
 * focus, and focus goes back to whatever opened it afterwards.
 */
export default function Lightbox({ title, kind, note, onClose, children }) {
  const closeRef = useRef(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    const opener = document.activeElement;
    setScrollLocked(true);
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") close.current();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, []);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
      <button type="button" className="lightbox__backdrop" onClick={onClose} aria-label="Close" />
      <div className="lightbox__panel">
        <button type="button" className="lightbox__close" onClick={onClose} ref={closeRef}>
          Close <span aria-hidden="true">✕</span>
        </button>

        <figure className="lightbox__figure">{children}</figure>

        <div className="lightbox__meta">
          <h2 className="lightbox__title" id="lightbox-title">
            {title}
          </h2>
          {kind && <p className="lightbox__kind">{kind}</p>}
          {note && <p className="lightbox__note">{note}</p>}
        </div>
      </div>
    </div>
  );
}
