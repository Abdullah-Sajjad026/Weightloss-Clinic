import { Truck } from "lucide-react"

const steps = [
  {
    title: "Health Assessment",
    description: "Complete a comprehensive health evaluation with our pharmacy team. We assess your medical history, current health status, and weight loss goals to determine the most suitable treatment approach."
  },
  {
    title: "Clinical Consultation", 
    description: "Our qualified healthcare professionals review your assessment and develop a personalized treatment plan. We ensure all medications are safe and appropriate for your individual needs."
  },
  {
    title: "Ongoing Support",
    description: "Receive your medication with convenient home delivery. Regent Pharmacy provides continuous monitoring, regular check-ins, and professional guidance throughout your weight management journey."
  }
]

export function HowItWorksSection() {
  return (
    <div className="bg-gradient-to-br from-zinc-50 via-white to-zinc-100 ring-zinc-500/20 ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10 relative overflow-hidden">
      {/* Background decoration with product images */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-16 w-28 h-28 bg-[url('/products/mounjaro-fabric.webp')] bg-contain bg-no-repeat bg-center"></div>
        <div className="absolute bottom-16 left-10 w-28 h-28 bg-[url('/products/wegovy-pens.webp')] bg-contain bg-no-repeat bg-center"></div>
      </div>
      <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
        Our proven process
      </h2>
      <p className="mt-4 mb-6 max-w-(--breakpoint-sm) text-balance lg:text-lg">
        Professional weight management support in three straightforward steps.
      </p>
      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="shadow-zinc-950/10 ring-zinc-950/10 bg-white ring-1 rounded-2xl p-4 lg:p-6 text-pretty">
            <h3 className="text-zinc-900 justify-center text-center mb-2 mt-0 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl">
              {step.title}
            </h3>
            <div className="text-center prose max-w-none">
              {step.description}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-col items-center justify-center gap-1 text-zinc-700 lg:flex-row">
        <Truck className="size-6 text-zinc-600 lg:size-5" />
        <div>
          Get fast delivery if you live in Weston Favell, Kingsthorpe, Duston, Upton, Delapre, Billing, Far Cotton, Moulton or Wootton.
        </div>
      </div>
    </div>
  )
}