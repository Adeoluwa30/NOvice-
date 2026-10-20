/**
 * A simple, graphic project cover. Replaces the old screenshot thumbnails so
 * each project reads as one clear, consistent object at any size.
 */
export default function Cover({ project, className = "" }) {
  return (
    <div className={`cover cover--${project.tone || "ink"} ${className}`}>
      <div className="cover__top">
        <span>({project.index})</span>
        <span>{project.kind}</span>
      </div>

      <div className="cover__art" aria-hidden="true">
        <span className="cover__ring" />
        <span className="cover__ring cover__ring--small" />
        <span className="cover__mark">✳</span>
      </div>

      <div className="cover__bottom">
        <p className="cover__title">
          {project.display}
          {project.displayAccent && <em> {project.displayAccent}</em>}
        </p>
        <div className="cover__meta">
          <span>{project.year}</span>
          <span>{project.client}</span>
        </div>
      </div>
    </div>
  );
}
