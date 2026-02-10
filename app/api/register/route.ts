import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

const schema = z
  .object({
    email: z.email({ error: "Invalid email address" }),
    password: z
      .string()
      .min(3, { error: "Password must be at least 3 characters long" })
      .max(25, { error: "Password must be a maximum of 25 characters long" }),
    confirmPassword: z.string().min(3).max(25),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password doesn't match.",
    path: ["confirmPassword"],
  });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.message, { status: 400 });

  const { email, password } = validation.data;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (user)
    return NextResponse.json(
      { error: "User already exist with this email" },
      { status: 400 },
    );

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    {
      id: newUser.id,
      email: newUser.email,
    },
    { status: 201 },
  );
}
