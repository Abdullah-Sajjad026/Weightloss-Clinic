"use client";

import { useState } from "react";
import { AppointmentBookingForm } from "@/components/appointment-booking-form";
import { type AppointmentFormData } from "@/lib/validations/appointment";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Note: Metadata for client components should be defined in layout.tsx or parent server component

export default function BookAppointmentPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] =
    useState<AppointmentFormData | null>(null);

  const handleSubmit = async (data: AppointmentFormData) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmittedData(data);
        setIsSubmitted(true);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to submit appointment request");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("Failed to submit appointment request. Please try again.");
    }
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Booking Request Submitted!
                </h1>
                <p className="text-gray-600 max-w-md">
                  Thank you! Your appointment request has been received. Our team 
                  will contact you within 24 hours to confirm your consultation 
                  and provide video call details.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full max-w-md">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    What's Next?
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                      • We'll call you to confirm your preferred date and time
                    </li>
                    <li>
                      • You'll receive an email with video call instructions
                    </li>
                    <li>• Have your medical history and questions ready</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Schedule Your Video Consultation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book a convenient time to speak with our medical professionals about
            your weight loss journey. All consultations are conducted via secure
            video calls.
          </p>
        </div>
        <AppointmentBookingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
