import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon } from "./Icons";

export function Hero() {
  return (
    <section className="site-shell pt-9 sm:pt-12">
      <div className="acid-grid relative overflow-hidden border border-line bg-panel px-6 py-10 sm:px-10 sm:py-12 lg:min-h-[420px] lg:px-14 lg:py-14">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_center,rgba(199,255,0,.08),transparent_67%)]" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.18fr_.82fr]">
          <div className="max-w-[670px]">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-black uppercase tracking-[.23em] text-acid">
              <span className="h-px w-7 bg-acid" />
              Workout Library
            </div>
            <h1 className="display-font text-[clamp(3.2rem,8.1vw,6.85rem)] font-black uppercase leading-[.86] text-white">
              Train with intent.<br />Log every set.
            </h1>
            <p className="mt-6 max-w-[610px] text-sm leading-7 text-zinc-400 sm:text-[15px]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <Link
              href="#library"
              className="focus-ring mt-7 inline-flex items-center gap-2.5 bg-acid px-5 py-3.5 text-[11px] font-black uppercase tracking-[.14em] text-black transition-transform hover:-translate-y-0.5"
            >
              Browse workouts <ArrowDownIcon size={15} />
            </Link>
          </div>

          <div className="relative mx-auto flex min-h-[250px] w-full max-w-[390px] items-center justify-center lg:min-h-[330px]">
            <div className="absolute h-52 w-52 rounded-full bg-acid/10 blur-3xl lg:h-72 lg:w-72" />
            <Image
              src="/images/banner.png"
              alt="Muscle anatomy training on a preacher curl machine"
              width={334}
              height={334}
              priority
              className="relative z-10 w-[245px] drop-shadow-[0_24px_35px_rgba(0,0,0,.55)] sm:w-[290px] lg:w-[330px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
