import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ProjectThumb from "../components/ProjectThumb";
import CTA from "../components/CTA";
import { projects } from "../data/projects";
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
            <p className="eyebrow">2023 to 2026</p>
          </div>
          <Reveal as="h1" className="page-head__title">
            Selected <span className="serif">projects</span>
          </Reveal>
          <Reveal as="p" className="page-head__lede" delay={100}>
            Five products, five different problems. Each one designed from the inside out: the
            research, the flows, the interface and the small details that make it feel finished.
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
          </div>

          <Reveal className="work-tail" delay={80}>
            <p className="eyebrow">(Currently)</p>
            <p className="work-tail__text">
              I&apos;m open to new product design work: a complex system, a marketplace, or a
              product that needs someone to think across user types and flows.
            </p>
            <Link to="/contact" className="link-arrow" data-cursor="Talk">
              Start a conversation <span>↗</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
