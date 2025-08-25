"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import useCartStore from "@/store/cart";
import { PricingTier } from "@/data/products";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    category: 'injections' | 'pills-tablets' | 'bariatric-surgery';
    image?: string;
    description?: string;
    isprescription?: boolean;
  };
  selectedTier: PricingTier;
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function AddToCartButton({
  product,
  selectedTier,
  variant = "default",
  size = "default",
  className,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Parse price from string (e.g., "£179" -> 179)
  const priceValue = parseFloat(selectedTier.price.replace("£", ""));

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      slug: product.id, // Using product id as slug
      category: product.category,
      variant: selectedTier.dose,
      price: priceValue,
      image: product.image,
      description: product.description,
      isprescription: product.isprescription ?? true, // Default to prescription required
    };

    addItem(cartItem);
    
    // Show success state
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={className}
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart - {selectedTier.price}
        </>
      )}
    </Button>
  );
}