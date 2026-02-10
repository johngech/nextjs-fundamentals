import { auth } from "@/app/auth";
import { AppSession } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = (await auth()) as AppSession;
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ accessToken: session.accessToken });
}
