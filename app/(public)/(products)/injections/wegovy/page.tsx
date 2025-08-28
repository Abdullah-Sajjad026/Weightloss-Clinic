import { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Wegovy (Semaglutide) Weight Loss Injection",
  description: "Wegovy (semaglutide) weight loss injection at Northampton Clinic. FDA-approved treatment for chronic weight management. Expert consultation, personalized dosing, and professional support.",
  keywords: ["Wegovy", "semaglutide", "weight loss injection", "GLP-1 receptor agonist", "obesity treatment", "Northampton", "chronic weight management"],
  openGraph: {
    title: "Wegovy (Semaglutide) Weight Loss Treatment - Northampton Clinic",
    description: "Professional Wegovy treatment for effective weight management. Expert medical consultation and personalized care plans.",
  },
};

export default function WegovyPage() {
  return <ProductPage product={PRODUCTS.wegovy} />;
}