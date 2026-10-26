"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/shell/theme";
import { cocktails, flightNote, foodMenus, menuNotes, type MenuKey, type Tag } from "@/content/menu";
import { concept, micro, pages } from "@/content/site";
import { easeOut } from "@/lib/motion";
import { CategoryOpener } from "./CategoryOpener";
import { DishSheet } from "./DishSheet";
import { BeerList, WineList } from "./DrinkLists";
import { fromCocktail, fromDish, type MenuRow, tagLabel } from "./items";
import { ItemRow } from "./ItemRow";
import { PlateStage } from "./PlateStage";

type Section = { id: string; title: string; rail: string; banner?: string; bannerAlt: string; rows: MenuRow[]; note?: string; filterable: boolean };

const RAIL_EXTRA = [
  { id: "draft", rail: "Draft" },
  { id: "wine", rail: "Wine" },
];

function useSections(menu: MenuKey): Section[] {
  return useMemo(() => {
    const food = foodMenus[menu].categories.map((c) => ({
      id: c.id,
      title: c.title,
      rail: c.rail,
      banner: c.banner ? `banner-${c.banner}` : undefined,
      bannerAlt: `A table spread of Sweetbay ${c.title.toLowerCase()} on dark oak.`,
      rows: c.items.map(fromDish),
      note: c.note,
      filterable: true,
    }));
    return [
      ...food,
      {
        id: "cocktails",
        title: "Signature Cocktails",
        rail: "Cocktails",
        banner: "banner-cocktails",
        bannerAlt: "Sweetbay signature cocktails in a row on the black marble bar.",
        rows: cocktails.map(fromCocktail),
        note: flightNote,
        filterable: false,
      },
    ];
  }, [menu]);
}

