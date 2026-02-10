import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { UserCreateSchema } from "./schema";
import { prisma } from "@/prisma/client";
import { User } from "@/app/generated/prisma/client";
import { ErrorResponse } from "@/app/types";

type UserCreateRequest = z.infer<typeof UserCreateSchema>;

type UserResponse = Omit<User, "password">;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<UserResponse[]>> {
  const users = await prisma.user.findMany();
  const response: UserResponse[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
  }));
  return NextResponse.json(response);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UserResponse | ErrorResponse>> {
  const body: UserCreateRequest = await request.json();
  const validation = UserCreateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );

  const { name, email } = validation.data;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user)
    return NextResponse.json({ error: "User already exist!" }, { status: 400 });

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
  return NextResponse.json(
    {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      emailVerified: newUser.emailVerified,
      image: newUser.image,
    },
    { status: 201 },
  );
}
