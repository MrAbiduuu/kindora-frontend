import { Suspense } from "react";
import Link from "next/link";
import { HiArrowLeft, HiOutlineExclamationTriangle } from "react-icons/hi2";
import EventDetailsView from "./event-details-view";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { API_BASE_URL } from "@/lib/api";

export const metadata = {
  title: "Event Details — Kindora",
  description: "Dive into the full story of a community initiative on Kindora.",
};

export default function EventDetailsPage(props: PageProps<"/events/[id]">) {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Back to events (part of the static shell) */}
        <div className="mb-6">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-base-content/70 transition-colors duration-300 hover:text-primary"
          >
            <HiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Upcoming Events
          </Link>
        </div>

        <Suspense fallback={<EventDetailsSkeleton />}>
          <EventDetailsFetcher params={props.params} />
        </Suspense>
      </div>
    </section>
  );
}

/**
 * The event id comes from the URL and the data from the backend, so this
 * stays behind <Suspense>: the static shell renders the skeleton, and the
 * details stream in at request time (Next Cache Components).
 */
async function EventDetailsFetcher({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const token = await getTokenFromServer();
  let event = null;
  try {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      headers: token ? { authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    event = await res.json();
  } catch {
    event = null;
  }

  if (!event) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-base-300 bg-base-100 px-8 py-14 text-center shadow-sm">
        <span className="inline-flex rounded-full bg-primary/10 p-4">
          <HiOutlineExclamationTriangle className="text-3xl text-primary" />
        </span>
        <h2 className="mt-6 font-(family-name:--font-ibm-plex-serif) text-2xl font-bold text-base-content">
          Event not found
        </h2>
        <p className="mt-3 text-sm leading-7 text-base-content/70">
          This event may have been removed, or the link is no longer valid.
          Explore the upcoming drives to find new ways to help.
        </p>
        <Link
          href="/events"
          className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/85"
        >
          <HiArrowLeft className="text-base" />
          Browse Upcoming Events
        </Link>
      </div>
    );
  }

  return <EventDetailsView event={event} />;
}

/* Loading skeleton shown by <Suspense> while the details stream in. */
const EventDetailsSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
    <div className="h-72 bg-base-200 sm:h-96" />
    <div className="space-y-4 px-6 py-8 sm:px-10">
      <div className="h-10 w-1/2 rounded-full bg-base-300" />
      <div className="h-4 w-1/3 rounded-full bg-base-300" />
      <div className="grid gap-10 pt-6 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-3">
          <div className="h-4 w-full rounded-full bg-base-200" />
          <div className="h-4 w-5/6 rounded-full bg-base-200" />
          <div className="h-4 w-2/3 rounded-full bg-base-200" />
        </div>
        <div className="h-56 rounded-3xl bg-base-200" />
      </div>
    </div>
  </div>
);
