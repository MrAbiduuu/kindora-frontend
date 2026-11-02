import Link from "next/link";
import {
  Heart,
  Users,
  HandHeart,
  Leaf,
  Target,
  Lightbulb,
  ArrowRight,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Heart,
    title: "Kindness First",
    description:
      "We believe even the smallest act of kindness can create a meaningful difference in someone's life.",
  },
  {
    icon: Users,
    title: "Stronger Together",
    description:
      "We bring people together and encourage everyone to contribute their time, skills, and compassion.",
  },
  {
    icon: HandHeart,
    title: "Community Impact",
    description:
      "We encourage meaningful initiatives that support people, strengthen communities, and inspire positive change.",
  },
  {
    icon: Leaf,
    title: "A Better Future",
    description:
      "We believe in building a more caring, inclusive, and sustainable future for the next generation.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover Events",
    description:
      "Explore community initiatives and find causes that matter to you.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Become a Volunteer",
    description:
      "Choose an event and take the first step toward making a difference.",
    icon: Users,
  },
  {
    number: "03",
    title: "Create an Impact",
    description:
      "Work together with others and turn small actions into meaningful change.",
    icon: Heart,
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#FFF9F5] text-[#6B5146]">
      {/* Hero Section */}
      <section className="relative px-5 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-28">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#F9E8E8] blur-3xl opacity-70" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#F9E8E8] blur-3xl opacity-60" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F9E8E8] px-4 py-2 text-sm font-semibold text-[#E83B5B]">
              <Heart size={15} />
              About Kindora
            </span>

            <h1 className="mt-7 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Making the World
              <br />
              Better, <span className="text-[#E83B5B]">Together.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#8C7B73]">
              Kindora is a community-driven platform designed to bring people
              together through volunteering and meaningful initiatives. We
              believe that everyone has the power to make a difference, one
              small act at a time.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E83B5B] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E83B5B]/20 transition hover:-translate-y-1 hover:bg-[#D92E4F]"
              >
                Explore Events
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-[#EEDFD1] bg-white px-6 py-3.5 text-sm font-semibold transition hover:border-[#E83B5B] hover:text-[#E83B5B]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] bg-[#F9E8E8]" />

            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85"
              alt="Volunteers working together"
              className="relative h-90 w-full rounded-[2rem] object-cover shadow-xl sm:h-110"
              width={1200}
              height={440}
            />

            <div className="absolute -bottom-7 -left-4 rounded-2xl border border-[#EEDFD1] bg-white p-5 shadow-lg sm:-left-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#F9E8E8] p-3 text-[#E83B5B]">
                  <Heart size={24} />
                </div>
                <div>
                  <p className="font-serif text-lg font-bold">Small Acts</p>
                  <p className="text-xs text-[#8C7B73]">Greater Impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-[#F9E8E8] p-8 sm:p-10">
            <div className="mb-6 inline-flex rounded-2xl bg-white p-4 text-[#E83B5B]">
              <Target size={30} />
            </div>

            <h2 className="font-serif text-3xl font-bold">Our Mission</h2>

            <p className="mt-5 text-base leading-8 text-[#8C7B73]">
              Our mission is to make volunteering more accessible by connecting
              individuals with meaningful community initiatives. We want to
              encourage kindness, participation, and collective action that can
              positively impact society.
            </p>
          </div>

          <div className="rounded-3xl border border-[#EEDFD1] bg-[#FFF9F5] p-8 sm:p-10">
            <div className="mb-6 inline-flex rounded-2xl bg-[#F9E8E8] p-4 text-[#E83B5B]">
              <Lightbulb size={30} />
            </div>

            <h2 className="font-serif text-3xl font-bold">Our Vision</h2>

            <p className="mt-5 text-base leading-8 text-[#8C7B73]">
              We envision a world where helping others becomes a natural part of
              everyday life. A world where communities grow stronger through
              compassion, collaboration, and the willingness to take action.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E83B5B]">
              What We Believe In
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
              The Values Behind Kindora
            </h2>

            <p className="mt-4 leading-7 text-[#8C7B73]">
              Our values guide everything we do and remind us why community,
              compassion, and kindness matter.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-[#EEDFD1] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-[#E83B5B]/40 hover:shadow-xl hover:shadow-[#E83B5B]/5"
                >
                  <div className="inline-flex rounded-2xl bg-[#F9E8E8] p-4 text-[#E83B5B] transition group-hover:bg-[#E83B5B] group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <span className="mt-7 block text-xs font-bold tracking-widest text-[#D8BDB2]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 font-serif text-xl font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#8C7B73]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E83B5B]">
              Get Involved
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
              Your Journey Starts Here
            </h2>

            <p className="mt-4 leading-7 text-[#8C7B73]">
              Making a difference does not have to be complicated. Here is how
              you can become part of the Kindora community.
            </p>
          </div>

          <div className="relative mt-16 grid gap-10 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative text-center">
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F9E8E8] text-[#E83B5B]">
                    <Icon size={34} />

                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#E83B5B] text-xs font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 font-serif text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#8C7B73]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#E83B5B] px-7 py-16 text-center text-white sm:px-12">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full border-[40px] border-white/10" />

          <div className="relative">
            <Sparkles size={32} className="mx-auto mb-5" />

            <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              Be the Reason Someone Smiles.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              Every little effort counts. Find an opportunity, join a community
              initiative, and help us create a better tomorrow.
            </p>

            <Link
              href="/events"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#E83B5B] transition hover:-translate-y-1 hover:bg-[#FFF9F5]"
            >
              Find an Event
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
