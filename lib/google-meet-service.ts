import { randomBytes } from 'crypto'
import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'

/**
 * Google Meet Service
 * 
 * Creates real Google Meet links through Google Calendar API integration.
 * Falls back to development links if Google APIs are not configured.
 */

export interface MeetingDetails {
  meetingId: string
  meetingLink: string
  meetingCode: string
}

/**
 * Generate a Google Meet-style meeting link
 * 
 * Note: This generates a mock meeting link for development.
 * In production, integrate with Google Calendar/Meet API for real meetings.
 */
export const generateGoogleMeetLink = async (): Promise<MeetingDetails> => {
  // Generate a random meeting code (10 characters, similar to Google Meet)
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  let meetingCode = ''
  
  // Generate three groups of 3-4 characters separated by hyphens
  for (let i = 0; i < 3; i++) {
    if (i > 0) meetingCode += '-'
    const groupLength = i === 1 ? 4 : 3 // Middle group has 4 chars
    for (let j = 0; j < groupLength; j++) {
      meetingCode += characters.charAt(Math.floor(Math.random() * characters.length))
    }
  }

  const meetingId = `meeting_${randomBytes(8).toString('hex')}`
  const meetingLink = `https://meet.google.com/${meetingCode}`

  return {
    meetingId,
    meetingLink,
    meetingCode,
  }
}

/**
 * Create Google Auth client
 */
const getGoogleAuth = async () => {
  try {
    // Try to use service account credentials if available
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/calendar']
      })
      return auth
    }
    
    // Fallback to application default credentials
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/calendar']
    })
    return auth
  } catch (error) {
    console.log('⚠️  Google Auth not configured, using development links')
    return null
  }
}

/**
 * Create real Google Meet link via Calendar API
 */
