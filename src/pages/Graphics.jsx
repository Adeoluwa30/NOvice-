import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import SlideText from "../components/SlideText";
import Magnetic from "../components/Magnetic";
import CTA from "../components/CTA";
import {
  behanceGallery,
  behanceProfile,
  graphicPractice,
  graphics,
} from "../data/graphics";
import { pageMeta } from "../data/meta";
import { graphicsSchema } from "../data/schema";
import { usePageMeta } from "../hooks/usePageMeta";
import { setScrollLocked } from "../hooks/useLenis";

const pad = (value) => String(value).padStart(2, "0");
const clamp01 = (value) => Math.min(1, Math.max(0, value));

// --- The vertical walk: phones, and anyone who asked for less motion ---
// The stack is staggered rather than centred: each piece sits a little further
// right than the one before it in runs of four, then the run starts again. That
// stair is what makes the column read as a diagonal band instead of a list.
const LEANS = [0, 5, 10, 3, 8, 13, 1, 6, 11, 4, 9, 14];

// --- The horizontal run: desktop ---
// The band. A run of five pieces steps down the screen, then the run starts
// again, so the row reads as a diagonal rather than a shelf. BAND is in svh so
// the slope keeps its proportion on a short laptop screen as well as a tall one.
const BAND = [8, 2.5, -3.5, -9.5, -15.5];
// The tilt is a ten-beat cycle against a five-beat band, and a seven-beat drift
// rides on top of the band, so no two runs of five land the same way and the
// row never reads as a repeating cut. That is the crookedness.
const TILTS = [-1.7, 1.2, -2.3, 1.7, -0.9, 2.4, -1.5, 1.9, -2.1, 1.3];
const DRIFT = [0, 1.6, -1.2, 0.8, -1.8, 1.1, -0.6];

const bandOf = (index) => BAND[index % BAND.length] + DRIFT[index % DRIFT.length];
const tiltOf = (index) => TILTS[index % TILTS.length];

function useMediaQuery(query) {
  // Starts false on the server and on the very first client render, so the
  // prerendered wall and the hydrated one are the same markup. The real answer
  // arrives on the effect immediately after.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const read = () => setMatches(list.matches);
    read();
    list.addEventListener("change", read);
    return () => list.removeEventListener("change", read);
  }, [query]);

  return matches;
}

// The frame and its caption are identical in both arrangements; only what
// drives their motion differs.
function FlyerMedia({ piece, index, sizes, frameStyle, metaStyle }) {
  return (
    <>
      <motion.span
        className="gflyer__frame"
        style={{
          "--ratio": `${piece.width} / ${piece.height}`,
          "--ratio-w": (piece.width / piece.height).toFixed(4),
          ...frameStyle,
        }}
      >
        <img
          src={piece.src}
          srcSet={`${piece.small} 760w, ${piece.src} 1500w`}
          sizes={sizes}
          alt={piece.alt}
          width={piece.width}
          height={piece.height}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
      </motion.span>

      <motion.span className="gflyer__meta" style={metaStyle}>
        <span className="gflyer__title">{piece.title}</span>
        <span className="gflyer__client">{piece.client}</span>
        <span className="gflyer__category">{piece.category}</span>
      </motion.span>
    </>
  );
}

function StackFlyer({ piece, index, onOpen, reduced }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Sideways drift on top of the standing offset, so a piece travels up and
  // across at once. Percentages resolve against the piece itself, which keeps
  // the movement proportional on a phone.
  const direction = index % 2 === 0 ? 1 : -1;
  const x = useTransform(scrollYProgress, [0, 1], [`${direction * 12}%`, `${direction * -12}%`]);

  // Small near the edges, full size in the middle. The extra stop at 0.5 holds
  // it at full size for a beat, which is the easing.
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.62, 0.86, 1, 0.86, 0.62]);

  // Colour is the reward for being the piece in the middle; everything above
  // and below it drops to black and white.
  const filter = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "grayscale(1) brightness(0.58)",
      "grayscale(0) brightness(1)",
      "grayscale(0) brightness(1)",
      "grayscale(1) brightness(0.58)",
    ]
  );
  const metaOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div className="gflyer" ref={ref} style={{ "--lean": `${LEANS[index % LEANS.length]}%` }}>
      <motion.button
        type="button"
        className="gflyer__card"
        style={reduced ? undefined : { x, scale }}
        onClick={() => onOpen(piece)}
        data-cursor="Open"
      >
        <FlyerMedia
          piece={piece}
          index={index}
          sizes="(max-width: 720px) 80vw, min(74vw, 780px)"
          frameStyle={reduced ? null : { filter }}
          metaStyle={reduced ? null : { opacity: metaOpacity }}
        />
      </motion.button>
    </div>
  );
}

