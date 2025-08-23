import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ],
      select: {
        id: true,
        dayOfWeek: true,
        startTime: true,
        endTime: true,
        duration: true,
        isActive: true,
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