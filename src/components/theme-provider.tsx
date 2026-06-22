"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColors = {
  primary: string;
  border: string;
  header: string;
  actionPrimary: string;
  actionDanger: string;
};

const defaultTheme: ThemeColors = {
  primary: "#00bcd4",
  border: "#e0f2f1",
  header: "#e0f7fa",
  actionPrimary: "#00bcd4",
  actionDanger: "#ff5252",
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
        setTheme({ ...defaultTheme, ...JSON.parse(savedTheme) });
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
