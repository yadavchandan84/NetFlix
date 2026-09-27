import { NextResponse } from "next/server";
import { readSession, SESSION_COOKIE } from "@/lib/auth";
export async function GET(request: Request) { const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1]; return NextResponse.json({ session: await readSession(token) }); }
