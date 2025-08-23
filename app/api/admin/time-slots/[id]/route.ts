import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { timeSlotSchema } from '@/lib/validations/time-slot'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const timeSlot = await prisma.timeSlot.findUnique({
      where: { id },
      include: {
        appointments: {
          select: {
            id: true,
            name: true,
            email: true,
            preferredDate: true,
            status: true,
          }
        }
      }
    })

    if (!timeSlot) {
      return NextResponse.json(
        { error: 'Time slot not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(timeSlot)
  } catch (error) {
    console.error('Error fetching time slot:', error)
    return NextResponse.json(
      { error: 'Failed to fetch time slot' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const validatedData = timeSlotSchema.parse(body)
    
    const existingSlot = await prisma.timeSlot.findFirst({
      where: {
        id: { not: id },
        dayOfWeek: validatedData.dayOfWeek,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
      }
    })

    if (existingSlot) {
      return NextResponse.json(
        { error: 'Another time slot already exists for this day and time' },
        { status: 409 }
      )
    }

    const timeSlot = await prisma.timeSlot.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json(timeSlot)
  } catch (error) {
    console.error('Error updating time slot:', error)
    
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update time slot' },
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
    
    const appointmentCount = await prisma.appointment.count({
      where: { timeSlotId: id }
    })

    if (appointmentCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete time slot with existing appointments' },
        { status: 409 }
      )
    }

    await prisma.timeSlot.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Time slot deleted successfully' })
  } catch (error) {
    console.error('Error deleting time slot:', error)
    return NextResponse.json(
      { error: 'Failed to delete time slot' },
      { status: 500 }
    )
  }
}