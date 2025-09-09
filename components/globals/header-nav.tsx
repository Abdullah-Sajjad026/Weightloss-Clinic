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
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartIcon } from "@/components/cart/CartIcon";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { Logo } from "@/components/ui/logo";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const medicationItems = {
  pens: [
    { name: "Mounjaro", badge: "RX", href: "/injections/mounjaro" },
    { name: "Wegovy", badge: "RX", href: "/injections/wegovy" },
  ],
};

// const surgeryItems = [
//   {
//     name: "Gastric sleeve",
//     description: "Permanent stomach size reduction",
//     href: "/bariatric-surgery/gastric-sleeve",
//   },
//   {
//     name: "Gastric balloon",
//     description: "Temporary stomach-filling balloon",
//     href: "/bariatric-surgery/gastric-balloon",
//   },
//   {
//     name: "Gastric bypass",
//     description: "Stomach reduction, intestine rerouting",
//     href: "/bariatric-surgery/gastric-bypass",
//   },
//   {
//     name: "Gastric band",
//     description: "Adjustable stomach-constriction band",
//     href: "/bariatric-surgery/gastric-band",
//   },
// ];

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
  // { name: "Surgery", href: "/bariatric-surgery" },
  { name: "Track Order", href: "/orders/track" },
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
                  <div className="w-[300px] p-6">
                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        WEIGHT LOSS INJECTIONS
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
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Weight Loss Surgery - Commented out for now */}
              {/* <NavigationMenuItem>
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
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Track Order Link */}
          <Link
            href="/orders/track"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            Track Order
          </Link>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-3">
          {/* Desktop CTA Buttons */}
          <Button
            asChild
            variant="outline"
            className="hidden lg:inline-flex bg-primary-50 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white text-sm px-4 py-2"
          >
            <Link href="/assessment">Check eligibility</Link>
          </Button>
          <Button
            asChild
            className="hidden lg:inline-flex bg-primary-600 hover:bg-primary-700 text-white text-sm px-4 py-2"
          >
            <Link href="/book-appointment">Book Appointment</Link>
          </Button>

          {/* Authentication */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="hidden lg:inline-flex text-sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
              userProfileMode="modal"
            />
          </SignedIn>

          {/* Shopping Cart */}
          <CartIcon className="text-gray-600 hover:text-gray-900 p-2" />

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
                    <Logo />
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-primary-50 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white text-xs px-3 py-2 h-auto"
                    >
                      <Link
                        href="/assessment"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Check eligibility
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary-600 hover:bg-primary-700 text-white text-xs px-3 py-2 h-auto"
                    >
                      <Link
                        href="/book-appointment"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Book Appointment
                      </Link>
                    </Button>
                    
                    {/* Mobile Authentication */}
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button variant="outline" size="sm" className="text-xs px-3 py-2 h-auto">
                          Sign In
                        </Button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "w-6 h-6"
                          }
                        }}
                        userProfileMode="modal"
                      />
                    </SignedIn>
                    
                    <CartIcon className="p-2" />
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

      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
}
