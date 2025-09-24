"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Stethoscope,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  productName: string;
  productSlug: string;
  category: string;
  variant?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  productImage?: string;
  productDescription?: string;
  isPrescription: boolean;
}

interface OrderStatusHistoryItem {
  id: string;
  status: string;
  notes?: string;
  updatedBy?: string;
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  status: string;
  paymentStatus: string;
  medicalReviewStatus: string;
  reviewedBy?: string;
  reviewedAt?: string;
  medicalNotes?: string;
  totalAmount: number;
  prescriptionRequired: boolean;
  prescriptionUploaded: boolean;
  prescriptionNotes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  specialInstructions?: string;
  marketingOptIn: boolean;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;
  orderItems: OrderItem[];
  orderStatusHistory: OrderStatusHistoryItem[];
}

export default function AdminOrderDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  // Form states for updates
  const [orderStatus, setOrderStatus] = useState("");
  const [medicalReviewStatus, setMedicalReviewStatus] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [statusNotes, setStatusNotes] = useState("");

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const fetchOrder = async () => {
    if (!resolvedParams?.id) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${resolvedParams.id}`);
      if (response.ok) {
        const data = await response.json();
        const orderData = data.order;
        setOrder(orderData);
        setOrderStatus(orderData.status);
        setMedicalReviewStatus(orderData.medicalReviewStatus);
        setMedicalNotes(orderData.medicalNotes || "");
        setTrackingNumber(orderData.trackingNumber || "");
      } else {
        console.error('Failed to fetch order');
        router.push('/admin/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      router.push('/admin/orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resolvedParams?.id) {
      fetchOrder();
    }
  }, [resolvedParams]);

  const handleUpdateOrder = async () => {
    if (!order) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/orders/${order.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: orderStatus,
          medicalReviewStatus,
          medicalNotes: medicalNotes.trim() || undefined,
          trackingNumber: trackingNumber.trim() || undefined,
          notes: statusNotes.trim() || `Order updated by admin`,
          updatedBy: 'Admin', // In a real app, this would be the logged-in user
        }),
      });

      if (response.ok) {
        const { order: updatedOrder } = await response.json();
        setOrder(updatedOrder);
        setStatusNotes("");
        alert('Order updated successfully!');
      } else {
        alert('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'PROCESSING':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'SHIPPED':
        return <Truck className="w-5 h-5 text-indigo-600" />;
      case 'DELIVERED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      // Medical Review Status Icons
      case 'UNDER_REVIEW':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'APPROVED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'REQUIRES_CONSULTATION':
        return <AlertTriangle className="w-5 h-5 text-purple-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return "bg-amber-100 text-amber-800 border-amber-200";
      case 'PROCESSING':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'SHIPPED':
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case 'DELIVERED':
        return "bg-green-100 text-green-800 border-green-200";
      case 'CANCELLED':
        return "bg-red-100 text-red-800 border-red-200";
      // Medical Review Status Colors
      case 'UNDER_REVIEW':
        return "bg-orange-100 text-orange-800 border-orange-200";
      case 'APPROVED':
        return "bg-green-100 text-green-800 border-green-200";
      case 'REJECTED':
        return "bg-red-100 text-red-800 border-red-200";
      case 'REQUIRES_CONSULTATION':
        return "bg-purple-100 text-purple-800 border-purple-200";
      // Payment Status Colors
      case 'COMPLETED':
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case 'FAILED':
        return "bg-red-100 text-red-800 border-red-200";
      case 'REFUNDED':
        return "bg-slate-100 text-slate-800 border-slate-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <Link href="/admin/orders">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order {order.orderNumber}
            </h1>
            <p className="text-gray-600">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(order.status)}
          <Badge className={getStatusColor(order.status)}>
            {formatOrderStatus(order.status)}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Management */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Order Management</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orderStatus">Order Status</Label>
                <Select value={orderStatus} onValueChange={setOrderStatus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="trackingNumber">Royal Mail Tracking ID</Label>
                <Input
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter Royal Mail tracking ID..."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="statusNotes">Update Notes</Label>
              <Textarea
                id="statusNotes"
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="Add notes about this status update..."
                className="mt-1"
                rows={3}
              />
            </div>

            <Button 
              onClick={handleUpdateOrder}
              disabled={updating}
              className="mt-4"
            >
              {updating ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Order
                </>
              )}
            </Button>
          </Card>

          {/* Medical Review (if applicable) */}
          {order.prescriptionRequired && (
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Stethoscope className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold">Medical Review</h2>
                <Badge className={getStatusColor(order.medicalReviewStatus)}>
                  {formatOrderStatus(order.medicalReviewStatus)}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="medicalReviewStatus">Medical Review Status</Label>
                  <Select value={medicalReviewStatus} onValueChange={setMedicalReviewStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                      <SelectItem value="REQUIRES_CONSULTATION">Requires Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="medicalNotes">Medical Notes</Label>
                  <Textarea
                    id="medicalNotes"
                    value={medicalNotes}
                    onChange={(e) => setMedicalNotes(e.target.value)}
                    placeholder="Add medical review notes..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                {order.reviewedBy && (
                  <div className="text-sm text-gray-600">
                    Last reviewed by {order.reviewedBy} on {formatDate(order.reviewedAt!)}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Order Items */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productName}</h3>
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
                      <Badge variant="outline" className="text-xs">
                        {item.category.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(item.totalPrice)}</div>
                    <div className="text-sm text-gray-500">
                      {formatPrice(item.unitPrice)} each
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </Card>

          {/* Order History */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            <div className="space-y-4">
              {order.orderStatusHistory.map((history) => (
                <div key={history.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(history.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {formatOrderStatus(history.status)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(history.createdAt)}
                      </span>
                      {history.updatedBy && (
                        <Badge variant="outline" className="text-xs">
                          by {history.updatedBy}
                        </Badge>
                      )}
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
        </div>

        {/* Customer & Order Info */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold">Customer Information</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p>{order.customerEmail}</p>
              </div>
              {order.customerPhone && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p>{order.customerPhone}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Marketing Consent</label>
                <p>{order.marketingOptIn ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </Card>

          {/* Shipping Information */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold">Shipping Address</h2>
            </div>
            
            <div className="space-y-1">
              <p>{order.shippingStreet}</p>
              <p>{order.shippingCity}, {order.shippingPostalCode}</p>
              <p>{order.shippingCountry}</p>
            </div>

            {order.specialInstructions && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-500">Special Instructions</label>
                <p className="text-sm bg-gray-50 p-2 rounded mt-1">
                  {order.specialInstructions}
                </p>
              </div>
            )}
          </Card>

          {/* Payment Information */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold">Payment Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Payment Status</label>
                <div className="mt-1 flex items-center space-x-2">
                  {order.paymentStatus === 'COMPLETED' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : order.paymentStatus === 'FAILED' ? (
                    <XCircle className="w-4 h-4 text-red-600" />
                  ) : order.paymentStatus === 'REFUNDED' ? (
                    <AlertTriangle className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-600" />
                  )}
                  <Badge className={getStatusColor(order.paymentStatus)}>
                    {formatOrderStatus(order.paymentStatus)}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Order Total</label>
                <p className="text-lg font-semibold">{formatPrice(order.totalAmount)}</p>
              </div>

              {order.paidAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Date</label>
                  <p>{formatDate(order.paidAt)}</p>
                </div>
              )}

              <Separator />

              {/* Stripe Transaction Details */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Stripe Transaction Details</h3>
                
                {order.stripeSessionId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Stripe Session</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                        {order.stripeSessionId}
                      </code>
                      <a 
                        href={`https://dashboard.stripe.com/test/checkout/sessions/${order.stripeSessionId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {order.stripePaymentIntentId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment Intent</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                        {order.stripePaymentIntentId}
                      </code>
                      <a 
                        href={`https://dashboard.stripe.com/test/payments/${order.stripePaymentIntentId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {order.stripeCustomerId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Stripe Customer</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                        {order.stripeCustomerId}
                      </code>
                      <a 
                        href={`https://dashboard.stripe.com/test/customers/${order.stripeCustomerId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {!order.stripeSessionId && !order.stripePaymentIntentId && (
                  <div className="text-sm text-gray-500 italic">
                    No Stripe transaction details available
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}