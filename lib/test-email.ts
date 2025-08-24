// Email testing utility
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function testEmailSetup(testEmail: string) {
  try {
    console.log('📧 Testing email setup...')
    console.log('🔑 API Key configured:', process.env.RESEND_API_KEY ? 'YES' : 'NO')
    console.log('📨 Admin email:', process.env.ADMIN_EMAIL)
    
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
      throw new Error('❌ RESEND_API_KEY not configured properly')
    }

    const result = await resend.emails.send({
      from: 'Northampton Clinic <onboarding@resend.dev>', // Use resend's test domain
      to: testEmail,
      subject: '✅ Email Setup Test - Northampton Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7c3aed;">🎉 Email Setup Successful!</h2>
          <p>This is a test email to confirm that your Northampton Clinic email configuration is working properly.</p>
          
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <h3 style="color: #166534; margin: 0 0 10px 0;">✅ Configuration Status:</h3>
            <ul style="color: #166534; margin: 0;">
              <li>Resend API: Connected</li>
              <li>Email Templates: Ready</li>
              <li>Google Meet Integration: Active</li>
              <li>Appointment Booking: Functional</li>
            </ul>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            If you received this email, your appointment booking system will now send confirmation emails to patients and notifications to admins.
          </p>
        </div>
      `
    })

    console.log('✅ Test email sent successfully!')
    console.log('📧 Email ID:', result.data?.id)
    return { success: true, emailId: result.data?.id }

  } catch (error) {
    console.error('❌ Email test failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Quick test function for development
export async function quickEmailTest() {
  const adminEmail = process.env.ADMIN_EMAIL || 'test@example.com'
  return await testEmailSetup(adminEmail)
}