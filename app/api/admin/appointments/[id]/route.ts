import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as z from 'zod'

const updateAppointmentSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']),
  notes: z.string().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const validatedData = updateAppointmentSchema.parse(body)

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: validatedData.status,
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

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error updating appointment:', error)
    
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.appointment.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    )
  }
}