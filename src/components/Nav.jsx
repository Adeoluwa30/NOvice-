import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useTheme } from "../hooks/useTheme";
import { setScrollLocked } from "../hooks/useLenis";
import { site } from "../site";

const themeLabels = {
  dark: "Night",
  light: "Day",
  brand: "AdE",
};

const links = [
  { to: "/work", label: "Projects", index: "01" },
  { to: "/about", label: "About", index: "02" },
  { to: "/contact", label: "Contact", index: "03" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const { pathname } = useLocation();
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // The header tucks away as you read down and comes back the moment you
      // scroll up, so the page keeps the screen and the way back is one gesture.
      if (!open) {
        if (y > lastY.current + 6 && y > 160) setHidden(true);
        else if (y < lastY.current - 6) setHidden(false);
      }
      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    setScrollLocked(open);
    if (open) setHidden(false);
    return () => {
      document.body.classList.remove("menu-open");
      setScrollLocked(false);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`nav ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""}`}
      >
        <Link to="/" className="nav__brand" aria-label="Adeoluwa Adeoye, home">
          <Logo size={34} />
        </Link>

        <div className="nav__right">
          <button
            type="button"
            className={`burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`menu ${open ? "is-open" : ""}`}
        id="site-menu"
        aria-hidden={!open}
        role="dialog"
        aria-label="Menu"
      >
        <div className="menu__inner">
          <nav className="menu__links" aria-label="Menu">
            {links.map((link) => (
              <Link key={link.to} to={link.to} data-index={link.index} tabIndex={open ? 0 : -1}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="menu__foot">
            <div>
              <p className="eyebrow">Themes</p>
              <div className="theme-switch theme-switch--large">
                {themes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`theme-switch__dot theme-switch__dot--${item} ${
                      theme === item ? "is-active" : ""
                    }`}
                    onClick={() => setTheme(item)}
                    aria-label={`${themeLabels[item]} theme`}
                    aria-pressed={theme === item}
                    tabIndex={open ? 0 : -1}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">Elsewhere</p>
              <p className="menu__socials">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={open ? 0 : -1}
                  >
                    {social.label}
                  </a>
                ))}
              </p>
            </div>
            <div>
              <p className="eyebrow">Say hello</p>
              <a className="menu__email" href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
                {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow">Based in</p>
              <p>{site.location}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
