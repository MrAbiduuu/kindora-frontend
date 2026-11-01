"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { FormEvent } from "react";
import {
  HiCheckCircle,
  HiOutlineEnvelope,
  HiArrowRight,
} from "react-icons/hi2";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setSubscribed(true);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section className="bg-base-100 px-6 pb-24 pt-4 lg:px-8">
      <motion.div
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : 60,
          scale: shouldReduceMotion ? 1 : 0.96,
        }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-base-300 bg-linear-to-br from-primary/10 via-base-100 to-accent/10 p-8 text-center shadow-sm md:p-14"
      >
        {/* Floating Decorations */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, 20, 0], y: [0, 25, 0], scale: [1, 1.12, 1] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-secondary/15 blur-3xl"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, -20, 0], y: [0, -25, 0], scale: [1, 1.15, 1] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="relative">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-primary"
          >
            Stay Connected
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="mt-4 font-[family-name:var(--font-ibm-plex-serif)] text-3xl font-bold leading-tight tracking-tight text-base-content sm:text-4xl md:text-5xl"
          >
            Subscribe to Local Cause Alerts
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.7 }}
            className="mx-auto mt-4 max-w-xl text-base leading-7 text-base-content/65"
          >
            Get notified when new winter drives, blanket distributions, or
            emergency cleanups are organized in your neighborhood.
          </motion.p>

          <div className="mt-8">
            {subscribed ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: shouldReduceMotion ? 1 : 0.7,
                  y: shouldReduceMotion ? 0 : 15,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                role="status"
                className="mx-auto inline-flex items-center gap-2 rounded-2xl bg-success/10 px-6 py-3.5 text-sm font-semibold text-success ring-1 ring-success/25"
              >
                <HiCheckCircle className="text-xl" />
                You&apos;re subscribed to local community alerts!
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.32,
                  type: "spring",
                  stiffness: 100,
                  damping: 16,
                }}
                onSubmit={handleSubmit}
                noValidate
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <label className="relative flex-1">
                  <HiOutlineEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-base-content/40" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError(null);
                    }}
                    placeholder="you@kindheart.org"
                    aria-label="Email address"
                    className={`input input-bordered h-12 w-full rounded-full bg-base-900 pl-11 pr-4 font-sans transition-colors duration-300 focus:border-primary focus:outline-primary/40 ${
                      error ? "border-error" : ""
                    }`}
                  />
                </label>

                <motion.button
                  type="submit"
                  whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="btn btn-primary h-12 rounded-full px-7 shadow-lg shadow-primary/25"
                >
                  Subscribe
                  <HiArrowRight className="text-lg" />
                </motion.button>
              </motion.form>
            )}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm font-medium text-error"
            >
              {error}
            </motion.p>
          )}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xs text-base-content/50"
          >
            No spam guaranteed. Unsubscribe at any time.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
