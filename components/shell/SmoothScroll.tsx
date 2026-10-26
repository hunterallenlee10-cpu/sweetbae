"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. Off under reduced motion. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -120 } });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    const { ScrollTrigger } = registerGsap();
    if (!location.hash) window.__lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

export function lockScroll(lock: boolean) {
  if (lock) {
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    window.__lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
