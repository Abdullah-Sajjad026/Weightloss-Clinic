import Link from "next/link";
import { cn } from "@/lib/utils";

interface ExpertAdviceCTAProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function ExpertAdviceCTA({
  title = "Not sure which weight loss injection is right for you?",
  description = "Get expert advice from the Northampton Weight Loss Clinic team.",
  ctaText = "Start assessment",
  ctaHref = "/assessment",
  className,
}: ExpertAdviceCTAProps) {
  return (
    <div
      className={cn(
        "bg-secondary-100 ring-secondary-500/20 bg-[url(https://ik.imagekit.io/medicspot/rays.webp?updatedAt=1746126061944)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-start text-left rounded-5xl w-full lg:p-10 flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center",
        className
      )}
    >
      <div>
        <h2 className="mt-2 max-w-lg font-semibold tracking-tight text-balance sm:text-4xl text-left text-2xl!">
          {title}
        </h2>
        <p className="mt-4 max-w-(--breakpoint-sm) text-balance lg:text-lg text-secondary-700 mb-0">
          {description}
        </p>
      </div>

      <Link
        href={ctaHref}
        className="bg-secondary-700 hover:bg-secondary-600 active:bg-secondary-800 shadow-secondary-950/10 inset-ring-secondary-100/20 text-white inset-shadow-secondary-50/10 inline-flex duration-50 gap-1 items-center justify-center rounded-full px-6 py-2 font-medium transition-all hover:shadow-md active:shadow-inner ring ring-zinc-900/10 inset-shadow-sm inset-ring disabled:cursor-not-allowed disabled:opacity-70 whitespace-nowrap"
      >
        {ctaText}
      </Link>
    </div>
  );
}
