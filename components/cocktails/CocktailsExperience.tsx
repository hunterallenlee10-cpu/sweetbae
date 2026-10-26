"use client";

import dynamic from "next/dynamic";

import { useCallback, useEffect, useRef, useState } from "react";
import { BeerList, WineList } from "@/components/menu/DrinkLists";
import { fromCocktail } from "@/components/menu/items";
import { CategoryOpener } from "@/components/menu/CategoryOpener";
import { Loop } from "@/components/ui/Loop";
import { MenuPicture } from "@/components/ui/MenuPicture";
import { SplitReveal } from "@/components/ui/Reveal";
import { cocktails, flightNote, formatPrice } from "@/content/menu";
import { concept, copy, micro, pages } from "@/content/site";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

// The sheet (and Motion drag code) loads on first open, keeping it off the critical path.
const DishSheet = dynamic(() => import("@/components/menu/DishSheet").then((m) => m.DishSheet), { ssr: false });

const rows = cocktails.map(fromCocktail);

/** Signature cocktails: pinned horizontal gallery on desktop, native swipe on mobile. Always Night. */
export function CocktailsExperience() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [sheet, setSheet] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current!,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const i = rows.findIndex((r) => r.id === id);
    if (i >= 0) setSheet(i);
  }, []);

  const open = (i: number) => {
    setSheet(i);
    window.history.replaceState(window.history.state, "", `#${rows[i].id}`);
  };
  const close = useCallback(() => {
    setSheet(null);
    window.history.replaceState(window.history.state, "", location.pathname);
  }, []);
  const setIndex = useCallback((i: number) => {
    setSheet(i);
    window.history.replaceState(window.history.state, "", `#${rows[i].id}`);
  }, []);

  return (
    <div>
      <header className="wrap grid gap-10 pb-12 pt-[calc(var(--nav-h)+56px)] lg:grid-cols-12 lg:pb-10 lg:pt-[calc(var(--nav-h)+72px)]">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">Sweetbay Restaurant &amp; Bar</p>
          <h1 className="display-xl">
            Signature <span className="em">Cocktails</span> Menu
          </h1>
        </div>
        <div className="lg:col-span-5 lg:self-end">
          <SplitReveal className="lede text-[clamp(17px,1.35vw,21px)] leading-[1.5] text-[color:var(--fg-muted)]">{copy.cocktailsIntro}</SplitReveal>
        </div>
      </header>

      <div ref={pinRef} className="relative overflow-hidden lg:flex lg:h-svh lg:items-center">
        <ul
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6 lg:gap-8 lg:overflow-visible lg:pb-0 lg:pr-[20vw]"
          aria-label={pages.cocktails.h1}
        >
          {rows.map((r, i) => (
            <li key={r.id} id={r.id} className="w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-[min(30vw,420px)]">
              <button type="button" aria-haspopup="dialog" onClick={() => open(i)} className="group block w-full text-left">
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--bg-raised)] transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-2">
                  <MenuPicture slug={r.image} alt={r.alt} sizes="(min-width: 1024px) 30vw, 78vw" />
                  {r.loop && <Loop slug={r.image} />}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(242,234,219,0.16)_50%,transparent_65%)] transition-transform duration-1000 ease-[var(--ease-out)] group-hover:translate-x-full"
                  />
                </div>
                <div className="mt-5 flex items-baseline gap-4">
                  <h2 className="font-display text-[26px] font-[360] leading-tight">{r.name}</h2>
                  <span aria-hidden className="mb-[0.35em] h-px flex-1 bg-[color:var(--line)]" />
                  <span className="tabular text-[17px] text-[color:var(--accent-text)]">{formatPrice(r.price)}</span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Ingredients">
                  {r.description.split(", ").map((ing) => (
                    <li key={ing} className="rounded-full border border-[color:var(--line-soft)] px-2.5 py-1 text-[12px] text-[color:var(--fg-muted)]">
                      {ing}
                    </li>
                  ))}
                </ul>
                <p className="sr-only">{r.description}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="wrap pb-6 pt-10 font-display text-[22px] italic text-[color:var(--fg-muted)] lg:pt-16">{flightNote}</p>

      <CategoryOpener title="Wine & Beer" banner="wine-and-beer" alt="Red, white and sparkling wine glasses on the black marble bar." />
      <div className="wrap grid gap-16 py-16 lg:grid-cols-12 lg:py-24">
        <div id="draft" className="lg:col-span-5">
          <BeerList headingLevel={2} />
        </div>
        <div id="wine" className="lg:col-span-7">
          <WineList headingLevel={2} />
        </div>
      </div>
      {concept && <p className="wrap pb-12 text-[12.5px] text-[color:var(--fg-faint)]">{micro.conceptPhoto}</p>}

      <DishSheet items={rows} index={sheet} category="Signature Cocktails" onClose={close} onIndex={setIndex} />
    </div>
  );
}
