import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Reveal from "../components/Reveal";
import CTA from "../components/CTA";
import SlideText from "../components/SlideText";
import ProductDesign from "./work/ProductDesign";
import GraphicsWall from "./work/GraphicsWall";
import MotionWork from "./work/MotionWork";
import { projectsIn, upcomingIn } from "../data/projects";
import { graphics } from "../data/graphics";
import { WORK_TABS, workTabFor } from "../data/work";
import { pageMeta } from "../data/meta";
import { graphicsSchema, motionSchema, workSchema } from "../data/schema";
import { usePageMeta } from "../hooks/usePageMeta";
import { scrollToY } from "../hooks/useLenis";

const pad = (value) => String(value).padStart(2, "0");
const motionCount = projectsIn("motion").length;

// Each tab keeps the head its section had as a page of its own: the Graphics
// tab reads exactly as the old Graphics page did.
const tabs = {
  product: {
    meta: pageMeta.work,
    schema: () => workSchema(pageMeta.work),
    count: pad(projectsIn("product").length + upcomingIn("product").length),
    label: "(Projects)",
    aside: "2022 to 2026",
    title: (
      <>
        Selected <span className="serif">projects</span>
      </>
    ),
    lede:
      "Five case studies, five different problems. Each one designed from the inside out: the research, the flows, the interface and the small details that make it feel finished. The sixth is still in preparation.",
    Content: ProductDesign,
  },
  graphics: {
    meta: pageMeta.graphics,
    schema: () => graphicsSchema(pageMeta.graphics),
    count: pad(graphics.length),
    label: "(Graphics)",
    aside: `${graphics.length} pieces`,
    title: (
      <>
        Graphic <span className="serif">design</span>
      </>
    ),
    lede:
      "The other half of the practice: campaign art, identity, packaging and print. These are the pieces that give a product a voice before it says a word.",
    Content: GraphicsWall,
  },
  motion: {
    meta: pageMeta.motion,
    schema: () => motionSchema(pageMeta.motion),
    count: motionCount ? pad(motionCount) : "Soon",
    label: "(Motion)",
    aside: "Case studies",
    title: (
      <>
        Motion <span className="serif">design</span>
      </>
    ),
    lede:
      "Interfaces that explain themselves and brand moments that land in a few seconds, each told from the first storyboard to the final frame.",
    Content: MotionWork,
  },
};

export default function Work() {
  const { pathname } = useLocation();
  const active = (workTabFor(pathname) || WORK_TABS[0]).id;
  const tab = tabs[active];

  usePageMeta(tab.meta.title, tab.meta.description, { schema: tab.schema() });

  // A tab switch keeps the visitor's place. If they have scrolled past the
  // tabs, bring the bar back to the top of the screen so the new tab starts
  // where they are looking, instead of halfway down its own content.
  const tabsRef = useRef(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const bar = tabsRef.current;
    if (!bar) return;
    const top = bar.getBoundingClientRect().top;
    if (top < 0) scrollToY(top + window.scrollY - 96, { immediate: true });
  }, [active]);

  const { Content } = tab;

  return (
    <>
      <header className="page-head page-head--work">
        <div className="shell">
          <div className="page-head__top">
            <p className="eyebrow">{tab.label}</p>
            <p className="eyebrow">{tab.aside}</p>
          </div>
          {/* Keyed by tab, so switching tabs replays the same reveal the page
              head gets on arrival. */}
          <Reveal as="h1" className="page-head__title" key={`title-${active}`}>
            {tab.title}
          </Reveal>
          <Reveal as="p" className="page-head__lede" delay={100} key={`lede-${active}`}>
            {tab.lede}
          </Reveal>

          <nav className="work-tabs" aria-label="Project types" ref={tabsRef}>
            {WORK_TABS.map((item) => {
              const current = item.id === active;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`work-tabs__tab ${current ? "is-active" : ""}`}
                  aria-current={current ? "page" : undefined}
                  data-cursor={current ? undefined : "Open"}
                >
                  <span className="work-tabs__label">
                    <SlideText mode="word">{item.label}</SlideText>
                  </span>
                  <span className="work-tabs__count">{tabs[item.id].count}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <Content />

      <CTA />
    </>
  );
}
