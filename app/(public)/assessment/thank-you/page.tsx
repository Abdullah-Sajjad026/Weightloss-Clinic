import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Assessment Submitted Successfully
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for completing your medical risk assessment
          </p>
        </div>

        {/* What Happens Next Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-600" />
              What Happens Next
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    1
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Medical Review</h3>
                <p className="text-sm text-gray-600">
                  Our qualified medical team will review your assessment within
                  24-48 hours
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    2
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Personal Contact</h3>
                <p className="text-sm text-gray-600">
                  We'll contact you via phone or email to discuss your results
                  and next steps
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    3
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Treatment Plan</h3>
                <p className="text-sm text-gray-600">
                  If approved, we'll create a personalized weight loss plan
                  tailored to your needs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Questions or Concerns?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              If you have any questions about your assessment or need to update
              any information, please don't hesitate to contact us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary-600" />
                <span className="font-medium">Phone:</span>
                <a
                  href="tel:01234567890"
                  className="text-primary-600 hover:underline"
                >
                  01234 567 890
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary-600" />
                <span className="font-medium">Email:</span>
                <a
                  href="mailto:contact@northamptonclinic.co.uk"
                  className="text-primary-600 hover:underline"
                >
                  contact@northamptonclinic.co.uk
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-medium text-blue-900 mb-2">
              Important Information
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Please check your email (including spam folder) for updates
              </li>
              <li>
                • Keep your phone available during business hours for our call
              </li>
              <li>• Your assessment is confidential and secure</li>
              <li>
                • Response times may be longer during weekends and holidays
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="min-w-[150px]">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild className="min-w-[150px]">
            <Link href="/book-appointment">Book Consultation</Link>
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Assessment Reference: #
            {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
