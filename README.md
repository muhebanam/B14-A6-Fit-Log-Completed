# FITLOG — Workout Library

A responsive, dark-mode workout library and daily training planner built for **B14 Assignment 6**. The interface follows the supplied Figma/Penpot design system with a near-black canvas, charcoal panels, condensed uppercase typography, thin borders, and a neon-lime accent.

- **Live URL:** [https://b14-a6-fit-log-completed-ten.vercel.app/](https://b14-a6-fit-log-completed-ten.vercel.app/)
- **GitHub Repository:** [https://github.com/muhebanam/B14-A6-Fit-Log-Completed](https://github.com/muhebanam/B14-A6-Fit-Log-Completed)

## Live product flow

- Browse twelve exercises from the FitLog API in a responsive library.
- Open a workout to inspect equipment, difficulty, sets, reps, duration, calories, rating, and instructions.
- Add up to five exercises to **Today's Plan** or save exercises for later.
- Track live exercise, minute, and calorie totals in **My Plan**.
- Mark planned workouts as done, undo them, or remove them.

## Technologies

- **Next.js 15** — App Router, route-level metadata, loading/error/not-found UI
- **React 19** — reusable client components and context state
- **TypeScript** — strict typing and API normalization
- **Tailwind CSS 3** — responsive styling and design-system utilities
- **localStorage** — persistent Today's Plan, Saved, and Done state

## Key features

1. **Figma-inspired responsive UI** for mobile, tablet, and desktop.
2. **FitLog API integration** with a defensive normalization layer for common API response shapes.
3. **12-card workout library** with loading skeletons, search, and sorting by Duration, Calories, or Rating.
4. **Dynamic workout detail route** at `/workout/[id]` with key specs and step-by-step instructions.
5. **Persistent My Plan experience** with a five-workout cap, Saved tab, live metrics, Mark as Done, and Remove.
6. **Live navbar counters** for Plan and Saved items.
7. **Toast feedback** for add, save, done, undo, and remove actions.
8. **Deployment-safe App Router pages** with loading, error, and custom 404 states.

## API

```text
All workouts:
https://api.abcz.workers.dev/api/fitlog

Single workout:
https://api.abcz.workers.dev/api/fitlog/:id
```

The application fetches from the API in the browser. A local twelve-workout fallback dataset is included only as a resilience layer so the UI stays usable if the assignment API is temporarily unreachable.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero + workout library |
| `/workout/[id]` | Workout details and Add/Save actions |
| `/my-plan` | Today's Plan, Saved, metrics, Done/Remove actions |
| unknown route | Custom 404 page |

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run lint
npm run build
npm start
```

## Design resources

The original starter resources are intentionally preserved:

```text
assets/banner.png
assets/logo.png
UI/Fit Log.fig
UI/Fit Log.penpot
ASSIGNMENT.md
```

The implementation also uses the workout fallback artwork embedded in the supplied Figma source when the API does not provide a usable image.

## Persistence rules

- Today's Plan is capped at **5** exercises.
- Plan, Saved, and Done state survive reloads via `localStorage`.
- Duplicate Plan/Saved actions are blocked and explained with toast feedback.

## Deployment

The project can be deployed directly to Vercel as a standard Next.js App Router project. No custom rewrite is required for route reloads.

---

**FitLog — Train hard, log honest.**
