import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { UserCreateSchema } from "./schema";
import { prisma } from "@/prisma/client";
import { User } from "@/app/generated/prisma/client";
import { ErrorResponse } from "@/app/types";

type UserCreateRequest = z.infer<typeof UserCreateSchema>;

export async function GET(request: NextRequest): Promise<NextResponse<User[]>> {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<User | ErrorResponse>> {
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

  const newUser = await prisma.user.create<{ data: UserCreateRequest }>({
    data: {
      name: name,
      email: email,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
