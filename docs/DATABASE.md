# Database Management Guide

## Overview

This project uses:
- **ORM**: Prisma
- **Development DB**: SQLite (local file-based)
- **Production DB**: PostgreSQL (Neon)
- **Migration Tool**: Prisma Migrate

## Quick Commands

```bash
# Development
pnpm db:migrate:dev       # Create and apply new migration
pnpm db:generate          # Regenerate Prisma Client after schema changes
pnpm db:studio            # Open Prisma Studio (GUI for database)

# Production (automated by Vercel)
pnpm db:migrate:deploy    # Apply pending migrations
pnpm db:migrate:status    # Check migration status
```

## Development Workflow

### 1. Making Schema Changes

Edit `prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  // Add new field
  phone     String?  // ? makes it optional
  createdAt DateTime @default(now())
}
```

### 2. Create Migration

```bash
pnpm db:migrate:dev
```

You'll be prompted:
```
? Enter a name for the new migration: › add_phone_to_user
```

**Migration Naming Convention**:
- Use snake_case
- Be descriptive and concise
- Examples:
  - `init` - Initial schema
  - `add_user_model` - New model
  - `add_phone_field` - New field
  - `update_order_status_enum` - Enum change
  - `rename_customer_to_user` - Rename

### 3. Review Generated SQL

Check `prisma/migrations/[timestamp]_add_phone_to_user/migration.sql`:

```sql
-- AlterTable
ALTER TABLE "User" ADD COLUMN "phone" TEXT;
```

**Verify**:
- ✅ SQL looks correct
- ✅ No data loss on required fields
- ✅ Indexes are appropriate
- ✅ Enums are updated properly

### 4. Test Locally

```bash
# Migration already applied by migrate dev
# Test your changes
pnpm dev

# Check database with GUI
pnpm db:studio
```

### 5. Commit and Push

```bash
git add prisma/schema.prisma prisma/migrations
git commit -m "feat: add phone field to User model"
git push origin main
```

Vercel will automatically:
1. Run `prisma migrate deploy` (applies migration)
2. Run `prisma generate` (updates Prisma Client)
3. Build and deploy

## Migration Strategies

### Adding a Required Field

**Problem**: Existing rows will fail without a value

**Solution**: Add field as optional first, then make required

```prisma
// Step 1: Add optional field
model User {
  phone String? // Optional
}
```

```bash
pnpm db:migrate:dev -- --name add_phone_optional
```

```prisma
// Step 2: Provide default or backfill data
// Then make required
model User {
  phone String @default("000-000-0000") // or remove default after backfill
}
```

```bash
pnpm db:migrate:dev -- --name make_phone_required
```

### Renaming a Field

Prisma can't detect renames, it sees as delete + add (DATA LOSS!)

**Safe Approach**:

```prisma
// Step 1: Add new field
model User {
  customerName String? // Old: name
  name         String? // New name
}
```

```bash
pnpm db:migrate:dev -- --name add_name_field
```

Then write a data migration script:

```typescript
// scripts/migrate-customer-name.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.updateMany({
    data: { name: { set: prisma.user.fields.customerName } }
  })
}

main()
```

```bash
# Run migration script
tsx scripts/migrate-customer-name.ts
```

```prisma
// Step 2: Remove old field
model User {
  name String // Only new field remains
}
```

```bash
pnpm db:migrate:dev -- --name remove_customer_name
```

### Changing Field Type

**Example**: Change `age: Int` to `age: String`

**Problem**: Data loss or conversion errors

**Safe Approach**:

1. Add new field with new type
2. Copy/transform data
3. Remove old field
4. Rename new field to old name (if needed)

### Dropping a Column

**Warning**: This permanently deletes data!

```prisma
// Remove field from schema
model User {
  id    String
  // name String // REMOVED
  email String
}
```

```bash
pnpm db:migrate:dev -- --name remove_name_field
```

**Before applying**: Backup data if needed!

```bash
# Export data first
pnpm db:studio
# or
pg_dump $DATABASE_URL > backup.sql
```

## Advanced: Data Migrations

Sometimes you need to transform data, not just schema.

### Create Custom Migration

```bash
# Create empty migration
pnpm db:migrate:dev --create-only -- --name custom_data_transform

# This creates: prisma/migrations/[timestamp]_custom_data_transform/migration.sql
```

Edit the SQL file:

```sql
-- Update all users with NULL phone to default value
UPDATE "User"
SET phone = '000-000-0000'
WHERE phone IS NULL;

-- Make field required
ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;
```

Apply:

```bash
pnpm db:migrate:dev
```

## Schema Best Practices

### Use Enums for Fixed Values

```prisma
enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model Order {
  status OrderStatus @default(PENDING)
}
```

**Benefits**:
- Type safety
- Prevents invalid values
- Auto-completion in code

### Index Frequently Queried Fields

```prisma
model User {
  email String @unique // Automatic index

  @@index([createdAt]) // Explicit index
  @@index([status, createdAt]) // Composite index
}
```

**When to index**:
- Fields in `WHERE` clauses
- Fields in `ORDER BY`
- Foreign keys (automatic)
- Unique constraints (automatic)

**Don't over-index**: Each index slows down writes

### Use Relations Properly

```prisma
model Order {
  id     String      @id
  items  OrderItem[] // One-to-many
}

model OrderItem {
  id      String @id
  order   Order  @relation(fields: [orderId], references: [id])
  orderId String // Foreign key
}
```

### Default Values

```prisma
model Order {
  createdAt DateTime @default(now())
  status    OrderStatus @default(PENDING)
  total     Float @default(0)
}
```

## Troubleshooting

### "Migration already applied"

This is usually safe - just means migration ran before.

```bash
# Check status
pnpm db:migrate:status
```

### "Migration failed: constraint violation"

Common causes:
- Adding required field to table with existing rows
- Adding unique constraint on field with duplicates

**Fix**: Use two-step migration (add optional → backfill → make required)

### "Drift detected"

Schema and database don't match.

```bash
# See what's different
pnpm db:migrate:status

# Reset database (DEV ONLY!)
pnpm prisma migrate reset
```

### "Can't reach database"

Check:
- `.env` file has correct `DATABASE_URL`
- Database is running (for PostgreSQL)
- Connection string format is correct

### "Prisma Client out of sync"

After schema changes:

```bash
pnpm db:generate
```

## Production Considerations

### Never Use `prisma db push` in Production

`db push` is for prototyping only:
- ❌ No migration history
- ❌ Can lose data
- ❌ Can't rollback
- ❌ No review of changes

Always use `prisma migrate`:
- ✅ Full migration history
- ✅ Safe, reviewable SQL
- ✅ Rollback possible
- ✅ Team collaboration

### Testing Migrations

Before deploying to production:

1. **Test locally** with real-ish data
2. **Test on staging/preview** deployment
3. **Backup production** database before applying
4. **Monitor** after deployment

### Rollback Strategy

Prisma Migrate doesn't have built-in rollback, but you can:

1. **Create reverse migration** manually
2. **Restore from backup** (Neon has automatic backups)
3. **Fix forward** (write migration to fix issue)

**Example reverse migration**:

```sql
-- Original: add_phone_field
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

-- Reverse: remove_phone_field
ALTER TABLE "User" DROP COLUMN "phone";
```

## Migration History

Your migration history is in `prisma/migrations/`:

```
prisma/migrations/
├── 20250109_init/
│   └── migration.sql
├── 20250115_add_phone_field/
│   └── migration.sql
├── 20250120_add_user_preferences/
│   └── migration.sql
└── migration_lock.toml
```

**Never**:
- Delete old migrations
- Edit applied migrations
- Manually edit `migration_lock.toml`

**Always**:
- Keep migrations in git
- Apply migrations in order
- Review SQL before committing

## Resources

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Studio](https://www.prisma.io/studio)
