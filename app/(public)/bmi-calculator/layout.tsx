import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Northampton Clinic",
  description: "Calculate your Body Mass Index (BMI) to understand if you might be eligible for our weight loss treatments at Northampton Clinic.",
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}