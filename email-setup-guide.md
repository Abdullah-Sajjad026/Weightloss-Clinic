# 📧 Email Setup Guide - Northampton Clinic

## Quick Setup (Recommended)

### 1. **Resend Setup (5 minutes)**
Resend is the easiest and most reliable option:

```bash
# 1. Sign up at https://resend.com (free tier: 100 emails/month)
# 2. Get your API key from the dashboard
# 3. Update .env.local:

RESEND_API_KEY="re_your_actual_api_key_here"
ADMIN_EMAIL="your-email@domain.com"
```

### 2. **Test the Setup**
```bash
node test-email-setup.js
```

## Alternative Options

### **Option A: Gmail SMTP** (Free)
If you have a Gmail account:

```bash
# Add to .env.local:
GMAIL_USER="your-gmail@gmail.com"
GMAIL_APP_PASSWORD="your-16-char-app-password"
ADMIN_EMAIL="your-gmail@gmail.com"
```

*Note: You need to enable 2FA and create an App Password*

### **Option B: Development/Testing Only**
For testing without real emails, you can:

1. **Use Mailhog** (Local email testing):
```bash
# Install Mailhog
go install github.com/mailhog/MailHog@latest
# Run it
~/go/bin/MailHog
# View emails at http://localhost:8025
```

2. **Use Mailtrap** (Online testing):
- Sign up at mailtrap.io
- Use their SMTP credentials for testing

## 🚀 **After Setup**

Once configured, your system will automatically:

✅ **Send to Patients:**
- Appointment confirmation with Google Meet link
- Professional HTML email with joining instructions
- Calendar event details with timezone

✅ **Send to Admins:**
- New appointment notifications
- Patient details and meeting links
- Timezone information for coordination

## 🔧 **Troubleshooting**

**"API key invalid"**: Make sure it starts with `re_` and is copied correctly

**"Domain not verified"**: Use `onboarding@resend.dev` for testing, or verify your domain

**"Emails not arriving"**: Check spam folder, verify email addresses

**"SMTP errors"**: Ensure firewall allows outbound port 587/465

## 📝 **Current Configuration Status**

Run this to check your setup:
```bash
node test-email-setup.js
```

The system will show:
- ✅/❌ API key status  
- ✅/❌ Admin email configured
- Test email results