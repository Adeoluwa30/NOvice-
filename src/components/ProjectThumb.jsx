/**
 * The project thumbnails, taken from the earlier portfolio so every case study
 * is represented by its real product shot instead of an abstract cover. Each
 * thumb also ships a 900w variant so cards never download the full cover.
 */
export default function ProjectThumb({ project, className = "", eager = false, sizes }) {
  const label = `${project.display}${project.displayAccent ? ` ${project.displayAccent}` : ""}`;
  const small = project.thumb.replace(/\.webp$/, "-900.webp");

  return (
    <img
      className={`project-thumb ${className}`}
      src={project.thumb}
      srcSet={`${small} 900w, ${project.thumb} 1800w`}
      alt={`${label}, ${project.kind.toLowerCase()} project`}
      width={1600}
      height={1067}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}
