import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, sessionCookie } from "@/lib/auth";

const bodySchema = z.object({ name: z.string().min(2).max(60), email: z.string().email(), password: z.string().min(8).max(100) });
export async function POST(request: Request) {
  const input = bodySchema.safeParse(await request.json());
  if (!input.success) return NextResponse.json({ error: "Use a valid email and an 8+ character password." }, { status: 400 });
  if (await prisma.user.findUnique({ where: { email: input.data.email } })) return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
  const user = await prisma.user.create({ data: { name: input.data.name, email: input.data.email, passwordHash: await bcrypt.hash(input.data.password, 12), profiles: { create: { name: input.data.name } } } });
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
  response.cookies.set(sessionCookie(await createSession({ userId: user.id, email: user.email, role: user.role })));
  return response;
}
