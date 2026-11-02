import { Suspense } from "react";
import Link from "next/link";
import { HiArrowRight, HiOutlineCalendarDays, HiOutlineExclamationTriangle, HiOutlineSparkles } from "react-icons/hi2";
import UpcomingEventsExplorer, { type CommunityEvent } from "./upcoming-events-explorer";

const API_URL = "http://localhost:5000/events/upcoming";

export default function UpcomingEventsPage() {
  return (
    <>
      <UpcomingEventsHeader />

      {/* Event cards stream in below the header while data loads */}
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
        <Suspense fallback={<EventsGridSkeleton />}>
          <UpcomingEvents />
        </Suspense>
      </div>
    </>
  );
}

function UpcomingEventsHeader() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#EEDFD1] bg-[#FFF9F5] px-6 py-12 shadow-sm sm:px-10 md:py-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#F9E8E8] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#F5EBDD] blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#EEDFD1] bg-white/80 px-4 py-2">
            <HiOutlineCalendarDays className="text-lg text-[#E83B5B]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A66F70]">
              Future Community Drives
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-(family-name:--font-ibm-plex-serif) text-4xl font-bold leading-tight tracking-tight text-[#6B5146] sm:text-5xl md:text-6xl">
            Upcoming <span className="text-[#E83B5B]">Events</span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#8C7B73] sm:text-base">
            Discover meaningful volunteer initiatives happening in your
            community. Find upcoming drives, connect with passionate people, and
            become part of something that makes a difference.
          </p>
        </div>

        {/* Create Event Button */}
        <div className="shrink-0">
          <Link
            href="/events/create"
            className="group inline-flex items-center gap-3 rounded-full bg-[#E83B5B] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#E83B5B]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#D92F50] hover:shadow-xl"
          >
            Create Event
            <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="relative mt-10 h-px w-full bg-linear-to-r from-[#E83B5B]/40 via-[#EEDFD1] to-transparent" />
    </section>
  );
}

/*
 * Fetching lives here instead of in the page's default export:
 * with Cache Components the page component is part of the prerendered
 * shell, so request-dependent fetches must sit behind this <Suspense>
 * boundary as an async Server Component (the `await` is the suspension point).
 */
async function UpcomingEvents() {
  let events: CommunityEvent[] | null = null;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      events = data as CommunityEvent[];
    }
  } catch {
    events = null; // backend unreachable or returned invalid data
  }

  if (events === null) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-[#EEDFD1] bg-[#FFF9F5] px-8 py-14 text-center shadow-sm">
        <span className="inline-flex rounded-full bg-[#F9E8E8] p-4">
          <HiOutlineExclamationTriangle className="text-3xl text-[#E83B5B]" />
        </span>
        <h2 className="mt-6 font-(family-name:--font-ibm-plex-serif) text-2xl font-bold text-[#6B5146]">
          Events are resting for a moment
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#8C7B73]">
          We couldn&apos;t load upcoming events right now. Please start the
          backend server and refresh the page.
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-[#EEDFD1] bg-[#FFF9F5] px-8 py-14 text-center shadow-sm">
        <span className="inline-flex rounded-full bg-[#F5EBDD] p-4">
          <HiOutlineSparkles className="text-3xl text-[#A66F70]" />
        </span>
        <h2 className="mt-6 font-(family-name:--font-ibm-plex-serif) text-2xl font-bold text-[#6B5146]">
          No upcoming events yet
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#8C7B73]">
          Be the spark of change — create the first community drive and inspire
          others to join you.
        </p>
        <Link
          href="/events/create"
          className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#E83B5B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E83B5B]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D92F50]"
        >
          Create the First Event
          <HiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <UpcomingEventsExplorer events={events} />
    </div>
  );
}

/* Loading skeleton shown by <Suspense> while the events stream in. */
const EventsGridSkeleton = () => (
  <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        className="overflow-hidden rounded-3xl border border-[#EEDFD1] bg-[#FFF9F5] shadow-sm"
      >
        <div className="h-44 animate-pulse bg-[#F0E4DA]" />
        <div className="animate-pulse space-y-3 p-6">
          <div className="h-4 w-3/4 rounded-full bg-[#EEDFD1]" />
          <div className="h-3 w-1/2 rounded-full bg-[#EEDFD1]" />
          <div className="h-3 w-1/2 rounded-full bg-[#EEDFD1]" />
          <div className="h-3 w-full rounded-full bg-[#EEDFD1]" />
        </div>
      </div>
    ))}
  </div>
);
