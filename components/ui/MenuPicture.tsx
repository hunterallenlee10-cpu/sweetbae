import { MagnoliaIcon } from "@/components/brand/Logo";
import { menuImage } from "@/lib/media";

type Props = {
  slug: string;
  alt: string;
  sizes: string;
  wide?: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Fill the parent (absolute, object-cover). */
  fill?: boolean;
};

/**
 * Pre-processed AVIF/WebP responsive image from /public/menu (see scripts/process-images.mjs),
 * with a blur placeholder. Falls back to a quiet magnolia plate when an image is missing.
 */
export function MenuPicture({ slug, alt, sizes, wide, className = "", imgClassName = "", priority, fill = true }: Props) {
  const img = menuImage(slug, wide) ?? (wide ? menuImage(slug) : null);
  if (!img) {
    return (
      <div className={`${fill ? "absolute inset-0" : ""} grid place-items-center bg-[color:var(--bg-raised)] ${className}`} role="img" aria-label={alt}>
        <MagnoliaIcon className="w-1/3 text-[color:var(--fg-faint)] opacity-40" />
      </div>
    );
  }
  return (
    <picture className={`${fill ? "absolute inset-0" : "block"} ${className}`}>
      <source type="image/avif" srcSet={img.avif} sizes={sizes} />
      <source type="image/webp" srcSet={img.webp} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={alt}
        width={img.w}
        height={img.h}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`graded h-full w-full object-cover ${imgClassName}`}
        style={{ backgroundImage: `url(${img.blur})`, backgroundSize: "cover" }}
      />
    </picture>
  );
}