function BandFlyer({ piece, index, onOpen, x, originX, centre, span }) {
  // How far this piece is from the middle of the screen, in the row's own
  // coordinates: the row's resting left edge, plus where the piece sits in the
  // row, plus wherever the pan has moved it to. One shared motion value drives
  // every piece, so nothing re-renders as the row travels.
  const distance = useTransform(x, (pan) =>
    typeof centre === "number" ? originX + centre + pan - window.innerWidth / 2 : 0
  );
  const t = useTransform(distance, (value) => clamp01(Math.abs(value) / (span || 1)));

  const scale = useTransform(t, [0, 1], [1, 0.68]);
  const filter = useTransform(
    t,
    [0, 1],
    ["grayscale(0) brightness(1)", "grayscale(1) brightness(0.55)"]
  );
  const opacity = useTransform(t, [0, 1], [1, 0.42]);

  // Nothing is measured on the first paint, and guessing would put the whole
  // row in black and white for a frame. Until the row reports its layout, the
  // flyers simply sit at full size and full colour.
  const shown = typeof centre === "number";

  return (
    <div
      className="gflyer gflyer--band"
      style={{ "--band": bandOf(index), "--tilt": tiltOf(index) }}
    >
      <motion.button
        type="button"
        className="gflyer__card"
        style={shown ? { scale } : undefined}
        onClick={() => onOpen(piece)}
        data-cursor="Open"
      >
        <FlyerMedia
          piece={piece}
          index={index}
          sizes="min(52svh, 700px)"
          frameStyle={shown ? { filter } : null}
          metaStyle={shown ? { opacity } : null}
        />
      </motion.button>
    </div>
  );
}

