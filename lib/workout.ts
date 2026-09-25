export type Workout = {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  equipment: string;
  difficulty: string;
  sets: string;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
};

const text = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const numberFrom = (value: unknown, fallback: number) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const listFrom = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/[,|/]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const first = (obj: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
  }
  return undefined;
};

export function normalizeWorkout(input: unknown, index = 0): Workout {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const idValue = first(raw, ["id", "_id", "workoutId", "exerciseId", "slug"]);
  const id = String(idValue ?? index + 1);

  const tags = listFrom(first(raw, ["tags", "categories", "category", "muscleGroups", "targetMuscles", "muscles"]));
  const equipmentList = listFrom(first(raw, ["equipment", "equipments", "equipmentNeeded"]));
  const instructions = listFrom(first(raw, ["instructions", "steps", "howTo", "directions"]));

  return {
    id,
    name: text(first(raw, ["name", "title", "exercise", "exerciseName"]), `Workout ${index + 1}`),
    description: text(
      first(raw, ["description", "details", "summary"]),
      "A focused strength movement designed to build control, consistency, and useful training volume."
    ),
    image: text(first(raw, ["image", "imageUrl", "image_url", "thumbnail", "photo", "gifUrl"]), "/images/workout-fallback.png"),
    tags: tags.length ? tags.slice(0, 3) : ["STRENGTH"],
    equipment: equipmentList.length
      ? equipmentList.join(", ")
      : text(first(raw, ["equipment", "equipments", "equipmentNeeded"]), "Bodyweight"),
    difficulty: text(first(raw, ["difficulty", "level", "experience"]), "Intermediate"),
    sets: String(first(raw, ["sets", "setCount"]) ?? "4"),
    reps: String(first(raw, ["reps", "repetitions", "repRange"]) ?? "8-12"),
    duration: Math.round(numberFrom(first(raw, ["duration", "minutes", "time"]), 25)),
    calories: Math.round(numberFrom(first(raw, ["calories", "kcal", "calorieBurn"]), 180)),
    rating: Number(numberFrom(first(raw, ["rating", "score", "ratings"]), 4.8).toFixed(1)),
    instructions: instructions.length
      ? instructions.slice(0, 6)
      : [
          "Set up in a stable position and brace your core before the first rep.",
          "Move through the working range with control instead of rushing the motion.",
          "Keep the target muscles loaded while maintaining clean joint alignment.",
          "Finish the set with the same technique you used on the first repetition.",
        ],
  };
}

export function unwrapWorkoutList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  const object = payload as Record<string, unknown>;
  for (const key of ["data", "workouts", "exercises", "results"]) {
    const value = object[key];
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") {
      const nested = value as Record<string, unknown>;
      for (const nestedKey of ["data", "workouts", "exercises", "results"]) {
        if (Array.isArray(nested[nestedKey])) return nested[nestedKey] as unknown[];
      }
    }
  }
  return [];
}

export function unwrapSingleWorkout(payload: unknown): unknown {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return payload;
  const object = payload as Record<string, unknown>;
  for (const key of ["data", "workout", "exercise", "result"]) {
    const value = object[key];
    if (value && typeof value === "object" && !Array.isArray(value)) return value;
  }
  return payload;
}

export const API_BASE = "https://api.abcz.workers.dev/api/fitlog";
