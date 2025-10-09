// Prisma seed file for optional data seeding
// Run with: pnpm prisma db seed

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Add any optional seed data here
  // Example: Test users, demo data, etc.

  // Note: Essential data (time slots) is handled by setup-initial-data.js
  // This file is for development/testing seed data only

  console.log('✅ Seeding completed')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
