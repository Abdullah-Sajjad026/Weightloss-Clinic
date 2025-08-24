import { ProductData } from "@/data/products";
import { ProductHero } from "./ProductHero";
import { ProductPricing } from "./ProductPricing";
import { ProductInfo } from "./ProductInfo";
import { ProductDosage } from "./ProductDosage";
import { ProductVideo } from "./ProductVideo";
import { ProductReferences } from "./ProductReferences";
import { ProductCTA } from "./ProductCTA";

interface ProductPageProps {
  product: ProductData;
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="flex flex-col items-center">
      <main className="flex w-full flex-col items-center gap-24 py-8">
        {/* Hero Section */}
        <ProductHero product={product} />

        {/* Pricing Section */}
        <ProductPricing product={product} pricingTiers={product.pricingTiers} />

        {/* What is [Product] Section */}
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