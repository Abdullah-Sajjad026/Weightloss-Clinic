# Production Deployment Checklist

Use this checklist before deploying to production and before going live to customers.

## Pre-Deployment Setup

### Database (Neon)

- [ ] Neon account created
- [ ] Production database created
- [ ] Database region selected (closest to users)
- [ ] **Pooled connection string** copied (must include `-pooler`)
- [ ] Connection string includes `?sslmode=require`
- [ ] Test connection from local machine
- [ ] Point-in-time restore enabled (default on free tier)

### Vercel Project

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported to Vercel
- [ ] Build command set: `pnpm build`
- [ ] Install command set: `pnpm install`
- [ ] All environment variables added (see below)
- [ ] Environment variables set for Production, Preview, AND Development

### Required Environment Variables

**Database:**
- [ ] `DATABASE_URL` - Neon pooled connection string

**Admin:**
- [ ] `ADMIN_PASSWORD` - Strong password (16+ chars, mixed case, numbers, symbols)

**Stripe (LIVE keys for production!):**
- [ ] `STRIPE_PUBLISHABLE_KEY` - Starts with `pk_live_`
- [ ] `STRIPE_SECRET_KEY` - Starts with `sk_live_`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Same as above
- [ ] `STRIPE_WEBHOOK_SECRET` - Configured after first deploy (see below)

**Email:**
- [ ] `GMAIL_USER` - Production email address
- [ ] `GMAIL_APP_PASSWORD` - Gmail app-specific password
- [ ] `ADMIN_EMAIL` - Admin notification email

**App Configuration:**
- [ ] `NEXT_PUBLIC_APP_URL` - Your production URL (update after deploy)

**Optional:**
- [ ] `GOOGLE_SERVICE_ACCOUNT_KEY` - For Google Calendar integration

---

## Initial Deployment

### Step 1: Create First Migration

- [ ] Run locally: `pnpm db:migrate:dev`
- [ ] Migration name: `init`
- [ ] Migration file created in `prisma/migrations/`
- [ ] Committed to git: `git add prisma/migrations && git commit`

### Step 2: Deploy to Vercel

- [ ] Push to GitHub: `git push origin main`
- [ ] Vercel build triggered automatically
- [ ] Build completed successfully
- [ ] Check build logs for:
  - [ ] ✓ Prisma schema loaded
  - [ ] ✓ Migrations applied
  - [ ] ✓ Time slots created
  - [ ] ✓ Build succeeded

### Step 3: Configure Stripe Webhook

- [ ] Copy production URL from Vercel
- [ ] Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
- [ ] Click "Add endpoint"
- [ ] Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
- [ ] Select events:
  - [ ] `checkout.session.completed`
  - [ ] `checkout.session.expired`
  - [ ] `payment_intent.succeeded`
  - [ ] `payment_intent.payment_failed`
- [ ] Copy webhook signing secret (starts with `whsec_`)
- [ ] Add to Vercel env vars: `STRIPE_WEBHOOK_SECRET`
- [ ] Redeploy to apply new env var

### Step 4: Update App URL

- [ ] Copy actual Vercel URL: `https://your-project.vercel.app`
- [ ] Update `NEXT_PUBLIC_APP_URL` in Vercel env vars
- [ ] Redeploy

---

## Post-Deployment Verification

### Database Verification

