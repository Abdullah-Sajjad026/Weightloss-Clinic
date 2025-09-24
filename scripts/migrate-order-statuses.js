#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateOrderStatuses() {
  console.log('🔄 Starting order status migration...');

  try {
    // Get all orders with deprecated statuses
    const ordersToMigrate = await prisma.order.findMany({
      where: {
        OR: [
          { status: 'PAYMENT_PENDING' },
          { status: 'PAID' },
          { status: 'PAYMENT_FAILED' },
          { status: 'MEDICAL_REVIEW' },
          { status: 'APPROVED' },
          { status: 'REJECTED' },
          { status: 'REFUNDED' }
        ]
      },
      include: {
        orderStatusHistory: true
      }
    });

    console.log(`📊 Found ${ordersToMigrate.length} orders to migrate`);

    if (ordersToMigrate.length === 0) {
      console.log('✅ No orders need migration');
      return;
    }

    // Status mapping logic
    const statusMapping = {
      'PAYMENT_PENDING': 'PENDING',
      'PAID': 'PENDING', // Will rely on paymentStatus being COMPLETED
      'PAYMENT_FAILED': 'CANCELLED',
      'MEDICAL_REVIEW': 'PENDING', // Will rely on medicalReviewStatus
      'APPROVED': 'PROCESSING', // Medical review approved, ready for processing
      'REJECTED': 'CANCELLED', // Medical review rejected
      'REFUNDED': 'CANCELLED' // Will rely on paymentStatus being REFUNDED
    };

    let migratedCount = 0;
    let errorCount = 0;

    // Migrate each order
    for (const order of ordersToMigrate) {
      try {
        const oldStatus = order.status;
        const newStatus = statusMapping[oldStatus];

        console.log(`🔧 Migrating order ${order.orderNumber}: ${oldStatus} → ${newStatus}`);

        await prisma.$transaction(async (tx) => {
          // Update the order status
          await tx.order.update({
            where: { id: order.id },
            data: { status: newStatus }
          });

          // Add a status history entry to record the migration
          await tx.orderStatusHistory.create({
            data: {
              orderId: order.id,
              status: newStatus,
              notes: `Status migrated from ${oldStatus} to ${newStatus} during system upgrade`,
              updatedBy: 'System Migration'
            }
          });

          // Update any status history entries with deprecated statuses
          await tx.orderStatusHistory.updateMany({
            where: {
              orderId: order.id,
              status: oldStatus
            },
            data: {
              status: newStatus
            }
          });
        });

        migratedCount++;
        
      } catch (error) {
        console.error(`❌ Error migrating order ${order.orderNumber}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n📈 Migration Summary:`);
    console.log(`   ✅ Successfully migrated: ${migratedCount} orders`);
    console.log(`   ❌ Failed migrations: ${errorCount} orders`);
    
    if (errorCount === 0) {
      console.log('\n🎉 Migration completed successfully!');
    } else {
      console.log('\n⚠️  Migration completed with some errors. Please check the logs above.');
    }

  } catch (error) {
    console.error('💥 Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateOrderStatuses()
  .catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
  });