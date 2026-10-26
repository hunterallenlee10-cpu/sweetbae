import { MenuPicture } from "@/components/ui/MenuPicture";
import { SplitReveal } from "@/components/ui/Reveal";

/** Full-bleed category banner with a giant Fraunces italic title. */
export function CategoryOpener({ title, banner, alt, eyebrow }: { title: string; banner?: string; alt: string; eyebrow?: string }) {
  return (
    <div className="relative isolate flex h-[56svh] min-h-[360px] items-end overflow-hidden lg:h-[72svh]">
      {banner && <MenuPicture slug={banner} alt={alt} sizes="100vw" className="-z-10" />}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,17,23,0.1)_30%,rgba(13,17,23,0.78)_100%)]" />
      <div className="wrap pb-10 text-[color:var(--cream)] lg:pb-14">
        {eyebrow && <p className="eyebrow mb-3 !text-[color:var(--brass)]">{eyebrow}</p>}
        <SplitReveal as="h2" className="display-xl em">
          {title}
        </SplitReveal>
      </div>
    </div>
  );
}
