// Single source for every Higgsfield generation. SHOTLIST.md is rendered from this file.
export const IMAGE_MODEL = "nano_banana_2_1"; // best photoreal + multi-reference image model on Higgsfield today
export const VIDEO_MODEL = "kling4_0"; // current Kling with ordered first/last keyframes

const FOOD_TEMPLATE = (visual, plate) =>
  `Editorial fine-dining food photography for Sweetbay Restaurant & Bar. ${visual} Plated on ${plate}. Dark aged oak table, cream linen edge, single warm window light from upper left, soft shadows, 85mm f/2.8 shallow depth of field, rich natural color, appetizing texture, photoreal, no text, no hands, no logos, no people, no cutlery clutter. Show only the listed components, nothing extra.`;
const STYLE_REF = "Match the plates, oak surface, linen, light direction and exposure of the reference image exactly.";
const DRINK_TEMPLATE = (visual) =>
  `Editorial cocktail photography for Sweetbay Restaurant & Bar. ${visual} On a black marble bar top, backlit warm amber bokeh of bottles behind, crisp glassware, condensation where cold, single rim light, low-key moody exposure, 85mm f/2.8 shallow depth of field, photoreal, no text, no logos, no labels, no hands, no people.`;

const BONE = "matte handmade bone-colored stoneware";
const CHAR = "matte handmade charcoal stoneware";

