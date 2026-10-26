// Downloads finished Higgsfield results listed in higgsfield/results.json ({ "<slug>": "<url>" }) into higgsfield/raw/.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const results = JSON.parse(readFileSync(path.join(root, "higgsfield/results.json"), "utf8"));
for (const [slug, url] of Object.entries(results)) {
  const ext = (url.split("?")[0].match(/\.(png|jpe?g|webp|mp4)$/i) || [".png"])[0];
  const isVideo = ext === ".mp4";
  const sub = slug.startsWith("hero-") ? "hero" : slug.startsWith("clip") ? "clips" : isVideo ? "loops" : "";
  const dir = path.join(root, "higgsfield/raw", sub);
  mkdirSync(dir, { recursive: true });
  const out = path.join(dir, slug + ext);
  if (existsSync(out)) continue;
  execFileSync("curl", ["-sSL", "-o", out, url]);
  console.log("got", slug + ext);
}
