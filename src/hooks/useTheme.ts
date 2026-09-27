import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");

  const toggle = useCallback(() => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#0e0d0c" : "#f6f4f1");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies.
    }
    listeners.forEach((l) => l());
  }, []);

  return { theme, toggle };
}
