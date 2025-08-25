import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface FAQItem {
  id: string
  question: string
  answer: React.ReactNode
  column: 1 | 2
}

interface FAQsSectionProps {
  title: string
  subtitle?: string
  faqData: FAQItem[]
  colorScheme?: 'tertiary' | 'secondary' | 'primary'
}

export function FAQsSection({ 
  title, 
  subtitle = "Answered by our experienced medical team.", 
  faqData,
  colorScheme = 'tertiary'
}: FAQsSectionProps) {
  const column1FAQs = faqData.filter(faq => faq.column === 1)
  const column2FAQs = faqData.filter(faq => faq.column === 2)

  const colorClasses = {
    tertiary: {
      background: 'bg-tertiary-100',
      ring: 'ring-tertiary-500/20',
      textColor: 'text-tertiary-600',
      linkColor: 'text-tertiary-800'
    },
    secondary: {
      background: 'bg-secondary-100',
      ring: 'ring-secondary-500/20',
      textColor: 'text-secondary-600',
      linkColor: 'text-secondary-800'
    },
    primary: {
      background: 'bg-primary-100',
      ring: 'ring-primary-500/20',
      textColor: 'text-primary-600',
      linkColor: 'text-primary-800'
    }
  }

  const colors = colorClasses[colorScheme]

  return (
    <div className={`${colors.background} ${colors.ring} bg-[url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&crop=center&auto=format&q=30)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-center text-center rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10 overflow-hidden`}>
      <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 mb-6 max-w-(--breakpoint-sm) text-balance lg:text-lg">
        {subtitle}
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
      
      <div className={`${colors.textColor} mt-8 flex flex-col gap-3 text-lg lg:flex-row`}>
        <div>Have a question we haven't answered?</div>
        <Link 
          href="/contact" 
          className={`${colors.linkColor} font-medium underline underline-offset-4 hover:opacity-70`}
        >
          Get in touch
        </Link>
      </div>
    </div>
  )
}