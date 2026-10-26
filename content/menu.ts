/**
 * Sweetbay menu data. Source of truth: the live site (see /_source/inventory.md).
 * Descriptions and prices are verbatim. Names are Title Case.
 * Components never hard-code menu content; they read from here.
 */

export type Tag = "gf" | "cgf";

export type Price =
  | { kind: "single"; amount: number }
  | { kind: "market" }
  | { kind: "options"; options: { label: string; amount: number }[] }
  | { kind: "none" };

export type Dish = {
  /** URL hash + image slug. Stable across menus for shared items. */
  id: string;
  name: string;
  description: string;
  price: Price;
  tags: Tag[];
  /** Image slug under /public/menu. Defaults to id. */
  image?: string;
  /** Plays a living micro-loop from /public/loops when available. */
  featured?: boolean;
  alt: string;
};

export type Category = {
  id: string;
  title: string;
  /** Short label for the sticky category rail. */
  rail: string;
  banner?: string;
  items: Dish[];
  note?: string;
};

const p = (amount: number): Price => ({ kind: "single", amount });

/* ------------------------------------------------------------------ */
/* Shareables (same on lunch and dinner)                               */
/* ------------------------------------------------------------------ */

export const shareables: Dish[] = [
  {
    id: "fresh-baked-parker-rolls",
    name: "Fresh Baked Parker Rolls",
    price: p(10),
    description: "delivered daily by Lyon Bakery, oven finished to order with rotating chef’s butter",
    tags: [],
    alt: "Golden pull-apart Parker House rolls in a small cast-iron skillet with flaky salt and a ramekin of soft herb butter.",
  },
  {
    id: "pulpo-al-pastor",
    name: "Pulpo al Pastor",
    price: p(22),
    description: "grilled octopus with charred achiote sauce, grilled pineapple, salsa verde, pickled onion",
    tags: ["gf"],
    alt: "Charred grilled octopus over brick-red achiote sauce with grilled pineapple, salsa verde and pickled onion.",
  },
  {
    id: "zucchini-fries",
    name: "Zucchini Fries",
    price: p(13),
    description:
      "parmesan-panko crusted zucchini topped with fresh grated parmesan, charred lemon, roasted garlic aioli",
    tags: [],
    alt: "Stacked parmesan-panko zucchini fries under grated parmesan, with a charred lemon half and roasted garlic aioli.",
  },
  {
    id: "chimichurri-meatballs",
    name: "Chimichurri Meatballs",
    price: p(15),
    description: "house ground wagyu and tenderloin mix, fresh chimichurri, charred pearl onions, whipped feta",
    tags: [],
    alt: "Seared wagyu and tenderloin meatballs glossy with green chimichurri, charred pearl onions and whipped feta.",
  },
  {
    id: "oysters-cargot",
    name: "Oysters Cargot",
    price: p(22),
    description: "six oysters (Hollywood Oyster’s Sweet Jesus, Calif. MD) with roasted garlic herb butter, parmesan",
    tags: ["gf"],
    featured: true,
    alt: "Six oysters on the half shell over rock salt, bubbling with roasted garlic herb butter and a parmesan crust.",
  },
  {
    id: "tenderloin-steak-bites",
    name: "Tenderloin Steak Bites",
    price: p(22),
    description: "dry rubbed filet tips, creamy peppercorn sauce",
    tags: ["gf"],
    alt: "Dry-rubbed seared filet tips with pink centers beside a creamy peppercorn sauce.",
  },
  {
    id: "brussels-sprouts",
    name: "Brussels Sprouts",
    price: p(13),
    description: "flash fried, topped with bacon, breadcrumbs, parmesan, and balsamic glaze",
    tags: ["cgf"],
    alt: "Crispy flash-fried Brussels sprouts with bacon, toasted breadcrumbs, parmesan and a balsamic glaze drizzle.",
  },
  {
    id: "tuna-poke-nachos",
    name: "Tuna Poke Nachos",
    price: p(20),
    description:
      "wonton chips topped with poke dressed tuna, pickled onion, avocado, serrano peppers, eel sauce, wasabi aioli, micro cilantro",
    tags: [],
    alt: "Wonton chips layered with poke tuna, avocado, serrano, pickled onion, eel sauce, wasabi aioli and micro cilantro.",
  },
  {
    id: "parmesan-truffle-fries",
    name: "Parmesan Truffle Fries",
    price: p(12),
    description: "house made ranch, calabrian aioli",
    tags: [],
    alt: "Golden fries with grated parmesan and two dips, house ranch and calabrian aioli.",
  },
  {
    id: "sweet-and-spicy-shrimp",
    name: "Sweet and Spicy Shrimp",
    price: p(15),
    description: "lightly fried shrimp, tossed in thai chili sauce, pickled onion",
    tags: [],
    alt: "Lightly fried shrimp glazed in glossy thai chili sauce with pickled onion.",
  },
];

