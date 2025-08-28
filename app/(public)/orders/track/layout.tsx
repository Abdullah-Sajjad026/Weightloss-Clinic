import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order - Order Status & Delivery",
  description: "Track your weight loss treatment order from Northampton Clinic. View order status, delivery updates, and prescription verification progress.",
  keywords: ["track order", "order status", "delivery tracking", "prescription status", "Northampton", "order updates"],
  openGraph: {
    title: "Track Your Order - Northampton Clinic",
    description: "Monitor your weight loss treatment order status and delivery progress with real-time updates.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TrackOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}