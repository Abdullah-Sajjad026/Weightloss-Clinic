"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Mail, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    totalAmount: number;
    prescriptionRequired: boolean;
  } | null>(null);

  useEffect(() => {
    // Get order details from localStorage
    const lastOrderData = localStorage.getItem('lastOrder');
    if (lastOrderData) {
      const orderData = JSON.parse(lastOrderData);
      setOrderDetails(orderData);
      // Clear the stored order data
      localStorage.removeItem('lastOrder');
    } else {
      // Fallback if no order data found
      setOrderDetails({
        orderNumber: `NWLC-${Date.now().toString().slice(-6)}`,
        totalAmount: 0,
        prescriptionRequired: false,
      });
    }
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your order. We've received your request and our
            medical team will review it shortly.
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-green-800">
              Order Number: {orderDetails?.orderNumber || 'Loading...'}
            </span>
          </div>
        </div>

        {/* Order Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Confirmation Email Sent
                </h3>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email with your order details and
                  next steps.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Medical Review Pending
                </h3>
                <p className="text-sm text-gray-600">
                  Our medical team will review your order within 24 hours.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Medical Review</h4>
                <p className="text-sm text-gray-600">
                  Our qualified medical professionals will review your order and
                  medical information to ensure the medication is suitable for
                  you.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  Consultation (if required)
                </h4>
                <p className="text-sm text-gray-600">
                  If additional information is needed, our medical team may
                  contact you for a brief consultation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Order Processing</h4>
                <p className="text-sm text-gray-600">
                  Once approved, your order will be processed and prepared for
                  dispatch.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Free Delivery</h4>
                <p className="text-sm text-gray-600">
                  Your medication will be dispatched via secure, discreet
                  delivery (usually within 2-3 working days).
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Information */}
        <Card className="p-6 bg-amber-50 border-amber-200 mb-8">
          <h3 className="font-semibold text-amber-800 mb-3">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>
                You will receive email updates about your order status
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>
                Please ensure someone is available to receive the delivery
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>
                All medications are dispensed by our registered UK pharmacy
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>
                If you have any questions, please contact our support team
              </span>
            </li>
          </ul>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/" className="flex items-center space-x-2">
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        {/* Order Number Reminder */}
        <div className="text-center mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            Please keep your order number <strong>{orderDetails?.orderNumber}</strong> for
            your records. You can reference this number if you need to contact
            our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
