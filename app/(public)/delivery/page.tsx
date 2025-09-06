import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, MapPin, Shield, Package, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Delivery - Weight Loss Treatments",
  description: "Fast, free, and discreet delivery for your weight loss treatments. Learn about our delivery areas, timeframes, and tracking options.",
  keywords: ["delivery", "weight loss", "Northampton", "free shipping", "medication delivery"],
  openGraph: {
    title: "Free Delivery - Northampton Clinic",
    description: "Fast, free, and discreet delivery for your weight loss treatments across the UK.",
  },
};

export default function DeliveryPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 rounded-full">
              <Truck className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free, Fast & Discreet Delivery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your weight loss treatments delivered safely and securely to your door across the UK
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">100% Free</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">No delivery charges on any orders. Free shipping across the UK.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Fast Delivery</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Next working day delivery available. Express options for urgent orders.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Discreet Packaging</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Plain, unmarked packaging to protect your privacy and confidentiality.</p>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Information */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-600" />
                Delivery Areas
              </CardTitle>
              <CardDescription>
                We deliver across the United Kingdom
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2">Mainland UK</Badge>
                <p className="text-sm text-gray-600">
                  England, Scotland, Wales - Standard delivery included
                </p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Northern Ireland</Badge>
                <p className="text-sm text-gray-600">
                  Available with extended delivery times
                </p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Remote Areas</Badge>
                <p className="text-sm text-gray-600">
                  Scottish Highlands and Islands may require additional time
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" />
                Delivery Timeframes
              </CardTitle>
              <CardDescription>
                Estimated delivery times across the UK
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Standard Delivery</span>
                <Badge>2-3 working days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Express Delivery</span>
                <Badge variant="secondary">Next working day</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Remote Areas</span>
                <Badge variant="outline">3-5 working days</Badge>
              </div>
              <p className="text-sm text-gray-600 pt-2">
                *Orders placed before 2pm on working days are dispatched the same day
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Order Tracking */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Track Your Order</CardTitle>
            <CardDescription className="text-center">
              Stay updated with real-time delivery tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">1</span>
                </div>
                <h4 className="font-medium">Order Confirmed</h4>
                <p className="text-sm text-gray-600">Prescription reviewed</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">2</span>
                </div>
                <h4 className="font-medium">Prepared</h4>
                <p className="text-sm text-gray-600">Order packed securely</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">3</span>
                </div>
                <h4 className="font-medium">Dispatched</h4>
                <p className="text-sm text-gray-600">Out for delivery</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">4</span>
                </div>
                <h4 className="font-medium">Delivered</h4>
                <p className="text-sm text-gray-600">Safe and secure</p>
              </div>
            </div>
            <div className="text-center pt-4">
              <Button asChild>
                <Link href="/orders/track">Track Your Order</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Safety & Security */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Safety & Security</CardTitle>
            <CardDescription>
              Your medication safety is our top priority
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Temperature Controlled</h4>
                <p className="text-sm text-gray-600">
                  Specialized packaging maintains optimal temperature during transit for medication integrity.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Secure Packaging</h4>
                <p className="text-sm text-gray-600">
                  Tamper-evident packaging ensures your medication arrives safely and securely.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Signature Required</h4>
                <p className="text-sm text-gray-600">
                  Prescription medications require signature on delivery to ensure safe receipt.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Insured Delivery</h4>
                <p className="text-sm text-gray-600">
                  All deliveries are fully insured against loss or damage during transit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary-600" />
              Delivery Support
            </CardTitle>
            <CardDescription>
              Need help with your delivery? We're here to help
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Contact Regent Pharmacy</h4>
                <p className="text-sm text-gray-600 mb-2">
                  For delivery queries and support:
                </p>
                <div className="space-y-1">
                  <p className="text-sm">
                    <strong>Phone:</strong> <Link href="tel:01604250734" className="text-primary-600 hover:underline">01604 250734</Link>
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> <Link href="mailto:regent.pharmacy@nhs.net" className="text-primary-600 hover:underline">regent.pharmacy@nhs.net</Link>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Delivery Address</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Premier Stores</p>
                  <p>10-11 Regent Square</p>
                  <p>Northampton, NN1 2NQ</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM. Weekend delivery not available.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}