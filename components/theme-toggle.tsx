"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved =
      window.localStorage.getItem("zenetic-theme") === "light"
        ? "light"
        : "dark";

    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    setTheme(next);
    localStorage.setItem("zenetic-theme", next);
    applyTheme(next);
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-arena-border bg-arena-surface px-3 py-2 font-mono text-[10px] font-semibold tracking-[0.12em] text-arena-fg transition-colors hover:border-arena-accent hover:text-arena-accent"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      aria-pressed={isLight}
    >
      {isLight ? <Moon size={14} /> : <Sun size={14} />}
      {isLight ? "DARK MODE" : "LIGHT MODE"}
    </button>
  );
}