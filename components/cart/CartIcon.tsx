"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cart";

interface CartIconProps {
  variant?: "ghost" | "outline" | "default";
  size?: "icon" | "sm" | "default" | "lg";
  className?: string;
}

export function CartIcon({ 
  variant = "ghost", 
  size = "icon",
  className 
}: CartIconProps) {
  const { itemCount, openCart } = useCartStore();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={openCart}
      className={`relative ${className}`}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium min-w-[1.25rem]">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
      <span className="sr-only">
        Shopping cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </span>
    </Button>
  );
}