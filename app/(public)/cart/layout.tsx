import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - Your Weight Loss Treatments",
  description: "Review your selected weight loss treatments including Mounjaro and Wegovy injections. Secure checkout and free delivery at Northampton Clinic (Powered by Regent Pharmacy).",
  keywords: ["shopping cart", "weight loss treatments", "Mounjaro", "Wegovy", "secure checkout", "Northampton", "prescription medications"],
  openGraph: {
    title: "Shopping Cart - Northampton Clinic",
    description: "Review your weight loss treatment selections and proceed to secure checkout with professional medical support.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}