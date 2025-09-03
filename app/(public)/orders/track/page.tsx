"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Package, Truck, CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  productName: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isPrescription: boolean;
}

interface OrderStatusHistoryItem {
  id: string;
  status: string;
  notes?: string;
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  medicalReviewStatus: string;
  totalAmount: number;
  prescriptionRequired: boolean;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  createdAt: string;
  orderItems: OrderItem[];
  orderStatusHistory: OrderStatusHistoryItem[];
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch(
        `/api/orders?email=${encodeURIComponent(email)}&orderNumber=${encodeURIComponent(orderNumber)}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const data = await response.json();
      
      if (data.orders && data.orders.length > 0) {
        setOrder(data.orders[0]);
      } else {
        setError("Order not found. Please check your order number and email address.");
      }

    } catch (error) {
      console.error("Order tracking error:", error);
      setError("Failed to track order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
      case 'MEDICAL_REVIEW':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'APPROVED':
      case 'PROCESSING':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'SHIPPED':
        return <Truck className="w-4 h-4 text-primary-600" />;
      case 'DELIVERED':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'REJECTED':
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
      case 'MEDICAL_REVIEW':
        return "bg-yellow-100 text-yellow-800";
      case 'APPROVED':
      case 'PROCESSING':
        return "bg-blue-100 text-blue-800";
      case 'SHIPPED':
        return "bg-primary-100 text-primary-800";
      case 'DELIVERED':
        return "bg-green-100 text-green-800";
      case 'REJECTED':
      case 'CANCELLED':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatOrderStatus = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600">
            Enter your order number and email address to track your order status
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-6 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orderNumber">Order Number *</Label>
                <Input
                  id="orderNumber"
                  placeholder="NWLC-123456"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Tracking Order...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Track Order
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </Card>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order {order.orderNumber}
                  </h2>
                  <p className="text-gray-600">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(order.status)}
                    <Badge className={getStatusColor(order.status)}>
                      {formatOrderStatus(order.status)}
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatPrice(order.totalAmount)}
                  </div>
                </div>
              </div>

              {/* Medical Review Status */}
              {order.prescriptionRequired && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-amber-100 text-amber-800">
                      Medical Review
                    </Badge>
                    <span className="text-sm text-amber-800 font-medium">
                      {formatOrderStatus(order.medicalReviewStatus)}
                    </span>
                  </div>
                  <p className="text-sm text-amber-700 mt-1">
                    This order includes prescription medications and requires medical approval.
                  </p>
                </div>
              )}

              {/* Tracking Information */}
              {order.trackingNumber && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Tracking Information</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Tracking Number: <strong>{order.trackingNumber}</strong>
                  </p>
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Link 
                      href={`https://www.royalmail.com/track-your-item#/tracking-results/${order.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Track with Royal Mail
                    </Link>
                  </Button>
                  {order.estimatedDelivery && (
                    <p className="text-sm text-blue-700 mt-3">
                      Estimated Delivery: {formatDate(order.estimatedDelivery)}
                    </p>
                  )}
                </div>
              )}
            </Card>

            {/* Order Items */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Items
              </h3>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.productName}</h4>
                      {item.variant && (
                        <p className="text-sm text-gray-600">{item.variant}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </span>
                        {item.isPrescription && (
                          <Badge variant="secondary" className="text-xs">
                            Prescription
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {formatPrice(item.totalPrice)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPrice(item.unitPrice)} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order History
              </h3>
              <div className="space-y-4">
                {order.orderStatusHistory.map((history, index) => (
                  <div key={history.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(history.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {formatOrderStatus(history.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(history.createdAt)}
                        </span>
                      </div>
                      {history.notes && (
                        <p className="text-sm text-gray-600 mt-1">
                          {history.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Help Section */}
            <Card className="p-6 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about your order, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}