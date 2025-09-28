import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Northampton Clinic",
  description: "Terms of service for Northampton Clinic weight loss services and medications.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Northampton Clinic. These Terms of Service ("Terms") govern your use of our website and services. 
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Medical Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Northampton Clinic provides weight loss consultation and treatment services. All treatments are 
              prescription-only medicines that require a valid consultation with our licensed healthcare professionals.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You must be 18 years or older to use our services</li>
              <li>You must provide accurate and complete medical information</li>
              <li>All prescriptions are subject to clinical approval</li>
              <li>Follow all treatment instructions and attend required appointments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Online Consultations</h2>
            <p className="text-gray-700 leading-relaxed">
              Our online consultation process includes assessment forms and video appointments with qualified healthcare professionals. 
              You agree to provide honest and accurate information about your health, medical history, and current medications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment and Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment is required before treatment commencement. We accept major credit cards and process payments securely through Stripe.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All prices are displayed inclusive of VAT where applicable</li>
              <li>Refunds may be available if treatment is not clinically approved</li>
              <li>Subscription services can be cancelled with appropriate notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to protecting your privacy and handling your personal data in accordance with UK data protection laws. 
              Please see our Privacy Policy for detailed information about how we collect, use, and protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitations of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              While we provide professional medical services, individual results may vary. We are not liable for any 
              indirect, incidental, or consequential damages arising from the use of our services, except where prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:hello@northamptonclinic.co.uk" className="text-primary-600 hover:text-primary-700">
                hello@northamptonclinic.co.uk
              </a>
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-500 mt-8">
              Last updated: {new Date().toLocaleDateString('en-GB')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}