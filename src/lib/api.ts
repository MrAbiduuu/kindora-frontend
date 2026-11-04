/**
 * Base URL of the Kindora backend API.
 *
 * Configured through NEXT_PUBLIC_API_URL in .env (the NEXT_PUBLIC_ prefix is
 * required so the value is also available in "use client" components).
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
