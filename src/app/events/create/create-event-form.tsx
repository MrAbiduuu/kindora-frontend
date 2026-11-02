"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { format, parse } from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import type { IconType } from "react-icons";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheckCircle,
  HiLockClosed,
  HiOutlineArchiveBox,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineHeart,
  HiOutlineMapPin,
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineTrash,
} from "react-icons/hi2";

// Attached automatically from the current session (no editable field)
const ORGANIZER_EMAIL = "dewan.abid.02.2006@gmail.com";

const EVENT_TYPES = [
  { value: "Donation", icon: HiOutlineHeart },
  { value: "Winter Clothes Drive", icon: HiOutlineShoppingBag },
  { value: "Blanket Relief", icon: HiOutlineArchiveBox },
  { value: "Cleanup Drive", icon: HiOutlineTrash },
  { value: "Tree Plantation", icon: HiOutlineSparkles },
] as const;

const PHOTO_PRESETS = [
  {
    label: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Cleanup",
    url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const inputClass =
  "input h-14 w-full rounded-full border-base-300 bg-base-100 pl-12 text-sm font-medium text-base-content shadow-sm transition-all duration-300 placeholder:font-normal placeholder:text-base-content/40 hover:border-primary/30 focus:border-primary focus:outline-primary/20";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55";

const CreateEventForm = ({ today }: { today: string }) => {
  const shouldReduceMotion = useReducedMotion();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>(EVENT_TYPES[0].value);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  const maxDescription = 500;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:5000/events/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        type,
        date,
        location,
        thumbnail,
        description,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (!title.trim()) {
      setError("Please give your event a title.");
      return;
    }
    if (!date || date < today) {
      setError("Event date must be today or in the future.");
      return;
    }
    if (!location.trim()) {
      setError("Please add a location or venue.");
      return;
    }
    if (description.trim().length < 20) {
      setError("Please describe the event in at least 20 characters.");
      return;
    }

    setError(null);
    setPublished(true);
  };

  const resetForm = () => {
    setTitle("");
    setType(EVENT_TYPES[0].value);
    setDate("");
    setLocation("");
    setThumbnail("");
    setDescription("");
    setError(null);
    setPublished(false);
  };

  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Back to events */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-6"
        >
          <Link
            href="/events"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-base-content/70 transition-colors duration-300 hover:text-primary"
          >
            <HiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Upcoming Events
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 48,
            scale: shouldReduceMotion ? 1 : 0.97,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 px-6 py-10 shadow-sm sm:px-10 md:py-14"
        >
          {/* Floating decorations */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : { x: [0, 22, 0], y: [0, 26, 0], scale: [1, 1.12, 1] }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : { x: [0, -22, 0], y: [0, -26, 0], scale: [1, 1.14, 1] }
            }
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
          />

          <AnimatePresence mode="wait">
            {published ? (
              /* ---------- Success state ---------- */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{
                    scale: shouldReduceMotion ? 1 : 0.3,
                    rotate: shouldReduceMotion ? 0 : -30,
                  }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 13,
                    delay: 0.15,
                  }}
                  className="inline-flex rounded-full bg-success/10 p-6 ring-1 ring-success/25"
                >
                  <HiCheckCircle className="text-6xl text-success" />
                </motion.div>

                <h2 className="mt-8 font-[family-name:var(--font-ibm-plex-serif)] text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                  Your event is <span className="text-primary">live!</span>
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-base-content/70">
                  {title} has been published. Volunteers nearby will be able to
                  discover it and join your cause.
                </p>

                {/* Summary */}
                <div className="mt-8 w-full max-w-md space-y-3 rounded-3xl border border-base-300 bg-white/80 p-6 text-left">
                  <SummaryRow icon={HiOutlinePencilSquare} value={title} />
                  <SummaryRow icon={HiOutlineSparkles} value={type} />
                  <SummaryRow
                    icon={HiOutlineCalendarDays}
                    value={format(
                      parse(date, "yyyy-MM-dd", new Date()),
                      "MMMM d, yyyy",
                    )}
                  />
                  <SummaryRow icon={HiOutlineMapPin} value={location} />
                </div>

                <div className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  >
                    <Link
                      href="/events"
                      className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/85"
                    >
                      View All Events
                      <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                  <motion.button
                    type="button"
                    onClick={resetForm}
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                    className="rounded-full border border-base-300 bg-base-100 px-7 py-3.5 text-sm font-semibold text-base-content/70 transition-colors duration-300 hover:border-primary/40 hover:text-primary"
                  >
                    Create Another Event
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* ---------- Form state ---------- */
              <motion.div
                key="form"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative"
              >
                {/* Badge */}
                <motion.div
                  variants={itemVariants}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-300 bg-white/80 px-4 py-2"
                >
                  <HiOutlineSparkles className="text-lg text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/55">
                    Social Service Drive
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  variants={itemVariants}
                  className="font-[family-name:var(--font-ibm-plex-serif)] text-3xl font-bold leading-tight tracking-tight text-base-content sm:text-4xl md:text-5xl"
                >
                  Create a <span className="text-primary">Community</span>{" "}
                  Event
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-4 max-w-xl text-sm leading-7 text-base-content/70 sm:text-base"
                >
                  Organize a local relief effort, environmental cleanup, or
                  community support drive. Every small act creates a greater
                  impact.
                </motion.p>

                <motion.form
                  variants={itemVariants}
                  noValidate
                  onSubmit={handleSubmit}
                  className="mt-10"
                >
                  <div className="space-y-7">
                    {/* Event Title */}
                    <div>
                      <p className={labelClass}>
                        Event Title <span className="text-primary">*</span>
                      </p>
                      <div className="group relative mt-2.5">
                        <HiOutlinePencilSquare className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-base-content/40 transition-colors duration-300 group-focus-within:text-primary" />
                        <input
                          type="text"
                          value={title}
                          onChange={(event) => {
                            setTitle(event.target.value);
                            setError(null);
                          }}
                          placeholder="e.g. Winter Clothes Distribution — Mirpur 10, Dhaka"
                          maxLength={100}
                          className={`${inputClass} pr-4`}
                        />
                      </div>
                    </div>

                    {/* Event Type + Date */}
                    <div className="space-y-7 md:grid md:grid-cols-2 md:gap-7 md:space-y-0">
                      <div>
                        <p className={labelClass}>
                          Event Type <span className="text-primary">*</span>
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2.5">
                          {EVENT_TYPES.map((eventType) => {
                            const Icon = eventType.icon;
                            const selected = type === eventType.value;
                            return (
                              <motion.button
                                key={eventType.value}
                                type="button"
                                whileHover={
                                  shouldReduceMotion
                                    ? {}
                                    : { y: -2, scale: 1.02 }
                                }
                                whileTap={
                                  shouldReduceMotion ? {} : { scale: 0.94 }
                                }
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 17,
                                }}
                                aria-pressed={selected}
                                onClick={() => {
                                  setType(eventType.value);
                                  setError(null);
                                }}
                                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                                  selected
                                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                                    : "border-base-300 bg-base-100 text-base-content/70 hover:border-primary/50 hover:text-primary"
                                }`}
                              >
                                <Icon className="text-base" />
                                {eventType.value}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className={labelClass}>
                          Event Date <span className="text-primary">*</span>
                        </p>
                        <div className="group relative mt-2.5">
                          <HiOutlineCalendarDays className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-base-content/40" />
                          <input
                            type="date"
                            min={today}
                            value={date}
                            onChange={(event) => {
                              setDate(event.target.value);
                              setError(null);
                            }}
                            className={`${inputClass} pr-4 [color-scheme:light]`}
                          />
                        </div>
                        <p className="mt-2.5 text-xs text-base-content/40">
                          Dates must be in the future (today or later).
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <p className={labelClass}>
                        Location / Venue{" "}
                        <span className="text-primary">*</span>
                      </p>
                      <div className="group relative mt-2.5">
                        <HiOutlineMapPin className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-base-content/40 transition-colors duration-300 group-focus-within:text-primary" />
                        <input
                          type="text"
                          value={location}
                          onChange={(event) => {
                            setLocation(event.target.value);
                            setError(null);
                          }}
                          placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                          maxLength={120}
                          className={`${inputClass} pr-4`}
                        />
                      </div>
                    </div>

                    {/* Thumbnail */}
                    <div>
                      <p className={labelClass}>
                        Thumbnail Image URL{" "}
                        <span className="text-primary">*</span>
                      </p>
                      <div className="group relative mt-2.5">
                        <HiOutlinePhoto className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lg text-base-content/40 transition-colors duration-300 group-focus-within:text-primary" />
                        <input
                          type="url"
                          value={thumbnail}
                          onChange={(event) => setThumbnail(event.target.value)}
                          placeholder="https://images.unsplash.com/photo-…"
                          className={`${inputClass} pr-4`}
                        />
                      </div>
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-base-content/40">
                        <span>Quick photo presets:</span>
                        {PHOTO_PRESETS.map((preset, index) => (
                          <span
                            key={preset.label}
                            className="inline-flex items-center gap-2"
                          >
                            {index > 0 && (
                              <span className="text-base-300">•</span>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setThumbnail(preset.url);
                                setError(null);
                              }}
                              className="font-semibold text-base-content/55 underline-offset-2 transition-colors duration-300 hover:text-primary hover:underline"
                            >
                              {preset.label}
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <p className={labelClass}>
                        Event Description{" "}
                        <span className="text-primary">*</span>
                      </p>
                      <div className="group relative mt-2.5">
                        <HiOutlineDocumentText className="pointer-events-none absolute left-4 top-5 text-lg text-base-content/40 transition-colors duration-300 group-focus-within:text-primary" />
                        <textarea
                          value={description}
                          onChange={(event) => {
                            setDescription(event.target.value);
                            setError(null);
                          }}
                          placeholder="Explain the purpose of the drive, volunteers required, items being distributed, or tasks to complete…"
                          rows={5}
                          maxLength={maxDescription}
                          className="textarea w-full rounded-[1.75rem] border-base-300 bg-base-100 py-4 pl-12 pr-14 text-sm font-medium leading-7 text-base-content shadow-sm transition-all duration-300 placeholder:font-normal placeholder:text-base-content/40 hover:border-primary/30 focus:border-primary focus:outline-primary/20"
                        />
                        <span className="absolute right-5 top-5 text-[11px] font-medium tabular-nums text-base-content/40">
                          {description.length}/{maxDescription}
                        </span>
                      </div>
                    </div>

                    {/* Organizer email (attached) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-base-300 bg-white/70 px-5 py-3.5">
                      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-base-content/70">
                        <HiOutlineEnvelope className="text-lg text-base-content/40" />
                        Organizer Email attached:
                      </span>
                      <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-base-content">
                        {ORGANIZER_EMAIL}
                        <HiLockClosed className="text-sm text-base-content/40" />
                      </span>
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -8 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            x: [0, -5, 5, -3, 3, 0],
                          }}
                          exit={{ opacity: 0, y: -8 }}
                          className="text-sm font-medium text-error"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <div className="pt-1">
                      <motion.button
                        type="submit"
                        whileHover={
                          shouldReduceMotion ? {} : { y: -4, scale: 1.02 }
                        }
                        whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors duration-300 hover:bg-primary/85 sm:text-base"
                      >
                        <HiOutlineSparkles className="text-lg transition-transform duration-300 group-hover:rotate-12" />
                        Publish Event
                        <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>
                    </div>
                  </div>
                </motion.form>

                {/* Bottom accent */}
                <motion.div
                  variants={itemVariants}
                  className="mt-10 h-px w-full bg-gradient-to-r from-primary/40 via-base-300 to-transparent"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const SummaryRow = ({
  icon: Icon,
  value,
}: {
  icon: IconType;
  value: string;
}) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="inline-flex shrink-0 rounded-full bg-base-100 p-2 text-primary ring-1 ring-base-300">
      <Icon className="text-base" />
    </span>
    <span className="font-semibold text-base-content">{value}</span>
  </div>
);

export default CreateEventForm;
