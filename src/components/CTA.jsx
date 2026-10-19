import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { site } from "../site";

export default function CTA() {
  return (
    <section className="cta section" aria-labelledby="cta-title">
      <div className="shell">
        <Reveal className="cta__inner">
          <p className="eyebrow">(Next)</p>
          <h2 className="cta__title" id="cta-title">
            Got an idea <span className="serif">in mind?</span>
            <br />
            Let&apos;s make it <span className="serif">real.</span>
          </h2>
          <div className="cta__row">
            <p className="cta__note">{site.availabilityNote}</p>
            <Magnetic>
              <Link to="/contact" className="btn btn--solid" data-cursor="Say hi">
                <span>Make contact</span>
                <span className="btn__arrow">↗</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
