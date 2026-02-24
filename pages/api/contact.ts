import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../services/emailService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { name, email, interest, message } = req.body;
  console.log("Contact form submission:", req.body);

  const emailResult = await sendEmail({
    to: "stunningrealty@gmail.com",
    subject: `New SRP Membership Inquiry: ${interest}`,
    text: `New contact form submission:
    Name: ${name}
    Email: ${email}
    Interest: ${interest}
    Message: ${message}`,
    html: `
      <h2>New SRP Membership Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Interest:</strong> ${interest}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  if (emailResult.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false, error: emailResult.error });
  }
}
