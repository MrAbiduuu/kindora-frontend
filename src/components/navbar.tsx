"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineBars3,
  HiOutlinePlusCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineUserGroup,
  HiOutlineArrowRightOnRectangle,
  HiUserCircle,
} from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { LucideCircleUser } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: HiOutlineHome },
  {
    href: "/events",
    label: "Upcoming Events",
    icon: HiOutlineCalendarDays,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    toast.error("Log Out Succefssfull");
  };

  const userInitial =
    user?.name?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/85 shadow-sm backdrop-blur-xl"
    >
      <div className="navbar mx-auto max-w-7xl gap-1 px-2 sm:px-4 lg:px-4">
        {/* Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="flex w-fit items-center transition-transform duration-300 ease-out hover:scale-105"
          >
            <Image
              src="/kindora-logo.jpg"
              alt="Kindora Logo"
              width={240}
              height={100}
              priority
              className="h-13 w-37.5 object-contain sm:h-14.5 sm:w-45"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                isActive(href)
                  ? "bg-primary/10 font-semibold text-primary"
                  : "font-medium text-base-content/70 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Icon className="text-lg" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Theme Toggle */}
          <label className="swap swap-rotate btn btn-circle btn-ghost btn-sm sm:btn-md">
            <input type="checkbox" className="theme-controller" value="dark" />

            {/* Sun icon */}
            <svg
              className="swap-off h-6 w-6 fill-current text-amber-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 5a5 5 0 100 10 5 5 0 000-10z" />
            </svg>

            {/* Moon icon */}
            <svg
              className="swap-on h-6 w-6 fill-current text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2A1 1 0 008 2.36 10.14 10.14 0 1022 14.05a1 1 0 00-.36-1.05z" />
            </svg>
          </label>

          {/* Authentication */}
          {!isPending &&
            (user ? (
              /* Logged In - User Dropdown */
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-sm sm:btn-md flex items-center gap-2 rounded-full px-2"
                  aria-label="Open user menu"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full border border-base-300 object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                      {userInitial}
                    </div>
                  )}

                  <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">
                    {user.name || "User"}
                  </span>
                </button>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-50 mt-4 w-64 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-xl"
                >
                  {/* User Information */}
                  <li className="pointer-events-none mb-2 border-b border-base-300 pb-3">
                    <div className="flex items-center gap-3 rounded-xl">
                      {user.image ? (
                        <Image
                          src={
                            session?.user?.image ||
                            "https://www.shareicon.net/data/2016/09/15/829459_man_512x512.png"
                          }
                          alt="Profile"
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content">
                          {userInitial}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-base-content">
                          {user.name || "User"}
                        </p>
                        <p className="truncate text-xs text-base-content/60">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </li>

                  {/* Create Event */}
                  <li>
                    <Link href="/profile">
                      <HiUserCircle className="text-lg" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/events/create">
                      <HiOutlinePlusCircle className="text-lg" />
                      Create Event
                    </Link>
                  </li>

                  {/* Manage Events */}
                  <li>
                    <Link href="/events/manage-events">
                      <HiOutlineClipboardDocumentList className="text-lg" />
                      Manage Events
                    </Link>
                  </li>

                  {/* Join Event */}
                  <li>
                    <Link href="/events/joined-events">
                      <HiOutlineUserGroup className="text-lg" />
                      Joined Event
                    </Link>
                  </li>

                  {/* Logout */}
                  <li className="mt-2 border-t border-base-300 pt-2">
                    <button
                      onClick={handleLogout}
                      className="text-error hover:bg-error/10"
                    >
                      <HiOutlineArrowRightOnRectangle className="text-lg" />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              /* Logged Out - Login Button */
              <Link
                href="/login"
                className="btn btn-primary btn-sm rounded-full px-4 shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 sm:px-5"
              >
                <CiLogin className="text-xl" />
                <span>Login</span>
              </Link>
            ))}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <button
            tabIndex={0}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Open navigation menu"
          >
            <HiOutlineBars3 className="h-6 w-6" />
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-4 w-56 rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl"
          >
            {navLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                    isActive(href)
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-base-content/80 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <Icon className="text-lg" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
