import { sendMail } from "@/lib/nodemailer";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, message } = data;

  const a = await sendMail(
    `Mesaj de la ${name} for NewsBlog`,
    `<div>
    <p>${message}</p>
    <ul>
    <li> ${email}</li>
    </ul>
    </div>`
  );

  return NextResponse.json(a);
}
