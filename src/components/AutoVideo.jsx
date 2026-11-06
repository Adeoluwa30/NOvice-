import { useEffect, useRef } from "react";

/**
 * A case-study video that behaves like an image in the layout: muted, looped,
 * and only playing while it is on screen, so a long study never decodes more
 * than the clip in view. Anyone who has asked for less motion gets the poster
 * frame with controls, so they can still choose to play it.
 */
export default function AutoVideo({ video, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    // React does not reliably set `muted` from the prerendered markup, and
    // browsers only let a page start a video on its own when it is muted.
    node.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.controls = true;
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.play().catch(() => {});
        else node.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="auto-video"
      poster={video.poster}
      width={video.width}
      height={video.height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      {video.webm && <source src={video.webm} type="video/webm" />}
      <source src={video.src} type="video/mp4" />
    </video>
  );
}
