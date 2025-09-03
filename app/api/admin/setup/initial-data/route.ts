import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Time slot generation function
function generateSlotsForDay(dayOfWeek: number, startHour: number, endHour: number) {
  const slots = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const currentHour = hour;
      const currentMinute = minute;
      const nextMinute = minute + 30;
      const nextHour = nextMinute >= 60 ? hour + 1 : hour;
      
      const startTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      const endTime = `${nextHour.toString().padStart(2, '0')}:${(nextMinute % 60).toString().padStart(2, '0')}`;
      
      // Skip if end time exceeds operating hours
      if (nextHour > endHour || (nextHour === endHour && nextMinute % 60 > 0)) {
        continue;
      }
      
      slots.push({
        dayOfWeek,
        startTime,
        endTime,
        duration: 30,
        isActive: true
      });
    }
  }
  
  return slots;
}

export async function POST() {
  try {
    console.log('🔍 Checking existing time slots...');
    
    // Check if time slots already exist
    const existingSlots = await prisma.timeSlot.count();
    
    if (existingSlots > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Time slots already exist (${existingSlots} found)`,
          existing: existingSlots
        },
        { status: 200 }
      );
    }

    console.log('🚀 Creating initial time slots...');

    const timeSlots = [];

    // Generate slots for Mon-Sat (8AM-9PM) 
    for (let day = 1; day <= 6; day++) {
      timeSlots.push(...generateSlotsForDay(day, 8, 21));
    }

    // Generate slots for Sunday (10AM-2PM)
    timeSlots.push(...generateSlotsForDay(7, 10, 14));

    console.log(`📅 Creating ${timeSlots.length} time slots...`);

    // Create all slots in batch
    const result = await prisma.timeSlot.createMany({
      data: timeSlots,
      skipDuplicates: true
    });

    console.log('✅ Time slots created successfully!');

    return NextResponse.json({
      success: true,
      message: 'Time slots created successfully',
      created: result.count,
      schedule: {
        'Mon-Sat': '8:00AM-9:00PM',
        'Sunday': '10:00AM-2:00PM',
        'Bank holidays': '10:00AM-4:00PM (toggle in admin)'
      }
    });

  } catch (error) {
    console.error('❌ Error setting up time slots:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create time slots',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}