// Joins the hero clips and cuts scroll-scrub frame sequences.
//   desktop: 1920px wide WebP, ~300 frames  -> public/frames/desktop/0001.webp
//   mobile:  720px wide 9:16 WebP           -> public/frames/mobile/0001.webp
// Mobile uses center crops of beats 1-2 and the dedicated portrait clip for beats 3-4.
// Writes public/frames/manifest.json with counts and beat boundaries (0..1).
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const clips = path.join(root, "higgsfield/raw/clips");
const out = path.join(root, "public/frames");
const tmp = path.join(root, ".frames-tmp");
const FPS = Number(process.env.FRAMES_FPS || 15);

const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args]);
const dur = (f) =>
  Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());

rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

// Drop the first frame of every clip after the first: it duplicates the previous clip's last frame.
function join(list, vf, name) {
  const parts = list.map((c, i) => {
    const p = path.join(tmp, `${name}-${i}.mp4`);
    ff(["-ss", i === 0 ? "0" : String(1 / 24), "-i", path.join(clips, c), "-an", "-vf", vf, "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-pix_fmt", "yuv420p", p]);
    return p;
  });
  const listFile = path.join(tmp, `${name}.txt`);
  writeFileSync(listFile, parts.map((p) => `file '${p}'`).join("\n"));
  const joined = path.join(tmp, `${name}.mp4`);
  ff(["-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", joined]);
  return { joined, durations: parts.map(dur) };
}

function cut(joined, dir, width, quality, denoise = "") {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  ff(["-i", joined, "-vf", `fps=${FPS},${denoise}scale=${width}:-2:flags=lanczos`, "-c:v", "libwebp", "-quality", String(quality), "-compression_level", "4", path.join(dir, "%04d.webp")]);
  const files = readdirSync(dir).filter((f) => f.endsWith(".webp"));
  const bytes = files.reduce((a, f) => a + statSync(path.join(dir, f)).size, 0);
  return { count: files.length, bytes };
}

const desktopList = ["clip1-bay-to-square.mp4", "clip2-square-to-street.mp4", "clip3-street-to-door.mp4"];
const d = join(desktopList, "scale=1928:1076,setsar=1", "desktop");
// Light denoise strips AI/drone noise that WebP spends bytes on; the 1080p source is soft, so quality ~35-45 is visually lossless.
const DN = "hqdn3d=3:3:4:4,";
// 1760px: the 1080p source holds no more detail than this, and it keeps the set under 15 MB.
const DW = 1760;
let desktop = cut(d.joined, path.join(out, "desktop"), DW, 45, DN);
// Keep the desktop set under the 15 MB budget.
for (let q = 40; desktop.bytes > 14.5 * 1024 * 1024 && q >= 25; q -= 5) desktop = cut(d.joined, path.join(out, "desktop"), DW, q, DN);

// Mobile: crop 9:16 from the center of the landscape clips, then the native portrait clip.
const crop = "crop=ih*9/16:ih,scale=1076:1928:flags=lanczos,setsar=1";
const mParts = [
  ["clip1-bay-to-square.mp4", crop],
  ["clip2-square-to-street.mp4", crop],
  ["clip3-portrait.mp4", "scale=1076:1928,setsar=1"],
];
const mobileParts = mParts.map(([c, vf], i) => {
  const p = path.join(tmp, `mobile-${i}.mp4`);
  ff(["-ss", i === 0 ? "0" : String(1 / 24), "-i", path.join(clips, c), "-an", "-vf", vf, "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-pix_fmt", "yuv420p", p]);
  return p;
});
writeFileSync(path.join(tmp, "mobile.txt"), mobileParts.map((p) => `file '${p}'`).join("\n"));
const mJoined = path.join(tmp, "mobile.mp4");
ff(["-f", "concat", "-safe", "0", "-i", path.join(tmp, "mobile.txt"), "-c", "copy", mJoined]);
const mobile = cut(mJoined, path.join(out, "mobile"), 720, 50, DN);

// Beat boundaries as scroll fractions: bay | square | street | arrival.
const total = d.durations.reduce((a, b) => a + b, 0);
const c1 = d.durations[0] / total;
const c2 = (d.durations[0] + d.durations[1]) / total;
const beats = [0, c1 * 0.55, c1 + (c2 - c1) * 0.55, c2 + (1 - c2) * 0.5];

const manifest = {
  fps: FPS,
  desktop: { count: desktop.count, width: DW, height: Math.round((DW * 1076) / 1928 / 2) * 2, bytes: desktop.bytes },
  mobile: { count: mobile.count, width: 720, height: 1290, bytes: mobile.bytes },
  beats,
  concept: true,
};
writeFileSync(path.join(out, "manifest.json"), JSON.stringify(manifest, null, 1));
rmSync(tmp, { recursive: true, force: true });
console.log(manifest);
