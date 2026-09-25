import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="site-shell flex min-h-[66vh] items-center py-16">
      <div className="w-full border border-line bg-panel px-6 py-14 text-center sm:px-10 sm:py-20">
        <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[10px] font-black uppercase tracking-[.22em] text-acid">
          <span className="h-px w-8 bg-acid" /> Error 404 <span className="h-px w-8 bg-acid" />
        </div>
        <h1 className="display-font text-[clamp(4rem,12vw,8rem)] font-black uppercase leading-[.82]">Wrong rack.</h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-zinc-500">
          The page you tried to load is not part of this training block. Head back to the library and pick a lift.
        </p>
        <Link href="/" className="focus-ring mt-7 inline-flex items-center gap-2 bg-acid px-5 py-3.5 text-[10px] font-black uppercase tracking-[.14em] text-black">
          Return to workouts <ArrowRightIcon size={14}/>
        </Link>
      </div>
    </section>
  );
}
