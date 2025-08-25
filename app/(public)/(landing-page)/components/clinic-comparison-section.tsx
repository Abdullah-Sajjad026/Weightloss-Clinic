import { Check, X, CircleHelp } from "lucide-react";

const comparisonFeatures = [
  {
    feature: "Weight loss medication",
    clinic: "check",
    pharmacy: "check",
  },
  {
    feature: "Clinical support included",
    clinic: "check",
    pharmacy: "check",
  },
  {
    feature: "Prices starting from",
    clinic: "£179 (Save £30)",
    pharmacy: "£219",
  },
  {
    feature: "Supportive WhatsApp community",
    clinic: "check",
    pharmacy: "x",
  },
  {
    feature: "Personal health coach",
    clinic: "check",
    pharmacy: "x",
  },
  {
    feature: "Behaviour change toolkit",
    clinic: "check",
    pharmacy: "x",
  },
  {
    feature: "Medication guarantee",
    clinic: "check",
    pharmacy: "x",
  },
  {
    feature: "Money back guarantee",
    clinic: "check",
    pharmacy: "x",
  },
];

export default function CLinicComparisonSection() {
  return (
    <div className="ring-primary-500/20 bg-transparent items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10 -mt-20">
      {/* Header */}
      <div className="z-20 mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-primary-600 text-center text-base/7 font-semibold">
          Comparison
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          How we're different
        </p>
        <p className="mt-4 mb-6 max-w-(--breakpoint-sm) lg:text-lg prose text-balance">
          DigitalClinicSystem offers more than just weight loss
          medication. We've partnered with Medicspot to offer a science-backed
          weight loss programme. See how we compare to a typical high street
          pharmacy.
        </p>
      </div>

      {/* Background blur effect */}
      <div className="bg-primary-50 sticky top-10 z-10 -mt-24 h-[9.3rem] w-[calc(100%+24px)] rounded-2xl blur-sm lg:-ml-8 lg:w-[108%] lg:rounded-none lg:blur-none"></div>

      {/* Sticky Header */}
      <div className="sticky top-32 z-20 mb-px ml-auto flex h-[60px] w-full gap-px rounded-2xl rounded-t-2xl text-center text-balance shadow-xl lg:w-2/3 lg:shadow-black/5">
        <div className="bg-primary-200 from-primary-200 font-roca to-primary-300 text-primary-950 relative z-10 flex w-full items-center justify-center rounded-l-2xl bg-linear-to-t px-3 py-4 text-sm leading-5 font-medium ring-1 ring-gray-900/10 select-none md:text-lg lg:rounded-t-2xl lg:rounded-b-none">
          <span className="translate-y-1">DigitalClinicSystem</span>
          <div className="absolute top-0 left-0 h-full w-full rounded-l-2xl inset-ring inset-ring-white/70 lg:rounded-t-2xl lg:rounded-b-none"></div>
        </div>
        <div className="flex w-full items-center justify-center rounded-r-2xl bg-gray-200 px-3 py-4 text-sm font-medium text-gray-700 ring-1 ring-gray-900/10 lg:rounded-t-2xl lg:rounded-b-none lg:text-base">
          High Street Pharmacy
        </div>
      </div>

      {/* Comparison Table */}
      <div className="relative grid w-full gap-px rounded-b-2xl text-center shadow-zinc-700/10 ring-gray-900/10 lg:grid-cols-3 lg:rounded-tl-2xl lg:shadow-xl lg:ring-1 lg:before:absolute lg:before:top-0 lg:before:left-0 lg:before:-z-10 lg:before:h-full lg:before:w-full lg:before:rounded-2xl lg:before:bg-gray-900/10">
        {comparisonFeatures.map((item, index) => (
          <div key={index} className="contents">
            {/* Feature Name */}
            <div
              className={`bg-primary-50 flex justify-center gap-1 px-3 pt-8 pb-2 text-pretty lg:justify-start lg:bg-white lg:px-3 lg:py-4 lg:text-left ${
                index === 0 ? "lg:rounded-tl-2xl" : ""
              } ${
                index === comparisonFeatures.length - 1
                  ? "lg:rounded-bl-2xl"
                  : ""
              }`}
            >
              <span className="flex items-center font-medium">
                {item.feature}
                <button data-state="closed" className="" aria-label="Info">
                  <CircleHelp className="ml-1 size-4 text-zinc-400" />
                </button>
              </span>
            </div>

            {/* Comparison Values - Mobile Layout */}
            <div className="relative grid w-full grid-cols-2 gap-px overflow-hidden rounded-xl shadow ring-1 ring-gray-900/10 before:absolute before:top-0 before:left-0 before:-z-10 before:h-full before:w-full before:rounded-xl before:bg-gray-900/10 lg:contents lg:shadow-none lg:before:hidden">
              {/* Clinic Column */}
              <div className="bg-primary-100 flex items-center justify-center px-3 py-4">
                {item.clinic === "check" ? (
                  <Check className="text-primary-700 w-5" />
                ) : (
                  <span className="text-primary-700 font-medium">
                    {item.clinic}
                  </span>
                )}
              </div>

              {/* Pharmacy Column */}
              <div
                className={`flex items-center justify-center bg-gray-100 px-3 py-4 ${
                  index === comparisonFeatures.length - 1
                    ? "lg:rounded-br-2xl lg:rounded-bl-none"
                    : ""
                }`}
              >
                {item.pharmacy === "check" ? (
                  <Check className="w-5 text-gray-500" />
                ) : item.pharmacy === "x" ? (
                  <X className="w-5 text-gray-500" />
                ) : (
                  <span className="text-gray-500">{item.pharmacy}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
