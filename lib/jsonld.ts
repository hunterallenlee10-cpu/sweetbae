import { hours } from "@/content/hours";
import { cocktails, foodMenus, type Price } from "@/content/menu";
import { business, siteUrl, social } from "@/content/site";

function offers(price: Price) {
  if (price.kind === "single") return { "@type": "Offer", price: price.amount.toFixed(2), priceCurrency: "USD" };
  if (price.kind === "options")
    return price.options.map((o) => ({ "@type": "Offer", name: o.label, price: o.amount.toFixed(2), priceCurrency: "USD" }));
  return undefined;
}

function menuSchema(key: "dinner" | "lunch") {
  const m = foodMenus[key];
  return {
    "@type": "Menu",
    "@id": `${siteUrl}/menus/${key}#menu`,
    name: m.h1,
    url: `${siteUrl}/menus/${key}`,
    hasMenuSection: [
      ...m.categories.map((c) => ({
        "@type": "MenuSection",
        name: c.title,
        hasMenuItem: c.items.map((i) => ({
          "@type": "MenuItem",
          name: i.name,
          description: i.description,
          url: `${siteUrl}/menus/${key}#${i.id}`,
          ...(offers(i.price) ? { offers: offers(i.price) } : {}),
          ...(i.tags.includes("gf") ? { suitableForDiet: "https://schema.org/GlutenFreeDiet" } : {}),
        })),
      })),
      {
        "@type": "MenuSection",
        name: "Signature Cocktails",
        hasMenuItem: cocktails.map((c) => ({
          "@type": "MenuItem",
          name: c.name,
          description: c.ingredients,
          offers: { "@type": "Offer", price: c.price.toFixed(2), priceCurrency: "USD" },
        })),
      },
    ],
  };
}

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: business.name,
    url: siteUrl,
    image: [`${siteUrl}/og.jpg`, `${siteUrl}/real/Sweetbay-outside-street-scene-1.jpg`],
    logo: `${siteUrl}/brand/Sweetbay_Logo_BlackMagic.svg`,
    telephone: business.phoneE164,
    priceRange: business.priceRange,
    servesCuisine: business.cuisine,
    acceptsReservations: business.reservations,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.mapLink,
    sameAs: social.map((s) => s.href),
    openingHoursSpecification: hours
      .filter((h) => h.open !== null && h.close !== null)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.schema,
        opens: `${String(Math.floor(h.open! / 60)).padStart(2, "0")}:${String(h.open! % 60).padStart(2, "0")}`,
        closes: `${String(Math.floor(h.close! / 60)).padStart(2, "0")}:${String(h.close! % 60).padStart(2, "0")}`,
      })),
    hasMenu: [menuSchema("dinner"), menuSchema("lunch")],
  };
}
