import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Logo from "../components/Logo";
import CTA from "../components/CTA";
import { experience, principles, site, stats } from "../site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function About() {
  usePageMeta(
    "About",
    "Adeoluwa Adeoye is a UI/UX and interface designer in Lagos, Nigeria — working across product design, interface systems and brand."
  );

  return (
    <>
      <header className="page-head page-head--about">
        <div className="shell">
          <div className="page-head__top">
            <p className="eyebrow">(About)</p>
            <p className="eyebrow">Lagos, Nigeria</p>
          </div>
          <Reveal as="h1" className="page-head__title">
            An <span className="serif">avid</span> interface
            <br />
            &amp; experience designer.
          </Reveal>
          <Reveal as="p" className="page-head__lede" delay={100}>
            I design digital products where clarity, motion and craft meet — working across
            product design, interface systems and brand.
          </Reveal>
        </div>
      </header>

      <section className="about-body section">
        <div className="shell about-grid">
          <aside className="about-aside">
            <div className="about-orb">
              <Logo size={420} />
            </div>
            <dl className="about-facts">
              <div>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span className="dot" /> {site.availability}
                </dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Product · Interface · Systems</dd>
              </div>
            </dl>
          </aside>

          <div className="about-copy">
            <Reveal as="p" className="about-copy__lead">
              I&apos;m Adeoluwa Adeoye — a UI/UX and interface designer working at the
              intersection of product thinking and visual craft.
            </Reveal>

            <Reveal as="p" delay={60}>
              Design, for me, has always been about curiosity. I didn&apos;t arrive here by
              accident — I&apos;ve been drawn to the way things work, the way people interact,
              and how those small details shape big experiences. My path has been shaped by a mix
              of learning, experimenting, and asking &ldquo;what if?&rdquo; again and again.
            </Reveal>

            <Reveal as="p" delay={100}>
              I see design not just as problem-solving, but as storytelling — a chance to make
              ideas tangible, simple and human. That&apos;s the thread running through the
              marketplaces, dashboards and mobile apps I&apos;ve designed: respect the complexity,
              then make it disappear.
            </Reveal>

            <Reveal as="p" delay={140}>
              My work sits across industries — food, fashion, education and professional services
              — but the approach stays the same. Understand the system, find the shortest honest
              path through it, and design every state on the way.
            </Reveal>

            <Reveal className="about-sign" delay={160}>
              <span className="serif">Adeoluwa</span>
              <span className="eyebrow">Lagos, NG</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-stats section">
        <div className="shell stats stats--wide">
          {stats.map((stat, i) => (
            <Reveal className="stat" key={stat.label} delay={i * 80}>
              <span className="stat__value">{stat.value}</span>
              <span className="stat__label">{stat.label}</span>
            </Reveal>
          ))}
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
                <span className="principle__n">({item.index})</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="now section">
        <div className="shell now__grid">
          <Reveal className="now__head">
            <p className="eyebrow">(Now)</p>
            <h2 className="now__title">
              The current <span className="serif">chapter</span>
            </h2>
          </Reveal>

          <div className="now__list">
            <Reveal className="now__item" delay={60}>
              <span className="eyebrow">Available for</span>
              <p>Select projects, collaborations and full-time product design roles.</p>
            </Reveal>
            <Reveal className="now__item" delay={120}>
              <span className="eyebrow">Exploring</span>
              <p>Motion, interface engineering and the space between design and code.</p>
            </Reveal>
            <Reveal className="now__item" delay={180}>
              <span className="eyebrow">Next</span>
              <p>
                A complex system or marketplace that needs someone to think across user types and
                flows.{" "}
                <Link to="/contact" className="inline-link">
                  Tell me about it ↗
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
