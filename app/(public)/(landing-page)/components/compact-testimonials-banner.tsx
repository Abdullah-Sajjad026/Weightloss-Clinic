import Image from "next/image"

const customerAvatars = [
  {
    src: "https://res.cloudinary.com/medicspot/image/upload/v1748539985/testimonials/thumbnail/Amanda_-_after_Month_5-esv2-90p-bg-10p.avif",
    alt: "Amanda - Customer testimonial",
    name: "Amanda"
  },
  {
    src: "https://res.cloudinary.com/medicspot/image/upload/v1748540002/testimonials/thumbnail/Natasha_Love_-_after_3_months-esv2-90p-bg-10p.avif", 
    alt: "Natasha - Customer testimonial",
    name: "Natasha"
  },
  {
    src: "https://res.cloudinary.com/medicspot/image/upload/v1748539996/testimonials/thumbnail/Celie_Williams_-_after_1.75_months-esv2-90p-bg-10p.avif",
    alt: "Celie - Customer testimonial", 
    name: "Celie"
  },
  {
    src: "https://res.cloudinary.com/medicspot/image/upload/v1748539999/testimonials/thumbnail/Debbie_Small_-_after_1_month-esv2-90p-bg-10p.avif",
    alt: "Debbie - Customer testimonial",
    name: "Debbie"
  }
]

export default function CompactTestimonialsBanner() {
  return (
    <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white py-4 px-6 rounded-2xl mx-4 mb-8">
      <div className="flex items-center justify-center gap-4">
        {/* Customer Avatars */}
        <div className="flex -space-x-2">
          {customerAvatars.map((customer, index) => (
            <div
              key={index}
              className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200"
            >
              <Image
                src={customer.src}
                alt={customer.alt}
                fill
                className="object-cover object-center"
                sizes="40px"
              />
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="text-center">
          <p className="text-lg font-semibold">
            Trusted by 227,000+ customers
          </p>
        </div>
      </div>
    </div>
  )
}