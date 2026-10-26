"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { business, micro, nav } from "@/content/site";
import { MobileOverlay } from "./MobileOverlay";
import { StatusChip } from "./StatusChip";

type DropdownItem = { label: string; href: string; external?: boolean };

function Dropdown({ label, items, active }: { label: string; items: DropdownItem[]; active?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = `dd-${label.toLowerCase().replace(/\s+/g, "-")}`;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 py-2 text-[14.5px] transition-opacity hover:opacity-100 ${active ? "opacity-100" : "opacity-80"}`}
      >
        {label}
        <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>
      <div
        id={id}
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-300 ${open ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"}`}
      >
        <ul className="min-w-56 rounded-xl border border-[color:var(--line-soft)] bg-[color:var(--bg-raised)] p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
          {items.map((it) => (
            <li key={it.href}>
              {it.external ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener"
                  className="block rounded-lg px-3 py-2.5 text-[14.5px] text-[color:var(--fg)] hover:bg-[color:var(--line-soft)]"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                  <span className="sr-only"> (opens Toast in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={it.href}
                  className="block rounded-lg px-3 py-2.5 text-[14.5px] text-[color:var(--fg)] hover:bg-[color:var(--line-soft)]"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [heroTone, setHeroTone] = useState<string | undefined>();
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const read = () => setHeroTone(document.documentElement.dataset.heroTone);
    read();
    window.addEventListener("sb:herotone", read);
    return () => window.removeEventListener("sb:herotone", read);
  }, []);

  useEffect(() => setOverlay(false), [pathname]);

  const tone = !scrolled && heroTone ? heroTone : undefined;
  const giftItems = [
    { ...business.giftCards.purchase, external: true },
    { ...business.giftCards.balance, external: true },
  ];

  return (
    <>
      <header
        data-theme={tone}
        className={`no-print fixed inset-x-0 top-0 z-50 text-[color:var(--fg)] transition-[background-color,box-shadow,padding,border-color] duration-500 ${
          scrolled
            ? "border-b border-[color:var(--line-soft)] bg-[color:var(--bg)]/92 py-2 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-4"
        }`}
        style={tone ? { background: "transparent" } : undefined}
      >
        <nav aria-label="Main" className="wrap flex items-center justify-between gap-6">
          <Link href="/" aria-label="Sweetbay Restaurant & Bar, home" className="shrink-0">
            <Logo className={`w-auto transition-all duration-500 ${scrolled ? "h-9" : "h-11 lg:h-12"}`} />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <Link href="/" className={`text-[14.5px] ${pathname === "/" ? "opacity-100" : "opacity-80 hover:opacity-100"}`}>
              Home
            </Link>
            <Dropdown label="Menus" items={nav.menus} active={pathname.startsWith("/menus")} />
            {nav.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`text-[14.5px] ${pathname === l.href ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
              >
                {l.label}
              </Link>
            ))}
            <Dropdown label="Gift Cards" items={giftItems} />
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <StatusChip className="hidden xl:inline-flex" />
            <a href={business.phoneHref} className="tabular text-[14.5px] opacity-85 hover:opacity-100">
              {business.phoneDisplay}
            </a>
            <a
              href={business.reservations}
              target="_blank"
              rel="noopener"
              aria-label={`${micro.reserve}: ${business.reservationsLabel}`}
              className="btn btn-solid min-h-11 px-6"
            >
              {micro.reserve}
            </a>
          </div>

          <button
            type="button"
            className="flex h-11 items-center gap-3 lg:hidden"
            aria-expanded={overlay}
            aria-controls="mobile-overlay"
            onClick={() => setOverlay(true)}
          >
            <span className="text-[13px] uppercase tracking-[0.16em]">Menu</span>
            <span className="flex w-7 flex-col gap-[7px]" aria-hidden>
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 self-end bg-current" />
            </span>
            <span className="sr-only">Open navigation</span>
          </button>
        </nav>
      </header>
      <MobileOverlay open={overlay} onClose={() => setOverlay(false)} />
    </>
  );
}
