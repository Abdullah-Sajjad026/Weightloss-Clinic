# 🗓️ Google Calendar API Setup for Real Meet Links

## Quick Setup for Real Google Meet Links

To create **real Google Meet links** that actually work, you need to set up Google Calendar API integration.

### Option 1: Service Account (Recommended for Production)

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one

2. **Enable APIs**
   - Go to "APIs & Services" > "Library"
   - Search for and enable:
     - Google Calendar API
     - Google Meet API (optional, for advanced features)

3. **Create Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name: "Northampton Clinic Meeting Service"
   - Click "Create and Continue"

4. **Download Service Account Key**
   - In the service account, go to "Keys" tab
   - Click "Add Key" > "Create new key" > JSON
   - Download the JSON file
   - **Keep this file secure!**

5. **Add to Environment**
   ```bash
   # Add to .env.local (replace with your actual JSON content)
   GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"your-project",...}'
   ```

6. **Share Calendar with Service Account**
   - Open Google Calendar
   - Create a new calendar or use existing one
   - Share it with the service account email (found in the JSON file)
   - Give "Make changes to events" permission

### Option 2: Development/Testing (Quick Start)

For testing, the system will create **development links** that look real but don't work. This is useful for:
- Testing email templates
- Checking appointment flow
- Development without Google API setup

## 🧪 Testing Your Setup

After configuration, test an appointment booking:

```bash
# The system will log which type of link was created:
📝 Google Auth not available, creating development link  # = Fake link
✅ Real Google Meet event created: {...}                # = Real link
```

## 🔍 How to Identify Real vs Development Links

**Real Google Meet Links:**
- Format: `https://meet.google.com/abc-defg-hij` (random characters)
- Actually work when clicked
- Create calendar events automatically
- Send Google Calendar invitations

**Development Links:**
- Format: `https://meet.google.com/abc-defg-hij` (predictable pattern)
- Show "Meeting doesn't exist" error when clicked
- No calendar events created
- For testing purposes only

## 🚀 What Happens with Real Setup

When Google Calendar API is configured:

✅ **Real Google Meet rooms** are created  
✅ **Calendar events** added to both patient and admin calendars  
✅ **Email reminders** sent by Google  
✅ **Meeting recordings** possible (with Google Workspace)  
✅ **Automatic timezone handling**  
✅ **Professional meeting management**  

## 📋 Current Status

Run an appointment booking to see in the console logs:
- `🎥 Created meeting for appointment: { isRealMeeting: false }` = Development mode
- `🎥 Created meeting for appointment: { isRealMeeting: true }` = Real meetings enabled

## 🔒 Security Notes

- Keep service account JSON secure
- Don't commit credentials to Git
- Use environment variables for sensitive data
- Regularly rotate service account keys
- Monitor Google Cloud usage and costs

## 💰 Cost Considerations

Google Calendar API usage is free for most use cases:
- 1,000,000+ API calls per day (free tier)
- Google Meet creation is free
- Only pay if you exceed quotas (very unlikely for a clinic)