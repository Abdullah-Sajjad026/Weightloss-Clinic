import HeroSection from "./components/hero-section";
import { WhyChooseSection } from "./components/why-choose-section";
import YourJourneySection from "./components/your-journey-section";
import WeightlossExpertsSection from "./components/weightloss-experts-section";
import PublicPresenceSection from "./components/public-presence-section";
import SupportSection from "./components/support-section";
import CLinicComparisonSection from "./components/clinic-comparison-section";
import TestimonialsSection from "./components/testimonials-section";
import MedicallyReviewedSection from "./components/medically-reviewed-section";
import FAQsSection from "./components/faqs-section";
import TrustedClinicSection from "./components/trusted-clinic-section";
import AppointmentCTASection from "./components/appointment-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <YourJourneySection />
      <CLinicComparisonSection />
      <SupportSection />
      <PublicPresenceSection />
      <WeightlossExpertsSection />
      <TestimonialsSection />
      <TrustedClinicSection />
      <AppointmentCTASection />
      <FAQsSection />
      <MedicallyReviewedSection />
    </>
  );
}
