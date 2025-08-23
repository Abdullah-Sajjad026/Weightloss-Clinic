import PublicLayoutWrapper from "@/components/globals/public-layout-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicLayoutWrapper>{children}</PublicLayoutWrapper>;
}
