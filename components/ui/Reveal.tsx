"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

/** Line-by-line SplitText reveal on scroll. Text stays plain and readable without JS. */
export function SplitReveal({
  as: Tag = "p",
  children,
  className = "",
  type = "lines",
  scrub = false,
}: {
  as?: "p" | "h1" | "h2" | "h3" | "span" | "blockquote";
  children: React.ReactNode;
  className?: string;
  type?: "lines" | "words";
  scrub?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    // Text already on screen at load stays put: hiding it would delay the first meaningful paint.
    if (!scrub && el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    const { gsap, SplitText } = registerGsap();
    let split: InstanceType<typeof SplitText> | undefined;
    let tween: gsap.core.Tween | undefined;
    let io: IntersectionObserver | undefined;
    let cancelled = false;
    // Split after web fonts load so line breaks match the final layout.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = SplitText.create(el, { type: type === "lines" ? "lines" : "words,lines", mask: "lines", linesClass: "split-line", aria: "none" });
      const targets = type === "lines" ? split.lines : split.words;
      const vars = { yPercent: 110, opacity: 0, duration: 1.1, ease: "expo.out", stagger: type === "lines" ? 0.09 : 0.03 };
      if (scrub) {
        tween = gsap.from(targets, { ...vars, scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: 0.6 } });
        return;
      }
      tween = gsap.from(targets, { ...vars, paused: true });
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            tween?.play();
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);
    });
    return () => {
      cancelled = true;
      io?.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.revert();
      split?.revert();
    };
  }, [type, scrub]);
  // @ts-expect-error polymorphic ref
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

/** Simple fade-up on enter, CSS-driven. */
export function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.dataset.in = "1";
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = "1";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
