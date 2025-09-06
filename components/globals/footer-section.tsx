import { Button } from "@/components/ui/button";
import { Copyright, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerSections = [
  {
    title: "Weight Loss Injections",
    href: "/injections",
    links: [
      { label: "Mounjaro", href: "/injections/mounjaro" },
      { label: "Wegovy", href: "/injections/wegovy" },
    ],
  },
  // {
  //   title: "Surgery",
  //   href: "/bariatric-surgery",
  //   links: [
  //     { label: "Gastric sleeve", href: "/bariatric-surgery/gastric-sleeve" },
  //     { label: "Gastric balloon", href: "/bariatric-surgery/gastric-balloon" },
  //     { label: "Gastric bypass", href: "/bariatric-surgery/gastric-bypass" },
  //     { label: "Gastric band", href: "/bariatric-surgery/gastric-band" },
  //     { label: "Compare", href: "/bariatric-surgery" },
  //   ]
  // },
  // {
  //   title: "Services",
  //   links: [
  //     { label: "Nutritionist", href: "/private-appointment/nutritionist" },
  //     { label: "Dietician", href: "/private-appointment/dietician" },
  //     { label: "Physio", href: "/private-appointment/physio" },
  //     { label: "Counselling", href: "/private-appointment/counselling" },
  //     { label: "DEXA scan", href: "/private-appointment/dexa-scan" },
  //     { label: "NHS weight loss", href: "/nhs-weight-loss" },
  //   ]
  // },
  {
    title: "More",
    links: [
      { label: "About us", href: "https://theregentpharmacy.com/about-us/" },
      { label: "Contact", href: "https://theregentpharmacy.com/contact-us/" },
      { label: "BMI calculator", href: "/bmi-calculator" },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-primary-700 from-primary-600 to-primary-800 mt-20 flex w-full flex-col items-center justify-between gap-8 rounded-t-3xl bg-gradient-to-br p-8 pb-12 text-white md:gap-16">
      <div className="w-full max-w-7xl">
        <div className="text-white">
          <Image
            src="/northampton-clinic-logo.png"
            alt="Northampton Clinic Logo"
            width={200}
            height={60}
            className=" w-auto object-contain brightness-0 invert h-[120px]"
          />
        </div>
      </div>

      <div className="flex w-full max-w-7xl flex-col justify-between gap-10 md:flex-row">
        {/* CTA Section */}
        <div className="flex max-w-[420px] flex-col gap-6 text-balance md:-mt-4">
          <div className="text-3xl leading-tight font-medium md:text-5xl">
            Lose weight, gain confidence
          </div>
          <p className="text-lg text-white/90">
            Ready to take control of your health? Take the first step towards a
            healthier, happier you with Northampton Weightloss (Powered by
            Regent Pharmacy).
          </p>
          <div>
            <Button
              asChild
              className="bg-white hover:bg-zinc-100 active:bg-zinc-200 text-primary-800 shadow-lg hover:shadow-md active:shadow-inner ring ring-zinc-900/10 px-6 py-2 font-medium transition-all duration-200"
            >
              <Link href="/assessment">Check if you're eligible</Link>
            </Button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col flex-wrap gap-8 md:flex-row md:gap-16">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              {section.href ? (
                <Link
                  href={section.href}
                  className="mb-1 text-xs tracking-widest text-zinc-200 uppercase hover:text-white transition-colors"
                >
                  {section.title}
                </Link>
              ) : (
                <div className="mb-1 text-xs tracking-widest text-zinc-200 uppercase">
                  {section.title}
                </div>
              )}
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      {/* <div className="prose w-full max-w-7xl text-sm text-white/70">
        <p>
          The Independent Pharmacy (GPhC Registration: 9012559) is our partner
          pharmacy and prescribing service. All consultations and prescribing is
          carried out by GPhC registered medical practitioners. All dispensing
          and shipping of medicines is completed by The Independent Pharmacy, a
          UK licensed, General Pharmaceutical Council registered pharmacy.
          Superintendent Pharmacist: Mr Ant Boysan BPharm (GPhC Number:
          2047716).{" "}

        </p>
        <p>
          Disclaimer: The information contained on this site is for educational
          and informational purposes only and does not constitute medical
          advice. It is not intended to replace medical advice. Please seek the
          advice of a healthcare professional in Northampton for advice tailored
          to your medical needs.
        </p>
      </div> */}

      {/* Footer Bottom */}
      <div className="flex w-full max-w-7xl flex-col justify-between gap-4 lg:flex-row">
        <div className="flex items-center gap-1">
          <Copyright className="text-primary-400 w-4 h-4" />
          <span>2025 Northampton Weightloss (Powered by Regent Pharmacy)</span>
        </div>

        <div className="flex gap-5">
          {/* TODO: Add these links when pages are created */}
          {/* <Link
            href="/terms"
            className="text-white hover:text-white/80 transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className="text-white hover:text-white/80 transition-colors"
          >
            Privacy Policy
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
