"use client";

import { motion } from "motion/react";
import type { Price } from "@/content/menu";
import { formatPrice } from "@/content/menu";
import { easeOut } from "@/lib/motion";

/** Rolling-digit price. Single prices roll digit by digit when they change ($26 to $22). */
export function RollingPrice({ price, className = "" }: { price: Price; className?: string }) {
  if (price.kind !== "single") {
    return <span className={`tabular ${className}`}>{formatPrice(price)}</span>;
  }
  const digits = String(price.amount).split("");
  return (
    <span className={`tabular inline-flex items-start leading-[1.15em] ${className}`}>
      <span className="sr-only">{formatPrice(price)}</span>
      <span aria-hidden className="block h-[1.15em] leading-[1.15em]">$</span>
      {digits.map((d, i) => (
        <span key={`${digits.length}-${i}`} aria-hidden className="relative block h-[1.15em] w-[0.62em] overflow-hidden">
          <motion.span
            className="absolute left-0 top-0 flex flex-col"
            initial={false}
            animate={{ y: `${-Number(d) * 1.15}em` }}
            transition={{ duration: 0.9, ease: easeOut, delay: i * 0.06 }}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} className="block h-[1.15em] leading-[1.15em]">
                {n}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
