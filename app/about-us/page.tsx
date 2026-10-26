import type { Metadata } from "next";
import Image from "next/image";
import { MagnoliaIcon } from "@/components/brand/Logo";
import { SetTheme } from "@/components/shell/theme";
import { SplitReveal } from "@/components/ui/Reveal";
import { business, copy, micro, pages } from "@/content/site";
import { realBlur } from "@/lib/media";

export const metadata: Metadata = {
  title: pages.about.title,
  description: pages.about.description,
  alternates: { canonical: pages.about.path },
  openGraph: { title: pages.about.title, description: pages.about.description, url: pages.about.path },
};

export default function AboutPage() {
  // Part I: the DC restaurant. Part II: the flora and the bay. Split at the sentence boundary.
  const cut = copy.about.name.indexOf("local flora.") + "local flora.".length;
  const partOne = copy.about.name.slice(0, cut);
  const partTwo = copy.about.name.slice(cut).trim();
  const [p1a, p1b] = partOne.split("(Magnolia Kitchen & Bar)");
  const [p2a, p2b] = partTwo.split("Breton Bay");
  return (
    <>
      <SetTheme theme="day" heroTone="night" />
      <section data-theme="night" className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden bg-[color:var(--ink)] px-[var(--gutter)] pb-20 pt-[calc(var(--nav-h)+40px)] text-center text-[color:var(--cream)]">
        <MagnoliaIcon className="w-[min(70vw,520px)] text-[color:var(--brass)]" title="The Sweetbay magnolia" />
        <h1 className="display-xl mt-14 max-w-[9.4em]">
          About <span className="em">Sweetbay</span> Restaurant &amp; Bar
        </h1>
      </section>

      <section className="wrap py-24 lg:py-40">
        <SplitReveal className="lede mx-auto max-w-[17em] text-center text-[clamp(26px,3.2vw,48px)] leading-[1.25]">{copy.about.intro}</SplitReveal>
      </section>

      <section aria-labelledby="name-title" className="wrap pb-24 lg:pb-40">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">The Name</p>
            <h2 id="name-title" className="display-md">
              {copy.about.nameTitle}
            </h2>
          </div>
          <div className="space-y-10 lg:col-span-7 lg:col-start-6">
            <div>
              <p className="tabular eyebrow mb-3">I. The restaurant</p>
              <p className="lede">
                {p1a}(<span className="em text-[color:var(--patriot)]">Magnolia Kitchen &amp; Bar</span>){p1b}
              </p>
            </div>
            <div className="hairline" />
            <div>
              <p className="tabular eyebrow mb-3">II. The bay</p>
              <p className="lede">
                {p2a}
                <span className="em text-[color:var(--patriot)]">Breton Bay</span>
                {p2b}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[70svh] overflow-hidden">
        <Image
          src="/real/Sweetbay-outside-street-scene-1.jpg"
          alt="Sweetbay's storefront and covered patio on Washington Street in Leonardtown, with autumn trees."
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={realBlur("Sweetbay-outside-street-scene-1.jpg")}
          className="graded object-cover"
        />
      </section>

      <section className="wrap flex flex-col items-center py-24 text-center lg:py-32">
        <p className="eyebrow mb-4">{business.street}</p>
        <h2 className="display-lg">
          Come <span className="em">see us</span>
        </h2>
        <a href={business.reservations} target="_blank" rel="noopener" className="btn btn-solid mt-10">
          {micro.reserveTable}
        </a>
      </section>
    </>
  );
}
