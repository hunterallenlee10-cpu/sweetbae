// Playwright QA: screenshots of the key states at mobile and desktop, plus console errors.
// Usage: BASE=http://localhost:3100 node scripts/qa-screens.mjs [filter]
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
let pw;
try {
  pw = require("playwright");
} catch {
  pw = require("/opt/node-tools/node_modules/playwright");
}
const BASE = process.env.BASE || "http://localhost:3100";
const OUT = path.resolve(import.meta.dirname, "../qa/out");
mkdirSync(OUT, { recursive: true });
const only = process.argv[2];

const sizes = [
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "desktop", width: 1440, height: 900 },
];

const heroAt = (p) => async (page) => {
  await page.evaluate((p) => {
    const s = document.querySelector('section[aria-label="Welcome to Sweetbay"]');
    const max = s.offsetHeight - window.innerHeight;
    window.__lenis ? window.__lenis.scrollTo(max * p, { immediate: true }) : window.scrollTo(0, max * p);
  }, p);
  await page.waitForTimeout(2600);
};

const shots = [
  { id: "home-hero-0", url: "/", act: heroAt(0) },
  { id: "home-hero-50", url: "/", act: heroAt(0.5) },
  { id: "home-hero-100", url: "/", act: heroAt(1) },
  { id: "home-full", url: "/", full: true, act: async (p) => { await autoScroll(p); } },
  { id: "dinner", url: "/menus/dinner", act: async (p) => p.waitForTimeout(800) },
  { id: "dinner-full", url: "/menus/dinner", full: true, act: async (p) => { await autoScroll(p); } },
  { id: "lunch", url: "/menus/lunch", act: async (p) => p.waitForTimeout(800) },
  { id: "lunch-switch", url: "/menus/dinner", act: async (p) => { await p.getByRole("tab", { name: "Lunch" }).click(); await p.waitForTimeout(1600); } },
  { id: "dish-sheet", url: "/menus/dinner#pan-roasted-duck-breast", act: async (p) => p.waitForTimeout(1800) },
  { id: "cocktails", url: "/menus/signature-cocktails", act: async (p) => p.waitForTimeout(800) },
  { id: "cocktails-full", url: "/menus/signature-cocktails", full: true, act: async (p) => { await autoScroll(p); } },
  { id: "about-full", url: "/about-us", full: true, act: async (p) => { await autoScroll(p); } },
  { id: "restaurant-full", url: "/the-restaurant", full: true, act: async (p) => { await autoScroll(p); } },
  { id: "contact-full", url: "/contact-us", full: true, act: async (p) => { await autoScroll(p); } },
];

async function autoScroll(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

const report = [];
const browser = await pw.chromium.launch();
for (const size of sizes) {
  const ctx = await browser.newContext({ viewport: { width: size.width, height: size.height }, isMobile: size.isMobile, hasTouch: size.hasTouch, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => sessionStorage.setItem("sb-pre", "1"));
  for (const s of shots) {
    if (only && !s.id.includes(only)) continue;
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
    page.on("response", (r) => r.status() >= 400 && !r.url().includes("_vercel") && errors.push(`${r.status()} ${r.url()}`));
    await page.goto(BASE + s.url, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1200);
    await s.act(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const file = path.join(OUT, `${s.id}-${size.name}.png`);
    await page.screenshot({ path: file, fullPage: Boolean(s.full) });
    report.push({ shot: s.id, size: size.name, overflowX: overflow, errors });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 1));
for (const r of report) console.log(`${r.errors.length || r.overflowX > 0 ? "✗" : "✓"} ${r.shot} @${r.size} overflowX=${r.overflowX} errors=${r.errors.length}${r.errors.length ? "\n   " + r.errors.slice(0, 4).join("\n   ") : ""}`);
