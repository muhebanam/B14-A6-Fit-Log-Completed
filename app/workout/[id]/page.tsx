import type { Metadata } from "next";
import { WorkoutDetailsClient } from "@/components/WorkoutDetailsClient";

export const metadata: Metadata = {
  title: "Workout Details",
};

export default async function WorkoutDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WorkoutDetailsClient id={id} />;
}
