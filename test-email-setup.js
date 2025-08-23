// Simple email test script
const { Resend } = require('resend')

async function testEmailSetup() {
  console.log('📧 Testing email configuration...\n')
  
  // Check environment variables
  const apiKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL
  
  console.log('🔍 Configuration Check:')
  console.log(`   API Key: ${apiKey ? '✅ Set' : '❌ Missing'}`)
  console.log(`   Admin Email: ${adminEmail || '❌ Missing'}`)
  
  if (!apiKey || apiKey === 'your_resend_api_key_here') {
    console.log('\n❌ RESEND_API_KEY is not configured!')
    console.log('\n📋 To fix this:')
    console.log('1. Go to https://resend.com and create an account')
    console.log('2. Get your API key from the dashboard')
    console.log('3. Update .env.local with: RESEND_API_KEY="re_your_key_here"')
    return
  }
  
  const resend = new Resend(apiKey)
  
  try {
    console.log('\n📤 Sending test email...')
    
    const result = await resend.emails.send({
      from: 'Test <onboarding@resend.dev>',
      to: adminEmail || 'test@example.com',
      subject: 'Northampton Clinic - Email Test ✅',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">🎉 Email Setup Successful!</h2>
          <p>Your Northampton Clinic email system is working properly.</p>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <strong>✅ What this means:</strong><br>
            • Appointment confirmations will be sent to patients<br>
            • Admin notifications will be sent for new bookings<br>
            • Google Meet links will be included in emails
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Test sent at ${new Date().toLocaleString()}
          </p>
        </div>
      `
    })
    
    console.log('✅ Test email sent successfully!')
    console.log(`📧 Email ID: ${result.data?.id}`)
    console.log(`📨 Sent to: ${adminEmail}`)
    console.log('\n🎯 Check your inbox for the test email!')
    
  } catch (error) {
    console.error('\n❌ Email test failed:')
    console.error(error.message)
    
    if (error.message?.includes('API key')) {
      console.log('\n💡 This looks like an API key issue.')
      console.log('Make sure your API key starts with "re_" and is valid.')
    }
  }
}

// Run the test
testEmailSetup()