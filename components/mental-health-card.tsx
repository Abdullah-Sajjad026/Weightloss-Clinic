import Image from "next/image"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MentalHealthCardProps {
  title: string
  content: React.ReactNode
  icon: LucideIcon
  colorScheme?: 'primary' | 'secondary' | 'tertiary'
  columnSpan?: 2 | 3
  imageUrl?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  className?: string
}

export function MentalHealthCard({
  title,
  content,
  icon: Icon,
  colorScheme = 'secondary',
  columnSpan = 2,
  imageUrl,
  imageAlt,
  imageWidth = 150,
  imageHeight = 279,
  className
}: MentalHealthCardProps) {
  const colorClasses = {
    primary: {
      text: 'text-primary-900',
      icon: 'text-primary-500',
      shadow: 'shadow-primary-950/10',
      ring: 'ring-primary-950/10'
    },
    secondary: {
      text: 'text-secondary-900', 
      icon: 'text-secondary-500',
      shadow: 'shadow-secondary-950/10',
      ring: 'ring-secondary-950/10'
    },
    tertiary: {
      text: 'text-tertiary-900',
      icon: 'text-tertiary-500', 
      shadow: 'shadow-tertiary-950/10',
      ring: 'ring-tertiary-950/10'
    }
  }

  const colors = colorClasses[colorScheme]

  const baseClasses = cn(
    colors.shadow,
    colors.ring,
    "overflow-hidden rounded-2xl bg-white text-left text-pretty ring-1",
    columnSpan === 3 ? "lg:col-span-3" : "lg:col-span-2",
    className
  )

  if (imageUrl && imageAlt) {
    return (
      <div className={baseClasses}>
        <div className="flex h-full items-center">
          <Image
            alt={imageAlt}
            loading="lazy"
            width={imageWidth}
            height={imageHeight}
            className="hidden min-w-[150px] self-end pt-2 md:block"
            src={imageUrl}
          />
          <div className="p-4 lg:p-6">
            <h3 className={cn(
              "mt-0 mb-2 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl",
              colors.text
            )}>
              <Icon className={cn("h-5 w-5", colors.icon)} />
              {title}
            </h3>
            <div className="prose">
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(baseClasses, "p-4 lg:p-6")}>
      <h3 className={cn(
        "mb-2 mt-0 flex items-center gap-2 text-lg font-semibold tracking-tight lg:text-xl",
        colors.text
      )}>
        <div className={colors.icon}>
          <Icon className="h-5 w-5" />
        </div>
        {title}
      </h3>
      <div className="text-left prose max-w-none">
        {content}
      </div>
    </div>
  )
}