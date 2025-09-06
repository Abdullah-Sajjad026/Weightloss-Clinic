export interface PricingTier {
  dose: string;
  price: string;
  period: string;
}

export interface ProductFeature {
  icon?: string;
  text: string;
}

export interface InfoCard {
  title: string;
  content: string;
}

export interface DosageStep {
  period: string;
  content: string;
}

export interface Reference {
  title: string;
  description: string;
  url: string;
}

export interface ProductData {
  id: string;
  name: string;
  activeIngredient: string;
  badge: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  features: ProductFeature[];
  pricingTiers: PricingTier[];
  whatIsTitle: string;
  whatIsDescription: string;
  infoCards: InfoCard[];
  footerNote: string;
  dosageTitle: string;
  dosageDescription: string;
  dosageSteps: DosageStep[];
  dosageFooterNote: string;
  videoSection?: {
    title: string;
    description: string;
    videoUrl: string;
  };
  buyingSection?: {
    title: string;
    description: string;
    steps: InfoCard[];
    footerNote: string;
  };
  references?: Reference[];
}

export const PRODUCTS: Record<string, ProductData> = {
  mounjaro: {
    id: "mounjaro",
    name: "Mounjaro",
    activeIngredient: "tirzepatide",
    badge: "Weight Loss Injection",
    heroDescription:
      "Mounjaro (tirzepatide) is a once-weekly weight loss injection that controls your appetite and calorie intake. Approved for use in Northampton and the UK, our specialised Mounjaro weight loss programmes offer medical guidance and customised care plans.",
    heroImage: "/products/mounjaro-pen-1.webp",
    heroImageAlt: "Mounjaro injection pen",
    features: [
      { text: "In stock for new and existing patients" },
      { text: "Free, fast and discreet delivery" },
      { text: "Lose up to 26% body weight" },
    ],
    pricingTiers: [
      { dose: "2.5mg", price: "£150", period: "mo" },
      { dose: "5mg", price: "£160", period: "mo" },
      { dose: "7.5mg", price: "£185", period: "mo" },
      { dose: "10mg", price: "£195", period: "mo" },
      { dose: "12.5mg", price: "£210", period: "mo" },
      { dose: "15mg", price: "£230", period: "mo" },
    ],
    whatIsTitle: "What is Mounjaro",
    whatIsDescription:
      "Mounjaro is a prescription medication formulated for weight loss and long-term weight management.",
    infoCards: [
      {
        title: "Active ingredient",
        content:
          "Mounjaro contains tirzepatide, which helps regulate your appetite and blood sugar levels.",
      },
      {
        title: "How it works",
        content:
          "It makes you feel fuller sooner, reducing hunger and helping you eat less. It also lowers your blood sugar levels by improving your response to insulin.",
      },
      {
        title: "Administration",
        content: "Mounjaro is taken as a convenient once-weekly injection.",
      },
      {
        title: "Suitability",
        content:
          "Mounjaro is suitable for adults with obesity (BMI over 30) or those overweight (BMI over 27) with certain weight-related health conditions.",
      },
      {
        title: "Effectiveness",
        content:
          "Clinical studies have shown significant weight loss, with patients losing around 26% of their body weight in 84 weeks.",
      },
      {
        title: "Side effects",
        content:
          "Possible side effects include nausea, diarrhoea, vomiting, constipation, abdominal pain, reduced appetite, and indigestion.",
      },
    ],
    footerNote:
      "Mounjaro can help you to manage weight effectively and achieve significant weight loss alongside a diet and exercise programme.",
    videoSection: {
      title: "How to use your Mounjaro pen",
      description:
        "Watch our step-by-step video to see how your Mounjaro pen works.",
      videoUrl:
        "https://player.vimeo.com/video/975170018?title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963",
    },
    buyingSection: {
      title: "How to buy Mounjaro in Northampton",
      description:
        "Looking to buy Mounjaro in Northampton? Here are the steps you need to follow.",
      steps: [
        {
          title: "Provider",
          content:
            "Northampton Weightloss (Powered by Regent Pharmacy) offers Mounjaro with the convenience of fast, discreet delivery.",
        },
        {
          title: "Consultation",
          content:
            "Understand if Mounjaro is right for you via an online consultation with your chosen healthcare provider.",
        },
        {
          title: "Prescription",
          content:
            "If Mounjaro is right for you, your healthcare provider will issue a prescription.",
        },
        {
          title: "Pharmacy",
          content:
            "Receive your medication from the pharmacy that's partnered with your chosen provider.",
        },
        {
          title: "Follow-up",
          content:
            "Regular follow-up appointments are essential to monitor your progress, manage side effects and adjust the treatment as needed.",
        },
      ],
      footerNote:
        "Only purchase Mounjaro from reputable sources to avoid counterfeit medications and ensure you receive genuine, safe treatment.",
    },
    dosageTitle: "Mounjaro dosing schedule",
    dosageDescription:
      "Mounjaro is taken once a week. Northampton Weightloss (Powered by Regent Pharmacy) experts suggest following a schedule to gradually increase the dosage to help you get the most from your treatment.",
    dosageSteps: [
      {
        period: "Weeks 1–4",
        content:
          "Start with a dose of 2.5mg once a week. This initial dose is designed to help your body gradually adjust to the medication.",
      },
      {
        period: "Weeks 5–8",
        content:
          "Increase the dose to 5mg, taken once weekly. This increase helps to enhance the medication's efficacy while monitoring your tolerance.",
      },
      {
        period: "Weeks 9–12",
        content:
          "Increase the dose again to 7.5mg once weekly. This step depends on how well you've tolerated the previous doses.",
      },
      {
        period: "Weeks 13-16",
        content:
          "Increase the dose to 10mg once weekly. This dose is part of the standard progression aiming for optimal weight loss.",
      },
      {
        period: "Weeks 17+",
        content:
          "Depending on your doctor's advice and how well you've tolerated the 10mg dose, you may increase to a maximum of 15mg once weekly.",
      },
    ],
    dosageFooterNote:
      "This structured dosing schedule helps to minimise side effects and allows your body to adapt to each new dose level gradually. Always follow your healthcare provider's instructions and discuss any concerns with them to ensure the best outcomes from your treatment plan. Not all patients will need to reach the highest dose. Your dose is tailored based on your response and how you tolerate the medication. It may be that you need to increase the dose more slowly than every 4 weeks, but you must not increase the dose more quickly than that.",
    references: [
      {
        title: "National Institute for Health and Care Excellence (NICE)",
        description: "National Institute for Health and Care Excellence (NICE)",
        url: "https://www.nice.org.uk/guidance/indevelopment/gid-ta11156",
      },
      {
        title: "Electronic Medicines Compendium (EMC)",
        description:
          "Mounjaro KwikPen 2.5mg solution for injection in pre-filled pen.",
        url: "https://www.medicines.org.uk/emc/product/15481/smpc#gref",
      },
      {
        title: "Eli Lilly",
        description:
          "Lilly's tirzepatide achieved up to 15.7% weight loss in adults with obesity or overweight and type 2 diabetes.",
        url: "https://investor.lilly.com/news-releases/news-release-details/lillys-tirzepatide-achieved-157-weight-loss-adults-obesity-or",
      },
      {
        title: "National Institute of Health (NIH)",
        description:
          "Continued treatment with tirzepatide for maintenance of weight reduction in adults with obesity.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38078870/",
      },
      {
        title: "The New England Journal of Medicine",
        description: "Tirzepatide once weekly for the treatment of obesity.",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038",
      },
      {
        title: "Nature Medicine",
        description:
          "Mounjaro helped people with obesity lose 26% of their body weight in 84 weeks.",
        url: "https://www.nature.com/articles/s41591-023-02597-w",
      },
    ],
  },
  wegovy: {
    id: "wegovy",
    name: "Wegovy",
    activeIngredient: "semaglutide",
    badge: "Weight Loss Injection",
    heroDescription:
      "Wegovy (semaglutide) is a once-weekly weight loss injection that regulates appetite and food intake. Approved in the UK, Northampton Weightloss (Powered by Regent Pharmacy) offers this treatment with medical guidance and personalised care. Prices start at £169.",
    heroImage: "/products/wegovy-pens.webp",
    heroImageAlt: "Wegovy injection pens",
    features: [
      { text: "In stock for new and existing patients" },
      { text: "Free, fast and discreet delivery" },
      { text: "Lose up to 15% body weight" },
    ],
    pricingTiers: [
      { dose: "0.25mg", price: "£149", period: "mo" },
      { dose: "0.5mg", price: "£169", period: "mo" },
      { dose: "1mg", price: "£189", period: "mo" },
      { dose: "1.7mg", price: "£209", period: "mo" },
      { dose: "2.4mg", price: "£229", period: "mo" },
    ],
    whatIsTitle: "What is Wegovy",
    whatIsDescription:
      "Wegovy is a prescription medication designed for weight loss and weight management. Here's an overview of what you should know about Wegovy.",
    infoCards: [
      {
        title: "Active ingredient",
        content:
          "Wegovy contains Semaglutide, the same active ingredient used in Ozempic, a medication used for type 2 diabetes.",
      },
      {
        title: "How it works",
        content:
          "It mimics a hormone that regulates appetite, which makes you feel fuller, so you eat less.",
      },
      {
        title: "Administration",
        content:
          "Wegovy is a once-weekly patient-administered injection, making it a convenient option for continuous weight management.",
      },
      {
        title: "Suitability",
        content:
          "It's intended for adults with obesity (BMI over 30) or those overweight (BMI over 27) with weight-related conditions like hypertension or type 2 diabetes.",
      },
      {
        title: "Effectiveness",
        content:
          "Clinical studies have shown up to 15% weight loss with Wegovy, making it a powerful tool to be used alongside diet and exercise.",
      },
      {
        title: "Side effects",
        content:
          "Common side effects of Wegovy include nausea, diarrhoea, vomiting, constipation, stomach pain, headache, tiredness, upset stomach, dizziness, feeling bloated, belching, gas, stomach flu, and heartburn.",
      },
    ],
    footerNote:
      "Only purchase Wegovy from reputable sources to avoid counterfeit medications and ensure you receive genuine, safe treatment.",
    dosageTitle: "Wegovy dosing schedule",
    dosageDescription:
      "Wegovy follows a gradual dose escalation schedule to minimize side effects while maximizing weight loss benefits.",
    dosageSteps: [
      {
        period: "Weeks 1–4",
        content:
          "Start with 0.25mg once weekly. This initial dose helps your body adjust to the medication.",
      },
      {
        period: "Weeks 5–8",
        content:
          "Increase to 0.5mg once weekly. Monitor tolerance and effectiveness at this dose.",
      },
      {
        period: "Weeks 9–12",
        content:
          "Increase to 1mg once weekly. Continue monitoring for side effects and weight loss progress.",
      },
      {
        period: "Weeks 13–16",
        content:
          "Increase to 1.7mg once weekly. This is often an effective maintenance dose for many patients.",
      },
      {
        period: "Weeks 17+",
        content:
          "May increase to maximum 2.4mg once weekly if needed and well-tolerated for optimal weight loss.",
      },
    ],
    dosageFooterNote:
      "The gradual dose escalation helps minimize gastrointestinal side effects while achieving optimal weight loss. Your healthcare provider will determine the right dose progression based on your tolerance and response to treatment.",
  },
  // saxenda: {
  //   id: "saxenda",
  //   name: "Saxenda",
  //   activeIngredient: "liraglutide",
  //   badge: "Weight Loss Injection",
  //   heroDescription: "Saxenda (liraglutide) is a daily injectable medication approved for weight management. At Northampton Weightloss (Powered by Regent Pharmacy), we specialise in offering Saxenda, supported by expert medical guidance and personalised care plans. Saxenda prices start from £49 per pen.",
  //   heroImage: "https://images.unsplash.com/photo-1745939921744-ba8ef27940bf?w=500&h=400&fit=crop&crop=center&auto=format&q=75",
  //   heroImageAlt: "Saxenda pens",
  //   features: [
  //     { text: "Free, fast and discreet delivery" },
  //     { text: "In stock for new and existing patients" },
  //     { text: "Lose up to 10% body weight" }
  //   ],
  //   pricingTiers: [
  //     { dose: "1 Pen", price: "£55", period: "6mg" },
  //     { dose: "3 Pens", price: "£165", period: "6mg" },
  //     { dose: "5 Pens", price: "£275", period: "6mg" }
  //   ],
  //   whatIsTitle: "What is Saxenda",
  //   whatIsDescription: "Saxenda is a prescription medication designed to assist with weight loss and long-term weight management. Here's what you should know.",
  //   infoCards: [
  //     {
  //       title: "Active ingredient",
  //       content: "Saxenda contains liraglutide."
  //     },
  //     {
  //       title: "How it works",
  //       content: "Saxenda reduces your appetite, which usually results in you eating less, leading to weight loss."
  //     },
  //     {
  //       title: "Administration",
  //       content: "Saxenda is taken once every day via injection."
  //     },
  //     {
  //       title: "Suitability",
  //       content: "Suitable for adults with a BMI of 30 or more, or 27 or more with weight-related conditions such as hypertension or type 2 diabetes."
  //     },
  //     {
  //       title: "Effectiveness",
  //       content: "Clinical trials show that it can lead to an average weight loss of about 5-10% of body weight."
  //     },
  //     {
  //       title: "Side effects",
  //       content: "Potential side effects include nausea, diarrhoea, vomiting, constipation, abdominal pain, headache, fatigue, upset stomach, dizziness, injection site reaction, dizziness, hypoglycemia, and change in enzyme levels in your blood."
  //     }
  //   ],
  //   footerNote: "Saxenda offers a viable solution for people seeking help with weight loss and is effective when combined with diet and exercise.",
  //   buyingSection: {
  //     title: "How to buy Saxenda in Northampton",
  //     description: "Purchasing Saxenda in Northampton involves several straightforward steps:",
  //     steps: [
  //       {
  //         title: "Provider",
  //         content: "Certain online health providers, including Northampton Weightloss (Powered by Regent Pharmacy), offer Saxenda with options for fast, discreet delivery."
  //       },
  //       {
  //         title: "Consultation",
  //         content: "Check if Saxenda is right for you through a consultation with your healthcare provider."
  //       },
  //       {
  //         title: "Prescription",
  //         content: "If deemed suitable, you will receive a prescription for Saxenda."
  //       },
  //       {
  //         title: "Pharmacy",
  //         content: "Receive your medication from the pharmacy that's partnered with your chosen provider."
  //       },
  //       {
  //         title: "Follow-up",
  //         content: "Regular follow-up appointments are essential to monitor your progress and adjust the treatment as needed."
  //       }
  //     ],
  //     footerNote: "Make sure to only purchase Saxenda from reputable sources to avoid counterfeit medications and ensure you are receiving genuine and safe treatment."
  //   },
  //   dosageTitle: "Saxenda dosing schedule",
  //   dosageDescription: "Saxenda is taken daily with a gradual dose increase to help minimize side effects while reaching your optimal therapeutic dose.",
  //   dosageSteps: [
  //     {
  //       period: "Week 1",
  //       content: "Start with a dose of 0.6mg per day. This initial low dose helps your body gradually adjust to the medication."
  //     },
  //     {
  //       period: "Week 2",
  //       content: "Increase the dose to 1.2mg per day. If you tolerated the initial dose well, this increase will continue to help you adjust while enhancing the medication's effects."
  //     },
  //     {
  //       period: "Week 3",
  //       content: "Increase the dose to 1.8mg per day. Continue monitoring how you feel and report any significant side effects to your healthcare provider."
  //     },
  //     {
  //       period: "Week 4",
  //       content: "Increase the dose to 2.4mg per day. By this week, your body should be adjusting to Saxenda, and you might start noticing changes in your appetite and weight."
  //     },
  //     {
  //       period: "Week 5+",
  //       content: "Increase to the maintenance dose of 3.0mg per day. This is the recommended dose for continued weight management."
  //     }
  //   ],
  //   dosageFooterNote: "It's important to inject Saxenda according to the instructions provided by your healthcare provider, usually into areas such as the abdomen, thigh, or upper arm. Rotate the injection site with each dose to reduce the risk of skin irritation. It is not safe to increase the dose any faster than every week. Follow your healthcare provider's advice to manage the dose and reduce side effects.",
  //   references: [
  //     {
  //       title: "National Institute for Health and Care Excellence (NICE)",
  //       description: "Liraglutide for managing overweight and obesity.",
  //       url: "https://www.nice.org.uk/guidance/ta664"
  //     },
  //     {
  //       title: "Electronic Medicines Compendium (EMC)",
  //       description: "Saxenda 6mg/mL solution for injection in pre-filled pen.",
  //       url: "https://www.medicines.org.uk/emc/product/2313/smpc#gref"
  //     },
  //     {
  //       title: "Novo Nordisk",
  //       description: "Saxenda (liraglutide) injection 3mg clinical trials for weight loss results.",
  //       url: "https://novomedlink.com/obesity/products/treatments/saxenda/efficacy-safety/significant-weight-loss.html"
  //     },
  //     {
  //       title: "National Institute of Health (NIH)",
  //       description: "Liraglutide for weight management: a critical review of the evidence.",
  //       url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5358074/"
  //     },
  //     {
  //       title: "The New England Journal of Medicine",
  //       description: "A randomised, controlled trial of 3.0mg of liraglutide in weight management.",
  //       url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1411892"
  //     }
  //   ]
  // },
  // orlistat: {
  //   id: "orlistat",
  //   name: "Orlistat",
  //   activeIngredient: "orlistat",
  //   badge: "Weight Loss Tablet",
  //   heroDescription: "Orlistat is a leading weight loss tablet approved for weight management. At Northampton Weightloss (Powered by Regent Pharmacy), we specialise in providing Orlistat, supported by expert medical guidance and personalised care plans. Orlistat prices start from £49 per pack.",
  //   heroImage: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=400&fit=crop&crop=center&auto=format&q=75",
  //   heroImageAlt: "Orlistat tablets",
  //   features: [
  //     { text: "Free, fast and discreet delivery" },
  //     { text: "In stock for new and existing patients" },
  //     { text: "Lose up to 10% body weight" }
  //   ],
  //   pricingTiers: [
  //     { dose: "84 pack", price: "£49", period: "1 month" },
  //     { dose: "168 pack", price: "£99", period: "2 months" },
  //     { dose: "252 pack", price: "£149", period: "3 months" }
  //   ],
  //   whatIsTitle: "What is Orlistat",
  //   whatIsDescription: "Orlistat is a prescription medication designed to assist with weight loss and long-term weight management. Here's what you should know:",
  //   infoCards: [
  //     {
  //       title: "Active ingredient",
  //       content: "Orlistat is the active ingredient which works by blocking the fat from your food from being absorbed in your stomach."
  //     },
  //     {
  //       title: "How it works",
  //       content: "It prevents the enzymes in your digestive system from breaking down fat, which means less is absorbed; so the fat you eat stays in your digestive tract and is passed in your stool (poo)."
  //     },
  //     {
  //       title: "Administration",
  //       content: "Orlistat is taken up to three times a day with each main meal."
  //     },
  //     {
  //       title: "Suitability",
  //       content: "Suitable for adults with a BMI of 30 or more, or 28 or more with weight-related conditions such as diabetes or high cholesterol."
  //     },
  //     {
  //       title: "Effectiveness",
  //       content: "With regular use, you can expect weight loss of about 5-10% of body weight."
  //     },
  //     {
  //       title: "Side effects",
  //       content: "Common side effects include the need to go to the toilet more often and more urgently, farting more often, oily or fatty stools, and an oily discharge from your rectum. These are less common if you significantly reduce the fat in your diet."
  //     }
  //   ],
  //   footerNote: "Only purchase Orlistat from reputable sources to avoid counterfeit medications and ensure you receive genuine, safe treatment.",
  //   buyingSection: {
  //     title: "How to buy Orlistat in Northampton",
  //     description: "If you're considering Orlistat for weight management in Northampton, here's how you can buy Orlistat safely:",
  //     steps: [
  //       {
  //         title: "Choose a reputable supplier",
  //         content: "Make sure you choose a provider who ensures that the prescription will be safe and effective for you. At Northampton Weightloss (Powered by Regent Pharmacy), UK based clinicians will undertake a thorough assessment and arrange delivery of the medication to your door."
  //       },
  //       {
  //         title: "Have your consultation",
  //         content: "Make sure that Orlistat is right for you with a consultation with your NHS GP or at Northampton Weightloss (Powered by Regent Pharmacy)."
  //       },
  //       {
  //         title: "Get your prescription",
  //         content: "If Orlistat is right for you, your healthcare provider will issue a prescription."
  //       },
  //       {
  //         title: "Receive your medication",
  //         content: "Receive your medication from the pharmacy that's partnered with your chosen provider. At Northampton Weightloss (Powered by Regent Pharmacy) we deliver it to your door."
  //       },
  //       {
  //         title: "Follow-up",
  //         content: "Regular follow-up appointments are essential to monitor your progress, manage side effects and adjust the treatment as needed."
  //       }
  //     ],
  //     footerNote: "By following these steps, you ensure that you receive Orlistat under safe conditions, supported by proper medical guidance. Remember, purchasing medication from reputable sources is important for your health and weight loss."
  //   },
  //   dosageTitle: "Orlistat dosing",
  //   dosageDescription: "Understanding the correct dosing plan for Orlistat is crucial to effectively managing weight and minimising side effects. Here's an easy-to-follow guide from Northampton Weightloss (Powered by Regent Pharmacy) on how to use Orlistat:",
  //   dosageSteps: [
  //     {
  //       period: "When to take Orlistat",
  //       content: "Take up to one 120mg capsule of Orlistat with each main meal (up to three times per day). It can be taken immediately before, during, or up to one hour after the meal."
  //     },
  //     {
  //       period: "When not to take Orlistat",
  //       content: "If you miss a meal or your meal does not contain any fat at all, skip that dose of Orlistat."
  //     },
  //     {
  //       period: "Consistency",
  //       content: "Consistent use improves the effectiveness of Orlistat."
  //     },
  //     {
  //       period: "Low fat diet",
  //       content: "A low fat diet will help with your weight loss and reduce the side effects of Orlistat."
  //     }
  //   ],
  //   dosageFooterNote: "Follow your healthcare provider's instructions carefully to achieve the best results from your Orlistat treatment.",
  //   references: [
  //     {
  //       title: "National Institute for Health and Care Excellence (NICE)",
  //       description: "Orlistat prescribing information.",
  //       url: "https://cks.nice.org.uk/topics/obesity/prescribing-information/orlistat"
  //     },
  //     {
  //       title: "Electronic Medicines Compendium (EMC)",
  //       description: "Xenical 120mg hard capsules.",
  //       url: "https://www.medicines.org.uk/emc/product/2592/smpc#gref"
  //     },
  //     {
  //       title: "National Institute of Health (NIH)",
  //       description: "Evaluation of efficacy and safety of Orlistat in obese patients.",
  //       url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3125014/"
  //     },
  //     {
  //       title: "The Lancet",
  //       description: "Randomised placebo-controlled trial of Orlistat for weight loss and prevention of weight regain in obese patients.",
  //       url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(97)11509-4/abstract"
  //     }
  //   ]
  // }
};
