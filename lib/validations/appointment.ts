import * as z from 'zod'

export const appointmentSchema = z.object({
  consultationType: z.enum(['INJECTIONS', 'PILLS', 'SURGERY', 'GENERAL'], {
    required_error: 'Please select a consultation type',
  }),
  timeSlotId: z.string().min(1, 'Please select an available time slot'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  timezone: z.string().optional(), // Patient's timezone
  notes: z.string().optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>