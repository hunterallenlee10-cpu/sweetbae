import type { Metadata } from "next";
import { Chapter } from "@/components/pages/Chapter";
import { SetTheme } from "@/components/shell/theme";
import { business, copy, micro, pages } from "@/content/site";
import { realBlur } from "@/lib/media";

export const metadata: Metadata = {
  title: pages.restaurant.title,
  description: pages.restaurant.description,
  alternates: { canonical: pages.restaurant.path },
  openGraph: { title: pages.restaurant.title, description: pages.restaurant.description, url: pages.restaurant.path },
};

export default function RestaurantPage() {
  const e = copy.experience;
  return (
    <>
      <SetTheme theme="night" />
      <header className="wrap pb-6 pt-[calc(var(--nav-h)+56px)] lg:pt-[calc(var(--nav-h)+96px)]">
        <p className="eyebrow mb-4">Experience</p>
        <h1 className="display-xl max-w-[7em]">
          The <span className="em">Restaurant</span>
        </h1>
        <p className="body-copy mt-6">
          {e.dining.title}, {e.bar.title.replace("The ", "the ")} and {e.wine.title.replace("The ", "the ")}.
        </p>
      </header>
      <Chapter
        priority
        index={1}
        title={e.dining.title}
        body={e.dining.body}
        img="/real/Sweetbay-7090-scaled.jpg"
        blur={realBlur("Sweetbay-7090-scaled.jpg")}
        alt="The main dining room: cream booths, navy velvet chairs and local artwork on the walls."
      >
        <a href={business.reservations} target="_blank" rel="noopener" className="btn btn-solid">
          {micro.reserveTable}
        </a>
      </Chapter>
      <Chapter
        index={2}
        flip
        title={e.bar.title}
        body={e.bar.body}
        note={e.bar.note}
        img="/real/Sweetbay-6981-1-scaled.jpg"
        blur={realBlur("Sweetbay-6981-1-scaled.jpg")}
        alt="The bar: a long white counter with wooden stools under a barrel-vaulted ceiling."
      />
      <Chapter
        index={3}
        title={e.wine.title}
        body={e.wine.body}
        img="/real/wine-room-crop.jpg"
        blur={realBlur("wine-room-crop.jpg")}
        alt="The private wine room: a candlelit table for a party in front of a wall of wine."
      >
        <a href={business.phoneHref} className="btn btn-solid">
          {micro.callDetails} · {business.phoneDisplay}
        </a>
      </Chapter>
    </>
  );
}
