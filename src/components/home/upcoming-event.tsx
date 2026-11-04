"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MdArrowOutward,
  MdCalendarMonth,
  MdLocationOn,
  MdPersonOutline,
} from "react-icons/md";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api";

type Event = {
  _id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
};

const API_URL = API_BASE_URL;

const categoryColors: Record<string, string> = {
  Donation: "bg-pink-100 text-pink-600",
  Cleanup: "bg-blue-100 text-blue-600",
  Plantation: "bg-green-100 text-green-600",
  "Winter Relief": "bg-teal-100 text-teal-600",
  "Food Drive": "bg-emerald-100 text-emerald-600",
  "Health Camp": "bg-indigo-100 text-indigo-600",
  Education: "bg-orange-100 text-orange-600",
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/events/upcoming`);

        if (!res.ok) {
          throw new Error("Failed to fetch upcoming events.");
        }

        const data = await res.json();

        // Supports either an array or an object containing an events array.
        const eventList = Array.isArray(data) ? data : data.events;

        if (!Array.isArray(eventList)) {
          throw new Error("Invalid event data received from server.");
        }

        setEvents(eventList.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="bg-base-200/50 px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span>🔥</span>
              Upcoming Initiatives
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-base-content">
              Recent Upcoming Events
            </h2>

            <p className="mt-2 text-sm text-base-content/60">
              Latest 6 community drives scheduled in your city. Get involved
              today.
            </p>
          </div>

          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          >
            View All Events
            <MdArrowOutward className="text-lg" />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl bg-base-300"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-error/20 bg-error/5 p-6 text-center">
            <p className="text-error">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-xl border border-base-300 bg-base-100 p-10 text-center">
            <h3 className="text-lg font-bold">No upcoming events yet!</h3>
            <p className="mt-2 text-sm text-base-content/60">
              Check back later for new community initiatives.
            </p>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-base-300">
                  {event.thumbnail ? (
                    <Image
                      width={400}
                      height={250}
                      src={event.thumbnail}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-base-content/40">
                      No image available
                    </div>
                  )}

                  {/* Category Badge */}
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                      categoryColors[event.type] || "bg-primary/10 text-primary"
                    }`}
                  >
                    {event.type}
                  </span>

                  {/* Date Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <MdCalendarMonth className="text-primary text-base" />
                    {formatDate(event.date)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-1 text-lg font-bold text-base-content transition-colors group-hover:text-primary">
                    {event.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-base-content/60">
                    <MdLocationOn className="shrink-0 text-primary" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-relaxed text-base-content/60">
                    {event.description}
                  </p>

                  <div className="my-4 border-t border-base-300" />

                  <div className="mb-4 flex items-center gap-2 text-xs text-base-content/60">
                    <MdPersonOutline className="text-primary" />
                    <span className="line-clamp-1">
                      {event.organizerEmail || "Community Organizer"}
                    </span>
                  </div>

                  {/* Details Button */}
                  <Link
                    href={`/events/${event._id}`}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-content shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    View Event
                    <MdArrowOutward className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
