"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Search,
  CalendarCheck,
  X,
} from "lucide-react";

const events = [
  {
    _id: "1",
    title: "Winter Blanket Distribution",
    type: "Winter Relief",
    date: "2026-11-15",
    location: "Banasree, Dhaka",
    thumbnail:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    description:
      "Join us in distributing warm blankets to underprivileged families during the winter season.",
  },
  {
    _id: "2",
    title: "Green Dhaka Tree Plantation",
    type: "Plantation",
    date: "2026-11-22",
    location: "Ramna Park, Dhaka",
    thumbnail:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    description:
      "Help us make Dhaka greener by planting trees and promoting environmental awareness.",
  },
  {
    _id: "3",
    title: "Community Road Cleanup",
    type: "Cleanup",
    date: "2026-12-05",
    location: "Uttara, Dhaka",
    thumbnail:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
    description:
      "Work together to create a cleaner and healthier neighborhood for everyone.",
  },
  {
    _id: "4",
    title: "Free Health Checkup Camp",
    type: "Health Camp",
    date: "2026-12-15",
    location: "Mirpur, Dhaka",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    description:
      "Support a free community health camp providing basic medical consultations.",
  },
  {
    _id: "5",
    title: "Food for Everyone",
    type: "Food Drive",
    date: "2027-01-10",
    location: "Motijheel, Dhaka",
    thumbnail:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80",
    description:
      "Help prepare and distribute nutritious meals to people in need.",
  },
  {
    _id: "6",
    title: "Education for Every Child",
    type: "Education",
    date: "2027-01-25",
    location: "Mohammadpur, Dhaka",
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    description:
      "Volunteer to support children's education through learning materials and mentoring.",
  },
];

export default function ManageEvents() {
  return (
    <main className="min-h-screen px-4 py-12 text-[#6B5146] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="text-sm font-semibold tracking-wider text-[#E83B5B]">
              ORGANIZER DASHBOARD
            </span>

            <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
              Manage Events
            </h1>

            <p className="mt-2 text-sm text-[#8C7B73]">
              Keep track of your community initiatives and manage your events.
            </p>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E83B5B] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#E83B5B]/20 transition hover:bg-[#D92E4F]"
          >
            <Plus size={18} />
            Create New Event
          </Link>
        </div>
      </div>
    </main>
  );
}
