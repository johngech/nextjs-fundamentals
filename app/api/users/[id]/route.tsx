import { NextRequest, NextResponse } from "next/server";
import { UserUpdateSchema } from "../schema";

interface Props {
  params: Promise<{ id: number }>;
}

interface User {
  id: number;
  name: string;
}

interface UserUpdateRequest {
  name: string;
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<User | ErrorResponse>> {
  const { id } = await params;
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({
    id: id,
    name: "John",
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<UserUpdateRequest | ErrorResponse>> {
  const body: UserUpdateRequest = await request.json();
  const validation = UserUpdateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );

  const { id } = await params;

  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({
    id: id,
    ...validation.data,
    email: "email@domain.com",
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<null | ErrorResponse>> {
  const { id } = await params;
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
