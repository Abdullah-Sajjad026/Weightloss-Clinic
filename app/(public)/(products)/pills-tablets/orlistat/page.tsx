import { ProductPage } from "@/components/product/ProductPage";
import { PRODUCTS } from "@/data/products";

export default function OrlistatPage() {
  return <ProductPage product={PRODUCTS.orlistat} />;
}