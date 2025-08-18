import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PromoBanner() {
  return (
    <Link
      href="/assessment"
      className="
        bg-primary-200 text-primary-900 group
        fixed top-0 left-0
        flex h-14 w-full cursor-pointer flex-col items-center justify-center
        font-medium
        before:absolute before:top-14 before:left-0
        before:h-[53px] before:w-6
        before:rounded-tl-3xl before:bg-white
        before:shadow-cutout-tl
        after:absolute after:top-14 after:right-0
        after:h-[53px] after:w-6
        after:rounded-tr-3xl after:bg-white
        after:shadow-cutout-tr
        md:pointer-events-none md:cursor-default
      "
    >
      <div className="flex w-full items-center justify-center gap-2 px-4 text-center">
        {/* Animated SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 200 200"
          className="text-primary-400/50 drop-shadow-primary-900/10 animate-spin drop-shadow-sm"
          style={{ animationDuration: "3s" }} // Slower spin
        >
          <path d="m100 0 24.1 58.258L186.603 50 148.2 100l38.403 50-62.503-8.258L100 200l-24.1-58.258L13.397 150 51.8 100 13.398 50 75.9 58.258 100 0Z"></path>
        </svg>

        {/* Main Text */}
        <div className="text-sm">
          Members lose 1st 4lb on average in 12 weeks
        </div>

        {/* Desktop Button */}
        <div className="pointer-events-auto ml-auto hidden md:block">
          <Button
            size="sm"
            className="bg-primary-300 text-primary-900 ring-primary-700/10 hover:bg-primary-400 rounded-full ring-1 transition ring-inset"
            asChild
          >
            Start assessment
          </Button>
        </div>
      </div>
    </Link>
  );
}
