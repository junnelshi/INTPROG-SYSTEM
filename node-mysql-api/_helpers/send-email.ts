import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({ to, subject, html, from }: any) {
    console.log('Sending email to:', to);

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html
    });

    if (error) {
        console.error('Email error:', error);
        throw error;
    }

    console.log('Email sent successfully:', data);
}