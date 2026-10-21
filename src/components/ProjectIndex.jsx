import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import ProjectThumb from "./ProjectThumb";

export default function ProjectIndex({ items }) {
  return (
    <div className="project-index">
      {items.map((project, i) => (
        <Reveal key={project.slug} delay={i * 60}>
          <Link to={`/work/${project.slug}`} className="project-row" data-cursor="View">
            <span className="project-row__thumb" aria-hidden="true">
              <ProjectThumb project={project} sizes="80px" />
            </span>
            <span className="project-row__index">({project.index})</span>
            <span className="project-row__title">
              {project.display} <span>{project.displayAccent}</span>
            </span>
            <span className="project-row__kind">{project.kind}</span>
            <span className="project-row__year">{project.year}</span>
            <span className="project-row__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
