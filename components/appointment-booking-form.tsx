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
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Globe } from 'lucide-react'
import { COMMON_TIMEZONES, detectUserTimezone, getTimezoneDisplayName } from '@/lib/timezone-utils'
import { useUser, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

const CONSULTATION_TYPES = [
  { value: 'GENERAL', label: 'Weight Loss Consultation' },
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
  const { user, isLoaded } = useUser()
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
      timezone: detectUserTimezone(),
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

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <SignedOut>
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In to Book</h2>
                  <p className="text-gray-600 mb-6">
                    Please sign in to book your consultation appointment. This helps us provide personalized care and track your progress.
                  </p>
                </div>
                <div className="space-y-3">
                  <SignInButton mode="modal">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                      Sign In to Book Appointment
                    </button>
                  </SignInButton>
                  <p className="text-sm text-gray-500">
                    New patient? Sign up is quick and free.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SignedOut>

      <SignedIn>
        <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Book Your Consultation
        </CardTitle>
        <p className="text-gray-600">
          Select your preferred time slot for a consultation.
          <span className="block mt-1 text-green-600 text-sm">
            ✓ Signed in as {user?.firstName} {user?.lastName} ({user?.emailAddresses[0]?.emailAddress})
          </span>
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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

          {/* Timezone Selection */}
          <div className="space-y-2">
            <Label htmlFor="timezone" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Your Timezone
            </Label>
            <Select
              onValueChange={(value) => setValue('timezone', value)}
              defaultValue={watch('timezone')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(COMMON_TIMEZONES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              We've detected your timezone as: {getTimezoneDisplayName(detectUserTimezone())}
            </p>
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
              <strong>Please note:</strong> This is a booking request. You'll complete your medical assessment and provide personal details during your consultation. Our team will contact you to confirm your appointment.
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
      </SignedIn>
    </>
  )
}