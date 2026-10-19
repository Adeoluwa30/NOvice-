import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "motion/react";
import Reveal from "./Reveal";

export default function ProjectIndex({ items, showPreview = true }) {
  const [hovered, setHovered] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 20, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 160, damping: 20, mass: 0.35 });

  const handleMove = (event) => {
    x.set(event.clientX + 28);
    y.set(event.clientY - 110);
  };

  return (
    <div className="project-index" onMouseMove={handleMove} onMouseLeave={() => setHovered(null)}>
      {items.map((project, i) => (
        <Reveal key={project.slug} delay={i * 60}>
          <Link
            to={`/work/${project.slug}`}
            className={`project-row ${hovered === project.slug ? "is-hovered" : ""}`}
            onMouseEnter={() => setHovered(project.slug)}
            onFocus={() => setHovered(project.slug)}
            onBlur={() => setHovered(null)}
            data-cursor="View"
          >
            <span className="project-row__index">({project.index})</span>
            <span className="project-row__title">
              {project.display} <span>{project.displayAccent}</span>
            </span>
            <span className="project-row__kind">{project.kind}</span>
            <span className="project-row__year">{project.year}</span>
            <span className="project-row__arrow">↗</span>
            <span className="project-row__thumb" aria-hidden="true">
              <img src={project.thumb} alt="" loading="lazy" />
            </span>
          </Link>
        </Reveal>
      ))}

      {showPreview && (
        <motion.div
          className="project-preview"
          style={{ x: sx, y: sy }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.92 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {items.map((project) => (
            <img
              key={project.slug}
              src={project.thumb}
              alt=""
              loading="eager"
              className={hovered === project.slug ? "is-visible" : ""}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
