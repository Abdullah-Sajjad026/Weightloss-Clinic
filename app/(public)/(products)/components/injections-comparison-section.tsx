import Link from "next/link";
import { Check, X } from "lucide-react";

const injectionData = [
  {
    id: "mounjaro",
    name: "Mounjaro",
    subtitle: "Also known as tirzepatide",
    href: "/injections/mounjaro",
    featured: true,
    generalInfo: {
      startingFrom: "£45/week",
      expectedWeightLoss: "26%",
      frequency: "Once weekly",
      eligibility: "BMI over 30*",
      easyToAdminister: true,
      inStock: true,
      freeDelivery: true,
    },
    sideEffects: {
      nausea: "Very common",
      diarrhoea: "Very common",
      vomiting: "Very common",
      constipation: "Very common",
      headache: "Common",
      upsetStomach: "Common",
      feelingWeakOrTired: "Common",
      dizziness: "Common",
      refluxOrHeartburn: "Common",
      gas: "Common",
      injectionSiteReaction: "Common",
      allergicReaction: "Common",
      gallstones: "Uncommon",
      hairLoss: "Common",
      poorSleep: false,
      increasedCalcitoninLevels: "Uncommon",
      inflamedGallbladder: "Uncommon",
      delayInEmptyingStomach: false,
      acutePancreatitis: "Uncommon",
      severeAllergicReaction: "Rare",
      reducedKidneyFunction: false,
    },
  },
  {
    id: "wegovy",
    name: "Wegovy",
    subtitle: "Also known as semaglutide",
    href: "/injections/wegovy",
    featured: false,
    generalInfo: {
      startingFrom: "£45/week",
      expectedWeightLoss: "15%",
      frequency: "Once weekly",
      eligibility: "BMI over 30*",
      easyToAdminister: true,
      inStock: true,
      freeDelivery: true,
    },
    sideEffects: {
      nausea: "Very common",
      diarrhoea: "Very common",
      vomiting: "Very common",
      constipation: "Very common",
      headache: "Very common",
      upsetStomach: "Very common",
      feelingWeakOrTired: "Very common",
      dizziness: "Common",
      refluxOrHeartburn: "Common",
      gas: "Common",
      injectionSiteReaction: "Common",
      allergicReaction: "Common",
      gallstones: "Common",
      hairLoss: "Common",
      poorSleep: false,
      increasedCalcitoninLevels: false,
      inflamedGallbladder: false,
      delayInEmptyingStomach: false,
      acutePancreatitis: "Uncommon",
      severeAllergicReaction: "Rare",
      reducedKidneyFunction: false,
    },
  },
];

const generalInfoFields = [
  { key: "startingFrom" as const, label: "Starting from" },
  { key: "expectedWeightLoss" as const, label: "Expected weight loss" },
  { key: "frequency" as const, label: "Frequency" },
  { key: "eligibility" as const, label: "Eligibility" },
  { key: "easyToAdminister" as const, label: "Easy to administer" },
  { key: "inStock" as const, label: "In stock" },
  { key: "freeDelivery" as const, label: "Free delivery" },
];

const sideEffectFields = [
  { key: "nausea" as const, label: "Nausea" },
  { key: "diarrhoea" as const, label: "Diarrhoea" },
  { key: "vomiting" as const, label: "Vomiting" },
  { key: "constipation" as const, label: "Constipation" },
  { key: "headache" as const, label: "Headache" },
  { key: "upsetStomach" as const, label: "Upset stomach" },
  { key: "feelingWeakOrTired" as const, label: "Feeling weak or tired" },
  { key: "dizziness" as const, label: "Dizziness" },
  { key: "refluxOrHeartburn" as const, label: "Reflux or heartburn" },
  { key: "gas" as const, label: "Gas" },
  { key: "injectionSiteReaction" as const, label: "Injection site reaction" },
  { key: "allergicReaction" as const, label: "Allergic reaction" },
  { key: "gallstones" as const, label: "Gallstones" },
  { key: "hairLoss" as const, label: "Hair loss" },
  { key: "poorSleep" as const, label: "Poor sleep" },
  {
    key: "increasedCalcitoninLevels" as const,
    label: "Increased calcitonin levels",
  },
  {
    key: "inflamedGallbladder" as const,
    label: "Inflamed gallbladder (cholecystitis)",
  },
  {
    key: "delayInEmptyingStomach" as const,
    label: "Delay in emptying stomach",
  },
  { key: "acutePancreatitis" as const, label: "Acute pancreatitis" },
  { key: "severeAllergicReaction" as const, label: "Severe allergic reaction" },
  { key: "reducedKidneyFunction" as const, label: "Reduced kidney function" },
];

function renderValue(value: string | boolean, featured: boolean = false) {
  if (typeof value === "boolean") {
    return value ? (
      <>
        <Check className="mx-auto h-5 w-5 text-primary-600" />
        <span className="sr-only">Yes</span>
      </>
    ) : (
      <>
        <X className="mx-auto h-5 w-5 text-zinc-400" />
        <span className="sr-only">No</span>
      </>
    );
  }

  return (
    <span
      className={
        featured
          ? "font-semibold text-primary-600 text-balance text-sm"
          : "text-zinc-900 text-balance text-sm"
      }
    >
      {value}
    </span>
  );
}

