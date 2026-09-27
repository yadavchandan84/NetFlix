import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { readSession, SESSION_COOKIE } from "@/lib/auth";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  // genres as a comma-separated string, e.g. "Sci-Fi,Action & Adventure"
  genres: z.string().min(1),
  // cast as a comma-separated string
  cast: z.string().optional(),
  releaseYear: z.coerce.number().int().min(1900).max(2100),
  durationSeconds: z.coerce.number().int().positive(),
  maturityRating: z.string().optional(),
});

export async function POST(request: Request) {
  // Auth check — admin only
  const token = request.headers
    .get("cookie")
    ?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
  const session = await readSession(token);
  if (session?.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const input = schema.safeParse(body);
  if (!input.success) {
    return NextResponse.json({ error: "Invalid video metadata.", details: input.error.flatten() }, { status: 400 });
  }

  if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
    return NextResponse.json({ error: "Mux is not configured on this server." }, { status: 503 });
  }

  const { title, description, genres, cast, releaseYear, durationSeconds, maturityRating } = input.data;

  // Parse genres — upsert each Genre row, then link via VideoGenre
  const genreNames = genres
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);

  const castArray = cast
    ? cast.split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  const slug = `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-${Date.now()}`;

  // Create the Video record (no genres yet — linked below)
  const video = await prisma.video.create({
    data: {
      title,
      description,
      slug,
      thumbnailUrl: "",
      status: "PROCESSING",
      releaseYear,
      durationSeconds,
      maturityRating: maturityRating ?? null,
      cast: castArray,
    },
  });

  // Upsert genres and link them
  for (const name of genreNames) {
    const genreSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const genre = await prisma.genre.upsert({
      where: { slug: genreSlug },
      create: { name, slug: genreSlug },
      update: {},
    });
    await prisma.videoGenre.create({
      data: { videoId: video.id, genreId: genre.id },
    });
  }

  // Create Mux direct upload
  const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });

  const upload = await (mux.video.uploads.create as any)({
    cors_origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    new_asset_settings: {
      passthrough: video.id,
      playback_policies: ["public"],
      video_quality: "basic",
    },
  });

  await prisma.video.update({
    where: { id: video.id },
    data: { muxUploadId: upload.id },
  });

  return NextResponse.json(
    { videoId: video.id, uploadUrl: upload.url, uploadId: upload.id },
    { status: 201 }
  );
}
