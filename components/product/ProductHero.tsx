import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import { ProductData } from "@/data/products";

interface ProductHeroProps {
  product: ProductData;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge variant="secondary" className="mb-4">{product.badge}</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            {product.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {product.heroDescription}
          </p>
          
          <div className="flex flex-col gap-4 mb-8">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckIcon className="h-5 w-5 text-green-600" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <Button size="lg" className="mb-4">
            Get Started
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Image
            src={product.heroImage}
            alt={product.heroImageAlt}
            width={400}
            height={400}
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}