import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, sessionCookie } from "@/lib/auth";

const bodySchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export async function POST(request: Request) {
  const input = bodySchema.safeParse(await request.json());
  if (!input.success) return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email: input.data.email } });
  if (!user?.passwordHash || !(await bcrypt.compare(input.data.password, user.passwordHash))) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  response.cookies.set(sessionCookie(await createSession({ userId: user.id, email: user.email, role: user.role })));
  return response;
}
