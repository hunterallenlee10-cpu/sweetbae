"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { MagnoliaIcon } from "@/components/brand/Logo";
import { business, micro, nav } from "@/content/site";
import { easeOut } from "@/lib/motion";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { lockScroll } from "./SmoothScroll";
import { StatusChip } from "./StatusChip";

const links = [
  { label: "Home", href: "/" },
  ...nav.menus,
  ...nav.links,
];

export function MobileOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-theme="night"
          className="fixed inset-0 z-[60] flex flex-col bg-[color:var(--ink)] text-[color:var(--cream)] lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <div className="wrap flex items-center justify-between py-4">
            <MagnoliaIcon className="h-7 w-auto text-[color:var(--brass)]" />
            <button type="button" onClick={onClose} className="flex h-11 items-center gap-3 text-[13px] uppercase tracking-[0.16em]">
              Close
              <span aria-hidden className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav aria-label="Mobile" className="wrap flex-1 overflow-y-auto pb-6 pt-4">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.7, ease: easeOut }}
                >
                  <Link href={l.href} onClick={onClose} className="font-display block py-1.5 text-[clamp(34px,10vw,52px)] font-light leading-[1.1]">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-8 border-t border-[color:var(--line-soft)] pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="eyebrow mb-3">Gift Cards</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                <a href={business.giftCards.purchase.href} target="_blank" rel="noopener" className="link-underline">
                  {business.giftCards.purchase.label}
                </a>
                <a href={business.giftCards.balance.href} target="_blank" rel="noopener" className="link-underline">
                  {business.giftCards.balance.label}
                </a>
              </div>
              <div className="mt-6">
                <StatusChip />
              </div>
            </motion.div>
          </nav>

          <div className="wrap grid grid-cols-2 gap-3 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3">
            <a href={business.reservations} target="_blank" rel="noopener" className="btn btn-cream">
              {micro.reserve}
            </a>
            <a href={business.phoneHref} className="btn btn-ghost">
              {micro.call} {business.phoneDisplay}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
