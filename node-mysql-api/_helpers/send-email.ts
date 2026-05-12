import nodemailer from 'nodemailer';
import config from '../config.json' with { type: 'json' };

export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
    const transporter = nodemailer.createTransport({
        ...config.smtpOptions,
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
        tls: {
            rejectUnauthorized: false
        }
    });
    await transporter.sendMail({ from, to, subject, html });
}