import { StatusChip } from "@/components/shell/StatusChip";
import { hoursTitle } from "@/content/hours";
import { business, copy, micro } from "@/content/site";
import { HoursTable } from "./HoursTable";
import { MapEmbed } from "./MapEmbed";

/** Address, live hours, status, phone, map, large-party policy. Used on Home and Contact. */
export function Visit({ headingLevel = 2, mapSrc, title = copy.contactTitle }: { headingLevel?: 1 | 2; mapSrc?: string; title?: string }) {
  const H = `h${headingLevel}` as "h1" | "h2";
  return (
    <section aria-labelledby="visit-title" className="wrap py-24 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Visit</p>
          <H id="visit-title" className="display-lg">
            {title}
          </H>
          <div className="mt-8">
            <StatusChip />
          </div>
          <address className="mt-10 not-italic">
            <p className="font-display text-[26px] font-light leading-snug">{business.name}</p>
            <p className="mt-2 text-[17px] text-[color:var(--fg-muted)]">
              {business.street}
              <br />
              {business.city}, {business.region} {business.postalCode}
            </p>
            <a href={business.phoneHref} className="tabular mt-4 inline-block text-[20px] link-underline">
              {business.phoneDisplay}
            </a>
          </address>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={business.reservations} target="_blank" rel="noopener" className="btn btn-solid">
              {micro.reserveTable}
            </a>
            <a href={business.mapLink} target="_blank" rel="noopener" className="btn btn-ghost">
              {micro.directions}
            </a>
          </div>
          <p className="body-copy mt-10 border-l border-[color:var(--line)] pl-5 text-[15px]">{business.largePartyPolicy}</p>
        </div>
        <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
          <div>
            <h3 className="eyebrow mb-4">{hoursTitle}</h3>
            <HoursTable />
          </div>
          <MapEmbed src={mapSrc} className="aspect-[4/3] w-full" />
        </div>
      </div>
    </section>
  );
}
