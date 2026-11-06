import ProjectGrid from "../../components/ProjectGrid";
import { projectsIn, upcomingIn } from "../../data/projects";

// The Motion tab of the Projects page. Motion pieces are full case studies on
// the same template as the product work (add them to src/data/projects.js
// with `track: "motion"`). While there are only a couple, a short note sits in
// the second column explaining what each study will cover.
export default function MotionWork() {
  const studies = projectsIn("motion");
  const soon = upcomingIn("motion");
  const sparse = studies.length + soon.length < 2;

  return (
    <section className="work-grid-section">
      <div className="shell">
        <ProjectGrid
          projects={studies}
          upcoming={soon}
          aside={
            sparse ? (
              <>
                <p className="eyebrow">(How these are told)</p>
                <p className="work-aside__lead">
                  Every motion piece here is a case study, not just a clip.
                </p>
                <p className="work-aside__note">
                  The brief and the story it had to tell, the storyboard and the first rough cuts,
                  the tools it was made in and the decisions behind the timing of every frame.
                </p>
              </>
            ) : null
          }
        />
      </div>
    </section>
  );
}
