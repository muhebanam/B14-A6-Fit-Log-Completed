import type { Metadata } from "next";
import { Suspense } from "react";
import { MyPlanClient } from "@/components/MyPlanClient";

export const metadata: Metadata = {
  title: "My Plan",
};

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="site-shell py-16 text-sm text-zinc-500">Loading workouts…</div>}>
      <MyPlanClient />
    </Suspense>
  );
}
