"use client";

import { FormEvent } from "react";
import { Mail, MapPin, Send, MessageCircle, Heart } from "lucide-react";
import { toast } from "sonner";

export default function ContactUs() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const feedback = {
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    };

    toast.success("Feedback Sent Successfully");
    form.reset();
  };

  return (
    <main className="min-h-screen bg-background px-4 py-16 text-base-content sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary">
            <MessageCircle size={16} />
            We&apos;d love to hear from you
          </span>

          <h1 className="mt-6 font-serif text-4xl font-bold text-base-content sm:text-5xl">
            Get in <span className="text-primary">Touch</span>
          </h1>

          <p className="mt-5 text-base leading-7 text-base-content/70">
            Have a question, an idea, or want to make a difference together?
            We&apos;re always happy to connect with people who care about their
            communities.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Information */}
          <div className="rounded-3xl bg-primary/10 p-8 lg:col-span-2 lg:p-10">
            <h2 className="font-serif text-2xl font-bold">
              Let&apos;s Connect
            </h2>

            <p className="mt-3 text-sm leading-6 text-base-content/70">
              Whether you&apos;re a volunteer, organizer, or someone with a
              wonderful idea, feel free to reach out.
            </p>

            <div className="mt-10 space-y-7">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-base-100 p-3 text-primary">
                  <Mail size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <a
                    href="mailto:dewan.abid.02.2006@gmail.com"
                    className="mt-1 block break-all text-sm text-base-content/70 transition hover:text-primary"
                  >
                    dewan.abid.02.2006@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-base-100 p-3 text-primary">
                  <MapPin size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Our Location</h3>
                  <p className="mt-1 text-sm text-base-content/70">
                    Bangladesh
                  </p>
                </div>
              </div>

              {/* Community */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-base-100 p-3 text-primary">
                  <Heart size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Our Mission</h3>
                  <p className="mt-1 text-sm leading-6 text-base-content/70">
                    Bringing people together through kindness and community
                    service.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Message */}
            <div className="mt-12 rounded-2xl bg-base-100/70 p-5">
              <p className="font-serif text-lg font-semibold text-base-content">
                Small Acts. Greater Impact.
              </p>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                Every conversation can be the beginning of something meaningful.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm lg:col-span-3 lg:p-10">
            <h2 className="font-serif text-2xl font-bold">Send Us a Message</h2>

            <p className="mt-2 text-sm text-base-content/70">
              Fill out the form below and we&apos;ll be happy to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition placeholder:text-base-content/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition placeholder:text-base-content/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  required
                  className="w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition placeholder:text-base-content/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Write your message here..."
                  required
                  className="w-full resize-none rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition placeholder:text-base-content/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/85 sm:w-auto"
              >
                Send Message
                <Send size={17} />
              </button>

              <p className="text-xs leading-5 text-base-content/40">
                Your email application will open with your message ready to
                send. You can review it before sending.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 text-center">
          <p className="font-serif text-xl font-semibold">
            Together, we can make a difference.
          </p>
          <p className="mt-2 text-sm text-base-content/70">
            Thank you for being part of the Kindora community.
          </p>
        </div>
      </div>
    </main>
  );
}
