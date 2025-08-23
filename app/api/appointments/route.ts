import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { appointmentSchema } from '@/lib/validations/appointment'
import { sendAppointmentBookingEmails } from '@/lib/email'
import { createMeetingForAppointment } from '@/lib/video-meeting-service'
import { isValidTimezone } from '@/lib/timezone-utils'

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        timeSlot: {
          select: {
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            duration: true,
          }
        }
      }
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📝 Appointment request received:', JSON.stringify(body, null, 2))
    
    const validatedData = appointmentSchema.parse(body)
    console.log('✅ Validation passed:', JSON.stringify(validatedData, null, 2))
    
    // Verify time slot exists and is active
    console.log('🔍 Looking for time slot:', validatedData.timeSlotId)
    const timeSlot = await prisma.timeSlot.findUnique({
      where: { 
        id: validatedData.timeSlotId,
      }
    })
    console.log('⏰ TimeSlot found:', timeSlot)

    if (!timeSlot) {
      console.error('❌ Time slot not found:', validatedData.timeSlotId)
      return NextResponse.json(
        { error: 'Time slot not found' },
        { status: 404 }
      )
    }

    if (!timeSlot.isActive) {
      return NextResponse.json(
        { error: 'Time slot is not available' },
        { status: 400 }
      )
    }

    // Check if the preferred date matches the time slot's day of week
    const preferredDate = new Date(validatedData.preferredDate + 'T12:00:00') // Add time to avoid timezone issues
    const dayOfWeek = preferredDate.getDay() === 0 ? 7 : preferredDate.getDay() // Convert Sunday from 0 to 7
    
    console.log('📅 Date validation:', {
      preferredDate: validatedData.preferredDate,
      parsedDate: preferredDate,
      dayOfWeek,
      expectedDayOfWeek: timeSlot.dayOfWeek
    })
    
    if (dayOfWeek !== timeSlot.dayOfWeek) {
      console.error('❌ Day of week mismatch:', { dayOfWeek, expected: timeSlot.dayOfWeek })
      return NextResponse.json(
        { error: 'Selected date does not match the time slot day' },
        { status: 400 }
      )
    }

    // Check for existing appointment on the same date and time slot
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        timeSlotId: validatedData.timeSlotId,
        preferredDate: preferredDate,
        status: {
          not: 'CANCELLED'
        }
      }
    })

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'This time slot is already booked for the selected date' },
        { status: 409 }
      )
    }

    // Validate timezone if provided
    let patientTimezone = validatedData.timezone || 'Europe/London'
    if (!isValidTimezone(patientTimezone)) {
      patientTimezone = 'Europe/London'
    }

    // Create video meeting link for the appointment  
    console.log('🎥 Creating video meeting link...')
    const meetingDetails = await createMeetingForAppointment({
      id: 'temp-id', // We'll get the actual ID after creation
      name: validatedData.name,
      email: validatedData.email,
      consultationType: validatedData.consultationType,
      preferredDate: preferredDate,
    })
    console.log('✅ Meeting details created:', meetingDetails)

    console.log('💾 Creating appointment in database...')
    const appointment = await prisma.appointment.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        consultationType: validatedData.consultationType,
        timeSlotId: validatedData.timeSlotId,
        preferredDate: preferredDate,
        timezone: patientTimezone,
        notes: validatedData.notes,
        // Video meeting details
        meetingLink: meetingDetails.meetingLink,
        meetingId: meetingDetails.meetingId,
      },
      include: {
        timeSlot: {
          select: {
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            duration: true,
          }
        }
      }
    })
    console.log('✅ Appointment created:', appointment.id)

    // Send email notifications
    try {
      await sendAppointmentBookingEmails(appointment)
      console.log('Email notifications sent for appointment:', appointment.id)
    } catch (emailError) {
      console.error('Failed to send email notifications:', emailError)
      // Don't fail the appointment creation if email fails
    }

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('❌ Error creating appointment:', error)
    console.error('❌ Error stack:', error.stack)
    console.error('❌ Error details:', JSON.stringify(error, null, 2))
    
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      )
    }

    // Check for Prisma errors
    if (error.code) {
      console.error('❌ Prisma error code:', error.code)
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create appointment', details: error.message },
      { status: 500 }
    )
  }
}