const customerAvatars = [
  {
    name: "Sarah",
    initials: "S",
    color: "bg-blue-500"
  },
  {
    name: "Michael", 
    initials: "M",
    color: "bg-green-500"
  },
  {
    name: "Emma",
    initials: "E",
    color: "bg-purple-500"
  },
  {
    name: "David",
    initials: "D",
    color: "bg-orange-500"
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
              className={`relative w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-semibold ${customer.color}`}
            >
              {customer.initials}
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="text-center">
          <p className="text-lg font-semibold">
            Trusted by 200+ patients
          </p>
        </div>
      </div>
    </div>
  )
}