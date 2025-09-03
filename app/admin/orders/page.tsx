"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle,
  RefreshCw,
  Download
} from "lucide-react";
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

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: string;
  paymentStatus: string;
  medicalReviewStatus: string;
  totalAmount: number;
  prescriptionRequired: boolean;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [medicalReviewFilter, setMedicalReviewFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });

      if (searchQuery.trim()) {
        // If it looks like an email, search by email, otherwise by order number
        if (searchQuery.includes('@')) {
          params.append('email', searchQuery);
        } else {
          params.append('orderNumber', searchQuery);
        }
      }

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const response = await fetch(`/api/orders?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        setTotalPages(data.pagination.pages);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, medicalReviewFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchOrders();
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

  const getMedicalReviewColor = (status: string) => {
    switch (status) {
      case 'PENDING':
      case 'UNDER_REVIEW':
        return "bg-amber-100 text-amber-800";
      case 'APPROVED':
        return "bg-green-100 text-green-800";
      case 'REJECTED':
        return "bg-red-100 text-red-800";
      case 'REQUIRES_CONSULTATION':
        return "bg-orange-100 text-orange-800";
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
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderPriority = (order: Order) => {
    if (order.prescriptionRequired && order.medicalReviewStatus === 'PENDING') {
      return 'high';
    }
    if (order.status === 'PROCESSING' || order.status === 'APPROVED') {
      return 'medium';
    }
    return 'low';
  };

  const filteredOrders = orders.filter(order => {
    if (medicalReviewFilter === 'needs_review') {
      return order.prescriptionRequired && 
             (order.medicalReviewStatus === 'PENDING' || order.medicalReviewStatus === 'UNDER_REVIEW');
    }
    if (medicalReviewFilter === 'approved') {
      return order.medicalReviewStatus === 'APPROVED';
    }
    if (medicalReviewFilter === 'rejected') {
      return order.medicalReviewStatus === 'REJECTED';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">
            Manage customer orders, medical reviews, and fulfillment
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={fetchOrders} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.medicalReviewStatus === 'PENDING').length}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'PROCESSING').length}
              </div>
              <div className="text-sm text-gray-600">Processing</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Truck className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'SHIPPED').length}
              </div>
              <div className="text-sm text-gray-600">Shipped</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'DELIVERED').length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Orders</Label>
              <Input
                id="search"
                placeholder="Order number or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="status">Order Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="MEDICAL_REVIEW">Medical Review</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="medical">Medical Review</Label>
              <Select value={medicalReviewFilter} onValueChange={setMedicalReviewFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All reviews" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="needs_review">Needs Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button type="submit" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Medical Review</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Loading orders...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="text-gray-500">No orders found</div>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className={`
                  ${getOrderPriority(order) === 'high' ? 'bg-red-50' : ''}
                  ${getOrderPriority(order) === 'medium' ? 'bg-blue-50' : ''}
                `}>
                  <TableCell>
                    <div className="font-mono text-sm font-medium">
                      {order.orderNumber}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <Badge className={getStatusColor(order.status)}>
                        {formatOrderStatus(order.status)}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell>
                    {order.prescriptionRequired ? (
                      <Badge className={getMedicalReviewColor(order.medicalReviewStatus)}>
                        {formatOrderStatus(order.medicalReviewStatus)}
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-500">N/A</span>
                    )}
                  </TableCell>

                  <TableCell className="font-medium">
                    {formatPrice(order.totalAmount)}
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      {order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}
                      {order.prescriptionRequired && (
                        <div className="text-xs text-amber-600">• Prescription Required</div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      {formatDate(order.createdAt)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}