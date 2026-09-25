"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Workout } from "@/lib/workout";

type Toast = { id: number; message: string } | null;

type PlanContextValue = {
  plan: Workout[];
  saved: Workout[];
  doneIds: string[];
  hydrated: boolean;
  toast: Toast;
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  toggleDone: (id: string) => void;
  isPlanned: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  isDone: (id: string) => boolean;
  showToast: (message: string) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);
const PLAN_KEY = "fitlog-todays-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    setPlan(safeRead<Workout[]>(PLAN_KEY, []));
    setSaved(safeRead<Workout[]>(SAVED_KEY, []));
    setDoneIds(safeRead<string[]>(DONE_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan)); }, [plan, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved)); }, [saved, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(DONE_KEY, JSON.stringify(doneIds)); }, [doneIds, hydrated]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => setToast((current) => (current?.id === id ? null : current)), 2600);
  }, []);

  const addToPlan = useCallback((workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      showToast("Already in today's plan");
      return false;
    }
    if (plan.length >= 5) {
      showToast("Today's plan is capped at five lifts");
      return false;
    }
    setPlan((current) => [...current, workout]);
    showToast("Added to today's plan");
    return true;
  }, [plan, showToast]);

  const saveForLater = useCallback((workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      showToast("Already saved for later");
      return false;
    }
    setSaved((current) => [...current, workout]);
    showToast("Saved for later");
    return true;
  }, [saved, showToast]);

  const removeFromPlan = useCallback((id: string) => {
    setPlan((current) => current.filter((item) => item.id !== id));
    setDoneIds((current) => current.filter((doneId) => doneId !== id));
    showToast("Removed from today's plan");
  }, [showToast]);

  const removeFromSaved = useCallback((id: string) => {
    setSaved((current) => current.filter((item) => item.id !== id));
    showToast("Removed from saved");
  }, [showToast]);

  const toggleDone = useCallback((id: string) => {
    setDoneIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    showToast(doneIds.includes(id) ? "Marked as active" : "Workout marked as done");
  }, [doneIds, showToast]);

  const value = useMemo<PlanContextValue>(() => ({
    plan,
    saved,
    doneIds,
    hydrated,
    toast,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    isPlanned: (id) => plan.some((item) => item.id === id),
    isSaved: (id) => saved.some((item) => item.id === id),
    isDone: (id) => doneIds.includes(id),
    showToast,
  }), [plan, saved, doneIds, hydrated, toast, addToPlan, saveForLater, removeFromPlan, removeFromSaved, toggleDone, showToast]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider");
  return context;
}
