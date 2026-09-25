"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE, normalizeWorkout, unwrapSingleWorkout, type Workout } from "@/lib/workout";
import { fallbackWorkouts } from "@/lib/fallback-workouts";
import { usePlan } from "@/context/PlanContext";
import { BookmarkIcon, CheckIcon, ClockIcon, FlameIcon, PlusIcon, StarIcon } from "./Icons";
import { WorkoutImage } from "./WorkoutImage";

function DetailsSkeleton() {
  return (
    <div className="site-shell py-10 sm:py-14">
      <div className="grid gap-7 lg:grid-cols-[.92fr_1.08fr]">
        <div className="skeleton min-h-[430px]" />
        <div className="border border-line bg-panel p-7">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton mt-4 h-12 w-4/5" />
          <div className="skeleton mt-5 h-16 w-full" />
          <div className="skeleton mt-8 h-64 w-full" />
        </div>
      </div>
    </div>
  );
}

export function WorkoutDetailsClient({ id }: { id: string }) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const { addToPlan, saveForLater, isPlanned, isSaved, plan } = usePlan();

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        const payload = await response.json();
        const normalized = normalizeWorkout(unwrapSingleWorkout(payload));
        if (!normalized.id || normalized.name.startsWith("Workout ")) throw new Error("Invalid workout payload");
        if (active) setWorkout(normalized);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        const fallback = fallbackWorkouts.find((item) => item.id === id);
        if (active) {
          if (fallback) setWorkout(fallback);
          else setFailed(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => { active = false; controller.abort(); };
  }, [id]);

  if (loading) return <DetailsSkeleton />;

  if (failed || !workout) {
    return (
      <section className="site-shell flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
        <span className="text-[10px] font-black uppercase tracking-[.22em] text-acid">404 / Workout</span>
        <h1 className="display-font mt-3 text-6xl font-black uppercase">Lift not found</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">That workout is not available in the library right now.</p>
        <Link href="/#library" className="focus-ring mt-7 bg-acid px-5 py-3 text-[11px] font-black uppercase tracking-wider text-black">Back to workouts</Link>
      </section>
    );
  }

  const planned = isPlanned(workout.id);
  const saved = isSaved(workout.id);
  const planFull = plan.length >= 5 && !planned;

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.calories} kcal`],
    ["Rating", workout.rating.toFixed(1)],
  ];

  return (
    <section className="site-shell py-9 sm:py-12">
      <div className="mb-5 flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[.18em]">
        <Link href="/#library" className="focus-ring text-zinc-500 transition hover:text-acid">← Back to library</Link>
        <span className="text-zinc-700">Workout / {workout.id}</span>
      </div>

      <div className="grid overflow-hidden border border-line bg-panel lg:grid-cols-[.92fr_1.08fr]">
        <div className="relative min-h-[360px] overflow-hidden bg-[#0d1014] sm:min-h-[520px] lg:min-h-full">
          <WorkoutImage src={workout.image} alt={workout.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-11">
          <div className="flex flex-wrap gap-2">
            {workout.tags.map((tag) => (
              <span key={tag} className="border border-acid/35 bg-acid/[.05] px-2.5 py-1 text-[9px] font-black uppercase tracking-[.16em] text-acid">{tag}</span>
            ))}
          </div>
          <h1 className="display-font mt-5 text-[clamp(3.1rem,6vw,5.4rem)] font-black uppercase leading-[.88]">{workout.name}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">{workout.description}</p>

          <div className="mt-8 border-y border-white/[0.07]">
            <div className="grid grid-cols-2 sm:grid-cols-3">
              {specs.map(([label, value], index) => (
                <div key={label} className={`min-h-20 border-white/[0.07] px-4 py-4 ${index % 3 !== 2 ? "sm:border-r" : ""} ${index % 2 === 0 ? "max-sm:border-r" : ""} ${index < 4 ? "border-b" : ""}`}>
                  <div className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-600">{label}</div>
                  <div className="mt-1.5 text-sm font-bold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.07] pb-3">
              <h2 className="display-font text-2xl font-black uppercase">Instructions</h2>
              <span className="text-[9px] font-black uppercase tracking-[.18em] text-zinc-600">Stay controlled</span>
            </div>
            <ol className="space-y-3.5">
              {workout.instructions.slice(0, 4).map((instruction, index) => (
                <li key={`${index}-${instruction}`} className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-zinc-400">
                  <span className="display-font text-lg font-black text-acid">{String(index + 1).padStart(2, "0")}</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={planned || planFull}
              onClick={() => addToPlan(workout)}
              className="focus-ring flex min-h-12 items-center justify-center gap-2 bg-acid px-4 text-[10px] font-black uppercase tracking-[.13em] text-black transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              {planned ? <CheckIcon size={16}/> : <PlusIcon size={16}/>} {planned ? "In today's plan" : planFull ? "Plan full (5/5)" : "Add to today's plan"}
            </button>
            <button
              type="button"
              disabled={saved}
              onClick={() => saveForLater(workout)}
              className="focus-ring flex min-h-12 items-center justify-center gap-2 border border-zinc-600 px-4 text-[10px] font-black uppercase tracking-[.13em] text-white transition enabled:hover:border-acid enabled:hover:text-acid disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600"
            >
              {saved ? <CheckIcon size={16}/> : <BookmarkIcon size={16}/>} {saved ? "Saved" : "Save for later"}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
            <span className="flex items-center gap-1.5"><ClockIcon size={13}/>{workout.duration} min</span>
            <span className="flex items-center gap-1.5"><FlameIcon size={13}/>{workout.calories} kcal</span>
            <span className="flex items-center gap-1.5"><StarIcon size={13}/>{workout.rating.toFixed(1)} rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
