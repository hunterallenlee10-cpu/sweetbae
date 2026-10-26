"use client";

import { AnimatePresence, motion } from "motion/react";
import { Loop } from "@/components/ui/Loop";
import { MenuPicture } from "@/components/ui/MenuPicture";
import { easeOut } from "@/lib/motion";
import type { MenuRow } from "./items";

/** Sticky 4:5 stage. New plates wipe up from the bottom with a 1.04 to 1.0 scale settle. */
export function PlateStage({ item }: { item: MenuRow | undefined }) {
  return (
    <div className="sticky top-[calc(var(--nav-condensed)+72px)] hidden lg:block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-[color:var(--bg-raised)]">
        <AnimatePresence initial={false}>
          {item && (
            <motion.div
              key={item.image}
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.04 }}
              animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
              exit={{ opacity: 1, transition: { duration: 0.9 } }}
              transition={{ duration: 0.9, ease: easeOut }}
            >
              <MenuPicture slug={item.image} alt={item.alt} sizes="(min-width: 1024px) 42vw, 1px" />
              {item.loop && <Loop slug={item.image} />}
            </motion.div>
          )}
        </AnimatePresence>
        <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_var(--line-soft)]" />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={item?.id}
          className="mt-4 text-[13px] tracking-[0.04em] text-[color:var(--fg-faint)]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {item?.name}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
