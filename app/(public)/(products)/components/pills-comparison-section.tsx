import Link from "next/link"
import { Check, X } from "lucide-react"

const pillData = [
  {
    id: "orlistat",
    name: "Orlistat", 
    subtitle: "Generic version of Xenical",
    href: "/pills-tablets/orlistat",
    featured: false,
    generalInfo: {
      treatment: "Orlistat 120mg",
      bodyWeightLoss: "Up to 10%",
      eligibility: "BMI over 30",
      noPrescriptionNeeded: false,
      milderSideEffects: false,
      frequency: "3 times a day",
      type: "Capsule",
      inStock: true,
      freeDelivery: true
    }
  },
  {
    id: "xenical",
    name: "Xenical",
    subtitle: "Branded version of orlistat", 
    href: "/pills-tablets/xenical",
    featured: false,
    generalInfo: {
      treatment: "Orlistat 120mg",
      bodyWeightLoss: "Up to 10%", 
      eligibility: "BMI over 30",
      noPrescriptionNeeded: false,
      milderSideEffects: false,
      frequency: "3 times a day",
      type: "Capsule",
      inStock: true,
      freeDelivery: true
    }
  },
  {
    id: "alli",
    name: "Alli",
    subtitle: "Over-the-counter, smaller dosage",
    href: "/pills-tablets/alli", 
    featured: false,
    generalInfo: {
      treatment: "Orlistat 60mg",
      bodyWeightLoss: "Up to 5%",
      eligibility: "BMI over 25", 
      noPrescriptionNeeded: true,
      milderSideEffects: true,
      frequency: "3 times a day",
      type: "Capsule",
      inStock: true,
      freeDelivery: true
    }
  }
]

const generalInfoFields = [
  { key: 'treatment' as const, label: 'Treatment' },
  { key: 'bodyWeightLoss' as const, label: 'Body weight loss' },
  { key: 'eligibility' as const, label: 'Eligibility' },
  { key: 'noPrescriptionNeeded' as const, label: 'No prescription needed' },
  { key: 'milderSideEffects' as const, label: 'Milder side effects' },
  { key: 'frequency' as const, label: 'Frequency' },
  { key: 'type' as const, label: 'Type' },
  { key: 'inStock' as const, label: 'In stock' },
  { key: 'freeDelivery' as const, label: 'Free delivery' }
]

function renderValue(value: string | boolean, featured: boolean = false) {
  if (typeof value === 'boolean') {
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
    )
  }
  
  return (
    <span className={featured ? "font-semibold text-primary-600 text-balance text-sm" : "text-zinc-900 text-balance text-sm"}>
      {value}
    </span>
  )
}

export function PillsComparisonSection() {
  return (
    <div className="bg-zinc-100 ring-zinc-500/20 bg-[url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&crop=center&auto=format&q=30)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10 from-transparent">
      <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl text-zinc-950">
        Weight loss pills comparison
      </h2>
      <p className="mt-4 max-w-(--breakpoint-sm) text-balance mb-0 max-w-(--breakpoint-sm) text-sm text-zinc-700 lg:text-base">
        We offer a range of the best weight loss injections at DigitalClinicSystem. Here are the key differences in effectiveness rates, dosing frequencies, common side effects, and eligibility criteria, helping you make an informed decision about which treatment might be right for you.
      </p>
      
      <div className="relative w-full text-left">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Mobile View */}
          <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
            <h2 id="mobile-comparison-heading" className="sr-only">Feature comparison</h2>
            <div className="mx-auto max-w-2xl space-y-16">
              {pillData.map((pill) => (
                <div key={pill.id} className="border-t border-zinc-900/10">
                  <div className="-mt-px w-72 pt-10 md:w-80">
                    <h3 className="text-zinc-900 text-sm font-semibold leading-6">
                      {pill.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{pill.subtitle}</p>
                  </div>
                  
                  <div className="mt-10 space-y-10">
                    <div>
                      <div className="relative mt-6">
                        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-xs sm:block"></div>
                        <div className="ring-1 ring-zinc-900/10 relative rounded-lg bg-white shadow-xs sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0">
                          <dl className="divide-y divide-zinc-200 text-sm leading-6">
                            {generalInfoFields.map((field) => (
                              <div key={field.key} className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                                <dt className="pr-4 text-zinc-600">{field.label}</dt>
                                <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                  {renderValue(pill.generalInfo[field.key], pill.featured)}
                                </dd>
                              </div>
                            ))}
                            <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0">
                              <dt className="pr-4 text-zinc-600"></dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                <Link 
                                  className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-800 block w-full rounded-md px-4 py-2 text-sm font-medium"
                                  href={pill.href}
                                >
                                  Learn more
                                </Link>
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div aria-hidden="true" className="ring-1 ring-zinc-900/10 pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Desktop View */}
          <section aria-labelledby="comparison-heading" className="hidden lg:block">
            <h2 id="comparison-heading" className="sr-only">Feature comparison</h2>
            
            {/* Sticky Header */}
            <div className="sticky top-[88px] z-10 mt-2 grid grid-cols-4 gap-x-8 bg-zinc-100/90 pb-3 shadow-[0_0_10px_10px_rgb(244_244_245)] backdrop-blur-sm">
              <div aria-hidden="true" className="-mt-px">
                <div className="pt-10"></div>
              </div>
              {pillData.map((pill) => (
                <div key={pill.id} aria-hidden="true" className="-mt-px">
                  <div className="pt-10">
                    <Link className="text-zinc-900 text-sm font-semibold leading-6" href={pill.href}>
                      {pill.name}
                    </Link>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{pill.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="-mt-6 space-y-16">
              <div>
                <div className="relative -mx-8 mt-10">
                  <div className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8" aria-hidden="true">
                    <div></div>
                    {pillData.map((pill) => (
                      <div key={pill.id} className="h-full w-full rounded-lg bg-white shadow-sm"></div>
                    ))}
                  </div>
                  
                  <table className="relative w-full border-separate border-spacing-x-8">
                    <thead>
                      <tr className="text-left">
                        <th scope="col"><span className="sr-only">Feature</span></th>
                        {pillData.map((pill) => (
                          <th key={pill.id} scope="col"><span className="sr-only">{pill.name}</span></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {generalInfoFields.map((field, index) => (
                        <tr key={field.key}>
                          <th scope="row" className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-zinc-900">
                            {field.label}
                            {index < generalInfoFields.length - 1 && (
                              <div className="absolute inset-x-8 mt-3 h-px bg-zinc-200"></div>
                            )}
                          </th>
                          {pillData.map((pill) => (
                            <td key={pill.id} className="relative w-1/4 px-4 py-0 text-center leading-none">
                              <span className="relative h-full w-full py-3">
                                {renderValue(pill.generalInfo[field.key], pill.featured)}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <th scope="row" className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-zinc-900"></th>
                        {pillData.map((pill) => (
                          <td key={pill.id} className="relative w-1/4 px-4 py-0 text-center leading-none">
                            <span className="relative h-full w-full py-3">
                              <Link 
                                className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-800 my-3.5 block w-full rounded-md px-4 py-2 text-sm font-medium"
                                href={pill.href}
                              >
                                Learn more
                              </Link>
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8" aria-hidden="true">
                    <div></div>
                    {pillData.map((pill) => (
                      <div key={pill.id} className="ring-1 ring-zinc-900/10 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}