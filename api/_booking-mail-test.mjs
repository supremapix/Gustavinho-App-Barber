import { createHash, timingSafeEqual } from 'node:crypto';
import { sendSyntheticBookingNotification } from '../server/booking-mail.mjs';
const expected = Buffer.from('59e959cb703821e24a36d077051ec934ca359696b56a292b3263220a451077d6', 'hex');
const expires = 1795642821912;
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  const auth = req.headers.authorization;
  if (req.method !== 'POST' || Date.now() >= expires || typeof auth !== 'string' || !/^Bearer [0-9a-f]{64}$/.test(auth) ||
      !timingSafeEqual(createHash('sha256').update(auth.slice(7)).digest(), expected)) {
    return res.status(404).json({ ok: false });
  }
  try {
    const accepted = await sendSyntheticBookingNotification();
    return res.status(accepted ? 200 : 502).json({ accepted });
  } catch (error) {
    const status = error?.responseCode;
    const allowed = ['EAUTH', 'ECONNECTION', 'ETIMEDOUT', 'ESOCKET', 'EENVELOPE', 'EMESSAGE', 'NOT_CONFIGURED'];
    const code = allowed.includes(error?.code) ? error.code : 'SEND_FAILED';
    return res.status(502).json({ accepted: false, code, smtpStatus: Number.isInteger(status) ? status : null });
  }
}