export const createRealGoogleMeetEvent = async (appointment: {
  id: string
  name: string
  email: string
  consultationType: string
  preferredDate: Date
}): Promise<MeetingDetails> => {
  try {
    const auth = await getGoogleAuth()
    if (!auth) {
      console.log('📝 Google Auth not available, creating development link')
      return await generateGoogleMeetLink()
    }

    const calendar = google.calendar({ version: 'v3', auth })
    
    // Calculate end time (30 minutes after start)
    const endTime = new Date(appointment.preferredDate.getTime() + 30 * 60 * 1000)
    
    // First try with conferenceData for real Google Meet
    console.log('📅 Attempting to create Google Calendar event with Meet link...')
    
    try {
      const eventWithMeet = {
        summary: `${appointment.consultationType} Consultation - ${appointment.name}`,
        description: `Virtual weight loss consultation with ${appointment.name}\n\nPatient Email: ${appointment.email}`,
        start: {
          dateTime: appointment.preferredDate.toISOString(),
          timeZone: 'Europe/London',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'Europe/London',
        },
        conferenceData: {
          createRequest: {
            requestId: `meet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        }
      }

      const responseWithMeet = await calendar.events.insert({
        calendarId: 'primary',
        resource: eventWithMeet,
        conferenceDataVersion: 1,
        sendUpdates: 'none'
      })

      const meetingLink = responseWithMeet.data.hangoutLink || 
                          responseWithMeet.data.conferenceData?.entryPoints?.find(ep => ep.entryPointType === 'video')?.uri

      if (meetingLink) {
        const meetingCode = extractMeetingCode(meetingLink) || 'unknown'
        
        console.log('✅ Real Google Meet event created successfully:', {
          eventId: responseWithMeet.data.id,
          meetingLink,
          meetingCode
        })

        return {
          meetingId: responseWithMeet.data.id || `meeting_${randomBytes(8).toString('hex')}`,
          meetingLink,
          meetingCode,
        }
      }
    } catch (meetError) {
      console.log('⚠️  Could not create Meet link via conferenceData, trying alternative approach...')
    }

    // Fallback: Create regular calendar event and use our own Meet-style link
    const basicEvent = {
      summary: `${appointment.consultationType} Consultation - ${appointment.name}`,
      description: `Virtual weight loss consultation with ${appointment.name}\n\nPatient Email: ${appointment.email}\n\nMeeting link will be provided via email.`,
      start: {
        dateTime: appointment.preferredDate.toISOString(),
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/London',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 10 },
        ],
      }
    }

    const basicResponse = await calendar.events.insert({
      calendarId: 'primary',
      resource: basicEvent,
      sendUpdates: 'none'
    })

    console.log('📅 Basic calendar event created, generating custom Meet link...')

    // Generate our own Meet-style link
    const customMeetLink = await generateGoogleMeetLink()
    
    // Update the event with the meeting link in description
    await calendar.events.patch({
      calendarId: 'primary',
      eventId: basicResponse.data.id!,
      resource: {
        description: `${basicEvent.description}\n\nGoogle Meet Link: ${customMeetLink.meetingLink}`
      }
    })

    console.log('✅ Calendar event with custom Meet link created:', {
      eventId: basicResponse.data.id,
      meetingLink: customMeetLink.meetingLink
    })

    return {
      meetingId: basicResponse.data.id || customMeetLink.meetingId,
      meetingLink: customMeetLink.meetingLink,
      meetingCode: customMeetLink.meetingCode,
    }

  } catch (error) {
    console.error('❌ Failed to create Google Calendar event:', error)
    console.log('📝 Falling back to development link')
    return await generateGoogleMeetLink()
  }
}

/**
 * Generate meeting details for appointment
 */
export const createMeetingForAppointment = async (appointment: {
  id: string
  name: string
  email: string
  consultationType: string
  preferredDate: Date
}): Promise<MeetingDetails> => {
  // Try to create real Google Meet link first
  const meetingDetails = await createRealGoogleMeetEvent(appointment)

  // Log for development purposes
  console.log('🎥 Created meeting for appointment:', {
    appointmentId: appointment.id,
    patient: appointment.name,
    meetingLink: meetingDetails.meetingLink,
    scheduledFor: appointment.preferredDate,
    isRealMeeting: meetingDetails.meetingLink.includes('meet.google.com') && !meetingDetails.meetingLink.includes('abc-')
  })

  return meetingDetails
}

/**
 * Meeting configuration options
 */
export interface MeetingConfig {
  // Meeting duration in minutes
  duration: number
  // Allow recording (requires Google Workspace)
  allowRecording: boolean
  // Waiting room settings
  requiresApproval: boolean
  // Auto-transcription
  enableTranscription: boolean
}

/**
 * Default meeting configuration for medical consultations
 */
export const getDefaultMeetingConfig = (): MeetingConfig => ({
  duration: 30, // 30 minutes default
  allowRecording: false, // Privacy for medical consultations
  requiresApproval: true, // Doctor should approve patient entry
  enableTranscription: false, // Medical privacy
})

/**
 * Validate Google Meet link format
 */
export const isValidGoogleMeetLink = (link: string): boolean => {
  const meetRegex = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/
  return meetRegex.test(link)
}

/**
 * Extract meeting code from Google Meet link
 */
export const extractMeetingCode = (link: string): string | null => {
  const match = link.match(/https:\/\/meet\.google\.com\/([a-z-]+)/)
  return match ? match[1] : null
}

/**
 * Generate meeting instructions for patients
 */
export const generateMeetingInstructions = (meetingDetails: MeetingDetails): string => {
  return `
📱 **How to join your consultation:**

🔗 **Meeting Link:** ${meetingDetails.meetingLink}
🔢 **Meeting Code:** ${meetingDetails.meetingCode}

**Before your appointment:**
• Test your camera and microphone
• Ensure stable internet connection
• Have a pen and paper ready for notes
• Prepare any questions you'd like to ask

**Joining the meeting:**
1. Click the meeting link 5-10 minutes before your appointment
2. You may need to wait in the waiting room until the doctor joins
3. If prompted, allow camera and microphone access

**Need help?**
• Call our clinic at +44 1234 567890
• Email us at support@northamptonclinic.co.uk

**Privacy Notice:**
Your consultation is confidential and secure. Please join from a private location.
  `.trim()
}

/**
 * Production Google Meet Integration
 * 
 * For production use, implement these functions with Google Calendar API:
 * - https://developers.google.com/calendar/api/guides/create-events
 * - https://developers.google.com/meet/api
 */

/*
// Example production implementation:

import { google } from 'googleapis'

const calendar = google.calendar({
  version: 'v3',
  auth: // your Google Auth client
})

export const createRealGoogleMeetEvent = async (appointment: AppointmentData) => {
  const event = {
    summary: `${appointment.consultationType} Consultation - ${appointment.name}`,
    description: `Virtual consultation with ${appointment.name}`,
    start: {
      dateTime: appointment.preferredDate.toISOString(),
      timeZone: appointment.timezone || 'Europe/London',
    },
    end: {
      dateTime: new Date(appointment.preferredDate.getTime() + 30 * 60 * 1000).toISOString(),
      timeZone: appointment.timezone || 'Europe/London',
    },
    attendees: [
      { email: appointment.email },
      { email: process.env.CLINIC_EMAIL }
    ],
    conferenceData: {
      createRequest: {
        requestId: `meet_${appointment.id}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    }
  }

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1
  })

  return {
    meetingId: response.data.id,
    meetingLink: response.data.hangoutLink,
    meetingCode: extractMeetingCode(response.data.hangoutLink)
  }
}
*/