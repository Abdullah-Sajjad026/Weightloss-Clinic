import type { Metadata } from "next";
import { Work_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/globals/public-layout-wrapper";
import { ClerkProvider } from "@clerk/nextjs";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Northampton Clinic (Powered by Regent Pharmacy) - Weight Loss Treatments",
    template: "%s | Northampton Clinic (Powered by Regent Pharmacy)"
  },
  description: "Professional weight loss treatments including Mounjaro and Wegovy injections. Expert medical consultations and personalized care at Northampton Clinic, powered by Regent Pharmacy.",
  keywords: ["weight loss", "Mounjaro", "Wegovy", "tirzepatide", "semaglutide", "weight loss injections", "Northampton", "medical weight loss", "obesity treatment"],
  authors: [{ name: "Northampton Clinic" }],
  creator: "Northampton Clinic (Powered by Regent Pharmacy)",
  publisher: "Regent Pharmacy",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Northampton Clinic (Powered by Regent Pharmacy)",
    title: "Northampton Clinic - Professional Weight Loss Treatments",
    description: "Expert weight loss treatments with Mounjaro and Wegovy injections. Professional medical consultations and personalized care.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northampton Clinic - Professional Weight Loss Treatments",
    description: "Expert weight loss treatments with Mounjaro and Wegovy injections. Professional medical consultations and personalized care.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://northamptonclinic.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${workSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
