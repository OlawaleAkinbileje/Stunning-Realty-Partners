import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../services/emailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, user } = req.body;

  if (type === 'NEW_REGISTRATION') {
    await sendEmail({
      to: 'stunningrealty@gmail.com',
      subject: '🚨 New Member Registration - Approval Required',
      text: `A new user has registered and is awaiting approval:\n\nName: ${user.name}\nEmail: ${user.email}\n\nPlease log in to the SRP Admin Panel to approve them.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #000;">New Member Registration</h2>
          <p>A new user has registered on the SRP platform and requires your approval to access the network.</p>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
          </div>
          <a href="https://stunning-realty.netlify.app/admin" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold;">Go to Admin Panel</a>
        </div>
      `
    });
  }

  return res.status(200).json({ success: true });
}
