import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import CTA from "../components/CTA";
import SlideText from "../components/SlideText";
import { biography, experience, principles, site, stats, strengths, tools } from "../site";
import { graphics } from "../data/graphics";
import { pageMeta } from "../data/meta";
import { aboutSchema } from "../data/schema";
import { usePageMeta } from "../hooks/usePageMeta";

export default function About() {
  usePageMeta(pageMeta.about.title, pageMeta.about.description, {
    schema: aboutSchema(pageMeta.about),
  });

  const teaser = graphics[0];

  return (
    <>
      <header className="page-head page-head--about">
        <div className="shell">
          <div className="page-head__top">
            <p className="eyebrow">(About)</p>
            <p className="eyebrow">Lagos, Nigeria</p>
          </div>
          <Reveal as="h1" className="page-head__title">
            <span className="serif">avid</span>
            {" interface "}
            <br />
            &amp; experience designer.
          </Reveal>
          <Reveal as="p" className="page-head__lede" delay={100}>
            I design the whole product: the research and the flows, the interface, the system
            underneath it, and the brand that sits on top. Four years and more than ten products,
            from a legal case-management platform to an 800-screen compliance dashboard.
          </Reveal>
        </div>
      </header>

      <section className="stats" aria-label="At a glance">
        <div className="shell stats__grid">
          {stats.map((item) => (
            <div className="stats__item" key={item.label}>
              <span className="stats__value">{item.value}</span>
              <span className="stats__label">{item.label}</span>
              <span className="stats__note">{item.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-body section">
        <div className="shell">
          <div className="about-intro">
            <Reveal className="about-intro__copy">
              <p className="eyebrow">(Introduction)</p>
              <p className="about-intro__lead">
                I&apos;m a designer who likes the space between the problem and the product.
              </p>
              <p className="about-intro__note">{biography}</p>
            </Reveal>

            <Reveal className="about-intro__media" delay={120}>
              <img
                src="/assets/portrait-1100.webp"
                srcSet="/assets/portrait-700.webp 700w, /assets/portrait-1100.webp 1100w, /assets/portrait-1400.webp 1400w"
                sizes="(max-width: 720px) 92vw, 420px"
                width="1400"
                height="1874"
                alt="Portrait of Adeoluwa Adeoye, product designer in Lagos"
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
                    <span className="dot" />
                    {` ${site.availability}`}
                  </dd>
                </div>
                <div>
                  <dt>Designing since</dt>
                  <dd>2022, so four years and counting</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Experience, interface and systems</dd>
                </div>
                <div>
                  <dt>Industries</dt>
                  <dd>Food, fashion, law, cybersecurity, services</dd>
                </div>
                <div>
                  <dt>Toolkit</dt>
                  <dd>Figma, Affinity, Canva, Claude</dd>
                </div>
              </dl>
            </aside>

            <div className="about-story__body">
              <Reveal as="p" className="about-story__lead">
                Design, for me, has always been about curiosity. Four years in, it still starts
                with a question about how something works and who it is really for.
              </Reveal>

              <div className="about-story__cols">
                <Reveal as="p" delay={60}>
                  I started in 2022 with a legal case-management platform and a fashion store that
                  wanted to leave WhatsApp. That first stretch taught me to design systems rather
                  than screens: cases, stages, permissions, money, and everything that has to hold
                  together once the demo ends.
                </Reveal>
                <Reveal as="p" delay={100}>
                  Then came food tech at Chef4me, where I designed the user app and its redesign,
                  the chef dashboard, the user web app and the site that ties them together. After
                  that, product work at Intasect, and now compliance and security at Vernovi Cyber:
                  three regional sites and the SecureComply dashboard, 800+ screens across three
                  user roles, delivered in under a month.
                </Reveal>
              </div>

              <Reveal className="strengths" delay={120}>
                <p className="eyebrow">(What I&apos;m good at)</p>
                <ul className="strengths__list">
                  {strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>

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
            <p className="section-head__note">Five roles, four years</p>
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

      <section className="toolkit section">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(Toolkit)</p>
            <p className="section-head__note">What the work is actually made in</p>
          </div>

          <div className="toolkit__list">
            {tools.map((tool, i) => (
              <Reveal className="tool" key={tool.name} delay={i * 60}>
                <div className="tool__head">
                  <h3 className="tool__name">{tool.name}</h3>
                  <span className="tool__kind">{tool.kind}</span>
                </div>
                <p className="tool__note">{tool.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {teaser && (
        <section className="graphics-teaser section">
          <div className="shell graphics-teaser__grid">
            <Reveal className="graphics-teaser__media">
              <img
                src={teaser.small}
                srcSet={`${teaser.small} 760w, ${teaser.src} 1200w`}
                sizes="(max-width: 860px) 90vw, 38vw"
                width={teaser.width}
                height={teaser.height}
                alt={teaser.alt}
                loading="lazy"
                decoding="async"
              />
            </Reveal>

            <Reveal className="graphics-teaser__copy" delay={80}>
              <p className="eyebrow">(Graphic design)</p>
              <h2 className="graphics-teaser__title">
                The other half of the <span className="serif">practice.</span>
              </h2>
              <p className="graphics-teaser__note">
                Posters, campaign art, identity and the social work that runs beside the products.
                It has its own room on this site now.
              </p>
              <Link to="/graphics" className="link-arrow" data-cursor="The wall">
                <SlideText mode="word">See the graphics</SlideText>
                <span aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

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
