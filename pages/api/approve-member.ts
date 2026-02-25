import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../services/emailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userEmail, userName } = req.body;

  const result = await sendEmail({
    to: userEmail,
    subject: 'SRP Network - Account Approved!',
    text: `Hello ${userName},\n\nYour registration with Stunning Realty Partners has been approved! You now have full access to the member dashboard and exclusive portfolio.\n\nLog in here: https://stunning-realty-partners.vercel.app/auth\n\nBest regards,\nThe SRP Team`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #000;">Access Granted</h2>
        <p>Hello <strong>${userName}</strong>,</p>
        <p>We are pleased to inform you that your registration with Stunning Realty Partners (SRP) has been <strong>approved</strong>!</p>
        <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>You now have full access to:</p>
          <ul>
            <li>Exclusive Property Portfolio</li>
            <li>Partner Marketing Materials</li>
            <li>Commission Ledger</li>
          </ul>
        </div>
        <a href="https://stunning-realty-partners.vercel.app/auth" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">Log In to Dashboard</a>
        <p style="margin-top: 20px;">Best regards,<br/>The SRP Team</p>
      </div>
    `
  });

  if (!result.success) {
    return res.status(500).json({ success: false, error: result.error });
  }

  return res.status(200).json({ success: true });
}