/** Switches Dinner/Lunch in place: theme morphs Night/Day, URL updates without a reload. */
function Switcher({ menu, onSwitch }: { menu: MenuKey; onSwitch: (m: MenuKey) => void }) {
  const tabs: { key: MenuKey | "cocktails"; label: string }[] = [
    { key: "dinner", label: "Dinner" },
    { key: "lunch", label: "Lunch" },
    { key: "cocktails", label: "Cocktails & Wine" },
  ];
  return (
    <LayoutGroup id="menu-switcher">
      <div role="tablist" aria-label="Choose a menu" className="inline-flex rounded-full border border-[color:var(--line)] p-1">
        {tabs.map((t) => {
          const active = t.key === menu;
          const cls = `relative z-0 flex h-11 items-center rounded-full px-5 text-[14.5px] transition-colors duration-500 ${active ? "text-[color:var(--btn-fg)]" : "text-[color:var(--fg)] hover:opacity-100 opacity-80"}`;
          const pill = active && (
            <motion.span layoutId="menu-pill" className="absolute inset-0 -z-10 rounded-full bg-[color:var(--btn-bg)]" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
          );
          return t.key === "cocktails" ? (
            <Link key={t.key} href="/menus/signature-cocktails" className={cls}>
              {t.label}
            </Link>
          ) : (
            <button key={t.key} type="button" role="tab" aria-selected={active} className={cls} onClick={() => onSwitch(t.key as MenuKey)}>
              {pill}
              {t.label}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function DietChips({ filter, toggle }: { filter: Set<Tag>; toggle: (t: Tag) => void }) {
  return (
    <div className="flex flex-nowrap items-center gap-2" role="group" aria-label="Dietary filters">
      {(["gf", "cgf"] as Tag[]).map((t) => {
        const on = filter.has(t);
        return (
          <button
            key={t}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(t)}
            className={`flex h-10 items-center gap-2 rounded-full border px-3.5 text-[13px] sm:px-4 sm:text-[13.5px] transition-colors duration-300 ${
              on ? "border-[color:var(--tag-line)] bg-[color:var(--tag-bg)] text-[color:var(--tag-fg)]" : "border-[color:var(--line-soft)] text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]"
            }`}
          >
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${on ? "bg-current" : "border border-current"}`} />
            {tagLabel[t]}
            <span className="hidden text-[11px] uppercase tracking-[0.08em] opacity-70 sm:inline">({t})</span>
          </button>
        );
      })}
    </div>
  );
}

function CategoryRail({ items, active }: { items: { id: string; rail: string }[]; active: string }) {
  const go = (id: string) => {
    const el = document.getElementById(`sec-${id}`);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -120 });
    else el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav aria-label="Menu sections" className="no-print sticky top-[var(--nav-condensed)] z-30 border-y border-[color:var(--line-soft)] bg-[color:var(--bg)]/92 backdrop-blur-md">
      <LayoutGroup id="rail">
        <ul className="wrap no-scrollbar flex gap-7 overflow-x-auto">
          {items.map((i) => (
            <li key={i.id} className="shrink-0">
              <button
                type="button"
                onClick={() => go(i.id)}
                aria-current={active === i.id ? "true" : undefined}
                className={`relative flex h-12 items-center text-[14px] transition-opacity ${active === i.id ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
              >
                {i.rail}
                {active === i.id && <motion.span layoutId="rail-line" className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--accent-text)]" />}
              </button>
            </li>
          ))}
        </ul>
      </LayoutGroup>
    </nav>
  );
}

function CategoryBlock({
  section,
  filter,
  onOpen,
}: {
  section: Section;
  filter: Set<Tag>;
  onOpen: (sectionId: string, index: number) => void;
}) {
  const [activeId, setActiveId] = useState<string | undefined>(section.rows[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);
  const activeItem = section.rows.find((r) => r.id === activeId) ?? section.rows[0];
  const matches = (r: MenuRow) => !section.filterable || filter.size === 0 || r.tags.some((t) => filter.has(t));

  // The row crossing the viewport center drives the stage.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveId((e.target as HTMLElement).dataset.id);
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    list.querySelectorAll("li[data-id]").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, [section.rows]);

  return (
    <section id={`sec-${section.id}`} aria-labelledby={`h-${section.id}`} className="scroll-mt-[120px]">
      <div className="no-print">
        <CategoryOpener title={section.title} banner={section.banner} alt={section.bannerAlt} />
      </div>
      <h2 id={`h-${section.id}`} className="print-only font-display text-2xl">
        {section.title}
      </h2>
      <div className="wrap grid gap-x-16 py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-20">
        <PlateStage item={activeItem} />
        <div>
          <ul ref={listRef} className="print-columns divide-y divide-[color:var(--line-soft)]">
            <AnimatePresence initial={false}>
              {section.rows.map((r, i) => (
                <ItemRow
                  key={r.id}
                  item={r}
                  dimmed={!matches(r)}
                  active={r.id === activeItem?.id}
                  onHover={() => setActiveId(r.id)}
                  onOpen={() => onOpen(section.id, i)}
                />
              ))}
            </AnimatePresence>
          </ul>
          {section.note && <p className="mt-8 text-[14.5px] italic text-[color:var(--fg-muted)]">{section.note}</p>}
        </div>
      </div>
    </section>
  );
}

export function MenuExperience({ initial }: { initial: MenuKey }) {
  const pathname = usePathname();
  const menu: MenuKey = pathname?.endsWith("/lunch") ? "lunch" : pathname?.endsWith("/dinner") ? "dinner" : initial;
  const { setTheme } = useTheme();
  const sections = useSections(menu);
  const [filter, setFilter] = useState<Set<Tag>>(new Set());
  const [sheet, setSheet] = useState<{ section: string; index: number } | null>(null);
  const [railActive, setRailActive] = useState("shareables");

  // Mobile: cards snap gently as you scroll the menu.
  useEffect(() => {
    document.documentElement.classList.add("menu-snap");
    return () => document.documentElement.classList.remove("menu-snap");
  }, []);

  useEffect(() => {
    setTheme(menu === "lunch" ? "day" : "night");
    document.title = menu === "lunch" ? pages.lunch.title : pages.dinner.title;
  }, [menu, setTheme]);

  const onSwitch = useCallback(
    (m: MenuKey) => {
      if (m === menu) return;
      window.history.pushState(null, "", `/menus/${m}`);
    },
    [menu],
  );

  const toggle = (t: Tag) =>
    setFilter((f) => {
      const n = new Set(f);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });

  // Deep links: /menus/dinner#pan-roasted-duck-breast opens the sheet directly.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      for (const s of sections) {
        const i = s.rows.findIndex((r) => r.id === id);
        if (i >= 0) {
          setSheet({ section: s.id, index: i });
          return;
        }
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sheetSection = sheet ? sections.find((s) => s.id === sheet.section) : undefined;
  const openSheet = (section: string, index: number) => {
    setSheet({ section, index });
    const s = sections.find((x) => x.id === section);
    if (s) window.history.replaceState(window.history.state, "", `${location.pathname}#${s.rows[index].id}`);
  };
  const closeSheet = useCallback(() => {
    setSheet(null);
    window.history.replaceState(window.history.state, "", location.pathname);
  }, []);
  const setIndex = useCallback(
    (i: number) => {
      setSheet((s) => {
        if (!s) return s;
        const sec = sections.find((x) => x.id === s.section);
        if (sec) window.history.replaceState(window.history.state, "", `${location.pathname}#${sec.rows[i].id}`);
        return { ...s, index: i };
      });
    },
    [sections],
  );

  // Rail follows the section in view.
  useEffect(() => {
    const ids = [...sections.map((s) => s.id), ...RAIL_EXTRA.map((r) => r.id)];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setRailActive(e.target.id.replace("sec-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(`sec-${id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  const railItems = [...sections.map((s) => ({ id: s.id, rail: s.rail })), ...RAIL_EXTRA];
  const h1 = foodMenus[menu].h1;

  return (
    <div className="theme-surface">
      <header className="wrap pb-10 pt-[calc(var(--nav-h)+56px)] lg:pb-14 lg:pt-[calc(var(--nav-h)+88px)]">
        <p className="eyebrow mb-4">Sweetbay Restaurant &amp; Bar</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={h1}
            className="display-xl"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            {menu === "lunch" ? "Lunch" : "Dinner"} <span className="em">Menu</span>
          </motion.h1>
        </AnimatePresence>
        <div className="no-print mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <Switcher menu={menu} onSwitch={onSwitch} />
          <DietChips filter={filter} toggle={toggle} />
        </div>
      </header>

      <CategoryRail items={railItems} active={railActive} />

      {sections.map((s) => (
        <CategoryBlock key={s.id} section={s} filter={filter} onOpen={openSheet} />
      ))}

      <section aria-label="Beer and wine" className="no-print-break">
        <div className="no-print">
          <CategoryOpener title="Wine & Beer" banner="wine-and-beer" alt="Red, white and sparkling wine glasses on the black marble bar." />
        </div>
        <div className="wrap grid gap-16 py-16 lg:grid-cols-12 lg:py-24">
          <div id="sec-draft" className="scroll-mt-[120px] lg:col-span-5">
            <BeerList />
          </div>
          <div id="sec-wine" className="scroll-mt-[120px] lg:col-span-7">
            <WineList />
          </div>
        </div>
      </section>

      <div className="wrap border-t border-[color:var(--line-soft)] py-12 text-[14px] text-[color:var(--fg-muted)]">
        {menuNotes.map((n) => (
          <p key={n} className="mt-2 first:mt-0">
            {n}
          </p>
        ))}
        {concept && <p className="no-print mt-6 text-[12.5px] text-[color:var(--fg-faint)]">{micro.conceptPhoto}</p>}
      </div>

      <DishSheet
        items={sheetSection?.rows ?? []}
        index={sheet?.index ?? null}
        category={sheetSection?.title ?? ""}
        onClose={closeSheet}
        onIndex={setIndex}
      />
    </div>
  );
}
