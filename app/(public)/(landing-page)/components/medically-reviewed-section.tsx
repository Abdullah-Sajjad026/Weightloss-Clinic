import Link from "next/link";
import { ShieldCheck, Globe, LinkedinIcon, PodcastIcon } from "lucide-react";

const VerificationBadge = () => (
  <ShieldCheck className="text-primary-400 size-7" />
);

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adamabbs/",
    icon: LinkedinIcon,
  },
  {
    name: "Website",
    href: "https://www.adamabbs.com/",
    icon: Globe,
  },
  {
    name: "Research Gate",
    href: "https://www.researchgate.net/profile/Adam-Abbs",
    icon: () => (
      <svg
        className="w-5"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 32 32"
      >
        <g fillRule="nonzero">
          <path
            fill="currentColor"
            d="M32.04 15.97a16.03 16.03 0 1 1-32.06 0 16.03 16.03 0 0 1 32.06 0m-14.79 7c-1.43-.28-2.28-1.11-4.45-4.33-.72-1.08-.72-1.08-1.42-1.13-1.03-.07-.95-.25-.92 2.02.04 2.58.01 2.52 1.5 2.77.39.06.42.09.42.32 0 .26 0 .26-2.62.28-2.46.02-2.62.01-2.67-.14-.1-.29.05-.43.59-.53q.9-.16 1.01-.78c.04-.16.05-2.32.03-4.8-.03-5.21.03-4.9-.93-5.11-.6-.13-.79-.27-.71-.51.06-.16.19-.17 2.92-.22 4.06-.08 4.82.05 5.9 1.01a2.8 2.8 0 0 1 .39 3.84c-.4.58-1.2 1.2-1.82 1.43-.29.11-.53.23-.53.27 0 .12.92 1.43 1.49 2.13 1.52 1.85 2.34 2.57 3.19 2.79.53.14.68.29.53.55s-.96.33-1.9.14m-3.83-6.63c2-.82 2.15-3.57.25-4.38-.49-.21-.62-.22-1.85-.22-1.33 0-1.33 0-1.35 2.31-.02 1.27-.01 2.37.02 2.43.09.21 2.34.1 2.93-.14m6.97-2.85c-1.55-.29-2.06-1.24-1.98-3.68.04-1.35.15-1.72.67-2.28.92-.99 3.2-.9 4.04.16.36.45.33.59-.17.74-.39.13-.39.13-.75-.23-.85-.82-2.32-.52-2.58.54-.13.47-.12 2.46.01 2.91.35 1.27 2.46 1.27 2.82 0 .22-.81.17-.87-.8-.92-.47-.02-.47-.02-.47-.41s0-.38 1.12-.41c1.45-.03 1.43-.05 1.36 1.01-.09 1.33-.45 1.97-1.32 2.35-.57.24-1.35.33-1.95.22"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "talkhealth",
    href: "https://www.talkhealthpartnership.com/blog/author/dr-adam-abbs/",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 164 160"
        className="w-5"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M164 0H0v117h55.6l46.9 42.5V117H164z"
          clipRule="evenodd"
        />
        <path
          fill="#fff"
          d="M113.7 38.9q6.3 0 11.4 2.6a18 18 0 0 1 8 7.8q3 5.3 3 13.7v31h-19V66.1q0-5.8-2.4-8.4a8 8 0 0 0-6.5-2.7q-3 0-5.5 1.4a9 9 0 0 0-3.9 4.1q-1.5 2.8-1.4 7.3V94h-19V19.8h19v35.4L93 50.7q3.1-6 8.5-8.8 5.4-3 12.2-3m-55.8 56q-10.4 0-16.2-5.1-5.8-5.3-5.8-15.6V27.7h19V74q0 3 1.6 4.6 1.5 1.5 4.1 1.6 3.4 0 5.8-1.7l4.7 13.3q-2.4 1.5-5.9 2.3t-7.3.8M28 56V41.8h39.3V56z"
        />
      </svg>
    ),
  },
  {
    name: "Amazon",
    href: "https://www.amazon.co.uk/Books-Dr-Adam-David-Abbs/s?rh=n%3A266239%2Cp_27%3ADr+Adam+David+Abbs",
    icon: () => (
      <svg
        className="w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M16.8 13.1c-.5-.7-1-1.2-1-2.5V6.2c0-1.8 0-3.6-1.4-4.8A7 7 0 0 0 10 0C7 0 4.4 1.2 3.7 4.5q0 .5.4.6l2.9.2q.4 0 .5-.5.5-1.8 2.3-2c.6 0 1.8.6 1.8 1.8v1.6q-2.8-.1-5.3.8C4.5 7.7 3 9 3 11.4c0 3 2.2 4.5 4.6 4.5 2 0 3.2-.5 4.7-2 .5.7.8 1.2 1.8 2h.6l2.1-2q.4-.3 0-.8M11.6 9c0 1-.2 3.7-3 3.7-1.3 0-1.3-1.6-1.3-1.6 0-2.1 2.2-2.8 4.3-2.8zm6.6 8.8a17 17 0 0 1-18.2-1q-.1-.4.3-.3a22 22 0 0 0 9.7 2.1c2.4 0 5.4-.4 8-1.3q.6.1.2.5m.8-1c-.2-.2-1.8 0-2.5 0q-.4 0 0-.3c1.2-.7 3.2-.5 3.4-.3s0 2-1.2 2.8q-.3.2-.2 0c.2-.6.8-1.8.5-2.1"
        />
      </svg>
    ),
  },
  {
    name: "Medium",
    href: "https://medium.com/@adam.abbs",
    icon: () => (
      <svg
        className="w-5"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        viewBox="0 -55 256 256"
        fill="currentColor"
      >
        <path d="M72.2 0a72.4 72.4 0 0 1 72.2 72.7 72.4 72.4 0 0 1-72.2 72.7A72.5 72.5 0 0 1 0 72.7 72.5 72.5 0 0 1 72.2 0m115.3 4.3c20 0 36.1 30.6 36.1 68.4s-16.2 68.4-36.1 68.4-36.1-30.6-36.1-68.4 16.2-68.4 36.1-68.4m55.8 7c7 0 12.7 27.5 12.7 61.4 0 33.8-5.7 61.3-12.7 61.3s-12.7-27.4-12.7-61.3 5.7-61.3 12.7-61.3" />
      </svg>
    ),
  },
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/gb/podcast/ep89-dr-adam-abbs-medical-lead-at-hurdle-bio-gp-digital/id1603847676?i=1000638417734",
    icon: PodcastIcon,
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/episode/74LJXBJQdkNRjiBJloE7m3",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 168 168"
        className="w-5"
      >
        <path
          fill="currentColor"
          d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738zm38.404 120.78a5.217 5.217 0 0 1-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.22 5.22 0 0 1-6.249-3.93 5.213 5.213 0 0 1 3.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18m10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.54 6.54 0 0 1 4.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 0 1 5.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 0 1 2.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
        />
      </svg>
    ),
  },
];

