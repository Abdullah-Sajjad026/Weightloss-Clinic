import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout - Complete Your Order",
  description: "Complete your secure checkout for weight loss treatments at Northampton Clinic. Professional medical review, prescription verification, and free delivery included.",
  keywords: ["secure checkout", "weight loss order", "prescription checkout", "medical review", "Northampton", "payment"],
  openGraph: {
    title: "Secure Checkout - Northampton Clinic",
    description: "Complete your order with secure payment processing and professional medical review for weight loss treatments.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}