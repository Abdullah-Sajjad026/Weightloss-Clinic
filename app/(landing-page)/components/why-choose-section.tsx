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
        smallText=" Why choose Northampton Weight Loss Clinic?"
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
          <CardContent></CardContent>
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
              alt="Mounjaro for weight loss"
              loading="lazy"
              width="368"
              height="178"
              className="ease-snappy w-full scale-100 transition duration-700 group-hover:scale-102 group-hover:brightness-105 max-lg:max-w-sm"
              // sizes="(max-width: 768px) 95vw, (max-width: 1200px) 45vw, 22vw"
              // srcSet="https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-256,q-75 256w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-384,q-75 384w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-640,q-75 640w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-750,q-75 750w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-828,q-75 828w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-1080,q-75 1080w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-1200,q-75 1200w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-1920,q-75 1920w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-2048,q-75 2048w, https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-3840,q-75 3840w"
              src="https://ik.imagekit.io/medicspot/Medicspot%20Box%20Mounjaro.webp?tr=w-3840,q-75"
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
          <CardContent></CardContent>
        </Card>
      </div>
    </section>
  );
}
