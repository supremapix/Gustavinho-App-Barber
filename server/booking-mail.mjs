import nodemailer from 'nodemailer';
const mailbox = 'contato@barbeiro.curitiba.br';

function transport() {
  const password = process.env.BOOKING_SMTP_PASSWORD;
  if (!password) throw Object.assign(new Error('SMTP not configured'), { code: 'NOT_CONFIGURED' });
  return nodemailer.createTransport({
    host: 'smtpi.uni5.net', port: 465, secure: true,
    auth: { user: mailbox, pass: password },
    tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 14000,
    disableFileAccess: true, disableUrlAccess: true,
  });
}

export async function sendSyntheticBookingNotification() {
  const client = transport();
  try {
    const result = await client.sendMail({
      from: { name: 'Agenda do Gustavinho do Corte', address: mailbox },
      to: mailbox,
      subject: '[TESTE] Aviso da agenda do Gustavinho',
      text: 'Teste de entrega do site do Gustavinho do Corte. Nenhuma reserva foi criada. Esta mensagem não exige resposta.',
    });
    return result.accepted.some(address => address.toLowerCase() === mailbox);
  } finally { client.close(); }
}