/* ------------------------------------------------------------------ */
/* Soup & Salad (same on lunch and dinner)                             */
/* ------------------------------------------------------------------ */

export const soupSalad: Dish[] = [
  {
    id: "granny-smith-apple-salad",
    name: "Granny Smith Apple Salad",
    price: p(15),
    description: "mixed greens, shaved fennel, gorgonzola, sherry-fig vinaigrette",
    tags: ["gf"],
    alt: "Mixed greens with thin green apple slices, shaved fennel, gorgonzola and sherry-fig vinaigrette.",
  },
  {
    id: "local-tomatoes-and-mozzarella",
    name: "Local Tomatoes and Mozzarella",
    price: p(17),
    description:
      "5 year aged balsamic and olive oil, buffalo mozzarella, pistachio-basil pesto, flaky salt and cracked pepper",
    tags: ["gf"],
    alt: "Thick local tomato slices with buffalo mozzarella, pistachio-basil pesto, aged balsamic, olive oil and flaky salt.",
  },
  {
    id: "cream-of-crab-soup",
    name: "Cream of Crab Soup",
    price: {
      kind: "options",
      options: [
        { label: "6oz cup", amount: 8 },
        { label: "12oz bowl", amount: 12 },
      ],
    },
    description: "lump crab, old bay, ciabatta toast",
    tags: [],
    alt: "Creamy crab soup with visible lump crab and a dusting of Old Bay, ciabatta toast alongside.",
  },
  {
    id: "cobb-salad-with-grilled-romaine",
    name: "Cobb Salad with Grilled Romaine",
    price: p(17),
    description:
      "baby heirloom tomatoes, grilled corn, pancetta, avocado, feta cheese, pickled onion, boiled egg, balsamic vinaigrette",
    tags: ["gf"],
    alt: "Charred grilled romaine with heirloom tomatoes, grilled corn, pancetta, avocado, feta, pickled onion and boiled egg.",
  },
  {
    id: "caesar-salad",
    name: "Caesar Salad",
    price: p(14),
    description: "hearts of romaine, fresh parmesan, croutons, pancetta, house caesar dressing",
    tags: ["cgf"],
    alt: "Romaine hearts with shaved parmesan, croutons, pancetta and creamy house caesar dressing.",
  },
];

export const saladAddOns = "Add to salad: Chicken (8), Tenderloin Medallions (25), Blackened Faroe Island Salmon (15), Shrimp (12)";

/* ------------------------------------------------------------------ */
/* Entrees                                                              */
/* ------------------------------------------------------------------ */

const salmon: Dish = {
  id: "grilled-faroe-island-salmon",
  name: "Grilled Faroe Island Salmon",
  price: p(34),
  description: "blackened salmon, cilantro rice, pineapple pico de gallo, salsa verde",
  tags: ["gf"],
  alt: "Blackened Faroe Island salmon fillet on cilantro rice with pineapple pico de gallo and salsa verde.",
};

const ravioli: Dish = {
  id: "mushroom-ravioli",
  name: "Mushroom Ravioli",
  price: p(25),
  description: "sautéed asparagus and mushroom blend, white wine butter sauce, balsamic glaze, parmesan",
  tags: [],
  alt: "Mushroom ravioli with sautéed asparagus and mushrooms, white wine butter sauce, balsamic glaze and parmesan.",
};

const wagyu: Dish = {
  id: "snake-river-farms-wagyu-beef-burger",
  name: "Snake River Farms Wagyu Beef Burger",
  price: p(27),
  description: "boursin garlic herb cheese, lettuce, tomato, caramelized onions, parmesan truffle fries",
  tags: [],
  alt: "Wagyu burger with melted boursin, lettuce, tomato and caramelized onions, parmesan truffle fries beside it.",
};

