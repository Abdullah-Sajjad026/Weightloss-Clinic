import { cn } from "@/lib/utils"

interface CategoryHeroProps {
  title: string
  description: string
  className?: string
}

export function CategoryHero({ title, description, className }: CategoryHeroProps) {
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <div className="items-center text-center flex w-full flex-col">
        <h1 className="my-3 text-3xl font-semibold">
          {title}
        </h1>
        <div className="prose max-w-(--breakpoint-sm) text-lg">
          {description}
        </div>
      </div>
    </div>
  )
}