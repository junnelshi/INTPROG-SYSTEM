import * as SibApiV3Sdk from '@sendinblue/client';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export default async function sendEmail({ to, subject, html }: any) {
    console.log('Sending email to:', to);

    const sendSmtpEmail = {
        to: [{ email: to }],
        sender: { email: 'lapisranzjunnel@gmail.com', name: 'INTPROG System' },
        subject,
        htmlContent: html
    };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', result);
}