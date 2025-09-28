// Example usage of SafeLink component
import { SafeLink, VALID_ROUTES } from "@/components/ui/safe-link";

export function SafeLinkExamples() {
  return (
    <div className="space-y-4">
      {/* Type-safe internal navigation */}
      <SafeLink href={VALID_ROUTES.assessment} variant="primary">
        Start Assessment
      </SafeLink>

      {/* String-based internal navigation */}
      <SafeLink href="/book-appointment" variant="secondary">
        Book Appointment
      </SafeLink>

      {/* External website */}
      <SafeLink href="https://example.com">
        External Site
      </SafeLink>

      {/* Email link */}
      <SafeLink href="mailto:hello@northamptonclinic.co.uk">
        Contact Us
      </SafeLink>

      {/* Phone link */}
      <SafeLink href="tel:01604250734">
        Call Now
      </SafeLink>

      {/* Custom styling */}
      <SafeLink 
        href="/injections" 
        className="text-blue-600 font-bold hover:text-blue-800"
        variant="link"
      >
        Browse Injections
      </SafeLink>

      {/* Invalid route (will show warning in development) */}
      <SafeLink href="/invalid-route">
        This will warn in dev mode
      </SafeLink>
    </div>
  );
}