"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PricingTier, ProductData } from "@/data/products";
import { PricingSelector } from "@/components/cart/PricingSelector";
import AssessmentGate from "@/components/assessment/AssessmentGate";
import { productRequiresAssessment } from "@/lib/assessment-config";

interface ProductPricingProps {
  product: ProductData;
  pricingTiers: PricingTier[];
}

export function ProductPricing({ product, pricingTiers }: ProductPricingProps) {
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

  const productCategory = getProductCategory(product);
  const requiresAssessment = productRequiresAssessment(product.name, product.id, productCategory);

  const productForCart = {
    id: product.id,
    name: product.name,
    category: productCategory,
    image: product.heroImage,
    description: product.heroDescription,
    isprescription: true, // Most products require prescription
  };

  // If assessment is required and user is not eligible, show assessment gate
  if (requiresAssessment && !isEligible) {
    return (
      <section className="mx-auto px-4 max-w-7xl w-full">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{product.name} Eligibility Check</h2>
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

  // Filter pricing tiers based on authorized doses (if assessment was required)
  const getAuthorizedTiers = () => {
    if (!requiresAssessment) {
      return pricingTiers; // Show all tiers if assessment not required
    }

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

  const displayTiers = getAuthorizedTiers();
  
  // If assessment was required but no authorized tiers found, show message
  if (requiresAssessment && displayTiers.length === 0) {
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
        {/* Left Side - Pricing Display */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {requiresAssessment && isEligible ? "Your Authorized Dose" : "Choose Your Dose"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {requiresAssessment && isEligible 
                ? "Based on your medical assessment, you're authorized for the following dose" 
                : "All doses available with free delivery"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {displayTiers.map((tier) => (
              <div
                key={tier.dose}
                className={`rounded-xl p-4 flex justify-between items-center ${
                  requiresAssessment && isEligible 
                    ? "border-2 border-blue-200 bg-blue-50" 
                    : "border"
                }`}
              >
                <div>
                  <h3 className={`text-lg font-semibold ${
                    requiresAssessment && isEligible ? "text-blue-800" : ""
                  }`}>
                    {tier.dose}
                  </h3>
                  {requiresAssessment && isEligible && (
                    <p className="text-sm text-blue-600 mt-1">✓ Authorized by your healthcare provider</p>
                  )}
                  {tier.period !== "mo" && (
                    <p className="text-sm text-muted-foreground mt-1">{tier.period}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${
                    requiresAssessment && isEligible ? "text-blue-800" : ""
                  }`}>
                    {tier.price}
                  </span>
                  {tier.period === "mo" && (
                    <p className="text-sm text-muted-foreground">/month</p>
                  )}
                  {requiresAssessment && isEligible && (
                    <p className="text-sm text-blue-600">Your authorized dose</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Cart Functionality */}
        <div className="lg:sticky lg:top-8">
          <PricingSelector
            product={productForCart}
            pricingTiers={displayTiers}
            className="bg-gray-50 rounded-xl p-6"
          />
        </div>
      </div>
    </section>
  );
}