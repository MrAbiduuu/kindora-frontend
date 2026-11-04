import { authClient } from "./auth-client";

/**
 * Client-side helper: asks Better Auth's jwtClient plugin for a fresh JWT
 * (GET /api/auth/token) using the logged-in session cookie. Safe to use in
 * "use client" components — never import server-only code here.
 */
export const getTokenFromClient = async (): Promise<string | null> => {
  try {
    const { data, error } = await authClient.token();
    if (error || !data?.token) return null;
    return data.token;
  } catch {
    return null;
  }
};
