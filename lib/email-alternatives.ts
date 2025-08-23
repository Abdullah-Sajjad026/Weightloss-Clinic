// Alternative email service configurations
// You can switch to any of these by updating the email service

// 1. GMAIL/SMTP Configuration
export const gmailConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER, // your-email@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
  }
}

// 2. SendGrid Configuration
export const sendgridConfig = {
  apiKey: process.env.SENDGRID_API_KEY,
  from: process.env.SENDGRID_FROM_EMAIL
}

// 3. Mailgun Configuration
export const mailgunConfig = {
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
}

// 4. SMTP Generic Configuration
export const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
}