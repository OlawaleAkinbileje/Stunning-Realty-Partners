import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../services/emailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { recipients, propertyId, propertyTitle } = req.body as {
    recipients: Array<{ email: string; name?: string }>;
    propertyId: string;
    propertyTitle?: string;
  };

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(200).json({ success: true, message: 'No recipients' });
  }

  const origin = req.headers['x-forwarded-host']
    ? `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers['x-forwarded-host']}`
    : `https://${req.headers.host}`;
  const url = `${origin}/property/${propertyId}`;

  let failures = 0;
  for (const r of recipients) {
    const to = r.email;
    if (!to) continue;
    const subject = `Update on a saved property${propertyTitle ? `: ${propertyTitle}` : ''}`;
    const text = `A property you saved has been updated.\n${propertyTitle ? `Title: ${propertyTitle}\n` : ''}View: ${url}`;
    const html = `
      <div style="font-family:sans-serif;padding:20px">
        <h2 style="margin:0 0 16px 0;">Property Update</h2>
        <p>A property you saved has been updated.</p>
        ${propertyTitle ? `<p><strong>Title:</strong> ${propertyTitle}</p>` : ''}
        <p><a href="${url}" style="background:#000;color:#fff;padding:10px 16px;text-decoration:none;font-weight:bold;">View Property</a></p>
      </div>
    `;
    const result = await sendEmail({ to, subject, text, html });
    if (!result.success) failures++;
  }

  return res.status(200).json({ success: true, failures });
}
