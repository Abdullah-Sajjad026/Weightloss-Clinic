import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { SpotlightSVG } from "./spotlight";
import { WeightLossCalculator } from "@/components/weight-loss-calculator";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="w-full px-3 sm:px-6 -mt-6 sm:-mt-2">
      <div className="bg-primary-200 bg-gradient-to-b from-white via-primary/10 via-90% to-primary/20 ring-primary/30 shadow-xl shadow-primary/10 ring-1 inset-ring inset-ring-white/40 rounded-[2.5rem]">
        <div className="bg-primary-800 ring-primary-500/20 bg-auto ring-1 bg-blend-overlay ring-inset items-start text-left rounded-4xl flex w-full flex-col px-4 lg:p-10 relative overflow-hidden py-4 hero-gradient">
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="opacity-30 text-white h-full w-full"
          />
          <div className="opacity-50 lg:opacity-70">
            <SpotlightSVG />
          </div>
          <div className="z-20 mx-auto grid w-full max-w-[1600px] grid-cols-1 flex-wrap items-center justify-center gap-6 xl:grid-cols-[1fr_745px] xl:flex-row xl:justify-between 2xl:grid-cols-[1fr_790px]">
            <div className="z-10 mb-4 flex h-full w-full items-center justify-center xl:mb-0">
              <div className="w-full max-w-[600px] flex-col items-center gap-4 p-4 sm:gap-8">
                <div className="prose block w-full text-center text-balance xl:text-left">
                  <h2 className="mb-6 text-4xl font-semibold tracking-tight text-white text-shadow-md sm:text-5xl 2xl:text-6xl">
                    Achieve 26% weight loss without surgery
                  </h2>
                  <p className="text-primary-foreground text-base text-shadow-sm sm:text-lg md:text-xl/8">
                    People in Northampton are losing around 26% of their body
                    weight with our breakthrough weight loss medication. Enter
                    your height and weight and find out how much you could lose.
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-center gap-5 xl:justify-start">
                  <Link href="/book-appointment">
                    <Button variant="orange" size="lg">
                      Book Appointment
                    </Button>
                  </Link>
                  <Link href="/assessment">
                    <Button variant="outline" size="lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 text-center xl:text-left">
                  <div className="text-primary-foreground text-base font-medium text-shadow-sm">
                    from £45/week
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full items-center justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <WeightLossCalculator />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center justify-evenly gap-3 px-6 py-2 lg:grid-cols-2 lg:py-1">
          <OfficialRegentPharmacyLogo />
          <div className="mt-3 hidden justify-center md:mb-2 md:flex lg:mt-0 lg:mb-0">
            <FreeOnlineYogaLogo />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FreeOnlineYogaLogo() {
  return (
    <div className="text-primary/90 flex items-center justify-center gap-2 text-base font-medium opacity-100 transition hover:opacity-80 lg:text-lg">
      <svg
        className="text-primary/80 size-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      Free Online Yoga Class (Weekly)
    </div>
  );
}

export function OfficialRegentPharmacyLogo() {
  return (
    <div className="text-primary-800 flex items-center justify-center px-5 py-2.5 text-base font-medium lg:text-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
      >
        <path
          d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <div>Powered by</div>
      <a
        className="opacity-100 transition hover:opacity-80"
        aria-label="Regent Pharmacy"
        href="/assessment"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-6 mx-2"
          fill="none"
        >
          <path
            d="M3 3h18v18H3V3z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 12h8M12 8v8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-semibold">Regent Pharmacy</span>
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        transform="matrix(-1,0,0,1,0,0)"
      >
        <path
          d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}