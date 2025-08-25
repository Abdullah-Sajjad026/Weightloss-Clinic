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
    console.log('Received time slot data:', JSON.stringify(body, null, 2))
    
    // Validate the data
    const validatedData = timeSlotSchema.parse(body)
    console.log('Validated time slot data:', JSON.stringify(validatedData, null, 2))
    
    // Check for existing time slot
    const existingSlot = await prisma.timeSlot.findFirst({
      where: {
        dayOfWeek: validatedData.dayOfWeek,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
      }
    })

    if (existingSlot) {
      console.log('Existing time slot found:', existingSlot)
      return NextResponse.json(
        { error: 'Time slot already exists for this day and time' },
        { status: 409 }
      )
    }

    // Create the time slot
    console.log('Creating time slot with data:', validatedData)
    const timeSlot = await prisma.timeSlot.create({
      data: validatedData,
    })
    console.log('Successfully created time slot:', timeSlot)

    return NextResponse.json(timeSlot, { status: 201 })
  } catch (error) {
    console.error('Error creating time slot:', error)
    console.error('Error type:', typeof error)
    console.error('Error name:', error?.constructor?.name)
    
    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      console.error('Zod validation error:', error)
      const zodError = error as any
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: zodError.issues?.map((issue: any) => ({
            field: issue.path.join('.'),
            message: issue.message
          })) || []
        },
        { status: 400 }
      )
    }

    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Prisma error code:', error.code)
      const prismaError = error as any
      console.error('Prisma error message:', prismaError.message)
      return NextResponse.json(
        { 
          error: 'Database error', 
          details: prismaError.message || 'Unknown database error'
        },
        { status: 500 }
      )
    }

    // Generic error
    return NextResponse.json(
      { 
        error: 'Failed to create time slot',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}