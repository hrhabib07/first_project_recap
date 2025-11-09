// mail.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT ?? 587),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, // app password or SMTP password
  },
  // optional: explicit TLS (STARTTLS)
  tls: {
    rejectUnauthorized: false, // only if you face certificate issues in dev
  },
})

// verify connection configuration (useful while starting your app)
transporter
  .verify()
  .then(() => {
    console.log('Mailer is ready')
  })
  .catch((err) => {
    console.error('Mailer verification failed', err)
  })

export const sendEmail = async (
  to: string,
  html: string,
  subject = 'Reset your password within ten mins!',
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text: '', // optional plain text
    html,
  })
}
