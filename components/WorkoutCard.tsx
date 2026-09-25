import Link from "next/link";
import type { Workout } from "@/lib/workout";
import { ClockIcon, FlameIcon, StarIcon } from "./Icons";
import { WorkoutImage } from "./WorkoutImage";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${encodeURIComponent(workout.id)}`}
      className="focus-ring group flex min-h-full flex-col overflow-hidden border border-line bg-panel transition duration-200 hover:-translate-y-1 hover:border-zinc-500 hover:shadow-acid"
    >
      <div className="relative aspect-[1.78/1] overflow-hidden bg-[#0c0f13]">
        <WorkoutImage
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="mb-2.5 flex min-h-5 flex-wrap gap-x-2 gap-y-1">
          {workout.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-black uppercase tracking-[.17em] text-acid">{tag}</span>
          ))}
        </div>
        <h3 className="display-font text-[1.6rem] font-black uppercase leading-[.95] text-white">{workout.name}</h3>
        <p className="mt-3 text-xs text-zinc-500">{workout.equipment}</p>
        <div className="mt-auto flex items-center gap-4 border-t border-white/[0.07] pt-4 text-[11px] font-semibold text-zinc-400">
          <span className="flex items-center gap-1.5"><ClockIcon size={14}/>{workout.duration} min</span>
          <span className="flex items-center gap-1.5"><FlameIcon size={14}/>{workout.calories} kcal</span>
          <span className="ml-auto flex items-center gap-1.5"><StarIcon size={14}/>{workout.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