export const dinnerEntrees: Dish[] = [
  {
    id: "crab-cakes",
    name: "Crab Cakes",
    price: { kind: "market" },
    description:
      "two, 3.5 oz cakes, served over sweet corn risotto with zucchini and bacon lardons, sherry beurre blanc",
    tags: [],
    featured: true,
    alt: "Two golden crab cakes over sweet corn risotto with zucchini, bacon lardons and sherry beurre blanc.",
  },
  {
    id: "pan-roasted-duck-breast",
    name: "Pan Roasted Duck Breast",
    price: p(35),
    description: "pancetta, spinach, mushrooms, mashed potatoes, red wine reduction",
    tags: ["gf"],
    featured: true,
    alt: "Sliced rosy duck breast with crisp skin over mashed potatoes, spinach, mushrooms, pancetta and red wine reduction.",
  },
  salmon,
  {
    id: "chicken-piccata",
    name: "Chicken Piccata",
    price: p(26),
    description: "two lightly floured chicken breasts pan fried, linguine, lemon caper butter sauce",
    tags: [],
    alt: "Two lightly floured pan-fried chicken breasts over linguine with lemon caper butter sauce.",
  },
  {
    id: "pork-ribeye",
    name: "Pork Ribeye",
    price: p(34),
    description:
      "two 6oz boneless ribeye chops, creole mustard glaze, green beans with charred pearl onions and golden baby potatoes",
    tags: ["gf"],
    alt: "Two boneless pork ribeye chops with creole mustard glaze, green beans, charred pearl onions and golden baby potatoes.",
  },
  ravioli,
  {
    id: "8oz-cab-filet-mignon",
    name: "8oz C.A.B. Filet Mignon",
    price: p(65),
    description:
      "center cut filet of beef tenderloin, green beans, mashed potatoes, bone marrow compound butter, balsamic red wine reduction",
    tags: ["gf"],
    featured: true,
    alt: "Center-cut filet mignon with bone marrow butter melting on top, green beans, mashed potatoes and red wine reduction.",
  },
  wagyu,
];

export const lunchEntrees: Dish[] = [
  {
    id: "chicken-piccata",
    image: "chicken-piccata-lunch",
    name: "Chicken Piccata",
    price: p(22),
    description: "lightly floured chicken breast pan fried, linguine, lemon caper butter sauce",
    tags: [],
    alt: "One lightly floured pan-fried chicken breast over linguine with lemon caper butter sauce.",
  },
  salmon,
  ravioli,
  {
    id: "chicken-bacon-avocado",
    name: "Chicken Bacon Avocado",
    price: p(17),
    description: "lettuce, tomato, calabrian aioli, swiss, ciabatta",
    tags: [],
    alt: "Ciabatta sandwich with chicken, bacon, avocado, lettuce, tomato, swiss and calabrian aioli.",
  },
  {
    id: "tenderloin-sandwich",
    name: "Tenderloin Sandwich",
    price: p(25),
    description: "sliced filet mignon, onions, provolone cheese, horseradish aioli, ciabatta",
    tags: [],
    alt: "Ciabatta with sliced filet mignon, onions, melted provolone and horseradish aioli.",
  },
  {
    id: "sweetbay-burger",
    name: "Sweetbay Burger",
    price: p(17),
    description: "Provolone cheese, lettuce, tomato, onions, pickles",
    tags: [],
    alt: "Sweetbay burger with provolone, lettuce, tomato, onions and pickles.",
  },
  wagyu,
];

/* ------------------------------------------------------------------ */
/* Drinks                                                               */
/* ------------------------------------------------------------------ */

export type Cocktail = {
  id: string;
  name: string;
  price: number;
  ingredients: string;
  featured?: boolean;
  alt: string;
};

