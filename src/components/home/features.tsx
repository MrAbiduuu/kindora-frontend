"use client";

import { motion } from "motion/react";
import {
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineHeart,
  HiOutlineSparkles,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineCalendarDays,
    chip: "bg-[#F9E8E8] text-[#E83B5B]",
    title: "Create Meaningful Events",
    description:
      "Turn your ideas into real community initiatives. Organize cleanups, tree plantations, donation drives, and other activities that make a difference.",
  },
  {
    icon: HiOutlineUsers,
    chip: "bg-[#F5EBDD] text-[#80634F]",
    title: "Volunteer Together",
    description:
      "Discover upcoming events in your community and join hands with people who share your passion for creating positive change.",
  },
  {
    icon: HiOutlineHeart,
    chip: "bg-[#F9E8E8] text-[#E83B5B]",
    title: "Make Every Act Count",
    description:
      "Whether you give your time, share resources, or support a cause, every small contribution helps build a stronger community.",
  },
  {
    icon: HiOutlineSparkles,
    chip: "bg-[#F5EBDD] text-[#80634F]",
    title: "Manage Your Impact",
    description:
      "Keep track of the events you organize and the initiatives you join. Stay connected and continue making a difference.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-base-200 py-20 md:py-24">
      {/* Soft Decorations */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            What Makes Us Different
          </p>

          <h2 className="mt-4 font-[family-name:var(--font-ibm-plex-serif)] text-3xl font-bold leading-tight tracking-tight text-base-content sm:text-4xl md:text-5xl">
            Small Actions, Lasting Change
          </h2>

          <p className="mt-4 text-base leading-7 text-base-content/65 sm:text-lg">
            Kindora makes it easier to discover opportunities, connect with
            volunteers, and turn your good intentions into meaningful action.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, chip, title, description }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={{
                y: -9,
                transition: { duration: 0.25 },
              }}
              className="group rounded-3xl border border-base-300 bg-base-100 p-7 text-left shadow-sm transition-shadow duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Icon */}
              <motion.div
                whileHover={{
                  scale: 1.12,
                  rotate: 8,
                }}
                transition={{ duration: 0.25 }}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${chip}`}
              >
                <Icon className="text-3xl" />
              </motion.div>

              {/* Title */}
              <h3 className="mt-6 font-[family-name:var(--font-ibm-plex-serif)] text-lg font-bold tracking-tight text-base-content">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-7 text-base-content/65">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
