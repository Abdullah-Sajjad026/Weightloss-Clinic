import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CrossSellProductCardProps {
  name: string
  description: string
  price: string
  imageUrl: string
  imageAlt: string
  href: string
  badge: string
  colorScheme?: 'primary' | 'secondary' | 'tertiary'
  className?: string
}

export function CrossSellProductCard({ 
  name, 
  description, 
  price, 
  imageUrl, 
  imageAlt, 
  href, 
  badge, 
  colorScheme = 'tertiary',
  className 
}: CrossSellProductCardProps) {
  const colorClasses = {
    primary: {
      title: 'text-primary-900',
      description: 'text-primary-600',
      badge: 'bg-primary-200 text-primary-600',
      price: 'text-primary-900'
    },
    secondary: {
      title: 'text-secondary-900',
      description: 'text-secondary-600', 
      badge: 'bg-secondary-200 text-secondary-600',
      price: 'text-secondary-900'
    },
    tertiary: {
      title: 'text-tertiary-900',
      description: 'text-tertiary-600',
      badge: 'bg-tertiary-200 text-tertiary-600', 
      price: 'text-tertiary-900'
    }
  }

  const colors = colorClasses[colorScheme]

  return (
    <Link 
      href={href} 
      className={cn("group text-sm", className)}
    >
      <Image
        alt={imageAlt}
        loading="lazy"
        width={368}
        height={368}
        className="aspect-square w-full overflow-hidden rounded-2xl bg-white group-hover:opacity-75 transition-opacity duration-200"
        src={imageUrl}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      <h3 className={cn("mt-4 text-lg font-medium", colors.title)}>
        {name}
      </h3>
      
      <p className={cn("my-1", colors.description)}>
        {description}
      </p>
      
      <div className={cn("my-2 inline-flex rounded-md px-3 py-1 font-medium", colors.badge)}>
        {badge}
      </div>
      
      <p className={cn("mt-2 font-medium", colors.price)}>
        {price}
      </p>
    </Link>
  )
}