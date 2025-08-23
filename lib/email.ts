import { Resend } from 'resend'
import { render } from '@react-email/render'
import { AppointmentBookingEmail } from '@/emails/appointment-booking'
import { AdminNotificationEmail } from '@/emails/admin-notification'

const resend = new Resend(process.env.RESEND_API_KEY)

interface AppointmentData {
  id: string
  name: string
  email: string
  phone: string
  consultationType: string
  preferredDate: Date
  notes?: string | null
  timeSlot: {
    dayOfWeek: number
    startTime: string
    endTime: string
    duration: number
  }
}

export async function sendAppointmentBookingEmails(appointment: AppointmentData) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@northamptonclinic.com'
    
    // Send confirmation email to user
    const userEmailHtml = render(AppointmentBookingEmail({ appointment }))
    const userEmailResult = await resend.emails.send({
      from: 'Northampton Clinic <noreply@northamptonclinic.com>',
      to: appointment.email,
      subject: 'Appointment Request Received - Northampton Clinic',
      html: userEmailHtml,
    })

    // Send notification email to admin
    const adminEmailHtml = render(AdminNotificationEmail({ appointment }))
    const adminEmailResult = await resend.emails.send({
      from: 'Northampton Clinic <noreply@northamptonclinic.com>',
      to: adminEmail,
      subject: `New Appointment Request - ${appointment.name}`,
      html: adminEmailHtml,
    })

    return {
      userEmailResult,
      adminEmailResult,
    }
  } catch (error) {
    console.error('Error sending emails:', error)
    throw error
  }
}