export default function MedicallyReviewedSection() {
  return (
    <section className="pmx-auto px-4 max-w-7xl">
      <div className="ring-primary-500/20 bg-transparent items-start text-left rounded-5xl flex w-full flex-col px-4 py-6 lg:p-10">
        <div className="mx-auto grid grid-cols-1 gap-x-20 gap-y-20 xl:grid-cols-5">
          {/* Left Content */}
          <div className="max-w-2xl xl:col-span-2">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 lg:text-3xl">
              Medically reviewed
              <VerificationBadge />
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-lg text-zinc-700">
              <p>
                This page was last medically reviewed by Dr&nbsp;Adam&nbsp;Abbs
                on <b>8 Jan 2025</b>.
              </p>
              <p>
                DigitalClinicSystem is committed to providing you
                with the most objective, trustworthy and accurate health
                information.
              </p>
              <p>
                Our content is regularly updated to reflect the latest medical
                research and guidelines.
              </p>
            </div>
          </div>

          {/* Doctor Profile */}
          <div className="xl:col-span-3">
            <ul
              role="list"
              className="-mt-12 space-y-12 divide-y divide-zinc-200"
            >
              <li className="flex flex-col gap-10 pt-12 sm:flex-row">
                {/* Doctor Photo - Placeholder */}
                <div className="aspect-4/5 w-56 flex-none rounded-2xl bg-gray-200 shadow-xl ring shadow-zinc-950/10 ring-zinc-950/10 relative">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto bg-primary-300 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-primary-700">
                          DA
                        </span>
                      </div>
                      <p className="text-sm text-primary-600 font-medium">
                        Dr Adam Abbs
                      </p>
                      <p className="text-xs text-primary-500">
                        Photo placeholder
                      </p>
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="max-w-xl flex-auto">
                  <h3 className="text-lg leading-8 font-semibold tracking-tight text-zinc-900">
                    Dr Adam Abbs
                  </h3>
                  <p className="text-sm leading-7 text-zinc-700">
                    MBBS FRCGP PGCCE FHEA
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-700">
                    Dr Adam Abbs is an NHS-trained GP with a keen focus on
                    digital health, AI in healthcare, and personalised medicine,
                    including weight loss. He is a leader in creating new ways
                    to provide safe and easy-to-access healthcare through remote
                    care. Dr Abbs is also a skilled medical writer and wrote the
                    RCGP-accredited Remote Consultation Handbook in 2020, and
                    shares his weight loss expertise on the blog{" "}
                    <Link
                      href="https://gastricsurgeryturkey.co.uk/"
                      target="_blank"
                      className="text-primary-700 font-medium underline underline-offset-2 hover:opacity-70"
                    >
                      Gastric&nbsp;Guru
                    </Link>
                    .
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-700">
                    GMC Number:{" "}
                    <Link
                      href="https://www.gmc-uk.org/doctors/7078829"
                      target="_blank"
                      className="text-zinc-700 font-medium underline underline-offset-2 hover:opacity-70"
                    >
                      7078829
                    </Link>
                  </p>

                  {/* Social Links */}
                  <ul role="list" className="mt-6 flex gap-x-6 flex-wrap">
                    {socialLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            target="_blank"
                            className="text-zinc-400 hover:text-zinc-500 transition-colors"
                          >
                            <span className="sr-only">{link.name}</span>
                            <IconComponent className="h-5 w-5" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
