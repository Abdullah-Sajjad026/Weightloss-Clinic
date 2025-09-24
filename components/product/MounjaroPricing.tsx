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
  const [authorizedDoses, setAuthorizedDoses] = useState<{mounjaro?: string; wegovy?: string}>({});

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
            onEligibilityConfirmed={(doses) => {
              setIsEligible(true);
              setAuthorizedDoses(doses || {});
            }}
            productName={product.name}
          />
        </div>
      </section>
    );
  }

  // Filter pricing tiers based on authorized doses
  const getAuthorizedTiers = () => {
    const productName = product.name.toLowerCase();
    let authorizedDose: string | undefined;
    
    if (productName.includes('mounjaro')) {
      authorizedDose = authorizedDoses.mounjaro;
    } else if (productName.includes('wegovy')) {
      authorizedDose = authorizedDoses.wegovy;
    }
    
    if (!authorizedDose) {
      return []; // No authorized dose found
    }
    
    // Find the matching tier
    return pricingTiers.filter(tier => tier.dose === authorizedDose);
  };

  const authorizedTiers = getAuthorizedTiers();
  
  // If no authorized tiers found, show message
  if (authorizedTiers.length === 0) {
    return (
      <section className="mx-auto px-4 max-w-7xl w-full">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">No Authorized Dose Found</h2>
            <p className="text-lg text-muted-foreground">
              You don't have authorization for {product.name} purchase. Please contact your healthcare provider.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Authorized Dose Display */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Your Authorized Dose</h2>
            <p className="text-lg text-muted-foreground">
              Based on your medical assessment, you're authorized for the following dose
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {authorizedTiers.map((tier) => (
              <div
                key={tier.dose}
                className="border-2 border-green-200 bg-green-50 rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold text-green-800">{tier.dose}</h3>
                  <p className="text-sm text-green-600 mt-1">✓ Authorized by your healthcare provider</p>
                  {tier.period !== "mo" && (
                    <p className="text-sm text-muted-foreground mt-1">{tier.period}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-800">{tier.price}</p>
                  <p className="text-sm text-green-600">Your authorized dose</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Interactive Pricing Selector */}
        <div className="lg:sticky lg:top-8">
          <PricingSelector 
            product={productForCart}
            pricingTiers={authorizedTiers} // Only show authorized dose
          />
        </div>
      </div>
    </section>
  );
}