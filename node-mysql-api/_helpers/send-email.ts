import nodemailer from 'nodemailer';

export default async function sendEmail({ to, subject, html, from }: any) {
    console.log('Sending email to:', to);
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    } as any);

    try {
        await transporter.sendMail({ from: from || process.env.EMAIL_FROM, to, subject, html });
        console.log('Email sent successfully to:', to);
    } catch (err) {
        console.error('Email sending error:', err);
        throw err;
    }
}