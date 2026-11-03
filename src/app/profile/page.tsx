"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Heart,
  Pencil,
  LogOut,
  Save,
  X,
  HandHeart,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type ProfileData = {
  name: string;
  phone: string;
  location: string;
  bio: string;
};

type EventData = {
  _id: string;
  title: string;
  type?: string;
  date?: string;
  location?: string;
  thumbnail?: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Only store editable profile information.
  // Name and email come directly from Better Auth.
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [joinedEvents, setJoinedEvents] = useState<EventData[]>([]);
  const [organizedEvents, setOrganizedEvents] = useState<EventData[]>([]);

  // Fetch user events
  useEffect(() => {
    if (!user?.email) return;

    let cancelled = false;

    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);

        const [joinedRes, organizedRes] = await Promise.all([
          fetch(`${API_URL}/joined-events/${encodeURIComponent(user.email)}`),
          fetch(
            `${API_URL}/events/organizer/${encodeURIComponent(user.email)}`,
          ),
        ]);

        if (!cancelled && joinedRes.ok) {
          const data = await joinedRes.json();

          setJoinedEvents(Array.isArray(data) ? data : data.events || []);
        }

        if (!cancelled && organizedRes.ok) {
          const data = await organizedRes.json();

          setOrganizedEvents(Array.isArray(data) ? data : data.events || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Event fetching error:", error);
          toast.error("Unable to load your events");
        }
      } finally {
        if (!cancelled) {
          setLoadingEvents(false);
        }
      }
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  // Save profile information
  const handleSave = async () => {
    setSaving(true);

    try {
      // Currently saves changes in local component state only.
      // A backend endpoint is required for permanent storage.
      setEditing(false);
      toast.success("Profile information updated");
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logged out successfully");

      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Unable to log out");
    }
  };

  // Loading
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  // Authentication check
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <UserRound className="h-12 w-12 text-rose-400" />

        <h2 className="text-2xl font-bold text-[#49352F]">
          Please log in first
        </h2>

        <p className="text-sm text-[#8B7770]">Log in to access your profile.</p>

        <Link
          href="/login"
          className="rounded-xl bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-600"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const avatar = user.image;

  const inputClass =
    "w-full rounded-xl border border-[#EEDFD1] py-3 px-4 text-sm outline-none transition focus:border-rose-400 disabled:opacity-70";

  return (
    <main className="min-h-screen px-4 py-10 text-[#49352F] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-rose-500">
              KINDORA / ACCOUNT
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">My Profile</h1>

            <p className="mt-2 text-sm text-[#8B7770]">
              Manage your personal information and activities.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-[#EEDFD1] px-4 py-3 text-sm font-semibold transition hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-3xl border border-[#F0E4DC] shadow-sm">
          <div className="h-20" />

          <div className="px-6 pb-7 sm:px-9">
            <div className="-mt-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white shadow-md">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt={user.name || "Profile"}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : (
                    <UserRound size={48} className="text-rose-400" />
                  )}
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold">
                    {user.name || "Kindora Member"}
                  </h2>

                  <p className="mt-1 text-sm text-[#9A8780]">{user.email}</p>

                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    <Heart size={12} />
                    Kindora Member
                  </span>
                </div>
              </div>

              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                <Pencil size={16} />
                {editing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#F0E4DC] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9A8780]">Events Joined</p>
                <h3 className="mt-2 text-3xl font-bold">
                  {joinedEvents.length}
                </h3>
              </div>

              <div className="rounded-xl bg-rose-50 p-4 text-rose-500">
                <Heart size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#F0E4DC] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9A8780]">Events Organized</p>
                <h3 className="mt-2 text-3xl font-bold">
                  {organizedEvents.length}
                </h3>
              </div>

              <div className="rounded-xl bg-orange-50 p-4 text-orange-500">
                <HandHeart size={25} />
              </div>
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className="rounded-3xl border border-[#F0E4DC] p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Personal Information</h2>

              <p className="mt-1 text-sm text-[#9A8780]">
                Your personal details
              </p>
            </div>

            <UserRound className="text-rose-400" size={23} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B49B90]"
                />

                <input
                  value={profile.name || user.name || ""}
                  disabled={!editing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                  className={`${inputClass} pl-11`}
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B49B90]"
                />

                <input
                  value={user.email || ""}
                  disabled
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B49B90]"
                />

                <input
                  value={profile.phone}
                  disabled={!editing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    })
                  }
                  className={`${inputClass} pl-11`}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B49B90]"
                />

                <input
                  value={profile.location}
                  disabled={!editing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      location: e.target.value,
                    })
                  }
                  className={`${inputClass} pl-11`}
                  placeholder="Enter your location"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold">About Me</label>

            <textarea
              value={profile.bio}
              disabled={!editing}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              rows={4}
              placeholder="Write something about yourself..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Save and Cancel */}
          {editing && (
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditing(false)}
                className="flex items-center gap-2 rounded-xl border border-[#EEDFD1] px-5 py-3 text-sm font-semibold"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </section>

        {/* Joined Events */}
        <section className="rounded-3xl border border-[#F0E4DC] p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Events I&apos;ve Joined</h2>

              <p className="mt-1 text-sm text-[#9A8780]">
                Events where you&apos;re volunteering
              </p>
            </div>

            <CalendarDays className="text-rose-400" size={24} />
          </div>

          {loadingEvents ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-rose-400" />
            </div>
          ) : joinedEvents.length === 0 ? (
            <p className="rounded-xl p-6 text-center text-sm text-[#9A8780]">
              You haven&apos;t joined any events yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {joinedEvents.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event._id}`}
                  className="overflow-hidden rounded-2xl border border-[#F0E4DC] transition hover:-translate-y-1 hover:shadow-md"
                >
                  {event.thumbnail ? (
                    <div className="relative h-40">
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-rose-50">
                      <Heart className="text-rose-300" size={35} />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-bold">{event.title}</h3>

                    <p className="mt-2 text-xs text-[#9A8780]">
                      {event.date || "Date not specified"} ·{" "}
                      {event.location || "Location not specified"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Organized Events */}
        <section className="rounded-3xl border border-[#F0E4DC] p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Events I&apos;ve Organized</h2>

              <p className="mt-1 text-sm text-[#9A8780]">
                Events created by you
              </p>
            </div>

            <HandHeart className="text-orange-400" size={24} />
          </div>

          {loadingEvents ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-rose-400" />
            </div>
          ) : organizedEvents.length === 0 ? (
            <p className="rounded-xl p-6 text-center text-sm text-[#9A8780]">
              You haven&apos;t organized any events yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {organizedEvents.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event._id}`}
                  className="rounded-2xl border border-[#F0E4DC] p-5 transition hover:border-rose-200 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
                    {event.type || "Community Event"}
                  </span>

                  <h3 className="mt-2 font-bold">{event.title}</h3>

                  <p className="mt-2 text-xs text-[#9A8780]">
                    {event.date || "Date not specified"}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 text-sm text-[#A8958C]">
          <Heart size={14} className="text-rose-400" />
          Making a difference, one act of kindness at a time.
        </div>
      </div>
    </main>
  );
}
