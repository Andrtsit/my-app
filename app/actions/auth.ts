// app/actions/auth.ts
"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function registerUser(input: {
  email: string;
  password: string;
  name?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = input.email.toLowerCase().trim();

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: "Invalid email" };
  }
  if (input.password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "Email already registered" };

  const passwordHash = await bcrypt.hash(input.password, 12);
  await prisma.user.create({
    data: { email, name: input.name?.trim() || null, passwordHash },
  });

  return { ok: true };
}
