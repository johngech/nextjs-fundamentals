import { NextRequest, NextResponse } from "next/server";
import { UserCreateSchema } from "./schema";

interface UserCreateRequest {
  name: string;
  email: string;
}

interface ErrorResponse {
  error: string;
}

export function GET(request: NextRequest): NextResponse<UserCreateRequest[]> {
  return NextResponse.json([
    { id: 1, name: "John", email: "abc@domain.com" },
    { id: 2, name: "Dereje", email: "cdf@domain.com" },
  ]);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UserCreateRequest | ErrorResponse>> {
  /** Custom email validator
   *   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!new RegExp(emailRegex).exec(body.email))
       return NextResponse.json({ error: "Email is required" }, { status: 400 });
    */
  const body: UserCreateRequest = await request.json();
  const validated = UserCreateSchema.safeParse(body);
  if (!validated.success)
    return NextResponse.json(
      { error: validated.error.message },
      { status: 400 },
    );
  return NextResponse.json({ id: 1, ...validated.data }, { status: 201 });
}
