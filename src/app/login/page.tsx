"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  HandHeart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { friendlyAuthError } from "@/lib/auth-errors";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const rememberMe = data.get("rememberMe") === "on";

    setLoading(true);
    setError(null);

    const { error: signInError } = await authClient.signIn.email({
      email: formData.email.trim(),
      password: formData.password,
      rememberMe,
    });

    if (signInError) {
      setError(friendlyAuthError(signInError.code ?? signInError.message ?? ""));
      setLoading(false);
      return;
    }

    // Session cookie is set — user was verified against the kindora database.
    router.push("/events");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center  px-4 py-12 text-[#6B5146] sm:px-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#EEDFD1] shadow-xl shadow-[#6B5146]/5 lg:grid-cols-2">
        {/* Left Side - Welcome Section */}
        <div className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#E83B5B]/10 blur-2xl" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="rounded-xl bg-[#E83B5B] p-2.5 text-white">
                <Heart size={22} fill="currentColor" />
              </div>

              <span className="font-serif text-2xl font-bold">
                Kindora<span className="text-[#E83B5B]">.</span>
              </span>
            </Link>
          </div>

          <div className="relative my-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#E83B5B]">
              <HandHeart size={17} />
              Welcome Back
            </span>

            <h1 className="mt-7 font-serif text-4xl font-bold leading-tight xl:text-5xl">
              Your Kindness Journey
              <span className="text-[#E83B5B]"> Continues Here.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-[#8C7B73]">
              Welcome back to Kindora! Connect with your community, discover
              meaningful events, and continue making a positive difference.
            </p>
          </div>

          <p className="relative text-sm font-medium text-[#8C7B73]">
            Small Acts. Greater Impact.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 lg:hidden"
            >
              <div className="rounded-xl bg-[#E83B5B] p-2.5 text-white">
                <Heart size={21} fill="currentColor" />
              </div>

              <span className="font-serif text-2xl font-bold">
                Kindora<span className="text-[#E83B5B]">.</span>
              </span>
            </Link>

            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#E83B5B]">
                Welcome Back
              </span>

              <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                Log In
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#8C7B73]">
                Enter your details to access your Kindora account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8958C]"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-[#EEDFD1] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#B5A49B] focus:border-[#E83B5B] focus:ring-2 focus:ring-[#E83B5B]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#E83B5B] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8958C]"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-[#EEDFD1] py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#B5A49B] focus:border-[#E83B5B] focus:ring-2 focus:ring-[#E83B5B]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8958C] hover:text-[#E83B5B]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-3 text-sm text-[#8C7B73]">
                <input
                  type="checkbox"
                  name="rememberMe"
                  defaultChecked
                  className="h-4 w-4 accent-[#E83B5B]"
                />
                Remember me
              </label>

              {/* Error feedback */}
              {error && (
                <div className="flex items-start gap-2.5 rounded-xl bg-error/10 px-4 py-3 text-sm font-medium text-error">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E83B5B] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E83B5B]/20 transition hover:-translate-y-0.5 hover:bg-[#D92E4F] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? "Logging you in…" : "Log In"}
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-9 rounded-2xl bg-[#F9E8E8]/70 p-5 text-center">
              <p className="text-sm text-[#8C7B73]">
                Don&apos;t have an account yet?
              </p>

              <Link
                href="/signup"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#E83B5B] transition hover:gap-3"
              >
                Create an Account
                <ArrowRight size={16} />
              </Link>
            </div>

            <p className="mt-8 text-center text-xs text-[#A8958C]">
              Small Acts. Greater Impact.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
