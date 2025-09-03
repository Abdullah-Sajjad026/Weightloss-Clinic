"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary-600 text-white py-3 px-4 relative">
      <div className="container mx-auto max-w-7xl flex items-center justify-center text-center">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            🎉 Free consultation available - Limited time offer
          </span>
          <Button asChild size="sm" variant="outline" variant="teal">
            <Link href="/consultation">Book Now</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 h-auto text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
}
