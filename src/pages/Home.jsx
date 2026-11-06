import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import ProjectIndex from "../components/ProjectIndex";
import SlideText from "../components/SlideText";
import CTA from "../components/CTA";
import { projects } from "../data/projects";
import { capabilities, credentia, experience, roles, site } from "../site";
import { homeSchema } from "../data/schema";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta(undefined, undefined, { schema: homeSchema() });

  return (
    <>
      <section className="hero">
        <h1 className="sr-only">{`${site.name}, ${site.headline}`}</h1>

        <div className="hero__stage">
          <div className="hero__type">
            {roles.map((role, i) => (
              <div
                key={role}
                className={`hero__line ${i === 1 ? "hero__line--outline" : ""}`}
              >
                <Marquee speed={[46, 54, 40][i]} reverse={i === 1}>
                  <span>{role}</span>
                  <span className="asterisk">✳</span>
                  <span>{role}</span>
                  <span className="asterisk">✳</span>
                </Marquee>
              </div>
            ))}
          </div>

          <figure className="hero__portrait">
            <div className="hero__portrait-frame">
              <img
                src="/assets/portrait-1100.webp"
                srcSet="/assets/portrait-700.webp 700w, /assets/portrait-1100.webp 1100w, /assets/portrait-1400.webp 1400w"
                sizes="(max-width: 960px) 66vw, 374px"
                width="1400"
                height="1874"
                alt="Portrait of Adeoluwa Adeoye, product designer in Lagos"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(01) Selected projects</p>
            <Link to="/work" className="link-arrow" data-cursor="All projects">
              <SlideText mode="word">All projects</SlideText>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <Reveal as="h2" className="work__title">
            Designs uniquely <span className="serif">made</span>
            <br />
            for the brand.
          </Reveal>

          <ProjectIndex items={projects} />

          <Reveal className="work__note" delay={120}>
            <span>2022 to 2026</span>
            <p>
              Five case studies across food, fashion and law, each designed end to end, from the
              first question to the shipped interface. A sixth, a compliance platform, is on the
              way. The <Link to="/work/graphics">graphic design</Link> and <Link to="/work/motion">motion</Link>{" work sits beside them in Projects."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="capabilities section">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">(02) What I do</p>
            <p className="section-head__note">Services</p>
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
            <p className="eyebrow">(03) Journey</p>
            <Link to="/about" className="link-arrow" data-cursor="Story">
              <SlideText mode="word">The full story</SlideText>
              <span aria-hidden="true">↗</span>
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
              <p className="eyebrow">(04) Currently building</p>
              <span className="credentia__status">
                <span className="dot" /> Live
              </span>
            </div>

            <div className="credentia__lead">
              <h2 className="credentia__title">{credentia.name}</h2>
              <p className="credentia__role">{credentia.role}</p>
            </div>

            <div className="credentia__body">
              <div className="credentia__copy">
                <p className="credentia__blurb">{credentia.blurb}</p>
                <a
                  className="credentia__link"
                  href={credentia.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Visit"
                >
                  <SlideText mode="word">Visit credentia.site</SlideText>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <dl className="credentia__facts">
                {credentia.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