export default function Graphics() {
  usePageMeta(pageMeta.graphics.title, pageMeta.graphics.description, {
    schema: graphicsSchema(pageMeta.graphics),
  });

  const [campaign, setCampaign] = useState("All");
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(0);
  const [run, setRun] = useState({ travel: 0, originX: 0, centres: [], span: 0 });
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 900px)");
  // The pinned sideways run is the desktop reading of the wall. Phones keep the
  // vertical walk, and so does anyone who has asked the system for less motion.
  const horizontal = desktop && !reduced;

  const stackRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const rowRef = useRef(null);
  const fillRef = useRef(null);
  const closeRef = useRef(null);
  // The pan. Written once a frame while the run is pinned.
  const pan = useMotionValue(0);

  const campaigns = useMemo(() => {
    const counts = new Map();
    graphics.forEach((piece) => {
      counts.set(piece.campaign, (counts.get(piece.campaign) || 0) + 1);
    });
    return [
      { name: "All", count: graphics.length },
      ...Array.from(counts, ([name, count]) => ({ name, count })),
    ];
  }, []);

  const shown = useMemo(
    () => (campaign === "All" ? graphics : graphics.filter((piece) => piece.campaign === campaign)),
    [campaign]
  );

  const chooseCampaign = (name) => {
    setCampaign(name);
    // A filter can cut the wall down by several screens. If the visitor is
    // already inside it, take them back to the top of the stack rather than
    // leaving them somewhere in the middle of a different set.
    const stack = stackRef.current;
    if (!stack || stack.getBoundingClientRect().top >= 0) return;
    const top = stack.offsetTop;
    if (window.__lenis) window.__lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  // The progress cue and the wall itself are read from one place: whichever
  // piece is nearest the middle of the screen is the one in colour, and the
  // counter above says its number.
  //
  // Desktop pins the section for the length of the run, so scrolling down pans
  // the row sideways. Every measurement is taken from layout boxes rather than
  // from the transforms, so the tilt on a piece cannot throw the reading off.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    let frame = 0;

    if (horizontal) {
      const track = trackRef.current;
      const stage = stageRef.current;
      const row = rowRef.current;
      if (!track || !stage || !row) return undefined;

      let travel = 0;
      let originX = 0;
      let start = 0;
      let centres = [];

      const measure = () => {
        const viewport = window.innerWidth;
        // Layout only, never a live rect: the row is the one thing carrying a
        // transform, so offsets keep their meaning wherever the pan currently
        // sits. Reading a rect and subtracting the motion value instead gave a
        // stale origin whenever the effect ran again before the transform had
        // been committed, and put the whole run half a screen out of focus.
        originX = stage.getBoundingClientRect().left + row.offsetLeft;
        centres = Array.from(row.children).map(
          (piece) => piece.offsetLeft + piece.offsetWidth / 2
        );

        // The run is framed so the first flyer starts in the middle of the
        // screen and the last one finishes there. Both ends of the wall are
        // therefore reachable, which is what gives every piece its turn in
        // colour; panning edge to edge would leave the two end pieces stuck at
        // the edges, grey, forever out of focus.
        const first = centres[0] ?? 0;
        const last = centres[centres.length - 1] ?? 0;
        travel = Math.max(0, last - first);
        start = viewport / 2 - first;
        setRun({ travel, originX, centres, span: Math.max(180, viewport * 0.4) });
      };

      const update = () => {
        frame = 0;
        // The track is not sticky, so its top is a stable document position:
        // the run begins as that top meets the top of the screen and ends when
        // the track's last pixel does.
        const p = travel > 0 ? clamp01(-track.getBoundingClientRect().top / travel) : 0;
        pan.set(start - travel * p);

        const fill = fillRef.current;
        if (fill) fill.style.transform = `scaleX(${p.toFixed(4)})`;

        const middle = window.innerWidth / 2;
        let nearest = 0;
        let shortest = Infinity;
        centres.forEach((centre, index) => {
          const offscreen = Math.abs(originX + centre + start - travel * p - middle);
          if (offscreen < shortest) {
            shortest = offscreen;
            nearest = index;
          }
        });
        setActive((current) => (current === nearest ? current : nearest));
      };

      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };

      const onResize = () => {
        measure();
        onScroll();
      };

      measure();
      update();
      // Frame widths come from the viewport, so a settled font or a late image
      // can move the run's geometry by a pixel or two.
      document.fonts?.ready.then(onResize).catch(() => {});

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }

    // ---- The vertical walk ----
    let pieces = [];
    let firstCentre = 0;
    let lastCentre = 0;

    const centreOf = (element) => {
      const box = element.getBoundingClientRect();
      return box.top + box.height / 2 + window.scrollY;
    };

    const measure = () => {
      pieces = Array.from(stack.querySelectorAll(".gflyer"));
      // The hairline runs from the first piece reaching the centre of the screen
      // to the last one doing the same, so it agrees with the counter above it
      // rather than measuring the section's padding.
      firstCentre = pieces.length ? centreOf(pieces[0]) : 0;
      lastCentre = pieces.length ? centreOf(pieces[pieces.length - 1]) : 0;
    };

    const update = () => {
      frame = 0;
      if (!pieces.length) return;

      const mid = window.innerHeight / 2;

      // The hairline is written straight to the node: at one update a frame, a
      // state re-render would be a lot of React for a moving line.
      const fill = fillRef.current;
      if (fill) {
        const span = lastCentre - firstCentre;
        const travelled = window.scrollY + mid - firstCentre;
        const progress = span > 4 ? clamp01(travelled / span) : 1;
        fill.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      let nearest = 0;
      let shortest = Infinity;
      pieces.forEach((piece, index) => {
        const rect = piece.getBoundingClientRect();
        const distance = Math.abs((rect.top + rect.bottom) / 2 - mid);
        if (distance < shortest) {
          shortest = distance;
          nearest = index;
        }
      });
      setActive((current) => (current === nearest ? current : nearest));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [horizontal, shown, pan]);

  // A lightbox that leaves the page scrolling underneath is disorienting, so
  // smooth scroll pauses while it is open and the close button takes focus.
  useEffect(() => {
    if (!open) return undefined;
    setScrollLocked(true);
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open]);

  return (
    <>
      <header className="page-head page-head--graphics">
        <div className="shell">
          <div className="page-head__top">
            <p className="eyebrow">(Graphics)</p>
            <p className="eyebrow">{`${shown.length} pieces`}</p>
          </div>
          <Reveal as="h1" className="page-head__title">
            Graphic <span className="serif">design</span>
          </Reveal>
          <Reveal as="p" className="page-head__lede" delay={100}>
            The other half of the practice: campaign art, identity, packaging and print. These are the
            pieces that give a product a voice before it says a word.
          </Reveal>
          <Reveal className="graphics-head__row" delay={140}>
            <span className="eyebrow">(Scroll: the piece in the middle is the one in colour)</span>
            <a
              className="link-arrow"
              href={behanceGallery}
              target="_blank"
              rel="noreferrer"
              data-cursor="Behance"
            >
              <SlideText mode="word">Full archive on Behance</SlideText>
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </header>

      <section className="gstack" aria-label="Graphic design wall" ref={stackRef}>
        <div className="gwfilter">
          <p className="eyebrow gwfilter__label">(Browse)</p>
          <div className="gwfilter__row" role="group" aria-label="Filter work by campaign">
            {campaigns.map((item) => {
              const active = campaign === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  className={`gwfilter__chip ${active ? "is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => chooseCampaign(item.name)}
                >
                  {item.name}
                  <span className="gwfilter__count">{pad(item.count)}</span>
                </button>
              );
            })}
          </div>

          <p className="gwfilter__progress eyebrow">
            <span className="gwfilter__now">{pad(active + 1)}</span>
            <span aria-hidden="true">/</span>
            <span className="gwfilter__of">{pad(shown.length)}</span>
          </p>

          <span className="gwfilter__track" aria-hidden="true">
            <span className="gwfilter__fill" ref={fillRef} />
          </span>
        </div>

        {horizontal ? (
          <div className="gtrack" ref={trackRef} style={{ "--travel": `${run.travel}px` }}>
            <div className="gtrack__stage" ref={stageRef}>
              <motion.div className="gtrack__row" ref={rowRef} style={{ x: pan }}>
                {shown.map((piece, i) => (
                  <BandFlyer
                    key={piece.title}
                    piece={piece}
                    index={i}
                    onOpen={setOpen}
                    x={pan}
                    originX={run.originX}
                    centre={run.centres[i]}
                    span={run.span}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="gstack__list">
            {shown.map((piece, i) => (
              <StackFlyer key={piece.title} piece={piece} index={i} onOpen={setOpen} reduced={reduced} />
            ))}
          </div>
        )}
      </section>

      <section className="graphics-note section">
        <div className="shell graphics-note__grid">
          <Reveal as="p" className="eyebrow">
            (Why it matters)
          </Reveal>
          <Reveal as="p" className="graphics-note__lead" delay={60}>
            Graphic design is the same job as product design, just closer to the surface. A poster
            still has to answer a question in one look, hold a hierarchy and sound like the thing it
            is selling.
          </Reveal>
          <Reveal as="p" className="graphics-note__note" delay={100}>
            That is why the campaigns sit in the same portfolio as the dashboards: identity,
            interfaces and graphic work are one practice, not two.
          </Reveal>
        </div>
      </section>

      <section className="gbrief section" aria-labelledby="gbrief-title">
        <div className="shell gbrief__grid">
          <Reveal className="gbrief__head">
            <p className="eyebrow">(Commissions)</p>
            <h2 className="gbrief__title" id="gbrief-title">
              Graphics for your next <span className="serif">event.</span>
            </h2>
          </Reveal>

          <Reveal className="gbrief__body" delay={80}>
            <p className="gbrief__lead">
              Flyers and posters, the identity an event runs on, and the guest-facing set around it:
              invites, programmes, stage screens and the social run before and after.
            </p>
            <ul className="gbrief__tags">
              {graphicPractice.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="gbrief__row">
              <p className="gbrief__note">
                Event work, brand collateral or a single piece. Send the date, the audience and what
                has to be on it, and I&apos;ll come back with a scope and a price.
              </p>
              <div className="gbrief__actions">
                <Magnetic>
                  <Link to="/contact" className="btn btn--solid" data-cursor="Brief me">
                    <SlideText mode="word">Start a brief</SlideText>
                    <span className="btn__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </Magnetic>
                <a
                  className="link-arrow"
                  href={behanceProfile}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Behance"
                >
                  <SlideText mode="word">Behance profile</SlideText>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
          <button
            type="button"
            className="lightbox__backdrop"
            onClick={() => setOpen(null)}
            aria-label="Close"
          />
          <div className="lightbox__panel">
            <button
              type="button"
              className="lightbox__close"
              onClick={() => setOpen(null)}
              ref={closeRef}
            >
              Close <span aria-hidden="true">✕</span>
            </button>

            <figure className="lightbox__figure">
              <img src={open.src} alt={open.alt} width={open.width} height={open.height} />
            </figure>

            <div className="lightbox__meta">
              <h2 className="lightbox__title" id="lightbox-title">
                {open.title}
              </h2>
              <p className="lightbox__kind">{`${open.category} · ${open.client}`}</p>
              <p className="lightbox__note">{open.note}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
