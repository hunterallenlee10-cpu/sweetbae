"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { copy } from "@/content/site";
import { realBlur } from "@/lib/media";

const panels = [
  {
    key: "dinner",
    theme: "night" as const,
    title: "Dinner",
    body: copy.dinnerCard,
    href: "/menus/dinner",
    cta: "Dinner Menu",
    img: "/real/Sweetbay-7544-upscaled.jpg",
    blurKey: "Sweetbay-7544-upscaled.jpg",
    alt: "A Sweetbay seafood dish from above: shrimp, mussels and clams in a black pan with toasted bread and a charred lime.",
  },
  {
    key: "lunch",
    theme: "day" as const,
    title: "Lunch",
    body: copy.lunchCard,
    href: "/menus/lunch",
    cta: "Lunch Menu",
    img: "/real/salad-scaled.jpg",
    blurKey: "salad-scaled.jpg",
    alt: "A forkful of Sweetbay salad with greens, grilled corn and pickled onion.",
  },
];

/** Dinner and Lunch panels. Hovering a panel previews its mood: Night for Dinner, Day for Lunch. */
export function MenuPanels() {
  const [hover, setHover] = useState<"night" | "day" | null>(null);
  return (
    <section aria-labelledby="menus-title" data-theme={hover ?? undefined} className="theme-surface bg-[color:var(--bg)] py-24 text-[color:var(--fg)] lg:py-36">
      <div className="wrap">
        <h2 id="menus-title" className="display-lg mb-14">
          View the <span className="em">Menu</span>
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {panels.map((p) => (
            <Link
              key={p.key}
              href={p.href}
              onMouseEnter={() => setHover(p.theme)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.theme)}
              onBlur={() => setHover(null)}
              className="group relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden p-8 text-[color:var(--cream)] lg:min-h-[720px] lg:p-12"
            >
              <Image
                src={p.img}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder={realBlur(p.blurKey) ? "blur" : "empty"}
                blurDataURL={realBlur(p.blurKey)}
                className="-z-10 object-cover transition-transform duration-[1.6s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,17,23,0)_25%,rgba(13,17,23,0.88)_100%)]" />
              <h3 className="display-lg em">{p.title}</h3>
              <p className="mt-5 max-w-[48ch] text-[15.5px] leading-relaxed text-[color:var(--cream)]/85">{p.body}</p>
              <span className="mt-8 inline-flex items-center gap-3 text-[15px]">
                <span className="link-underline group-hover:bg-[length:100%_1px]">{p.cta}</span>
                <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  <path d="M11 1l5 5-5 5M16 6H1" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
