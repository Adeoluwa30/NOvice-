import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import Reveal from "../../components/Reveal";
import Magnetic from "../../components/Magnetic";
import SlideText from "../../components/SlideText";
import Lightbox from "../../components/Lightbox";
import { motionPractice, motionWork } from "../../data/motion";

const pad = (value) => String(value).padStart(2, "0");

// A muted preview that only plays while it is on screen, so a page of videos
// never decodes more than the one or two the visitor can actually see. Anyone
// who has asked for less motion gets the poster frame until they open it.
function MotionCard({ piece, index, onOpen, reduced }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    // React does not reliably reflect `muted` as an attribute, and browsers
    // only allow programmatic play on a muted video.
    video.muted = true;
    if (reduced) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Reveal as="article" className={`mcard ${index % 2 === 1 ? "mcard--offset" : ""}`} delay={40}>
      <button
        type="button"
        className="mcard__media"
        onClick={() => onOpen(piece)}
        data-cursor="Play"
        aria-label={`Play ${piece.title}`}
        style={{ "--ratio": `${piece.width} / ${piece.height}` }}
      >
        <video
          ref={videoRef}
          poster={piece.poster}
          width={piece.width}
          height={piece.height}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        >
          {piece.webm && <source src={piece.webm} type="video/webm" />}
          <source src={piece.src} type="video/mp4" />
        </video>
        <span className="mcard__index">{`(${pad(index + 1)})`}</span>
        {piece.duration && <span className="mcard__time">{piece.duration}</span>}
        <span className="mcard__play" aria-hidden="true">
          ▶
        </span>
      </button>

      <div className="mcard__meta">
        <h2 className="mcard__title">{piece.title}</h2>
        <p className="mcard__kind">{`${piece.category} · ${piece.client}`}</p>
      </div>
      {piece.note && <p className="mcard__note">{piece.note}</p>}
    </Reveal>
  );
}

function MotionReel() {
  const [open, setOpen] = useState(null);
  const reduced = useReducedMotion();

  return (
    <section className="mreel">
      <div className="shell">
        <div className="mreel__grid">
          {motionWork.map((piece, i) => (
            <MotionCard key={piece.src} piece={piece} index={i} onOpen={setOpen} reduced={reduced} />
          ))}
        </div>
      </div>

      {open && (
        <Lightbox
          title={open.title}
          kind={`${open.category} · ${open.client}`}
          note={open.note}
          onClose={() => setOpen(null)}
        >
          <video
            className="lightbox__video"
            poster={open.poster}
            width={open.width}
            height={open.height}
            controls
            autoPlay
            playsInline
            aria-label={open.description || open.title}
          >
            {open.webm && <source src={open.webm} type="video/webm" />}
            <source src={open.src} type="video/mp4" />
          </video>
        </Lightbox>
      )}
    </section>
  );
}

// Shown until the first piece is added to src/data/motion.js. It says plainly
// that the work is on its way rather than leaving an empty grid.
function MotionSoon() {
  return (
    <section className="msoon">
      <div className="shell">
        <Reveal className="msoon__card">
          <div className="msoon__timeline" aria-hidden="true">
            <span className="msoon__ruler" />
            <span className="msoon__track msoon__track--a">
              <i />
              <i />
              <i />
            </span>
            <span className="msoon__track msoon__track--b">
              <i />
              <i />
            </span>
            <span className="msoon__track msoon__track--c">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="msoon__playhead" />
          </div>

          <div className="msoon__copy">
            <p className="eyebrow">(In the edit)</p>
            <h2 className="msoon__title">
              Motion is <span className="serif">rendering.</span>
            </h2>
            <p className="msoon__lead">
              The first motion pieces are being cut for this page. Until they land, the brief is
              open: movement that explains a product, gives a brand a moment, or makes a launch
              post stop the scroll.
            </p>
            <ul className="gbrief__tags">
              {motionPractice.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="msoon__actions">
              <Magnetic>
                <Link to="/contact?topic=motion" className="btn btn--solid" data-cursor="Brief me">
                  <SlideText mode="word">Commission motion</SlideText>
                  <span className="btn__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function MotionWork() {
  return motionWork.length ? <MotionReel /> : <MotionSoon />;
}
