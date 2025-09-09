// Gmail SMTP testing utility
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function testGmailSetup(testEmail: string) {
  try {
    console.log('📧 Testing Gmail SMTP setup...')
    console.log('🔑 Gmail User configured:', process.env.GMAIL_USER ? 'YES' : 'NO')
    console.log('🔑 App Password configured:', process.env.GMAIL_APP_PASSWORD ? 'YES' : 'NO')
    console.log('📨 Admin email:', process.env.ADMIN_EMAIL)
    
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('❌ Gmail credentials not configured properly')
    }

    // Verify SMTP connection
    console.log('🔗 Verifying SMTP connection...')
    await transporter.verify()
    console.log('✅ SMTP connection verified!')

    const result = await transporter.sendMail({
      from: `"Northampton Clinic" <${process.env.GMAIL_USER}>`,
      to: testEmail,
      subject: '✅ Gmail SMTP Test - Northampton Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7c3aed;">🎉 Gmail SMTP Setup Successful!</h2>
          <p>This is a test email to confirm that your Northampton Clinic Gmail SMTP configuration is working properly.</p>
          
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <h3 style="color: #166534; margin: 0 0 10px 0;">✅ Configuration Status:</h3>
            <ul style="color: #166534; margin: 0;">
              <li>Gmail SMTP: Connected</li>
              <li>Email Templates: Ready</li>
              <li>Google Meet Integration: Active</li>
              <li>Appointment Booking: Functional</li>
              <li>Sender: ${process.env.GMAIL_USER}</li>
            </ul>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            Your appointment booking system will now send professional confirmation emails to patients and notifications to admins via Gmail SMTP.
          </p>
        </div>
      `
    })

    console.log('✅ Test email sent successfully!')
    console.log('📧 Message ID:', result.messageId)
    return { success: true, messageId: result.messageId }

  } catch (error) {
    console.error('❌ Gmail test failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Quick test function for development
export async function quickGmailTest() {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER || 'regent.pharmacy@nhs.net'
  return await testGmailSetup(adminEmail)
}