import { createContext, useContext, useEffect, useRef, useState } from "react";

const themes = ["dark", "light", "brand"];
const ThemeContext = createContext(null);

const metaColors = {
  dark: "#0a0a0b",
  light: "#f3f0e9",
  brand: "#e3063b",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "dark";
    const current = document.documentElement.getAttribute("data-theme");
    return themes.includes(current) ? current : "dark";
  });

  const firstRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;

    // Cross-fade the palette instead of swapping it instantly. The class is
    // removed again so it never slows down hover or layout transitions.
    let timer;
    if (firstRun.current) {
      firstRun.current = false;
    } else {
      root.classList.add("theme-anim");
      timer = window.setTimeout(() => root.classList.remove("theme-anim"), 560);
    }

    root.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", metaColors[theme]);
    try {
      localStorage.setItem("ade-theme", theme);
    } catch (error) {
      /* storage can be unavailable in private mode */
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      root.classList.remove("theme-anim");
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
