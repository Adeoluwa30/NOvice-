import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import ScrollProgress from "../components/ScrollProgress";
import Parallax from "../components/Parallax";
import Reveal from "../components/Reveal";
import ProjectThumb from "../components/ProjectThumb";
import SlideText from "../components/SlideText";
import CTA from "../components/CTA";
import { getNextProject, getProject, projects } from "../data/projects";
import { projectMeta } from "../data/meta";
import { ogImageFor, projectSchema } from "../data/schema";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  const meta = project ? projectMeta(project) : { title: "Project not found" };
  usePageMeta(meta.title, meta.description, {
    type: "article",
    image: ogImageFor(project),
    schema: project ? projectSchema(project, meta) : undefined,
  });

  if (!project) {
    return (
      <section className="empty-page">
        <div className="shell">
          <p className="eyebrow">(404)</p>
          <h1 className="page-head__title">
            This project <span className="serif">isn&apos;t here.</span>
          </h1>
          <p className="page-head__lede">
            The case study may have moved. Have a look at everything else instead.
          </p>
          <Link to="/work" className="btn btn--solid">
            <SlideText mode="word">All work</SlideText>
            <span className="btn__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
    );
  }

  const next = getNextProject(project.slug);

  return (
    <article className="case">
      <ScrollProgress />

      <header className="case-hero">
        <div className="shell">
          <div className="case-hero__top">
            <Link to="/work" className="back-link" data-cursor="Back">
              <SlideText mode="word">← All work</SlideText>
            </Link>
            <span className="eyebrow">
              {`Case Study, ${project.index} / ${String(projects.length).padStart(2, "0")}`}
            </span>
          </div>

          <motion.h1
            className="case-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {`${project.display} `}
            {project.displayAccent && <span className="serif">{project.displayAccent}</span>}
          </motion.h1>

          <div className="case-hero__meta">
            <motion.p
              className="case-hero__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {project.tagline}
            </motion.p>

            <motion.dl
              className="meta-grid"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <div>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Industry</dt>
                <dd>{project.industry}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>{project.platform}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>{project.scope}</dd>
              </div>
            </motion.dl>
          </div>
        </div>
      </header>

      <figure className="case-cover">
        <img
          src={project.cover}
          alt={`${project.title}, ${project.kind.toLowerCase()} case study cover`}
          fetchPriority="high"
          decoding="async"
        />
      </figure>

      <div className="shell case-body">
        <section className="case-block">
          <p className="eyebrow">(The brief)</p>
          <p className="case-lede">{project.summary}</p>
        </section>

        <section className="case-block case-block--challenge">
          <p className="eyebrow">(The challenge)</p>
          <h2 className="case-challenge">{project.challenge}</h2>
        </section>

        {project.chapters.map((chapter, i) => (
          <section
            key={chapter.title}
            className={`chapter ${i % 2 === 1 ? "chapter--reverse" : ""}`}
          >
            <Reveal className="chapter__head">
              <div className="chapter__label">
                <span className="chapter__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="eyebrow">{chapter.eyebrow}</span>
              </div>
              <h3 className="chapter__title">{chapter.title}</h3>
              <p className="chapter__body">{chapter.body}</p>
            </Reveal>

            <Reveal className="chapter__media" delay={80}>
              {chapter.images ? (
                <div className="chapter__duo">
                  {chapter.images.map((image) => (
                    <figure
                      className={`chapter__figure chapter__figure--${image.layout}`}
                      key={image.src}
                    >
                      <Parallax src={image.src} alt={image.alt} amount={18} />
                    </figure>
                  ))}
                </div>
              ) : chapter.image ? (
                <figure className="chapter__figure">
                  <Parallax src={chapter.image} alt={chapter.alt} amount={22} />
                </figure>
              ) : (
                <div className="chapter__statement">
                  <span className="chapter__statement-label">{chapter.eyebrow}</span>
                  <span className="chapter__statement-title">{chapter.title}</span>
                  <span className="chapter__statement-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="chapter__statement-mark" aria-hidden="true">
                    ✳
                  </span>
                </div>
              )}
              {chapter.note && <figcaption>{chapter.note}</figcaption>}
            </Reveal>
          </section>
        ))}

        <section className="case-quote">
          <span className="case-quote__mark" aria-hidden="true">
            “
          </span>
          <Reveal as="blockquote" className="case-quote__text">
            {project.quote}
          </Reveal>
          <p className="case-quote__sign">Adeoluwa Adeoye</p>
        </section>

        <section className="outcomes">
          <div className="section-head">
            <p className="eyebrow">(The outcome)</p>
            <p className="section-head__note">What changed</p>
          </div>
          <div className="outcomes__list">
            {project.outcomes.map((item, i) => (
              <Reveal className="outcome" key={item.label} delay={i * 70}>
                <span className="outcome__n">{`0${i + 1}`}</span>
                <h4>{item.label}</h4>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {project.faqs?.length ? (
        <section className="case-faq section">
          <div className="shell case-faq__layout">
            <div className="case-faq__head">
              <p className="eyebrow">(Questions)</p>
              <h2 className="case-faq__title">
                About this <span className="serif">project.</span>
              </h2>
              <p className="case-faq__note">
                The things people usually ask when this work comes up in a conversation.
              </p>
            </div>

            <div className="case-faq__list">
              {project.faqs.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <details className="case-faq__item" open={i === 0}>
                    <summary>
                      <span className="case-faq__n">{`0${i + 1}`}</span>
                      <span className="case-faq__q">{item.q}</span>
                      <span className="case-faq__icon" aria-hidden="true" />
                    </summary>
                    <p className="case-faq__a">{item.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="next-project">
        <div className="shell">
          <Link
            to={`/work/${next.slug}`}
            className="next-project__link"
            data-cursor="Next"
          >
            <div className="next-project__text">
              <p className="eyebrow">(Next project)</p>
              <h2>
                {`${next.display} `}
                <span className="serif">{next.displayAccent}</span>
              </h2>
              <p className="next-project__meta">
                {`${next.kind}, ${next.year}`}
              </p>
            </div>
            <div className="next-project__media">
              <ProjectThumb project={next} sizes="(max-width: 960px) 90vw, 420px" />
              <span aria-hidden="true">↗</span>
            </div>
          </Link>
        </div>
      </section>

      <CTA />
    </article>
  );
}
