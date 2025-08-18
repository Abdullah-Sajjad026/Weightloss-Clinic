import { CategoryHero } from "@/app/(products)/components/category-hero";
import { ProductCard } from "@/app/(products)/components/product-card";
import { CrossSellSection } from "@/app/(products)/components/cross-sell-section";
import { PillsComparisonSection } from "@/app/(products)/components/pills-comparison-section";
import { ExpertAdviceCTA } from "@/app/(products)/components/expert-advice-cta";
import { HowItWorksSection } from "@/app/(products)/components/how-it-works-section";
import { MentalHealthSection } from "../components/mental-health-section";
import MedicallyReviewedSection from "@/app/(landing-page)/components/medically-reviewed-section";

const pillProducts = [
  {
    name: "Orlistat",
    description: "All doses available",
    price: "£12/week",
    imageUrl:
      "https://ik.imagekit.io/medicspot/orlistat-box.webp?tr=w-750,q-75",
    imageAlt: "Orlistat box",
    href: "/pills-tablets/orlistat",
  },
  {
    name: "Xenical",
    description: "All doses available",
    price: "£15/week",
    imageUrl: "https://ik.imagekit.io/medicspot/xenical.webp?tr=w-750,q-75",
    imageAlt: "Xenical pills",
    href: "/pills-tablets/xenical",
  },
  {
    name: "Alli",
    description: "All doses available",
    price: "£12/week",
    imageUrl: "https://ik.imagekit.io/medicspot/alli.webp?tr=w-750,q-75",
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
      "https://ik.imagekit.io/medicspot/mounjaro-pen-2.webp?tr=w-750,q-75",
    imageAlt: "Mounjaro pen",
    href: "/injections/mounjaro",
    badge: "Injections",
  },
  {
    name: "Wegovy",
    description: "Up to 15% weight loss",
    price: "from £45/week",
    imageUrl:
      "https://ik.imagekit.io/medicspot/wegovy-boxes.webp?tr=w-750,q-75",
    imageAlt: "Wegovy boxes",
    href: "/injections/wegovy",
    badge: "Injections",
  },
  {
    name: "Saxenda",
    description: "Up to 10% weight loss",
    price: "from £55/pen",
    imageUrl:
      "https://ik.imagekit.io/medicspot/saxenda-pens.webp?tr=w-750,q-75",
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
          description="At Northampton Weight Loss Clinic, we specialise in providing weight loss pills that are both effective and tailored to your individual needs. Find out if you're eligible for Orlistat, Xenical, and other weight loss medications."
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
          description="Get expert advice from the Northampton Weight Loss Clinic team."
          colorScheme="secondary"
        />
      </section>

      {/* Cross-sell Injections Section */}
      <section className="mx-auto px-4 max-w-7xl w-full">
        <CrossSellSection
          title="We also offer weight loss injections"
          description="Northampton Weight Loss Clinic also offers weight loss injections for more significant results"
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

      <MedicallyReviewedSection />
    </>
  );
}
