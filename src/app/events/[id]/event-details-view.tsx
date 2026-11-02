"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  HiCheckBadge,
  HiLink,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineUserGroup,
} from "react-icons/hi2";

// Attached automatically from the current session (no auth flow yet)
const ORGANIZER_SESSION_EMAIL = "dewan.abid.02.2006@gmail.com";

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
};

const EASE = [0.22, 1, 0.36, 1] as const;

const volunteerLabelStyle =
  "text-xs font-semibold uppercase tracking-[0.14em] text-[#A66F70]";

const initialsOf = (value: string) => {
  const email = value.split("@")[0] || value;
  return email.slice(0, 1).toUpperCase();
};

export default function EventDetailsView({ event }: { event: EventDetails }) {
  const shouldReduceMotion = useReducedMotion();

  const [volunteers, setVolunteers] = useState<string[]>(event.volunteers ?? []);
  const [joinState, setJoinState] = useState<"idle" | "loading" | "joined" | "error">(
    (event.volunteers ?? []).includes(ORGANIZER_SESSION_EMAIL) ? "joined" : "idle",
  );
  const [copied, setCopied] = useState(false);

  const eventId = event._id ?? event.id;
  const formattedDate = `${formatWeekday(event.date)}, ${formatDay(event.date)}`;

  const imageURL = event.thumbnail;
  const organizerEmail = event.organizerEmail ?? ORGANIZER_SESSION_EMAIL;
  const guidelines = event.volunteerGuidelines ?? [];

  const handleJoin = async (formEvent: FormEvent<HTMLButtonElement>) => {
    formEvent.preventDefault();
    if (joinState === "joined" || joinState === "loading") return;

    setJoinState("loading");
    try {
      const res = await fetch(`${API_URL}/${eventId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ORGANIZER_SESSION_EMAIL }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Failed to join");
      setVolunteers(Array.isArray(data.volunteers) ? data.volunteers : []);
      setJoinState("joined");
    } catch {
      setJoinState("error");
    }
  };

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
      className="overflow-hidden rounded-[2rem] border border-[#EEDFD1] bg-[#FFF9F5] shadow-sm"
    >
      {/* ---------- Hero ---------- */}
      <div className="relative h-72 sm:h-96">
        <img
          src={imageURL}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/5" />

        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold tracking-wide text-[#6B5146] backdrop-blur-sm sm:left-8 sm:top-8">
          <span className="h-2 w-2 rounded-full bg-[#E83B5B]" />
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
      <div className="relative flex flex-col gap-5 border-b border-[#EEDFD1] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-center gap-4">
          <span className="inline-flex rounded-2xl bg-[#E83B5B]/10 p-3.5 ring-1 ring-[#E83B5B]/20">
            <HiOutlineUserGroup className="text-2xl text-[#E83B5B]" />
          </span>
          <div>
            <motion.p
              key={volunteers.length}
              initial={shouldReduceMotion ? {} : { scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="text-sm font-bold text-[#6B5146]"
            >
              {volunteerCountLabel(volunteers.length)}
            </motion.p>
            <p className="text-xs text-[#8C7B73]">
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
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#EEDFD1] bg-white text-[#8C7B73] transition-colors duration-300 hover:border-[#E83B5B]/40 hover:text-[#E83B5B]"
          >
            <motion.span
              animate={copied ? { rotate: copied ? 15 : 0 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              {copied ? <HiCheckBadge className="text-lg text-[#E83B5B]" /> : <HiLink className="text-lg" />}
            </motion.span>
          </motion.button>

          {joinState === "joined" ? (
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
              className="inline-flex items-center gap-2.5 rounded-full bg-[#E83B5B] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E83B5B]/25 transition-colors duration-300 hover:bg-[#D92F50] disabled:opacity-70"
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
          <h2 className="font-(family-name:--font-ibm-plex-serif) text-2xl font-bold tracking-tight text-[#6B5146]">
            About this Initiative
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#8C7B73]">{event.description}</p>

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
                    className="flex items-start gap-3 text-sm leading-6 text-[#8C7B73]"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E83B5B]" />
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
          <div className="rounded-3xl border border-[#EEDFD1] bg-white p-6 shadow-sm">
            <p className={volunteerLabelStyle}>Initiative Organizer</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEDFD1] text-lg font-bold text-[#6B5146]">
                {initialsOf(organizerEmail)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#6B5146]">
                  {displayName(organizerEmail)}
                </p>
                <p className="truncate text-xs text-[#8C7B73]">{organizerEmail}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2.5 border-t border-[#EEDFD1] pt-4 text-xs font-medium text-[#A66F70]">
              <HiCheckBadge className="text-base text-[#E83B5B]" />
              Verified Platform Member
            </div>
          </div>

          {/* Volunteers */}
          <div className="rounded-3xl border border-[#EEDFD1] bg-white p-6 shadow-sm">
            <p className={volunteerLabelStyle}>
              Confirmed Volunteers{" "}
              <span className="text-[#E83B5B]">({volunteers.length})</span>
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
                    className="rounded-2xl bg-[#F5EBDD]/70 px-4 py-6 text-center text-sm leading-6 text-[#8C7B73]"
                  >
                    No volunteers yet. Be the first to join this cause!
                  </motion.p>
                ) : (
                  volunteers.map((email) => (
                    <motion.div
                      key={email}
                      layout
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={shouldReduceMotion ? {} : { opacity: 0, x: 14 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors duration-300 hover:bg-[#FFF9F5]"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0DEDB] text-xs font-bold text-[#A66F70]">
                        {initialsOf(email)}
                      </span>
                      <p className="truncate text-sm font-medium text-[#6B5146]">{email}</p>
                      {email === ORGANIZER_SESSION_EMAIL && (
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
