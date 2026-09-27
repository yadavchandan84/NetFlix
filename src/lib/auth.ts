import { SignJWT, jwtVerify } from "jose";
import type { UserRole } from "@prisma/client";

export const SESSION_COOKIE = "netflix_session";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-change-me-before-production");

export type Session = { userId: string; email: string; role: UserRole };

export async function createSession(session: Session) {
  return new SignJWT(session).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
}

export async function readSession(token?: string): Promise<Session | null> {
  if (!token) return null;
  try { return (await jwtVerify(token, secret)).payload as unknown as Session; } catch { return null; }
}

export const sessionCookie = (token: string) => ({ name: SESSION_COOKIE, value: token, httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
