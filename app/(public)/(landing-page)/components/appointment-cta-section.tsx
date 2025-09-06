import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AppointmentCTASection() {
  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="bg-primary-600 ring-primary-500/20 bg-gradient-to-br from-primary-500 to-primary-700 ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="mx-auto mt-2 text-center text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Ready to start your weight loss journey?
          </h2>
          <p className="mt-6 text-lg text-primary-100 text-balance lg:text-xl">
            Join hundreds of people who have already transformed their lives
            with our proven weight loss solutions. Book your consultation today
            and take the first step towards achieving your weight loss goals.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book-appointment">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-700 px-8 py-3 text-lg font-semibold w-full sm:w-auto"
              >
                Book Your Consultation
              </Button>
            </Link>
            <Link href="/assessment">
              <Button
                variant="outline"
                size="lg"
                className="border-white px-8 py-3 text-lg font-semibold w-full sm:w-auto"
              >
                Check Eligibility First
              </Button>
            </Link>
          </div>

          <div className="mt-6 text-primary-100 text-sm">
            ✓ Free consultation • ✓ Medical advice • ✓ Personalized treatment
            plan
          </div>
        </div>
      </div>
    </section>
  );
}
