# Getting Started with Deployment

## 📖 Where to Start

This project is now ready for production deployment on Vercel with Neon DB (both free tier).

### Choose Your Guide

**New to deployment? Start here:**
👉 **[VERCEL_SETUP.md](VERCEL_SETUP.md)** - Step-by-step 15-minute deployment guide

**Need detailed information?**
📚 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Comprehensive deployment documentation

**Working with the database?**
🗄️ **[DATABASE.md](DATABASE.md)** - Database management and migrations

**Ready to deploy?**
✅ **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** - Pre-deployment checklist

---

## 🚀 Quick Summary

Your project uses proper database migrations now:

### What Changed

**Before:**
- ❌ Using `prisma db push` (not production-safe)
- ❌ No migration history
- ❌ SQLite in dev, unclear prod setup

**After:**
- ✅ Proper Prisma migrations with history
- ✅ SQLite for development, PostgreSQL for production
- ✅ Automated migration deployment on Vercel
- ✅ Proper seeding with idempotent scripts
- ✅ Environment variable templates

### New Files Created

```
├── .env.local.example         # Development environment template
├── .env.production.example    # Production environment template
├── docs/
│   ├── GETTING_STARTED.md         # This file
│   ├── VERCEL_SETUP.md           # Quick deployment guide (START HERE!)
│   ├── DEPLOYMENT.md              # Detailed deployment docs
│   ├── DATABASE.md                # Database management guide
│   └── PRODUCTION_CHECKLIST.md    # Pre-deployment checklist
├── prisma/
│   ├── migrations/           # Migration history (create with db:migrate:dev)
│   └── seed.ts              # Optional seed data
└── package.json              # Updated scripts
```

### Updated Files

- `package.json` - New database scripts
- `.gitignore` - Ignores `.env` but allows examples
- `scripts/setup-initial-data.js` - Better error handling
- `README.md` - Complete project documentation

---

## 🎯 Next Steps

### 1. Create Initial Migration (5 min)

Before deploying, create your first migration:

```bash
# This captures your current schema as the "init" migration
pnpm db:migrate:dev
# When prompted, enter: init
```

This creates `prisma/migrations/[timestamp]_init/migration.sql`

### 2. Commit Migration (1 min)

```bash
git add prisma/migrations .env.local.example .env.production.example
git add docs/ README.md package.json .gitignore scripts/
git commit -m "feat: set up production-ready database migrations and deployment docs"
git push origin main
```

### 3. Deploy to Vercel (10 min)

Follow **[VERCEL_SETUP.md](VERCEL_SETUP.md)** for step-by-step instructions:

1. Create Neon database
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### 4. Verify Deployment (5 min)

Use **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** to verify everything works.

---

## 📋 Key Commands

### Development

```bash
pnpm dev                    # Start dev server
pnpm db:studio              # Open database GUI
```

### Database Changes

```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration:
pnpm db:migrate:dev

# 3. Commit and push:
git add prisma/migrations prisma/schema.prisma
git commit -m "feat: your change description"
git push origin main

# 4. Vercel auto-deploys and applies migration
```

### Troubleshooting

```bash
pnpm db:migrate:status      # Check migration status
pnpm db:generate            # Regenerate Prisma Client
pnpm setup:data             # Seed time slots
```

---

## 🔑 Environment Variables Needed

You'll need these for Vercel (get from respective services):

**Required:**
- `DATABASE_URL` - From Neon (must be pooled connection)
- `ADMIN_PASSWORD` - Your choice (strong password!)
- Stripe keys - From [dashboard.stripe.com](https://dashboard.stripe.com)
- Gmail credentials - From [Google Account](https://myaccount.google.com/security)

**Optional:**
- `GOOGLE_SERVICE_ACCOUNT_KEY` - For Google Calendar integration

See [.env.production.example](../.env.production.example) for details.

---

## 💡 Understanding Migrations

### Why Migrations?

**Before (db push):**
- No history of changes
- Can't rollback
- Dangerous in production
- Team members out of sync

**After (migrations):**
- Full history in `prisma/migrations/`
- Reviewable SQL
- Safe production deployments
- Team collaboration
- Automatic on Vercel

### Migration Workflow

```
┌─────────────────────────────────────────────┐
│ 1. Edit prisma/schema.prisma locally        │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ 2. Run: pnpm db:migrate:dev                 │
│    Creates migration file + applies it      │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ 3. Commit migration to git                  │
│    git add prisma/migrations                │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ 4. Push to GitHub                           │
│    git push origin main                     │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ 5. Vercel auto-deploys                      │
│    - Runs: prisma migrate deploy            │
│    - Runs: prisma generate                  │
│    - Runs: next build                       │
│    - Runs: npm run setup:data               │
└─────────────────────────────────────────────┘
```

See [DATABASE.md](DATABASE.md) for detailed migration strategies.

---

## 🆘 Help & Support

**Can't find something?**

- Deployment issues → [VERCEL_SETUP.md](VERCEL_SETUP.md)
- Database questions → [DATABASE.md](DATABASE.md)
- Troubleshooting → [DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting)
- Development → [README.md](../README.md)

**External Resources:**

- [Vercel Docs](https://vercel.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] Created initial migration (`pnpm db:migrate:dev`)
- [ ] Committed migrations to git
- [ ] Read [VERCEL_SETUP.md](VERCEL_SETUP.md)
- [ ] Have Neon account ready
- [ ] Have Vercel account ready
- [ ] Have Stripe account ready (test keys for now)
- [ ] Have Gmail app password ready
- [ ] Reviewed [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)

---

## 🎉 You're Ready!

Everything is set up for a smooth production deployment:

1. ✅ Proper migration system
2. ✅ Production-safe build process
3. ✅ Idempotent data seeding
4. ✅ Comprehensive documentation
5. ✅ Environment variable templates
6. ✅ Pre-deployment checklist

**Next step:** Open [VERCEL_SETUP.md](VERCEL_SETUP.md) and follow the guide!

---

## 📝 Notes

- Your local dev database (SQLite) won't be affected
- Production uses PostgreSQL (Neon)
- Migrations apply to both environments
- Free tier is sufficient for starting out
- You can upgrade later when needed

**Questions? Check the docs above or raise an issue.**

Good luck with your deployment! 🚀
