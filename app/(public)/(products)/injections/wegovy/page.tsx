import { ProductPage } from "@/components/product/ProductPage";
import { PRODUCTS } from "@/data/products";

export default function WegovyPage() {
  return <ProductPage product={PRODUCTS.wegovy} />;
}