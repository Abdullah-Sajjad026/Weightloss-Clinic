import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { appointmentSchema } from '@/lib/validations/appointment'
import { sendAppointmentBookingEmails } from '@/lib/email'

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
    
    const validatedData = appointmentSchema.parse(body)
    
    // Verify time slot exists and is active
    const timeSlot = await prisma.timeSlot.findUnique({
      where: { 
        id: validatedData.timeSlotId,
      }
    })

    if (!timeSlot) {
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
    const preferredDate = new Date(validatedData.preferredDate)
    const dayOfWeek = preferredDate.getDay() === 0 ? 7 : preferredDate.getDay() // Convert Sunday from 0 to 7
    
    if (dayOfWeek !== timeSlot.dayOfWeek) {
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

    const appointment = await prisma.appointment.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        consultationType: validatedData.consultationType,
        timeSlotId: validatedData.timeSlotId,
        preferredDate: preferredDate,
        notes: validatedData.notes,
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
    console.error('Error creating appointment:', error)
    
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}