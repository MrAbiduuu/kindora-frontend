"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  HiCheckBadge,
  HiLink,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";

const API_URL = "http://localhost:5000/events";

type EventDetails = {
  _id?: string;
  id?: number;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail?: string;
  volunteerGuidelines?: string[];
  volunteers?: string[];
  volunteerEmails?: string[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

const volunteerLabelStyle =
  "text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55";

const initialsOf = (value: string) => {
  const email = value.split("@")[0] || value;
  return email.slice(0, 1).toUpperCase();
};

export default function EventDetailsView({ event }: { event: EventDetails }) {
  const shouldReduceMotion = useReducedMotion();

  // Current logged-in user drives the join flow.
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const userEmail = session?.user?.email ?? null;
  const userFirstName = (session?.user?.name ?? "").trim().split(/\s+/)[0];

  const [volunteers, setVolunteers] = useState<string[]>(event.volunteers ?? []);
  const [volunteerEmails, setVolunteerEmails] = useState<string[]>(
    event.volunteerEmails ?? [],
  );
  // Legacy events may contain the email directly inside `volunteers`.
  const [joined, setJoined] = useState(
    Boolean(
      userEmail &&
        ((event.volunteerEmails ?? []).some(
          (value) => value === userEmail,
        ) ||
          (event.volunteers ?? []).includes(userEmail)),
    ),
  );
  const [joinState, setJoinState] = useState<"idle" | "loading" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const eventId = event._id ?? event.id;
  const formattedDate = `${formatWeekday(event.date)}, ${formatDay(event.date)}`;

  const imageURL = event.thumbnail;
  const organizerEmail = event.organizerEmail ?? "";
  const guidelines = event.volunteerGuidelines ?? [];

  const handleJoin = async (formEvent: FormEvent<HTMLButtonElement>) => {
    formEvent.preventDefault();
    if (joined || !userEmail || joinState === "loading") return;

    setJoinState("loading");
    try {
      const res = await fetch(`${API_URL}/${eventId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, name: session?.user?.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Failed to join");
      setVolunteers(Array.isArray(data.volunteers) ? data.volunteers : []);
      setVolunteerEmails(
        Array.isArray(data.volunteerEmails) ? data.volunteerEmails : [],
      );
      setJoined(true);
    } catch {
      setJoinState("error");
    }
  };

  const youMarked = (volunteer: string) =>
    Boolean(
      userEmail &&
        (volunteer === userEmail ||
          (joined && volunteer === userFirstName && userFirstName)),
    );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: shouldReduceMotion ? 1 : 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm"
    >
      {/* ---------- Hero ---------- */}
      <div className="relative h-72 sm:h-96">
        <img
          src={imageURL}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/5" />

        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold tracking-wide text-base-content backdrop-blur-sm sm:left-8 sm:top-8">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {event.type}
        </span>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10">
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="font-(family-name:--font-ibm-plex-serif) text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            {event.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/85"
          >
            <span className="inline-flex items-center gap-2">
              <HiOutlineMapPin className="text-base" />
              {event.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <HiOutlineCalendarDays className="text-base" />
              {formattedDate}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ---------- Volunteer strip ---------- */}
      <div className="relative flex flex-col gap-5 border-b border-base-300 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-center gap-4">
          <span className="inline-flex rounded-2xl bg-primary/10 p-3.5 ring-1 ring-primary/20">
            <HiOutlineUserGroup className="text-2xl text-primary" />
          </span>
          <div>
            <motion.p
              key={volunteers.length}
              initial={shouldReduceMotion ? {} : { scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="text-sm font-bold text-base-content"
            >
              {volunteerCountLabel(volunteers.length)}
            </motion.p>
            <p className="text-xs text-base-content/70">
              Add your helping hands to this community drive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            onClick={handleCopyLink}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
            aria-label="Copy event link"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content/70 transition-colors duration-300 hover:border-primary/40 hover:text-primary"
          >
            <motion.span
              animate={copied ? { rotate: copied ? 15 : 0 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              {copied ? <HiCheckBadge className="text-lg text-primary" /> : <HiLink className="text-lg" />}
            </motion.span>
          </motion.button>

          {sessionPending ? (
            <button
              type="button"
              disabled
              className="inline-flex cursor-wait items-center gap-2.5 rounded-full bg-base-200 px-7 py-3.5 text-sm font-semibold text-base-content/60"
            >
              Checking session…
            </button>
          ) : !userEmail ? (
            <Link
              href="/login"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors duration-300 hover:bg-primary/85"
            >
              Log in to Join
            </Link>
          ) : joined ? (
            <motion.button
              type="button"
              initial={shouldReduceMotion ? {} : { scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 15 }}
              disabled
              className="inline-flex cursor-default items-center gap-2.5 rounded-full bg-success/15 px-7 py-3.5 text-sm font-bold text-success ring-1 ring-success/30"
            >
              <HiCheckBadge className="text-lg" />
              You&apos;re a Volunteer
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleJoin}
              disabled={joinState === "loading"}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors duration-300 hover:bg-primary/85 disabled:opacity-70"
            >
              {joinState === "loading" ? "Joining…" : "Join Event"}
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {joinState === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full text-xs font-medium text-error sm:absolute sm:right-10 sm:top-[calc(50%+2.75rem)]"
            >
              Couldn&apos;t join right now — please try again.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- Body ---------- */}
      <div className="grid gap-10 px-6 py-10 sm:px-10 md:grid-cols-[minmax(0,1fr)_320px]">
        {/* About + guidelines */}
        <div>
          <h2 className="font-(family-name:--font-ibm-plex-serif) text-2xl font-bold tracking-tight text-base-content">
            About this Initiative
          </h2>
          <p className="mt-4 text-sm leading-7 text-base-content/70">{event.description}</p>

          {guidelines.length > 0 && (
            <>
              <h3 className={`mt-9 ${volunteerLabelStyle}`}>Volunteer Guidelines</h3>
              <ul className="mt-4 space-y-3.5">
                {guidelines.map((guideline, index) => (
                  <motion.li
                    key={index}
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.05 * index }}
                    className="flex items-start gap-3 text-sm leading-6 text-base-content/70"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {guideline}
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-7">
          {/* Organizer */}
          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
            <p className={volunteerLabelStyle}>Initiative Organizer</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-base-300 text-lg font-bold text-base-content">
                {initialsOf(organizerEmail)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-base-content">
                  {organizerEmail ? displayName(organizerEmail) : "Kindora Team"}
                </p>
                <p className="truncate text-xs text-base-content/70">
                  {organizerEmail || "Organizer info not provided"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2.5 border-t border-base-300 pt-4 text-xs font-medium text-base-content/55">
              <HiCheckBadge className="text-base text-primary" />
              Verified Platform Member
            </div>
          </div>

          {/* Volunteers */}
          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
            <p className={volunteerLabelStyle}>
              Confirmed Volunteers{" "}
              <span className="text-primary">({volunteers.length})</span>
            </p>
            <div className="mt-4 space-y-2.5">
              <AnimatePresence initial={false}>
                {volunteers.length === 0 ? (
                  <motion.p
                    key="empty-volunteers"
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="rounded-2xl bg-secondary/20/70 px-4 py-6 text-center text-sm leading-6 text-base-content/70"
                  >
                    No volunteers yet. Be the first to join this cause!
                  </motion.p>
                ) : (
                  volunteers.map((volunteer) => (
                    <motion.div
                      key={volunteer}
                      layout
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={shouldReduceMotion ? {} : { opacity: 0, x: 14 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors duration-300 hover:bg-base-100"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/30 text-xs font-bold text-base-content/55">
                        {initialsOf(volunteer)}
                      </span>
                      <p className="truncate text-sm font-medium text-base-content">
                        {volunteer.includes("@") ? displayName(volunteer) : volunteer}
                      </p>
                      {youMarked(volunteer) && (
                        <span className="ml-auto shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-success ring-1 ring-success/20">
                          You
                        </span>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- helpers ---------- */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatWeekday = (dateValue: string) => {
  const parsed = parseDateParts(dateValue);
  return parsed ? WEEKDAYS[parsed.weekday] : null;
};

const formatDay = (dateValue: string) => {
  const parsed = parseDateParts(dateValue);
  return parsed ? `${MONTHS[parsed.month]} ${parsed.day}, ${parsed.year}` : null;
};

/**
 * Parse "YYYY-MM-DD" without reading the system clock so the value stays
 * stable inside the prerendered Cache Components shell.
 */
const parseDateParts = (dateValue: string | undefined) => {
  if (!dateValue) return null;
  const [year, month, day] = dateValue.split("-").map(Number);
  if (!year || !month || !day) return null;
  return {
    year,
    month: month - 1,
    day,
    weekday: Math.floor(Date.UTC(year, month - 1, day) / 86_400_000 + 4) % 7, // 1970-01-01 was a Thursday
  };
};

const volunteerCountLabel = (count: number) => {
  if (count === 0) return "No volunteers yet";
  if (count === 1) return "1 Volunteer Joined";
  return `${count} Volunteers Joined`;
};

const displayName = (email: string) => {
  const localPart = email.split("@")[0] || email;
  return localPart
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};
