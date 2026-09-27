import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession, SESSION_COOKIE } from "@/lib/auth";
const current = async (request: Request) => readSession(request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1]);
export async function GET(request: Request) { const session = await current(request); if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const items = await prisma.watchlist.findMany({ where: { userId: session.userId }, include: { video: true }, orderBy: { createdAt: "desc" } }); return NextResponse.json({ items }); }
export async function POST(request: Request) { const session = await current(request); if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const { videoId } = await request.json(); return NextResponse.json(await prisma.watchlist.upsert({ where: { userId_videoId: { userId: session.userId, videoId } }, create: { userId: session.userId, videoId }, update: {} })); }
export async function DELETE(request: Request) { const session = await current(request); if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const { videoId } = await request.json(); await prisma.watchlist.delete({ where: { userId_videoId: { userId: session.userId, videoId } } }); return new NextResponse(null, { status: 204 }); }
