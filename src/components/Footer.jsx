import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SlideText from "./SlideText";
import { credentia, site } from "../site";

function useLagosTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timezone,
      hour12: false,
    }).format(new Date());

  // Empty until the client mounts: a build-time clock would be both stale and a
  // hydration mismatch once the prerendered HTML is reused.
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(format());
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
          <Link to="/" className="footer__logo" aria-label="Back home">
            <Logo size={46} />
          </Link>

          <a className="footer__mail" href={`mailto:${site.email}`} data-cursor="Email">
            <span>{site.email}</span>
            <span className="footer__mail-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        <div className="footer__row">
          <nav className="footer__nav" aria-label="Footer">
            <Link to="/work">
              <SlideText mode="word">Projects</SlideText>
            </Link>
            <Link to="/graphics">
              <SlideText mode="word">Graphics</SlideText>
            </Link>
            <Link to="/about">
              <SlideText mode="word">About</SlideText>
            </Link>
            <Link to="/contact">
              <SlideText mode="word">Contact</SlideText>
            </Link>
          </nav>

          <div className="footer__socials">
            {site.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                <SlideText mode="word">{social.label}</SlideText>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
            <a href={credentia.href} target="_blank" rel="noreferrer">
              <SlideText mode="word">Credentia</SlideText>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className="footer__place">
            <span className="dot" />{` Lagos, Nigeria${time ? `, ${time} WAT` : ""}`}
          </p>
        </div>

        <div className="footer__bottom">
          <span>© 2026</span>
          <span>Interface &amp; experience designer</span>
          <button
            type="button"
            className="footer__top-link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <SlideText mode="word">Back to top ↑</SlideText>
          </button>
        </div>
      </div>
    </footer>
  );
}
