import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: [
        { status: 'asc' },
        { preferredDate: 'asc' },
        { createdAt: 'desc' }
      ],
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