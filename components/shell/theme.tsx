"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

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

export const themeBootScript = `(function(){try{var m=${JSON.stringify(routeThemes)};var p=location.pathname.replace(/\\/$/,'')||'/';var d=document.documentElement;d.classList.add('js');d.dataset.theme=m[p]||'night';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(r||sessionStorage.getItem('sb-pre'))d.classList.add('no-preloader');sessionStorage.setItem('sb-pre','1')}catch(e){}})();`;

type Ctx = { theme: Theme; setTheme: (t: Theme) => void };
const ThemeContext = createContext<Ctx>({ theme: "night", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("night");

  useEffect(() => {
    const t = document.documentElement.dataset.theme as Theme | undefined;
    if (t) setThemeState(t);
  }, []);

  // Crossfade the whole page between Night and Day. View Transitions where supported, CSS fallback otherwise.
  const setTheme = useCallback((t: Theme) => {
    const d = document.documentElement;
    if (d.dataset.theme === t) return setThemeState(t);
    const apply = () => {
      d.dataset.theme = t;
      flushSync(() => setThemeState(t));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vt = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
    if (vt && !reduce) vt.call(document, apply);
    else apply();
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
