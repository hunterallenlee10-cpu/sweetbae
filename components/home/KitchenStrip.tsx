import Link from "next/link";
import { Loop } from "@/components/ui/Loop";
import { MenuPicture } from "@/components/ui/MenuPicture";
import { findCocktail, findDish, formatPrice, kitchenStrip } from "@/content/menu";

/** "From the Kitchen": the six featured plates and pours, playing their living loops. Each deep-links to its dish sheet. */
export function KitchenStrip() {
  const items = kitchenStrip.map((k) => {
    if (k.menu === "cocktails") {
      const c = findCocktail(k.id)!;
      return { id: c.id, name: c.name, price: `$${c.price}`, alt: c.alt, href: `/menus/signature-cocktails#${c.id}`, label: "Cocktail" };
    }
    const d = findDish(k.id)!;
    return { id: d.id, name: d.name, price: formatPrice(d.price), alt: d.alt, href: `/menus/${k.menu}#${d.id}`, label: "Dinner" };
  });
  return (
    <section aria-labelledby="kitchen-title" className="py-20 lg:py-28">
      <div className="wrap mb-10 flex items-end justify-between gap-6">
        <h2 id="kitchen-title" className="display-lg">
          From the <span className="em">Kitchen</span>
        </h2>
        <Link href="/menus/dinner" className="link-underline hidden text-[15px] sm:inline">
          See the full menu
        </Link>
      </div>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 lg:gap-7">
        {items.map((it) => (
          <li key={it.id} className="w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw]">
            <Link href={it.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--bg-raised)]">
                <MenuPicture slug={it.id} alt={it.alt} sizes="(min-width: 1024px) 26vw, 72vw" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out)] group-hover:scale-[1.04]" />
                <Loop slug={it.id} />
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <h3 className="font-display text-[22px] font-[360]">{it.name}</h3>
                <span aria-hidden className="mb-[0.35em] h-px flex-1 bg-[color:var(--line)]" />
                <span className="tabular text-[15px] text-[color:var(--accent-text)]">{it.price}</span>
              </div>
              <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[color:var(--fg-faint)]">{it.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
