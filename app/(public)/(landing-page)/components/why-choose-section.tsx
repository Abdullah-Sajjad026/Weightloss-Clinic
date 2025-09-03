"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardStack } from "@/components/ui/card-stack";
import PageSectionTitle from "@/components/ui/page-section-title";
import { MessageSquare, Pill, Users, UserCheck } from "lucide-react";
import Image from "next/image";

export function WhyChooseSection() {
  return (
    <section className="px-4 w-full max-w-7xl mx-auto">
      <PageSectionTitle
        smallText=" Why choose Northampton Weightloss (Powered by Regent Pharmacy)?"
        largeText=" Everything you need to lose weight for good"
      />

      {/* Cards Grid */}

      <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
        {/* round top left of first card  */}
        <Card className="relative lg:row-span-2 rounded-sm rounded-tl-4xl border-0">
          <ShineBorder shineColor="oklch(0.4797 0.2001 299.4828)" />
          <CardHeader>
            <CardTitle>Supportive community</CardTitle>
            <CardDescription>
              Share your wins, get advice and find motivation when you need it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-40 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < 4 ? 'bg-teal-500' : 'bg-gray-300'
                        } animate-pulse`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-teal-700">4.8/5 Rating</div>
                  <div className="text-xs text-gray-600">From 200+ members</div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <MessageSquare className="w-5 h-5 text-teal-500 opacity-60" />
              </div>
              <div className="absolute bottom-3 left-3">
                <Users className="w-5 h-5 text-teal-500 opacity-60" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative max-lg:row-start-1 border-0  rounded-sm">
          <ShineBorder shineColor="oklch(0.4797 0.2001 299.4828)" />
          <CardHeader>
            <CardTitle>Clinically-proven medication</CardTitle>
            <CardDescription>
              Breakthrough weight loss medication proven to deliver up to 26%
              weight loss.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              alt="Mounjaro injection pen for weight loss"
              loading="lazy"
              width="368"
              height="178"
              className="ease-snappy w-full scale-100 transition duration-700 group-hover:scale-102 group-hover:brightness-105 max-lg:max-w-sm rounded-lg"
              src="/products/mounjaro-pen-1.webp"
            />
          </CardContent>
        </Card>

        <Card className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 border-0 rounded-sm">
          <ShineBorder shineColor="oklch(0.4797 0.2001 299.4828)" />
          <CardHeader>
            <CardTitle>Your personal health coach</CardTitle>
            <CardDescription>
              You and your coach will map out a journey to lasting weight loss.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="border-1 border-neutral-200 px-2">
              <div className="flex gap-4 z-40">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[url(https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=130)] bg-cover bg-center inset-ring inset-ring-gray-900/10" />
                <div className="flex flex-col">
                  <h5 className="text-sm font-semibold">
                    Laura
                    <small className="ms-2 text-muted-foreground ">
                      Health Coach
                    </small>
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    Your personal health coach who will guide you through your
                    weight loss journey.
                  </p>
                </div>
              </div>
              {/* <div className="z-30 from-primary-200 via-primary-50 pointer-events-none absolute inset-px rounded-lg bg-white/50 bg-radial-[at_20%_100%] from-0% via-40% to-transparent to-50% shadow-sm ring-1 ring-black/5"></div> */}
              <div className=" z-30 pointer-events-none absolute -inset-px hidden rounded-[inherit] border transition-opacity opacity-100"></div>
            </Card>
          </CardContent>
        </Card>

        <Card className="relative lg:row-span-2 border-0 rounded-sm rounded-tr-4xl">
          <ShineBorder shineColor="oklch(0.4797 0.2001 299.4828)" />
          <CardHeader>
            <CardTitle>Proven results</CardTitle>
            <CardDescription>
              Our members lose an average of 18 pounds in their first 12 weeks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 bg-gradient-to-br from-teal-50 via-white to-teal-50 rounded-lg overflow-hidden">
              <div className="absolute inset-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Weight Loss Progress</div>
                    <div className="text-xs text-teal-600 font-medium">12 weeks</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Week 4</span>
                      <span className="text-xs font-medium">-6 lbs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-400 h-1.5 rounded-full w-1/3"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Week 8</span>
                      <span className="text-xs font-medium">-12 lbs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-500 h-1.5 rounded-full w-2/3"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Week 12</span>
                      <span className="text-xs font-medium">-18 lbs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-600 h-1.5 rounded-full w-full"></div>
                    </div>
                  </div>
                  
                  <div className="text-center pt-2 border-t border-teal-100">
                    <div className="text-lg font-bold text-teal-600">Up to 26%</div>
                    <div className="text-xs text-gray-500">Clinical studies</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
