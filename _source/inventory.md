# Sweetbay live-site inventory

Scraped 2026-10-26 from https://sweetbayrestaurant.com. Raw HTML and text extracts live next to this file
(`home.html` / `home.txt`, `menus_dinner.*`, `menus_lunch.*`, `menus_signature-cocktails.*`,
`menus_dessert.*`, `about-us.*`, `the-restaurant.*`, `contact-us.*`).

The live site matches section 3 of the kickstart for every fact, price, item, policy, hour and review.
The diff found the items below that section 3 did not list. All of them are now in `/content/*`.

## Additions found on the live site (not in section 3)

| # | What | Where on live site | Where it lives now |
|---|---|---|---|
| A1 | Signature Cocktails page intro paragraph: "Step into our world of refined flavors with a cocktail menu that’s as dynamic and creative as our modern American dishes. From classic favorites to bold new creations, our premium cocktails are designed to engage your senses and enhance your dining experience. Let our expert bartenders guide you through a selection that’s always evolving, just like the seasons themselves. Cheers to unforgettable evenings." | `/menus/signature-cocktails/` | `content/site.ts` → `copy.cocktailsIntro` |
| A2 | Page H1s: "Dinner Menu", "Lunch Menu", "Signature Cocktails Menu", "About Sweetbay Restaurant & Bar" | each page | `content/site.ts` → `pages` |
| A3 | Page title pattern "<Page> – Upscale Restaurant Leonardtown MD \| Sweetbay Restaurant & Bar" (Dinner, Lunch, Signature Cocktails, About Us, The Restaurant, Contact Us) | `<title>` | `content/site.ts` → `pages[*].title` |
| A4 | Social links: Facebook `https://www.facebook.com/SweetbayMD`, Instagram `https://www.instagram.com/sweetbaymd`, Tripadvisor `https://www.tripadvisor.com/Restaurant_Review-g41227-d20015391-Reviews-Sweetbay_Restaurant_Bar-Leonardtown_Maryland.html`, Yelp `https://www.yelp.com/biz/sweetbay-restaurant-and-bar-leonardtown` | footer of every page | `content/site.ts` → `social` (footer + JSON-LD `sameAs`) |
| A5 | Beer section is titled "Beer" with a "Draft" subheading | food + cocktail menus | `content/menu.ts` → `beer` |
| A6 | Contact page uses a second, closer map embed (zoom 18) | `/contact-us` | `content/site.ts` → `business.mapEmbedClose` |
| A7 | Resy button label "Book your Sweetbay Restaurant and Bar reservation on Resy" (used as accessible label) | home hero | `content/site.ts` → `business.reservationsLabel` |
| A8 | "Home" link in the main nav | nav | nav |
| A9 | Brand colors read from the SVGs: Patriot Blue `#174b7c` (icon), Black Magic `#323132` (logo) | `/wp-content/uploads/...svg` | `app/globals.css` tokens |
| A10 | Real menu-page header photos (not in section 1's list): `best-burger-leonardtown-md.jpg`, `sb-meatball-header.jpg`, `smoked-old-fashioned.jpg` | menu page headers | `/public/real/` |

## Found but intentionally not shown (needs Hunter)

- `/menus/dessert/` exists (in the WP sitemap, not linked from nav). Its food sections are empty and it only
  repeats the drinks list. No dessert items are published. A reviewer mentions "Creme Brulé".
  `TODO(hunter): confirm dessert menu items, or keep /menus/dessert redirecting to /menus/dinner.`
- The "Bottle" beer heading is empty on every menu. Dropped. `TODO(hunter): confirm bottle list or remove.`
- The WP sitemap holds drink entries that no live menu shows and whose pages are empty: Bubbles & Sparkles,
  Fresh Squeezed Lemonade, Athletic Brewing Run Wild IPA, Michelob Ultra, Local IPA Spotlight,
  Pineapple Paradise, Freixenet Alcohol-Removed Sparkling Wine, Selbach Funkelwurtz Zero,
  Manor Hill Brewing Mild Manor'd Amber, Angelini Pinot Grigio, Twin Vines Vinho Verde, Fess Parker Riesling,
  Notch Blonde Ale, Blackberry Ginger No-jito, Non-Aperol Spritz. These look like retired items or a
  zero-proof list. Not shown (no prices or descriptions exist). `TODO(hunter): is there a zero-proof / N/A list to add?`
- `/sample-page/` is the WordPress default page. Ignored.
- "Website by Inacom" footer credit. Removed per brief.

## Corrections applied (per brief)

- "Chicken Picatta" (dinner) → "Chicken Piccata".
- ALL CAPS item names → Title Case.

## Verbatim notes

- Live copy uses curly apostrophes in places ("chef’s butter", "Oyster’s", "tito’s", "’64", "mom’s").
  Content files keep the live site's characters.
- Cocktails page on the live site shows no prices; the food menus do. The new cocktails page shows the prices
  from the food menus (same items, same source).

## Final content diff

Run `npm run content:diff`. It parses every `_source/*.txt` extract and checks every heading, price, description
and policy string against the rendered site output. Last result is written to `_source/diff-report.txt`.
