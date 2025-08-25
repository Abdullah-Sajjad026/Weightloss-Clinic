import { Button } from "@/components/ui/button";
import { PricingTier, ProductData } from "@/data/products";
import { PricingSelector } from "@/components/cart/PricingSelector";

interface ProductPricingProps {
  product: ProductData;
  pricingTiers: PricingTier[];
}

export function ProductPricing({ product, pricingTiers }: ProductPricingProps) {
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
    isprescription: true, // Most products require prescription
  };

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
                  <span className="text-2xl font-bold">{tier.price}</span>
                  {tier.period === "mo" && (
                    <p className="text-sm text-muted-foreground">/month</p>
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
            pricingTiers={pricingTiers}
            className="bg-gray-50 rounded-xl p-6"
          />
        </div>
      </div>
    </section>
  );
}