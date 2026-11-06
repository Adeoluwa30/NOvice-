import { useEffect, useRef, useState } from "react";
import { scrollToY } from "../hooks/useLenis";

/**
 * The site's own scrollbar. The browser's bar is hidden in main.css; this one
 * is a slim track on the right edge with a thumb sized to the page, which
 * shows while the page scrolls or when the pointer comes near the edge, then
 * fades away. The thumb can be dragged and the track clicked, like a normal
 * scrollbar. Touch screens keep their own overlay bars, so this only renders
 * for a fine pointer. Decorative to assistive tech: keyboard, wheel and
 * screen-reader scrolling all work on the page itself.
 */
export default function ScrollBar() {
  const [enabled, setEnabled] = useState(false);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const read = () => setEnabled(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return undefined;

    let frame = 0;
    let hideTimer = 0;
    let thumbHeight = 0;
    let drag = null;

    const metrics = () => {
      const view = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      return { view, total, max: Math.max(0, total - view) };
    };

    const draw = () => {
      frame = 0;
      const { view, total, max } = metrics();
      const scrollable = max > 4;
      track.classList.toggle("is-hidden", !scrollable);
      if (!scrollable) return;
      thumbHeight = Math.max(48, (view / total) * view);
      const top = (window.scrollY / max) * (view - thumbHeight);
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translate3d(0, ${top}px, 0)`;
    };

    const wake = () => {
      track.classList.add("is-active");
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        if (!drag) track.classList.remove("is-active");
      }, 1100);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
      wake();
    };

    // Coming near the right edge shows the bar, so it can be grabbed.
    const onMove = (event) => {
      if (window.innerWidth - event.clientX < 28) wake();
    };

    const scrollFromPointer = (clientY) => {
      const { view, max } = metrics();
      const travel = view - thumbHeight;
      if (travel <= 0) return;
      const ratio = (clientY - drag.offset) / travel;
      scrollToY(Math.min(max, Math.max(0, ratio * max)), { immediate: true });
    };

    const onThumbDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const box = thumb.getBoundingClientRect();
      drag = { offset: event.clientY - box.top };
      thumb.setPointerCapture(event.pointerId);
      track.classList.add("is-dragging");
      wake();
    };

    const onThumbMove = (event) => {
      if (drag) scrollFromPointer(event.clientY);
    };

    const onThumbUp = (event) => {
      if (!drag) return;
      drag = null;
      thumb.releasePointerCapture?.(event.pointerId);
      track.classList.remove("is-dragging");
      wake();
    };

    // Clicking the bare track jumps there, centring the thumb on the click.
    const onTrackDown = (event) => {
      if (event.target !== track) return;
      drag = { offset: thumbHeight / 2 };
      scrollFromPointer(event.clientY);
      drag = null;
      wake();
    };

    const resize = new ResizeObserver(() => {
      if (!frame) frame = requestAnimationFrame(draw);
    });
    resize.observe(document.body);

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    thumb.addEventListener("pointerdown", onThumbDown);
    thumb.addEventListener("pointermove", onThumbMove);
    thumb.addEventListener("pointerup", onThumbUp);
    thumb.addEventListener("pointercancel", onThumbUp);
    track.addEventListener("pointerdown", onTrackDown);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      thumb.removeEventListener("pointerdown", onThumbDown);
      thumb.removeEventListener("pointermove", onThumbMove);
      thumb.removeEventListener("pointerup", onThumbUp);
      thumb.removeEventListener("pointercancel", onThumbUp);
      track.removeEventListener("pointerdown", onTrackDown);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="scrollbar" ref={trackRef} aria-hidden="true">
      <span className="scrollbar__thumb" ref={thumbRef} />
    </div>
  );
}
