"use client"

import { useState } from "react"
import { Marquee } from "@/components/magicui/marquee"
import { Play } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    period: "after 5 months",
    initials: "SM",
    color: "bg-blue-500",
    quote: "I've lost 3 stone in 5 months! The support has been incredible.",
    progress: "Lost 42 lbs"
  },
  {
    id: 2,
    name: "Anonymous",
    period: "after 3 months",
    initials: "A",
    color: "bg-green-500",
    quote: "The medication really helped curb my appetite. Amazing results!",
    progress: "Lost 28 lbs"
  },
  {
    id: 3,
    name: "Emma R.",
    period: "after 3 months",
    initials: "ER",
    color: "bg-purple-500",
    quote: "I feel like a completely different person. So much more confidence!",
    progress: "Lost 35 lbs"
  },
  {
    id: 4,
    name: "Michael T.",
    period: "after 3 months",
    initials: "MT",
    color: "bg-orange-500",
    quote: "The support group kept me motivated every day.",
    progress: "Lost 31 lbs"
  },
  {
    id: 5,
    name: "Lisa K.",
    period: "after 2 months",
    initials: "LK",
    color: "bg-pink-500",
    quote: "Even in less than 2 months, the changes are remarkable!",
    progress: "Lost 18 lbs"
  },
  {
    id: 6,
    name: "David P.",
    period: "after 1 month",
    initials: "DP",
    color: "bg-indigo-500",
    quote: "Just one month in and I can already see the difference!",
    progress: "Lost 12 lbs"
  }
]

export default function TestimonialsSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null)

  return (
    <div className="relative w-full overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-0 py-6 text-center">
        {/* Header */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-0 py-6 text-center">
          <h2 className="text-primary-600 text-center text-base/7 font-semibold">
            Testimonials
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
            Real people, real results
          </p>
          <p className="mt-4 mb-6 max-w-(--breakpoint-sm) lg:text-lg prose text-balance">
            See what people on the Regent Pharmacy weight loss programme have to say
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee
            className="py-12 [--duration:100s] [--gap:1rem] md:[--gap:2.5rem]"
            pauseOnHover
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="relative aspect-[3/4] w-44 overflow-hidden rounded-3xl shadow-xl ring-1 ring-gray-900/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl md:w-52">
                  {/* Avatar placeholder instead of image */}
                  <div className={`w-full h-full flex items-center justify-center text-white text-4xl font-bold ${testimonial.color}`}>
                    {testimonial.initials}
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm">
                      <Play className="h-6 w-6 text-gray-900" />
                    </div>
                  </div>

                  {/* Gradient overlay for text */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="p-4 text-white">
                      <p className="text-lg font-semibold">{testimonial.name}</p>
                      <p className="text-sm opacity-90">{testimonial.period}</p>
                      <p className="mt-1 text-xs text-green-300 font-medium">{testimonial.progress}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent className="max-w-3xl">
          {selectedTestimonial && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{selectedTestimonial.name}</h3>
                  <p className="text-gray-600">{selectedTestimonial.period}</p>
                  <p className="text-green-600 font-medium">{selectedTestimonial.progress}</p>
                </div>
              </div>
              
              {/* Placeholder for video content */}
              <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Play className="h-12 w-12 mx-auto mb-2" />
                  <p>"{selectedTestimonial.quote}"</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}