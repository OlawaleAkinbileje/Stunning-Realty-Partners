import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../services/emailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow manual testing via GET or POST
  const result = await sendEmail({
    to: 'stunningrealty@gmail.com',
    subject: '📧 SRP Live Email Test',
    text: 'If you see this, the live email service is working!',
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 2px solid #000;">
        <h2>✅ Live Email Test Successful</h2>
        <p>This email was sent from the live server at: <strong>${req.headers.host}</strong></p>
        <p>Environment: <strong>${process.env.NODE_ENV}</strong></p>
        <p>Time: ${new Date().toLocaleString()}</p>
      </div>
    `
  });

  if (!result.success) {
    return res.status(500).json({ 
      success: false, 
      error: result.error,
      diagnostics: {
        hasUser: !!process.env.EMAIL_USER,
        hasPass: !!process.env.EMAIL_PASS,
        userEmail: process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 3)}...` : 'not set'
      }
    });
  }

  return res.status(200).json({ success: true, message: 'Test email sent to stunningrealty@gmail.com' });
}
