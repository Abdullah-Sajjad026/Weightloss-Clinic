import Link from "next/link"
import { FAQItem } from "../components/faqs-section"

export const pillsFAQs: FAQItem[] = [
  {
    id: "what-is-the-best-weight-loss-pill",
    question: "What is the best weight loss pill?",
    answer: (
      <div className="prose">
        <p>Orlistat is a commonly used weight loss pill that works by reducing the amount of fats that you absorb when you eat. The fat stays in your gut until it is pushed out in your poo, never entering the rest of the body.</p>
        <p>This weight loss pill is typically prescribed for patients who are overweight and have had difficulty losing weight through diet and exercise alone. It's important to combine its use with a low-fat diet and regular physical activity. If you eat a higher fat diet whilst taking Orlistat, you will have more fat in your gut and poo; which will lead to many of the side effects listed. If you eat a low fat diet, the side effects are very few. This medication is also only intended for use in adults.</p>
        <p>If you are in Northampton and thinking about this option, it is crucial to understand that while Orlistat can help with weight management, it may also come with side effects, such as digestive discomfort, and it is not suitable for everyone.</p>
        <p>Orlistat is the active ingredient in other prescription weight loss pills like Xenical and the over-the-counter weight loss capsule Alli. It's always recommended to discuss weight loss pills with a healthcare provider to ensure they are a safe and appropriate option for your specific health needs.</p>
      </div>
    ),
    column: 1
  },
  {
    id: "can-the-nhs-prescribe-weight-loss-pills-in-northampton",
    question: "Can the NHS prescribe weight loss pills in Northampton?",
    answer: (
      <div className="prose">
        <p>Yes, the NHS can prescribe weight loss pills in Northampton, but only under specific circumstances. Weight loss tablets like Orlistat are available on the NHS if you are overweight with a BMI of 28 or more and have additional health risks linked to obesity, such as diabetes or high blood pressure. If you don't have other weight-related health problems, you may be eligible if you have a BMI of 30 or more. Your NHS GP in Northampton can discuss these options with you, determine if you meet the criteria, and if it's appropriate for your health needs.</p>
      </div>
    ),
    column: 1
  },
  {
    id: "how-do-you-qualify-for-prescription-weight-loss-pills",
    question: "How do you qualify for prescription weight loss pills?",
    answer: (
      <div className="prose">
        <p>To qualify for prescription weight loss pills, you typically need to have:</p>
        <ul>
          <li>A Body Mass Index (BMI) of 30 or more or</li>
          <li>A BMI of 28 or more along with other weight-related health conditions such as type 2 diabetes or high blood pressure.</li>
        </ul>
        <p>You must also have tried losing weight through diet and exercise. Your healthcare provider will assess your health history, the risks of obesity-related diseases, and determine if weight loss pills are a suitable option for you.</p>
      </div>
    ),
    column: 1
  },
  {
    id: "can-you-get-weight-loss-medication-online",
    question: "Can you get weight loss medication online?",
    answer: (
      <div className="prose">
        <p>Yes, it's possible to get weight loss medication online, but it should be done through reputable sources. Many services offer a remote consultation with a healthcare professional who can prescribe medication if you meet the necessary criteria. Always ensure that any online pharmacy is registered with the General Pharmaceutical Council (GPhC) and provides access to qualified medical practitioners. Any doctor-led service must be registered with the Care Quality Commission (CQC).</p>
      </div>
    ),
    column: 2
  },
  {
    id: "can-you-get-weight-loss-pills-over-the-counter",
    question: "Can you get weight loss pills over the counter?",
    answer: (
      <div className="prose">
        <p>Orlistat is available over the counter under the brand name Alli. It should be taken in conjunction with a reduced-calorie, lower-fat diet. Over-the-counter options are less strong than prescription versions but follow the same mechanism of preventing fat absorption from your food. It's important to read the packaging and discuss it with a pharmacist or doctor to ensure it suits you, particularly regarding potential interactions with other medications and managing side effects.</p>
      </div>
    ),
    column: 2
  },
  {
    id: "whats-the-difference-between-orlistat-and-xenical",
    question: "What's the difference between orlistat and Xenical?",
    answer: (
      <div className="prose">
        <p>Orlistat is the generic version of Xenical. Similar to how Nurofen is the branded version of the drug ibuprofen, Xenical is a branded version of the drug orlistat. Both contain the same active ingredient, orlistat.</p>
      </div>
    ),
    column: 2
  },
  {
    id: "what-are-the-common-side-effects-of-orlistat",
    question: "What are the common side effects of orlistat?",
    answer: (
      <div className="prose">
        <p>Common side effects of orlistat include increased frequency and urgency of bowel movements, farting more often, oily or fatty stools, and oily discharge from your rectum.</p>
        <p>Side effects were last updated on May 3rd 2024 based on information from the <Link href="https://www.nhs.uk/conditions/obesity/treatment/#:~:text=Common%20side%20effects%20of%20orlistat,pooing%20more%20frequently" target="_blank" className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70">NHS</Link>. Visit the medication page for more details on who should and shouldn't take each weight loss pill.</p>
      </div>
    ),
    column: 2
  }
]