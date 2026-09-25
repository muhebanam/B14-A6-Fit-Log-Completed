import type { Workout } from "./workout";

const image = "/images/workout-fallback.png";

export const fallbackWorkouts: Workout[] = [
  ["1", "BARBELL BENCH PRESS", "Chest, Arms", "Barbell, Bench", 25, 180, 4.8],
  ["2", "GOBLET SQUAT", "Legs, Glutes", "Dumbbell", 20, 160, 4.7],
  ["3", "CONVENTIONAL DEADLIFT", "Back, Legs", "Barbell", 30, 240, 4.9],
  ["4", "PULL UP", "Back, Arms", "Pull-up Bar", 18, 140, 4.8],
  ["5", "OVERHEAD PRESS", "Shoulders, Arms", "Barbell", 22, 150, 4.6],
  ["6", "RUSSIAN TWIST", "Core", "Medicine Ball", 15, 110, 4.5],
  ["7", "LAT PULLDOWN", "Back, Arms", "Cable Machine", 20, 145, 4.6],
  ["8", "DUMBBELL CURL", "Arms", "Dumbbells", 16, 105, 4.5],
  ["9", "TRICEP PUSHDOWN", "Arms", "Cable Machine", 15, 100, 4.4],
  ["10", "BULGARIAN SPLIT SQUAT", "Legs, Glutes", "Dumbbells, Bench", 24, 190, 4.8],
  ["11", "ROMANIAN DEADLIFT", "Hamstrings, Glutes", "Barbell", 26, 200, 4.7],
  ["12", "PLANK HOLD", "Core", "Bodyweight", 12, 80, 4.6],
].map(([id, name, tagString, equipment, duration, calories, rating]) => ({
  id: String(id),
  name: String(name),
  description:
    name === "BARBELL BENCH PRESS"
      ? "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."
      : "A focused strength movement built for clean reps, consistent loading, and repeatable progress.",
  image,
  tags: String(tagString).split(", ").map((tag) => tag.toUpperCase()),
  equipment: String(equipment),
  difficulty: "Intermediate",
  sets: "4",
  reps: "6-8",
  duration: Number(duration),
  calories: Number(calories),
  rating: Number(rating),
  instructions: [
    "Set your position first and brace through the trunk before starting the movement.",
    "Use a controlled lowering phase and keep your joints stacked through the working range.",
    "Drive the rep smoothly while keeping the target muscles under tension.",
    "Reset your position between reps and stop the set if technique starts to break down.",
  ],
}));
