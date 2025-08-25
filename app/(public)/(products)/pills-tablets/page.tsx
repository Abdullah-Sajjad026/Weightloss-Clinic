import MedicallyReviewedSection from "../../(landing-page)/components/medically-reviewed-section";
import { CategoryHero } from "../components/category-hero";
import { CrossSellSection } from "../components/cross-sell-section";
import { ExpertAdviceCTA } from "../components/expert-advice-cta";
import { FAQsSection } from "../components/faqs-section";
import { HowItWorksSection } from "../components/how-it-works-section";
import { MentalHealthSection } from "../components/mental-health-section";
import { PillsComparisonSection } from "../components/pills-comparison-section";
import { ProductCard } from "../components/product-card";
import { pillsFAQs } from "../data/pills-faqs";

const pillProducts = [
  {
    name: "Orlistat",
    description: "All doses available",
    price: "£12/week",
    imageUrl:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=750&h=468&fit=crop&crop=center&auto=format&q=75",
    imageAlt: "Orlistat box",
    href: "/pills-tablets/orlistat",
  },
  {
    name: "Xenical",
    description: "All doses available",
    price: "£15/week",
    imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=750&h=468&fit=crop&crop=center&auto=format&q=75",
    imageAlt: "Xenical pills",
    href: "/pills-tablets/xenical",
  },
  {
    name: "Alli",
    description: "All doses available",
    price: "£12/week",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=750&h=468&fit=crop&crop=center&auto=format&q=75",
    imageAlt: "Alli pills",
    href: "/pills-tablets/alli",
  },
];

const injectionProducts = [
  {
    name: "Mounjaro",
    description: "Up to 26% weight loss",
    price: "from £45/week",
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=750&h=468&fit=crop&crop=center&auto=format&q=75",
    imageAlt: "Mounjaro pen",
    href: "/injections/mounjaro",
    badge: "Injections",
  },
  {
    name: "Wegovy",
    description: "Up to 15% weight loss",
    price: "from £45/week",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=750&h=468&fit=crop&crop=center&auto=format&q=75",
    imageAlt: "Wegovy boxes",
    href: "/injections/wegovy",
    badge: "Injections",
  },
  {
    name: "Saxenda",
    description: "Up to 10% weight loss",
    price: "from £55/pen",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=750&h=468&fit=crop&crop=center&auto=format&q=75",
    imageAlt: "Saxenda pens",
    href: "/injections/saxenda",
    badge: "Injections",
  },
];

export default function PillsTabletsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <CategoryHero
          title="Northampton Weight Loss Pills"
          description="At DigitalClinicSystem, we specialise in providing weight loss pills that are both effective and tailored to your individual needs. Find out if you're eligible for Orlistat, Xenical, and other weight loss medications."
        />

        {/* Products Grid */}
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {pillProducts.map((product) => (
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

      {/* Pills Comparison Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <PillsComparisonSection />
      </section>

      {/* Expert Advice CTA */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <ExpertAdviceCTA
          title="Not sure which weight loss pill is right for you?"
          description="Get expert advice from the DigitalClinicSystem team."
          colorScheme="secondary"
        />
      </section>

      {/* Cross-sell Injections Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <CrossSellSection
          title="We also offer weight loss injections"
          description="DigitalClinicSystem also offers weight loss injections for more significant results"
          products={injectionProducts}
          colorScheme="tertiary"
        />
      </section>

      {/* How It Works Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <HowItWorksSection />
      </section>

      {/* Mental Health Support Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <MentalHealthSection />
      </section>

      {/* FAQs Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <FAQsSection
          title="Northampton weight loss pills FAQs"
          faqData={pillsFAQs}
          colorScheme="tertiary"
        />
      </section>

      <MedicallyReviewedSection />
    </>
  );
}
