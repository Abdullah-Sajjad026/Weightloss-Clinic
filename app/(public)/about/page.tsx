import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Northampton Clinic",
  description: "Learn about Northampton Clinic, powered by Regent Pharmacy. We provide professional weight loss treatments and comprehensive support for your health journey.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About Northampton Clinic
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powered by Regent Pharmacy, we're dedicated to helping you achieve your weight loss goals with professional medical support.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-4">
              Northampton Clinic is powered by Regent Pharmacy, a trusted healthcare provider committed to delivering exceptional weight loss treatments and comprehensive patient care. We understand that weight loss is a personal journey, and we're here to support you every step of the way.
            </p>
            <p className="text-gray-700 mb-4">
              Our team of qualified healthcare professionals provides personalized treatment plans using the latest evidence-based weight loss medications and therapies. We combine medical expertise with compassionate care to help you achieve lasting results.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Our mission is to make effective weight loss treatments accessible to everyone who needs them. We believe that with the right medical support, guidance, and community, anyone can achieve their health and wellness goals.
            </p>
            <p className="text-gray-700 mb-4">
              We're committed to providing:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Professional medical consultations and ongoing support</li>
              <li>Access to proven weight loss medications like Mounjaro and Wegovy</li>
              <li>Comprehensive treatment plans tailored to your needs</li>
              <li>A supportive community to help you stay motivated</li>
              <li>Transparent pricing and exceptional customer service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Excellence</h3>
                <p className="text-gray-700">
                  All our treatments are overseen by qualified medical professionals who ensure your safety and success throughout your weight loss journey.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Care</h3>
                <p className="text-gray-700">
                  We create individual treatment plans based on your unique needs, medical history, and weight loss goals.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ongoing Support</h3>
                <p className="text-gray-700">
                  Our support doesn't end with your prescription. We provide continuous guidance and monitoring to ensure your success.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-700">
                  Join our supportive community of individuals on similar journeys, sharing experiences and celebrating successes together.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Partnership</h2>
            <p className="text-gray-700 mb-4">
              Northampton Clinic is powered by Regent Pharmacy, ensuring that you receive:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>GPhC registered medical practitioners for all consultations</li>
              <li>Licensed pharmacy services for medication dispensing</li>
              <li>Secure and professional medical care</li>
              <li>Compliance with all UK healthcare regulations</li>
            </ul>
          </section>

          <section className="bg-primary-50 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
            <p className="text-gray-700 mb-6">
              Take the first step towards a healthier, happier you. Our medical team is ready to assess your eligibility and create a personalized treatment plan just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/assessment"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Check Your Eligibility
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="https://theregentpharmacy.com/about-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50 transition-colors"
              >
                About Regent Pharmacy
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}