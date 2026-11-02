"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type SceneTheme = "night" | "day";

type ThemeContextValue = {
  theme: SceneTheme;
  setTheme: (theme: SceneTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ansh-scene-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<SceneTheme>("night");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "day" || stored === "night") {
      setThemeState(stored);
      document.documentElement.dataset.theme = stored;
    }
  }, []);

  const setTheme = useCallback((next: SceneTheme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "night" ? "day" : "night");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSceneTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useSceneTheme must be used inside ThemeProvider");
  }
  return context;
}
