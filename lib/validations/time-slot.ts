import * as z from 'zod'

export const timeSlotSchema = z.object({
  dayOfWeek: z.number().min(1).max(7),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  duration: z.number().min(15).max(120),
  isActive: z.boolean().default(true),
}).refine((data) => {
  const start = new Date(`1970-01-01T${data.startTime}:00`)
  const end = new Date(`1970-01-01T${data.endTime}:00`)
  return start < end
}, {
  message: "End time must be after start time",
  path: ["endTime"],
})

export type TimeSlotFormData = z.infer<typeof timeSlotSchema>