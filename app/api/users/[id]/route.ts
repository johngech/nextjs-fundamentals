import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { UserUpdateSchema } from "../schema";
import { prisma } from "@/prisma/client";
import { User } from "@/app/generated/prisma/client";
import { ErrorResponse } from "@/app/types";

interface Props {
  params: Promise<{ id: string }>;
}

type UserUpdateRequest = z.infer<typeof UserUpdateSchema>;

type UserResponse = Omit<User, "password">;

export async function GET(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<UserResponse | ErrorResponse>> {
  const { id } = await params;
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<UserResponse | ErrorResponse>> {
  const body: UserUpdateRequest = await request.json();
  const validation = UserUpdateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { name } = validation.data;
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      name: name,
    },
  });

  return NextResponse.json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    emailVerified: updatedUser.emailVerified,
    image: updatedUser.image,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<null | ErrorResponse>> {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return new NextResponse(null, { status: 204 });
}
