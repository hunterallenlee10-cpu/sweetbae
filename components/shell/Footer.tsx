import Link from "next/link";
import { Logo, MagnoliaIcon } from "@/components/brand/Logo";
import { hours, hoursTitle } from "@/content/hours";
import { business, concept, micro, nav, social } from "@/content/site";

export function Footer() {
  return (
    <footer className="no-print relative overflow-hidden border-t border-[color:var(--line-soft)] bg-[color:var(--bg-sunk)] pb-10 pt-20">
      <MagnoliaIcon className="pointer-events-none absolute -right-24 bottom-0 w-[720px] max-w-none text-[color:var(--fg)] opacity-[0.035]" />
      <div className="wrap relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="Sweetbay Restaurant & Bar, home">
            <Logo className="h-16 w-auto" />
          </Link>
          <address className="mt-8 not-italic leading-relaxed text-[color:var(--fg-muted)]">
            {business.name}
            <br />
            {business.street}
            <br />
            {business.city}, {business.region} {business.postalCode}
          </address>
          <a href={business.phoneHref} className="tabular mt-3 inline-block text-[color:var(--fg)] link-underline">
            {business.phoneDisplay}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={business.reservations} target="_blank" rel="noopener" className="btn btn-solid">
              {micro.reserveTable}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
          <div>
            <p className="eyebrow mb-4">Menus</p>
            <ul className="space-y-2.5">
              {nav.menus.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="link-underline">
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Sweetbay</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="link-underline">
                  Home
                </Link>
              </li>
              {nav.links.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="link-underline">
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Gift Cards</p>
            <ul className="space-y-2.5">
              {[business.giftCards.purchase, business.giftCards.balance].map((g) => (
                <li key={g.href}>
                  <a href={g.href} target="_blank" rel="noopener" className="link-underline">
                    {g.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-4 mt-8">Follow</p>
            <ul className="space-y-2.5">
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener" className="link-underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow mb-4">{hoursTitle}</p>
          <dl className="tabular space-y-1.5 text-[14.5px]">
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4">
                <dt className="text-[color:var(--fg-muted)]">{h.day}</dt>
                <dd>{h.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="wrap relative mt-16 flex flex-col gap-3 border-t border-[color:var(--line-soft)] pt-6 text-[13px] text-[color:var(--fg-faint)] sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {business.name}. {business.street}, {business.city}, {business.region}
        </p>
        {concept && <p>{micro.conceptFooter}</p>}
      </div>
    </footer>
  );
}
