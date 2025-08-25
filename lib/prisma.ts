import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Get the absolute database path
function getDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    // If DATABASE_URL is relative, make it absolute
    if (process.env.DATABASE_URL.startsWith('file:./')) {
      const relativePath = process.env.DATABASE_URL.slice(7) // Remove 'file:./'
      const absolutePath = path.resolve(process.cwd(), relativePath)
      return `file:${absolutePath}`
    }
    return process.env.DATABASE_URL
  }
  
  // Fallback to default location
  const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db')
  return `file:${dbPath}`
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl()
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma