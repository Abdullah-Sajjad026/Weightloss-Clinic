# Deployment Guide - Vercel + Neon DB

This guide covers deploying the Northampton Clinic application to Vercel with Neon PostgreSQL database.

## Prerequisites

- [Vercel Account](https://vercel.com) (Free tier)
- [Neon Account](https://neon.tech) (Free tier)
- GitHub repository connected to Vercel

## Step 1: Set Up Neon Database

1. **Create Neon Project**
   - Go to [console.neon.tech](https://console.neon.tech)
   - Click "Create Project"
   - Name: `northampton-clinic-prod`
   - Region: Choose closest to your users (e.g., `AWS US East (N. Virginia)`)
   - PostgreSQL Version: Latest stable (16+)

2. **Get Connection String**
   - In your Neon project dashboard, click "Connection Details"
   - Copy the connection string (pooled connection recommended for Vercel)
   - Format: `postgresql://[user]:[password]@[host]/[database]?sslmode=require`
   - **Save this securely** - you'll need it for Vercel

3. **Database Limits on Free Tier**
   - Storage: 0.5 GB
   - Compute: 191.9 hours/month (shared)
   - Branches: 10
   - Projects: Unlimited
   - Auto-suspend after 5 minutes of inactivity

## Step 2: Configure Vercel Project

### 2.1 Import Project
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build` (or use custom: `pnpm vercel:build`)
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`

### 2.2 Environment Variables

Add these environment variables in Vercel Project Settings → Environment Variables:

#### Database
```bash
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

#### Gmail SMTP (for notifications)
```bash
GMAIL_USER=your-production-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

#### Admin Authentication
```bash
ADMIN_PASSWORD=your-secure-production-password
```

#### Stripe Configuration (PRODUCTION KEYS!)
```bash
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### Google Service Account (for calendar)
```bash
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

**Important**:
- Set all variables for **Production**, **Preview**, and **Development** environments
- Use LIVE Stripe keys for production, TEST keys for preview/development
- The `NEXT_PUBLIC_*` variables are exposed to the browser

## Step 3: Initial Deployment

### 3.1 Create Initial Migration (Local)

Before deploying, create your first migration locally:

```bash
# Create initial migration from current schema
pnpm db:migrate:dev

# When prompted, name it: "init"
```

This creates `prisma/migrations/[timestamp]_init/migration.sql`

### 3.2 Commit and Push

```bash
git add prisma/migrations
git commit -m "feat: add initial database migration"
git push origin main
```

### 3.3 Deploy to Vercel

Vercel will automatically:
1. Detect the push to `main`
2. Run `pnpm install`
3. Run `pnpm build` which includes:
   - `prisma generate` - Generate Prisma Client
   - `prisma migrate deploy` - Apply migrations to production DB
   - `next build` - Build Next.js app
   - `npm run setup:data` - Seed initial time slots

### 3.4 Verify Deployment

1. Check build logs in Vercel dashboard
2. Look for migration messages:
   ```
   ✓ Prisma schema loaded from prisma/schema.prisma
   ✓ Applied migrations:
     └─ 20250109_init
   ```
3. Verify your app is live at `https://your-project.vercel.app`

## Step 4: Database Management Workflow

### Making Schema Changes

When you need to change your database schema:

```bash
# 1. Update prisma/schema.prisma locally
# Example: Add a new field to a model

# 2. Create migration
pnpm db:migrate:dev
# Name it descriptively: "add_user_preferences" or "update_order_status"

# 3. Test locally
pnpm dev

# 4. Commit and push
git add prisma/migrations prisma/schema.prisma
git commit -m "feat: add user preferences to schema"
git push origin main

# 5. Vercel auto-deploys and applies migration
```

### Migration Best Practices

#### ✅ DO:
- Create descriptive migration names
- Test migrations locally first
- Keep migrations small and focused
- Review generated SQL before committing
- Use `prisma migrate deploy` in production (never `db push`)

#### ❌ DON'T:
- Use `prisma db push` in production (it's for prototyping only)
- Edit migration files after they're committed
- Delete old migrations
- Run migrations manually on production DB

### Checking Migration Status

```bash
# Locally
pnpm db:migrate:status

# On Vercel (via dashboard logs or CLI)
vercel logs --output
```

## Step 5: Monitoring & Maintenance

### Neon Database Monitoring

1. **Dashboard Metrics**
   - Go to Neon Console → Your Project → Monitoring
   - Watch: Active time, Storage usage, Connection count

2. **Free Tier Limits**
   - Storage: 0.5 GB (monitor in dashboard)
   - Compute: ~192 hours/month
   - Auto-suspend: DB sleeps after 5 min inactivity (cold starts ~200-500ms)

3. **Connection Pooling**
   - Always use pooled connection string on Vercel
   - Format: `@[host]-pooler.region.aws.neon.tech`
   - Prevents "too many connections" errors

### Vercel Monitoring

1. **Analytics** (available on all tiers)
   - Dashboard → Analytics
   - Track: Page views, Web Vitals, User location

2. **Logs** (limited on Free tier)
   - Dashboard → Deployments → [Your Deployment] → Logs
   - Runtime logs available for recent deployments

### Common Issues

#### "Too Many Database Connections"
**Solution**: Use pooled connection string
```bash
# ✅ Pooled (recommended)
postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db

# ❌ Direct (avoid on serverless)
postgresql://user:pass@ep-xxx.region.aws.neon.tech/db
```

#### "Migration Failed: Already Applied"
**Solution**: This is usually safe - migration was already applied
```bash
# Check status
pnpm db:migrate:status
```

#### "Cold Start Delays"
**Solution**: This is normal on Neon free tier
- First request after inactivity: ~300-500ms delay
- Subsequent requests: Normal speed
- Upgrade to paid tier for always-on database

## Step 6: Backup Strategy

### Automatic Backups (Neon)
- Free tier: Point-in-time restore (24 hours)
- Paid tier: 7-30 days retention

### Manual Backup
```bash
# Export schema + data
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### Database Branching (Neon Feature)
```bash
# Create branch for testing
neonctl branches create --name testing

# Get branch connection string
neonctl connection-string testing

# Delete branch after testing
neonctl branches delete testing
```

## Step 7: Production Checklist

Before going live:

- [ ] All environment variables set in Vercel
- [ ] Using LIVE Stripe keys (not test keys)
- [ ] Database connection string is pooled
- [ ] Migrations applied successfully
- [ ] Initial data seeded (time slots)
- [ ] Admin password is secure
- [ ] Gmail SMTP configured and tested
- [ ] Google Calendar integration working
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Error tracking set up (optional: Sentry)

## Step 8: Custom Domain (Optional)

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `www.yourdomain.com`
3. Configure DNS:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
4. Wait for SSL certificate (automatic, ~1-2 minutes)

## Troubleshooting

### Build Fails: "Prisma Client Not Generated"
Add to `package.json`:
```json
"postinstall": "prisma generate"
```

### Runtime Error: "Can't reach database"
- Check `DATABASE_URL` in Vercel env vars
- Verify connection string includes `?sslmode=require`
- Use pooled connection string

### Migration Fails: "Table Already Exists"
You probably used `db push` before. Solution:
```bash
# Mark existing migrations as applied (one-time fix)
prisma migrate resolve --applied [migration_name]
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Prisma Migrate Guide](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## Cost Scaling (When You Outgrow Free Tier)

### Neon Pricing
- **Free**: $0/month (0.5 GB, 191.9h compute)
- **Launch**: $19/month (10 GB, always-on, 7-day backups)
- **Scale**: $69/month (50 GB, dedicated compute)

### Vercel Pricing
- **Hobby**: $0/month (100 GB bandwidth, 100h build time)
- **Pro**: $20/month (1 TB bandwidth, 400h build time)
- **Enterprise**: Custom (SLA, support, compliance)

**Recommendation**: Start with both free tiers, monitor usage, upgrade Neon first when you hit DB limits.
