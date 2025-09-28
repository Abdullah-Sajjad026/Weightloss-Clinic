import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Northampton Clinic",
  description: "Privacy policy for Northampton Clinic - how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At Northampton Clinic, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Name, email address, phone number, and postal address</li>
              <li>Date of birth and gender</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Medical history and health information relevant to treatment</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>IP address, browser type, and device information</li>
              <li>Website usage data and cookies</li>
              <li>Login credentials and authentication data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide medical consultations and treatment services</li>
              <li>Process payments and manage your account</li>
              <li>Send appointment reminders and follow-up communications</li>
              <li>Improve our services and website functionality</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Healthcare professionals involved in your treatment</li>
              <li>Pharmacy partners for medication delivery</li>
              <li>Payment processors (Stripe) for transaction processing</li>
              <li>Regulatory authorities when legally required</li>
              <li>Service providers who assist with our operations (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, 
              access controls, and regular security assessments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibent text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Under UK data protection laws, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Object to processing or request restriction</li>
              <li>Data portability</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, 
              and personalize content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with 
              legal obligations. Medical records are retained in accordance with healthcare regulations and professional guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise your data protection rights, 
              please contact us at{" "}
              <a href="mailto:privacy@northamptonclinic.co.uk" className="text-primary-600 hover:text-primary-700">
                privacy@northamptonclinic.co.uk
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