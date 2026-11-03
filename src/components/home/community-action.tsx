"use client";

import Image from "next/image";
import { useRef } from "react";
import { MdArrowBack, MdArrowForward, MdLocationOn } from "react-icons/md";

const communityActions = [
  {
    tag: "WARMTH FOR RICKSHAW PULLERS",
    title: "Winter Clothes Drive",
    location: "Mirpur 10, Dhaka",
    image: "https://images.unsplash.com/photo-1489493512598-d08130f49bea?w=900",
  },
  {
    tag: "SHELTERLESS NIGHT SUPPORT",
    title: "Night Blanket Relief",
    location: "Mohammadpur, Dhaka",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900",
  },
  {
    tag: "ECO PLASTIC-FREE WATERS",
    title: "Dhanmondi Lake Clean-up",
    location: "Dhanmondi, Dhaka",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900",
  },
  {
    tag: "1000 GREEN SAPLINGS",
    title: "Urban Tree Plantation",
    location: "Uttara, Dhaka",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900",
  },
  {
    tag: "FRESH MEALS SHARING",
    title: "Community Food Relief",
    location: "Old Dhaka",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900",
  },
  {
    tag: "EDUCATION FOR UNDERPRIVILEGED",
    title: "Children Book & Bag Drive",
    location: "Rayerbazar, Dhaka",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900",
  },
];

export default function CommunityAction() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const scrollAmount = carousel.clientWidth * 0.8;

    // Reached the end: go back to the beginning
    if (direction === "right" && carousel.scrollLeft >= maxScroll - 10) {
      carousel.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    // At the beginning: go to the end
    if (direction === "left" && carousel.scrollLeft <= 10) {
      carousel.scrollTo({
        left: maxScroll,
        behavior: "smooth",
      });
      return;
    }

    // Normal scrolling
    carousel.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-base-200/50 px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Visual Stories
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-base-content md:text-4xl">
            Community stories
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-base-content/60">
            Scroll to explore more community stories <br /> Together, every
            action creates a lasting impact.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="mb-5 flex justify-end gap-3">
          <button
            onClick={() => scrollCarousel("left")}
            aria-label="Previous community actions"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content shadow-sm transition hover:bg-primary hover:text-primary-content"
          >
            <MdArrowBack className="text-xl" />
          </button>

          <button
            onClick={() => scrollCarousel("right")}
            aria-label="Next community actions"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-base-100 text-base-content shadow-sm transition hover:bg-primary hover:text-primary-content"
          >
            <MdArrowForward className="text-xl" />
          </button>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {communityActions.map((action, index) => (
            <div
              key={index}
              className="group relative h-60 min-w-[85%] snap-start overflow-hidden rounded-xl border border-base-300 shadow-md sm:min-w-[48%] lg:min-w-[32%]"
            >
              {/* Image */}
              <Image
                src={action.image}
                alt={action.title}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-block max-w-full truncate rounded-md bg-primary px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-primary-content">
                  {action.tag}
                </span>

                <h3 className="mt-1 text-base font-bold text-white">
                  {action.title}
                </h3>

                <p className="mt-1 flex items-center gap-1 text-xs text-white/90">
                  <MdLocationOn className="text-primary" />
                  {action.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Indicator */}
        <p className="mt-2 text-center text-xs text-base-content/50">
          Scroll to explore more community stories
        </p>
      </div>
    </section>
  );
}