export const cocktails: Cocktail[] = [
  {
    id: "gin-basil-smash",
    name: "Gin Basil Smash",
    price: 16,
    ingredients: "monkey 47 gin, lemon, basil, egg white foam",
    featured: true,
    alt: "Pale green Gin Basil Smash in a coupe under thick egg white foam with a basil leaf.",
  },
  {
    id: "smokeshow",
    name: "Smokeshow",
    price: 15,
    ingredients: "serrano pepper infused mezcal, lime, cilantro",
    alt: "Smokeshow mezcal cocktail on the rocks with lime, cilantro and a serrano slice.",
  },
  {
    id: "mango-margarita",
    name: "Mango Margarita",
    price: 16,
    ingredients: "milagro tequila, mango, cointreau, lemon, lime, tajin and sugar rim",
    alt: "Mango-orange margarita with a tajin and sugar rim.",
  },
  {
    id: "blue-cheese-dirty-martini",
    name: "Blue Cheese Dirty Martini",
    price: 15,
    ingredients: "reyka vodka, olive juice, blue cheese stuffed olives",
    alt: "Cloudy dirty martini with blue cheese stuffed olives on a pick.",
  },
  {
    id: "strawberry-vodka-mojito",
    name: "Strawberry Vodka Mojito",
    price: 15,
    ingredients: "strawberry infused vodka, mint, strawberries, lime, turbinado",
    alt: "Highball strawberry mojito with muddled strawberries, mint and lime.",
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    price: 15,
    ingredients: "tito’s vodka, vanilla vodka, Italian espresso, turbinado",
    featured: true,
    alt: "Espresso martini in a coupe with dense crema foam.",
  },
  {
    id: "smoked-rye-old-fashioned",
    name: "Smoked Rye Old Fashioned",
    price: 19,
    ingredients: "Hurst Knoll Rye by Rare Character, turbinado, house bitters blend, orange peel, luxardo cherry",
    featured: true,
    alt: "Smoked rye old fashioned in a rocks glass with a clear cube, orange peel, luxardo cherry and a wisp of smoke.",
  },
  {
    id: "burning-daylight",
    name: "Burning Daylight",
    price: 15,
    ingredients: "gray whale gin, cactus water, lemon, lime",
    alt: "Bright pale citrus Burning Daylight cocktail with lemon and lime.",
  },
  {
    id: "blackberry-smash",
    name: "Blackberry Smash",
    price: 17,
    ingredients: "Basil Hayden, blackberry, amaro, lemon, honey, basil",
    alt: "Deep purple Blackberry Smash over crushed ice with blackberries and basil.",
  },
  {
    id: "pear-martini",
    name: "Pear Martini",
    price: 15,
    ingredients: "pear infused vodka, lime, pear puree, turbinado, cinnamon sugar rim",
    alt: "Pale pear martini with a cinnamon sugar rim.",
  },
];

export const flightNote = "Ask about our Flight Offerings";

export type Beer = {
  id: string;
  name: string;
  price: number | null;
  details: string;
  /** Only set where the menu itself states a Maryland origin. */
  maryland?: boolean;
  image?: string;
};

export const beer = {
  title: "Beer",
  subtitle: "Draft",
  items: [
    { id: "sweetbay-radler", name: "Sweetbay Radler", price: 13, details: "beer cocktail containing lemon, titos, turbinado", image: "sweetbay-radler" },
    { id: "manor-hill-farm-fuzz", name: "Manor Hill Brewing, Farm Fuzz", price: 7, details: "Ellicott City, Maryland · Wheat Beer · 4.9%", maryland: true },
    { id: "calvert-in-my-64", name: "Calvert Brewing, In My ’64", price: 7, details: "Calvert, Maryland · American IPA · 6.4%", maryland: true },
    { id: "manor-hill-festbier", name: "Manor Hill Brewing, Festbier", price: 7, details: "Ellicott City, MD · Vienna Lager · 5.5% ABV", maryland: true },
    { id: "local-seasonal-draft", name: "Local Seasonal Draft", price: null, details: "Rotating fall options from DC, Maryland, and Virginia" },
    { id: "guinness", name: "Guinness", price: 10, details: "Ireland · 4.2% · 20oz" },
    { id: "modelo-especial", name: "Modelo, Especial", price: 7, details: "Mexico City, México · 4.5% ABV · Mexican Pilsner" },
    { id: "evolution-lot-no-3", name: "Evolution Brewing, Lot No 3", price: 8, details: "Salisbury, MD · 6.8% ABV · American IPA", maryland: true },
  ] satisfies Beer[],
  // TODO(hunter): confirm bottle list or remove. The live site shows an empty "Bottle" heading.
};

export type Wine = { id: string; name: string; origin: string; price: number };

