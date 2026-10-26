import { ICON_PATH, ICON_VIEWBOX, LOGO_PATHS, LOGO_VIEWBOX } from "./paths";

/** Sweetbay wordmark, rendered in currentColor so it follows the theme. */
export function Logo({ className, title = "Sweetbay Restaurant & Bar" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title} fill="currentColor">
      {LOGO_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** Sweetbay magnolia mark. Decorative by default. */
export function MagnoliaIcon({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={ICON_PATH} />
    </svg>
  );
}

/** Section divider: hairline, magnolia, hairline. */
export function MagnoliaDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 text-[color:var(--accent-text)] ${className}`} aria-hidden>
      <span className="hairline flex-1" />
      <MagnoliaIcon className="h-5 w-auto opacity-90" />
      <span className="hairline flex-1" />
    </div>
  );
}
