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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        <Card className="relative border-0 rounded-lg">
          <ShineBorder shineColor="oklch(0.4797 0.2001 299.4828)" />
          <CardHeader>
            <CardTitle>Clinically-Proven Medication</CardTitle>
            <CardDescription>
              Access to breakthrough medications like Mounjaro and Wegovy. FDA-approved treatments proven to deliver up to 26% weight loss in clinical studies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Image
                alt="Mounjaro injection pen for weight loss"
                loading="lazy"
                width="368"
                height="178"
                className="ease-snappy w-full scale-100 transition duration-700 group-hover:scale-102 group-hover:brightness-105 rounded-lg"
                src="/products/mounjaro-pen-1.webp"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-700">MHRA Approved</span>
                  <span className="text-xs font-bold text-primary-600">Clinically Proven</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative border-0 rounded-lg">
          <ShineBorder shineColor="oklch(0.4797 0.2001 299.4828)" />
          <CardHeader>
            <CardTitle>Personal Health Coach</CardTitle>
            <CardDescription>
              Get one-on-one support from qualified health coaches. They'll create a personalized plan and provide ongoing guidance throughout your entire weight loss journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Card className="border-1 border-neutral-200 p-3">
                <div className="flex gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 font-semibold text-sm inset-ring inset-ring-gray-900/10">
                    HC
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-sm font-semibold">
                      Laura
                      <small className="ms-2 text-muted-foreground">
                        Health Coach
                      </small>
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Your personal health coach who will guide you through your weight loss journey.
                    </p>
                  </div>
                </div>
              </Card>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <div className="text-xs font-medium">Personalized Plans</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <div className="text-xs font-medium">Regular Check-ins</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative border-0 rounded-lg md:col-span-2 lg:col-span-1">
          <ShineBorder shineColor="oklch(0.4797 0.2001 299.4828)" />
          <CardHeader>
            <CardTitle>Proven Results</CardTitle>
            <CardDescription>
              Real results you can trust. Our members lose an average of 18 pounds in their first 12 weeks, with clinical studies showing up to 26% total body weight loss.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-teal-50 via-white to-teal-50 rounded-lg overflow-hidden p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Weight Loss Progress</div>
                  <div className="text-xs text-teal-600 font-medium">12 weeks</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Week 4</span>
                    <span className="text-xs font-medium">-6 lbs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-400 h-2 rounded-full w-1/3"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Week 8</span>
                    <span className="text-xs font-medium">-12 lbs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-2/3"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Week 12</span>
                    <span className="text-xs font-medium">-18 lbs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-teal-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="text-xl font-bold text-teal-600">Up to 26%</div>
                      <div className="text-xs text-gray-500">Clinical studies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-teal-600">18 lbs</div>
                      <div className="text-xs text-gray-500">Avg. 12 weeks</div>
                    </div>
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
