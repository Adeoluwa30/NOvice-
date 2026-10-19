import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { site } from "../site";

function useLagosTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timezone,
      hour12: false,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const interval = window.setInterval(() => setTime(format()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export default function Footer() {
  const time = useLagosTime();

  return (
    <footer className="footer" id="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Back home">
              <Logo size={44} />
              <span>AdE</span>
            </Link>
            <p>
              Adeoluwa Adeoye — interface &amp; experience designer, building digital
              products with clarity, motion and craft.
            </p>
            <p className="footer__status">
              <span className="dot" /> {site.availability}
            </p>
          </div>

          <div className="footer__col">
            <p className="eyebrow">Pages</p>
            <Link to="/work">Work</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <p className="eyebrow">Elsewhere</p>
            {site.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label} ↗
              </a>
            ))}
            <a href={`mailto:${site.email}`}>Email ↗</a>
          </div>

          <div className="footer__col">
            <p className="eyebrow">Say hello</p>
            <a className="footer__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <p className="footer__place">{site.location}</p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Adeoye Adeoluwa. All rights reserved.</span>
          <span className="footer__time">
            Lagos — {time} <span>WAT</span>
          </span>
          <button
            type="button"
            className="footer__top-link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
