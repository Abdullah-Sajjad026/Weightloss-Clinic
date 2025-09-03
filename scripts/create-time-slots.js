// Script to create appointment time slots
// Run with: node scripts/create-time-slots.js

const timeSlots = [];

// Helper function to generate time slots for a day
function generateSlotsForDay(dayOfWeek, startHour, endHour) {
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

// Generate slots for Mon-Sat (8AM-9PM)
for (let day = 1; day <= 6; day++) {
  timeSlots.push(...generateSlotsForDay(day, 8, 21)); // 8AM to 9PM
}

// Generate slots for Sunday (10AM-2PM)  
timeSlots.push(...generateSlotsForDay(7, 10, 14)); // 10AM to 2PM

console.log('Time slots to create:', timeSlots.length);
console.log('Sample slots:');
console.log(timeSlots.slice(0, 5));

// API calls to create slots
async function createTimeSlots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  for (const slot of timeSlots) {
    try {
      const response = await fetch(`${baseUrl}/api/admin/time-slots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slot),
      });
      
      if (response.ok) {
        console.log(`✓ Created slot: Day ${slot.dayOfWeek} ${slot.startTime}-${slot.endTime}`);
      } else {
        const error = await response.json();
        console.log(`✗ Failed slot: Day ${slot.dayOfWeek} ${slot.startTime}-${slot.endTime} - ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating slot:', error);
    }
  }
}

// Run slot creation
createTimeSlots();

module.exports = { timeSlots, generateSlotsForDay };