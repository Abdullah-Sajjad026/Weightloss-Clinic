import FooterSection from "./footer-section";
import PromoBanner from "./promo-banner";
import HeaderNav from "./header-nav";
import { Toaster } from "@/components/ui/sonner";

export default function PublicLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <div className="relative z-40">
        <PromoBanner />
        <HeaderNav />
      </div>
      <div className="flex flex-col items-center">
        <main className="flex w-full flex-col items-center gap-24 py-8">
          {children}
        </main>
        <FooterSection />
      </div>
      <Toaster />
    </div>
  );
}
