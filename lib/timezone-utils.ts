import { format } from 'date-fns'

/**
 * Common timezone mappings for the UK clinic
 */
export const COMMON_TIMEZONES = {
  'Europe/London': 'London (GMT/BST)',
  'America/New_York': 'New York (EST/EDT)',
  'America/Los_Angeles': 'Los Angeles (PST/PDT)',
  'America/Chicago': 'Chicago (CST/CDT)',
  'Europe/Paris': 'Paris (CET/CEST)',
  'Europe/Berlin': 'Berlin (CET/CEST)',
  'Asia/Dubai': 'Dubai (GST)',
  'Asia/Kolkata': 'Mumbai/Delhi (IST)',
  'Australia/Sydney': 'Sydney (AEST/AEDT)',
  'Asia/Singapore': 'Singapore (SGT)',
} as const

export type TimezoneKey = keyof typeof COMMON_TIMEZONES

/**
 * Detect user's timezone using browser API
 */
export const detectUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch (error) {
    console.warn('Could not detect timezone, falling back to Europe/London')
    return 'Europe/London'
  }
}

/**
 * Format date/time for a specific timezone
 */
export const formatDateTimeForTimezone = (
  date: Date,
  timezone: string,
  options: {
    includeDate?: boolean
    includeTime?: boolean
    timeFormat?: '12h' | '24h'
    dateFormat?: 'short' | 'long' | 'medium'
  } = {}
): string => {
  const {
    includeDate = true,
    includeTime = true,
    timeFormat = '12h',
    dateFormat = 'medium'
  } = options

  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      ...(includeDate && {
        year: 'numeric',
        month: dateFormat === 'short' ? 'short' : dateFormat === 'long' ? 'long' : '2-digit',
        day: '2-digit',
      }),
      ...(includeTime && {
        hour: '2-digit',
        minute: '2-digit',
        hour12: timeFormat === '12h',
      }),
    })

    return formatter.format(date)
  } catch (error) {
    console.error('Error formatting date for timezone:', error)
    return format(date, includeTime ? 'PPp' : 'PP')
  }
}

/**
 * Get timezone display name
 */
export const getTimezoneDisplayName = (timezone: string): string => {
  if (timezone in COMMON_TIMEZONES) {
    return COMMON_TIMEZONES[timezone as TimezoneKey]
  }

  // Try to get a readable name from the timezone
  try {
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone: timezone,
      timeZoneName: 'long'
    })
    const parts = formatter.formatToParts(new Date())
    const timeZoneName = parts.find(part => part.type === 'timeZoneName')?.value
    return timeZoneName || timezone
  } catch (error) {
    return timezone
  }
}

/**
 * Convert appointment time to different timezones for display
 */
export const formatAppointmentTime = (
  appointmentDate: Date,
  patientTimezone: string,
  clinicTimezone: string = 'Europe/London'
) => {
  return {
    patient: {
      timezone: patientTimezone,
      time: formatDateTimeForTimezone(appointmentDate, patientTimezone),
      timeOnly: formatDateTimeForTimezone(appointmentDate, patientTimezone, { 
        includeDate: false 
      }),
      dateOnly: formatDateTimeForTimezone(appointmentDate, patientTimezone, { 
        includeTime: false 
      }),
    },
    clinic: {
      timezone: clinicTimezone,
      time: formatDateTimeForTimezone(appointmentDate, clinicTimezone),
      timeOnly: formatDateTimeForTimezone(appointmentDate, clinicTimezone, { 
        includeDate: false 
      }),
      dateOnly: formatDateTimeForTimezone(appointmentDate, clinicTimezone, { 
        includeTime: false 
      }),
    }
  }
}

/**
 * Create timezone-aware calendar event data
 */
export const createCalendarEventData = (
  appointment: {
    name: string
    email: string
    consultationType: string
    preferredDate: Date
    timezone: string
    meetingLink?: string
  }
) => {
  const startDate = appointment.preferredDate
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000) // 30 minutes

  // Format dates in UTC for calendar links
  const formatForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const eventData = {
    title: `${appointment.consultationType} Consultation - ${appointment.name}`,
    start: formatForCalendar(startDate),
    end: formatForCalendar(endDate),
    description: `Virtual consultation via Google Meet${appointment.meetingLink ? `\n\nJoin meeting: ${appointment.meetingLink}` : ''}`,
    location: appointment.meetingLink || 'Virtual Meeting',
  }

  // Generate Google Calendar link
  const googleCalendarParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventData.title,
    dates: `${eventData.start}/${eventData.end}`,
    details: eventData.description,
    location: eventData.location,
  })

  return {
    ...eventData,
    googleCalendarUrl: `https://calendar.google.com/calendar/render?${googleCalendarParams.toString()}`,
  }
}

/**
 * Validate timezone string
 */
export const isValidTimezone = (timezone: string): boolean => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone })
    return true
  } catch (error) {
    return false
  }
}