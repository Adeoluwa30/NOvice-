import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useTheme } from "../hooks/useTheme";
import { projects } from "../data/projects";

const themeLabels = {
  dark: "Night",
  light: "Day",
  brand: "AdE",
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <Link to="/" className="nav__brand" aria-label="Adeoluwa Adeoye — home">
          <Logo size={30} />
          <span className="nav__word">AdE</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/work" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Work <sup>({String(projects.length).padStart(2, "0")})</sup>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "is-active" : "")}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Contact
          </NavLink>
        </nav>

        <div className="nav__right">
          <div className="theme-switch" role="group" aria-label="Colour theme">
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
              >
                <span />
              </button>
            ))}
          </div>

          <Link to="/contact" className="nav__cta" data-cursor="Talk">
            Let&apos;s talk
          </Link>

          <button
            type="button"
            className={`burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="menu__inner">
          <nav className="menu__links" aria-label="Mobile">
            <Link to="/work" data-index="01">
              Work
            </Link>
            <Link to="/about" data-index="02">
              About
            </Link>
            <Link to="/contact" data-index="03">
              Contact
            </Link>
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
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">Elsewhere</p>
              <p className="menu__socials">
                <a href="https://www.behance.net/adeoluwaadeoye" target="_blank" rel="noreferrer">
                  Behance
                </a>
                <a href="https://github.com/Adeoluwa30" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </p>
            </div>
            <div>
              <p className="eyebrow">Based in</p>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
