"use client";

import { AnimatePresence, motion, useDragControls } from "motion/react";
import { useEffect, useRef } from "react";
import { lockScroll } from "@/components/shell/SmoothScroll";
import { Loop } from "@/components/ui/Loop";
import { MenuPicture } from "@/components/ui/MenuPicture";
import { business, micro } from "@/content/site";
import { easeOut } from "@/lib/motion";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { type MenuRow, tagLabel } from "./items";
import { RollingPrice } from "./RollingPrice";

type Props = {
  items: MenuRow[];
  index: number | null;
  category: string;
  onClose: () => void;
  onIndex: (i: number) => void;
};

/** Full-screen dish sheet: image or loop, details, Reserve, prev/next, Esc or swipe down to close. */
export function DishSheet({ items, index, category, onClose, onIndex }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useDragControls();
  const open = index !== null && items[index] !== undefined;
  const item = open ? items[index!] : null;
  useFocusTrap(ref, open, onClose);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex((index! + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index! - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onIndex]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="sheet"
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          className="fixed inset-0 z-[80] flex flex-col bg-[color:var(--bg)] text-[color:var(--fg)] lg:flex-row"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 0.7, ease: easeOut }}
          drag="y"
          dragControls={drag}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 120 || info.velocity.y > 600) onClose();
          }}
        >
          <div
            className="relative aspect-[4/5] w-full shrink-0 touch-none overflow-hidden max-lg:max-h-[56svh] lg:aspect-auto lg:h-full lg:w-1/2 lg:touch-auto"
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") drag.start(e);
            }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={item.image}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.04 }}
                animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                exit={{ opacity: 1, transition: { duration: 0.8 } }}
                transition={{ duration: 0.9, ease: easeOut }}
              >
                <MenuPicture slug={item.image} alt={item.alt} sizes="(min-width: 1024px) 50vw, 100vw" priority />
                {item.loop && <Loop slug={item.image} />}
              </motion.div>
            </AnimatePresence>
            <span aria-hidden className="absolute left-1/2 top-3 h-1 w-10 -translate-x-1/2 rounded-full bg-[color:var(--cream)]/60 lg:hidden" />
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-[var(--gutter)] pb-[calc(24px+env(safe-area-inset-bottom))] pt-6 lg:justify-center lg:px-16 lg:py-16">
            <div className="flex items-center justify-between">
              <p className="eyebrow">
                {category} · {index! + 1} / {items.length}
              </p>
              <button type="button" onClick={onClose} className="flex h-11 items-center gap-2 text-[13px] uppercase tracking-[0.16em]">
                Close
                <span aria-hidden className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: easeOut }}
                className="mt-6 lg:mt-10"
              >
                <h2 id="sheet-title" className="display-md outline-none" tabIndex={-1} data-autofocus>
                  {item.name}
                </h2>
                <div className="mt-4 flex items-center gap-3 text-[18px] text-[color:var(--accent-text)]">
                  <RollingPrice price={item.price} />
                  {item.tags.map((t) => (
                    <span key={t} className="tag" title={tagLabel[t]}>
                      {t}
                      <span className="sr-only"> ({tagLabel[t]})</span>
                    </span>
                  ))}
                </div>
                <p className="body-copy mt-5 text-[17px]">{item.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={business.reservations} target="_blank" rel="noopener" className="btn btn-solid">
                {micro.reserveToTry}
              </a>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  aria-label="Previous dish"
                  onClick={() => onIndex((index! - 1 + items.length) % items.length)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--line)] hover:border-[color:var(--fg)]"
                >
                  <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
                    <path d="M6 1L1 6l5 5M1 6h14" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next dish"
                  onClick={() => onIndex((index! + 1) % items.length)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--line)] hover:border-[color:var(--fg)]"
                >
                  <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
                    <path d="M10 1l5 5-5 5M15 6H1" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
