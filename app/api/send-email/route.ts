import { NextResponse } from "next/server";
import { resend } from "@/emails/client";
import WelcomeTemplate from "@/emails/WelcomeTemplate";

export async function POST() {
  const { data, error } = await resend.emails.send({
    from: "me@domain.com",
    to: "you@domain.com",
    subject: "Subject",
    react: WelcomeTemplate({
      firstName: "Yohannes",
    }),
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(data);
}
