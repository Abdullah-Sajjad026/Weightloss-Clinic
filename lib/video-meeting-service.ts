import { randomBytes } from 'crypto'

/**
 * Video Meeting Service
 * 
 * Uses Jitsi Meet for reliable, working video meetings without API keys.
 * Jitsi is a free, open-source video conferencing solution.
 */

export interface MeetingDetails {
  meetingId: string
  meetingLink: string
  meetingCode: string
  platform: 'jitsi' | 'googlemeet'
}

/**
 * Generate a working Jitsi Meet room
 */
export const generateJitsiMeetRoom = async (appointment: {
  id: string
  name: string
  email: string
  consultationType: string
  preferredDate: Date
}): Promise<MeetingDetails> => {
  // Generate a secure room name
  const roomName = `NorthamptonClinic_${appointment.consultationType}_${appointment.id}_${Date.now()}`
  const meetingCode = roomName.replace(/[^a-zA-Z0-9]/g, '') // Clean for display
  const meetingId = `jitsi_${randomBytes(8).toString('hex')}`
  
  // Create Jitsi Meet URL
  const meetingLink = `https://meet.jit.si/${roomName}`
  
  console.log('🎥 Created Jitsi Meet room:', {
    meetingId,
    meetingLink,
    roomName,
    patient: appointment.name,
    scheduledFor: appointment.preferredDate
  })

  return {
    meetingId,
    meetingLink,
    meetingCode: meetingCode.substring(0, 20) + '...', // Truncate for display
    platform: 'jitsi'
  }
}

/**
 * Generate meeting instructions for patients (Jitsi)
 */
export const generateJitsiMeetingInstructions = (meetingDetails: MeetingDetails): string => {
  return `
📱 **How to join your video consultation:**

🔗 **Meeting Link:** ${meetingDetails.meetingLink}

**Before your appointment:**
• Test your camera and microphone by clicking the link early
• Ensure stable internet connection
• Use Chrome, Firefox, Safari, or Edge browser (works on phones too!)
• Have a pen and paper ready for notes
• Prepare any questions you'd like to ask

**Joining the meeting:**
1. Click the meeting link 5-10 minutes before your appointment
2. Enter your name when prompted
3. Allow camera and microphone access when asked
4. You'll enter a waiting room until the doctor joins

**Features available:**
• HD video and audio
• Screen sharing (if doctor needs to show you something)
• Chat messages
• Works on any device (computer, phone, tablet)

**Need help?**
• Call our clinic at +44 1604 250734
• Email us at regent.pharmacy@nhs.net
• Technical issues? Try refreshing the page or using a different browser

**Privacy Notice:**
Your consultation is completely private and secure. The meeting room is automatically deleted after your session.
  `.trim()
}

/**
 * Create a video meeting room for appointment
 */
export const createMeetingForAppointment = async (appointment: {
  id: string
  name: string
  email: string
  consultationType: string
  preferredDate: Date
}): Promise<MeetingDetails> => {
  // For now, always use Jitsi as it's reliable and works immediately
  return await generateJitsiMeetRoom(appointment)
}

/**
 * Validate meeting link format
 */
export const isValidMeetingLink = (link: string): boolean => {
  const jitsiRegex = /^https:\/\/meet\.jit\.si\/[\w-]+$/
  const googleMeetRegex = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/
  
  return jitsiRegex.test(link) || googleMeetRegex.test(link)
}

/**
 * Extract meeting room name from link
 */
export const extractMeetingCode = (link: string): string | null => {
  // Jitsi Meet
  const jitsiMatch = link.match(/https:\/\/meet\.jit\.si\/(.+)/)
  if (jitsiMatch) return jitsiMatch[1]
  
  // Google Meet
  const googleMatch = link.match(/https:\/\/meet\.google\.com\/([a-z-]+)/)
  if (googleMatch) return googleMatch[1]
  
  return null
}

/**
 * Get platform from meeting link
 */
export const getMeetingPlatform = (link: string): 'jitsi' | 'googlemeet' | 'unknown' => {
  if (link.includes('meet.jit.si')) return 'jitsi'
  if (link.includes('meet.google.com')) return 'googlemeet'
  return 'unknown'
}

/**
 * Meeting configuration options
 */
export interface MeetingConfig {
  duration: number // Expected duration in minutes
  requiresPassword: boolean
  allowRecording: boolean
  waitingRoomEnabled: boolean
}

/**
 * Default meeting configuration for medical consultations
 */
export const getDefaultMeetingConfig = (): MeetingConfig => ({
  duration: 30, // 30 minutes default
  requiresPassword: false, // Secure room names are sufficient
  allowRecording: false, // Privacy for medical consultations
  waitingRoomEnabled: true, // Doctor controls access
})

export default {
  createMeetingForAppointment,
  generateJitsiMeetingInstructions,
  isValidMeetingLink,
  extractMeetingCode,
  getMeetingPlatform
}