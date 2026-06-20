'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme-preference',
  ...props
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Only run on client
    const root = window.document.documentElement;
    const initialTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    setThemeState(initialTheme);

    const applyTheme = (t: Theme) => {
      root.classList.remove('light', 'dark');
      if (t === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(t);
      }
    };

    applyTheme(initialTheme);
  }, [defaultTheme, storageKey]);

  const setTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    localStorage.setItem(storageKey, theme);
    setThemeState(theme);

    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
