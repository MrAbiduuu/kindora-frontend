"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { HandHeart, Heart, Sparkles, X } from "lucide-react";

const visitSubscription = () => () => {};
const getHasVisited = () => localStorage.getItem("kindora-visited") !== null;
const getHasVisitedServer = () => true;
const SPARKLE_PARTICLES = [
  { left: "10%", top: "22%", size: 12, delay: 0, duration: 3.4 },
  { left: "84%", top: "16%", size: 16, delay: 0.8, duration: 3.8 },
  { left: "16%", top: "72%", size: 10, delay: 1.4, duration: 3.1 },
  { left: "88%", top: "64%", size: 14, delay: 0.4, duration: 4.2 },
  { left: "30%", top: "8%", size: 9, delay: 2, duration: 3.6 },
  { left: "68%", top: "82%", size: 11, delay: 1, duration: 3.3 },
];

const contentVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WelcomePopup() {
  const [dismissed, setDismissed] = useState(false);
  const hasVisited = useSyncExternalStore(
    visitSubscription,
    getHasVisited,
    getHasVisitedServer,
  );
  const isOpen = !hasVisited && !dismissed;

  const handleClose = useCallback(() => {
    try {
      localStorage.setItem("kindora-visited", "true");
    } catch {}
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#49352F]/50 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            aria-hidden="true"
            className="absolute inset-0"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Welcome to Kindora"
            initial={{ opacity: 0, scale: 0.8, y: 48, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 32, rotate: 2 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-visible rounded-3xl border border-[#F0E4DC] bg-[#FFFDF9] p-8 text-center shadow-2xl sm:p-10"
          >
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-rose-300/40 blur-3xl"
            />
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-14 -left-14 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl"
            />

            {SPARKLE_PARTICLES.map((particle, index) => (
              <motion.span
                key={index}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [6, -16, 6],
                  scale: [0.8, 1.15, 0.8],
                }}
                transition={{
                  duration: particle.duration,
                  delay: 0.5 + particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute text-rose-400"
                style={{
                  left: particle.left,
                  top: particle.top,
                  fontSize: particle.size,
                }}
              >
                <Sparkles size={particle.size} strokeWidth={1.6} />
              </motion.span>
            ))}

            <motion.button
              whileHover={{ rotate: 90, scale: 1.12 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleClose}
              aria-label="Close welcome message"
              className="absolute right-5 top-5 z-10 rounded-full p-2 text-[#9A8780] transition-colors hover:bg-rose-50 hover:text-rose-500"
            >
              <X size={20} />
            </motion.button>

            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="show"
              className="relative"
            >
              <motion.div
                variants={itemVariants}
                className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-0 rounded-full border border-rose-400/60 bg-rose-100/50"
                />
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1.4,
                  }}
                  className="absolute inset-0 rounded-full border border-rose-400/60 bg-rose-100/50"
                />
                <motion.span
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-rose-100 via-rose-50 to-amber-50 shadow-inner"
                >
                  <motion.span
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex"
                  >
                    <Heart size={34} className="fill-rose-400 text-rose-500" />
                  </motion.span>
                </motion.span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-500"
              >
                <Sparkles size={16} />
                Welcome to Kindora
                <Sparkles size={16} />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 font-serif text-3xl font-bold leading-tight text-[#49352F] sm:text-4xl"
              >
                Small Acts,
                <br />
                <span className="bg-linear-to-r from-rose-500 via-rose-400 to-amber-500 bg-clip-text text-transparent">
                  Big Changes.
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mx-auto mb-8 max-w-sm text-sm leading-7 text-[#8B7770] sm:text-base"
              >
                Welcome to a community where kindness brings people together.
                Discover meaningful events, volunteer your time, and make a
                positive difference in the world.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row"
              >
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                    boxShadow: "0px 14px 30px rgba(244, 63, 94, 0.28)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition-colors sm:flex-[1.4]"
                >
                  Explore Kindora
                  <HandHeart size={18} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleClose}
                  className="w-full rounded-xl border border-[#EADCD4] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#8B7770] transition-colors hover:border-rose-200 hover:text-rose-500 sm:w-auto"
                >
                  Maybe later
                </motion.button>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[#B49B90]"
              >
                <Heart size={12} className="fill-rose-300 text-rose-300" />
                Together, we can make the world a kinder place.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
