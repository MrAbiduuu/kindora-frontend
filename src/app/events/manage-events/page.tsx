"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { format, parse } from "date-fns";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";

interface Event {
  _id: string;
  title: string;
  type: string;
  date: string; // "YYYY-MM-DD"
  location: string;
  thumbnail: string;
  description: string;
  organizerEmail: string;
}

interface EditForm {
  title: string;
  location: string;
  date: string;
  description: string;
}

// "abid.hasan@…" -> "Abid Hasan" for the organizer row on the card.
function displayName(email: string): string {
  const local = email.split("@")[0];
  return local
    .split(/[._-]+/)
    .filter((part) => part && !/^\d+$/.test(part))
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function prettyDate(date: string): string {
  try {
    return format(parse(date, "yyyy-MM-dd", new Date()), "EEE, MMM d, yyyy");
  } catch {
    return date;
  }
}

export default function ManageEvents() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editing, setEditing] = useState<Event | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    title: "",
    location: "",
    date: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const fetchMyEvents = useCallback(async (organizerEmail: string) => {
    setLoading(true);
    setError("");
    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const res = await fetch(
        `${API_BASE_URL}/events/organizer/${encodeURIComponent(organizerEmail)}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to fetch your events.");
      }
      setEvents((await res.json()) as Event[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPending) return;

    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      if (email) {
        fetchMyEvents(email);
      } else {
        setEvents([]);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [email, isPending, fetchMyEvents]);

  const openEdit = (event: Event) => {
    setEditing(event);
    setEditError("");
    setEditForm({
      title: event.title,
      location: event.location,
      date: event.date,
      description: event.description,
    });
  };

  const closeEdit = () => {
    setEditing(null);
    setEditError("");
  };

  const handleEditSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;

    setSaving(true);
    setEditError("");
    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const res = await fetch(`${API_BASE_URL}/events/${editing._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          organizerEmail: email,
          title: editForm.title.trim(),
          location: editForm.location.trim(),
          date: editForm.date,
          description: editForm.description.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to update the event.");

      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === editing._id ? { ...ev, ...editForm } : ev,
        ),
      );
      toast.success("Event edited successfully!");
      closeEdit();
    } catch (err) {
      setEditError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving.",
      );
      toast.error("Failed to edit event");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event: Event) => {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`))
      return;

    setDeletingId(event._id);
    try {
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const res = await fetch(`${API_BASE_URL}/events/${event._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ organizerEmail: email }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to delete the event.");

      setEvents((prev) => prev.filter((ev) => ev._id !== event._id));

      toast.success("Event deleted successfully!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while deleting.",
      );

      toast.error("Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  const busy = isPending || loading;

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-base-content sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm font-semibold text-primary">
              <Settings size={14} />
              Organizer Dashboard
            </span>

            <h1 className="font-serif mt-3 text-4xl font-bold sm:text-5xl">
              Manage My Events
            </h1>

            <p className="mt-3 max-w-xl text-sm text-base-content/70">
              View, edit, and manage the social drives you have published. Only
              you have permission to edit or delete your created initiatives
              {email ? (
                <>
                  {" "}
                  as <span className="font-semibold">{email}</span>.
                </>
              ) : (
                "."
              )}
            </p>
          </div>

          <Link
            href="/events/create"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/85"
          >
            <Plus size={18} />
            Create New Event
          </Link>
        </div>

        <hr className="mt-8 border-base-300" />

        {/* Events */}
        <div className="mt-10">
          {busy ? (
            <div className="flex flex-col items-center gap-3 py-20 text-base-content/60">
              <Loader2 className="animate-spin" size={28} />
              <p className="text-sm">Loading your events…</p>
            </div>
          ) : !email ? (
            <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
              <h2 className="text-xl font-bold">Please log in first</h2>
              <p className="mt-2 text-sm text-base-content/70">
                You need an account to manage your events.
              </p>

              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Log In
              </Link>
            </div>
          ) : error ? (
            <p className="py-12 text-center text-sm font-medium text-error">
              {error}
            </p>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
              <h2 className="text-xl font-bold">No events yet</h2>
              <p className="mt-2 text-sm text-base-content/70">
                You haven&apos;t created any events yet.
              </p>

              <Link
                href="/events/create"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Plus size={18} />
                Create Your First Event
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Thumbnail with overlaid badges */}
                  <div className="relative">
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      width={800}
                      height={450}
                      className="h-52 w-full object-cover"
                    />

                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      {event.type}
                    </span>

                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/40 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      <CalendarDays size={13} />
                      {prettyDate(event.date)}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-xl font-bold">{event.title}</h2>

                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-base-content/70">
                      <MapPin size={15} className="shrink-0" />
                      {event.location}
                    </p>

                    <p className="mt-2 text-sm text-base-content/70">
                      {event.description}
                    </p>

                    <hr className="mt-4 border-base-300" />

                    <p className="mt-3 flex items-center gap-1.5 text-sm text-base-content/70">
                      <User size={15} className="shrink-0" />
                      {displayName(event.organizerEmail)}
                    </p>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/events/${event._id}`}
                        className="flex-1 rounded-xl bg-base-200 px-4 py-2.5 text-center text-sm font-semibold text-base-content transition hover:bg-base-300"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() => openEdit(event)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(event)}
                        disabled={deletingId === event._id}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-error/10 px-4 py-2.5 text-sm font-semibold text-error transition hover:bg-error/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === event._id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeEdit}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold">Edit Event</h3>

              <button
                type="button"
                onClick={closeEdit}
                className="rounded-lg px-2 py-1 text-base-content/60 transition hover:bg-base-200 hover:text-base-content"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSave} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="edit-title"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Title
                </label>
                <input
                  id="edit-title"
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full rounded-xl border border-base-300 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="edit-date"
                    className="mb-1.5 block text-sm font-semibold"
                  >
                    Date
                  </label>
                  <input
                    id="edit-date"
                    type="date"
                    required
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                    className="w-full rounded-xl border border-base-300 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-location"
                    className="mb-1.5 block text-sm font-semibold"
                  >
                    Location
                  </label>
                  <input
                    id="edit-location"
                    type="text"
                    required
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    className="w-full rounded-xl border border-base-300 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="edit-description"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  required
                  rows={4}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-base-300 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {editError && (
                <p className="rounded-xl bg-error/10 px-4 py-3 text-sm font-medium text-error">
                  {editError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="rounded-xl bg-base-200 px-5 py-2.5 text-sm font-semibold text-base-content transition hover:bg-base-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving && <Loader2 size={15} className="animate-spin" />}
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
