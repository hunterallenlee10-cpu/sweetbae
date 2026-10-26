/** Business facts and page copy. Verbatim from the live site unless marked as new microcopy. */

export const concept = process.env.NEXT_PUBLIC_CONCEPT !== "false";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://sweetbayrestaurant.com").replace(/\/$/, "");

export const business = {
  name: "Sweetbay Restaurant & Bar",
  street: "22680 Washington St",
  streetLong: "22680 Washington Street",
  city: "Leonardtown",
  region: "MD",
  postalCode: "20650",
  country: "US",
  phoneDisplay: "240.309.4148",
  phoneHref: "tel:+12403094148",
  phoneE164: "+12403094148",
  // From OpenStreetMap / Nominatim geocode of the street address.
  geo: { lat: 38.290607, lng: -76.636064 },
  reservations: "https://resy.com/cities/lnr/sweetbay-restaurant-and-bar",
  reservationsLabel: "Book your Sweetbay Restaurant and Bar reservation on Resy",
  giftCards: {
    purchase: { label: "Purchase a Card", href: "https://www.toasttab.com/sweetbay-restaurant-and-bar/giftcards" },
    balance: { label: "Check Balance", href: "https://www.toasttab.com/sweetbay-restaurant-and-bar/findcard" },
  },
  mapEmbed:
    "https://maps.google.com/maps?q=Sweetbay+Restaurant+%26+Bar%3Cbr%3E22680+Washington+Street%3Cbr%3ELeonardtown+MD++20650&t=m&z=15&output=embed&iwloc=near",
  mapEmbedClose:
    "https://maps.google.com/maps?q=Sweetbay+Restaurant%3Cbr%3E22680+Washington+Street%3Cbr%3ELeonardtown%2C+MD++20650&t=m&z=18&output=embed&iwloc=near",
  mapLink: "https://maps.google.com/?q=Sweetbay+Restaurant+%26+Bar,+22680+Washington+St,+Leonardtown,+MD+20650",
  largePartyPolicy:
    "To ensure the best experience for all our guests, we require a credit card to hold reservations for parties of five or more. A 20% gratuity will be added to your bill for larger groups. Thanks for your support—we can't wait to welcome you!",
  priceRange: "$$$",
  cuisine: "Modern American",
} as const;

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/sweetbaymd" },
  { label: "Facebook", href: "https://www.facebook.com/SweetbayMD" },
  { label: "Tripadvisor", href: "https://www.tripadvisor.com/Restaurant_Review-g41227-d20015391-Reviews-Sweetbay_Restaurant_Bar-Leonardtown_Maryland.html" },
  { label: "Yelp", href: "https://www.yelp.com/biz/sweetbay-restaurant-and-bar-leonardtown" },
];

export const seoTitle = "Upscale Restaurant Leonardtown MD | Sweetbay Restaurant & Bar";

/** Page titles follow the live site's "<Page> – <seoTitle>" pattern. */
export const pages = {
  home: {
    path: "/",
    title: seoTitle,
    description:
      "Modern American dining in Leonardtown, MD. Upscale cuisine, signature cocktails and a curated wine list on Washington Street. Reserve on Resy.",
  },
  dinner: {
    path: "/menus/dinner",
    title: `Dinner – ${seoTitle}`,
    h1: "Dinner Menu",
    description:
      "The Sweetbay dinner menu: shareables, soup and salad, entrées like pan roasted duck breast and C.A.B. filet mignon, signature cocktails, draft beer and wine by the glass.",
  },
  lunch: {
    path: "/menus/lunch",
    title: `Lunch – ${seoTitle}`,
    h1: "Lunch Menu",
    description:
      "The Sweetbay lunch menu: shareables, soup and salad, chicken piccata, sandwiches, burgers, signature cocktails, draft beer and wine by the glass.",
  },
  cocktails: {
    path: "/menus/signature-cocktails",
    title: `Signature Cocktails – ${seoTitle}`,
    h1: "Signature Cocktails Menu",
    description:
      "Signature cocktails, Maryland draft beer and wine by the glass at Sweetbay Restaurant & Bar in Leonardtown, MD.",
  },
  about: {
    path: "/about-us",
    title: `About Us – ${seoTitle}`,
    h1: "About Sweetbay Restaurant & Bar",
    description:
      "Sweetbay pairs a Washington DC restaurateur with St. Mary's County friends. The name comes from the sweetbay magnolia and nearby Breton Bay.",
  },
  restaurant: {
    path: "/the-restaurant",
    title: `The Restaurant – ${seoTitle}`,
    h1: "The Restaurant",
    description:
      "The dining room, the bar and the private wine room for up to 14 guests at Sweetbay Restaurant & Bar in Leonardtown, MD.",
  },
  contact: {
    path: "/contact-us",
    title: `Contact Us – ${seoTitle}`,
    h1: "Contact Us",
    description:
      "Sweetbay Restaurant & Bar, 22680 Washington St, Leonardtown, MD 20650. Call 240.309.4148, see kitchen hours, and reserve on Resy.",
  },
} as const;

