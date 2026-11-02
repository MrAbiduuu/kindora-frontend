import Link from "next/link";
import {
  HiArrowRight,
  HiOutlineHeart,
  HiOutlineUsers,
  HiOutlineGlobeAsiaAustralia,
} from "react-icons/hi2";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-base-200">
      {/* Background Decorations */}
      <div className="motion-safe:animate-float-slow absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="motion-safe:animate-float-slow absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl [animation-delay:-3s]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28 lg:px-8">
        {/* Left Content */}
        <div className="space-y-7">
          <div className="inline-flex animate-in items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20 fade-in slide-in-from-bottom-3 fill-mode-both duration-700">
            <HiOutlineHeart className="text-lg" />
            <span>Be the reason someone smiles</span>
          </div>

          <h1 className="font-(family-name:--font-serif) animate-in text-4xl font-bold leading-[1.1] tracking-tight text-base-content sm:text-5xl lg:text-6xl fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-700 [animation-delay:100ms]">
            Small Acts.
            <br />
            <span className="text-primary italic">Greater Impact.</span>
          </h1>

          <p className="max-w-xl animate-in text-base leading-8 text-base-content/65 sm:text-lg fade-in slide-in-from-bottom-3 fill-mode-both duration-700 [animation-delay:200ms]">
            Great changes begin with small actions. Connect with passionate
            people, join meaningful community events, and make a positive
            difference in the world around you.
          </p>

          {/* Buttons */}
          <div className="flex animate-in flex-wrap gap-4 pt-2 fade-in slide-in-from-bottom-3 fill-mode-both duration-700 [animation-delay:300ms]">
            <Link
              href="/events"
              className="btn btn-primary rounded-full px-7 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
            >
              Explore Events
              <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/about"
              className="btn btn-outline rounded-full px-7 transition-all duration-300 hover:-translate-y-1"
            >
              Discover Kindora
            </Link>
          </div>

          {/* Community Highlights */}
          <div className="flex animate-in flex-wrap items-center gap-6 border-t border-base-300 pt-7 fade-in slide-in-from-bottom-3 fill-mode-both duration-700 [animation-delay:400ms]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HiOutlineUsers className="text-2xl" />
              </div>
              <div>
                <p className="font-bold text-base-content">Together</p>
                <p className="text-xs text-base-content/60">
                  Stronger communities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-content">
                <HiOutlineGlobeAsiaAustralia className="text-2xl" />
              </div>
              <div>
                <p className="font-bold text-base-content">For Everyone</p>
                <p className="text-xs text-base-content/60">
                  A better tomorrow
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-lg">
          {/* Main Visual Card */}
          <div className="relative aspect-4/5 animate-in overflow-hidden rounded-[2rem] border border-base-300 bg-linear-to-br from-primary/15 via-base-100 to-secondary/20 shadow-2xl shadow-primary/10 fade-in-0 zoom-in-95 fill-mode-both duration-700 delay-100">
            {/* Decorative Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full border border-primary/20" />
              <div className="absolute h-56 w-56 rounded-full border border-primary/30" />
              <div className="absolute h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
            </div>

            {/* Central Illustration */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-6 flex h-32 w-32 animate-in items-center justify-center rounded-full bg-primary text-primary-content shadow-2xl shadow-primary/40 zoom-in-75 fill-mode-both delay-300 duration-700">
                <HiOutlineHeart className="motion-safe:animate-pulse text-7xl" />
              </div>

              <h2 className="font-(family-name:--font-serif) animate-in text-3xl font-bold text-base-content sm:text-4xl fade-in slide-in-from-bottom-3 fill-mode-both delay-200 duration-700">
                Make Good
                <br />
                Things Happen.
              </h2>

              <p className="mt-4 max-w-xs animate-in text-sm leading-7 text-base-content/65 fade-in slide-in-from-bottom-3 fill-mode-both delay-300 duration-700">
                One community. Countless possibilities. Every little action
                matters.
              </p>

              <div className="mt-7 flex animate-in -space-x-3 fade-in slide-in-from-bottom-3 fill-mode-both delay-500 duration-700">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-base-100 bg-primary text-sm font-bold text-primary-content">
                  K
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-base-100 bg-secondary text-sm font-bold text-secondary-content">
                  +
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-base-100 bg-accent text-sm font-bold text-accent-content">
                  ♥
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 1 */}
          <div className="motion-safe:animate-float absolute -left-5 top-12 flex items-center gap-3 rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl shadow-primary/10 sm:-left-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HiOutlineHeart className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-bold text-base-content">
                Spread Kindness
              </p>
              <p className="text-xs text-base-content/60">Start with one act</p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="motion-safe:animate-float absolute -bottom-5 right-3 flex items-center gap-3 rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl shadow-secondary/20 sm:-right-8 [animation-delay:-3s]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/20 text-secondary-content">
              <HiOutlineUsers className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-bold text-base-content">
                Join the Movement
              </p>
              <p className="text-xs text-base-content/60">
                Be part of the change
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
