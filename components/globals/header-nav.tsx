"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder Logo Component
const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-full">
      <Heart className="w-4 h-4 text-white fill-white" />
    </div>
    <span className="font-serif text-lg font-semibold text-gray-900">NWLC</span>
  </div>
);

const medicationItems = {
  pens: [
    { name: "Mounjaro", badge: "RX", href: "/injections/mounjaro" },
    { name: "Wegovy", badge: "RX", href: "/injections/wegovy" },
    { name: "Saxenda", badge: "RX", href: "/injections/saxenda" },
  ],
  pills: [
    { name: "Orlistat", badge: "RX", href: "/pills-tablets/orlistat" },
    { name: "Xenical", badge: "RX", href: "/pills-tablets/xenical" },
    { name: "Alli", badge: "OTC", href: "/pills-tablets/alli" },
  ],
};

const surgeryItems = [
  {
    name: "Gastric sleeve",
    description: "Permanent stomach size reduction",
    href: "/bariatric-surgery/gastric-sleeve",
  },
  {
    name: "Gastric balloon",
    description: "Temporary stomach-filling balloon",
    href: "/bariatric-surgery/gastric-balloon",
  },
  {
    name: "Gastric bypass",
    description: "Stomach reduction, intestine rerouting",
    href: "/bariatric-surgery/gastric-bypass",
  },
  {
    name: "Gastric band",
    description: "Adjustable stomach-constriction band",
    href: "/bariatric-surgery/gastric-band",
  },
];

const servicesItems = [
  { name: "Nutritionist", href: "/private-appointment/nutritionist" },
  { name: "Dietician", href: "/private-appointment/dietician" },
  { name: "Physio", href: "/private-appointment/physio" },
  { name: "Counselling", href: "/private-appointment/counselling" },
  { name: "DEXA scan", href: "/private-appointment/dexa-scan" },
  { name: "NHS weight loss", href: "/nhs-weight-loss" },
];

const mobileNavItems = [
  { name: "Injections", href: "/injections" },
  { name: "Pills", href: "/pills-tablets" },
  { name: "Surgery", href: "/bariatric-surgery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <Logo className="lg:flex hidden" />
          {/* Mobile Logo - shorter text */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-full">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-serif text-base font-semibold text-gray-900">
              NWLC
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Weight Loss Medication */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50">
                  Weight Loss Medication
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-8 p-6">
                    <div>
                      <div className="mb-4">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                          PENS
                        </h3>
                        <div className="space-y-2">
                          {medicationItems.pens.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-medium text-gray-900">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {item.badge}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                          PILLS
                        </h3>
                        <div className="space-y-2">
                          {medicationItems.pills.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-medium text-gray-900">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {item.badge}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Weight Loss Surgery */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50">
                  Weight Loss Surgery
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-6">
                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
                        SURGERY
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {surgeryItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block p-3 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-medium text-gray-900 mb-1">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Weight Loss Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50">
                  Weight Loss Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-6">
                    <div className="grid grid-cols-2 gap-2">
                      {servicesItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block p-2 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-3">
          {/* Desktop CTA Button */}
          <Button
            asChild
            className="hidden lg:inline-flex bg-primary-600 hover:bg-primary-700 text-white text-sm px-4 py-2"
          >
            <Link href="/assessment">Check your eligibility</Link>
          </Button>

          {/* Shopping Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping cart</span>
          </Button>

          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden p-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md p-6">
              <SheetHeader className="text-left pb-6 border-b">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="hover:opacity-80 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-full">
                        <Heart className="w-4 h-4 text-white fill-white" />
                      </div>
                      <span className="font-serif text-lg font-semibold text-gray-900">
                        NWLC
                      </span>
                    </div>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary-600 hover:bg-primary-700 text-white text-xs px-3 py-2 h-auto"
                    >
                      <Link
                        href="/assessment"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Check eligibility
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="p-2">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-8 flex flex-col space-y-6">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-3xl font-medium text-gray-900 hover:text-primary-600 transition-colors py-2 border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