export const wine: { group: string; items: Wine[] }[] = [
  {
    group: "Red",
    items: [
      { id: "oregon-territory-pinot-noir", name: "Oregon Territory, Pinot Noir", origin: "Oregon", price: 15 },
      { id: "allegrini-palazzo-della-torre", name: "Allegrini Palazzo della Torre", origin: "Italy", price: 14 },
      { id: "la-posta-paulucci-malbec", name: "La Posta Paulucci, Malbec", origin: "Argentina", price: 14 },
      { id: "the-calling-cabernet-sauvignon", name: "The Calling, Cabernet Sauvignon", origin: "Sonoma Valley", price: 18 },
    ],
  },
  {
    group: "White",
    items: [
      { id: "raw-bar-vinho-verde", name: "Raw Bar, Vinho Verde", origin: "Portugal", price: 8 },
      { id: "torresella-pinot-grigio", name: "Torresella, Pinot Grigio", origin: "Italy", price: 9 },
      { id: "laurenz-v-gruner-veltliner", name: "Laurenz V, Grüner Veltliner", origin: "Austria", price: 14 },
      { id: "harken-chardonnay", name: "Harken, Chardonnay", origin: "Napa Valley", price: 11 },
      { id: "whitehaven-sauvignon-blanc", name: "Whitehaven, Sauvignon Blanc", origin: "New Zealand", price: 12 },
    ],
  },
  {
    group: "Sparkling",
    items: [
      { id: "marques-de-caceres-cava-brut", name: "Marqués de Cáceres, Cava Brut", origin: "Spain", price: 11 },
      { id: "moet-mini-brut-champagne", name: "Moet Mini, Brut Champagne", origin: "France", price: 30 },
      { id: "la-marca-prosecco", name: "La Marca, Prosecco", origin: "Italy", price: 14 },
    ],
  },
  {
    group: "Rosé",
    items: [{ id: "fleurs-de-prairie", name: "Fleurs de Prairie", origin: "France", price: 10 }],
  },
];

/* ------------------------------------------------------------------ */
/* Notes + assembled menus                                              */
/* ------------------------------------------------------------------ */

export const menuNotes = [
  "Items labeled (cgf) can be prepared gluten free upon request",
  "Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness",
];

export type MenuKey = "dinner" | "lunch";

export const foodMenus: Record<MenuKey, { key: MenuKey; title: string; h1: string; categories: Category[] }> = {
  dinner: {
    key: "dinner",
    title: "Dinner",
    h1: "Dinner Menu",
    categories: [
      { id: "shareables", title: "Shareables", rail: "Shareables", banner: "shareables", items: shareables },
      { id: "soup-salad", title: "Soup & Salad", rail: "Soup & Salad", banner: "soup-salad", items: soupSalad, note: saladAddOns },
      { id: "entrees", title: "Entrées", rail: "Entrées", banner: "entrees", items: dinnerEntrees },
    ],
  },
  lunch: {
    key: "lunch",
    title: "Lunch",
    h1: "Lunch Menu",
    categories: [
      { id: "shareables", title: "Shareables", rail: "Shareables", banner: "shareables", items: shareables },
      { id: "soup-salad", title: "Soup & Salad", rail: "Soup & Salad", banner: "soup-salad", items: soupSalad, note: saladAddOns },
      { id: "entrees", title: "Entrées", rail: "Entrées", banner: "entrees", items: lunchEntrees },
    ],
  },
};

/** The six featured dishes and drinks with living loops (home "From the Kitchen" strip). */
export const kitchenStrip: { id: string; menu: MenuKey | "cocktails" }[] = [
  { id: "8oz-cab-filet-mignon", menu: "dinner" },
  { id: "pan-roasted-duck-breast", menu: "dinner" },
  { id: "oysters-cargot", menu: "dinner" },
  { id: "gin-basil-smash", menu: "cocktails" },
  { id: "smoked-rye-old-fashioned", menu: "cocktails" },
  { id: "espresso-martini", menu: "cocktails" },
];

export function findDish(id: string): Dish | undefined {
  for (const m of Object.values(foodMenus)) {
    for (const c of m.categories) {
      const d = c.items.find((i) => i.id === id);
      if (d) return d;
    }
  }
  return undefined;
}

export function findCocktail(id: string): Cocktail | undefined {
  return cocktails.find((c) => c.id === id);
}

export function formatPrice(price: Price): string {
  switch (price.kind) {
    case "single":
      return `$${price.amount}`;
    case "market":
      return "Market Price";
    case "options":
      return price.options.map((o) => `${o.label} $${o.amount}`).join(" / ");
    case "none":
      return "";
  }
}
