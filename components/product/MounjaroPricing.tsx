"use client";

import { useState } from "react";
import { PricingTier, ProductData } from "@/data/products";
import { PricingSelector } from "@/components/cart/PricingSelector";
import AssessmentGate from "@/components/assessment/AssessmentGate";

interface MounjaroPricingProps {
  product: ProductData;
  pricingTiers: PricingTier[];
}

export function MounjaroPricing({ product, pricingTiers }: MounjaroPricingProps) {
  const [isEligible, setIsEligible] = useState(false);

  // Determine category based on product ID or badge
  const getProductCategory = (product: ProductData): 'injections' | 'pills-tablets' | 'bariatric-surgery' => {
    if (product.badge.includes('Injection')) {
      return 'injections';
    } else if (product.badge.includes('Tablet') || product.badge.includes('Pills')) {
      return 'pills-tablets';
    } else {
      return 'bariatric-surgery';
    }
  };

  const productForCart = {
    id: product.id,
    name: product.name,
    category: getProductCategory(product),
    image: product.heroImage,
    description: product.heroDescription,
    isprescription: true, // Mounjaro requires prescription
  };

  if (!isEligible) {
    return (
      <section className="mx-auto px-4 max-w-7xl w-full">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Mounjaro Eligibility Check</h2>
            <p className="text-lg text-muted-foreground">
              Verify your medical assessment to view pricing and purchase options
            </p>
          </div>
          
          <AssessmentGate 
            onEligibilityConfirmed={() => setIsEligible(true)}
            productName={product.name}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Traditional Pricing Display */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Choose Your Dose</h2>
            <p className="text-lg text-muted-foreground">All doses available with free delivery</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {pricingTiers.map((tier) => (
              <div
                key={tier.dose}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{tier.dose}</h3>
                  {tier.period !== "mo" && (
                    <p className="text-sm text-muted-foreground">{tier.period}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{tier.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Interactive Pricing Selector */}
        <div className="lg:sticky lg:top-8">
          <PricingSelector 
            product={productForCart}
            pricingTiers={pricingTiers}
          />
        </div>
      </div>
    </section>
  );
}