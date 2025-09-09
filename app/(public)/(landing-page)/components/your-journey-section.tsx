"use client";

import { Badge } from "@/components/ui/badge";
import PageSectionTitle from "@/components/ui/page-section-title";

const QuoteIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 162 128"
    aria-hidden="true"
    className="lg:fill-primary-300 fill-primary-300/60 absolute top-0 -left-7 -z-10 h-7 lg:-left-11"
  >
    <path
      d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
      id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
    ></path>
    <use x="86" href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"></use>
  </svg>
);

interface TimelineStepProps {
  period: string;
  title: string;
  badge: string;
  points: string[];
  testimonial: {
    quote: string;
    name: string;
    detail: string;
    avatar?: string;
  };
  hideAvatar?: boolean;
}

const TimelineStep = ({
  period,
  badge,
  points,
  testimonial,
  hideAvatar = false,
}: TimelineStepProps) => (
  <div className="flex justify-start pt-10 md:gap-3 md:pt-16">
    {/* Timeline marker and title */}
    <div className="sticky top-50 z-30 flex max-w-xs flex-col items-start self-start md:w-full md:flex-row lg:max-w-sm">
      <div className="bg-primary-50 absolute -left-[7px] flex h-10 w-10 items-center justify-center rounded-full md:left-3">
        <div className="bg-primary-500 from-primary-500 to-primary-700 size-5 rounded-full bg-gradient-to-br p-1 shadow-lg ring shadow-primary-50/20 ring-zinc-900/10 ring-white/30">
          <div className="bg-primary-600 to-primary-500 from-primary-700 size-full rounded-full bg-gradient-to-br shadow-primary-600/20 ring-primary-800/10"></div>
        </div>
      </div>
      <div className="hidden flex-col items-start gap-4 md:flex md:pl-20">
        <h3 className="text-primary-700 text-xl font-semibold md:text-4xl">
          {period}
        </h3>
        <Badge className="from-primary-50 to-primary-200 text-primary-900 ring-primary-900/10 rounded-full bg-gradient-to-br px-4 py-1 font-medium shadow ring border-0">
          {badge}
        </Badge>
      </div>
    </div>

    {/* Content */}
    <div className="relative w-full pr-4 pl-10 md:pl-4">
      <h3 className="text-primary-700 mb-4 block text-left text-2xl font-semibold md:hidden">
        {period}
      </h3>
      <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring ring-zinc-900/10 lg:rounded-5xl">
        {/* Benefits list */}
        <div className="prose z-10 rounded-3xl bg-white p-5 text-base shadow-md ring shadow-zinc-900/5 ring-zinc-900/10 lg:p-6 lg:rounded-5xl">
          <ul className="space-y-2">
            {points.map((point, index) => (
              <li key={index} className="text-zinc-700">
                {point.includes("simple online assessment") ? (
                  <>
                    Take our{" "}
                    <a
                      href="/assessment"
                      className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
                    >
                      simple online assessment
                    </a>{" "}
                    to see if you're eligible.
                  </>
                ) : (
                  point
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="from-primary-200 to-primary-50 z-0 -mt-10 w-full bg-gradient-to-tl p-4 pt-14 shadow-white/40 ring-white/40 lg:p-6 lg:pt-16">
          <div
            className={`flex items-start gap-8 lg:gap-12 ${
              hideAvatar ? "justify-center pl-7 lg:pl-14" : ""
            }`}
          >
            {!hideAvatar && (
              <div className="">
                <div className="from-primary-500 to-secondary-500 aspect-square size-20 cursor-pointer rounded-full bg-gradient-to-br p-1 transition-transform hover:scale-105 active:scale-95 xl:size-30">
                  <div className="size-full rounded-full bg-zinc-100 p-1">
                    <div className="shadow-primary-500/20 size-full rounded-full bg-gray-300 bg-cover bg-center shadow-2xl ring ring-white/60">
                      {/* Placeholder for avatar image */}
                      <div className="size-full rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="relative flex w-full flex-col gap-3">
              <QuoteIcon />
              <div className="text-md max-w-md text-balance text-zinc-700 md:text-xl lg:text-2xl">
                {testimonial.quote}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-primary-800 font-medium">
                  {testimonial.name}
                </div>
                <div className="text-xs text-zinc-900 sm:text-sm">
                  {testimonial.detail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function YourJourneySection() {
  const timelineSteps: TimelineStepProps[] = [
    {
      period: "Today",
      title: "Today",
      badge: "Quick and easy",
      points: [
        "Complete a comprehensive health assessment with our pharmacy team.",
        "Start your medically-supervised weight loss program with home delivery.",
        "Most patients see initial results within the first few weeks of treatment.",
      ],
      testimonial: {
        quote: "Starting my weight loss journey was the best decision I've made.",
        name: "Sarah M.",
        detail: "Northampton resident, lost 32 lbs in 3 months",
      },
    },
    {
      period: "1-6 Months",
      title: "1-6 Months",
      badge: "Lose up to 14% body weight",
      points: [
        "Receive ongoing support from our pharmacy team to develop healthy habits.",
        "Experience improved energy levels, better sleep, and increased confidence.",
        "Most patients achieve significant weight reduction within the first 6 months.",
      ],
      testimonial: {
        quote:
          "My relationship with food has completely changed. I feel in control for the first time.",
        name: "Emma R.",
        detail: "15 weeks into Regent Pharmacy's weight management program",
      },
    },
    {
      period: "6-12 Months",
      title: "6-12 Months",
      badge: "Build habits for life",
      points: [
        "Achieve long-term weight management goals with medical supervision.",
        "Learn sustainable lifestyle changes that last beyond medication treatment.",
      ],
      testimonial: {
        quote:
          "I've transformed my entire lifestyle. Lost over 70 lbs and now I'm training for my first marathon!",
        name: "David P.",
        detail: "Long-term patient success story",
      },
      hideAvatar: true,
    },
  ];

  return (
    <section className="px-4 w-full max-w-7xl mx-auto">
      <PageSectionTitle
        smallText="What to expect"
        largeText="Your journey to lasting weight loss"
      />

      {/* Timeline */}
      <div className="relative mx-auto max-w-[68rem] pb-20">
        {timelineSteps.map((step, index) => (
          <TimelineStep key={index} {...step} />
        ))}

        {/* Timeline line */}
        <div
          className="absolute top-[97px] left-3 w-[2px] overflow-hidden bg-gradient-to-b from-transparent from-0% via-neutral-200 to-transparent to-99% [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
          style={{ height: "1111px" }}
        >
          <div className="inset-x-0 h-full bg-zinc-200"></div>
        </div>
      </div>
    </section>
  );
}
