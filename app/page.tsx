import type { Metadata } from "next";
import { ExploreStack } from "@/components/home/ExploreStack";
import { GiftBand } from "@/components/home/GiftBand";
import { Hero } from "@/components/home/Hero";
import { KitchenStrip } from "@/components/home/KitchenStrip";
import { MenuPanels } from "@/components/home/MenuPanels";
import { Reviews } from "@/components/home/Reviews";
import { TheName } from "@/components/home/TheName";
import { Welcome } from "@/components/home/Welcome";
import { SetTheme } from "@/components/shell/theme";
import { Visit } from "@/components/visit/Visit";
import { pages } from "@/content/site";

export const metadata: Metadata = {
  title: pages.home.title,
  description: pages.home.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <SetTheme theme="night" heroTone="night" />
      <Hero />
      <Welcome />
      <KitchenStrip />
      <MenuPanels />
      <Reviews />
      <ExploreStack />
      <TheName />
      <GiftBand />
      <Visit />
    </>
  );
}
