import Image from "next/image";
import Link from "next/link";
import { business, copy, micro } from "@/content/site";
import { realBlur } from "@/lib/media";

const spaces = [
  {
    key: "dining",
    ...copy.homeSpaces.dining,
    img: "Sweetbay-6958-scaled.jpg",
    alt: "The main dining room with cream channel-tufted booths, navy chairs and pendant lights.",
  },
  {
    key: "bar",
    ...copy.homeSpaces.bar,
    img: "Sweetbay-6981-1-scaled.jpg",
    alt: "The long white-topped bar under a barrel-vaulted ceiling, with wooden stools and back-bar shelves.",
  },
  {
    key: "wine",
    ...copy.homeSpaces.wine,
    img: "wine-room-crop.jpg",
    alt: "The private wine room: a long candlelit table set for a party in front of a wall of wine bottles.",
  },
];

/** Dining Room, Bar and Wine Room as sticky panels that slide over each other. Pure CSS sticky stacking. */
export function ExploreStack() {
  return (
    <section aria-labelledby="explore-title" data-theme="night" className="relative bg-[color:var(--ink)] text-[color:var(--cream)]">
      <div className="wrap pb-10 pt-24 lg:pt-36">
        <h2 id="explore-title" className="display-lg">
          Explore the <span className="em">Restaurant</span>
        </h2>
      </div>
      {spaces.map((s, i) => (
        <article key={s.key} className="stack-panel h-svh overflow-hidden" style={{ zIndex: i + 1 }}>
          <div className="relative grid h-full bg-[color:var(--ink)] lg:grid-cols-12">
            <div className="relative h-[52svh] lg:col-span-7 lg:h-full">
              <Image
                src={`/real/${s.img}`}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                placeholder="blur"
                blurDataURL={realBlur(s.img)}
                className="graded object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-[var(--gutter)] py-10 lg:col-span-5 lg:px-14">
              <p className="tabular eyebrow mb-5 !text-[color:var(--brass)]">0{i + 1} / 03</p>
              <h3 className="display-md">{s.title}</h3>
              <p className="mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-[color:var(--cream)]/80">{s.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {s.key === "wine" && (
                  <a href={business.phoneHref} className="btn btn-cream">
                    {micro.callWineRoom}
                  </a>
                )}
                <Link href="/the-restaurant" className="btn border border-[color:var(--cream)]/35 hover:border-[color:var(--cream)]">
                  {micro.experienceLink}
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