export function InjectionsComparisonSection() {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-zinc-50 to-white ring-zinc-500/20 ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10 relative overflow-hidden">
      {/* Background decoration with product images */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[url('/products/mounjaro-pen-1.webp')] bg-contain bg-no-repeat bg-center"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-[url('/products/wegovy-pens.webp')] bg-contain bg-no-repeat bg-center"></div>
      </div>
      <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl text-zinc-950">
        Weight loss injections comparison
      </h2>
      <p className="mt-4 max-w-(--breakpoint-sm) text-balance mb-0 max-w-(--breakpoint-sm) text-sm text-zinc-700 lg:text-base">
        We offer the best weight loss injections at Northampton Weightloss (Powered by Regent Pharmacy). Here
        are the key differences in effectiveness, how to take them, common side
        effects, and who they can be prescribed to, helping you make an informed
        decision about which treatment is right for you.
      </p>

      <div className="relative w-full text-left">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Mobile View */}
          <section
            aria-labelledby="mobile-comparison-heading"
            className="lg:hidden"
          >
            <h2 id="mobile-comparison-heading" className="sr-only">
              Feature comparison
            </h2>
            <div className="mx-auto max-w-2xl space-y-16">
              {injectionData.map((injection) => (
                <div key={injection.id} className="border-t border-zinc-900/10">
                  <div className="-mt-px w-72 pt-10 md:w-80">
                    <h3
                      className={
                        injection.featured
                          ? "text-primary-600 text-sm font-semibold leading-6"
                          : "text-zinc-900 text-sm font-semibold leading-6"
                      }
                    >
                      {injection.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                      {injection.subtitle}
                    </p>
                  </div>

                  <div className="mt-10 space-y-10">
                    {/* General Info */}
                    <div>
                      <div className="relative mt-6">
                        <div
                          aria-hidden="true"
                          className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-xs sm:block"
                        ></div>
                        <div
                          className={`relative rounded-lg bg-white shadow-xs sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0 ${
                            injection.featured
                              ? "ring-2 ring-primary-600"
                              : "ring-1 ring-zinc-900/10"
                          }`}
                        >
                          <dl className="divide-y divide-zinc-200 text-sm leading-6">
                            {generalInfoFields.map((field) => (
                              <div
                                key={field.key}
                                className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                              >
                                <dt className="pr-4 text-zinc-600">
                                  {field.label}
                                </dt>
                                <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                  {renderValue(
                                    injection.generalInfo[field.key],
                                    injection.featured
                                  )}
                                </dd>
                              </div>
                            ))}
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-zinc-600"></dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <Link
                                  className={
                                    injection.featured
                                      ? "bg-primary-600 text-white shadow-primary-800/10 hover:bg-primary-700 hover:shadow-sm block w-full rounded-md px-4 py-2 text-sm font-medium"
                                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-800 block w-full rounded-md px-4 py-2 text-sm font-medium"
                                  }
                                  href={injection.href}
                                >
                                  Learn more
                                </Link>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>

                    {/* Side Effects */}
                    <div>
                      <h4 className="text-sm font-semibold leading-6 text-zinc-900">
                        Potential side effects
                      </h4>
                      <div className="relative mt-6">
                        <div
                          aria-hidden="true"
                          className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-xs sm:block"
                        ></div>
                        <div
                          className={`relative rounded-lg bg-white shadow-xs sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0 ${
                            injection.featured
                              ? "ring-2 ring-primary-600"
                              : "ring-1 ring-zinc-900/10"
                          }`}
                        >
                          <dl className="divide-y divide-zinc-200 text-sm leading-6">
                            {sideEffectFields.map((field) => (
                              <div
                                key={field.key}
                                className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                              >
                                <dt className="pr-4 text-zinc-600">
                                  {field.label}
                                </dt>
                                <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                  {renderValue(
                                    injection.sideEffects[field.key],
                                    injection.featured
                                  )}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Desktop View */}
          <section
            aria-labelledby="comparison-heading"
            className="hidden lg:block"
          >
            <h2 id="comparison-heading" className="sr-only">
              Feature comparison
            </h2>

            {/* Sticky Header */}
            <div className="sticky top-[88px] z-10 mt-2 grid grid-cols-3 gap-x-8 bg-zinc-100/90 pb-3 shadow-[0_0_10px_10px_rgb(244_244_245)] backdrop-blur-sm">
              <div aria-hidden="true" className="-mt-px">
                <div className="pt-10"></div>
              </div>
              {injectionData.map((injection) => (
                <div key={injection.id} aria-hidden="true" className="-mt-px">
                  <div className="pt-10">
                    <Link
                      className={
                        injection.featured
                          ? "text-primary-600 text-sm font-semibold leading-6"
                          : "text-zinc-900 text-sm font-semibold leading-6"
                      }
                      href={injection.href}
                    >
                      {injection.name}
                    </Link>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                      {injection.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="-mt-6 space-y-16">
              {/* General Info Table */}
              <div>
                <div className="relative -mx-8 mt-10">
                  <div
                    className="absolute inset-x-8 inset-y-0 grid grid-cols-3 gap-x-8"
                    aria-hidden="true"
                  >
                    <div></div>
                    {injectionData.map((injection) => (
                      <div
                        key={injection.id}
                        className="h-full w-full rounded-lg bg-white shadow-sm"
                      ></div>
                    ))}
                  </div>

                  <table className="relative w-full border-separate border-spacing-x-8">
                    <thead>
                      <tr className="text-left">
                        <th scope="col">
                          <span className="sr-only">Feature</span>
                        </th>
                        {injectionData.map((injection) => (
                          <th key={injection.id} scope="col">
                            <span className="sr-only">{injection.name}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {generalInfoFields.map((field) => (
                        <tr key={field.key}>
                          <th
                            scope="row"
                            className="w-1/3 py-3 pr-4 text-left text-sm font-normal leading-6 text-zinc-900"
                          >
                            {field.label}
                            <div className="absolute inset-x-8 mt-3 h-px bg-zinc-200"></div>
                          </th>
                          {injectionData.map((injection) => (
                            <td
                              key={injection.id}
                              className="relative w-1/3 px-4 py-0 text-center leading-none"
                            >
                              <span className="relative h-full w-full py-3">
                                {renderValue(
                                  injection.generalInfo[field.key],
                                  injection.featured
                                )}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <th
                          scope="row"
                          className="w-1/3 py-3 pr-4 text-left text-sm font-normal leading-6 text-zinc-900"
                        ></th>
                        {injectionData.map((injection) => (
                          <td
                            key={injection.id}
                            className="relative w-1/3 px-4 py-0 text-center leading-none"
                          >
                            <span className="relative h-full w-full py-3">
                              <Link
                                className={
                                  injection.featured
                                    ? "bg-primary-600 text-white shadow-primary-800/10 hover:bg-primary-700 hover:shadow-sm my-3.5 block w-full rounded-md px-4 py-2 text-sm font-medium"
                                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-800 my-3.5 block w-full rounded-md px-4 py-2 text-sm font-medium"
                                }
                                href={injection.href}
                              >
                                Learn more
                              </Link>
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  <div
                    className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-3 gap-x-8"
                    aria-hidden="true"
                  >
                    <div></div>
                    {injectionData.map((injection) => (
                      <div
                        key={injection.id}
                        className={
                          injection.featured
                            ? "ring-2 ring-primary-600 rounded-lg"
                            : "ring-1 ring-zinc-900/10 rounded-lg"
                        }
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Side Effects Table */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Potential side effects
                </h3>
                <div className="relative -mx-8 mt-10">
                  <div
                    className="absolute inset-x-8 inset-y-0 grid grid-cols-3 gap-x-8"
                    aria-hidden="true"
                  >
                    <div></div>
                    {injectionData.map((injection) => (
                      <div
                        key={injection.id}
                        className="h-full w-full rounded-lg bg-white shadow-sm"
                      ></div>
                    ))}
                  </div>

                  <table className="relative w-full border-separate border-spacing-x-8">
                    <thead>
                      <tr className="text-left">
                        <th scope="col">
                          <span className="sr-only">Feature</span>
                        </th>
                        {injectionData.map((injection) => (
                          <th key={injection.id} scope="col">
                            <span className="sr-only">{injection.name}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sideEffectFields.map((field, index) => (
                        <tr key={field.key}>
                          <th
                            scope="row"
                            className="w-1/3 py-3 pr-4 text-left text-sm font-normal leading-6 text-zinc-900"
                          >
                            {field.label}
                            {index < sideEffectFields.length - 1 && (
                              <div className="absolute inset-x-8 mt-3 h-px bg-zinc-200"></div>
                            )}
                          </th>
                          {injectionData.map((injection) => (
                            <td
                              key={injection.id}
                              className="relative w-1/3 px-4 py-0 text-center leading-none"
                            >
                              <span className="relative h-full w-full py-3">
                                {renderValue(
                                  injection.sideEffects[field.key],
                                  injection.featured
                                )}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div
                    className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-3 gap-x-8"
                    aria-hidden="true"
                  >
                    <div></div>
                    {injectionData.map((injection) => (
                      <div
                        key={injection.id}
                        className={
                          injection.featured
                            ? "ring-2 ring-primary-600 rounded-lg"
                            : "ring-1 ring-zinc-900/10 rounded-lg"
                        }
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="prose-sm prose-a:font-medium prose-a:text-primary-600 mt-7 max-w-(--breakpoint-md) relative z-10">
          <p>
            *BMI over 27 if you have a weight related condition such as
            dysglycaemia (prediabetes or type 2 diabetes mellitus),
            hypertension, dyslipidaemia, or obstructive sleep apnoea.
          </p>
          <p>
            <Link
              href="/injections/ozempic"
              className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
            >
              Ozempic
            </Link>{" "}
            is not included in this table because its approved use is for
            managing type 2 diabetes, not weight loss.
          </p>
        </div>
      </div>
    </div>
  );
}
