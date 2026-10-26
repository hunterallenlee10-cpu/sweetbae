"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "night" | "day";

/** Route defaults. Mirrored in the inline head script so the first paint is correct. */
export const routeThemes: Record<string, Theme> = {
  "/": "night",
  "/menus/dinner": "night",
  "/menus/lunch": "day",
  "/menus/signature-cocktails": "night",
  "/about-us": "day",
  "/the-restaurant": "night",
  "/contact-us": "day",
};

export const themeBootScript = `(function(){try{var m=${JSON.stringify(routeThemes)};var p=location.pathname.replace(/\\/$/,'')||'/';var d=document.documentElement;d.dataset.theme=m[p]||'night';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(r||sessionStorage.getItem('sb-pre'))d.classList.add('no-preloader');sessionStorage.setItem('sb-pre','1')}catch(e){}})();`;

type Ctx = { theme: Theme; setTheme: (t: Theme) => void };
const ThemeContext = createContext<Ctx>({ theme: "night", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("night");

  useEffect(() => {
    const t = document.documentElement.dataset.theme as Theme | undefined;
    if (t) setThemeState(t);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    setThemeState(t);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Drop into a page to set its mood. `heroTone` tells the transparent nav
 * which mood the full-bleed opener uses (e.g. an ink opener on a day page).
 */
export function SetTheme({ theme, heroTone }: { theme: Theme; heroTone?: Theme }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme(theme);
    const d = document.documentElement;
    if (heroTone) d.dataset.heroTone = heroTone;
    else delete d.dataset.heroTone;
    window.dispatchEvent(new Event("sb:herotone"));
  }, [theme, heroTone, setTheme]);
  return null;
}
