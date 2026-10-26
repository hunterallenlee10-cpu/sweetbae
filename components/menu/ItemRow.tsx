"use client";

import { AnimatePresence, motion } from "motion/react";
import { forwardRef } from "react";
import { MenuPicture } from "@/components/ui/MenuPicture";
import { easeOut } from "@/lib/motion";
import { type MenuRow, tagLabel } from "./items";
import { RollingPrice } from "./RollingPrice";

type Props = {
  item: MenuRow;
  dimmed: boolean;
  active: boolean;
  onOpen: () => void;
  onHover: () => void;
};

/** Typographic menu row: Fraunces name, brass hairline leader to the price, description, tags. Mobile: 4:5 card. */
export const ItemRow = forwardRef<HTMLLIElement, Props>(function ItemRow({ item, dimmed, active, onOpen, onHover }, ref) {
  return (
    <motion.li
      ref={ref}
      id={item.id}
      data-id={item.id}
      layout="position"
      initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
      animate={{ opacity: dimmed ? 0.25 : 1, height: "auto", filter: "blur(0px)" }}
      exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="print-avoid scroll-mt-[160px] max-lg:snap-start"
    >
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={onHover}
        onFocus={onHover}
        aria-haspopup="dialog"
        className="group block w-full py-6 text-left lg:py-7"
      >
        <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden bg-[color:var(--bg-raised)] lg:hidden">
          <MenuPicture slug={item.image} alt={item.alt} sizes="100vw" />
        </div>
        <div className="flex items-baseline gap-4">
          <h3
            className={`font-display text-[clamp(22px,2vw,28px)] font-[360] leading-tight transition-colors duration-500 ${active ? "text-[color:var(--fg)]" : "text-[color:var(--fg)]/90"}`}
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {item.name}
            </span>
          </h3>
          <span aria-hidden className="mb-[0.35em] h-px min-w-6 flex-1 bg-[color:var(--line)]" />
          <RollingPrice price={item.price} className="shrink-0 text-[17px] text-[color:var(--accent-text)]" />
        </div>
        <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${dimmed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]"}`}>
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={item.description}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
                className="body-copy mt-2"
              >
                {item.description}
              </motion.p>
            </AnimatePresence>
            {item.tags.length > 0 && (
              <div className="mt-3 flex gap-2">
                {item.tags.map((t) => (
                  <span key={t} className="tag" title={tagLabel[t]}>
                    {t}
                    <span className="sr-only"> ({tagLabel[t]})</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </button>
    </motion.li>
  );
});
