import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession, SESSION_COOKIE } from "@/lib/auth";

export async function GET(request: Request) {
  const token = request.headers
    .get("cookie")
    ?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
  const session = await readSession(token);
  if (session?.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      genres: { include: { genre: true } },
    },
  });

  return NextResponse.json({ videos });
}
