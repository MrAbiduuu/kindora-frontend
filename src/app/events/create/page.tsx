import { Suspense } from "react";
import { io } from "next/cache";
import { format, startOfToday } from "date-fns";
import CreateEventForm from "./create-event-form";

export const metadata = {
  title: "Create a Community Event — Kindora",
  description:
    "Organize a local relief effort, environmental cleanup, or community support drive on Kindora.",
};

export default function CreateEventPage() {
  return (
    <Suspense fallback={<CreateEventSkeleton />}>
      <CurrentDay />
    </Suspense>
  );
}

/**
 * The current date can't be captured in the prerendered static shell,
 * so `io()` defers this component to request time (Next Cache Components).
 */
async function CurrentDay() {
  await io();

  const today = format(startOfToday(), "yyyy-MM-dd");

  return <CreateEventForm today={today} />;
}

/* Themed loading skeleton shown while the request-time shell streams in. */
const CreateEventSkeleton = () => (
  <section className="px-4 py-10 sm:px-6 md:py-16">
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 h-5 w-52 animate-pulse rounded-full bg-[#EEDFD1]" />

      <div className="rounded-[2rem] border border-[#EEDFD1] bg-[#FFF9F5] px-6 py-10 shadow-sm sm:px-10 md:py-14">
        <div className="animate-pulse">
          <div className="h-8 w-44 rounded-full bg-[#EEDFD1]" />
          <div className="mt-6 h-9 w-3/4 rounded-xl bg-[#EEDFD1]" />
          <div className="mt-4 h-4 w-2/3 rounded-full bg-[#EEDFD1]" />

          <div className="mt-10 h-9 w-full rounded-full bg-[#F0E4DA]" />
          <div className="mt-7 h-9 w-full rounded-full bg-[#F0E4DA]" />
          <div className="mt-7 h-9 w-full rounded-full bg-[#F0E4DA]" />
          <div className="mt-7 h-28 w-full rounded-[1.75rem] bg-[#F0E4DA]" />

          <div className="mt-8 h-6 w-56 rounded-full bg-[#EEDFD1] opacity-50" />
          <div className="mt-7 h-14 w-full rounded-full bg-[#F0E4DA]" />
        </div>
      </div>
    </div>
  </section>
);
