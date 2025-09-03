import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductCTAProps {
  productName: string;
}

export function ProductCTA({ productName }: ProductCTAProps) {
  return (
    <section className="mx-auto px-4 max-w-7xl w-full">
      <div className="bg-primary-600 ring-primary-500/20 bg-[url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&crop=center&auto=format&q=30)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="mx-auto mt-2 text-center text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            Ready to start {productName}?
          </h2>
          <p className="mt-6 text-lg text-primary-100 text-balance lg:text-xl">
            Take the first step towards your weight loss goals. Book a consultation with our medical team to discuss if {productName} is right for you.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book-appointment">
              <Button 
                size="lg" 
                className="bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-700 px-8 py-3 text-lg font-semibold w-full sm:w-auto"
              >
                Book Consultation
              </Button>
            </Link>
            <Link href="/assessment">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg font-semibold w-full sm:w-auto"
              >
                Check Eligibility
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 text-primary-100 text-sm">
            ✓ Medical guidance • ✓ Personalized treatment plan • ✓ Ongoing support
          </div>
        </div>
      </div>
    </section>
  );
}