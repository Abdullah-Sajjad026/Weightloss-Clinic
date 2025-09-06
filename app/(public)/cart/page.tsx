"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/store/cart";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    itemCount,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (
    itemId: string,
    currentQuantity: number,
    change: number
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const getTotalPrescriptionItems = () => {
    return items.filter((item) => item.isprescription).length;
  };

  if (!isClient) {
    return (
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button asChild size="lg">
                <Link href="/injections">Browse Injections</Link>
              </Button>
              {/* Pills & Tablets link removed as page doesn't exist */}
              {/* <Button variant="outline" asChild size="lg">
                <Link href="/pills-tablets">Browse Pills & Tablets</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" asChild>
            <Link href="/injections" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
              </h1>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    {item.image && (
                      <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          {item.variant && (
                            <p className="text-gray-600 mt-1">{item.variant}</p>
                          )}
                          <div className="flex items-center space-x-2 mt-2">
                            {item.isprescription && (
                              <Badge variant="secondary">
                                Prescription Required
                              </Badge>
                            )}
                            <span className="text-sm text-gray-500 capitalize">
                              {item.category.replace("-", " & ")}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quantity and Price Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <label className="text-sm font-medium text-gray-700">
                            Quantity:
                          </label>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity, -1)
                              }
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity, 1)
                              }
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(item.price)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({itemCount})</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </Card>

            {/* Prescription Notice */}
            {getTotalPrescriptionItems() > 0 && (
              <Card className="p-4 border-amber-200 bg-amber-50">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center mt-0.5">
                    !
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-amber-800 mb-1">
                      Prescription Required
                    </h3>
                    <p className="text-sm text-amber-700">
                      {getTotalPrescriptionItems()} item(s) in your cart require
                      a valid prescription. Our medical team will review your
                      eligibility during checkout.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Security Notice */}
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  🔒 Secure checkout • 🚚 Free delivery • 💊 Genuine medications
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
