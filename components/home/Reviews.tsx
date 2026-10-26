"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { reviews, reviewsTitle } from "@/content/reviews";
import { easeOut } from "@/lib/motion";

/** Editorial reviews: one large pull-quote at a time, all six names alongside. Not a carousel. */
export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % reviews.length), 8000);
    return () => window.clearTimeout(id);
  }, [i, paused]);

  const r = reviews[i];
  return (
    <section
      aria-labelledby="reviews-title"
      className="wrap py-24 lg:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 id="reviews-title" className="eyebrow mb-8">
            {reviewsTitle}
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-3" aria-label="Reviewers">
            {reviews.map((rv, n) => (
              <li key={rv.id}>
                <button
                  type="button"
                  aria-pressed={n === i}
                  onClick={() => setI(n)}
                  className={`font-display text-[22px] transition-opacity duration-300 lg:text-[26px] ${n === i ? "opacity-100" : "opacity-[0.62] hover:opacity-90"}`}
                >
                  <span className="tabular mr-3 font-sans text-[11px] tracking-[0.2em] text-[color:var(--accent-text)]">{String(n + 1).padStart(2, "0")}</span>
                  {rv.author}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-h-[440px] lg:col-span-8 lg:col-start-5" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={r.id}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: easeOut }}
            >
              <blockquote>
                <p className="font-display text-[clamp(32px,4.4vw,68px)] font-light italic leading-[1.06] [font-variation-settings:'SOFT'_100,'WONK'_1]">
                  “{r.title}”
                </p>
                <p className="body-copy mt-8 max-w-[56ch] text-[17px]">{r.body}</p>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="text-[15px]">— {r.author}</span>
                {r.recommends && (
                  <span className="text-[14px] text-[color:var(--fg-muted)]">
                    Recommends:{" "}
                    {r.recommends.map((rec, k) => (
                      <span key={rec.label}>
                        {rec.dishId ? (
                          <Link href={`/menus/dinner#${rec.dishId}`} className="text-[color:var(--fg)] underline decoration-[color:var(--line)] underline-offset-4 hover:decoration-current">
                            {rec.label}
                          </Link>
                        ) : (
                          rec.label
                        )}
                        {k < r.recommends!.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
      {/* All six reviews stay in the DOM for search engines and screen readers. */}
      <div className="sr-only">
        {reviews.map((rv) => (
          <figure key={rv.id}>
            <blockquote>
              <p>{rv.title}</p>
              <p>{rv.body}</p>
            </blockquote>
            {rv.recommends && <p>Recommends: {rv.recommends.map((x) => x.label).join(", ")}</p>}
            <figcaption>- {rv.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
