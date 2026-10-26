// Final content diff: every line scraped from the live site (_source/*.txt) must appear in the built site.
// Run after `next build`. Reads prerendered HTML from .next/server/app, strips scripts, compares normalized text.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = path.join(root, ".next/server/app");
const pages = {
  home: "index.html",
  menus_dinner: "menus/dinner.html",
  menus_lunch: "menus/lunch.html",
  "menus_signature-cocktails": "menus/signature-cocktails.html",
  "about-us": "about-us.html",
  "the-restaurant": "the-restaurant.html",
  "contact-us": "contact-us.html",
};

// Intentional, documented differences (see _source/inventory.md).
const SKIP = [/^website by$/, /^inacom$/, /^bottle$/, /^gift cards$/i];
// The live site prints some values on one line; the new site splits them into description + price.
const EQUIV = {
  "lump crab old bay ciabatta toast 6oz cup $8 12oz bowl $12": ["lump crab old bay ciabatta toast", "6oz cup $8", "12oz bowl $12"],
  "two 3.5 oz cakes served over sweet corn risotto with zucchini and bacon lardons sherry beurre blanc market price": [
    "two 3.5 oz cakes served over sweet corn risotto with zucchini and bacon lardons sherry beurre blanc",
    "market price",
  ],
  "chicken picatta": ["chicken piccata"],
  // About: the name story is set as two parts on the new page; both sentences are checked verbatim.
  'the name "sweetbay" is the clever connection between one of the restaurateur\'s dc restaurants magnolia kitchen & bar and our local flora. "sweetbay" is the species of magnolia most often found in southern maryland. our restaurant name is a double entendre with reference to the dc restaurant and our much loved nearby breton bay.': [
    'the name "sweetbay" is the clever connection between one of the restaurateur\'s dc restaurants magnolia kitchen & bar and our local flora.',
    '"sweetbay" is the species of magnolia most often found in southern maryland. our restaurant name is a double entendre with reference to the dc restaurant and our much loved nearby breton bay.',
  ],
};

const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&rsquo;|&lsquo;|[‘’]/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;|[“”]/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;|&ndash;|&mdash;|[–—·]/g, " ")
    .replace(/[^a-z0-9$%.&'"\s]/g, " ")
    .replace(/\s-\s/g, " ")
    .replace(/\s+/g, " ")
    .replace(/ ([.,;:!?])/g, "$1")
    .trim();

const htmlText = (html) =>
  norm(
    html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " "),
  );

if (!existsSync(app)) {
  console.error("Run `next build` first.");
  process.exit(1);
}

const built = Object.fromEntries(Object.entries(pages).map(([k, f]) => [k, readFileSync(path.join(app, f), "utf8")]));
const texts = Object.fromEntries(Object.entries(built).map(([k, h]) => [k, htmlText(h)]));
const allText = Object.values(texts).join(" | ");
const allHtml = Object.values(built).join("\n");

const missing = [];
const moved = [];
let checked = 0;
// Social links live in icon-only anchors on the live footer (see inventory A4), so list them explicitly.
const links = new Set([
  "https://www.facebook.com/SweetbayMD",
  "https://www.instagram.com/sweetbaymd",
  "https://www.tripadvisor.com/Restaurant_Review-g41227-d20015391-Reviews-Sweetbay_Restaurant_Bar-Leonardtown_Maryland.html",
  "https://www.yelp.com/biz/sweetbay-restaurant-and-bar-leonardtown",
  "https://maps.google.com/maps?q=Sweetbay+Restaurant+%26+Bar%3Cbr%3E22680+Washington+Street%3Cbr%3ELeonardtown+MD++20650&t=m&z=15&output=embed&iwloc=near",
]);

for (const [page] of Object.entries(pages)) {
  const lines = readFileSync(path.join(root, "_source", `${page}.txt`), "utf8").split("\n");
  for (let raw of lines) {
    raw = raw.trim();
    if (!raw) continue;
    if (raw.startsWith("[link]")) {
      const href = raw.slice(7).trim();
      if (/^https?:\/\//.test(href) && !href.includes("sweetbayrestaurant.com") && !href.includes("inacom")) links.add(href);
      continue;
    }
    if (raw.startsWith("[img]") || raw.startsWith("[iframe]")) continue;
    if (/ – Upscale Restaurant| \| Sweetbay Restaurant & Bar$/.test(raw) && raw.includes("Upscale")) continue; // titles checked below
    const line = norm(raw.replace(/^<h\d>\s*/, "").replace(/^\*|\*$/g, "").replace(/^- /, ""));
    if (!line || SKIP.some((r) => r.test(line))) continue;
    checked++;
    const parts = EQUIV[line] ?? [line];
    const onPage = parts.every((p) => texts[page].includes(p));
    if (onPage) continue;
    if (parts.every((p) => allText.includes(p))) moved.push(`${page}: ${raw}`);
    else missing.push(`${page}: ${raw}`);
  }
}

const missingLinks = [...links].filter((l) => !allHtml.includes(l.replace(/&/g, "&amp;")) && !allHtml.includes(l));
const titleChecks = [
  ["home", "<title>Upscale Restaurant Leonardtown MD | Sweetbay Restaurant &amp; Bar</title>"],
  ["menus_dinner", "<title>Dinner – Upscale Restaurant Leonardtown MD | Sweetbay Restaurant &amp; Bar</title>"],
  ["menus_lunch", "<title>Lunch – Upscale Restaurant Leonardtown MD | Sweetbay Restaurant &amp; Bar</title>"],
];
const missingTitles = titleChecks.filter(([p, t]) => !built[p].includes(t)).map(([p]) => p);

const report = [
  `Content diff · ${new Date().toISOString()}`,
  `Checked ${checked} text lines, ${links.size} external links, ${titleChecks.length} titles.`,
  `Missing: ${missing.length + missingLinks.length + missingTitles.length}`,
  ...missing.map((m) => `  MISSING ${m}`),
  ...missingLinks.map((m) => `  MISSING LINK ${m}`),
  ...missingTitles.map((m) => `  MISSING TITLE ${m}`),
  `Present on another page (shared blocks like Contact/Hours live on Home, Contact and the footer): ${moved.length}`,
  ...moved.slice(0, 200).map((m) => `  moved ${m}`),
].join("\n");
writeFileSync(path.join(root, "_source/diff-report.txt"), report + "\n");
console.log(report.split("\n").slice(0, 3 + missing.length + missingLinks.length + missingTitles.length).join("\n"));
process.exit(missing.length + missingLinks.length + missingTitles.length ? 1 : 0);
