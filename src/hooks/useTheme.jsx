import { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", metaColors[theme]);
    try {
      localStorage.setItem("ade-theme", theme);
    } catch (error) {
      /* storage can be unavailable in private mode */
    }
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
