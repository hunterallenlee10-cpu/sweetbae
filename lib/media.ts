import media from "@/content/media.json";

type ImgMeta = { w: number; h: number; widths: number[]; blur: string };
const images = (media as { images: Record<string, ImgMeta> }).images;
const loops = (media as { loops: Record<string, { bytes: number }> }).loops;
const real = (media as { real: Record<string, { w: number; h: number; blur: string }> }).real;

export type MenuImage = ImgMeta & { slug: string; avif: string; webp: string; src: string };

export function menuImage(slug: string, wide = false): MenuImage | null {
  const key = wide ? `${slug}--wide` : slug;
  const m = images[key];
  if (!m) return null;
  const set = (ext: string) => m.widths.map((w) => `/menu/${key}-${w}.${ext} ${w}w`).join(", ");
  const mid = m.widths.find((w) => w >= 960) ?? m.widths[m.widths.length - 1];
  return { ...m, slug: key, avif: set("avif"), webp: set("webp"), src: `/menu/${key}-${mid}.webp` };
}

export function hasLoop(slug: string) {
  return Boolean(loops[slug]);
}

export function realBlur(file: string) {
  return real[file]?.blur;
}
