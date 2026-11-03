import { Suspense } from "react";
import Link from "next/link";
import {
  HiArrowRight,
  HiOutlineCalendarDays,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
} from "react-icons/hi2";
import UpcomingEventsExplorer, {
  type CommunityEvent,
} from "./upcoming-events-explorer";

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
    <section className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 px-6 py-12 shadow-sm sm:px-10 md:py-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-base-300 bg-white/80 px-4 py-2">
            <HiOutlineCalendarDays className="text-lg text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/55">
              Future Community Drives
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-(family-name:--font-ibm-plex-serif) text-4xl font-bold leading-tight tracking-tight text-base-content sm:text-5xl md:text-6xl">
            Upcoming <span className="text-primary">Events</span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm leading-7 text-base-content/70 sm:text-base">
            Discover meaningful volunteer initiatives happening in your
            community. Find upcoming drives, connect with passionate people, and
            become part of something that makes a difference.
          </p>
        </div>

        {/* Create Event Button */}
        <div className="shrink-0">
          <Link
            href="/events/create"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/85 hover:shadow-xl"
          >
            Create Event
            <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="relative mt-10 h-px w-full bg-linear-to-r from-primary/40 via-base-300 to-transparent" />
    </section>
  );
}

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
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-base-300 bg-base-100 px-8 py-14 text-center shadow-sm">
        <span className="inline-flex rounded-full bg-primary/10 p-4">
          <HiOutlineExclamationTriangle className="text-3xl text-primary" />
        </span>
        <h2 className="mt-6 font-(family-name:--font-ibm-plex-serif) text-2xl font-bold text-base-content">
          Events are resting for a moment
        </h2>
        <p className="mt-3 text-sm leading-7 text-base-content/70">
          We couldn&apos;t load upcoming events right now. Please start the
          backend server and refresh the page.
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-base-300 bg-base-100 px-8 py-14 text-center shadow-sm">
        <span className="inline-flex rounded-full bg-secondary/20 p-4">
          <HiOutlineSparkles className="text-3xl text-base-content/55" />
        </span>
        <h2 className="mt-6 font-(family-name:--font-ibm-plex-serif) text-2xl font-bold text-base-content">
          No upcoming events yet
        </h2>
        <p className="mt-3 text-sm leading-7 text-base-content/70">
          Be the spark of change — create the first community drive and inspire
          others to join you.
        </p>
        <Link
          href="/events/create"
          className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/85"
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
        className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm"
      >
        <div className="h-44 animate-pulse bg-base-200" />
        <div className="animate-pulse space-y-3 p-6">
          <div className="h-4 w-3/4 rounded-full bg-base-300" />
          <div className="h-3 w-1/2 rounded-full bg-base-300" />
          <div className="h-3 w-1/2 rounded-full bg-base-300" />
          <div className="h-3 w-full rounded-full bg-base-300" />
        </div>
      </div>
    ))}
  </div>
);
