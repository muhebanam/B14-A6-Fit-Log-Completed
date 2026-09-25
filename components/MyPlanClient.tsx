"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { DumbbellIcon, ClockIcon, FlameIcon, ArrowRightIcon, BookmarkIcon } from "./Icons";
import { PlanWorkoutRow } from "./PlanWorkoutRow";

type Tab = "plan" | "saved";

function PlanLoading() {
  return (
    <div className="border border-line bg-panel px-5 py-12 text-center">
      <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-acid" />
      <p className="mt-3 text-xs font-bold uppercase tracking-[.14em] text-zinc-500">Loading workouts…</p>
    </div>
  );
}

export function MyPlanClient() {
  const searchParams = useSearchParams();
  const { plan, saved, hydrated } = usePlan();
  const [tab, setTab] = useState<Tab>(searchParams.get("tab") === "saved" ? "saved" : "plan");

  useEffect(() => {
    setTab(searchParams.get("tab") === "saved" ? "saved" : "plan");
  }, [searchParams]);

  const metrics = useMemo(() => ({
    exercises: plan.length,
    minutes: plan.reduce((total, item) => total + item.duration, 0),
    calories: plan.reduce((total, item) => total + item.calories, 0),
  }), [plan]);

  const items = tab === "plan" ? plan : saved;

  const changeTab = (next: Tab) => {
    setTab(next);
    window.history.replaceState(null, "", `/my-plan?tab=${next}`);
  };

  return (
    <section className="site-shell py-10 sm:py-14">
      <div className="mb-9 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-acid">
            <span className="h-px w-6 bg-acid" /> Training Log
          </div>
          <h1 className="display-font text-[clamp(3.6rem,8vw,6.5rem)] font-black uppercase leading-[.86]">My Plan</h1>
          <p className="mt-4 text-sm text-zinc-500">Cap of five lifts for today. Finish them, then load more.</p>
        </div>
        <p className="hidden max-w-xs text-right text-[10px] font-bold uppercase leading-5 tracking-[.12em] text-zinc-700 lg:block">
          Build a short list. Do the work.<br/>Mark it honestly.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Exercises" value={hydrated ? metrics.exercises : 0} icon={<DumbbellIcon size={19}/>} />
        <MetricCard label="Minutes" value={hydrated ? metrics.minutes : 0} icon={<ClockIcon size={19}/>} />
        <MetricCard label="Calories" value={hydrated ? metrics.calories : 0} icon={<FlameIcon size={19}/>} />
      </div>

      <div className="mt-9 flex items-center justify-between border-b border-line">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => changeTab("plan")}
            className={`focus-ring relative px-4 pb-4 pt-2 text-[10px] font-black uppercase tracking-[.15em] ${tab === "plan" ? "text-white" : "text-zinc-600 hover:text-zinc-300"}`}
          >
            Today&apos;s Plan <span className="ml-1.5 text-acid">{hydrated ? plan.length : 0}</span>
            {tab === "plan" && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-acid" />}
          </button>
          <button
            type="button"
            onClick={() => changeTab("saved")}
            className={`focus-ring relative px-4 pb-4 pt-2 text-[10px] font-black uppercase tracking-[.15em] ${tab === "saved" ? "text-white" : "text-zinc-600 hover:text-zinc-300"}`}
          >
            Saved <span className="ml-1.5 text-acid">{hydrated ? saved.length : 0}</span>
            {tab === "saved" && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-acid" />}
          </button>
        </div>
        <span className="hidden text-[9px] font-black uppercase tracking-[.15em] text-zinc-700 sm:block">{tab === "plan" ? "Today / 5 max" : "Later queue"}</span>
      </div>

      <div className="mt-5 space-y-3">
        {!hydrated ? <PlanLoading /> : items.length ? (
          items.map((workout) => <PlanWorkoutRow key={workout.id} workout={workout} mode={tab} />)
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center border border-line bg-panel px-6 py-14 text-center">
            <span className="grid h-11 w-11 place-items-center border border-line text-zinc-600">
              {tab === "plan" ? <DumbbellIcon size={20}/> : <BookmarkIcon size={20}/>} 
            </span>
            <h2 className="display-font mt-5 text-4xl font-black uppercase">Nothing here yet</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
              {tab === "plan" ? "Browse the library and add a lift to get today moving." : "Save a lift from its detail page and it will wait for you here."}
            </p>
            <Link href="/#library" className="focus-ring mt-6 inline-flex items-center gap-2 bg-acid px-5 py-3 text-[10px] font-black uppercase tracking-[.13em] text-black">
              Go to workouts <ArrowRightIcon size={14}/>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function MetricCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex min-h-28 items-center justify-between border border-line bg-panel px-5 py-5 sm:px-6">
      <div>
        <div className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-600">{label}</div>
        <div className="display-font mt-1 text-4xl font-black leading-none text-white">{value}</div>
      </div>
      <span className="grid h-10 w-10 place-items-center border border-acid/25 bg-acid/[.04] text-acid">{icon}</span>
    </div>
  );
}
