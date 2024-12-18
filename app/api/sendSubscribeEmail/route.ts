import { sendSubscribeMail } from "@/lib/nodemailer";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const email = await req.json();

  const a = await sendSubscribeMail(
    email,
    "Thanks for subscribing!",
    `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
      <h2 style="color: #007BFF;">Welcome to Our Newsletter!</h2>
      <p>Hello <strong>${email}</strong>,</p>
      <p>Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
      <p>You'll start receiving our updates and exclusive content directly to your inbox.</p>
      <p style="margin-top: 20px;">If you have any questions, feel free to reach out to us.</p>
      <p style="font-size: 12px; color: #777;">&copy; 2024 CryptoStocksDaily. All rights reserved.</p>
    </div>`
  );

  return NextResponse.json(a);
}
