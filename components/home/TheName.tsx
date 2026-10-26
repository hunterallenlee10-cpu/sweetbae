"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ICON_PATH, ICON_VIEWBOX } from "@/components/brand/paths";
import { copy, micro } from "@/content/site";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

/** The magnolia line drawing traces itself as you scroll beside "About Our Name". */
export function TheName() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const path = ref.current?.querySelector("path");
    if (!path) return;
    if (prefersReducedMotion()) {
      path.style.strokeDashoffset = "0";
      path.style.fillOpacity = "1";
      return;
    }
    const { gsap } = registerGsap();
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: 0.8 } });
    tl.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 1 }).to(path, { fillOpacity: 1, duration: 0.25 }, 0.8);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const [pre, rest] = copy.about.name.split("(Magnolia Kitchen & Bar)");
  const [mid, post] = rest.split("Breton Bay");

  return (
    <section aria-labelledby="name-title" className="wrap py-24 lg:py-40">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div ref={ref} className="text-[color:var(--accent)] lg:col-span-6">
          <svg viewBox={ICON_VIEWBOX} className="w-full" aria-hidden>
            <path d={ICON_PATH} pathLength={1} fill="currentColor" stroke="currentColor" strokeWidth={0.9} style={{ fillOpacity: 0, strokeDasharray: 1, strokeDashoffset: 1 }} />
          </svg>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow mb-4">The Name</p>
          <h2 id="name-title" className="display-md">
            {copy.about.nameTitle}
          </h2>
          <p className="lede mt-8 text-[clamp(20px,1.7vw,26px)] text-[color:var(--fg-muted)]">
            {pre}(<span className="em text-[color:var(--fg)]">Magnolia Kitchen &amp; Bar</span>){mid}
            <span className="em text-[color:var(--fg)]">Breton Bay</span>
            {post}
          </p>
          <Link href="/about-us" className="link-underline mt-10 inline-block text-[15px]">
            {micro.aboutLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
