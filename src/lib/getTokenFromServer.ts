import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Server-side helper: extracts the Better Auth JWT from the incoming
 * request cookies using the session on the server. Only usable in Server
 * Components / Route Handlers (it depends on `next/headers`).
 */
export const getTokenFromServer = async (): Promise<string | null> => {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });
  return jwtToken?.token ?? null;
};
