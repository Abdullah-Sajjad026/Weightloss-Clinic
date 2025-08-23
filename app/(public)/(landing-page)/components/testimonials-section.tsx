"use client"

import { useState } from "react"
import { Marquee } from "@/components/magicui/marquee"
import { X, Play } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const testimonials = [
  {
    id: 1,
    name: "Amanda",
    period: "after Month 5",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748539985/testimonials/thumbnail/Amanda_-_after_Month_5-esv2-90p-bg-10p.avif",
    videoUrl: "#", // Placeholder for actual video
    quote: "I've lost 3 stone in 5 months! The support has been incredible.",
    progress: "Lost 42 lbs"
  },
  {
    id: 2,
    name: "Anonymous",
    period: "after 3 months",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748539986/testimonials/thumbnail/Anonymous5_-_after_3_months_-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "The medication really helped curb my appetite. Amazing results!",
    progress: "Lost 28 lbs"
  },
  {
    id: 3,
    name: "Natasha Love",
    period: "after 3 months",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748540002/testimonials/thumbnail/Natasha_Love_-_after_3_months-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "I feel like a completely different person. So much more confidence!",
    progress: "Lost 35 lbs"
  },
  {
    id: 4,
    name: "Anonymous",
    period: "after 3 months",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748539990/testimonials/thumbnail/Anonymous4_-_after_3_months-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "The WhatsApp support group kept me motivated every day.",
    progress: "Lost 31 lbs"
  },
  {
    id: 5,
    name: "Celie Williams",
    period: "after 1.75 months",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748539996/testimonials/thumbnail/Celie_Williams_-_after_1.75_months-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "Even in less than 2 months, the changes are remarkable!",
    progress: "Lost 18 lbs"
  },
  {
    id: 6,
    name: "Debbie Small",
    period: "after 1 month",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748539999/testimonials/thumbnail/Debbie_Small_-_after_1_month-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "Just one month in and I can already see the difference!",
    progress: "Lost 12 lbs"
  },
  {
    id: 7,
    name: "Kara-Leigh Jonson",
    period: "after 1 week",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748540000/testimonials/thumbnail/Kara-Leigh_Jonson_-_after_1_week-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "Even after just one week, I'm feeling less hungry and more energetic!",
    progress: "Lost 4 lbs"
  },
  {
    id: 8,
    name: "Brian Mason",
    period: "after 1.5 months",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748540008/testimonials/thumbnail/Brian_Mason_-_after_1.5_month-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "As a man, I was skeptical, but the results speak for themselves!",
    progress: "Lost 22 lbs"
  },
  {
    id: 9,
    name: "Chelsea",
    period: "after 2.5 months",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748539994/testimonials/thumbnail/Chelsea_-_2.5_months-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "The coaching sessions really helped me change my relationship with food.",
    progress: "Lost 26 lbs"
  },
  {
    id: 10,
    name: "Nadine Ashkuri",
    period: "after 3 months",
    thumbnail: "https://res.cloudinary.com/medicspot/image/upload/v1748540004/testimonials/thumbnail/Nadine_Ashkuri_-_After_3_months-esv2-90p-bg-10p.avif",
    videoUrl: "#",
    quote: "Three months ago I couldn't have imagined feeling this good about myself.",
    progress: "Lost 33 lbs"
  }
]

export default function TestimonialsSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null)

  return (
    <div className="relative w-full overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-0 py-6 text-center">
        {/* Header */}
        <div className="z-20 mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-primary-600 text-center text-base/7 font-semibold">
            Testimonials
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
            Real people, real results
          </p>
          <p className="mt-4 mb-6 max-w-(--breakpoint-sm) lg:text-lg prose text-balance">
            See what people on the Medicspot weight loss programme have to say
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee
            className="py-12 [--duration:100s] [--gap:1rem] md:[--gap:2.5rem]"
            pauseOnHover
          >
            {testimonials.map((testimonial) => (
              <Dialog key={testimonial.id}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer group">
                    <div
                      className="relative flex aspect-[9/16] min-w-46 items-center justify-center overflow-hidden rounded-3xl bg-gray-500 bg-cover bg-center shadow-xl ring ring-zinc-900/10 transition-transform hover:scale-105"
                      style={{
                        backgroundImage: `url("${testimonial.thumbnail}")`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 h-full w-full rounded-3xl inset-ring inset-ring-white/30"></div>
                        
                        {/* Play Button Overlay */}
                        <div className="bg-black/50 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>

                      {/* Name Label */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {testimonial.period}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                  <div className="relative bg-black">
                    {/* Video placeholder - in a real implementation, this would be a video player */}
                    <div 
                      className="aspect-video bg-cover bg-center flex items-center justify-center"
                      style={{
                        backgroundImage: `url("${testimonial.thumbnail}")`
                      }}
                    >
                      <div className="bg-black/50 rounded-full p-4">
                        <Play className="w-12 h-12 text-white fill-white" />
                      </div>
                    </div>

                    {/* Testimonial Details */}
                    <div className="p-6 bg-white">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {testimonial.name}
                        </h3>
                        <p className="text-primary-600 font-semibold mb-4">
                          {testimonial.progress}
                        </p>
                        <blockquote className="text-lg text-gray-700 italic mb-4">
                          "{testimonial.quote}"
                        </blockquote>
                        <p className="text-sm text-gray-500">
                          Progress {testimonial.period}
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </Marquee>

          {/* Left fade gradient */}
          <div 
            className="absolute inset-y-0 left-0 w-[20%] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, rgb(249, 245, 255) 0%, rgba(249, 245, 255, 0) 100%)'
            }}
          >
            {/* Progressive blur layers */}
            <div className="absolute inset-0" style={{ mask: 'linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 16.6667%)', backdropFilter: 'blur(10px)' }}></div>
            <div className="absolute inset-0" style={{ mask: 'linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 16.6667%, rgba(0, 0, 0, 0) 33.3333%)', backdropFilter: 'blur(5.4928px)' }}></div>
            <div className="absolute inset-0" style={{ mask: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 16.6667%, rgb(0, 0, 0) 33.3333%, rgba(0, 0, 0, 0) 50%)', backdropFilter: 'blur(3.01709px)' }}></div>
          </div>

          {/* Right fade gradient */}
          <div 
            className="absolute inset-y-0 right-0 w-[20%] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to left, rgb(249, 245, 255) 0%, rgba(249, 245, 255, 0) 100%)'
            }}
          >
            {/* Progressive blur layers */}
            <div className="absolute inset-0" style={{ mask: 'linear-gradient(to left, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 16.6667%)', backdropFilter: 'blur(10px)' }}></div>
            <div className="absolute inset-0" style={{ mask: 'linear-gradient(to left, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 16.6667%, rgba(0, 0, 0, 0) 33.3333%)', backdropFilter: 'blur(5.4928px)' }}></div>
            <div className="absolute inset-0" style={{ mask: 'linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 16.6667%, rgb(0, 0, 0) 33.3333%, rgba(0, 0, 0, 0) 50%)', backdropFilter: 'blur(3.01709px)' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}