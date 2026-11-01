import Link from "next/link";
import {
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineUsers,
  HiArrowRight,
} from "react-icons/hi2";

const impactStats = [
  { value: "1,200+", label: "Volunteers connected" },
  { value: "300+", label: "Community events hosted" },
  { value: "25+", label: "Neighbourhoods reached" },
];

const values = [
  {
    icon: HiOutlineUsers,
    chip: "bg-primary/10 text-primary",
    title: "Volunteer Together",
    description:
      "Join hands with people near you and turn everyday hours into real, visible change.",
  },
  {
    icon: HiOutlineHeart,
    chip: "bg-secondary/25 text-secondary-content",
    title: "Support Causes You Love",
    description:
      "Discover community events that speak to your heart — from cleanups to food drives.",
  },
  {
    icon: HiOutlineSparkles,
    chip: "bg-accent/15 text-accent-content",
    title: "Grow the Kindness Ripple",
    description:
      "Every small act inspires another. Watch generosity ripple through your community.",
  },
];

export default function Values() {
  return (
    <section className="relative overflow-hidden bg-base-100 py-20 md:py-24">
      {/* Soft Decorations */}
      <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex animate-in items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-content ring-1 ring-accent/25 fade-in slide-in-from-bottom-3 fill-mode-both duration-700">
            <HiOutlineSparkles className="text-lg" />
            Why Kindora
          </div>

          <h2 className="mt-5 font-(family-name:--font-serif) animate-in text-3xl font-bold leading-tight tracking-tight text-base-content sm:text-4xl md:text-5xl fade-in slide-in-from-bottom-3 fill-mode-both duration-700 [animation-delay:100ms]">
            Kindness, made simple.
          </h2>

          <p className="mt-4 animate-in text-base leading-7 text-base-content/65 sm:text-lg fade-in slide-in-from-bottom-3 fill-mode-both duration-700 [animation-delay:200ms]">
            Kindora brings warm hearts and willing hands to the same table — so
            doing good feels less like a task and more like coming home.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="mx-auto mt-12 grid max-w-3xl animate-in grid-cols-1 gap-4 rounded-[2rem] border border-base-300 bg-base-200/70 p-2 fade-in slide-in-from-bottom-3 fill-mode-both duration-700 delay-200 sm:grid-cols-3">
          {impactStats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-3xl px-6 py-6 text-center transition-colors duration-300 hover:bg-base-100"
            >
              <p className="font-(family-name:--font-serif) text-3xl font-bold text-primary">
                {value}
              </p>
              <p className="mt-1 text-sm text-base-content/60">{label}</p>
            </div>
          ))}
        </div>

        {/* Value Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, chip, title, description }, index) => (
            <article
              key={title}
              className="group rounded-[2rem] animate-in border border-base-300 bg-base-100 p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: `${300 + index * 120}ms` }}
            >
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl shadow-inner ${chip}`}
              >
                <Icon className="text-3xl" />
              </div>

              <h3 className="mt-6 font-(family-name:--font-serif) text-xl font-bold text-base-content">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-base-content/65">
                {description}
              </p>
            </article>
          ))}
        </div>

        {/* Gentle close-out */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-center text-sm text-base-content/60">
            Ready to lend a hand — or a heart?
          </p>
          <Link
            href="/upcoming-events"
            className="btn btn-primary rounded-full px-7 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
          >
            Start Your Kindness Journey
            <HiArrowRight className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
}