- [ ] Login to [Neon Console](https://console.neon.tech)
- [ ] Open SQL Editor
- [ ] Run: `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
- [ ] Verify all tables exist:
  - [ ] `time_slots`
  - [ ] `appointments`
  - [ ] `risk_assessments`
  - [ ] `orders`
  - [ ] `order_items`
  - [ ] `order_status_history`
- [ ] Run: `SELECT COUNT(*) FROM time_slots;`
- [ ] Should return ~500+ time slots

### Application Verification

**Admin Panel:**
- [ ] Visit: `https://your-domain.vercel.app/admin`
- [ ] Enter `ADMIN_PASSWORD`
- [ ] Successfully logged in
- [ ] Dashboard loads
- [ ] All menu items accessible

**Appointment Booking:**
- [ ] Visit: `https://your-domain.vercel.app/book-appointment`
- [ ] Select consultation type
- [ ] Pick a date
- [ ] Time slots appear
- [ ] Can select a time
- [ ] Form validation works
- [ ] Can submit (test with your email)
- [ ] Confirmation email received

**Risk Assessment:**
- [ ] Visit: `https://your-domain.vercel.app/risk-assessment`
- [ ] Can fill out form
- [ ] Progress bar updates
- [ ] Can navigate between steps
- [ ] Can submit
- [ ] Submission appears in admin panel

**E-commerce:**
- [ ] Visit product pages:
  - [ ] `/injections`
  - [ ] `/pills`
  - [ ] `/surgery`
- [ ] Can add items to cart
- [ ] Cart updates correctly
- [ ] Can proceed to checkout
- [ ] Redirected to Stripe (don't complete payment yet!)

### Stripe Test Payment (Test Mode)

**First, switch to test mode:**
- [ ] Temporarily change env vars to test keys (`pk_test_`, `sk_test_`)
- [ ] Redeploy
- [ ] Add item to cart → Checkout
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Complete payment
- [ ] Redirected to success page
- [ ] Order appears in admin panel
- [ ] Order status is correct
- [ ] Email received

**Then switch back to live mode:**
- [ ] Change env vars back to live keys (`pk_live_`, `sk_live_`)
- [ ] Redeploy

### Email Notifications

- [ ] Test appointment booking → Email received
- [ ] Test order placement → Emails received (customer + admin)
- [ ] Check spam folder if not in inbox
- [ ] Verify email content is correct
- [ ] Links in emails work

---

## Security Audit

### Environment Variables

- [ ] No `.env` files committed to git
- [ ] `.env.example` and `.env.*.example` files are safe (no real credentials)
- [ ] All production secrets are strong and unique
- [ ] `ADMIN_PASSWORD` is strong (16+ characters)
- [ ] Stripe LIVE keys are used (not test keys)

### Database

- [ ] Using **pooled** connection string (has `-pooler` in hostname)
- [ ] Connection string has `?sslmode=require`
- [ ] No database credentials in code
- [ ] Prisma migrations applied (not `db push`)

### API Routes

- [ ] Stripe webhook validates signatures
- [ ] Admin routes protected with password
- [ ] No sensitive data logged to console
- [ ] Error messages don't leak sensitive info

### Stripe

- [ ] Webhook secret configured
- [ ] Using LIVE keys for production
- [ ] Using TEST keys for preview deployments
- [ ] Webhook endpoint is HTTPS
- [ ] Payment amounts validated server-side

---

## Optional: Custom Domain

- [ ] Domain purchased (e.g., `northamptonweightloss.com`)
- [ ] Added to Vercel: Settings → Domains
- [ ] DNS records configured:
  - [ ] Type: `CNAME`
  - [ ] Name: `www`
  - [ ] Value: `cname.vercel-dns.com`
- [ ] SSL certificate issued (automatic, wait ~2 minutes)
- [ ] Site accessible via custom domain
- [ ] Update `NEXT_PUBLIC_APP_URL` to custom domain
- [ ] Update Stripe webhook URL to custom domain
- [ ] Redeploy

---

## Monitoring Setup

### Free Monitoring (Included)

- [ ] Vercel Analytics enabled (Settings → Analytics)
- [ ] Neon monitoring dashboard reviewed
- [ ] Set up usage alerts in Neon:
  - [ ] Storage at 80% (0.4 GB)
  - [ ] Compute hours at 80% (153 hours)

### Optional Paid Monitoring

- [ ] Sentry for error tracking
- [ ] LogRocket for session replay
- [ ] Datadog for infrastructure monitoring

---

## Performance Optimization

### Vercel

- [ ] Image optimization enabled (default)
- [ ] Caching headers configured
- [ ] Edge functions for API routes (if needed)

### Database

- [ ] Pooled connection used (prevents "too many connections")
- [ ] Indexes on frequently queried fields (already in schema)
- [ ] Connection pooling limits reasonable

### Lighthouse Audit

- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

---

## Legal & Compliance

- [ ] Privacy policy page created
- [ ] Terms of service page created
- [ ] Cookie consent implemented (if needed)
- [ ] GDPR compliance reviewed (if EU users)
- [ ] Medical disclaimer visible
- [ ] Contact information accurate

---

## Go-Live Checklist

### Final Checks Before Launch

- [ ] All tests passed
- [ ] All features working
- [ ] All emails sending correctly
- [ ] Stripe payments working (tested in test mode)
- [ ] Admin can access all functions
- [ ] Mobile responsive design verified
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Backup strategy in place (Neon auto-backups active)

### Launch Day

- [ ] Switch Stripe to LIVE mode (already done above)
- [ ] Monitor Vercel logs for errors
- [ ] Monitor Neon dashboard for database issues
- [ ] Test with a real order (small amount)
- [ ] Verify order completes successfully
- [ ] Check all notifications sent

### Post-Launch (First 24 Hours)

- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Verify email deliverability
- [ ] Test payment flow multiple times
- [ ] Monitor Stripe dashboard for successful payments
- [ ] Check resource usage (Vercel bandwidth, Neon storage)

### Post-Launch (First Week)

- [ ] Review analytics
- [ ] Check user feedback
- [ ] Monitor free tier usage:
  - [ ] Vercel: Bandwidth, Build time
  - [ ] Neon: Storage, Compute hours
- [ ] Optimize any slow queries
- [ ] Address any bug reports

---

## Rollback Plan

If something goes wrong:

### Quick Fixes

**Bad deployment:**
```bash
# Revert to previous deployment in Vercel dashboard
# Settings → Deployments → [Previous] → Promote to Production
```

**Database issue:**
```bash
# Neon has automatic backups (24 hours on free tier)
# Dashboard → Restore → Select restore point
```

**Environment variable issue:**
```bash
# Vercel → Settings → Environment Variables
# Edit incorrect variable
# Redeploy
```

### Emergency Contacts

- [ ] Vercel Support: [vercel.com/support](https://vercel.com/support)
- [ ] Neon Support: [neon.tech/docs](https://neon.tech/docs)
- [ ] Stripe Support: [stripe.com/support](https://stripe.com/support)

---

## Success Criteria

You can consider the deployment successful when:

- ✅ All items in this checklist are completed
- ✅ Application is accessible at production URL
- ✅ All features work as expected
- ✅ Test payment completed successfully
- ✅ Emails are being delivered
- ✅ Admin panel is accessible
- ✅ No errors in Vercel logs
- ✅ Database queries are fast (<100ms)
- ✅ Mobile layout works correctly
- ✅ Stripe webhooks are receiving events

---

## Notes

**Date of deployment:** _______________

**Deployed by:** _______________

**Production URL:** _______________

**Database:** _______________

**Any issues encountered:**

_______________________________________________

_______________________________________________

_______________________________________________

**Resolution:**

_______________________________________________

_______________________________________________

_______________________________________________
