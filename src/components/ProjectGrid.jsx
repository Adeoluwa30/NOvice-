import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import ProjectThumb from "./ProjectThumb";
import SecureComplyMark from "./SecureComplyMark";
import SignatureMark from "./SignatureMark";

// What fills the frame of a coming-soon card, by the `mark` on its entry.
function SoonFace({ item }) {
  if (item.mark === "signature") return <SignatureMark />;
  return (
    <>
      <span className="soon__mark">
        <SecureComplyMark size={72} />
      </span>
      <span className="soon__word">{item.title}</span>
    </>
  );
}

/**
 * The case-study card grid used by the Projects tabs. Live case studies link
 * to their page; `upcoming` entries are deliberately not links, so the card
 * answers with its status instead of a dead route. `aside` is an optional
 * column of copy that sits beside the cards when there are only a few.
 */
export default function ProjectGrid({ projects, upcoming = [], aside = null }) {
  const count = projects.length;

  return (
    <div className="work-grid">
      {projects.map((project, i) => (
        <Reveal
          key={project.slug}
          className={`work-card ${i % 2 === 1 ? "work-card--offset" : ""}`}
          delay={40}
        >
          <Link to={`/work/${project.slug}`} className="work-card__link" data-cursor="View">
            <div className="work-card__media">
              <ProjectThumb project={project} eager={i < 2} sizes="(max-width: 960px) 100vw, 46vw" />
              <span className="work-card__index">{`(${project.index})`}</span>
            </div>
            <div className="work-card__meta">
              <h2 className="work-card__title">
                {`${project.display} `}
                {project.displayAccent && <span className="serif">{project.displayAccent}</span>}
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

      {upcoming.map((item, i) => (
        <Reveal
          key={item.slug}
          className={`work-card work-card--soon ${(count + i) % 2 === 1 ? "work-card--offset" : ""}`}
          delay={40}
        >
          <article className="work-card__soon" aria-labelledby={`soon-${item.slug}`}>
            <div
              className={`work-card__media work-card__media--soon work-card__media--${item.mark}`}
              data-cursor="Soon"
            >
              <span className="work-card__index">{`(${item.index})`}</span>
              <SoonFace item={item} />
              <span className="soon__badge">Coming soon</span>
              <span className="soon__veil">
                <span className="soon__veil-title">{item.status}</span>
                <span className="soon__veil-note">
                  {item.note || "The case study is being written. It lands here when it's ready."}
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

      {aside && (
        <Reveal
          className={`work-aside ${(count + upcoming.length) % 2 === 1 ? "work-card--offset" : ""}`}
          delay={120}
        >
          {aside}
        </Reveal>
      )}
    </div>
  );
}
