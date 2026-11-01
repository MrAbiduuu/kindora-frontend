"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineArrowLeft,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-base-100 px-6 py-20">
      {/* Background Decorations */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-secondary/15 blur-3xl"
      />

      <motion.section
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : 40,
          scale: shouldReduceMotion ? 1 : 0.96,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-2xl text-center"
      >
        {/* Floating Heart Icon */}
        <motion.div
          animate={
            shouldReduceMotion ? {} : { y: [0, -12, 0], rotate: [0, 5, -5, 0] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-primary/15 bg-primary/10 shadow-lg shadow-primary/10"
        >
          <HiOutlineHeart className="text-5xl text-primary" />
        </motion.div>

        {/* 404 */}
        <motion.p
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 150 }}
          className="font-[family-name:var(--font-ibm-plex-serif)] text-8xl font-bold tracking-tight text-primary sm:text-9xl"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-4 font-[family-name:var(--font-ibm-plex-serif)] text-3xl font-bold text-base-content sm:text-4xl"
        >
          Oops! This page wandered off.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mx-auto mt-5 max-w-lg text-base leading-8 text-base-content/65 sm:text-lg"
        >
          Looks like this page couldn't be found. Don't worry, there's still
          plenty of kindness waiting to be discovered.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          >
            <Link
              href="/"
              className="btn btn-primary h-12 min-w-44 rounded-full px-7 shadow-lg shadow-primary/20"
            >
              <HiOutlineHome className="text-lg" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          >
            <Link
              href="/upcoming-events"
              className="btn btn-outline h-12 min-w-44 rounded-full border-base-300 px-7 text-base-content hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              <HiOutlineMagnifyingGlass className="text-lg" />
              Explore Events
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-12 inline-flex items-center gap-2 text-sm text-base-content/50"
        >
          <HiOutlineArrowLeft />
          Every little act makes the world better.
        </motion.p>
      </motion.section>
    </main>
  );
}
