import { Truck } from "lucide-react"

const steps = [
  {
    title: "Check your eligibility",
    description: "Complete our free online assessment. You'll answer some simple questions about your health to see which weight loss treatment is right for you."
  },
  {
    title: "Doctor review", 
    description: "One of our doctors will review your answers to make sure the treatment is safe for you. They'll pick the best treatment for your health and needs."
  },
  {
    title: "Get your treatment",
    description: "Your treatment will be discreetly delivered right to your door. Northampton Weight Loss Clinic, powered by Medicspot, will give you ongoing weight loss and health support."
  }
]

export function HowItWorksSection() {
  return (
    <div className="bg-zinc-100 ring-zinc-500/20 bg-[url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&crop=center&auto=format&q=30)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10">
      <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
        How it works
      </h2>
      <p className="mt-4 mb-6 max-w-(--breakpoint-sm) text-balance lg:text-lg">
        Your journey to weight loss in three simple steps.
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