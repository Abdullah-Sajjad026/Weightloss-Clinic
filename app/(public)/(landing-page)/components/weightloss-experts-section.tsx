import Link from "next/link"

export default function WeightlossExpertsSection() {
  const treatments = [
    {
      title: "Weight loss medication", 
      description: "Prescription medications that help reduce appetite and support weight loss when combined with lifestyle changes, dispensed under professional supervision.",
      href: "/injections"
    },
    {
      title: "Gastric balloon",
      description: "A non-surgical procedure where a balloon is inflated in your tummy. It helps you feel fuller sooner, so you eat smaller portions.",
      href: "/bariatric-surgery/gastric-balloon"
    },
    {
      title: "Gastric band",
      description: "An adjustable and reversible \"rubber\" band around the top of your tummy can help you feel fuller with only minor surgery.",
      href: "/bariatric-surgery/gastric-band"
    },
    {
      title: "Gastric sleeve", 
      description: "Removes part of your stomach and makes it thinner, taking less food to \"fill your stomach\" so you will eat less and lose weight.",
      href: "/bariatric-surgery/gastric-sleeve"
    },
    {
      title: "All bariatric surgery",
      description: "There are other surgical options for weight loss. It's important to weigh up the pros and cons and find the one that is right for you.",
      href: "/bariatric-surgery"
    }
  ]

  return (
    <div className="ring-zinc-500/20 bg-transparent items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10 overflow-hidden">
      <h2 className="text-primary-600 text-center text-base/7 font-semibold">
        Weight management solutions
      </h2>
      
      <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
        Professional weight loss services
      </p>
      
      <p className="mt-4 mb-6 max-w-(--breakpoint-sm) lg:text-lg prose text-balance">
        Regent Pharmacy offers various medically-supervised weight management options designed to work alongside healthy eating and regular physical activity for sustainable results.
      </p>

      <div className="grid w-full gap-6 lg:grid-cols-3">
        {treatments.map((treatment, index) => (
          <Link 
            key={index}
            href={treatment.href}
            className="group col-span-1 flex w-full flex-col items-center rounded-2xl bg-white p-6 shadow-lg ring-1 shadow-zinc-950/5 ring-zinc-950/10 transition hover:shadow-xl hover:shadow-zinc-950/10"
          >
            <h3 className="mb-2 text-lg font-semibold text-balance text-zinc-700">
              {treatment.title}
            </h3>
            <p>{treatment.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 text-lg text-zinc-900 lg:flex-row">
        <div>Need guidance choosing the right option?</div>
        <Link 
          href="/assessment" 
          className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
        >
          Start your assessment
        </Link>
      </div>
    </div>
  )
}