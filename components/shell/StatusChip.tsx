"use client";

import { useEffect, useState } from "react";
import { getStatus, type Status } from "@/lib/status";

/** Live open/closed chip, computed in America/New_York from content/hours.ts. */
export function StatusChip({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-flex min-h-7 min-w-[14ch] items-center gap-2 rounded-full border border-[color:var(--line-soft)] px-3 py-1 text-[12.5px] leading-none text-[color:var(--fg-muted)] ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden
        className={`relative inline-block h-1.5 w-1.5 rounded-full ${status?.open ? "bg-[#7fc49a]" : "bg-[color:var(--accent)]"}`}
      >
        {status?.open && (
          <span className="motion-only absolute inset-0 animate-ping rounded-full bg-[#7fc49a] opacity-60" />
        )}
      </span>
      <span className="tabular">{status ? status.text : "Kitchen hours"}</span>
    </span>
  );
}
