import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineHeart,
  HiOutlineArrowUpRight,
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlineArrowUp,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Upcoming Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

const getInvolved = [
  { name: "Create an Event", href: "/events/create" },
  { name: "Manage Events", href: "/events/manage-events" },
  { name: "Joined Events", href: "/events/joined-events" },
  { name: "Login / Register", href: "/login" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-200 text-base-content">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <Image
                src="/kindora-logo.jpg"
                alt="Kindora Logo"
                width={100}
                height={75}
                className="object-contain"
              />
              <span className="font-(family-name:--font-display) text-3xl">
                Kindora<span className="text-primary">.</span>
              </span>
            </Link>

            <p className="mb-3 text-sm font-semibold text-primary">
              Small Acts. Greater Impact.
            </p>

            <p className="max-w-xs text-sm leading-7 text-base-content/65">
              Bringing people together to create positive change through
              volunteering, kindness, and community-driven events.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-base-300 text-base-content/70 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-content hover:shadow-lg hover:shadow-primary/30"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-(family-name:--font-serif) text-lg font-bold">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-base-content/65 transition-colors hover:text-primary"
                  >
                    <HiOutlineArrowUpRight className="text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-6 font-(family-name:--font-serif) text-lg font-bold">
              Get Involved
            </h3>
            <ul className="space-y-4">
              {getInvolved.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-base-content/65 transition-colors hover:text-primary"
                  >
                    <HiOutlineArrowUpRight className="text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-(family-name:--font-serif) text-lg font-bold">
              Stay Connected
            </h3>

            <p className="mb-5 text-sm leading-7 text-base-content/65">
              Have an idea or want to make a difference? We would love to hear
              from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-base-content/65">
                <HiOutlineEnvelope className="shrink-0 text-xl text-primary" />
                <span>hello@kindora.com</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-base-content/65">
                <HiOutlineMapPin className="shrink-0 text-xl text-primary" />
                <span>Building stronger communities, everywhere.</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="btn btn-primary btn-sm mt-6 gap-2 rounded-full"
            >
              Contact Us
              <HiOutlineArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-primary/10 bg-linear-to-r from-primary/10 via-secondary/10 to-accent/10 p-7 md:flex-row md:p-9">
          <div>
            <h3 className="mb-2 font-(family-name:--font-serif) text-xl font-bold md:text-2xl">
              Be part of something meaningful.
            </h3>
            <p className="text-sm text-base-content/60">
              One small act can inspire a whole community.
            </p>
          </div>

          <Link
            href="/events"
            className="btn btn-primary gap-2 rounded-full px-7 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
          >
            Explore Events
            <HiOutlineArrowUpRight size={18} />
          </Link>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-base-300 pt-7 md:flex-row">
          <p className="text-center text-xs text-base-content/50">
            © 2026 Kindora. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-xs text-base-content/50">
            Made with
            <HiOutlineHeart className="text-primary motion-safe:animate-pulse" />
            for a better tomorrow.
          </p>

          <Link
            href="#top"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-base-300 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-content"
          >
            <HiOutlineArrowUp size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
