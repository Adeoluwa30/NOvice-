import Reveal from "../components/Reveal";
import CTA from "../components/CTA";
import { experience, principles, site } from "../site";
import { pageMeta } from "../data/meta";
import { aboutSchema } from "../data/schema";
import { usePageMeta } from "../hooks/usePageMeta";

export default function About() {
  usePageMeta(pageMeta.about.title, pageMeta.about.description, {
    schema: aboutSchema(pageMeta.about),
  });

  return (
    <>
      <header className="page-head page-head--about">
        <div className="shell">
          <div className="page-head__top">
            <p className="eyebrow">(About)</p>
            <p className="eyebrow">Lagos, Nigeria</p>
          </div>
          <Reveal as="h1" className="page-head__title">
            An <span className="serif">avid</span>{" interface "}
            <br />
            &amp; experience designer.
          </Reveal>
          <Reveal as="p" className="page-head__lede" delay={100}>
            I design digital products where clarity, motion and craft meet, working across
            experience design, interface systems and graphic design.
          </Reveal>
        </div>
      </header>

      <section className="about-body section">
        <div className="shell">
          <div className="about-intro">
            <Reveal className="about-intro__copy">
              <p className="eyebrow">(Introduction)</p>
              <p className="about-intro__lead">
                I&apos;m a designer who likes the space between the problem and the product.
              </p>
              <p className="about-intro__note">
                UI/UX and interface designer. Product thinking, visual craft, and the small
                decisions in between.
              </p>
            </Reveal>

            <Reveal className="about-intro__media" delay={120}>
              <img
                src="/assets/portrait-1100.webp"
                srcSet="/assets/portrait-700.webp 700w, /assets/portrait-1100.webp 1100w, /assets/portrait-1400.webp 1400w"
                sizes="(max-width: 720px) 92vw, 420px"
                width="1400"
                height="1874"
                alt="Adeoluwa Adeoye, interface and experience designer"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>Lagos, NG / 2026</span>
                <span aria-hidden="true">✳</span>
              </figcaption>
            </Reveal>
          </div>

          <div className="about-story">
            <aside className="about-rail">
              <p className="eyebrow">(At a glance)</p>
              <dl className="about-facts">
                <div>
                  <dt>Based in</dt>
                  <dd>{site.location}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>
                    <span className="dot" />{` ${site.availability}`}
                  </dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Experience, interface and systems</dd>
                </div>
                <div>
                  <dt>Industries</dt>
                  <dd>Food, fashion, law, cybersecurity</dd>
                </div>
              </dl>
            </aside>

            <div className="about-story__body">
              <Reveal as="p" className="about-story__lead">
                Design, for me, has always been about curiosity. I&apos;ve been drawn to the way
                things work, the way people interact, and how those small details shape big
                experiences.
              </Reveal>

              <div className="about-story__cols">
                <Reveal as="p" delay={60}>
                  I read design as storytelling: a chance to make ideas tangible, simple and human.
                  That is the thread running through the marketplaces, dashboards and mobile apps
                  I&apos;ve designed.
                </Reveal>
                <Reveal as="p" delay={100}>
                  My work sits across food, fashion, law and cybersecurity, but the approach stays
                  the same. Understand the system, find the shortest honest path through it, and
                  design every state on the way.
                </Reveal>
              </div>

              <Reveal as="p" className="about-story__close" delay={140}>
                Respect the complexity, then make it disappear.
              </Reveal>

              <Reveal className="about-sign" delay={160}>
                <span className="serif">Adeoluwa</span>
                <span className="eyebrow">Lagos, NG</span>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="journey section">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(Journey so far)</p>
            <p className="section-head__note">Experience</p>
          </div>

          <div className="journey__list">
            {experience.map((item, i) => (
              <Reveal key={item.company} className="journey__item" delay={i * 80}>
                <span className="journey__period">{item.period}</span>
                <h3 className="journey__role">{item.role}</h3>
                <span className="journey__company">{item.company}</span>
                <p className="journey__note">{item.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="principles section">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(How I work)</p>
            <p className="section-head__note">Three principles</p>
          </div>

          <div className="principles__list">
            {principles.map((item, i) => (
              <Reveal className="principle" key={item.title} delay={i * 80}>
                <span className="principle__n">{`(${item.index})`}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
