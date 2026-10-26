import Link from "next/link";
import { business, micro } from "@/content/site";

/** Slim sticky bar on every page below 1024px: Reserve, Menu, Call. */
export function MobileBar() {
  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--line-soft)] bg-[color:var(--bg)]/94 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid h-[var(--bar-h)] grid-cols-3 items-center px-3 text-[14px]">
        <a href={business.reservations} target="_blank" rel="noopener" className="btn btn-solid mx-1 min-h-11 px-3">
          {micro.reserve}
        </a>
        <Link href="/menus/dinner" className="flex h-11 items-center justify-center">
          {micro.menu}
        </Link>
        <a href={business.phoneHref} className="flex h-11 items-center justify-center">
          {micro.call}
        </a>
      </div>
    </div>
  );
}
