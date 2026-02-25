import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../services/emailService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { type, user } = req.body;

  // Dynamically determine the base URL for the email link
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  if (type === "NEW_REGISTRATION") {
    // 1. Notify Admin
    const adminResult = await sendEmail({
      to: "stunningrealty@gmail.com",
      subject: "🚨 New Member Registration - Approval Required",
      text: `A new user has registered and is awaiting approval:\n\nName: ${user.name}\nEmail: ${user.email}\n\nPlease log in to the SRP Admin Panel to approve them: ${baseUrl}/admin`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #000;">New Member Registration</h2>
          <p>A new user has registered on the SRP platform and requires your approval to access the network.</p>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
          </div>
          <a href="${baseUrl}/admin" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">Go to Admin Panel</a>
        </div>
      `,
    });

    // 2. Notify User (Welcome Email)
    const userResult = await sendEmail({
      to: user.email,
      subject: "Welcome to SRP Network - Registration Received",
      text: `Hello ${user.name},\n\nThank you for registering with Stunning Realty Partners. Your account is currently pending approval by our administration team. You will receive an email once your access has been granted.\n\nBest regards,\nThe SRP Team`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #000;">Registration Received</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>Thank you for joining the Stunning Realty Partners (SRP) network.</p>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Your account is currently <strong>pending approval</strong> by our administration team. This usually takes less than 24 hours.</p>
          </div>
          <p>You will receive another email as soon as your access has been granted.</p>
          <p>Best regards,<br/>The SRP Team</p>
        </div>
      `,
    });

    if (!adminResult.success) {
      console.error("Admin notification failed:", adminResult.error);
    }

    if (!userResult.success) {
      console.error("User welcome email failed:", userResult.error);
    }
  }

  return res.status(200).json({ success: true });
}
