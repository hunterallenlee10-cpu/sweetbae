"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Price } from "@/content/menu";
import { formatPrice } from "@/content/menu";
import { easeOut } from "@/lib/motion";

/**
 * Price that rolls digit by digit when it changes ($26 to $22 for Chicken Piccata).
 * Renders as plain text until the value actually changes, so a full menu stays light.
 */
export function RollingPrice({ price, className = "" }: { price: Price; className?: string }) {
  const prev = useRef(price);
  const [from, setFrom] = useState<number | null>(null);

  useEffect(() => {
    const a = prev.current;
    if (a.kind === "single" && price.kind === "single" && a.amount !== price.amount) setFrom(a.amount);
    prev.current = price;
  }, [price]);

  if (price.kind !== "single" || from === null) {
    return <span className={`tabular ${className}`}>{formatPrice(price)}</span>;
  }

  const to = String(price.amount).split("");
  const start = String(from).padStart(to.length, "0").slice(-to.length).split("");
  return (
    <span className={`tabular inline-flex items-start leading-[1.15em] ${className}`}>
      <span className="sr-only">{formatPrice(price)}</span>
      <span aria-hidden className="block h-[1.15em] leading-[1.15em]">
        $
      </span>
      {to.map((d, i) => (
        <span key={`${to.length}-${i}`} aria-hidden className="relative block h-[1.15em] w-[0.62em] overflow-hidden">
          <motion.span
            className="absolute left-0 top-0 flex flex-col"
            initial={{ y: `${-Number(start[i]) * 1.15}em` }}
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
