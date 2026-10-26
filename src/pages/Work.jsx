import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ProjectThumb from "../components/ProjectThumb";
import SlideText from "../components/SlideText";
import SecureComplyMark from "../components/SecureComplyMark";
import CTA from "../components/CTA";
import { projects, upcoming } from "../data/projects";
import { pageMeta } from "../data/meta";
import { workSchema } from "../data/schema";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Work() {
  usePageMeta(pageMeta.work.title, pageMeta.work.description, {
    schema: workSchema(pageMeta.work),
  });

  return (
    <>
      <header className="page-head">
        <div className="shell">
          <div className="page-head__top">
            <p className="eyebrow">(Projects)</p>
            <p className="eyebrow">2022 to 2026</p>
          </div>
          <Reveal as="h1" className="page-head__title">
            Selected <span className="serif">projects</span>
          </Reveal>
          <Reveal as="p" className="page-head__lede" delay={100}>
            Five case studies, five different problems. Each one designed from the inside out: the
            research, the flows, the interface and the small details that make it feel finished.
            The sixth is still in preparation.
          </Reveal>
        </div>
      </header>

      <section className="work-grid-section">
        <div className="shell">
          <div className="work-grid">
            {projects.map((project, i) => (
              <Reveal
                key={project.slug}
                className={`work-card ${i % 2 === 1 ? "work-card--offset" : ""}`}
                delay={40}
              >
                <Link to={`/work/${project.slug}`} className="work-card__link" data-cursor="View">
                  <div className="work-card__media">
                    <ProjectThumb
                      project={project}
                      eager={i < 2}
                      sizes="(max-width: 960px) 100vw, 46vw"
                    />
                    <span className="work-card__index">{`(${project.index})`}</span>
                  </div>
                  <div className="work-card__meta">
                    <h2 className="work-card__title">
                      {`${project.display} `}
                      {project.displayAccent && (
                        <span className="serif">{project.displayAccent}</span>
                      )}
                    </h2>
                    <div className="work-card__details">
                      <span>{project.kind}</span>
                      <span>{project.year}</span>
                    </div>
                    <span className="work-card__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}

            {upcoming.map((item) => (
              <Reveal key={item.slug} className="work-card work-card--soon" delay={40}>
                {/* Deliberately not a link: the study does not exist yet, so the
                    card answers with its status instead of a dead route. */}
                <article className="work-card__soon" aria-labelledby={`soon-${item.slug}`}>
                  <div className="work-card__media work-card__media--soon" data-cursor="Soon">
                    <span className="work-card__index">{`(${item.index})`}</span>
                    <span className="soon__mark">
                      <SecureComplyMark size={72} />
                    </span>
                    <span className="soon__word">SecureComply</span>
                    <span className="soon__badge">Coming soon</span>
                    <span className="soon__veil">
                      <span className="soon__veil-title">{item.status}</span>
                      <span className="soon__veil-note">
                        The case study is being written. It lands here when it&apos;s ready.
                      </span>
                    </span>
                  </div>

                  <div className="work-card__meta">
                    <h2 className="work-card__title" id={`soon-${item.slug}`}>
                      {`${item.display} `}
                      <span className="serif">{item.displayAccent}</span>
                    </h2>
                    <div className="work-card__details">
                      <span>{item.kind}</span>
                      <span>{item.year}</span>
                    </div>
                    <span className="work-card__arrow work-card__arrow--soon" aria-hidden="true">
                      ✳
                    </span>
                  </div>

                  <p className="soon__blurb">{item.blurb}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="work-tail" delay={80}>
            <p className="eyebrow">(Currently)</p>
            <p className="work-tail__text">
              I&apos;m open to new product design work: a complex system, a marketplace, or a
              product that needs someone to think across user types and flows.
            </p>
            <Link to="/contact" className="link-arrow" data-cursor="Talk">
              <SlideText mode="word">Start a conversation</SlideText>
              <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
