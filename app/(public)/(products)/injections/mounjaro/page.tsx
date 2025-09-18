import { Metadata } from "next";
import { ProductHero } from "@/components/product/ProductHero";
import { MounjaroPricing } from "@/components/product/MounjaroPricing";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductDosage } from "@/components/product/ProductDosage";
import { ProductVideo } from "@/components/product/ProductVideo";
import { ProductReferences } from "@/components/product/ProductReferences";
import { ProductCTA } from "@/components/product/ProductCTA";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Mounjaro (Tirzepatide) Weight Loss Injection",
  description: "Mounjaro (tirzepatide) weight loss injection at Northampton Clinic. Clinical-grade treatment for effective weight management. Expert consultation, personalized dosing, and professional support.",
  keywords: ["Mounjaro", "tirzepatide", "weight loss injection", "diabetes medication", "GLP-1 agonist", "Northampton", "obesity treatment"],
  openGraph: {
    title: "Mounjaro (Tirzepatide) Weight Loss Treatment - Northampton Clinic",
    description: "Professional Mounjaro treatment for effective weight loss. Expert medical consultation and personalized care plans.",
  },
};

export default function MounjaroPage() {
  const product = PRODUCTS.mounjaro;

  return (
    <div className="flex flex-col items-center">
      <main className="flex w-full flex-col items-center gap-24 py-8">
        {/* Hero Section */}
        <ProductHero product={product} />

        {/* Assessment-Gated Pricing Section */}
        <MounjaroPricing product={product} pricingTiers={product.pricingTiers} />

        {/* What is Mounjaro Section */}
        <ProductInfo
          title={product.whatIsTitle}
          description={product.whatIsDescription}
          cards={product.infoCards}
          footerNote={product.footerNote}
          colorScheme="secondary"
        />

        {/* Video Section (if exists) */}
        {product.videoSection && (
          <ProductVideo
            title={product.videoSection.title}
            description={product.videoSection.description}
            videoUrl={product.videoSection.videoUrl}
          />
        )}

        {/* Buying Section (if exists) */}
        {product.buyingSection && (
          <ProductInfo
            title={product.buyingSection.title}
            description={product.buyingSection.description}
            cards={product.buyingSection.steps}
            footerNote={product.buyingSection.footerNote}
            colorScheme="secondary"
          />
        )}

        {/* Dosing Schedule Section */}
        <ProductDosage
          title={product.dosageTitle}
          description={product.dosageDescription}
          steps={product.dosageSteps}
          footerNote={product.dosageFooterNote}
        />

        {/* CTA Section */}
        <ProductCTA productName={product.name} />

        {/* References Section (if exists) */}
        {product.references && (
          <ProductReferences
            title={`${product.name} sources and references`}
            description={`Here are some additional resources to help you learn more about ${product.name}, how it works, and clinical studies related to the drug.`}
            references={product.references}
          />
        )}
      </main>
    </div>
  );
}