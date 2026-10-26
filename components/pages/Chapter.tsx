"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

/** Full-height chapter: real photo with a clip-path reveal and a slow Ken Burns drift. */
export function Chapter({
  index,
  title,
  body,
  note,
  img,
  alt,
  blur,
  flip,
  children,
}: {
  index: number;
  title: string;
  body: string;
  note?: string;
  img: string;
  alt: string;
  blur?: string;
  flip?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", end: "top 25%", scrub: 0.8 } });
      gsap.fromTo(el.querySelector("img"), { scale: 1.16 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <article className="grid min-h-svh items-center gap-10 py-16 lg:grid-cols-12 lg:gap-0 lg:py-24">
      <div ref={ref} className={`relative h-[62svh] overflow-hidden lg:h-[84svh] lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
        <Image src={img} alt={alt} fill sizes="(min-width: 1024px) 58vw, 100vw" placeholder={blur ? "blur" : "empty"} blurDataURL={blur} className="graded object-cover" />
      </div>
      <div className={`px-[var(--gutter)] lg:col-span-4 lg:px-0 ${flip ? "lg:order-1 lg:col-start-1 lg:pl-[var(--gutter)]" : "lg:col-start-9 lg:pr-[var(--gutter)]"}`}>
        <p className="tabular eyebrow mb-5">Chapter 0{index}</p>
        <h2 className="display-md">{title}</h2>
        <p className="body-copy mt-6 text-[16.5px]">{body}</p>
        {note && <p className="mt-6 border-l border-[color:var(--line)] pl-4 font-display text-[19px] italic">{note}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </article>
  );
}
