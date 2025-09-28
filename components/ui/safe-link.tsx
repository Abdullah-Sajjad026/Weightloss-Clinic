import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Define all valid internal routes
const VALID_ROUTES = {
  // Public pages
  home: "/",
  about: "/about",
  assessment: "/assessment",
  assessmentThankYou: "/assessment/thank-you",
  bookAppointment: "/book-appointment",
  cart: "/cart",
  checkout: "/checkout",
  checkoutConfirmation: "/checkout/confirmation",
  checkoutSuccess: "/checkout/success",
  contact: "/contact",
  delivery: "/delivery",
  bmiCalculator: "/bmi-calculator",
  ordersTrack: "/orders/track",
  terms: "/terms",
  privacy: "/privacy",
  unsubscribe: "/unsubscribe",
  
  // Product pages
  injections: "/injections",
  mounjaro: "/injections/mounjaro",
  wegovy: "/injections/wegovy",
  
  // Admin pages
  admin: "/admin",
  adminLogin: "/admin/login",
  adminAppointments: "/admin/appointments",
  adminOrders: "/admin/orders",
  adminRiskAssessments: "/admin/risk-assessments",
  adminTimeSlots: "/admin/time-slots",
  adminAssessmentConfig: "/admin/assessment-config",
} as const;

type ValidRoute = keyof typeof VALID_ROUTES | (string & {});
type ExternalLink = `http${"s" | ""}://${string}` | `mailto:${string}` | `tel:${string}`;

interface SafeLinkProps {
  href: ValidRoute | ExternalLink;
  children: ReactNode;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "link";
}

/**
 * SafeLink component that provides type-safe navigation with validation
 * 
 * Features:
 * - Type-safe route validation
 * - Automatic external link detection
 * - Built-in styling variants
 * - Development-time warnings for invalid routes
 * 
 * @example
 * // Internal navigation
 * <SafeLink href="/assessment">Start Assessment</SafeLink>
 * 
 * // Named route (type-safe)
 * <SafeLink href={VALID_ROUTES.bookAppointment}>Book Now</SafeLink>
 * 
 * // External link
 * <SafeLink href="https://example.com">External Site</SafeLink>
 * 
 * // Email/phone
 * <SafeLink href="mailto:hello@example.com">Contact</SafeLink>
 */
export function SafeLink({ 
  href, 
  children, 
  className, 
  target,
  rel,
  onClick,
  variant = "link"
}: SafeLinkProps) {
  // Check if this is an external link
  const isExternal = typeof href === "string" && (
    href.startsWith("http") || 
    href.startsWith("mailto:") || 
    href.startsWith("tel:")
  );
  
  // Validate internal routes in development
  if (process.env.NODE_ENV === "development" && !isExternal) {
    const validRouteValues = Object.values(VALID_ROUTES);
    const isDynamicRoute = href.includes("[") || href.includes("/admin/orders/") || href.includes("/admin/risk-assessments/");
    
    if (!validRouteValues.includes(href as any) && !isDynamicRoute) {
      console.warn(`SafeLink: Potentially invalid route "${href}". Consider adding it to VALID_ROUTES.`);
    }
  }
  
  // Style variants
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-md font-medium transition-colors",
    ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md transition-colors",
    link: "text-primary-600 hover:text-primary-700 hover:underline transition-colors"
  };
  
  const linkClassName = cn(
    "inline-flex items-center",
    variants[variant],
    className
  );
  
  // External links
  if (isExternal) {
    return (
      <a
        href={href}
        className={linkClassName}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  // Internal links
  return (
    <Link
      href={href}
      className={linkClassName}
      target={target}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

// Export valid routes for type-safe usage
export { VALID_ROUTES };

// Helper function to check if a route exists
export function isValidRoute(route: string): boolean {
  const validRouteValues = Object.values(VALID_ROUTES);
  const isDynamicRoute = route.includes("[") || route.includes("/admin/orders/") || route.includes("/admin/risk-assessments/");
  
  return validRouteValues.includes(route as any) || isDynamicRoute;
}

// Helper to get route suggestions for typos
export function getSimilarRoutes(invalidRoute: string): string[] {
  const validRouteValues = Object.values(VALID_ROUTES);
  return validRouteValues.filter(route => 
    route.toLowerCase().includes(invalidRoute.toLowerCase()) ||
    invalidRoute.toLowerCase().includes(route.toLowerCase())
  );
}