import { CategoryHero } from "@/app/(public)/(products)/components/category-hero";
import { ProductCard } from "@/app/(public)/(products)/components/product-card";
import { ExpertAdviceCTA } from "@/app/(public)/(products)/components/expert-advice-cta";
import { CrossSellSection } from "../components/cross-sell-section";
import { MentalHealthSection } from "@/app/(public)/(products)/components/mental-health-section";
import { FAQsSection } from "@/app/(public)/(products)/components/faqs-section";
import { injectionFAQs } from "@/app/(public)/(products)/data/injection-faqs";
import { InjectionsComparisonSection } from "@/app/(public)/(products)/components/injections-comparison-section";
import YourJourneySection from "@/app/(public)/(landing-page)/components/your-journey-section";
import CLinicComparisonSection from "@/app/(public)/(landing-page)/components/clinic-comparison-section";
import TestimonialsSection from "@/app/(public)/(landing-page)/components/testimonials-section";
import SupportSection from "@/app/(public)/(landing-page)/components/support-section";
import PublicPresenceSection from "@/app/(public)/(landing-page)/components/public-presence-section";
import MedicallyReviewedSection from "@/app/(public)/(landing-page)/components/medically-reviewed-section";

const injectionProducts = [
  {
    name: "Mounjaro",
    description: "All doses available",
    price: "£45/week",
    imageUrl:
      "https://ik.imagekit.io/medicspot/mounjaro-pen-2.webp?tr=w-750,q-75",
    imageAlt: "Mounjaro pen angled",
    href: "/injections/mounjaro",
  },
  {
    name: "Wegovy",
    description: "All doses available",
    price: "£45/week",
    imageUrl:
      "https://ik.imagekit.io/medicspot/wegovy-boxes.webp?tr=w-750,q-75",
    imageAlt: "Wegovy boxes",
    href: "/injections/wegovy",
  },
  {
    name: "Saxenda",
    description: "All doses available",
    price: "£55/pen",
    imageUrl:
      "https://ik.imagekit.io/medicspot/saxenda-pens.webp?tr=w-750,q-75",
    imageAlt: "Saxenda pens",
    href: "/injections/saxenda",
  },
];

const pillProducts = [
  {
    name: "Orlistat",
    description: "Up to 10% weight loss",
    price: "from £12/week",
    imageUrl:
      "https://ik.imagekit.io/medicspot/orlistat-box.webp?tr=w-750,q-75",
    imageAlt: "Orlistat box",
    href: "/pills-tablets/orlistat",
    badge: "Pills",
  },
  {
    name: "Xenical",
    description: "Up to 10% weight loss",
    price: "from £15/week",
    imageUrl: "https://ik.imagekit.io/medicspot/xenical.webp?tr=w-750,q-75",
    imageAlt: "Xenical pills",
    href: "/pills-tablets/xenical",
    badge: "Pills",
  },
  {
    name: "Alli",
    description: "Up to 5% weight loss",
    price: "from £12/week",
    imageUrl: "https://ik.imagekit.io/medicspot/alli.webp?tr=w-750,q-75",
    imageAlt: "Alli pills",
    href: "/pills-tablets/alli",
    badge: "Pills",
  },
];

export default function InjectionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <CategoryHero
          title="Northampton Weight Loss Injections"
          description="Discover if you're eligible for weight loss injections at Northampton Weight Loss Clinic. Compare Wegovy, Saxenda, and Mounjaro for their effectiveness, common side effects, patient reviews, and pricing."
        />

        {/* Products Grid */}
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {injectionProducts.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                imageAlt={product.imageAlt}
                href={product.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Injections Comparison Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <InjectionsComparisonSection />
      </section>

      {/* Expert Advice CTA */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <ExpertAdviceCTA />
      </section>

      {/* Journey Section */}
      <YourJourneySection />

      {/* Clinic Comparison Section */}
      <CLinicComparisonSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Support Section */}
      <SupportSection />

      {/* Public Presence Section */}
      <PublicPresenceSection />

      {/* Cross-sell Pills Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <CrossSellSection
          title="We also offer weight loss pills"
          description="Northampton Weight Loss Clinic also offers weight loss pills"
          products={pillProducts}
          colorScheme="tertiary"
        />
      </section>

      {/* Mental Health Support Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <MentalHealthSection />
      </section>

      {/* FAQs Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <FAQsSection
          title="Northampton weight loss injections FAQs"
          faqData={injectionFAQs}
          colorScheme="tertiary"
        />
      </section>

      <MedicallyReviewedSection />
    </>
  );
}
