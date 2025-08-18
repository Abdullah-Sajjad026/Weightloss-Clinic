"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Weight Loss Medication",
    items: [
      {
        category: "PENS",
        links: [
          {
            title: "Mounjaro",
            href: "/medication/mounjaro",
            description: "Prescription-only injection.",
          },
          {
            title: "Wegovy",
            href: "/medication/wegovy",
            description: "Weekly injectable for weight management.",
          },
          {
            title: "Saxenda",
            href: "/medication/saxenda",
            description: "Daily injectable for chronic weight control.",
          },
        ],
      },
      {
        category: "PILLS",
        links: [
          {
            title: "Orlistat",
            href: "/medication/orlistat",
            description: "Prescription-strength capsules.",
          },
          {
            title: "Xenical",
            href: "/medication/xenical",
            description: "Helps block fat absorption.",
          },
          {
            title: "Alli",
            href: "/medication/alli",
            description: "Over-the-counter weight loss aid.",
          },
        ],
      },
    ],
  },
  {
    title: "Weight Loss Surgery",
    items: [
      {
        category: "SURGERY",
        links: [
          {
            title: "Gastric Sleeve",
            href: "/surgery/gastric-sleeve",
            description: "Permanent stomach size reduction.",
          },
          {
            title: "Gastric Bypass",
            href: "/surgery/gastric-bypass",
            description: "Stomach reduction and intestine rerouting.",
          },
          {
            title: "Gastric Balloon",
            href: "/surgery/gastric-balloon",
            description: "Temporary stomach-filling balloon.",
          },
          {
            title: "Gastric Band",
            href: "/surgery/gastric-band",
            description: "Adjustable stomach-constriction band.",
          },
        ],
      },
    ],
  },
  {
    title: "Weight Loss Services",
    items: [
      {
        category: "SERVICES",
        links: [
          {
            title: "Nutritionist",
            href: "/services/nutritionist",
            description: "Personalised diet plans.",
          },
          {
            title: "Dietitian",
            href: "/services/dietitian",
            description: "Specialised eating advice.",
          },
          {
            title: "Physio",
            href: "/services/physio",
            description: "Exercise plans for you.",
          },
          {
            title: "Counselling",
            href: "/services/counselling",
            description: "Change food relationship.",
          },
          {
            title: "Fat Freezing",
            href: "/services/fat-freezing",
            description: "Freezes targeted fat cells.",
          },
          {
            title: "Fat Dissolving",
            href: "/services/fat-dissolving",
            description: "Lemon Bottle injections.",
          },
        ],
      },
    ],
    image: {
      src: "/images/dexa-scan.png", // Make sure to add this image to your /public/images folder
      alt: "DEXA Scan",
      description: "Get insights that BMI can't show",
    },
  },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="w-full bg-purple-50/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-purple-900"
        >
          Northampton Weight Loss Clinic
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigationItems.map((navItem) => (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={cn(
                      "grid gap-3 p-4",
                      navItem.image
                        ? "grid-cols-[1fr_200px]"
                        : `grid-cols-${navItem.items.length}`,
                      "md:w-[600px] lg:w-[700px]"
                    )}
                  >
                    {navItem.items.map((item) => (
                      <div key={item.category} className="flex flex-col">
                        <h3 className="mb-2 text-sm font-medium text-gray-500">
                          {item.category}
                        </h3>
                        {item.links.map((link) => (
                          <ListItem
                            key={link.title}
                            href={link.href}
                            title={link.title}
                          >
                            {link.description}
                          </ListItem>
                        ))}
                      </div>
                    ))}
                    {navItem.image && (
                      <li className="row-span-3 flex flex-col justify-center items-center rounded-md bg-gradient-to-b from-purple-100 to-white p-4">
                        <img
                          src={navItem.image.src}
                          alt={navItem.image.alt}
                          className="h-32 w-32 object-contain"
                        />
                        <p className="mt-2 text-sm font-medium text-center text-purple-900">
                          {navItem.image.description}
                        </p>
                      </li>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:flex bg-white hover:bg-gray-100 text-purple-900"
          >
            Check your eligibility
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-purple-50">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold text-purple-900">
                    Menu
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex-1 flex flex-col p-4 space-y-4">
                  {navigationItems.map((navItem) => (
                    <div key={navItem.title}>
                      <h3 className="font-semibold text-purple-900 mb-2">
                        {navItem.title}
                      </h3>
                      {navItem.items.map((item) => (
                        <div key={item.category} className="pl-2 mb-2">
                          {item.links.map((link) => (
                            <MobileLink
                              href={link.href}
                              onOpenChange={setIsMobileMenuOpen}
                            >
                              {link.title}
                            </MobileLink>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                  <hr />
                  <MobileLink href="/about" onOpenChange={setIsMobileMenuOpen}>
                    About
                  </MobileLink>
                  <MobileLink
                    href="/contact"
                    onOpenChange={setIsMobileMenuOpen}
                  >
                    Contact
                  </MobileLink>
                </nav>
                <div className="p-4 border-t">
                  <Button variant="outline" className="w-full bg-white">
                    Check your eligibility
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-100 hover:text-purple-900 focus:bg-purple-100 focus:text-purple-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
}: MobileLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn(
        "block py-2 text-gray-700 hover:text-purple-900",
        pathname === href && "font-semibold text-purple-900",
        className
      )}
    >
      {children}
    </Link>
  );
}
