import nodemailer from 'nodemailer';

// Ethereal test account credentials
let transporter: nodemailer.Transporter;

async function getTransporter() {
    if (!transporter) {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        console.log('Ethereal account created:', testAccount.user);
    }
    return transporter;
}

export default async function sendEmail({ to, subject, html }: any) {
    console.log('Sending email to:', to);
    
    const transport = await getTransporter();
    
    const info = await transport.sendMail({
        from: '"INTPROG System" <noreply@intprog.com>',
        to,
        subject,
        html
    });

    console.log('Email sent successfully:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
}