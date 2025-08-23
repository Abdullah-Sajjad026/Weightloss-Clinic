# 📧 Gmail SMTP Setup Instructions

## Required Steps to Enable Gmail SMTP

### 1. **Enable 2-Factor Authentication**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click "2-Step Verification"
3. Follow the setup process to enable 2FA

### 2. **Generate App Password**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click "App passwords"
3. You might need to sign in again
4. Select "Mail" as the app
5. Select "Other (custom name)" as device and enter "Northampton Clinic"
6. Click "Generate"
7. **Copy the 16-character password** (format: `xxxx xxxx xxxx xxxx`)

### 3. **Update Environment Variables**
Update your `.env.local` file:

```bash
# Gmail SMTP Configuration
GMAIL_USER="your-actual-gmail@gmail.com"
GMAIL_APP_PASSWORD="your-16-char-app-password"
ADMIN_EMAIL="your-actual-gmail@gmail.com"
```

**Important Notes:**
- Use your actual Gmail address for `GMAIL_USER`
- The App Password is NOT your regular Gmail password
- Remove spaces from the App Password when copying
- Keep the App Password secure and don't share it

### 4. **Test the Setup**
Run the test to verify everything works:

```bash
node test-gmail-setup.js
```

## 🚨 Troubleshooting

### "Invalid login: Username and Password not accepted"
- ✅ Verify 2-Factor Authentication is enabled
- ✅ Use App Password, not your regular password
- ✅ Make sure Gmail address is correct
- ✅ Remove any spaces from the App Password

### "Less secure app access"
- Gmail SMTP with App Passwords is secure and recommended
- You don't need to enable "less secure apps" when using App Passwords

### "Connection timeout"
- Check your internet connection
- Verify firewall allows outbound connections on ports 587/465

## 📋 Current Configuration Status

Your current `.env.local` has placeholder credentials that need to be replaced with real Gmail credentials.

After setup, your system will:
✅ Send appointment confirmations via Gmail
✅ Send admin notifications for new bookings  
✅ Include Google Meet links in professional emails
✅ Use your Gmail address as the sender

## 🔒 Security Best Practices

- Keep your App Password secure
- Don't commit real credentials to Git
- Use environment variables for sensitive data
- Rotate App Passwords periodically
- Monitor sent emails for any suspicious activity