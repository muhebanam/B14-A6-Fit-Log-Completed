"use client";

import Link from "next/link";
import type { Workout } from "@/lib/workout";
import { usePlan } from "@/context/PlanContext";
import { CheckIcon, ClockIcon, FlameIcon, StarIcon, XIcon } from "./Icons";
import { WorkoutImage } from "./WorkoutImage";

export function PlanWorkoutRow({ workout, mode }: { workout: Workout; mode: "plan" | "saved" }) {
  const { isDone, toggleDone, removeFromPlan, removeFromSaved } = usePlan();
  const done = mode === "plan" && isDone(workout.id);

  return (
    <article className={`group border border-line bg-panel transition ${done ? "opacity-60" : "hover:border-zinc-500"}`}>
      <div className="grid items-center gap-4 p-4 sm:grid-cols-[124px_1fr_auto] sm:gap-5">
        <div className="relative aspect-[1.65/1] overflow-hidden bg-[#0d1014] sm:aspect-auto sm:h-[82px]">
          <WorkoutImage src={workout.image} alt={workout.name} className={`h-full w-full object-cover ${done ? "grayscale" : ""}`} />
          {done && <span className="absolute inset-0 grid place-items-center bg-black/50 text-acid"><CheckIcon size={28}/></span>}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`display-font truncate text-2xl font-black uppercase sm:text-[1.65rem] ${done ? "line-through" : ""}`}>{workout.name}</h3>
            {done && <span className="border border-acid/30 px-2 py-0.5 text-[8px] font-black uppercase tracking-[.16em] text-acid">Done</span>}
          </div>
          <p className="mt-1 text-xs text-zinc-500">{workout.equipment}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] font-semibold text-zinc-500">
            <span className="flex items-center gap-1.5"><ClockIcon size={13}/>{workout.duration} min</span>
            <span className="flex items-center gap-1.5"><FlameIcon size={13}/>{workout.calories} kcal</span>
            <span className="flex items-center gap-1.5"><StarIcon size={13}/>{workout.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Link
            href={`/workout/${encodeURIComponent(workout.id)}`}
            className="focus-ring border border-zinc-600 px-3.5 py-2.5 text-[9px] font-black uppercase tracking-[.12em] text-white transition hover:border-white"
          >
            View details
          </Link>
          {mode === "plan" && (
            <button
              type="button"
              onClick={() => toggleDone(workout.id)}
              className={`focus-ring flex items-center gap-1.5 px-3.5 py-2.5 text-[9px] font-black uppercase tracking-[.12em] transition ${done ? "border border-acid text-acid" : "bg-acid text-black"}`}
            >
              <CheckIcon size={13}/> {done ? "Undo" : "Mark as done"}
            </button>
          )}
          <button
            type="button"
            aria-label={`Remove ${workout.name}`}
            onClick={() => mode === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)}
            className="focus-ring grid h-[34px] w-[34px] place-items-center border border-line text-zinc-500 transition hover:border-red-500/60 hover:text-red-400"
          >
            <XIcon size={14}/>
          </button>
        </div>
      </div>
    </article>
  );
}
