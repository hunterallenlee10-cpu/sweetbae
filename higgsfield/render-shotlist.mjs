import { writeFileSync } from "node:fs";
import * as S from "./shots.mjs";

const img = S.COST.image;
const rows = [];
let total = 0;
const add = (group, n, unit, note) => {
  rows.push(`| ${group} | ${n} | ${unit} | ${n * unit} | ${note} |`);
  total += n * unit;
};
add("Hero stills (dusk relight, beats 1-3, portrait)", S.hero.stills.length, img, "Nano Banana 2.1, 2K");
const clipSec = S.hero.clips.reduce((a, c) => a + c.duration, 0);
add("Hero clips (first/last frame)", clipSec, S.COST.videoPerSecond, `Kling 4.0 1080p, ${S.hero.clips.length} clips, ${clipSec}s`);
add("Food stills 4:5 (incl. anchor)", S.food.length, img, "Nano Banana 2.1, 2K, anchor as reference");
add("Food featured 16:9", S.featured16x9.food.length, img, S.featured16x9.food.join(", "));
add("Drink stills 4:5 (incl. anchor)", S.drinks.length, img, "Nano Banana 2.1, 2K");
add("Drink featured 16:9", S.featured16x9.drinks.length, img, S.featured16x9.drinks.join(", "));
add("Atmosphere (wine & beer + 4 banners)", S.atmosphere.length, img, "16:9 and 21:9");
add("Living micro-loops", S.loops.length * 4, S.COST.videoPerSecond, `Kling 4.0 1080p, ${S.loops.length} x 4s, start=end frame`);
const buffer = Math.ceil(total * 0.25);

let md = `# Higgsfield shot list

Rendered from \`shots.mjs\` (\`node higgsfield/render-shotlist.mjs\`). If the Higgsfield MCP is unavailable, run these
prompts in the Higgsfield web app and drop outputs into \`/higgsfield/raw/\` named by id (e.g. \`pan-roasted-duck-breast.png\`).

- Image model: \`${S.IMAGE_MODEL}\` (2K). Food shots after the anchor pass \`fresh-baked-parker-rolls\` as a reference image;
  drinks after the anchor pass \`espresso-martini\`.
- Video model: \`${S.VIDEO_MODEL}\`, image-to-video, 1080p, first and last frame, audio stripped in post.

## Budget

| Group | Count | Credits each | Credits | Notes |
|---|---|---|---|---|
${rows.join("\n")}
| **Planned** | | | **${total}** | |
| Regeneration buffer (25%) | | | ${buffer} | single-item redos only |
| **Ceiling** | | | **${total + buffer}** | |

## Hero (Option C: concept footage)

Clip prompt: "${S.hero.clipPrompt}"
Bridge prompt (last clip): "${S.hero.bridgePrompt}"

| id | aspect | refs | prompt |
|---|---|---|---|
${S.hero.stills.map((s) => `| ${s.id} | ${s.aspect} | ${(s.refs || []).join(", ")} | ${s.prompt} |`).join("\n")}

| clip | first frame | last frame | seconds | aspect |
|---|---|---|---|---|
${S.hero.clips.map((c) => `| ${c.id} | ${c.from} | ${c.to} | ${c.duration} | ${c.aspect} |`).join("\n")}

## Food (4:5, 2K)

| id | angle | prompt |
|---|---|---|
${S.food.map((f) => `| ${f.id}${f.anchor ? " (ANCHOR)" : ""} | ${f.angle} | ${f.prompt} |`).join("\n")}

16:9 versions: ${S.featured16x9.food.join(", ")} (same prompt, the 4:5 still as reference).

## Drinks (4:5, 2K)

| id | prompt |
|---|---|
${S.drinks.map((d) => `| ${d.id}${d.anchor ? " (ANCHOR)" : ""} | ${d.prompt} |`).join("\n")}

16:9 versions: ${S.featured16x9.drinks.join(", ")}.

## Atmosphere

| id | aspect | refs | prompt |
|---|---|---|---|
${S.atmosphere.map((a) => `| ${a.id} | ${a.aspect} | ${(a.refs || []).join(", ")} | ${a.prompt} |`).join("\n")}

## Living micro-loops (4s, start frame = end frame = the 4:5 still)

| id | prompt |
|---|---|
${S.loops.map((l) => `| ${l.id} | ${l.prompt} |`).join("\n")}
`;
writeFileSync(new URL("./SHOTLIST.md", import.meta.url), md);
console.log({ total, buffer, ceiling: total + buffer });
