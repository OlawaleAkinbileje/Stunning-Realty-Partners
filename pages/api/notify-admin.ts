import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../services/emailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, user } = req.body;
  
  // Dynamically determine the base URL for the email link
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  if (type === 'NEW_REGISTRATION') {
    const result = await sendEmail({
      to: 'stunningrealty@gmail.com',
      subject: '🚨 New Member Registration - Approval Required',
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
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Link: ${baseUrl}/admin</p>
        </div>
      `
    });

    if (!result.success) {
      console.error('Admin notification failed:', result.error);
      return res.status(500).json({ success: false, error: result.error });
    }
  }

  return res.status(200).json({ success: true });
}
