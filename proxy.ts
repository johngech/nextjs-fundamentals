import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { AppSession } from "@/app/types";

export async function proxy(request: NextRequest) {
  const session = (await auth()) as AppSession;
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // * => zero or more
  // + => one or more
  // ? => zero or one
  matcher: ["/users/:id*"],
};
