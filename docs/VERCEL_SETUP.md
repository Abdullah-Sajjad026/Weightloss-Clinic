# Quick Setup Guide: Vercel + Supabase (Free Tier)

## 🚀 Deploy in 15 Minutes

This guide walks you through deploying to production on Vercel's free tier with Supabase PostgreSQL.

## Prerequisites

- ✅ GitHub account with this repository
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ Supabase account (sign up at [supabase.com](https://supabase.com))

---

## Part 1: Create Supabase Database (5 min)

### Step 1: Sign Up for Supabase

1. Go to [supabase.com](https://supabase.com)
2. Click "**Start your project**" → Choose GitHub/Google/Email
3. Verify your email if needed

### Step 2: Create Database Project

1. Click "**New Project**"
2. Fill in:
   - **Organization**: Create or select one
   - **Name**: `northampton-clinic-prod`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: US East (N. Virginia) or closest to you
   - **Pricing Plan**: Free
3. Click "**Create new project**"
4. Wait ~2 minutes for database to provision

### Step 3: Get Connection Strings

1. Go to **Project Settings** (gear icon) → **Database**
2. Scroll to "**Connection string**" section
3. Select "**Connection pooling**" tab (Session mode)
4. Copy **both** connection strings:

**Transaction Pooler (for DATABASE_URL):**
```
postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Session Pooler (for DIRECT_URL):**
```
postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

5. **Save both safely** - you'll need them for Vercel

**Example connection strings:**
```bash
# Transaction mode (for queries) - Add ?pgbouncer=true
DATABASE_URL="postgresql://postgres.abcdefghijk:mypassword@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Session mode (for migrations)
DIRECT_URL="postgresql://postgres.abcdefghijk:mypassword@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

### Step 4: Optional - Disable Unused Features

Since you're only using the database with Prisma:

1. Go to **Settings** → **API**
2. Toggle **OFF**: "Enable PostgREST" (optional, saves resources)
3. You can ignore Auth, Storage, Realtime features

✅ **Supabase setup complete!**

---

## Part 2: Deploy to Vercel (10 min)

### Step 1: Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "**Import Git Repository**"
3. Find your `northampton-clinic` repository
4. Click "**Import**"

### Step 2: Configure Build Settings

**On the import screen:**

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `./` |
| Build Command | `pnpm build` |
| Output Directory | `.next` (default) |
| Install Command | `pnpm install` |

**Don't deploy yet!** Click "**Environment Variables**" first.

### Step 3: Add Environment Variables

Click "Add" for each variable below. Set all three environments (Production, Preview, Development).

#### 🔐 Required Variables

**Database:**
```bash
DATABASE_URL
```
Paste your **Transaction Pooler** connection string from Part 1, Step 3.
(Must include `?pgbouncer=true`)

```bash
DIRECT_URL
```
Paste your **Session Pooler** connection string from Part 1, Step 3.
(Required for Prisma migrations to work)

**Admin Password:**
```bash
ADMIN_PASSWORD
```
Choose a strong password (e.g., `MySecurePass123!`)

**App URL:**
```bash
NEXT_PUBLIC_APP_URL
```
For now, use: `https://your-project-name.vercel.app`
(You'll update this after deployment with your actual URL)

**Stripe (Get these from [dashboard.stripe.com](https://dashboard.stripe.com)):**

For testing (Preview/Development), use **test keys**:
```bash
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
```

For production, use **live keys**:
```bash
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
```

**Email (Gmail SMTP):**
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

To get Gmail App Password:
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Search "App passwords"
4. Generate password for "Mail"
5. Copy the 16-character password

**Google Calendar (Optional):**
```bash
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

<details>
<summary>📋 Click to see all required environment variables</summary>

```bash
# Database
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres

# Admin
ADMIN_PASSWORD=YourSecurePassword123!

# App
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_or_live_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_or_live_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_or_live_YOUR_KEY

# Email
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@yourdomain.com

# Google Calendar (optional)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

</details>

### Step 4: Deploy!

1. Click "**Deploy**"
2. Wait 3-5 minutes for build to complete
3. Watch the build logs - you should see:
   ```
   ✓ Prisma schema loaded
   ✓ Migrations applied
   ✓ Time slots created
   ✓ Build succeeded
   ```

### Step 5: Update App URL

1. After deployment, Vercel shows your live URL: `https://your-project.vercel.app`
2. Go to **Settings** → **Environment Variables**
3. Find `NEXT_PUBLIC_APP_URL`
4. Edit and update to your actual URL
5. **Redeploy** for changes to take effect

✅ **Your app is live!**

---

## Part 3: Create Your First Migration

Before making any schema changes, create the initial migration:

### Step 1: Clone Repository Locally

```bash
git clone https://github.com/yourusername/northampton-clinic.git
cd northampton-clinic
pnpm install
```

### Step 2: Set Up Local Environment

Create `.env`:
```bash
DATABASE_URL="file:./prisma/dev.db"
# ... copy other variables from .env.example
```

### Step 3: Create Initial Migration

```bash
# This creates the migration from your current schema
pnpm db:migrate:dev
```

When prompted, enter: `init`

This creates:
```
prisma/migrations/
└── 20250109123456_init/
    └── migration.sql
```

### Step 4: Commit and Push

```bash
git add prisma/migrations
git commit -m "feat: add initial database migration"
git push origin main
```

Vercel will auto-deploy. Check logs - migration should show as applied.

✅ **Migration system ready!**

---

## Part 4: Verify Everything Works

### Check Database

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click your project → **SQL Editor**
3. Click "New query" and run:
   ```sql
   SELECT tablename FROM pg_tables WHERE schemaname = 'public';
   ```
4. You should see: `time_slots`, `appointments`, `orders`, etc.

### Check Admin Panel

1. Visit `https://your-project.vercel.app/admin`
2. Enter your `ADMIN_PASSWORD`
3. You should see the dashboard

### Check Time Slots

1. Go to `https://your-project.vercel.app/book-appointment`
2. Select a date
3. You should see available time slots

---

## Part 5: Set Up Stripe Webhook (Important!)

### Step 1: Install Stripe CLI (Optional, for testing)

```bash
brew install stripe/stripe-cli/stripe
stripe login
```

### Step 2: Create Production Webhook

1. Go to [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Click "**Add endpoint**"
3. URL: `https://your-project.vercel.app/api/webhooks/stripe`
4. Events to send:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "**Add endpoint**"
6. Copy the "**Signing secret**" (starts with `whsec_`)
7. Add to Vercel env vars:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
   ```
8. Redeploy

✅ **Stripe payments ready!**

---

## Common Issues & Fixes

### Build Fails: "Can't reach database"

**Cause**: `DATABASE_URL` not set or incorrect

**Fix**:
1. Go to Vercel → Settings → Environment Variables
2. Check `DATABASE_URL` is the transaction pooler connection string
3. Should include `pooler.supabase.com:6543` and end with `?pgbouncer=true`
4. Check `DIRECT_URL` is set (session pooler on port 5432)

### Migration Error: "Table already exists"

**Cause**: Used `db push` before migrations

**Fix**: This is normal on first deploy, ignore if build succeeds

### Time Slots Not Showing

**Cause**: Seeding script didn't run

**Fix**:
```bash
# Manually run on Vercel
vercel env pull
pnpm setup:data
```

### "Too Many Connections"

**Cause**: Not using connection pooling

**Fix**: Ensure you're using the pooler connection string (port 6543 with `?pgbouncer=true`)

---

## Free Tier Limits

### Supabase Free Tier

| Resource | Limit |
|----------|-------|
| Storage (Database) | 0.5 GB |
| Compute | Unlimited (always-on) |
| Projects | 2 active projects |
| Auto-pause | After 1 week of inactivity |
| Bandwidth | 5 GB/month |

**What happens when limits hit:**
- Storage: Database becomes read-only
- Projects: Must upgrade to create more than 2
- Inactivity: Database pauses (manual unpause in dashboard)
- **Recommendation**: Monitor in Supabase dashboard

### Vercel Free Tier

| Resource | Limit |
|----------|-------|
| Bandwidth | 100 GB/month |
| Build Time | 100 hours/month |
| Serverless Executions | 100 GB-hours |
| Deployments | Unlimited |

**What happens when limits hit:**
- Site stays online
- New deployments pause
- **Recommendation**: Upgrade to Pro ($20/month) if needed

---

## Next Steps

✅ Your app is deployed and running!

**Recommended actions:**

1. **Set up custom domain** (optional)
   - Vercel → Settings → Domains
   - Add `www.yourdomain.com`
   - Update DNS records

2. **Enable monitoring**
   - Vercel Analytics (free)
   - Sentry for error tracking (optional)

3. **Test payments**
   - Use Stripe test mode
   - Test card: `4242 4242 4242 4242`

4. **Schedule regular backups**
   - Supabase free tier: Daily automatic backups
   - Consider manual exports: `pg_dump` for critical data

5. **Set up staging environment** (requires 2nd Supabase project)
   - Create second Supabase project for staging
   - Deploy to Vercel preview environment

---

## Support

**Documentation:**
- [Full Deployment Guide](./DEPLOYMENT.md)
- [Database Management](./DATABASE.md)

**Issues:**
- Vercel: [vercel.com/support](https://vercel.com/support)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Stripe: [stripe.com/support](https://stripe.com/support)

**Community:**
- [Vercel Discord](https://discord.gg/vercel)
- [Prisma Slack](https://slack.prisma.io)

---

## Checklist

Before launching to customers:

- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] Time slots created (check `/book-appointment`)
- [ ] Admin panel accessible
- [ ] Stripe webhook configured
- [ ] Test order placement
- [ ] Test email notifications
- [ ] Using LIVE Stripe keys (not test)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic)

**Ready to go live? 🚀**
