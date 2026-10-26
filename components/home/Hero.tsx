"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import manifest from "@/public/frames/manifest.json";
import { business, concept, copy, micro } from "@/content/site";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";

/*
 * Drone flight hero. A sticky canvas draws one WebP frame per scroll position.
 * - LCP is the storefront poster (<picture>), painted instantly.
 * - Frames load progressively: every 16th first, then fill in. The nearest loaded frame is drawn.
 * - A 2 second idle drift plays through the first ~40 frames before any scroll.
 * - Under reduced motion (or without JS) only the poster, H1 and CTAs render.
 * TODO(hunter): concept footage. Replace with Option A drone or Option B Earth Studio footage before launch.
 */

type Set = { dir: "desktop" | "mobile"; count: number; stride: number };

const CAPTIONS = ["Breton Bay", "Leonardtown, Maryland", "Washington Street"];
const intro = copy.intro.split(". ")[0] + ".";

function frameUrl(set: Set, i: number) {
  return `/frames/${set.dir}/${String(i + 1).padStart(4, "0")}.webp`;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(false);
  const [canvasOn, setCanvasOn] = useState(false);
  const [beat, setBeat] = useState(-1);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setMotion(true);
  }, []);

  useEffect(() => {
    if (!motion) return;
    let teardown: (() => void) | undefined;
    let cancelled = false;
    // Start after the page has loaded and gone idle so the frame engine never competes with first paint.
    const begin = () => {
      if (cancelled) return;
      teardown = startEngine();
    };
    const schedule = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(begin, { timeout: 1500 });
      else window.setTimeout(begin, 300);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      teardown?.();
    };
  }, [motion]);

  function startEngine() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const portrait = window.innerWidth < 768 || window.innerHeight > window.innerWidth * 1.15;
    const set: Set = portrait
      ? { dir: "mobile", count: manifest.mobile.count, stride: 2 }
      : { dir: "desktop", count: manifest.desktop.count, stride: 1 };
    const indices = Array.from({ length: Math.ceil(set.count / set.stride) }, (_, k) => k * set.stride);
    const N = indices.length;
    const imgs: (HTMLImageElement | null)[] = new Array(N).fill(null);
    let disposed = false;
    let drawn = -1;
    let current = 0;
    let target = 0;
    let idle = 0; // 0..1 idle drift
    let progress = 0;
    const IDLE_FRAMES = Math.min(40 / set.stride, N - 1);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawn = -1;
    };
    resize();
    window.addEventListener("resize", resize);

    const nearestLoaded = (i: number) => {
      if (imgs[i]) return i;
      for (let d = 1; d < N; d++) {
        if (i - d >= 0 && imgs[i - d]) return i - d;
        if (i + d < N && imgs[i + d]) return i + d;
      }
      return -1;
    };

    const draw = (i: number) => {
      const img = imgs[i];
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawn = i;
    };

    // Progressive loading order: every 16th, 8th, 4th, 2nd, then the rest. First 40 frames early for the idle drift.
    const order: number[] = [];
    const seen = new Set<number>();
    const push = (k: number) => {
      if (k < N && !seen.has(k)) {
        seen.add(k);
        order.push(k);
      }
    };
    push(0);
    for (let k = 0; k <= IDLE_FRAMES; k += 4) push(k);
    for (const step of [16, 8, 4, 2, 1]) for (let k = 0; k < N; k += step) push(k);

    let loadedFirst = false;
    let cursor = 0;
    // Phase 1: first frame, the idle-drift frames and every 16th. Phase 2 (the rest) waits for the first scroll,
    // so a visitor who never scrolls never downloads the full sequence.
    const phase1 = order.findIndex((k, idx) => idx > 0 && k % 16 !== 0 && k > IDLE_FRAMES) ;
    let limit = phase1 > 0 ? phase1 : order.length;
    let active = 0;
    const release = () => {
      if (limit === order.length) return;
      limit = order.length;
      for (let p = active; p < 4; p++) loadNext();
    };
    const onFirstScroll = () => release();
    window.addEventListener("scroll", onFirstScroll, { once: true, passive: true });
    const loadNext = () => {
      if (disposed || cursor >= limit) return;
      active++;
      const k = order[cursor++];
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(set, indices[k]);
      img.onload = () => {
        if (disposed) return;
        imgs[k] = img;
        active--;
        if (!loadedFirst && k === 0) {
          loadedFirst = true;
          draw(0);
          setCanvasOn(true);
          startIdle();
        }
        loadNext();
      };
      img.onerror = () => {
        active--;
        loadNext();
      };
    };
    for (let p = 0; p < 4; p++) loadNext();

    let idleStart = 0;
    const startIdle = () => {
      idleStart = performance.now();
    };

    const { ScrollTrigger } = registerGsap();
    const st = ScrollTrigger.create({
      trigger: sectionRef.current!,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress = self.progress;
      },
    });

    let raf = 0;
    let lastBeat = -2;
    const tick = (now: number) => {
      if (idleStart) idle = Math.min(1, (now - idleStart) / 2000);
      const eased = 1 - Math.pow(1 - idle, 3);
      const base = IDLE_FRAMES * eased;
      target = base + (N - 1 - base) * progress;
      current += (target - current) * 0.14;
      const i = nearestLoaded(Math.round(current));
      if (i >= 0 && i !== drawn) draw(i);
      if (progressRef.current) progressRef.current.style.transform = `scaleY(${progress})`;
      const beats = manifest.beats;
      const b = !loadedFirst ? -1 : progress >= beats[3] ? 3 : progress >= beats[2] ? 2 : progress >= beats[1] ? 1 : 0;
      if (b !== lastBeat) {
        lastBeat = b;
        setBeat(b);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      st.kill();
      window.removeEventListener("scroll", onFirstScroll);
      window.removeEventListener("resize", resize);
    };
  }

  const common = { alt: "Sweetbay Restaurant & Bar on Washington Street, Leonardtown, at dusk", sizes: "100vw", priority: true, quality: 72 };
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: "/hero/storefront-dusk.jpg", width: 2752, height: 1536 });
  const {
    props: { srcSet: mobileSet, ...poster },
  } = getImageProps({ ...common, src: "/hero/storefront-dusk-portrait.jpg", width: 1536, height: 2752 });

  const final = !motion || beat === 3;

  return (
    <section ref={sectionRef} data-theme="night" aria-label="Welcome to Sweetbay" className={`relative ${motion ? "h-[350vh]" : "h-svh"}`}>
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[color:var(--ink)] text-[color:var(--cream)]">
        <picture>
          <source media="(max-width: 767px), (orientation: portrait)" srcSet={mobileSet} />
          <source srcSet={desktopSet} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...poster} alt={common.alt} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${canvasOn ? "opacity-0" : "opacity-100"}`} />
        </picture>
        <canvas
          ref={canvasRef}
          aria-hidden
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${canvasOn ? "opacity-100" : "opacity-0"}`}
        />
        {/* Readability scrims */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,17,23,0.55)_0%,rgba(13,17,23,0)_28%,rgba(13,17,23,0)_50%,rgba(13,17,23,0.82)_100%)]" />

        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(13,17,23,0.78)_0%,rgba(13,17,23,0.45)_42%,rgba(13,17,23,0)_70%)] transition-opacity duration-1000 max-lg:bg-[linear-gradient(0deg,rgba(13,17,23,0.85)_0%,rgba(13,17,23,0.55)_45%,rgba(13,17,23,0)_75%)] ${final ? "opacity-100" : "opacity-0"}`}
        />
        {/* Beat captions (HTML, never baked into frames) */}
        {motion &&
          CAPTIONS.map((c, i) => (
            <p
              key={c}
              aria-hidden={beat !== i}
              className={`display-lg em absolute inset-x-0 bottom-[22vh] px-[var(--gutter)] text-center max-sm:text-[clamp(32px,9.5vw,44px)] transition-all duration-1000 ease-[var(--ease-out)] ${
                beat === i ? "opacity-100 blur-0" : "pointer-events-none translate-y-6 opacity-0 blur-md"
              }`}
            >
              {c}
            </p>
          ))}

        {/* Beat 4: arrival */}
        <div className="wrap absolute inset-x-0 bottom-0 pb-[calc(var(--bar-h)+40px)] lg:pb-20">
          <div className={`max-w-[1100px] transition-all duration-1000 ease-[var(--ease-out)] ${final ? "opacity-100 blur-0" : "translate-y-10 opacity-0 blur-md"}`}>
            <p className="eyebrow mb-5 !text-[color:var(--brass)]">Sweetbay Restaurant &amp; Bar</p>
            <h1 className="display-xl max-w-[7.6em]">
              Discover <span className="em">Modern American</span> Dining in Leonardtown, MD
            </h1>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-[color:var(--cream)]/85">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.reservations} target="_blank" rel="noopener" className="btn btn-cream">
                <span aria-hidden>{micro.reserveTable}</span>
                <span className="sr-only">{business.reservationsLabel}</span>
              </a>
              <Link href="/menus/dinner" className="btn border border-[color:var(--cream)]/40 text-[color:var(--cream)] hover:border-[color:var(--cream)]">
                {micro.viewMenu}
              </Link>
            </div>
          </div>
        </div>

        {motion && (
          <>
            <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-[color:var(--cream)]/10">
              <div ref={progressRef} className="h-full w-full origin-top scale-y-0 bg-[color:var(--brass)]" />
            </div>
            <p
              aria-hidden
              className={`absolute bottom-[calc(var(--bar-h)+18px)] left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[color:var(--cream)]/70 transition-opacity duration-500 lg:bottom-8 ${beat <= 0 ? "opacity-100" : "opacity-0"}`}
            >
              Scroll to arrive
            </p>
          </>
        )}
        {concept && (
          <p className="absolute bottom-2 right-3 text-[10px] text-[color:var(--cream)]/45 max-lg:bottom-[calc(var(--bar-h)+6px)]">{micro.conceptFootage}</p>
        )}
      </div>
    </section>
  );
}
