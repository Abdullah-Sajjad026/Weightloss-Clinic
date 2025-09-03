import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "nhs-weight-loss",
    question: "Can I get help losing weight on the NHS?",
    answer: (
      <div className="prose prose-gray max-w-none">
        <p>
          Yes, the NHS provides support for patients looking to
          lose weight. This support includes a variety of resources and programs
          that can help with weight management.
        </p>
        <p>
          One of the main resources available is the{" "}
          <Link
            href="https://www.nhs.uk/better-health/lose-weight/"
            target="_blank"
            className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
          >
            NHS Weight Loss Plan
          </Link>
          , a free 12-week digital programme to help you start healthier eating
          habits and become more active.
        </p>
        <p>
          If you have specific health conditions like obesity, diabetes, or high
          blood pressure, the{" "}
          <Link
            href="https://www.england.nhs.uk/digital-weight-management/nhs-digital-weight-management-programme/"
            target="_blank"
            className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
          >
            NHS Digital Weight Management Programme
          </Link>{" "}
          is another option. This is also a free 12-week online program that
          provides structured support to develop healthier eating habits and
          increase physical activity. You must be referred to this program by a
          GP or a local pharmacist.
        </p>
        <p>
          In addition to these digital programs, the{" "}
          <Link
            href="https://www.nhs.uk/conditions/obesity/treatment/"
            target="_blank"
            className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
          >
            NHS offers advice
          </Link>{" "}
          on physical activity and other lifestyle changes that can aid in
          weight loss and help prevent weight regain. This includes guidelines
          on the intensity and duration of physical activity required for
          patients who have been obese or are trying to prevent obesity.
        </p>
        <p>
          You can also be prescribed weight loss medication by the NHS, such as
          weight loss pills, but you typically have to show you have tried
          lifestyle changes first, such as diet and exercise, and meet the
          eligibility criteria.
        </p>
      </div>
    ),
  },
  {
    id: "30-30-30-rule",
    question: "What is the 30 30 30 rule for weight loss?",
    answer: (
      <div className="prose prose-gray max-w-none">
        <p>
          The '30 30 30 rule' is a diet approach that has gone viral on TikTok.
          The trend involves eating 30 grams of protein within 30 minutes of
          waking up, followed by 30 minutes of low-intensity exercise. However,
          we don't recommend programmes like this as they aren't backed by
          strong clinical evidence. Speak to a medical professional in
          Northampton to get a clinically approved weight loss plan that you
          know is safe and effective.
        </p>
      </div>
    ),
  },
  {
    id: "best-weight-loss-treatment",
    question: "What is the best treatment for losing weight in Northampton?",
    answer: (
      <div className="prose prose-gray max-w-none">
        <p>
          The best treatment for losing weight in Northampton, generally
          involves a combination of a calorie-reduced, balanced diet, increased
          physical activity, and behavioural changes. Here are some widely
          recommended approaches:
        </p>
        <ul>
          <li>
            Medical weight loss programmes. Many clinics offer weight loss
            programmes that include regular monitoring by healthcare
            professionals, personalised diet plans, and sometimes medications,
            such as{" "}
            <Link
              href="/injections"
              className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
            >
              medical weight loss treatments
            </Link>{" "}
            and{" "}
            <Link
              href="/pills-tablets"
              className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
            >
              weight loss pills
            </Link>
            .
          </li>
          <li>
            Diet and nutrition support. A dietitian or a nutritionist can help
            you create a personalised meal plan that fits your lifestyle and
            health needs.
          </li>
          <li>
            Fitness and activities. Joining a gym, working with a personal
            trainer or taking part in an exercise class can provide you with
            safe and effective exercise routines.
          </li>
          <li>
            Behavioural therapy. Techniques such as Cognitive Behavioral Therapy
            (CBT) can be effective in addressing the psychological factors that
            are linked to how, and what, you eat.
          </li>
        </ul>
        <p>
          You are unique - the best approach depends on your health, choices,
          and goals. It's important to speak to a clinician in Northampton to
          discuss the most appropriate weight loss strategy for you.
        </p>
      </div>
    ),
  },
  {
    id: "right-treatment-for-me",
    question: "How do I know which weight loss treatment is right for me?",
    answer: (
      <div className="prose prose-gray max-w-none">
        <p>
          The best treatment for you depends on various factors including your
          health status, weight loss goals, and medical history. You can take
          our{" "}
          <Link
            href="/assessment"
            className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
          >
            quick health assessment
          </Link>{" "}
          to determine the best approach tailored to your needs.
        </p>
      </div>
    ),
  },
];

export default function FAQsSection() {
  // Split FAQs into two columns for larger screens
  const leftColumnFAQs = faqData.slice(0, 2);
  const rightColumnFAQs = faqData.slice(2);

  return (
    <section className="mx-auto px-4 max-w-7xl">
      <div className="flex max-w-7xl flex-col items-center justify-center text-center">
        <h2 className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
          Northampton Weightloss (Powered by Regent Pharmacy) FAQs
        </h2>
        <p className="mt-4 mb-6 max-w-sm text-balance lg:text-lg text-gray-600">
          Answered by our experienced medical team.
        </p>

        <div className="flex w-full flex-wrap gap-3 text-left lg:flex-nowrap">
          {/* Left Column */}
          <div className="flex w-full flex-col gap-3">
            <Accordion type="single" collapsible className="space-y-3">
              {leftColumnFAQs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-2xl bg-white ring-1 ring-zinc-900/10 transition-all hover:shadow-md border-0 px-5 py-1"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline text-pretty py-4 [&[data-state=open]>svg]:rotate-180">
                    <span className="text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-0">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column */}
          <div className="flex w-full flex-col gap-3">
            <Accordion type="single" collapsible className="space-y-3">
              {rightColumnFAQs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-2xl bg-white ring-1 ring-zinc-900/10 transition-all hover:shadow-md border-0 px-5 py-1"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline text-pretty py-4 [&[data-state=open]>svg]:rotate-180">
                    <span className="text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-0">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex flex-col gap-3 text-lg text-zinc-900 lg:flex-row">
          <div>Have a question we haven't answered?</div>
          <Link
            href="tel:+441234567890"
            className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
          >
            Call Now!
          </Link>
        </div>
      </div>
    </section>
  );
}
