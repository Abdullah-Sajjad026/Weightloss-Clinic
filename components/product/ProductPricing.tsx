import { Button } from "@/components/ui/button";
import { PricingTier } from "@/data/products";

interface ProductPricingProps {
  pricingTiers: PricingTier[];
}

export function ProductPricing({ pricingTiers }: ProductPricingProps) {
  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Dose</h2>
        <p className="text-lg text-muted-foreground">All doses available with free delivery</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <div
            key={tier.dose}
            className="border rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{tier.dose}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">/{tier.period}</span>
              </div>
              <Button className="w-full">Select {tier.dose}</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}