import { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Mounjaro (Tirzepatide) Weight Loss Injection",
  description: "Mounjaro (tirzepatide) weight loss injection at Northampton Clinic. Clinical-grade treatment for effective weight management. Expert consultation, personalized dosing, and professional support.",
  keywords: ["Mounjaro", "tirzepatide", "weight loss injection", "diabetes medication", "GLP-1 agonist", "Northampton", "obesity treatment"],
  openGraph: {
    title: "Mounjaro (Tirzepatide) Weight Loss Treatment - Northampton Clinic",
    description: "Professional Mounjaro treatment for effective weight loss. Expert medical consultation and personalized care plans.",
  },
};

export default function MounjaroPage() {
  return <ProductPage product={PRODUCTS.mounjaro} />;
}