import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    id: "can-i-get-weight-loss-injections-on-the-nhs",
    question: "Can I get weight loss injections on the NHS?",
    answer: (
      <div className="prose">
        <p>Yes, you can get some types of weight loss injections on the NHS under specific circumstances. Weight loss injections are available on prescription and are typically recommended for adults in Northampton who have not achieved significant weight loss through diet and exercise alone.</p>
        <p>You also need to be significantly overweight, which is a <Link href="/bmi-calculator" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70">Body Mass Index</Link> (BMI) of at least 35, or at least 30 if you have other weight-related health conditions like high cholesterol, type 2 diabetes or high blood pressure.</p>
      </div>
    ),
    column: 1
  },
  {
    id: "how-much-do-private-weight-loss-injections-cost-in-northampton",
    question: "How much do private weight loss injections cost in Northampton?",
    answer: (
      <div className="prose">
        <p>The cost of weight loss injections in Northampton varies depending on the type of injection and the clinic you choose. At Northampton Weight Loss Clinic, our treatments for Mounjaro, Saxenda, and Wegovy cost from £149 to £269 per month, depending on the dosage and drug. We recommend viewing our current weight loss injection costs for the most up-to-date pricing information.</p>
      </div>
    ),
    column: 1
  },
  {
    id: "what-is-the-best-injection-for-weight-loss",
    question: "What is the best injection for weight loss?",
    answer: (
      <div className="prose">
        <p>The 'best' weight loss injection can vary depending on your health conditions and goals. Commonly prescribed weight loss injections in the UK include:</p>
        <ul>
          <li><Link href="/injections/saxenda" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70">Saxenda (liraglutide)</Link> Saxenda is a single injection every day and is suitable if you have a BMI of 30 or more or 27 or more if you have a weight-related health condition. Saxenda acts as an appetite suppressant by making the body think that it is a hormone known as glucagon-like peptide 1 (GLP-1). Saxenda helps you feel fuller sooner and reduces your overall appetite. There may be a lower risk of problems where you inject (injection sites) with Saxenda, but a higher risk of stomach upset when compared to Wegovy.</li>
          <li><Link href="/injections/wegovy" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70">Wegovy (semaglutide)</Link>. Wegovy is a one injection per week that is similar to Saxenda but used less frequently. There may be a higher risk of problems when you inject with Wegovy, but a lower risk of stomach upset when compared to Saxenda.</li>
          <li><Link href="/injections/mounjaro" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70">Mounjaro (tirzepatide)</Link>. Mounjaro is a once-weekly injection, but it works in a different way to Wegovy and Saxenda. In addition to the GLP-1 effects, it also works by mimicking GIP glucose-dependent insulinotropic polypeptide receptors, which slows the passage of food through the stomach and reduces blood sugar. Mounjaro may cause a bigger drop in body weight compared to Wegovy and Saxenda.</li>
        </ul>
        <p>Each of these medications has been shown to help reduce weight when combined with improved eating and activity habits. Speaking with a healthcare provider in Northampton is the best way to decide on which option might be most effective for you, as they can provide personalised advice based on your specific health needs and weight loss goals.</p>
      </div>
    ),
    column: 1
  },
  {
    id: "how-do-you-qualify-for-weight-loss-injections-in-northampton",
    question: "How do you qualify for weight loss injections in Northampton?",
    answer: (
      <div className="prose">
        <p>To qualify for weight loss injections in Northampton through the NHS, you need to have a Body Mass Index (BMI) of at least 35, or a BMI of at least 30 and a weight-related health condition such as type 2 diabetes or hypertension. If you're considering private treatment, qualifications can vary by provider but generally include having a BMI of 30 or more or 27 or more if you have weight-related health conditions.</p>
      </div>
    ),
    column: 2
  },
  {
    id: "can-i-get-ozempic-on-the-nhs",
    question: "Can I get Ozempic on the NHS?",
    answer: (
      <div className="prose">
        <p>Ozempic can be prescribed on the NHS but only for managing type 2 diabetes, not for weight loss. It contains the active ingredient semaglutide, which is also used in weight loss treatments like Wegovy. However, Ozempic itself is not licensed for weight loss alone and is not prescribed for this purpose. If you're interested in semaglutide for weight loss, you can discuss Wegovy with your healthcare provider.</p>
      </div>
    ),
    column: 2
  }
]

export function FAQsSection() {
  const column1FAQs = faqData.filter(faq => faq.column === 1)
  const column2FAQs = faqData.filter(faq => faq.column === 2)

  return (
    <div className="bg-tertiary-100 ring-tertiary-500/20 bg-[url(https://ik.imagekit.io/medicspot/rays.webp?updatedAt=1746126061944)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10 overflow-hidden">
      <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
        Northampton weight loss injections FAQs
      </h2>
      <p className="mt-4 mb-6 max-w-(--breakpoint-sm) text-balance lg:text-lg">
        Answered by our experienced medical team.
      </p>
      
      <div className="flex w-full flex-wrap gap-3 text-left lg:flex-nowrap">
        <div className="flex w-full flex-col gap-3">
          <Accordion type="single" collapsible className="space-y-3">
            {column1FAQs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="rounded-2xl bg-white ring-1 ring-zinc-900/10 transition-all hover:shadow-md border-none"
              >
                <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between text-pretty px-5 py-4 text-left font-medium transition-all hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 pt-0">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="flex w-full flex-col gap-3">
          <Accordion type="single" collapsible className="space-y-3">
            {column2FAQs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="rounded-2xl bg-white ring-1 ring-zinc-900/10 transition-all hover:shadow-md border-none"
              >
                <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between text-pretty px-5 py-4 text-left font-medium transition-all hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 pt-0">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      <div className="text-tertiary-600 mt-8 flex flex-col gap-3 text-lg lg:flex-row">
        <div>Have a question we haven't answered?</div>
        <Link 
          href="/contact" 
          className="text-tertiary-800 font-medium underline underline-offset-4 hover:opacity-70"
        >
          Get in touch
        </Link>
      </div>
    </div>
  )
}