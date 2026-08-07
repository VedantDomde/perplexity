import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, text }) {
  try {
    const details = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text,
    });

    console.log("Email sent:", details);

    return details;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}