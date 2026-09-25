"use client";

import { CheckIcon } from "./Icons";
import { usePlan } from "@/context/PlanContext";

export function Toast() {
  const { toast } = usePlan();
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[80] w-[calc(100%-28px)] max-w-sm -translate-x-1/2 toast-enter">
      <div className="flex items-center gap-3 border border-line bg-panel2 px-4 py-3 text-sm font-semibold text-white shadow-2xl">
        <span className="grid h-7 w-7 shrink-0 place-items-center bg-acid text-black"><CheckIcon size={15}/></span>
        {toast.message}
      </div>
    </div>
  );
}
