"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { format, parse } from "date-fns";
import {
  HiMagnifyingGlass,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiXMark,
} from "react-icons/hi2";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Shape returned by the backend (kindora-backend -> /events/upcoming)
export type CommunityEvent = {
  _id?: string;
  id?: number;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function UpcomingEventsExplorer({
  events,
}: {
  events: CommunityEvent[];
}) {
  const shouldReduceMotion = useReducedMotion();

  const [activeType, setActiveType] = useState("All");
  const [query, setQuery] = useState("");

  // Learn the categories live from the data (All first), so future types appear automatically
  const types = useMemo(
    () => ["All", ...Array.from(new Set(events.map((event) => event.type)))],
    [events],
  );

  const filteredEvents = useMemo(() => {
    const search = query.trim().toLowerCase();
    return events.filter((event) => {
      if (activeType !== "All" && event.type !== activeType) return false;
      if (!search) return true;
      return [event.title, event.location, event.type, event.description].some(
        (value) => value?.toLowerCase().includes(search),
      );
    });
  }, [events, activeType, query]);

  const clearFilters = () => {
    setActiveType("All");
    setQuery("");
  };

  return (
    <div>
      {/* ---- Filter bar ---- */}
      <div className="flex flex-col gap-5 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm md:flex-row md:items-center md:justify-between md:gap-4 lg:px-7">
        {/* Type chips */}
        <div
          className="flex flex-wrap gap-2.5"
          role="tablist"
          aria-label="Filter events by type"
        >
          {types.map((type) => {
            const selected = activeType === type;
            return (
              <motion.button
                key={type}
                type="button"
                role="tab"
                aria-selected={selected}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => setActiveType(type)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                  selected
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                    : "border-base-300 bg-base-100 text-base-content/70 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {type}
              </motion.button>
            );
          })}
        </div>

        {/* Search */}
        <div className="group relative w-full shrink-0 md:w-72">
          <HiMagnifyingGlass
            className={`pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg transition-colors duration-300 ${
              query
                ? "text-primary"
                : "text-base-content/40 group-focus-within:text-primary"
            }`}
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events or areas…"
            aria-label="Search events or areas"
            className="input h-12 w-full rounded-full border-base-300 bg-base-100 pl-12 pr-10 text-sm font-medium text-base-content shadow-sm transition-all duration-300 placeholder:font-normal placeholder:text-base-content/40 hover:border-primary/30 focus:border-primary focus:outline-primary/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-base-content/40 transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
            >
              <HiXMark className="text-base" />
            </button>
          )}
        </div>
      </div>

      {/* ---- Result count ---- */}
      <p className="mt-6 text-sm font-medium text-base-content/70">
        Showing{" "}
        <span className="font-semibold text-primary">
          {filteredEvents.length}
        </span>{" "}
        of {events.length} upcoming {events.length === 1 ? "event" : "events"}
        {activeType !== "All" && (
          <>
            {" "}
            in{" "}
            <span className="font-semibold text-base-content">{activeType}</span>
          </>
        )}
        {query.trim() && (
          <>
            {" "}
            matching{" "}
            <span className="font-semibold text-base-content">
              &ldquo;{query.trim()}&rdquo;
            </span>
          </>
        )}
      </p>

      {/* ---- Cards ---- */}
      {filteredEvents.length > 0 ? (
        <motion.div
          layout
          className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id ?? event.id ?? event.title}
                event={event}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyResult
          query={query.trim()}
          activeType={activeType}
          shouldReduceMotion={shouldReduceMotion}
          onReset={clearFilters}
        />
      )}

      {/* Bottom accent */}
      <div className="mt-12 h-px w-full bg-gradient-to-r from-base-300 via-base-300 to-transparent" />
    </div>
  );
}

const EventCard = ({
  event,
  shouldReduceMotion,
}: {
  event: CommunityEvent;
  shouldReduceMotion: boolean | null;
}) => {
  const displayDate = event.date
    ? format(parse(event.date, "yyyy-MM-dd", new Date()), "MMM d, yyyy")
    : null;

  return (
    <motion.article
      layout
      layoutId={event._id ?? String(event.id ?? event.title)}
      initial={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 18 }
      }
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.94, y: -10 }
      }
      transition={{ duration: 0.35, ease: EASE }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title}
          width={400}
          height={300}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-base-content/55 backdrop-blur-sm">
          {event.type}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-(family-name:--font-ibm-plex-serif) text-lg font-bold leading-snug text-base-content">
          {event.title}
        </h3>

        <div className="mt-3 space-y-2 text-sm text-base-content/70">
          {displayDate && (
            <p className="inline-flex w-full items-center gap-2.5">
              <HiOutlineCalendarDays className="shrink-0 text-base text-primary" />
              {displayDate}
            </p>
          )}
          <p className="inline-flex w-full items-center gap-2.5">
            <HiOutlineMapPin className="shrink-0 text-base text-primary" />
            {event.location}
          </p>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-base-content/70">
          {event.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="h-px w-full bg-linear-to-r from-primary/30 via-base-300 to-transparent" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link href={`/events/${event._id}`}>
            <Button>Check event details</Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const EmptyResult = ({
  query,
  activeType,
  shouldReduceMotion,
  onReset,
}: {
  query: string;
  activeType: string;
  shouldReduceMotion: boolean | null;
  onReset: () => void;
}) => (
  <motion.div
    initial={
      shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }
    }
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.4, ease: EASE }}
    className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-base-300 bg-base-100 px-8 py-14 text-center shadow-sm"
  >
    <span className="inline-flex rounded-full bg-secondary/20 p-4">
      <HiOutlineSparkles className="text-3xl text-base-content/55" />
    </span>
    <h2 className="mt-6 font-(family-name:--font-ibm-plex-serif) text-2xl font-bold text-base-content">
      No events found
    </h2>
    <p className="mt-3 text-sm leading-7 text-base-content/70">
      {query
        ? `Nothing matches “${query}”${activeType !== "All" ? ` in ${activeType}` : ""}. Try a different search or explore another category.`
        : `There are no ${activeType} events coming up right now. Check back soon or browse all events.`}
    </p>
    <button
      type="button"
      onClick={onReset}
      className="mt-7 rounded-full border border-base-300 bg-base-100 px-6 py-3 text-sm font-semibold text-base-content/70 transition-colors duration-300 hover:border-primary/40 hover:text-primary"
    >
      Show All Events
    </button>
  </motion.div>
);
