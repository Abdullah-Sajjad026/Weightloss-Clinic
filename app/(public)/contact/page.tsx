import { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Northampton Clinic",
  description:
    "Get in touch with Northampton Clinic powered by Regent Pharmacy. We're here to help with your weight loss journey and answer any questions you may have.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help you on your weight loss journey. Get in touch
            with our team of healthcare professionals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-600 mb-2">01604250734</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600 mb-2">regent.pharmacy@nhs.net</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Address
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Regent Pharmacy
                    <br />
                    Premier Stores, 10-11 Regent Square
                    <br />
                    Northampton, NN1 2NQ
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <a
                  href="/assessment"
                  className="block w-full px-6 py-3 bg-primary-600 text-white text-center font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Start Your Assessment
                </a>
                <a
                  href="/book-appointment"
                  className="block w-full px-6 py-3 border border-primary-600 text-primary-600 text-center font-medium rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Book an Appointment
                </a>
                <a
                  href="/orders/track"
                  className="block w-full px-6 py-3 border border-gray-300 text-gray-700 text-center font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Track Your Order
                </a>
                <a
                  href="https://theregentpharmacy.com/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 border border-gray-300 text-gray-700 text-center font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Regent Pharmacy Contact
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form or Additional Info can be added here later */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center h-max">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Need More Information?
            </h2>
            <p className="text-gray-600 mb-6">
              Our team is ready to help you with any questions about our weight
              loss treatments and services.
            </p>
            <a
              href="https://theregentpharmacy.com/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
            >
              Visit Regent Pharmacy Contact
            </a>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-primary-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Don't wait to start your weight loss journey. Our medical team is
            ready to help you achieve your goals with personalized care and
            proven treatments.
          </p>
          <a
            href="/assessment"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Check Your Eligibility Now
          </a>
        </div>
      </div>
    </div>
  );
}