export const copy = {
  h1: "Discover Modern American Dining in Leonardtown, MD",
  intro:
    "At Sweetbay, we blend upscale cuisine with a welcoming, casual atmosphere. Our table-side service is attentive yet relaxed, making each visit comfortable and enjoyable. Savor meticulously crafted dishes and cocktails that engage all your senses. Whether you're local or visiting from afar, we offer an ever-evolving dining experience that flows with the seasons. Reserve your table today and indulge in a culinary journey.",
  viewTheMenu: "View the Menu",
  dinnerCard:
    "Savor the evening with our upscale dinner menu, where each dish is a harmony of the finest ingredients expertly prepared to highlight bold flavors and refined techniques. Pair your meal with our thoughtfully curated wine selection or signature cocktails. Perfect for intimate evenings, celebratory occasions, or a simple night out.",
  lunchCard:
    "Elevate your midday meal with our carefully curated lunch menu, featuring high-quality ingredients and sophisticated flavors. Each dish is thoughtfully prepared to offer a balance of taste and simplicity, making it ideal for both casual lunches and business meetings. Pair with a refreshing drink for a truly delightful lunch experience.",
  exploreTitle: "Explore the Restaurant",
  homeSpaces: {
    dining: {
      title: "Dining Room",
      body: "Whether you're gathering with friends, hosting a business meal, or enjoying a romantic dinner, our main dining room offers the perfect setting. With upscale décor, warm ambiance, exceptional service, and a thoughtfully curated wine list, each visit promises to be memorable. Discover more about our inviting space and what makes dining with us truly special.",
    },
    bar: {
      title: "Bar",
      body: "At Sweetbay's bar, you're not just a guest—you’re part of the show. Enjoy full dinner service while watching our expert bartenders mix, muddle, and shake signature cocktails to perfection. Whether you're sipping a classic or exploring modern creations, the energy and artistry at the bar promise an unforgettable experience. Discover more about our bar scene and what makes it truly one-of-a-kind.",
    },
    wine: {
      title: "Wine Room",
      body: "For intimate celebrations, our private dining area offers an exclusive experience with seating for up to 14 guests. Enjoy personalized service, a dedicated server, private restroom, and even a television to enhance your event. Make your special occasion unforgettable in the elegant comfort of our wine room. Learn more about how we can elevate your celebration.",
    },
  },
  about: {
    intro:
      "Sweetbay Restaurant & Bar is the teaming of a Washington DC restaurateur and a group of St. Mary’s County friends who wanted to provide a catalyst to Leonardtown’s ongoing revitalization efforts through the development of a great neighborhood restaurant.",
    nameTitle: "About Our Name",
    name:
      "The name “Sweetbay” is the clever connection between one of the restaurateur’s DC restaurants (Magnolia Kitchen & Bar) and our local flora. “Sweetbay” is the species of Magnolia most often found in Southern Maryland. Our restaurant name is a double entendre with reference to the DC restaurant and our much loved nearby Breton Bay.",
  },
  experience: {
    dining: {
      title: "The Dining Room",
      body: "Our main dining room has a stylish yet relaxed vibe, making it the perfect spot for a great meal with good company. The décor strikes a balance between sophistication and comfort, with warm lighting and thoughtfully placed accents that make the space feel welcoming. Local artwork celebrates the creative energy of the community. Whether guests are settling into cozy booths, grabbing a seat at the bar, or gathering around a larger table, there's a space for every kind of dining experience.",
    },
    bar: {
      title: "The Bar",
      body: "Grab a drink while waiting for your reservation, or enjoy a meal with selected friends. Our expert bartenders will make your time at Sweetbay memorable!",
      note: "Bar seats are available first come first serve.",
    },
    wine: {
      title: "The Wine Room",
      body: "The perfect place for an intimate gathering of up to 14. The wine room provides a private space, complete with restroom and television for presentations. Reservations and a credit card deposit are required, and we have a minimum spend for your meal service. Call for details.",
    },
  },
  cocktailsIntro:
    "Step into our world of refined flavors with a cocktail menu that’s as dynamic and creative as our modern American dishes. From classic favorites to bold new creations, our premium cocktails are designed to engage your senses and enhance your dining experience. Let our expert bartenders guide you through a selection that’s always evolving, just like the seasons themselves. Cheers to unforgettable evenings.",
  contactTitle: "Contact Us",
} as const;

/** New microcopy (short, warm, specific; no em dashes). */
export const micro = {
  reserve: "Reserve",
  reserveTable: "Reserve a table",
  viewMenu: "View the Menu",
  call: "Call",
  menu: "Menu",
  reserveToTry: "Reserve to try it",
  callWineRoom: "Call to book the Wine Room",
  callDetails: "Call for details",
  giveTitle: "Give Sweetbay",
  giveBody: "Share a night at Sweetbay with someone you love. Cards are sold and checked through Toast.",
  aboutLink: "Read our story",
  experienceLink: "See the spaces",
  loadMap: "Load the map",
  directions: "Get directions",
  conceptFooter: "Concept by Lee Enterprises Unlimited",
  conceptPhoto: "Dish photography is AI-generated concept imagery.",
  conceptFootage: "Concept footage: replace with real drone footage before launch.",
};

export const nav = {
  menus: [
    { label: "Dinner", href: "/menus/dinner" },
    { label: "Lunch", href: "/menus/lunch" },
    { label: "Signature Cocktails", href: "/menus/signature-cocktails" },
  ],
  links: [
    { label: "About", href: "/about-us" },
    { label: "Experience", href: "/the-restaurant" },
    { label: "Contact", href: "/contact-us" },
  ],
};
