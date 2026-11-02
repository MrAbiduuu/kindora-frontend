"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

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
