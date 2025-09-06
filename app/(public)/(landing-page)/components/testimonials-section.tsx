"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  treatment: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    initials: "SJ",
    location: "London",
    rating: 5,
    text: "The medical team was incredibly professional and supportive throughout my weight loss journey. I've lost 15kg in 4 months and feel amazing!",
    treatment: "Semaglutide Treatment",
  },
  {
    id: "2",
    name: "Michael Roberts",
    initials: "MR",
    location: "Manchester",
    rating: 5,
    text: "Excellent service from start to finish. The consultation was thorough and the medication has been life-changing. Highly recommend!",
    treatment: "Tirzepatide Program",
  },
  {
    id: "3",
    name: "Emma Williams",
    initials: "EW",
    location: "Birmingham",
    rating: 5,
    text: "Professional, discrete, and effective. The online consultation process was smooth and the results speak for themselves.",
    treatment: "Orlistat + Support",
  },
  {
    id: "4",
    name: "David Thompson",
    initials: "DT",
    location: "Leeds",
    rating: 5,
    text: "The medical review process gave me confidence in the treatment. Great communication and follow-up care throughout.",
    treatment: "Liraglutide Treatment",
  },
  {
    id: "5",
    name: "Lisa Clarke",
    initials: "LC",
    location: "Bristol",
    rating: 5,
    text: "Amazing results in just 6 months. The team's expertise and ongoing support made all the difference in my weight loss success.",
    treatment: "Combined Program",
  },
  {
    id: "6",
    name: "James Mitchell",
    initials: "JM",
    location: "Newcastle",
    rating: 5,
    text: "Fast, professional service with real results. The medication quality is excellent and delivery was always on time.",
    treatment: "Semaglutide + Lifestyle",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Patients Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Real stories from real patients who have transformed their lives
          </p>
          <div className="mt-6 flex justify-center items-center space-x-2">
            <StarRating rating={5} />
            <span className="text-sm text-gray-600 ml-2">
              4.9/5 from over 200+ patients
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary-500 fill-current" />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 mb-6">
                  "{testimonial.text}"
                </blockquote>

                {/* Treatment */}
                <div className="mb-4">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                    {testimonial.treatment}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary-500 text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-primary-600">200+</div>
              <div className="text-sm text-gray-600">Successful Treatments</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">4.9/5</div>
              <div className="text-sm text-gray-600">Patient Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
