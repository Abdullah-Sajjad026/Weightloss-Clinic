# Northampton Weight Loss Clinic

A modern Next.js 15 application for a weight loss clinic that sells weight loss injections and pills online, with integrated appointment booking, risk assessments, and e-commerce functionality.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Database Setup

```bash
# Create and apply migrations
pnpm db:migrate:dev

# Open Prisma Studio (database GUI)
pnpm db:studio
```

## 📚 Documentation

- **[docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - Start here! Overview and next steps
- **[docs/VERCEL_SETUP.md](./docs/VERCEL_SETUP.md)** - Quick 15-minute deployment guide
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Comprehensive production deployment guide
- **[docs/DATABASE.md](./docs/DATABASE.md)** - Database management and migration workflows
- **[docs/PRODUCTION_CHECKLIST.md](./docs/PRODUCTION_CHECKLIST.md)** - Pre-deployment checklist
- **[CLAUDE.md](./CLAUDE.md)** - Development guidelines and architecture

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router & Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Aceternity UI
- **Database**: Prisma ORM (SQLite dev, PostgreSQL prod)
- **Payments**: Stripe
- **Auth**: Admin password-based
- **Email**: Nodemailer (Gmail SMTP)
- **Calendar**: Google Calendar API

## 📦 Project Structure

```
├── app/                    # Next.js app router
│   ├── (public)/          # Public-facing pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── magicui/          # Magic UI components
├── docs/                  # 📚 Deployment documentation
│   ├── README.md          # Documentation index
│   ├── GETTING_STARTED.md # Start here for deployment
│   ├── VERCEL_SETUP.md    # Quick deployment guide
│   ├── DEPLOYMENT.md      # Comprehensive deployment docs
│   ├── DATABASE.md        # Database management guide
│   └── PRODUCTION_CHECKLIST.md # Pre-launch checklist
├── lib/                   # Utilities and helpers
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Migration history
│   └── seed.ts          # Development seed data
├── scripts/              # Setup and utility scripts
└── public/               # Static assets
```

## 🗄️ Database Management

### Development Workflow

```bash
# Make schema changes in prisma/schema.prisma
# Then create a migration:
pnpm db:migrate:dev

# Generate Prisma Client after schema changes:
pnpm db:generate

# View/edit data in GUI:
pnpm db:studio
```

### Production Migrations

Migrations are automatically applied during Vercel builds:

1. Edit `prisma/schema.prisma`
2. Run `pnpm db:migrate:dev` locally
3. Commit and push to GitHub
4. Vercel deploys and applies migrations

See [docs/DATABASE.md](./docs/DATABASE.md) for detailed migration strategies.

## 🚢 Deployment

### Quick Deploy to Vercel + Neon DB (Free Tier)

Follow the [docs/VERCEL_SETUP.md](./docs/VERCEL_SETUP.md) guide for step-by-step instructions.

**Summary:**
1. Create Neon PostgreSQL database
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

### Environment Variables

Required for production:

```bash
DATABASE_URL              # Neon PostgreSQL connection string
ADMIN_PASSWORD           # Admin panel password
STRIPE_PUBLISHABLE_KEY   # Stripe public key
STRIPE_SECRET_KEY        # Stripe secret key
STRIPE_WEBHOOK_SECRET    # Stripe webhook signing secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_URL      # Your domain
GMAIL_USER               # Gmail for notifications
GMAIL_APP_PASSWORD       # Gmail app password
ADMIN_EMAIL              # Admin email address
GOOGLE_SERVICE_ACCOUNT_KEY  # Google Calendar credentials (optional)
```

See [.env.production.example](./.env.production.example) for full details.

## 📋 Available Scripts

```bash
# Development
pnpm dev                 # Start dev server with Turbopack
pnpm build               # Production build
pnpm start               # Start production server
pnpm lint                # Run ESLint

# Database
pnpm db:migrate:dev      # Create and apply migration (dev)
pnpm db:migrate:deploy   # Apply migrations (production)
pnpm db:migrate:status   # Check migration status
pnpm db:generate         # Generate Prisma Client
pnpm db:studio           # Open Prisma Studio GUI

# Deployment
pnpm vercel:build        # Custom Vercel build command
pnpm setup:data          # Seed initial data (time slots)
```

## 🔑 Key Features

- **Weight Loss Products**: Injections, pills, and bariatric surgery info
- **Appointment Booking**: Google Calendar-integrated scheduling
- **Risk Assessment**: Medical questionnaires before purchase
- **E-commerce**: Stripe checkout with order management
- **Admin Dashboard**: Order processing, appointments, assessments
- **Email Notifications**: Automated customer and admin emails
- **Responsive Design**: Mobile-first UI with modern components

## 🧪 Testing Payments

Use Stripe test mode credentials and test cards:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

## 📊 Database Schema

See [prisma/schema.prisma](./prisma/schema.prisma) for complete schema.

**Main Models:**
- `TimeSlot` - Appointment availability
- `Appointment` - Customer bookings
- `RiskAssessment` - Medical questionnaires
- `Order` - E-commerce orders
- `OrderItem` - Order line items
- `OrderStatusHistory` - Order status tracking

## 🔐 Security Notes

**Production Checklist:**
- [ ] Use strong `ADMIN_PASSWORD`
- [ ] Use LIVE Stripe keys (not test)
- [ ] Enable Stripe webhook signature verification
- [ ] Use pooled database connection on Vercel
- [ ] Don't commit `.env` files (use `.env.example`)
- [ ] Validate user inputs (already implemented)
- [ ] Review Prisma migrations before deploying

## 🐛 Troubleshooting

### Common Issues

**Build fails: "Can't reach database"**
- Check `DATABASE_URL` is set in Vercel
- Ensure connection string has `?sslmode=require`
- Use pooled connection (with `-pooler` in hostname)

**Migration fails: "Table already exists"**
- Normal if transitioning from `db push` to migrations
- Check migration status: `pnpm db:migrate:status`

**Time slots not showing**
- Run seeding script: `pnpm setup:data`
- Check database has `time_slots` table

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md#troubleshooting) for more solutions.

## 📈 Scaling Considerations

### Free Tier Limits

**Vercel Free:**
- 100 GB bandwidth/month
- 100 hours build time/month
- Unlimited deployments

**Neon Free:**
- 0.5 GB storage
- 191.9 hours compute/month
- Auto-suspend after 5 min inactivity

**When to upgrade:**
- Storage > 0.4 GB → Neon Launch ($19/mo)
- Bandwidth > 80 GB → Vercel Pro ($20/mo)
- Need always-on database → Neon Launch ($19/mo)

## 🤝 Contributing

This is a private client project. For internal development:

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test locally
3. Create migration if schema changed: `pnpm db:migrate:dev`
4. Commit: `git commit -m "feat: add new feature"`
5. Push and create PR: `git push origin feature/new-feature`

## 📝 License

Proprietary - All rights reserved by Northampton Weight Loss Clinic

## 🆘 Support

For deployment issues, see:
- [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) - Start here
- [docs/VERCEL_SETUP.md](./docs/VERCEL_SETUP.md) - Quick setup guide
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Detailed deployment docs
- [docs/DATABASE.md](./docs/DATABASE.md) - Database troubleshooting

For development help:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)

---

Built with ❤️ using Next.js 15, Prisma, and Stripe
