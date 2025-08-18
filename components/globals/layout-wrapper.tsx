import FooterSection from "./footer-section";
import { Header } from "./header-nav";
import PromoBanner from "./promo-banner";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <div className="relative z-40">
        {/* <PromoBanner />
        <Header /> */}
      </div>
      <div className="h-28 w-full"></div>
      <div className="flex flex-col items-center">
        <main className="flex w-full flex-col items-center gap-24 py-8">
          {children}
        </main>
        <FooterSection />
      </div>
    </div>
  );
}
