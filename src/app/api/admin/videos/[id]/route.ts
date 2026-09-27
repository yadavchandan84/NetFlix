import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession, SESSION_COOKIE } from "@/lib/auth";
async function admin(request: Request) { const token = request.headers.get("cookie")?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1]; return (await readSession(token))?.role === "ADMIN"; }
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await admin(request))) return NextResponse.json({ error: "Admin access required." }, { status: 403 }); const body = await request.json(); const video = await prisma.video.update({ where: { id: (await params).id }, data: { title: body.title, description: body.description, releaseYear: body.releaseYear, maturityRating: body.maturityRating } }); return NextResponse.json(video); }
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await admin(request))) return NextResponse.json({ error: "Admin access required." }, { status: 403 }); await prisma.video.delete({ where: { id: (await params).id } }); return new NextResponse(null, { status: 204 }); }
