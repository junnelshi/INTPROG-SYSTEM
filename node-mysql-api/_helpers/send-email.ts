import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

export default async function sendEmail({ to, subject, html }: any) {
    console.log('Sending email to:', to);

    const info = await transporter.sendMail({
        from: `"INTPROG System" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        html
    });

    console.log('Email sent successfully:', info.messageId);
}