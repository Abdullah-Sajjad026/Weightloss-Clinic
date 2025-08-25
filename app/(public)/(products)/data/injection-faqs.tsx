import Link from "next/link"
import { FAQItem } from "../components/faqs-section"

export const injectionFAQs: FAQItem[] = [
  {
    id: "can-i-get-weight-loss-injections-on-the-nhs",
    question: "Can I get weight loss injections on the NHS?",
    answer: (
      <div className="prose">
        <p>Yes, you can get some types of weight loss injections on the NHS under specific circumstances. Weight loss injections are available on prescription and are typically recommended for adults who have not achieved significant weight loss through diet and exercise alone.</p>
        <p>You also need to be significantly overweight, which is a <Link href="/bmi-calculator" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70">Body Mass Index</Link> (BMI) of at least 35, or at least 30 if you have other weight-related health conditions like high cholesterol, type 2 diabetes or high blood pressure.</p>
      </div>
    ),
    column: 1
  },
  {
    id: "how-much-do-private-weight-loss-injections-cost-in-northampton",
    question: "How much do private weight loss injections cost?",
    answer: (
      <div className="prose">
        <p>The cost of weight loss injections varies depending on the type of injection and the clinic you choose. At Northampton Weightloss (Powered by Regent Pharmacy), our treatments for Mounjaro and Wegovy cost from £149 to £229 per month, depending on the dosage and drug. We recommend viewing our current weight loss injection costs for the most up-to-date pricing information.</p>
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
          <li><Link href="/injections/wegovy" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70">Wegovy (semaglutide)</Link>. Wegovy is a once-weekly injection that acts as an appetite suppressant by mimicking a hormone known as glucagon-like peptide 1 (GLP-1). Wegovy helps you feel fuller sooner and reduces your overall appetite, supporting significant weight loss.</li>
          <li><Link href="/injections/mounjaro" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70">Mounjaro (tirzepatide)</Link>. Mounjaro is a once-weekly injection that works differently from Wegovy. In addition to GLP-1 effects, it also works by mimicking GIP glucose-dependent insulinotropic polypeptide receptors, which slows the passage of food through the stomach and reduces blood sugar. Mounjaro may cause greater weight loss compared to other treatments.</li>
        </ul>
        <p>Both of these medications have been shown to help reduce weight when combined with improved eating and activity habits. Speaking with a healthcare provider is the best way to decide which option might be most effective for you, as they can provide personalised advice based on your specific health needs and weight loss goals.</p>
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