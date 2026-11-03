"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Heart,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  HandHeart,
  Image as ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { friendlyAuthError } from "@/lib/auth-errors";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please check both fields.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: signUpError } = await authClient.signUp.email({
      name: formData.name.trim(),
      image: formData.imageUrl.trim() || undefined,
      email: formData.email.trim(),
      password: formData.password,
    });

    if (signUpError) {
      setError(
        friendlyAuthError(signUpError.code ?? signUpError.message ?? ""),
      );
      setLoading(false);
      return;
    }

    // Signed in automatically — the user lives in the kindora "user" collection.
    router.push("/events");
    router.refresh();
    toast.success(`Account Created Successfully! Welcome to Kindora`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 text-[#6B5146] sm:px-6">
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
              Join the Kindora Community
            </span>

            <h1 className="mt-7 font-serif text-4xl font-bold leading-tight xl:text-5xl">
              A Little Kindness Can
              <span className="text-[#E83B5B]"> Change Everything.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-[#8C7B73]">
              Become part of a community that believes in helping others.
              Discover meaningful opportunities, meet inspiring people, and make
              every small act count.
            </p>
          </div>

          <p className="relative text-sm font-medium text-[#8C7B73]">
            Small Acts. Greater Impact.
          </p>
        </div>

        {/* Right Side - Signup Form */}
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
                Start Your Journey
              </span>

              <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                Create Account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#8C7B73]">
                Join Kindora and become a part of something meaningful.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8958C]"
                  />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-[#EEDFD1] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#B5A49B] focus:border-[#E83B5B] focus:ring-2 focus:ring-[#E83B5B]/10"
                  />
                </div>
              </div>
              {/* Profile Image URL */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="mb-2 block text-sm font-semibold"
                >
                  Profile Image URL
                  <span className="ml-2 text-xs font-normal text-[#A8958C]">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8958C]"
                  />

                  <input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/profile.jpg"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        imageUrl: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[#EEDFD1] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#B5A49B] focus:border-[#E83B5B] focus:ring-2 focus:ring-[#E83B5B]/10"
                  />
                </div>

                <p className="mt-2 text-xs text-[#A8958C]">
                  Add a direct image URL to personalize your Kindora profile.
                </p>
              </div>

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
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-[#EEDFD1] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#B5A49B] focus:border-[#E83B5B] focus:ring-2 focus:ring-[#E83B5B]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8958C]"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    minLength={8}
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8958C]"
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    minLength={8}
                    required
                    className="w-full rounded-xl border border-[#EEDFD1] py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#B5A49B] focus:border-[#E83B5B] focus:ring-2 focus:ring-[#E83B5B]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8958C] hover:text-[#E83B5B]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 text-sm leading-6 text-[#8C7B73]">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[#E83B5B]"
                />

                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-[#E83B5B] hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#E83B5B] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? "Creating your account…" : "Create Account"}
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-[#8C7B73]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#E83B5B] transition hover:underline"
              >
                Log In
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-[#A8958C]">
              Small Acts. Greater Impact.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