// angle: "plated" = 35-45 degree view, "overhead" = top-down for shareables meant for the table. steam = hot dishes only.
export const food = [
  ["fresh-baked-parker-rolls", "Glossy golden pull-apart Parker House rolls in a small cast-iron skillet, flaky salt on top, a small ramekin of soft herb butter beside it. Gentle steam.", CHAR, "overhead", true],
  ["pulpo-al-pastor", "One charred grilled octopus tentacle over a smear of brick-red achiote sauce, grilled pineapple wedges with char marks, bright green salsa verde drizzle, pink pickled onion.", BONE, "plated"],
  ["zucchini-fries", "Golden parmesan-panko crusted zucchini batons stacked, a snowfall of grated parmesan, a charred lemon half, a small bowl of roasted garlic aioli.", CHAR, "overhead"],
  ["chimichurri-meatballs", "Seared meatballs glossy with vivid green chimichurri, charred pearl onions, a swoosh of whipped feta underneath.", BONE, "plated"],
  ["oysters-cargot", "Exactly six oysters on the half shell arranged on rock salt, each bubbling with garlic herb butter under a golden parmesan crust. Count: six oysters, no more, no fewer.", CHAR, "overhead"],
  ["tenderloin-steak-bites", "Dry-rubbed seared filet mignon tips with pink centers, a small pool of creamy peppercorn sauce.", CHAR, "plated"],
  ["brussels-sprouts", "Crispy flash-fried Brussels sprout halves topped with bacon pieces, toasted breadcrumbs and grated parmesan, a balsamic glaze drizzle.", BONE, "overhead"],
  ["tuna-poke-nachos", "Wonton chips layered with ruby poke-dressed tuna cubes, avocado, thin serrano pepper rings, pickled onion, zigzags of dark eel sauce and pale green wasabi aioli, micro cilantro.", CHAR, "overhead"],
  ["parmesan-truffle-fries", "Golden fries with grated parmesan, two small dipping bowls: white house ranch and orange-red calabrian aioli.", BONE, "overhead"],
  ["sweet-and-spicy-shrimp", "Lightly fried shrimp glazed in glossy orange-red thai chili sauce, scattered pink pickled onion.", BONE, "plated"],
  ["granny-smith-apple-salad", "Mixed greens with thin green Granny Smith apple slices, shaved fennel, gorgonzola crumbles, a light sherry-fig vinaigrette sheen.", BONE, "plated"],
  ["local-tomatoes-and-mozzarella", "Thick ripe local tomato slices layered with buffalo mozzarella, pistachio-basil pesto, aged balsamic and olive oil, flaky salt and cracked pepper.", BONE, "overhead"],
  ["cream-of-crab-soup", "A bowl of creamy soup with visible lump crab meat, a dusting of Old Bay seasoning on top, a slice of ciabatta toast alongside. Gentle steam.", BONE, "plated", true],
  ["cobb-salad-with-grilled-romaine", "A charred grilled romaine half with neat rows of baby heirloom tomatoes, grilled corn, pancetta, avocado, feta, pickled onion and a halved boiled egg, balsamic vinaigrette.", BONE, "overhead"],
  ["caesar-salad", "Romaine hearts with shaved parmesan, croutons, pancetta, creamy caesar dressing.", BONE, "plated"],
  ["crab-cakes", "Exactly two golden crab cakes over sweet corn risotto with zucchini and bacon lardons, a sherry beurre blanc. Count: two crab cakes.", BONE, "plated", true],
  ["pan-roasted-duck-breast", "Sliced rosy pan roasted duck breast fanned out with crisp rendered skin, mashed potatoes, spinach, mushrooms, pancetta, a glossy red wine reduction. Gentle steam.", CHAR, "plated", true],
  ["grilled-faroe-island-salmon", "A blackened salmon fillet on cilantro rice, pineapple pico de gallo, salsa verde.", BONE, "plated", true],
  ["chicken-piccata", "Exactly two lightly floured pan-fried chicken breasts over linguine, lemon caper butter sauce with capers. Count: two chicken breasts.", BONE, "plated", true],
  ["chicken-piccata-lunch", "Exactly one lightly floured pan-fried chicken breast over linguine, lemon caper butter sauce with capers. Count: one chicken breast.", BONE, "plated", true],
  ["pork-ribeye", "Exactly two boneless pork ribeye chops with a creole mustard glaze, green beans with charred pearl onions, golden baby potatoes. Count: two chops.", CHAR, "plated", true],
  ["mushroom-ravioli", "Mushroom ravioli with sautéed asparagus and mushrooms, white wine butter sauce, balsamic glaze drizzle, grated parmesan.", BONE, "plated", true],
  ["8oz-cab-filet-mignon", "A center-cut filet mignon with bone marrow compound butter melting on top, green beans, mashed potatoes, a balsamic red wine reduction. Gentle steam.", CHAR, "plated", true],
  ["snake-river-farms-wagyu-beef-burger", "A wagyu beef burger with melted boursin garlic herb cheese, lettuce, tomato, caramelized onions on a toasted bun, parmesan truffle fries beside it.", CHAR, "plated"],
  ["chicken-bacon-avocado", "A ciabatta sandwich with chicken, bacon, avocado, lettuce, tomato, swiss cheese and calabrian aioli, cut in half to show layers.", BONE, "plated"],
  ["tenderloin-sandwich", "A ciabatta sandwich with sliced filet mignon, onions, melted provolone, horseradish aioli, cut in half to show layers.", BONE, "plated"],
  ["sweetbay-burger", "A burger with provolone, lettuce, tomato, onions and pickles on a toasted bun. No side dish shown.", CHAR, "plated"],
].map(([id, visual, plate, angle, hot]) => ({
  id,
  angle,
  prompt:
    FOOD_TEMPLATE(visual, plate) +
    (angle === "overhead" ? " Overhead top-down view." : " Camera at a 40 degree angle.") +
    (hot ? "" : " No steam.") +
    (id === "fresh-baked-parker-rolls" ? "" : " " + STYLE_REF),
  anchor: id === "fresh-baked-parker-rolls",
}));

