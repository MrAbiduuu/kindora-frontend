"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Loader2,
  MapPin,
} from "lucide-react";
import { format, parse } from "date-fns";
import { authClient } from "@/lib/auth-client";

interface Event {
  _id: string;
  title: string;
  type: string;
  date: string; // "YYYY-MM-DD"
  location: string;
  thumbnail: string;
}

// Accent color per event type for the badge dot/text.
const TYPE_ACCENTS: Record<string, string> = {
  Donation: "text-error",
  "Winter Relief": "text-sky-600",
  Cleanup: "text-success",
  Plantation: "text-emerald-700",
  "Winter Clothes Drive": "text-sky-600",
  "Blanket Relief": "text-sky-600",
  "Food Drive": "text-amber-600",
  "Health Camp": "text-teal-600",
  Education: "text-blue-600",
};

function typeAccent(type: string): string {
  return TYPE_ACCENTS[type] ?? "text-primary";
}

function prettyDate(date: string): string {
  try {
    return format(parse(date, "yyyy-MM-dd", new Date()), "EEE, MMM d, yyyy");
  } catch {
    return date;
  }
}

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJoined = useCallback(async (joinedEmail: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:5000/joined-events/${encodeURIComponent(joinedEmail)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch your joined events.");
      setEvents((await res.json()) as Event[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPending) return;

    void Promise.resolve().then(() => {
      if (email) {
        fetchJoined(email);
      } else {
        setEvents([]);
        setLoading(false);
      }
    });
  }, [email, isPending, fetchJoined]);

  const busy = isPending || loading;

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-base-content sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm font-semibold text-primary">
            <BadgeCheck size={14} />
            My Volunteer Commitments
          </span>

          <h1 className="font-serif mt-3 text-4xl font-bold sm:text-5xl">
            Joined Events
          </h1>

          <p className="mt-3 max-w-xl text-sm text-base-content/70">
            Here are all the social development and community service drives you
            have signed up for, sorted by event date.
          </p>
        </div>

        <hr className="mt-8 border-base-300" />

        {/* Events */}
        <div className="mt-10">
          {busy ? (
            <div className="flex flex-col items-center gap-3 py-20 text-base-content/60">
              <Loader2 className="animate-spin" size={28} />
              <p className="text-sm">Loading your commitments…</p>
            </div>
          ) : !email ? (
            <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
              <h2 className="text-xl font-bold">Please log in first</h2>
              <p className="mt-2 text-sm text-base-content/70">
                Log in to see the events you have joined as a volunteer.
              </p>

              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Log In
              </Link>
            </div>
          ) : error ? (
            <p className="py-12 text-center text-sm font-medium text-error">
              {error}
            </p>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
              <h2 className="text-xl font-bold">No joined events yet</h2>
              <p className="mt-2 text-sm text-base-content/70">
                You haven&apos;t joined any events yet. Find a cause and become
                a volunteer today!
              </p>

              <Link
                href="/events"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Browse Events
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Thumbnail with overlaid badges */}
                  <div className="relative">
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      width={800}
                      height={450}
                      className="h-52 w-full object-cover"
                    />

                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm">
                      <span
                        className={`h-2 w-2 rounded-full bg-current ${typeAccent(event.type)}`}
                      />
                      <span className={typeAccent(event.type)}>
                        {event.type}
                      </span>
                    </span>

                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/45 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      <CalendarDays size={13} />
                      {prettyDate(event.date)}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-xl font-bold text-primary">
                      {event.title}
                    </h2>

                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-base-content/70">
                      <MapPin size={15} className="shrink-0" />
                      {event.location}
                    </p>

                    <p className="mt-2 text-sm text-base-content/70">
                      You have signed up as a confirmed volunteer for this
                      initiative.
                    </p>

                    <hr className="mt-4 border-base-300" />

                    <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-success">
                      <BadgeCheck size={15} className="shrink-0" />
                      Joined {prettyDate(event.date)}
                    </p>

                    <Link
                      href={`/events/${event._id}`}
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85"
                    >
                      View Event
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
