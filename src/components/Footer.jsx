import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { credentia, site } from "../site";

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
        <div className="footer__head">
          <p className="eyebrow">(Get in touch)</p>
          <p className="footer__status">
            <span className="dot" /> {site.availability} · 2026
          </p>
        </div>

        <a className="footer__mail" href={`mailto:${site.email}`} data-cursor="Email">
          <span>{site.email}</span>
          <span className="footer__mail-arrow" aria-hidden="true">↗</span>
        </a>

        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Back home">
              <Logo size={38} />
              <span>AdE</span>
            </Link>
            <p>
              Interface &amp; experience designer in Lagos, building digital products with
              clarity, motion and craft.
            </p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <p className="eyebrow">Pages</p>
            <Link to="/work">Projects</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="footer__col">
            <p className="eyebrow">Elsewhere</p>
            {site.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label} <span>↗</span>
              </a>
            ))}
            <a href={credentia.href} target="_blank" rel="noreferrer">
              Credentia <span>↗</span>
            </a>
          </div>

          <div className="footer__col footer__col--place">
            <p className="eyebrow">Lagos, Nigeria</p>
            <p className="footer__time">
              {time} <span>WAT</span>
            </p>
            <p className="footer__note">Working with teams anywhere.</p>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          Adeoluwa <span>Adeoye</span>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Adeoye Adeoluwa</span>
          <span>Designed &amp; built by AdE</span>
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
