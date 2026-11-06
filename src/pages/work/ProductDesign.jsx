import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import SlideText from "../../components/SlideText";
import ProjectGrid from "../../components/ProjectGrid";
import { projectsIn, upcomingIn } from "../../data/projects";

// The Product design tab of the Projects page: the case studies, plus the
// SecureComply card that is deliberately not a link yet.
export default function ProductDesign() {
  return (
    <section className="work-grid-section">
      <div className="shell">
        <ProjectGrid projects={projectsIn("product")} upcoming={upcomingIn("product")} />

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
  );
}
