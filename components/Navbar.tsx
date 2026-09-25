"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved, hydrated } = usePlan();
  const workoutActive = pathname === "/" || pathname.startsWith("/workout/");
  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/95 backdrop-blur-lg">
      <div className="site-shell flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center gap-2.5" aria-label="FitLog home">
          <span className="grid h-8 w-8 place-items-center bg-acid">
            <Image src="/images/logo.png" alt="" width={28} height={28} priority />
          </span>
          <span className="display-font hidden text-xl font-black tracking-[-0.02em] sm:block">FITLOG</span>
        </Link>

        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 text-xs font-extrabold uppercase tracking-wider2 sm:gap-3" aria-label="Primary navigation">
          <Link
            href="/"
            className={`focus-ring px-3 py-2 transition-colors ${workoutActive ? "text-acid" : "text-zinc-400 hover:text-white"}`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`focus-ring px-3 py-2 transition-colors ${planActive ? "text-acid" : "text-zinc-400 hover:text-white"}`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider2 sm:text-xs">
          <Link href="/my-plan?tab=plan" className="focus-ring flex items-center gap-1.5 bg-acid px-2.5 py-2 text-black sm:px-3">
            <span className="hidden sm:inline">Plan</span>
            <span>{hydrated ? plan.length : 0}</span>
          </Link>
          <Link href="/my-plan?tab=saved" className="focus-ring flex items-center gap-1.5 border border-zinc-600 px-2.5 py-[7px] text-white hover:border-acid sm:px-3">
            <span className="hidden sm:inline">Saved</span>
            <span>{hydrated ? saved.length : 0}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
