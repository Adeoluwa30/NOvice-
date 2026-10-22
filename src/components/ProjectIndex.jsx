import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function ProjectIndex({ items }) {
  const [active, setActive] = useState(null);
  const peek = useRef(null);
  const frame = useRef(0);

  // The thumbnail trails the cursor one frame behind, so the movement stays
  // smooth without re-rendering React on every mouse event.
  const follow = (event) => {
    const x = event.clientX + 26;
    const y = event.clientY - 112;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const node = peek.current;
      if (!node) return;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const hide = () => {
    cancelAnimationFrame(frame.current);
    setActive(null);
  };

  return (
    <div className="project-index" onMouseLeave={hide}>
      {items.map((project, i) => (
        <Reveal key={project.slug} delay={i * 60}>
          <Link
            to={`/work/${project.slug}`}
            className="project-row"
            data-cursor="View"
            onMouseEnter={(event) => {
              setActive(i);
              follow(event);
            }}
            onMouseMove={follow}
          >
            <span className="project-row__index">{`(${project.index})`}</span>
            <span className="project-row__title">
              {`${project.display} `}
              <span>{project.displayAccent}</span>
            </span>
            <span className="project-row__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </Reveal>
      ))}

      <div className={`project-peek ${active === null ? "" : "is-on"}`} ref={peek} aria-hidden="true">
        {active !== null && (
          <img src={items[active].thumb} alt="" loading="lazy" decoding="async" />
        )}
      </div>
    </div>
  );
}
