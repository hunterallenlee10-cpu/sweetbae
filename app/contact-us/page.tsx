import type { Metadata } from "next";
import { SetTheme } from "@/components/shell/theme";
import { Visit } from "@/components/visit/Visit";
import { business, pages } from "@/content/site";

export const metadata: Metadata = {
  title: pages.contact.title,
  description: pages.contact.description,
  alternates: { canonical: pages.contact.path },
  openGraph: { title: pages.contact.title, description: pages.contact.description, url: pages.contact.path },
};

export default function ContactPage() {
  return (
    <>
      <SetTheme theme="day" />
      <div className="pt-[var(--nav-h)]">
        <Visit headingLevel={1} mapSrc={business.mapEmbedClose} />
      </div>
      <section aria-labelledby="gift-h" className="wrap border-t border-[color:var(--line-soft)] py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="gift-h" className="font-display text-[30px] font-light">
            Gift <span className="em">Cards</span>
          </h2>
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
    </>
  );
}
