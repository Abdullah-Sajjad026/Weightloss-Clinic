# Theme Setup & Component System Development Log

## Overview
Established the foundational theme system, component libraries, and styling architecture for the Northampton Weight Loss Clinic website.

## Architecture Decisions

### Design System
- **Primary Colors**: Purple gradient theme (primary-600, primary-700, etc.)
- **Base Framework**: Tailwind CSS v4 with CSS variables
- **Component Library**: shadcn/ui with "new-york" style variant  
- **Enhanced UI**: Aceternity UI components for premium effects
- **Icons**: Lucide React for consistent iconography

### CSS Variables System
Implemented comprehensive CSS variable system in `app/globals.css`:

```css
:root {
  --color-primary-600: oklch(0.48 0.2 299.59);
  --color-primary-700: oklch(0.39 0.15 299.95);
  /* ... extended color palette */
}
```

**Key Features**:
- OKLCH color space for better color consistency
- Support for light/dark themes
- Extended primary color range (50-950)
- Secondary and tertiary color palettes
- Custom radius, shadow, and spacing variables

## Component Library Setup

### shadcn/ui Components Available:
**Layout & Structure**: card, sidebar, sheet, resizable, separator
**Forms & Inputs**: form, input, textarea, select, checkbox, radio-group, switch, slider
**Interactive**: button, navigation-menu, dropdown-menu, tabs, accordion
**Data Display**: table, avatar, badge, progress, skeleton, scroll-area
**Feedback**: dialog, alert-dialog, alert, drawer, popover, tooltip

### Aceternity UI Integration:
**Visual Effects**: 3d-card, spotlight, background-beams, flip-words, wobble-card
**Animations**: animated-testimonials, infinite-moving-cards, apple-cards-carousel
**Advanced**: sticky-scroll-reveal, tracing-beam, timeline, svg-mask-effect

### MagicUI Components:
**Motion**: marquee, border-beam, shine-border, magic-card
**Progress**: animated-circular-progress-bar, scroll-progress  
**Layout**: bento-grid, progressive-blur, dot-pattern
**Social**: tweet-card, avatar-circles

## Animation System

### Custom Keyframes (in globals.css):
```css
@keyframes slide-in-from-bottom { /* Smooth entry animations */ }
@keyframes marquee { /* Infinite scrolling effects */ }  
@keyframes spotlight { /* Dramatic lighting effects */ }
@keyframes accordion-down/up { /* Collapsible content */ }
```

### Animation Classes:
- `animate-slide-in-from-bottom` - Used in testimonials and chat interfaces
- `animate-marquee` - Infinite scrolling for logos and testimonials
- `animate-spotlight` - Hero section dramatic effects
- Responsive motion controls with `prefers-reduced-motion`

## Utility Systems

### Path Aliases (tsconfig.json):
```json
{
  "@/*": "./*",
  "@/components": "./components", 
  "@/lib": "./lib",
  "@/ui": "./components/ui"
}
```

### Utility Functions:
**`lib/utils.ts`**: Core utility functions
- `cn()` - Conditional class name merging using clsx + tailwind-merge
- Essential for component variants and conditional styling

**`components/ui/`**: Base component implementations
- Consistent API across all UI components
- TypeScript interfaces for type safety
- Customizable via className props

## Development Workflow

### Component Creation Pattern:
1. Use existing shadcn/ui base components when possible
2. Enhance with Aceternity/Magic UI for premium features  
3. Apply consistent styling with utility classes
4. Implement proper TypeScript interfaces
5. Support both light/dark themes
6. Mobile-first responsive design

### Styling Conventions:
- Utility-first approach with Tailwind CSS
- Component variants using `class-variance-authority`
- CSS variables for theme consistency
- Ring utilities for consistent borders/focus states
- Smooth transitions for interactive elements

## File Structure

```
├── app/
│   ├── globals.css          # Theme variables & animations
│   └── layout.tsx           # Root layout with theme provider
├── components/
│   ├── ui/                  # shadcn/ui base components
│   ├── magicui/            # MagicUI enhanced components  
│   └── [custom]/           # Project-specific components
├── lib/
│   └── utils.ts            # Utility functions (cn, etc.)
└── CLAUDE.md               # Project documentation & guidelines
```

## Key Features Implemented

### Responsive Design:
- Mobile-first breakpoint system
- Consistent spacing using Tailwind utilities
- Flexible grid and flexbox layouts
- Proper image optimization with Next.js

### Accessibility:
- ARIA attributes in all interactive components
- Semantic HTML structure
- Keyboard navigation support
- Screen reader optimization
- Color contrast compliance

### Performance:
- CSS variable-based theming (no runtime calculations)
- Lazy loading for heavy animation components
- Optimized bundle splitting
- Efficient re-renders with proper React patterns

## Integration Guidelines

### For Weight Loss Clinic Website:
- **Hero Sections**: spotlight, background-beams, flip-words
- **Testimonials**: animated-testimonials, infinite-moving-cards
- **Forms**: form + input + select for assessments
- **Progress**: animated-circular-progress-bar, progress
- **Galleries**: apple-cards-carousel, layout-grid
- **Success Stories**: timeline, card-hover-effect
- **Pricing**: 3d-card, wobble-card
- **Navigation**: navigation-menu, sidebar for admin

### Best Practices:
1. Start with basic shadcn/ui components
2. Add Aceternity/Magic UI for premium feel
3. Performance: lazy load heavy animations
4. Accessibility: proper ARIA attributes included by default
5. Mobile-first: all components responsive by default

## Future Considerations

### Planned Enhancements:
- Dark mode toggle implementation
- Advanced form validation patterns
- Custom chart components for analytics
- Enhanced loading states and skeleton screens
- A/B testing component variants

### Scalability:
- Component documentation with Storybook (future)
- Design token system expansion
- Custom Tailwind plugin development
- Performance monitoring integration

## Dependencies Added

```json
{
  "tailwindcss": "^4.0.0",
  "class-variance-authority": "latest", 
  "clsx": "latest",
  "tailwind-merge": "latest",
  "lucide-react": "latest",
  "@radix-ui/*": "various", // for shadcn/ui base
  "framer-motion": "latest"  // for enhanced animations
}
```

This foundational setup provides a robust, scalable, and maintainable design system that supports the entire Northampton Weight Loss Clinic website development.