// Gmail SMTP test script
const nodemailer = require('nodemailer')

async function testGmailSetup() {
  console.log('📧 Testing Gmail SMTP configuration...\n')
  
  // Check environment variables
  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
  const adminEmail = process.env.ADMIN_EMAIL
  
  console.log('🔍 Configuration Check:')
  console.log(`   Gmail User: ${gmailUser || '❌ Missing'}`)
  console.log(`   App Password: ${gmailAppPassword ? '✅ Set' : '❌ Missing'}`)
  console.log(`   Admin Email: ${adminEmail || '❌ Missing'}`)
  
  if (!gmailUser || !gmailAppPassword) {
    console.log('\n❌ Gmail credentials are not configured!')
    console.log('\n📋 To fix this:')
    console.log('1. Go to your Gmail account settings')
    console.log('2. Enable 2-Factor Authentication')
    console.log('3. Generate an App Password for "Mail"')
    console.log('4. Update .env.local with:')
    console.log('   GMAIL_USER="your-email@gmail.com"')
    console.log('   GMAIL_APP_PASSWORD="your-16-char-app-password"')
    return
  }
  
  // Create Gmail SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  })

  try {
    console.log('\n🔗 Testing SMTP connection...')
    await transporter.verify()
    console.log('✅ Gmail SMTP connection successful!')
    
    console.log('\n📤 Sending test email...')
    
    const result = await transporter.sendMail({
      from: `"Northampton Clinic Test" <${gmailUser}>`,
      to: adminEmail || gmailUser,
      subject: 'Gmail SMTP Test - Northampton Clinic ✅',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">🎉 Gmail SMTP Setup Successful!</h2>
          <p>Your Northampton Clinic email system is now using Gmail SMTP.</p>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <strong>✅ What this means:</strong><br>
            • Appointment confirmations will be sent via Gmail<br>
            • Admin notifications will be sent for new bookings<br>
            • Google Meet links will be included in emails<br>
            • Professional email sender: ${gmailUser}
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Test sent at ${new Date().toLocaleString()}
          </p>
        </div>
      `
    })
    
    console.log('✅ Test email sent successfully!')
    console.log(`📧 Message ID: ${result.messageId}`)
    console.log(`📨 Sent to: ${adminEmail || gmailUser}`)
    console.log('\n🎯 Check your inbox for the test email!')
    
  } catch (error) {
    console.error('\n❌ Gmail SMTP test failed:')
    console.error(error.message)
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Authentication failed. Common issues:')
      console.log('• App Password might be incorrect')
      console.log('• 2-Factor Authentication not enabled')
      console.log('• Less secure app access might be disabled')
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 Connection failed. Check your internet connection.')
    }
  }
}

// Run the test
testGmailSetup()