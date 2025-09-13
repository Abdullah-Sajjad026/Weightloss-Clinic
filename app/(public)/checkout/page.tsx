"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import useCartStore from "@/store/cart";
import {
  ArrowLeft,
  Lock,
  CreditCard,
  User,
  MapPin,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { CheckoutFormData } from "@/types/cart";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, itemCount, totalPrice, clearCart } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelledMessage, setShowCancelledMessage] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shippingStreet: "",
    shippingCity: "",
    shippingPostalCode: "",
    shippingCountry: "United Kingdom",
    billingIsSameAsShipping: true,
    specialInstructions: "",
    marketingOptIn: false,
    termsAccepted: false,
  });

  useEffect(() => {
    setIsClient(true);
    
    // Check if user was redirected from a cancelled payment
    if (searchParams.get('cancelled') === 'true') {
      setShowCancelledMessage(true);
      // Hide the message after 5 seconds
      setTimeout(() => setShowCancelledMessage(false), 5000);
    }
  }, [searchParams]);

  // Redirect if cart is empty
  useEffect(() => {
    if (isClient && items.length === 0) {
      router.push("/cart");
    }
  }, [isClient, items.length, router]);

  const handleInputChange = (
    field: keyof CheckoutFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 2:
        return (
          formData.shippingStreet &&
          formData.shippingCity &&
          formData.shippingPostalCode
        );
      case 3:
        return formData.termsAccepted;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitOrder = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // Step 1: Create order (with PENDING status)
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerData: formData,
          cartItems: items,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const { order } = await orderResponse.json();

      // Step 2: Create Stripe checkout session
      const checkoutResponse = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
        }),
      });

      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json();
        throw new Error(errorData.error || 'Failed to create payment session');
      }

      const { url } = await checkoutResponse.json();

      // Step 3: Redirect to Stripe Checkout
      if (url) {
        // Clear cart before redirecting to payment
        clearCart();
        window.location.href = url;
      } else {
        throw new Error('No payment URL returned');
      }

    } catch (error) {
      console.error('Checkout error:', error);
      // Enhanced error message to help debug
      let errorMessage = 'Failed to process checkout. Please try again.';
      if (error instanceof Error) {
        errorMessage = `Checkout failed: ${error.message}`;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPrescriptionItems = () => {
    return items.filter((item) => item.isprescription);
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
    return null; // Will redirect via useEffect
  }

  const steps = [
    { number: 1, title: "Customer Information", icon: User },
    { number: 2, title: "Shipping Details", icon: MapPin },
    { number: 3, title: "Review & Confirm", icon: FileText },
  ];

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" asChild>
            <Link href="/cart" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cart</span>
            </Link>
          </Button>
        </div>

        {/* Cancellation Message */}
        {showCancelledMessage && (
          <div className="mb-6">
            <Card className="p-4 border-amber-200 bg-amber-50">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center mt-0.5">
                  !
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-800 mb-1">
                    Payment Cancelled
                  </h3>
                  <p className="text-sm text-amber-700">
                    Your payment was cancelled. You can continue with your order or update your details below.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;

                  return (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isCompleted
                            ? "bg-green-600 text-white"
                            : isActive
                            ? "bg-primary-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isCompleted ? "✓" : step.number}
                      </div>
                      <div className="ml-3 hidden sm:block">
                        <p
                          className={`text-sm font-medium ${
                            isActive ? "text-primary-600" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-12 h-px bg-gray-300 ml-4"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-semibold">
                    Customer Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleNextStep} disabled={!validateStep(1)}>
                    Continue to Shipping
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Shipping Details */}
            {currentStep === 2 && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-semibold">Shipping Details</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shippingStreet">Street Address *</Label>
                    <Input
                      id="shippingStreet"
                      value={formData.shippingStreet}
                      onChange={(e) =>
                        handleInputChange("shippingStreet", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City *</Label>
                      <Input
                        id="shippingCity"
                        value={formData.shippingCity}
                        onChange={(e) =>
                          handleInputChange("shippingCity", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingPostalCode">Postal Code *</Label>
                      <Input
                        id="shippingPostalCode"
                        value={formData.shippingPostalCode}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingPostalCode",
                            e.target.value
                          )
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="shippingCountry">Country *</Label>
                    <Input
                      id="shippingCountry"
                      value={formData.shippingCountry}
                      readOnly
                      className="mt-1 bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialInstructions">
                      Special Delivery Instructions
                    </Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) =>
                        handleInputChange("specialInstructions", e.target.value)
                      }
                      className="mt-1"
                      rows={3}
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} disabled={!validateStep(2)}>
                    Review Order
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-semibold">Review & Confirm</h2>
                </div>

                {/* Customer Info Review */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p className="text-sm text-gray-600">
                    {formData.firstName} {formData.lastName}
                    <br />
                    {formData.email}
                    <br />
                    {formData.phone}
                  </p>
                </div>

                {/* Shipping Info Review */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="text-sm text-gray-600">
                    {formData.shippingStreet}
                    <br />
                    {formData.shippingCity}, {formData.shippingPostalCode}
                    <br />
                    {formData.shippingCountry}
                  </p>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) =>
                        handleInputChange("termsAccepted", checked === true)
                      }
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary-600 hover:underline"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      . I understand that prescription medications require
                      medical approval.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketingOptIn}
                      onCheckedChange={(checked) =>
                        handleInputChange("marketingOptIn", checked === true)
                      }
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      I would like to receive marketing communications and
                      health tips.
                    </Label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmitOrder}
                    disabled={!validateStep(3) || isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      {item.variant && (
                        <div className="text-gray-500">{item.variant}</div>
                      )}
                      <div className="text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </Card>

            {/* Prescription Notice */}
            {getPrescriptionItems().length > 0 && (
              <Card className="p-4 border-amber-200 bg-amber-50">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center mt-0.5">
                    !
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-amber-800 mb-1">
                      Medical Consultation Required
                    </h3>
                    <p className="text-sm text-amber-700">
                      Your order includes prescription medications. Our medical
                      team will review your eligibility and may contact you for
                      additional information.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Security Notice */}
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800 font-medium">
                  Secure SSL Encrypted Checkout
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
