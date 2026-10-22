import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found", undefined, { robots: "noindex, follow" });

  return (
    <section className="empty-page">
      <div className="shell">
        <p className="eyebrow">(404)</p>
        <Reveal as="h1" className="empty-page__title">
          {"This page doesn't exist, "}
          <br />
          but let&apos;s <span className="serif">create</span> something that does.
        </Reveal>
        <p className="empty-page__lede">
          Hmm… nothing here. The work, the story and the contact details are all one click away.
        </p>
        <div className="empty-page__actions">
          <Link to="/" className="btn btn--solid">
            <span>Back home</span>
            <span className="btn__arrow">↗</span>
          </Link>
          <Link to="/work" className="link-arrow">
            See the work <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
