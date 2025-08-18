import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  name: string
  description: string
  price: string
  imageUrl: string
  imageAlt: string
  href: string
  className?: string
}

export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  imageAlt,
  href,
  className
}: ProductCardProps) {
  return (
    <Link href={href} className={cn("group p-1 text-sm", className)}>
      <div className="relative">
        <Image
          alt={imageAlt}
          loading="lazy"
          width={368}
          height={368}
          className="ring-primary-200 group-hover:bg-primary-100 group-hover:ring-primary-300 aspect-square w-full overflow-hidden rounded-2xl bg-white ring-1 transition-all duration-200"
          src={imageUrl}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-medium text-zinc-900">
          {name}
        </h3>
        <p className="text-zinc-500">
          {description}
        </p>
        <p className="mt-2 font-medium text-zinc-900">
          {price}
        </p>
      </div>
    </Link>
  )
}