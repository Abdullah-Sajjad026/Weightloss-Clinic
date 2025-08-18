import { cn } from "@/lib/utils";
import { CrossSellProductCard } from "./cross-sell-product-card";

interface CrossSellProduct {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  badge: string;
}

interface CrossSellSectionProps {
  title: string;
  description: string;
  products: CrossSellProduct[];
  colorScheme?: "primary" | "secondary" | "tertiary";
  backgroundImage?: string;
  className?: string;
}

export function CrossSellSection({
  title,
  description,
  products,
  colorScheme = "tertiary",
  backgroundImage = "https://ik.imagekit.io/medicspot/rays.webp?updatedAt=1746126061944",
  className,
}: CrossSellSectionProps) {
  const colorClasses = {
    primary: {
      background: "bg-primary-100",
      ring: "ring-primary-500/20",
    },
    secondary: {
      background: "bg-secondary-100",
      ring: "ring-secondary-500/20",
    },
    tertiary: {
      background: "bg-tertiary-100",
      ring: "ring-tertiary-500/20",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={cn(
        colors.background,
        colors.ring,
        "bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10",
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 mb-6 max-w-(--breakpoint-sm) text-balance lg:text-lg">
        {description}
      </p>

      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="sm:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-x-8">
          {products.map((product) => (
            <CrossSellProductCard
              key={product.name}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              imageAlt={product.imageAlt}
              href={product.href}
              badge={product.badge}
              colorScheme={colorScheme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
