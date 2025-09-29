import { Metadata } from "next";
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
import GoogleReviewsSection from "@/app/(public)/(landing-page)/components/google-reviews-section";
import SupportSection from "@/app/(public)/(landing-page)/components/support-section";
// import PublicPresenceSection from "@/app/(public)/(landing-page)/components/public-presence-section";
import MedicallyReviewedSection from "@/app/(public)/(landing-page)/components/medically-reviewed-section";

export const metadata: Metadata = {
  title: "Weight Loss Injections - Mounjaro & Wegovy",
  description:
    "Professional weight loss injections including Mounjaro (tirzepatide) and Wegovy (semaglutide). Compare effectiveness, pricing, and side effects. Expert medical consultation available.",
  keywords: [
    "weight loss injections",
    "Mounjaro",
    "Wegovy",
    "tirzepatide",
    "semaglutide",
    "Northampton",
    "medical weight loss",
  ],
  openGraph: {
    title: "Weight Loss Injections - Mounjaro & Wegovy - Northampton Clinic",
    description:
      "Professional weight loss injections with Mounjaro and Wegovy. Expert medical consultation and personalized treatment plans.",
  },
};

const injectionProducts = [
  {
    name: "Mounjaro",
    description: "All doses available",
    price: "from £150/month",
    imageUrl: "/products/mounjaro-pen-1.webp",
    imageAlt: "Mounjaro injection pen",
    href: "/injections/mounjaro",
  },
  {
    name: "Wegovy",
    description: "All doses available",
    price: "from £169/month",
    imageUrl: "/products/wegovy-box.webp",
    imageAlt: "Wegovy injection medication",
    href: "/injections/wegovy",
  },
];

// Pills products removed as pages don't exist yet

export default function InjectionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <CategoryHero
          title="Northampton Weight Loss Injections"
          description="Discover if you're eligible for weight loss injections at Northampton Weightloss (Powered by Regent Pharmacy). Compare Wegovy, Saxenda, and Mounjaro for their effectiveness, common side effects, patient reviews, and pricing."
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
      {/* <section className="mx-auto px-4 max-w-7xl w-full">
        <ExpertAdviceCTA />
      </section> */}

      {/* Journey Section */}
      <YourJourneySection />

      {/* Clinic Comparison Section */}
      <CLinicComparisonSection />

      {/* Google Reviews Section */}
      <GoogleReviewsSection />

      {/* Support Section */}
      <SupportSection />

      {/* Public Presence Section */}
      {/* <PublicPresenceSection /> */}

      {/* Cross-sell Pills Section - Commented out as pills pages don't exist yet */}
      {/* <section className="mx-auto px-4 max-w-7xl w-full">
        <CrossSellSection
          title="We also offer weight loss pills"
          description="Northampton Weightloss (Powered by Regent Pharmacy) also offers weight loss pills"
          products={pillProducts}
          colorScheme="tertiary"
        />
      </section> */}

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
    </>
  );
}
