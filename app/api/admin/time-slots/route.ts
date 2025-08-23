import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { timeSlotSchema } from '@/lib/validations/time-slot'

export async function GET() {
  try {
    const timeSlots = await prisma.timeSlot.findMany({
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ],
      include: {
        _count: {
          select: { appointments: true }
        }
      }
    })

    return NextResponse.json(timeSlots)
  } catch (error) {
    console.error('Error fetching time slots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch time slots' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validatedData = timeSlotSchema.parse(body)
    
    const existingSlot = await prisma.timeSlot.findFirst({
      where: {
        dayOfWeek: validatedData.dayOfWeek,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
      }
    })

    if (existingSlot) {
      return NextResponse.json(
        { error: 'Time slot already exists for this day and time' },
        { status: 409 }
      )
    }

    const timeSlot = await prisma.timeSlot.create({
      data: validatedData,
    })

    return NextResponse.json(timeSlot, { status: 201 })
  } catch (error) {
    console.error('Error creating time slot:', error)
    
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create time slot' },
      { status: 500 }
    )
  }
}