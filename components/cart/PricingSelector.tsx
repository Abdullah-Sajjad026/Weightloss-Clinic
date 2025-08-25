"use client";

import { useState } from "react";
import { PricingTier } from "@/data/products";
import { AddToCartButton } from "./AddToCartButton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingSelectorProps {
  product: {
    id: string;
    name: string;
    category: 'injections' | 'pills-tablets' | 'bariatric-surgery';
    image?: string;
    description?: string;
    isprescription?: boolean;
  };
  pricingTiers: PricingTier[];
  className?: string;
}

export function PricingSelector({
  product,
  pricingTiers,
  className,
}: PricingSelectorProps) {
  const [selectedTier, setSelectedTier] = useState<PricingTier>(pricingTiers[0]);

  return (
    <div className={className}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Select Dosage & Add to Cart
        </h3>
        
        {/* Pricing Tiers Grid */}
        <div className="grid gap-3">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all ${
                selectedTier.dose === tier.dose
                  ? "ring-2 ring-primary-600 bg-primary-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedTier(tier)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedTier.dose === tier.dose
                        ? "border-primary-600 bg-primary-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedTier.dose === tier.dose && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {tier.dose}
                    </div>
                    {tier.period !== "mo" && (
                      <div className="text-sm text-gray-500">
                        {tier.period}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {tier.price}
                  </div>
                  {tier.period === "mo" && (
                    <div className="text-sm text-gray-500">per month</div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add to Cart Button */}
        <div className="pt-2">
          <AddToCartButton
            product={product}
            selectedTier={selectedTier}
            size="lg"
            className="w-full"
          />
        </div>

        {/* Prescription Notice */}
        {product.isprescription !== false && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                RX
              </Badge>
              <span className="text-sm text-amber-800 font-medium">
                Prescription Required
              </span>
            </div>
            <p className="text-sm text-amber-700 mt-1">
              This medication requires a valid prescription from a qualified healthcare provider.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}