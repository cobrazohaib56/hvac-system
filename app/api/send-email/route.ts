import EmailTemplate from '@/email/email-example';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Testing <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Test Email Subject',
      react: EmailTemplate({ firstName: 'John' })
    });

    if (error) {
      Response.json({ error });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
