'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { appointmentSchema, type AppointmentFormData } from '@/lib/validations/appointment'
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react'

const CONSULTATION_TYPES = [
  { value: 'INJECTIONS', label: 'Weight Loss Injections' },
  { value: 'PILLS', label: 'Weight Loss Pills' },
  { value: 'SURGERY', label: 'Bariatric Surgery' },
  { value: 'GENERAL', label: 'General Consultation' },
]

interface TimeSlot {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  duration: number
  isActive: boolean
}

interface AppointmentBookingFormProps {
  onSubmit: (data: AppointmentFormData) => Promise<void>
  isLoading?: boolean
}

export function AppointmentBookingForm({ onSubmit, isLoading }: AppointmentBookingFormProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableDates, setAvailableDates] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      consultationType: 'GENERAL',
    },
  })

  const selectedTimeSlotId = watch('timeSlotId')

  useEffect(() => {
    fetchTimeSlots()
  }, [])

  useEffect(() => {
    if (selectedTimeSlotId) {
      generateAvailableDates(selectedTimeSlotId)
    }
  }, [selectedTimeSlotId])

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch('/api/time-slots')
      if (response.ok) {
        const data = await response.json()
        setTimeSlots(data.filter((slot: TimeSlot) => slot.isActive))
      }
    } catch (error) {
      console.error('Error fetching time slots:', error)
    }
  }

  const generateAvailableDates = (timeSlotId: string) => {
    const slot = timeSlots.find(s => s.id === timeSlotId)
    if (!slot) return

    const dates: string[] = []
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())

    for (let d = new Date(today); d <= nextMonth; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === (slot.dayOfWeek === 7 ? 0 : slot.dayOfWeek)) {
        if (d > today) {
          dates.push(d.toISOString().split('T')[0])
        }
      }
    }
    setAvailableDates(dates)
  }

  const handleFormSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTimeSlot = (slot: TimeSlot) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = days[slot.dayOfWeek === 7 ? 0 : slot.dayOfWeek]
    const startTime = new Date(`1970-01-01T${slot.startTime}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    const endTime = new Date(`1970-01-01T${slot.endTime}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    return `${dayName} ${startTime} - ${endTime} (${slot.duration} min)`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Book Your Consultation
        </CardTitle>
        <p className="text-gray-600">
          Fill out the form below to schedule your video consultation with our medical team.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter your full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Enter your phone number"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultationType">Consultation Type</Label>
              <Select
                onValueChange={(value) => setValue('consultationType', value as any)}
                defaultValue={watch('consultationType')}
              >
                <SelectTrigger className={errors.consultationType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
                <SelectContent>
                  {CONSULTATION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.consultationType && (
                <p className="text-sm text-red-600">{errors.consultationType.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSlotId" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Available Time Slots
            </Label>
            <Select
              onValueChange={(value) => setValue('timeSlotId', value)}
            >
              <SelectTrigger className={errors.timeSlotId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.id} value={slot.id}>
                    {formatTimeSlot(slot)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.timeSlotId && (
              <p className="text-sm text-red-600">{errors.timeSlotId.message}</p>
            )}
          </div>

          {selectedTimeSlotId && availableDates.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <Select
                onValueChange={(value) => setValue('preferredDate', value)}
              >
                <SelectTrigger className={errors.preferredDate ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {formatDate(date)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.preferredDate && (
                <p className="text-sm text-red-600">{errors.preferredDate.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Any additional information or questions..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Please note:</strong> This is a booking request. Our team will contact you within 24 hours to confirm your appointment and provide video call details.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}