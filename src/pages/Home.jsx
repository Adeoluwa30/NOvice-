import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import ProjectIndex from "../components/ProjectIndex";
import CTA from "../components/CTA";
import { projects } from "../data/projects";
import { capabilities, credentia, experience } from "../site";
import { homeSchema } from "../data/schema";
import { usePageMeta } from "../hooks/usePageMeta";

function Word({ children, progress, range }) {
  // The resting state has to stay legible: at 16% the words sat around 1.5:1
  // against the background and failed WCAG contrast as they entered view.
  const opacity = useTransform(progress, range, [0.5, 1]);
  return (
    <motion.span className="word" style={{ opacity }}>
      {`${children} `}
    </motion.span>
  );
}

function ScrollStatement({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");

  return (
    <p className="manifesto__text" ref={ref}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

export default function Home() {
  usePageMeta(undefined, undefined, { schema: homeSchema() });

  return (
    <>
      <section className="hero">
        <h1 className="sr-only">Adeoluwa Adeoye, Interface &amp; Experience Designer</h1>

        <div className="hero__stage">
          <div className="hero__type">
            <div className="hero__line">
              <Marquee speed={46}>
                <span>Interface Designer</span>
                <span className="asterisk">✳</span>
                <span>Interface Designer</span>
                <span className="asterisk">✳</span>
              </Marquee>
            </div>
            <div className="hero__line hero__line--outline">
              <Marquee speed={54} reverse>
                <span>Experience Designer</span>
                <span className="asterisk">✳</span>
                <span>Experience Designer</span>
                <span className="asterisk">✳</span>
              </Marquee>
            </div>
            <div className="hero__line">
              <Marquee speed={40}>
                <span>Product Thinker</span>
                <span className="asterisk">✳</span>
                <span>Product Thinker</span>
                <span className="asterisk">✳</span>
              </Marquee>
            </div>
          </div>

          <figure className="hero__portrait">
            <div className="hero__portrait-frame">
              <img
                src="/assets/portrait-1100.webp"
                srcSet="/assets/portrait-700.webp 700w, /assets/portrait-1100.webp 1100w, /assets/portrait-1400.webp 1400w"
                sizes="(max-width: 960px) 60vw, 340px"
                width="1400"
                height="1874"
                alt="Adeoluwa Adeoye, interface and experience designer"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="intro section" id="about-preview">
        <div className="shell intro__grid">
          <p className="eyebrow">(01) About</p>
          <div className="intro__content">
            <Reveal as="p" className="intro__statement">
              {"I'm a designer who likes the "}
              <em className="intro__accent">in&#8209;between</em>: the place where a business
              problem becomes a flow, a flow becomes an interface, and an interface starts to feel
              like a product people trust.
            </Reveal>

            <Reveal className="intro__row" delay={120}>
              <Link to="/about" className="link-arrow" data-cursor="Read">
                More about me <span>↗</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(02) Selected projects</p>
            <Link to="/work" className="link-arrow" data-cursor="All projects">
              All projects <span>↗</span>
            </Link>
          </div>

          <Reveal as="h2" className="work__title">
            Designs uniquely <span className="serif">made</span>
            <br />
            for the brand.
          </Reveal>

          <ProjectIndex items={projects} />

          <Reveal className="work__note" delay={120}>
            <span>2023 to 2026</span>
            <p>
              Five products across food, fashion and law, each designed end to end, from the
              first question to the shipped interface.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="manifesto section">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(03) How I think</p>
            <p className="section-head__note">A short manifesto</p>
          </div>
          <ScrollStatement text="Design, for me, has always been about curiosity. I didn't arrive here by accident. I've been drawn to the way things work, the way people interact, and how those small details shape big experiences. I see design not just as problem solving, but as storytelling: a chance to make ideas tangible, simple and human." />
          <p className="manifesto__sign">Adeoluwa</p>
        </div>
      </section>

      <section className="capabilities section">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(04) What I do</p>
            <p className="section-head__note">Capabilities</p>
          </div>

          <div className="capabilities__list">
            {capabilities.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="cap-row" data-cursor="+">
                  <span className="cap-row__index">{`(${item.index})`}</span>
                  <h3 className="cap-row__title">{item.title}</h3>
                  <p className="cap-row__blurb">{item.blurb}</p>
                  <ul className="cap-row__tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-preview section">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(05) Journey</p>
            <Link to="/about" className="link-arrow" data-cursor="Story">
              The full story <span>↗</span>
            </Link>
          </div>

          <div className="exp-list">
            {experience.map((item, i) => (
              <Reveal key={item.company} delay={i * 80}>
                <div className="exp-row">
                  <span className="exp-row__period">{item.period}</span>
                  <span className="exp-row__role">{item.role}</span>
                  <span className="exp-row__company">{item.company}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="credentia section" id="credentia">
        <div className="shell">
          <Reveal className="credentia__card">
            <div className="credentia__top">
              <p className="eyebrow">(06) Currently building</p>
              <span className="credentia__status">
                <span className="dot" /> Live
              </span>
            </div>

            <div className="credentia__body">
              <div className="credentia__lead">
                <h2 className="credentia__title">{credentia.name}</h2>
                <p className="credentia__role">{credentia.role}</p>
              </div>
              <p className="credentia__blurb">{credentia.blurb}</p>
              <a
                className="credentia__link"
                href={credentia.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="Visit"
              >
                Visit credentia.site <span>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
