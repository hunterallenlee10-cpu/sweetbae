"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MagnoliaDivider } from "@/components/brand/Logo";
import { SplitReveal } from "@/components/ui/Reveal";
import { copy } from "@/content/site";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";
import { realBlur } from "@/lib/media";

export function Welcome() {
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !imgRef.current) return;
    const { gsap } = registerGsap();
    const t = gsap.fromTo(imgRef.current.querySelector("img"), { yPercent: -8 }, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: imgRef.current, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);
  return (
    <section aria-labelledby="welcome-title" className="wrap py-24 lg:py-40">
      <MagnoliaDivider className="mb-16 lg:mb-24" />
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p id="welcome-title" className="eyebrow mb-6">
            Welcome to Sweetbay
          </p>
          <SplitReveal className="lede max-w-[34ch] text-[clamp(24px,2.5vw,38px)]">{copy.intro}</SplitReveal>
        </div>
        <div ref={imgRef} className="relative aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-9">
          <Image
            src="/real/Sweetbay-6958-scaled.jpg"
            alt="Sweetbay's main dining room: cream banquettes, navy velvet chairs and tall windows onto Washington Street."
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            placeholder="blur"
            blurDataURL={realBlur("Sweetbay-6958-scaled.jpg")}
            className="graded scale-[1.18] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
