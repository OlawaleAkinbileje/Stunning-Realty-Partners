import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../services/emailService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { name, email, message, propertyTitle } = req.body;
  console.log("Property inquiry submission:", req.body);

  const emailResult = await sendEmail({
    to: "stunningrealty@gmail.com",
    subject: `Property Inquiry: ${propertyTitle}`,
    text: `New property inquiry:
    Property: ${propertyTitle}
    Name: ${name}
    Email: ${email}
    Message: ${message}`,
    html: `
      <h2>New Property Inquiry</h2>
      <p><strong>Property:</strong> ${propertyTitle}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
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