export const drinks = [
  ["espresso-martini", "An espresso martini in a coupe glass with a dense tan crema foam."],
  ["gin-basil-smash", "A pale green Gin Basil Smash in a coupe glass with a thick white egg white foam and one basil leaf."],
  ["smokeshow", "A mezcal cocktail on the rocks in a rocks glass, lime wheel, cilantro sprig and one serrano pepper slice."],
  ["mango-margarita", "A mango-orange margarita with a tajin and sugar rim."],
  ["blue-cheese-dirty-martini", "A cloudy dirty martini in a martini glass with blue-cheese stuffed olives on a pick."],
  ["strawberry-vodka-mojito", "A highball strawberry mojito with muddled strawberries, mint leaves and lime."],
  ["smoked-rye-old-fashioned", "A smoked rye old fashioned in a rocks glass with one large clear ice cube, orange peel, a luxardo cherry and a wisp of smoke curling above."],
  ["burning-daylight", "A bright pale citrus gin cocktail with lemon and lime."],
  ["blackberry-smash", "A deep berry-purple Blackberry Smash over crushed ice, fresh blackberries and basil."],
  ["pear-martini", "A pale pear martini in a martini glass with a cinnamon sugar rim."],
  ["sweetbay-radler", "A golden beer cocktail in a tall glass with a lemon wheel."],
].map(([id, visual]) => ({
  id,
  anchor: id === "espresso-martini",
  prompt:
    DRINK_TEMPLATE(visual) +
    (id === "espresso-martini" ? "" : " Match the marble, bokeh, rim light and exposure of the reference image exactly."),
}));

export const featured16x9 = {
  food: ["pan-roasted-duck-breast", "8oz-cab-filet-mignon", "crab-cakes", "pulpo-al-pastor", "oysters-cargot"],
  drinks: ["smoked-rye-old-fashioned", "gin-basil-smash", "espresso-martini"],
};

export const atmosphere = [
  { id: "wine-and-beer", aspect: "16:9", prompt: "Editorial bar photography: three wine glasses on a black marble bar top, one red, one white, one sparkling, backlit warm amber bokeh of bottles, single rim light, low-key moody exposure, photoreal, no labels, no text, no logos, no people." },
  { id: "banner-shareables", aspect: "21:9", refs: ["fresh-baked-parker-rolls", "zucchini-fries", "brussels-sprouts", "tuna-poke-nachos"], prompt: "Overhead top-down table spread on a dark aged oak table with cream linen: the shareable dishes from the reference images, arranged generously with negative space, single warm window light from upper left, photoreal, no text, no hands, no people." },
  { id: "banner-soup-salad", aspect: "21:9", refs: ["cream-of-crab-soup", "granny-smith-apple-salad", "caesar-salad", "local-tomatoes-and-mozzarella"], prompt: "Overhead top-down table spread on a dark aged oak table with cream linen: the soup and salads from the reference images, generous negative space, single warm window light from upper left, photoreal, no text, no hands, no people." },
  { id: "banner-entrees", aspect: "21:9", refs: ["pan-roasted-duck-breast", "8oz-cab-filet-mignon", "grilled-faroe-island-salmon", "crab-cakes"], prompt: "Overhead top-down table spread on a dark aged oak table with cream linen: the entrées from the reference images, generous negative space, single warm window light from upper left, photoreal, no text, no hands, no people." },
  { id: "banner-cocktails", aspect: "21:9", refs: ["espresso-martini", "gin-basil-smash", "smoked-rye-old-fashioned", "blackberry-smash"], prompt: "Overhead view of a black marble bar top with the cocktails from the reference images arranged in a row, warm amber light, photoreal, no text, no labels, no hands, no people." },
];

export const loops = [
  { id: "8oz-cab-filet-mignon", motion: "the bone marrow butter on top slowly melts and glistens" },
  { id: "pan-roasted-duck-breast", motion: "gentle steam rises softly from the plate" },
  { id: "oysters-cargot", motion: "the garlic herb butter gently bubbles in the oyster shells" },
  { id: "gin-basil-smash", motion: "the egg white foam settles slowly" },
  { id: "smoked-rye-old-fashioned", motion: "a thin wisp of smoke curls slowly above the glass" },
  { id: "espresso-martini", motion: "the crema foam settles slowly" },
].map((l) => ({
  ...l,
  prompt: `Locked-off static camera, no camera movement at all. Subtle realistic motion only: ${l.motion}. Everything else in the frame stays perfectly still. Seamless loop: the last frame matches the first frame. No text, no hands, no people.`,
}));

