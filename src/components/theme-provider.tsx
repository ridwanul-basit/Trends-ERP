"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColors = {
  primary: string;
  border: string;
  header: string;
  actionPrimary: string;
  actionDanger: string;
  sectionHighlight: string;
  sidebarParentBg: string;
  sidebarParentText: string;
  sidebarChildText: string;
  paginationActiveBg: string;
  paginationActiveText: string;
  layoutPosition: "vertical" | "horizontal";
};

const defaultTheme: ThemeColors = {
  primary: "#486AB8",
  border: "#e0f2f1",
  header: "#e0f7fa",
  actionPrimary: "#486AB8",
  actionDanger: "#ff5252",
  sectionHighlight: "#f59e0b",
  sidebarParentBg: "#486AB8",
  sidebarParentText: "#ffffff",
  sidebarChildText: "#486AB8",
  paginationActiveBg: "#486AB8",
  paginationActiveText: "#ffffff",
  layoutPosition: "vertical",
};

type ThemeContextType = {
  theme: ThemeColors;
  updateTheme: (colors: Partial<ThemeColors>) => void;
  resetTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("erp-theme-colors");
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        const primaryToUse = parsed.primary || defaultTheme.primary;

        setTheme({
          ...defaultTheme,
          ...parsed,
          // Fall back to the saved primary color if these new fields aren't in local storage yet
          sidebarParentBg: parsed.sidebarParentBg || primaryToUse,
          sidebarChildText: parsed.sidebarChildText || primaryToUse,
          paginationActiveBg: parsed.paginationActiveBg || primaryToUse,
        });
      } catch (e) {
        console.error("Failed to parse theme from local storage");
      }
    }
    setMounted(true);
  }, []);

  // Apply CSS variables to root
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.style.setProperty("--theme-primary", theme.primary);
    root.style.setProperty("--theme-border", theme.border);
    root.style.setProperty("--theme-header", theme.header);
    root.style.setProperty("--theme-action-primary", theme.actionPrimary);
    root.style.setProperty("--theme-action-danger", theme.actionDanger);
    root.style.setProperty("--theme-section-highlight", theme.sectionHighlight);
    root.style.setProperty("--theme-sidebar-parent-bg", theme.sidebarParentBg);
    root.style.setProperty("--theme-sidebar-parent-text", theme.sidebarParentText);
    root.style.setProperty("--theme-sidebar-child-text", theme.sidebarChildText);
    root.style.setProperty("--theme-pagination-active-bg", theme.paginationActiveBg);
    root.style.setProperty("--theme-pagination-active-text", theme.paginationActiveText);

    // Save to local storage
    localStorage.setItem("erp-theme-colors", JSON.stringify(theme));
  }, [theme, mounted]);

  const updateTheme = (colors: Partial<ThemeColors>) => {
    setTheme((prev) => ({ ...prev, ...colors }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
