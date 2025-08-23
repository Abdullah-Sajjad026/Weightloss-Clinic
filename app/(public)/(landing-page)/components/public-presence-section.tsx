import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const logos = [
  {
    src: "/logos/Mirror-Logo.svg",
    alt: "Mirror Logo",
    height: "h-12",
  },
  {
    src: "/logos/Metro-Logo.svg",
    alt: "Metro Logo",
    height: "h-9",
  },
  {
    src: "/logos/Patient-Logo.svg",
    alt: "Patient Logo",
    height: "h-11",
  },
  {
    src: "/logos/Daily-Star-Logo.svg",
    alt: "Daily Star Logo",
    height: "h-12",
  },
  {
    src: "/logos/Daily-Express-Logo.svg",
    alt: "Daily Express Logo",
    height: "h-9",
  },
  {
    src: "/logos/Health-Wellbeing-Logo.svg",
    alt: "Health & Wellbeing Logo",
    height: "h-13",
  },
  {
    src: "/logos/Daily-Mail-Logo.svg",
    alt: "Daily Mail Logo",
    height: "h-9",
  },
  {
    src: "/logos/Independent-Logo.svg",
    alt: "Independent Logo",
    height: "h-9",
  },
  {
    src: "/logos/The-Sun-Logo.svg",
    alt: "The Sun Logo",
    height: "h-12",
  },
  {
    src: "/logos/Scotsman-Logo.svg",
    alt: "Scotsman Logo",
    height: "h-10",
  },
  {
    src: "/logos/Womens-Health-Logo.svg",
    alt: "Womens Health Logo",
    height: "h-9",
  },
  {
    src: "/logos/The-Times-Logo.svg",
    alt: "The Times Logo",
    height: "h-8",
  },
];

export default function PublicPresenceSection() {
  return (
    <div className="w-full max-w-7xl py-6">
      <p className="text-primary-600 text-center text-base/7 font-semibold mb-6">
        You might have seen Medicspot in
      </p>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-6">
        <Marquee className="[--duration:10s] [--gap:3rem]" pauseOnHover>
          {logos.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={48}
              className={`${logo.height} object-contain opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
              loading="lazy"
            />
          ))}
        </Marquee>

        {/* Left fade gradient */}
        <div
          className="absolute inset-y-0 left-0 w-[20%] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, rgb(249, 245, 255) 0%, rgba(249, 245, 255, 0) 100%)",
          }}
        />

        {/* Right fade gradient */}
        <div
          className="absolute inset-y-0 right-0 w-[20%] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to left, rgb(249, 245, 255) 0%, rgba(249, 245, 255, 0) 100%)",
          }}
        />
      </div>
    </div>
  );
}
