"use client";

import { useEffect, useMemo, useState } from "react";
import { API_BASE, normalizeWorkout, unwrapWorkoutList, type Workout } from "@/lib/workout";
import { fallbackWorkouts } from "@/lib/fallback-workouts";
import { ChevronDownIcon, SearchIcon } from "./Icons";
import { WorkoutCard } from "./WorkoutCard";

type SortKey = "duration" | "calories" | "rating";

function LibrarySkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="border border-line bg-panel p-4">
          <div className="skeleton aspect-[1.78/1]" />
          <div className="skeleton mt-4 h-3 w-20" />
          <div className="skeleton mt-3 h-7 w-4/5" />
          <div className="skeleton mt-3 h-3 w-2/5" />
          <div className="skeleton mt-7 h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

export function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(API_BASE, { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        const payload = await response.json();
        const list = unwrapWorkoutList(payload).map((item, index) => normalizeWorkout(item, index)).slice(0, 12);
        if (!list.length) throw new Error("API returned no workouts");
        if (active) setWorkouts(list);
      } catch (error) {
        if (active && !(error instanceof DOMException && error.name === "AbortError")) {
          setWorkouts(fallbackWorkouts);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => { active = false; controller.abort(); };
  }, []);

  const visibleWorkouts = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    return workouts
      .filter((workout) => !lowered || workout.name.toLowerCase().includes(lowered) || workout.tags.some((tag) => tag.toLowerCase().includes(lowered)))
      .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : a[sortBy] - b[sortBy]);
  }, [workouts, query, sortBy]);

  return (
    <section id="library" className="site-shell scroll-mt-24 pb-4 pt-16 sm:pt-20">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-acid">
            <span className="h-px w-6 bg-acid" /> Training Index
          </div>
          <h2 className="display-font text-5xl font-black uppercase leading-none sm:text-6xl">The Library</h2>
          <p className="mt-3 text-sm text-zinc-500">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block min-w-0 sm:w-64">
            <span className="sr-only">Search workouts</span>
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15}/>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lifts or tags"
              className="focus-ring h-11 w-full border border-line bg-panel pl-10 pr-4 text-xs text-white placeholder:text-zinc-600"
            />
          </label>
          <label className="relative block sm:w-44">
            <span className="sr-only">Sort workouts</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
              className="focus-ring h-11 w-full appearance-none border border-line bg-panel px-4 pr-10 text-[11px] font-black uppercase tracking-wider text-white"
            >
              <option value="duration">Sort: Duration</option>
              <option value="calories">Sort: Calories</option>
              <option value="rating">Sort: Rating</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-acid" size={14}/>
          </label>
        </div>
      </div>

      {loading ? <LibrarySkeleton /> : visibleWorkouts.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
        </div>
      ) : (
        <div className="border border-line bg-panel px-6 py-16 text-center">
          <p className="display-font text-3xl font-black uppercase">No matching lifts</p>
          <p className="mt-2 text-sm text-zinc-500">Try a workout name or muscle group.</p>
        </div>
      )}
    </section>
  );
}
