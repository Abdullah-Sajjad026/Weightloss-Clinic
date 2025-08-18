"use client";

import { WeightLossCalculator } from "./weight-loss-calculator";

export function HeroSection() {
  return (
    <>
      <div className="-mt-6 w-full px-3 sm:px-6 lg:-mt-2">
        <div className="bg-primary-200 rounded-5xl via-primary-100 to-primary-200 ring-primary-300/50 shadow-primary-900/5 bg-gradient-to-b from-white via-90% shadow-xl ring inset-ring inset-ring-white/40">
          <div className="ring-primary-500/20 bg-[length:100%_auto] bg-top bg-no-repeat bg-blend-overlay ring-1 ring-inset items-start text-left rounded-5xl flex w-full flex-col px-4 lg:p-10 bg-primary-800 relative overflow-hidden bg-[radial-gradient(ellipse_70%_80%_at_bottom,var(--color-primary-700),var(--color-primary-900))] py-4">
            <div className="rounded-5xl ring-primary-100/60 pointer-events-none absolute top-0 left-0 z-20 h-full w-full shadow-inner ring-1 ring-inset" />
            <div className="animate-noise pointer-events-none absolute -top-[100%] -left-[100%] z-20 h-[200%] w-[200%] bg-[url(https://ik.imagekit.io/medicspot/noise-light.webp)] bg-[size:90px] opacity-80"></div>

            <div className="z-20 mx-auto grid w-full max-w-[1600px] grid-cols-1 flex-wrap items-center justify-center gap-6 xl:grid-cols-[1fr_745px] xl:flex-row xl:justify-between 2xl:grid-cols-[1fr_790px]">
              <div className="z-10 mb-4 flex h-full w-full items-center justify-center xl:mb-0">
                <div className="w-full max-w-[600px] flex-col items-center gap-4 p-4 sm:gap-8">
                  <div className="">
                    <div className="mb-8 flex justify-center lg:-mt-4 xl:justify-start">
                      <div className="flex cursor-pointer items-center justify-center gap-3 rounded-full bg-transparent py-1.5 opacity-80 transition hover:opacity-100 active:scale-98 sm:pr-4 sm:pl-2 sm:hover:bg-white/10 sm:hover:inset-ring sm:hover:inset-ring-white/5 lg:justify-start">
                        <div className="flex -space-x-2">
                          <img
                            alt="Medicspot Member"
                            src="https://res.cloudinary.com/medicspot/image/upload/website/person-1.avif"
                            width="20"
                            height="20"
                            className="size-7 rounded-full shadow-lg ring-2 ring-white"
                          />
                          <img
                            alt="Medicspot Member"
                            src="https://res.cloudinary.com/medicspot/image/upload/website/person-2.avif"
                            width="20"
                            height="20"
                            className="size-7 rounded-full shadow-lg ring-2 ring-white"
                          />
                          <img
                            alt="Medicspot Member"
                            src="https://res.cloudinary.com/medicspot/image/upload/website/person-3.avif"
                            width="20"
                            height="20"
                            className="size-7 rounded-full shadow-lg ring-2 ring-white"
                          />
                          <img
                            alt="Medicspot Member"
                            src="https://res.cloudinary.com/medicspot/image/upload/website/person-4.avif"
                            width="20"
                            height="20"
                            className="size-7 rounded-full shadow-lg ring-2 ring-white"
                          />
                        </div>
                        <div className="text-sm text-white">
                          Trusted by 227
                          <span className="hidden sm:inline">,000</span>
                          <span className="inline sm:hidden">k</span>+ customers
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="prose block w-full text-center text-balance xl:text-left">
                    <h2 className="mb-6 text-4xl font-semibold tracking-tight text-white text-shadow-md sm:text-5xl 2xl:text-6xl">
                      Achieve 26% weight loss without surgery
                    </h2>
                    <p className="text-primary-100 text-base text-shadow-sm sm:text-lg md:text-xl/8">
                      People in Northampton are losing around 26% of their body
                      weight with our breakthrough weight loss medication. Enter
                      your height and weight and find out how much you could
                      lose.
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-center gap-5 xl:justify-start">
                    <a
                      className="bg-secondary-700 hover:bg-secondary-600 active:bg-secondary-800 shadow-secondary-950/10 inset-ring-secondary-100/20 text-white inset-shadow-secondary-50/10 inline-flex duration-50 gap-1 items-center justify-center rounded-full px-6 py-2 font-medium transition-all hover:shadow-md active:shadow-inner ring ring-zinc-900/10 inset-shadow-sm inset-ring disabled:cursor-not-allowed disabled:opacity-70 relative z-10 text-lg"
                      href="/assessment"
                    >
                      Get started
                    </a>
                    <div className="text-primary-200 text-lg font-medium text-shadow-sm">
                      from £45/week
                    </div>
                  </div>
                  <div className="mt-7 flex w-full items-center justify-center gap-2 text-base font-medium text-white/90 md:hidden">
                    <svg
                      className="text-primary-400 size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52 52"
                      fill="currentColor"
                    >
                      <path d="M26 2c3 0 5.4 3.3 8 4.4s7 .5 9 2.7 1.4 6 2.6 8.8S50 23 50 26s-3.3 5.4-4.4 8-.5 7-2.7 9-6 1.5-8.8 2.6S29 50 26 50s-5.4-3.3-8-4.4-7-.5-9-2.7-1.5-6-2.6-8.8S2 29 2 26s3.3-5.4 4.4-8 .5-7 2.7-9 6-1.5 8.8-2.6S23 2 26 2m0 7.6A16.4 16.4 0 1 0 42.4 26 16.5 16.5 0 0 0 26 9.6m7.6 9.1 1.6 1.6a1.3 1.3 0 0 1 0 1.5L25.1 33a2 2 0 0 1-1.6.7 2 2 0 0 1-1.6-.7l-5.5-5.5a1 1 0 0 1-.1-1.4V26l1.7-1.5a1 1 0 0 1 1.5-.1h.1l3.9 4 8.6-9.7a1 1 0 0 1 1.5 0"></path>
                    </svg>
                    Money Back Guarantee
                  </div>
                </div>
              </div>

              {/* Right Side - Phone Images and Calculator */}
              <div className="grid h-full w-full grid-cols-1 items-center justify-end gap-3 lg:grid-cols-11 lg:gap-5">
                {/* Phone and Medicine Images */}
                <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-3 lg:col-span-3 lg:grid-cols-1 lg:grid-rows-2 lg:gap-5">
                  <div className="bg-tertiary-200 relative aspect-square h-full w-full rounded-xl rounded-tl-4xl bg-[url(https://ik.imagekit.io/medicspot/Mounjaro%20Phone.jpg?tr=w-400)] bg-cover bg-center">
                    <div className="pointer-events-none absolute -inset-px hidden rounded-[inherit] border transition-opacity opacity-100"></div>
                  </div>
                  <div className="bg-secondary-600 relative aspect-square h-full w-full rounded-xl rounded-tr-4xl bg-[url(https://ik.imagekit.io/medicspot/Mounjaro%20Box.jpg?tr=w-400)] bg-cover bg-center lg:rounded-tr-xl lg:rounded-bl-4xl">
                    <div className="pointer-events-none absolute -inset-px hidden rounded-[inherit] border transition-opacity opacity-100"></div>
                  </div>
                </div>

                {/* Calculator Form */}
                <div className="relative z-10 h-full w-full rounded-xl rounded-b-3xl lg:col-span-8 lg:rounded-l-xl lg:rounded-r-3xl">
                  <WeightLossCalculator />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center justify-evenly gap-3 px-6 py-2 lg:grid-cols-3 lg:py-1">
          <div className="text-primary-800 flex items-center justify-center px-5 py-2.5 text-base font-medium lg:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
            >
              <path
                d="M9.24601 6.61105C9.03276 8.25332 10.35 9.77729 10.35 9.77729C10.35 9.77729 12.013 8.6386 12.2262 6.99633C12.4395 5.35405 11.1223 3.83008 11.1223 3.83008C11.1223 3.83008 9.45927 4.96877 9.24601 6.61105Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.68301 12.1301C8.37906 13.6334 10.3074 14.2234 10.3074 14.2234C10.3074 14.2234 11.1071 12.3759 10.4111 10.8726C9.71504 9.36923 7.78674 8.7793 7.78674 8.7793C7.78674 8.7793 6.98696 10.6267 7.68301 12.1301Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              ></path>
              <path
                d="M8.50364 17.4151C9.83175 18.4083 11.8095 18.0136 11.8095 18.0136C11.8095 18.0136 11.634 16.0089 10.3059 15.0157C8.97775 14.0226 7 14.4172 7 14.4172C7 14.4172 7.17554 16.422 8.50364 17.4151Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12.1131 21.7134C13.6181 22.4115 15.4716 21.6181 15.4716 21.6181C15.4716 21.6181 14.8851 19.6926 13.3801 18.9944C11.8751 18.2962 10.0216 19.0897 10.0216 19.0897C10.0216 19.0897 10.6081 21.0152 12.1131 21.7134Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              ></path>
              <path
                d="M13.7813 2.96764C12.5708 4.10058 12.6174 6.11247 12.6174 6.11247C12.6174 6.11247 14.6267 6.28752 15.8372 5.15458C17.0477 4.02165 17.001 2.00975 17.001 2.00975C17.001 2.00975 14.9918 1.83471 13.7813 2.96764Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div>Official</div>
            <a
              className="opacity-100 transition hover:opacity-70"
              aria-label="Medicspot"
              href="/assessment"
            >
              <div className="text-sm">medicspot</div>
            </a>
            <div>Partner</div>
          </div>

          <a
            className="hidden opacity-100 transition hover:opacity-70 md:flex"
            target="_blank"
            aria-label="Trustpilot reviews"
            href="https://uk.trustpilot.com/review/medicspot.co.uk"
          >
            <div className="flex items-center gap-4">
              <div className="text-white font-semibold">Excellent</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-green-400 rounded-sm">
                    ★
                  </div>
                ))}
              </div>
              <div className="text-sm text-primary-200">
                12,284 reviews on Trustpilot
              </div>
            </div>
          </a>

          <div className="mt-3 hidden justify-center md:mb-2 md:flex lg:mt-0 lg:mb-0">
            <button aria-label="Money Back Guarantee">
              <div className="text-primary-800 flex items-center justify-center gap-2 text-base font-medium opacity-100 transition hover:opacity-80 lg:text-lg">
                <svg
                  className="text-primary-600 size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                  fill="currentColor"
                >
                  <path d="M26 2c3 0 5.4 3.3 8 4.4s7 .5 9 2.7 1.4 6 2.6 8.8S50 23 50 26s-3.3 5.4-4.4 8-.5 7-2.7 9-6 1.5-8.8 2.6S29 50 26 50s-5.4-3.3-8-4.4-7-.5-9-2.7-1.5-6-2.6-8.8S2 29 2 26s3.3-5.4 4.4-8 .5-7 2.7-9 6-1.5 8.8-2.6S23 2 26 2m0 7.6A16.4 16.4 0 1 0 42.4 26 16.5 16.5 0 0 0 26 9.6m7.6 9.1 1.6 1.6a1.3 1.3 0 0 1 0 1.5L25.1 33a2 2 0 0 1-1.6.7 2 2 0 0 1-1.6-.7l-5.5-5.5a1 1 0 0 1-.1-1.4V26l1.7-1.5a1 1 0 0 1 1.5-.1h.1l3.9 4 8.6-9.7a1 1 0 0 1 1.5 0"></path>
                </svg>
                Money Back Guarantee
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
