import * as z from 'zod'

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  consultationType: z.enum(['INJECTIONS', 'GENERAL'], { // 'PILLS', 'SURGERY' - commented out for now
    required_error: 'Please select a consultation type',
  }),
  timeSlotId: z.string().min(1, 'Please select an available time slot'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  timezone: z.string().optional(), // Patient's timezone
  notes: z.string().optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>