// Hero, Option C (concept footage). See README for the Option B Google Earth Studio upgrade path.
export const hero = {
  stills: [
    { id: "hero-storefront-dusk", aspect: "16:9", refs: ["real:Sweetbay-outside-street-scene-1.jpg"], prompt: "Relight this exact photograph to blue hour dusk. Keep every building, window, awning, sign, lamp post, planter, table and the street layout exactly as they are, same framing and perspective. Deep blue sky, warm golden light glowing from the restaurant windows and spilling onto the sidewalk, street lamp lit, string of warm outdoor lights glowing. Photoreal, no new objects, no text changes." },
    { id: "hero-storefront-dusk-portrait", aspect: "9:16", refs: ["real:Sweetbay-outside-street-scene-1.jpg"], prompt: "Recompose this exact storefront photograph as a vertical 9:16 frame centered on the restaurant entrance and sign, extending sky and sidewalk naturally. Relight to blue hour dusk: deep blue sky, warm golden window light spilling onto the sidewalk, street lamp lit. Keep every building, sign and detail exactly as in the photo. Photoreal, no text changes." },
    { id: "hero-beat1-bay", aspect: "16:9", prompt: "High wide aerial drone photograph at blue hour over a calm tidal bay in Southern Maryland (Breton Bay), wooded shorelines, a small historic waterfront town of low brick buildings and church steeple in the distance, last glow of dusk on the horizon, deep blue sky, still water reflecting the sky. Photoreal, no text." },
    { id: "hero-beat2-square", aspect: "16:9", prompt: "Low aerial drone photograph at blue hour gliding over the rooftops and autumn treetops of a small historic Maryland county-seat town square, two-story brick storefronts, warm windows starting to glow, street lamps on. Photoreal, no text." },
    { id: "hero-beat3-street", aspect: "16:9", refs: ["real:Sweetbay-outside-street-scene-1.jpg"], prompt: "Drone view descending toward street level along a small-town main street at blue hour, approaching the brick building and dark green storefronts from the reference photo from above and further back down the street, warm windows glowing, street lamps lit. Photoreal, no text." },
    { id: "hero-beat3-street-portrait", aspect: "9:16", refs: ["real:Sweetbay-outside-street-scene-1.jpg"], prompt: "Vertical drone view descending toward street level along a small-town main street at blue hour, approaching the brick building and dark green storefronts from the reference photo from above, warm windows glowing, street lamps lit. Photoreal, no text." },
  ],
  clips: [
    { id: "clip1-bay-to-square", from: "hero-beat1-bay", to: "hero-beat2-square", duration: 7, aspect: "16:9" },
    { id: "clip2-square-to-street", from: "hero-beat2-square", to: "hero-beat3-street", duration: 7, aspect: "16:9" },
    { id: "clip3-street-to-door", from: "hero-beat3-street", to: "hero-storefront-dusk", duration: 6, aspect: "16:9" },
    { id: "clip3-portrait", from: "hero-beat3-street-portrait", to: "hero-storefront-dusk-portrait", duration: 6, aspect: "9:16" },
  ],
  clipPrompt:
    "Smooth cinematic drone flight at blue hour, slow steady forward glide and gentle descent, no camera shake, no new buildings, no text, no signage changes, consistent lighting.",
  bridgePrompt:
    "Smooth cinematic drone descent at blue hour, camera glides down to street level and settles into a slow push-in on the restaurant storefront, warm interior light spilling onto the sidewalk, gentle motion, no camera shake, no new buildings, no text, no signage changes.",
};

// Credits measured with get_cost on 2026-10-26: image 2K = 2, Kling 4.0 1080p = 1 per second.
export const COST = { image: 2, videoPerSecond: 1 };
