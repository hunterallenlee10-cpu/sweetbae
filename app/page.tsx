import { copy } from "@/content/site";
export default function Home() {
  return (
    <section className="wrap flex min-h-[120vh] items-center pt-32">
      <h1 className="display-xl max-w-[14ch]">{copy.h1}</h1>
    </section>
  );
}
