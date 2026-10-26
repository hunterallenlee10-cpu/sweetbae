"use client";

import { useState } from "react";
import { MagnoliaIcon } from "@/components/brand/Logo";
import { business, micro } from "@/content/site";

/** Google Maps embed behind a click-to-load poster, so the iframe never costs page load. */
export function MapEmbed({ src = business.mapEmbed, className = "" }: { src?: string; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className={`relative overflow-hidden border border-[color:var(--line-soft)] bg-[color:var(--bg-raised)] ${className}`}>
      <noscript>
        <iframe title={`Map: ${business.name}`} src={src} className="map-frame absolute inset-0 z-10 h-full w-full" loading="lazy" />
      </noscript>
      {on ? (
        <iframe
          title={`Map: ${business.name}, ${business.street}, ${business.city}, ${business.region}`}
          src={src}
          className="map-frame absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5 text-center">
          <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.22]" preserveAspectRatio="none" viewBox="0 0 400 300">
            <g fill="none" stroke="currentColor" strokeWidth="0.6">
              {Array.from({ length: 14 }, (_, i) => (
                <path key={`h${i}`} d={`M0 ${i * 24 + 6} C 120 ${i * 24 + 14}, 260 ${i * 24 - 4}, 400 ${i * 24 + 8}`} />
              ))}
              {Array.from({ length: 18 }, (_, i) => (
                <path key={`v${i}`} d={`M${i * 24 + 4} 0 L ${i * 24 + 18} 300`} />
              ))}
            </g>
            <path d="M-10 210 C 90 170, 180 240, 410 160" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-[color:var(--btn-bg)] text-[color:var(--btn-fg)] shadow-[0_0_0_10px_rgba(184,145,90,0.15)] transition-transform duration-500 group-hover:scale-105">
            <MagnoliaIcon className="w-9" />
          </span>
          <span className="relative">
            <span className="block font-display text-[22px]">{business.street}</span>
            <span className="mt-1 block text-[14px] text-[color:var(--fg-muted)]">
              {business.city}, {business.region} {business.postalCode}
            </span>
          </span>
          <span className="btn btn-ghost relative min-h-10 px-5 text-[14px]">{micro.loadMap}</span>
        </button>
      )}
    </div>
  );
}
