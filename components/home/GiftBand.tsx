import { MagnoliaIcon } from "@/components/brand/Logo";
import { business, micro } from "@/content/site";

export function GiftBand() {
  return (
    <section aria-labelledby="gift-title" className="relative overflow-hidden border-y border-[color:var(--line-soft)] bg-[color:var(--bg-raised)]">
      <MagnoliaIcon className="pointer-events-none absolute -left-20 top-1/2 w-[520px] max-w-none -translate-y-1/2 text-[color:var(--accent-text)] opacity-[0.08]" />
      <div className="wrap relative flex flex-col gap-8 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div>
          <p className="eyebrow mb-3">Gift Cards</p>
          <h2 id="gift-title" className="display-lg">
            Give <span className="em">Sweetbay</span>
          </h2>
          <p className="body-copy mt-4">{micro.giveBody}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={business.giftCards.purchase.href} target="_blank" rel="noopener" className="btn btn-solid">
            {business.giftCards.purchase.label}
          </a>
          <a href={business.giftCards.balance.href} target="_blank" rel="noopener" className="btn btn-ghost">
            {business.giftCards.balance.label}
          </a>
        </div>
      </div>
    </section>
  );
}
