import Link from "next/link";
import { MagnoliaIcon } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-center justify-center pt-[var(--nav-h)] text-center">
      <MagnoliaIcon className="w-40 text-[color:var(--accent-text)]" />
      <h1 className="display-lg mt-10">
        This page <span className="em">wandered off</span>
      </h1>
      <p className="body-copy mt-4">The table is still set. Try the menu or head home.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/menus/dinner" className="btn btn-solid">
          Dinner Menu
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </section>
  );
}
