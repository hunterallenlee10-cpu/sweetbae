import type { Metadata } from "next";
import { CocktailsExperience } from "@/components/cocktails/CocktailsExperience";
import { SetTheme } from "@/components/shell/theme";
import { pages } from "@/content/site";

export const metadata: Metadata = {
  title: pages.cocktails.title,
  description: pages.cocktails.description,
  alternates: { canonical: pages.cocktails.path },
  openGraph: { title: pages.cocktails.title, description: pages.cocktails.description, url: pages.cocktails.path },
};

export default function CocktailsPage() {
  return (
    <>
      <SetTheme theme="night" />
      <CocktailsExperience />
    </>
  );
}
