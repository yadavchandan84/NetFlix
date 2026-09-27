import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession, SESSION_COOKIE } from "@/lib/auth";
const current = (request: Request) => readSession(request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1]);
export async function GET(request: Request) { const session = await current(request); if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const items = await prisma.watchHistory.findMany({ where: { userId: session.userId }, include: { video: true }, orderBy: { updatedAt: "desc" }, take: 30 }); return NextResponse.json({ items }); }
export async function PUT(request: Request) { const session = await current(request); if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const { videoId, progressSeconds, completed = false } = await request.json(); return NextResponse.json(await prisma.watchHistory.upsert({ where: { userId_videoId: { userId: session.userId, videoId } }, create: { userId: session.userId, videoId, progressSeconds, completed }, update: { progressSeconds, completed } })); }
