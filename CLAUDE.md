# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for a weight loss clinic that sells weight loss injections and pills online. The project uses:

- **Next.js 15** with App Router and Turbopack for development
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** components with "new-york" style
- **Aceternity UI** components (https://ui.aceternity.com/components) for enhanced UI elements
- **Lucide React** for icons

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build production version
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture & Structure

### UI Component System
- **shadcn/ui**: Base component library located in `components/ui/`
- **Aceternity UI**: Enhanced components for premium UI elements
- **Component style**: "new-york" variant with zinc base color and CSS variables
- **Utility function**: `cn()` in `lib/utils.ts` for conditional class merging

### Path Aliases
```typescript
"@/*": "./*"
"@/components": "./components"
"@/lib": "./lib" 
"@/utils": "./lib/utils"
"@/ui": "./components/ui"
"@/hooks": "./hooks"
```

### Styling Approach
- Tailwind CSS v4 with CSS variables enabled
- Global styles in `app/globals.css`
- Custom component variants using `class-variance-authority`
- Dark mode support configured

### Reference Designs
The `reference-designs/` folder contains visual references for the weight loss clinic website including:
- Landing page layouts
- Hero section designs for desktop, tablet, and mobile
- Form designs and calculations
- Announcement banners

## Development Guidelines

### Component Creation
1. Use existing shadcn/ui components as base when possible
2. Follow the established component pattern with `cva` for variants
3. Implement Aceternity UI components for premium features
4. Maintain TypeScript strict mode compliance
5. Use the `cn()` utility for conditional styling

### File Organization
- UI components: `components/ui/`
- Utility functions: `lib/`
- App pages: `app/` (App Router structure)
- Public assets: `public/`

### Styling Conventions
- Use Tailwind utility classes
- Implement component variants with `buttonVariants` pattern
- Support both light and dark themes
- Focus on responsive design (mobile-first approach)

## Available UI Components Library

This project includes an extensive collection of UI components from shadcn/ui, Aceternity UI, and Magic UI:

### 🏗️ Layout & Structure
- **`card.tsx`** - Basic card container with variants
- **`layout-grid.tsx`** - Responsive grid layouts
- **`sidebar.tsx`** - Collapsible navigation sidebar with context
- **`sheet.tsx`** - Slide-over panels
- **`resizable.tsx`** - Resizable panel components
- **`separator.tsx`** - Visual dividers

### 📝 Forms & Inputs
- **`form.tsx`** - Form wrapper with validation
- **`input.tsx`** - Text input fields
- **`textarea.tsx`** - Multi-line text input
- **`select.tsx`** - Dropdown selection
- **`checkbox.tsx`** - Checkbox inputs
- **`radio-group.tsx`** - Radio button groups
- **`switch.tsx`** - Toggle switches
- **`slider.tsx`** - Range sliders
- **`input-otp.tsx`** - OTP/PIN input
- **`placeholders-and-vanish-input.tsx`** - Animated placeholder inputs
- **`stateful-button.tsx`** - Buttons with loading/success states

### 🎪 Interactive & Navigation
- **`button.tsx`** - Primary button component
- **`navigation-menu.tsx`** - Main site navigation
- **`dropdown-menu.tsx`** - Contextual menus
- **`menubar.tsx`** - Menu bar navigation
- **`context-menu.tsx`** - Right-click menus
- **`breadcrumb.tsx`** - Navigation breadcrumbs
- **`pagination.tsx`** - Page navigation
- **`tabs.tsx`** - Tabbed content
- **`accordion.tsx`** - Collapsible content sections
- **`collapsible.tsx`** - Expand/collapse content

### 🎨 Visual Effects & Animations
- **`3d-card.tsx`** - Interactive 3D hover cards
- **`animated-testimonials.tsx`** - Smooth testimonial carousel
- **`spotlight.tsx`** - Dramatic lighting effects
- **`background-beams.tsx`** - Animated background elements
- **`flip-words.tsx`** - Text animation effects
- **`wobble-card.tsx`** - Playful card animations
- **`card-hover-effect.tsx`** - Card hover interactions
- **`card-stack.tsx`** - Stacked card layouts
- **`infinite-moving-cards.tsx`** - Continuous scrolling cards
- **`apple-cards-carousel.tsx`** - iOS-style card carousel
- **`container-scroll-animation.tsx`** - Scroll-triggered animations
- **`sticky-scroll-reveal.tsx`** - Sticky scroll reveals
- **`tracing-beam.tsx`** - Animated connecting lines
- **`timeline.tsx`** - Vertical timeline component
- **`svg-mask-effect.tsx`** - Creative masking effects

### 💫 MagicUI Components (`components/magicui/`)
- **`marquee.tsx`** - Infinite scrolling text/content
- **`border-beam.tsx`** - Animated borders
- **`shine-border.tsx`** - Shimmering border effects
- **`magic-card.tsx`** - Cards with magical hover effects
- **`animated-circular-progress-bar.tsx`** - Circular progress indicators
- **`dot-pattern.tsx`** - Background dot patterns
- **`progressive-blur.tsx`** - Gradient blur effects
- **`scroll-progress.tsx`** - Page scroll indicators
- **`text-animate.tsx`** - Text animation utilities
- **`tweet-card.tsx`** - Social media card displays
- **`bento-grid.tsx`** - Modern grid layouts
- **`avatar-circles.tsx`** - Stacked avatar displays
- **`highlighter.tsx`** - Text highlighting effects
- **`pointer.tsx`** - Custom cursor/pointer effects

### 📊 Data Display
- **`table.tsx`** - Data tables
- **`chart.tsx`** - Chart components
- **`avatar.tsx`** - User avatars
- **`badge.tsx`** - Status badges
- **`progress.tsx`** - Progress bars
- **`skeleton.tsx`** - Loading skeletons
- **`scroll-area.tsx`** - Custom scrollable areas

### 🔔 Feedback & Overlays
- **`dialog.tsx`** - Modal dialogs
- **`alert-dialog.tsx`** - Confirmation dialogs
- **`alert.tsx`** - Alert notifications
- **`drawer.tsx`** - Bottom-up drawers
- **`popover.tsx`** - Popover content
- **`hover-card.tsx`** - Hover-triggered cards
- **`tooltip.tsx`** - Helpful tooltips
- **`sonner.tsx`** - Toast notifications

### 🎯 Specialized Components
- **`calendar.tsx`** - Date picker calendar
- **`carousel.tsx`** - Image/content carousels
- **`aspect-ratio.tsx`** - Maintain aspect ratios
- **`toggle.tsx`** - Toggle buttons
- **`toggle-group.tsx`** - Toggle button groups
- **`pointer-highlight.tsx`** - Mouse-following highlights

## Component Usage Guidelines

### For Weight Loss Clinic Website:
- **Hero Sections**: Use `spotlight.tsx`, `background-beams.tsx`, `flip-words.tsx`
- **Testimonials**: Use `animated-testimonials.tsx`, `infinite-moving-cards.tsx`
- **Forms**: Use `form.tsx` + `input.tsx` + `select.tsx` for assessments
- **Progress Tracking**: Use `animated-circular-progress-bar.tsx`, `progress.tsx`
- **Before/After Galleries**: Use `apple-cards-carousel.tsx`, `layout-grid.tsx`
- **Success Stories**: Use `timeline.tsx`, `card-hover-effect.tsx`
- **Pricing**: Use `3d-card.tsx`, `wobble-card.tsx`
- **Navigation**: Use `navigation-menu.tsx`, `sidebar.tsx` for admin

### Best Practices:
1. **Start Simple**: Use basic shadcn/ui components first
2. **Enhance Gradually**: Add Aceternity/Magic UI effects for premium feel
3. **Performance**: Lazy load heavy animation components
4. **Accessibility**: All components include proper ARIA attributes
5. **Mobile-First**: All components are responsive by default