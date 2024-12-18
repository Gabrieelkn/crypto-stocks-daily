import nodemailer, { SentMessageInfo } from "nodemailer";

export const sendMail = async (
  subject: string,
  otpText: string
): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: "ggabi8878@gmail.com",
    subject,
    html: otpText,
  };

  try {
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info);
    return true;
  } catch (error: unknown) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

export const sendSubscribeMail = async (
  target: string,
  subject: string,
  otpText: string
): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: `${target}, ${process.env.EMAIL}`,
    subject,
    html: otpText,
  };

  try {
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info);
    return true;
  } catch (error: unknown) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
