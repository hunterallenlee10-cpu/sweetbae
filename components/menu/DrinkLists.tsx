import { beer, wine } from "@/content/menu";

/** Draft beer and wine by the glass, typographic lists. Maryland tags only where the menu states Maryland. */
export function BeerList({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="print-avoid">
      <H className="font-display text-[clamp(28px,3vw,40px)] font-light">
        {beer.title} <span className="em text-[color:var(--fg-muted)]">· {beer.subtitle}</span>
      </H>
      <ul className="mt-6 divide-y divide-[color:var(--line-soft)] border-y border-[color:var(--line-soft)]">
        {beer.items.map((b) => (
          <li key={b.id} className="py-5">
            <div className="flex items-baseline gap-4">
              <p className="font-display text-[22px] font-[360] leading-tight">{b.name}</p>
              {b.maryland && <span className="tag shrink-0 self-center">Maryland</span>}
              <span aria-hidden className="mb-[0.3em] h-px min-w-6 flex-1 bg-[color:var(--line)]" />
              {b.price !== null && <span className="tabular shrink-0 text-[17px] text-[color:var(--accent-text)]">${b.price}</span>}
            </div>
            <p className="mt-1.5 text-[14.5px] text-[color:var(--fg-muted)]">{b.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WineList({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const G = `h${headingLevel + 1}` as "h3" | "h4";
  return (
    <div>
      <H className="font-display text-[clamp(28px,3vw,40px)] font-light">
        Wine <span className="em text-[color:var(--fg-muted)]">by the glass</span>
      </H>
      <div className="mt-6 grid gap-x-14 gap-y-10 md:grid-cols-2">
        {wine.map((g) => (
          <div key={g.group} className="print-avoid">
            <G className="eyebrow mb-3">{g.group}</G>
            <ul className="divide-y divide-[color:var(--line-soft)] border-y border-[color:var(--line-soft)]">
              {g.items.map((w) => (
                <li key={w.id} className="flex items-baseline gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[20px] font-[360] leading-snug">{w.name}</p>
                    <p className="mt-0.5 text-[12px] uppercase tracking-[0.14em] text-[color:var(--fg-muted)] [font-variant:small-caps]">{w.origin}</p>
                  </div>
                  <span className="tabular shrink-0 text-[17px] text-[color:var(--accent-text)]">${w.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
