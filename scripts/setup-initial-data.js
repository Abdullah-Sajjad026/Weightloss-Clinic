// Post-deployment setup script
// This runs after build to ensure initial data exists

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Time slot generation function
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

async function setupInitialTimeSlots() {
  try {
    console.log('🔍 Checking existing time slots...');
    
    // Check if time slots already exist
    const existingSlots = await prisma.timeSlot.count();
    
    if (existingSlots > 0) {
      console.log(`✅ Time slots already exist (${existingSlots} found). Skipping creation.`);
      return;
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
    await prisma.timeSlot.createMany({
      data: timeSlots,
      skipDuplicates: true
    });

    console.log('✅ Time slots created successfully!');
    console.log(`📊 Schedule: Mon-Sat 8AM-9PM, Sun 10AM-2PM (${timeSlots.length} total slots)`);

  } catch (error) {
    console.error('❌ Error setting up time slots:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting initial data setup...\n');

    // Check database connection
    await prisma.$connect();
    console.log('✅ Database connection established\n');

    // Run setup tasks
    await setupInitialTimeSlots();

    console.log('\n✅ All setup tasks completed successfully!');
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);

    // Provide helpful error messages
    if (error.code === 'P1001') {
      console.error('\n🔍 Cannot reach database server.');
      console.error('💡 Check your DATABASE_URL environment variable.');
    } else if (error.code === 'P1003') {
      console.error('\n🔍 Database does not exist.');
      console.error('💡 Run migrations first: pnpm db:migrate:deploy');
    }

    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('\n👋 Disconnected from database');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { setupInitialTimeSlots };