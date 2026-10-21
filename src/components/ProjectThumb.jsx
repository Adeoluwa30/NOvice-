/**
 * The project thumbnails, taken from the earlier portfolio so every case study
 * is represented by its real product shot instead of an abstract cover.
 */
export default function ProjectThumb({ project, className = "", eager = false, sizes }) {
  const label = `${project.display}${project.displayAccent ? ` ${project.displayAccent}` : ""}`;

  return (
    <img
      className={`project-thumb ${className}`}
      src={project.thumb}
      alt={`${label}, ${project.kind.toLowerCase()} project`}
      width={1800}
      height={1200}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}
