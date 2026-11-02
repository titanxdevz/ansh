"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export type SceneTheme = "night" | "day";

type ThemeContextValue = {
  theme: SceneTheme;
  setTheme: (theme: SceneTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ansh-scene-theme";

/**
 * The saved theme is external state, so it is read through a tiny store rather
 * than copied into React state from an effect. That keeps the first client
 * render honest and avoids a second render pass just to apply the stored value.
 */
const listeners = new Set<() => void>();

function isSceneTheme(value: string | null): value is SceneTheme {
  return value === "day" || value === "night";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readStoredTheme(): SceneTheme {
  if (typeof window === "undefined") return "night";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isSceneTheme(stored) ? stored : "night";
}

function readServerTheme(): SceneTheme {
  return "night";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readStoredTheme, readServerTheme);

  // Mirror the active theme onto the document so the CSS variables and the
  // WebGL scene never disagree about which palette is in play.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((next: SceneTheme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    listeners.forEach((listener) => listener());
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readStoredTheme() === "night" ? "day" : "night");
  }, [setTheme]);

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
