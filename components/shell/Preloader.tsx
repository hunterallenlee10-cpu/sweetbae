import { ICON_PATH, ICON_VIEWBOX } from "@/components/brand/paths";

/**
 * First visit only (the head script adds .no-preloader on repeat visits and under reduced motion).
 * Pure CSS: the magnolia strokes draw in cream, a brass counter runs 0 to 100, then a curtain wipe.
 * Total 1.4s. Hidden without JS via the same CSS timeline, so it can never block the page.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden>
      <div className="flex flex-col items-center gap-8">
        <svg viewBox={ICON_VIEWBOX} className="preloader-mark w-[min(46vw,240px)]">
          <path d={ICON_PATH} pathLength={1} />
        </svg>
        <span className="preloader-count tabular font-mono text-[12px] tracking-[0.3em] text-[color:var(--brass)]" />
      </div>
      <style>{`
        @property --pc { syntax: '<integer>'; initial-value: 0; inherits: false; }
        .preloader { animation: preloader-out .45s var(--ease-in-out) .95s forwards; }
        .preloader-mark path { fill: var(--cream); fill-opacity: 0; stroke: var(--cream); stroke-width: 1.2; stroke-dasharray: 1; stroke-dashoffset: 1;
          animation: pl-draw .8s var(--ease-in-out) forwards, pl-fill .3s ease .65s forwards; }
        .preloader-count { --pc: 0; counter-reset: pc var(--pc); animation: pl-count .9s linear forwards; }
        .preloader-count::after { content: counter(pc, decimal-leading-zero); }
        @keyframes pl-draw { to { stroke-dashoffset: 0; } }
        @keyframes pl-fill { to { fill-opacity: 1; } }
        @keyframes pl-count { to { --pc: 100; } }
      `}</style>
    </div>
  );
}
