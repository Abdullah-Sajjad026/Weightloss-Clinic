import Link from "next/link";
import { cn } from "@/lib/utils";

interface ExpertAdviceCTAProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  colorScheme?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export function ExpertAdviceCTA({
  title = "Not sure which weight loss injection is right for you?",
  description = "Get expert advice from the Northampton Weight Loss Clinic team.",
  ctaText = "Start assessment",
  ctaHref = "/assessment",
  colorScheme = 'secondary',
  className,
}: ExpertAdviceCTAProps) {
  const colorClasses = {
    primary: {
      background: 'bg-primary-100',
      ring: 'ring-primary-500/20',
      textColor: 'text-primary-700',
      buttonBg: 'bg-primary-700',
      buttonHover: 'hover:bg-primary-600',
      buttonActive: 'active:bg-primary-800',
      buttonShadow: 'shadow-primary-950/10',
      buttonInsetRing: 'inset-ring-primary-100/20',
      buttonInsetShadow: 'inset-shadow-primary-50/10'
    },
    secondary: {
      background: 'bg-secondary-100',
      ring: 'ring-secondary-500/20',
      textColor: 'text-secondary-700',
      buttonBg: 'bg-secondary-700',
      buttonHover: 'hover:bg-secondary-600', 
      buttonActive: 'active:bg-secondary-800',
      buttonShadow: 'shadow-secondary-950/10',
      buttonInsetRing: 'inset-ring-secondary-100/20',
      buttonInsetShadow: 'inset-shadow-secondary-50/10'
    },
    tertiary: {
      background: 'bg-tertiary-100',
      ring: 'ring-tertiary-500/20',
      textColor: 'text-tertiary-700',
      buttonBg: 'bg-tertiary-700',
      buttonHover: 'hover:bg-tertiary-600',
      buttonActive: 'active:bg-tertiary-800', 
      buttonShadow: 'shadow-tertiary-950/10',
      buttonInsetRing: 'inset-ring-tertiary-100/20',
      buttonInsetShadow: 'inset-shadow-tertiary-50/10'
    }
  }

  const colors = colorClasses[colorScheme]

  return (
    <div
      className={cn(
        colors.background,
        colors.ring,
        "bg-[url(https://ik.imagekit.io/medicspot/rays.webp?updatedAt=1746126061944)] bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-start text-left rounded-5xl w-full lg:p-10 flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center",
        className
      )}
    >
      <div>
        <h2 className="mt-2 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl text-left">
          {title}
        </h2>
        <p className={cn("mt-4 max-w-(--breakpoint-sm) text-balance lg:text-lg mb-0", colors.textColor)}>
          {description}
        </p>
      </div>

      <Link
        href={ctaHref}
        className={cn(
          colors.buttonBg,
          colors.buttonHover,
          colors.buttonActive,
          colors.buttonShadow,
          colors.buttonInsetRing,
          colors.buttonInsetShadow,
          "text-white inline-flex duration-50 gap-1 items-center justify-center rounded-full px-6 py-2 font-medium transition-all hover:shadow-md active:shadow-inner ring ring-zinc-900/10 inset-shadow-sm inset-ring disabled:cursor-not-allowed disabled:opacity-70 whitespace-nowrap"
        )}
      >
        {ctaText}
      </Link>
    </div>
  );
}