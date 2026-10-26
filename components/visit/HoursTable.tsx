"use client";

import { useEffect, useState } from "react";
import { hours } from "@/content/hours";
import { nowInNewYork } from "@/lib/status";

/** Kitchen hours with today highlighted (America/New_York). */
export function HoursTable() {
  const [today, setToday] = useState(-1);
  useEffect(() => setToday(nowInNewYork().day), []);
  return (
    <dl className="tabular divide-y divide-[color:var(--line-soft)] border-y border-[color:var(--line-soft)]">
      {hours.map((h, i) => (
        <div key={h.day} className={`flex items-center justify-between gap-4 py-3 text-[15.5px] transition-colors ${i === today ? "text-[color:var(--fg)]" : "text-[color:var(--fg-muted)]"}`}>
          <dt className="flex items-center gap-3">
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${i === today ? "bg-[color:var(--accent-text)]" : "bg-transparent"}`} />
            {h.day}
            {i === today && <span className="eyebrow !text-[10.5px]">Today</span>}
          </dt>
          <dd>{h.label}</dd>
        </div>
      ))}
    </dl>
  );
}
