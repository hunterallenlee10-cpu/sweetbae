import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuExperience } from "@/components/menu/MenuExperience";
import type { MenuKey } from "@/content/menu";
import { pages } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ menu: "dinner" }, { menu: "lunch" }];
}

export async function generateMetadata({ params }: { params: Promise<{ menu: string }> }): Promise<Metadata> {
  const { menu } = await params;
  const p = menu === "lunch" ? pages.lunch : pages.dinner;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path },
  };
}

export default async function MenuPage({ params }: { params: Promise<{ menu: string }> }) {
  const { menu } = await params;
  if (menu !== "dinner" && menu !== "lunch") notFound();
  return <MenuExperience initial={menu as MenuKey} />;
}
