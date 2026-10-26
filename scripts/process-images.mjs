// Processes Higgsfield outputs and real photos into responsive AVIF/WebP sets, blur placeholders and loop MP4s.
// Input:  higgsfield/raw/<slug>.(png|jpg|jpeg|webp)       -> public/menu/<slug>-<w>.(avif|webp)
//         higgsfield/raw/<slug>--wide.(png|...)            -> public/menu/<slug>--wide-<w>.(avif|webp)
//         higgsfield/raw/loops/<slug>.mp4                  -> public/loops/<slug>.mp4 (+ .jpg poster)
//         public/real/*.jpg                                -> blur placeholders only (served via next/image)
// Output manifest: content/media.json
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const RAW = path.join(root, "higgsfield/raw");
const OUT = path.join(root, "public/menu");
const LOOPS_IN = path.join(RAW, "loops");
const LOOPS_OUT = path.join(root, "public/loops");
const REAL = path.join(root, "public/real");
const WIDTHS = [640, 960, 1440, 2048];
const force = process.argv.includes("--force");

mkdirSync(OUT, { recursive: true });
mkdirSync(LOOPS_OUT, { recursive: true });

const manifestPath = path.join(root, "content/media.json");
const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : { images: {}, loops: {}, real: {} };

async function blur(file) {
  const buf = await sharp(file).resize(20).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

const isImg = (f) => /\.(png|jpe?g|webp)$/i.test(f);

for (const f of existsSync(RAW) ? readdirSync(RAW).filter(isImg) : []) {
  const slug = f.replace(/\.(png|jpe?g|webp)$/i, "");
  const src = path.join(RAW, f);
  const meta = await sharp(src).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.length || widths[widths.length - 1] < meta.width) widths.push(Math.min(meta.width, 2048));
  const uniq = [...new Set(widths)];
  const prev = manifest.images[slug];
  const srcMtime = statSync(src).mtimeMs;
  if (!force && prev && prev.mtime === srcMtime) continue;
  await Promise.all(
    uniq.map(async (w) => {
      const base = path.join(OUT, `${slug}-${w}`);
      if (!force && existsSync(`${base}.avif`) && existsSync(`${base}.webp`) && statSync(`${base}.avif`).mtimeMs > srcMtime) return;
      const img = sharp(src).resize({ width: w, withoutEnlargement: true });
      await img.clone().avif({ quality: 52, effort: 3 }).toFile(`${base}.avif`);
      await img.clone().webp({ quality: 72 }).toFile(`${base}.webp`);
    }),
  );
  manifest.images[slug] = {
    w: meta.width,
    h: meta.height,
    widths: uniq,
    blur: await blur(src),
    mtime: srcMtime,
  };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
  console.log("image", slug, uniq.join(","));
}

// Loops: H.264, silent, faststart, <1.5 MB target. Poster = first frame.
for (const f of existsSync(LOOPS_IN) ? readdirSync(LOOPS_IN).filter((x) => x.endsWith(".mp4")) : []) {
  const slug = f.replace(/\.mp4$/, "");
  const src = path.join(LOOPS_IN, f);
  const out = path.join(LOOPS_OUT, `${slug}.mp4`);
  if (!force && manifest.loops[slug]?.mtime === statSync(src).mtimeMs && existsSync(out)) continue;
  let crf = 26;
  for (;;) {
    execFileSync("ffmpeg", [
      "-y", "-loglevel", "error", "-i", src, "-an",
      "-vf", "scale=720:-2:flags=lanczos,fps=30",
      "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-crf", String(crf), "-preset", "slow", "-movflags", "+faststart", out,
    ]);
    if (statSync(out).size < 1.45 * 1024 * 1024 || crf >= 36) break;
    crf += 2;
  }
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", out, "-frames:v", "1", "-q:v", "4", path.join(LOOPS_OUT, `${slug}.jpg`)]);
  manifest.loops[slug] = { bytes: statSync(out).size, crf, mtime: statSync(src).mtimeMs };
  console.log("loop", slug, (statSync(out).size / 1024).toFixed(0) + "KB", "crf", crf);
}

for (const f of readdirSync(REAL).filter(isImg)) {
  if (manifest.real[f] && !force) continue;
  const meta = await sharp(path.join(REAL, f)).metadata();
  manifest.real[f] = { w: meta.width, h: meta.height, blur: await blur(path.join(REAL, f)) };
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
console.log("manifest:", Object.keys(manifest.images).length, "images,", Object.keys(manifest.loops).length, "loops");
