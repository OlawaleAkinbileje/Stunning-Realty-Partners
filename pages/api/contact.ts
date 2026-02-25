import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../services/emailService";
import { supabase } from "../../services/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { name, email, phone, interest, message, userId } = req.body;
  console.log("Contact form submission:", req.body);

  // Save to Database
  const { error: dbError } = await supabase
    .from('inquiries')
    .insert([{
      name,
      email,
      phone,
      interest,
      message,
      user_id: userId || null
    }]);

  if (dbError) {
    console.error("Database Error:", dbError);
    // Continue even if DB fails, as email is primary
  }

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
