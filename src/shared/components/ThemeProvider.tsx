"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/shared/stores/theme.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // 초기 테마 적용
    const root = document.documentElement;
    try {
      const stored = localStorage.getItem("theme-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        const savedTheme = parsed?.state?.theme || "light";
        if (savedTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          root.classList.add("dark");
          useThemeStore.setState({ theme: "dark" });
        } else {
          root.classList.remove("dark");
        }
      }
    } catch (e) {
      root.classList.remove("dark");
    }
  }, []);

  // 테마 변경 감지
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}
