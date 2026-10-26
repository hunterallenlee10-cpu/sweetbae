import { type Cocktail, type Dish, formatPrice, type Price, type Tag } from "@/content/menu";
import { hasLoop } from "@/lib/media";

/** A row in any menu list, normalized from dishes and cocktails. */
export type MenuRow = {
  id: string;
  name: string;
  description: string;
  price: Price;
  priceLabel: string;
  tags: Tag[];
  image: string;
  alt: string;
  loop: boolean;
  kind: "dish" | "cocktail";
};

export function fromDish(d: Dish): MenuRow {
  const image = d.image ?? d.id;
  return {
    id: d.id,
    name: d.name,
    description: d.description,
    price: d.price,
    priceLabel: formatPrice(d.price),
    tags: d.tags,
    image,
    alt: d.alt,
    loop: Boolean(d.featured) && hasLoop(image),
    kind: "dish",
  };
}

export function fromCocktail(c: Cocktail): MenuRow {
  const price: Price = { kind: "single", amount: c.price };
  return {
    id: c.id,
    name: c.name,
    description: c.ingredients,
    price,
    priceLabel: formatPrice(price),
    tags: [],
    image: c.id,
    alt: c.alt,
    loop: Boolean(c.featured) && hasLoop(c.id),
    kind: "cocktail",
  };
}

export const tagLabel: Record<Tag, string> = { gf: "Gluten free", cgf: "Can be gluten free" };
