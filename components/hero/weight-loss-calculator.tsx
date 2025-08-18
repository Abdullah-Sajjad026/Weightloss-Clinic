"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAppStore } from "@/lib/store"
import { WeightLossChart } from "./weight-loss-chart"

const calculatorSchema = z.object({
  feet: z.number().min(3, "Height is required").max(8, "Invalid height"),
  inches: z.number().min(0, "Inches required").max(12, "Invalid inches"),
  stone: z.number().min(5, "Weight is required").max(100, "Invalid weight"),
  pounds: z.number().min(0, "Pounds required").max(14, "Invalid pounds"),
  isMetric: z.boolean().default(false)
})

type CalculatorForm = z.infer<typeof calculatorSchema>

export function WeightLossCalculator() {
  const [showResults, setShowResults] = useState(false)
  const [isMetric, setIsMetric] = useState(false)
  const [calculationResults, setCalculationResults] = useState<{
    potentialLoss: number
    weightChange: number
    bmi: number
    currentWeight: number
  } | null>(null)
  
  const { updateAssessment } = useAppStore()

  const form = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      feet: 5,
      inches: 8,
      stone: 15,
      pounds: 9,
      isMetric: false
    }
  })

  const calculateWeightLoss = (data: CalculatorForm) => {
    // Convert to metric for calculations
    const heightInCm = (data.feet * 30.48) + (data.inches * 2.54)
    const weightInKg = (data.stone * 6.35029) + (data.pounds * 0.453592)

    // Calculate BMI
    const heightInM = heightInCm / 100
    const bmi = weightInKg / (heightInM * heightInM)

    // Calculate potential weight loss (26% as mentioned in the design)
    const potentialLossKg = weightInKg * 0.26
    const weightChange = -26 // percentage

    return {
      potentialLoss: Math.round(potentialLossKg),
      weightChange,
      bmi: Math.round(bmi * 10) / 10,
      currentWeight: Math.round(weightInKg)
    }
  }

  const onSubmit = (data: CalculatorForm) => {
    const results = calculateWeightLoss(data)
    setCalculationResults(results)
    setShowResults(true)
    
    // Store in global state
    updateAssessment({
      height: data.feet + (data.inches / 12),
      weight: data.stone + (data.pounds / 14),
      heightUnit: "feet",
      weightUnit: "stone"
    })
  }

  if (showResults && calculationResults) {
    return <WeightLossChart results={calculationResults} onBack={() => setShowResults(false)} />
  }

  return (
    <div className="shadow-primary-950/5 ring-primary-950/10 flex min-h-[460px] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-white text-left shadow-xl ring-1 rounded-xl rounded-b-3xl lg:rounded-l-xl lg:rounded-r-3xl">
      <div className="w-full px-6 py-8 sm:p-12" style={{opacity: 1, transform: "none"}}>
        <div>
          <h2 className="text-primary-950 mb-2 flex items-center gap-1 text-xl font-semibold text-balance sm:text-2xl">
            See how much you could lose 
          </h2>
          <p className="mb-6 text-base text-zinc-700">
            Based on the results of a clinical study with 806 participants.
          </p>
        </div>
        
        <form className="flex w-full flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Height Section */}
          <div>
            <div className="text-primary-950 mb-3 text-base font-semibold">
              What is your height?
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
              <div className="grid w-80 origin-bottom-left grid-cols-2 gap-3" style={{opacity: 1, transform: "none"}}>
                <div className="shadow-primary-800/5 ring-primary-800/30 focus-within:shadow-primary-800/10 focus-within:ring-primary-600/80 relative flex rounded-lg shadow-md ring-1 focus-within:shadow-lg focus-within:ring-1 sm:max-w-md">
                  <input 
                    id="feet" 
                    inputMode="numeric" 
                    pattern="[0-9]*" 
                    title="Height in feet" 
                    className="w-full flex-1 border-0 bg-transparent py-2.5 pl-4 text-lg text-zinc-900 placeholder:text-gray-400 focus:ring-0 focus-visible:outline-none" 
                    min="0" 
                    max="8" 
                    required 
                    type="text" 
                    defaultValue="5"
                    {...form.register("feet", { valueAsNumber: true })}
                  />
                  <label htmlFor="feet" className="pointer-events-none absolute right-0 flex h-full items-center pr-3 font-medium text-zinc-700 select-none">
                    Feet
                  </label>
                </div>
                <div className="shadow-primary-800/5 ring-primary-800/30 focus-within:shadow-primary-800/10 focus-within:ring-primary-600/80 relative flex rounded-lg shadow-md ring-1 focus-within:shadow-lg focus-within:ring-1 sm:max-w-md">
                  <input 
                    id="inches" 
                    inputMode="numeric" 
                    pattern="[0-9]*" 
                    title="Please enter your height in inches" 
                    className="w-full flex-1 border-0 bg-transparent py-2.5 pl-4 text-lg text-zinc-900 placeholder:text-gray-400 focus:ring-0 focus-visible:outline-none" 
                    min="0" 
                    max="12" 
                    required 
                    type="text" 
                    defaultValue="8"
                    {...form.register("inches", { valueAsNumber: true })}
                  />
                  <label htmlFor="inches" className="pointer-events-none absolute right-0 flex h-full items-center pr-3 font-medium text-zinc-700 select-none">
                    Inches
                  </label>
                </div>
              </div>
              <div className="text-primary-600 min-w-[114px] cursor-pointer font-medium underline underline-offset-4 select-none hover:opacity-70 active:opacity-80 sm:text-sm">
                Switch to metric
              </div>
            </div>
          </div>

          {/* Weight Section */}
          <div>
            <div className="text-primary-950 mb-3 text-base font-semibold">
              What is your weight?
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
              <div className="grid w-80 origin-bottom-left grid-cols-2 gap-3" style={{opacity: 1, transform: "none"}}>
                <div className="shadow-primary-800/5 ring-primary-800/30 focus-within:shadow-primary-800/10 focus-within:ring-primary-600/80 relative flex rounded-lg shadow-md ring-1 focus-within:shadow-lg focus-within:ring-1 sm:max-w-md">
                  <input 
                    id="stone" 
                    inputMode="numeric" 
                    pattern="[0-9]*" 
                    title="Weight in stone" 
                    className="w-full flex-1 border-0 bg-transparent py-2.5 pl-4 text-lg text-zinc-900 placeholder:text-gray-400 focus:ring-0 focus-visible:outline-none" 
                    min="0" 
                    max="100" 
                    required 
                    type="text" 
                    defaultValue="15"
                    {...form.register("stone", { valueAsNumber: true })}
                  />
                  <label htmlFor="stone" className="pointer-events-none absolute right-0 flex h-full items-center pr-3 font-medium text-zinc-700 select-none">
                    Stone
                  </label>
                </div>
                <div className="shadow-primary-800/5 ring-primary-800/30 focus-within:shadow-primary-800/10 focus-within:ring-primary-600/80 relative flex rounded-lg shadow-md ring-1 focus-within:shadow-lg focus-within:ring-1 sm:max-w-md">
                  <input 
                    id="pounds" 
                    inputMode="numeric" 
                    pattern="[0-9]*" 
                    title="Weight in pounds" 
                    className="w-full flex-1 border-0 bg-transparent py-2.5 pl-4 text-lg text-zinc-900 placeholder:text-gray-400 focus:ring-0 focus-visible:outline-none" 
                    min="0" 
                    max="14" 
                    required 
                    type="text" 
                    defaultValue="9"
                    {...form.register("pounds", { valueAsNumber: true })}
                  />
                  <label htmlFor="pounds" className="pointer-events-none absolute right-0 flex h-full items-center pr-3 font-medium text-zinc-700 select-none">
                    Pounds
                  </label>
                </div>
              </div>
              <div className="text-primary-600 min-w-[114px] cursor-pointer font-medium underline underline-offset-4 select-none hover:opacity-70 active:opacity-80 sm:text-sm">
                Switch to metric
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit"
              className="bg-primary-600 hover:bg-primary-500 active:bg-primary-800 text-white hover:shadow-md active:shadow-inner shadow-primary-950/10 ring-primary-100/20 inline-flex items-center justify-start gap-1 overflow-hidden rounded-full py-2 pr-6 pl-5 text-lg font-medium whitespace-nowrap ring-1 transition-all [text-shadow:0_1px_2px_rgb(0_0_0_0.1)] ring-inset disabled:cursor-not-allowed disabled:opacity-70" 
              style={{width: "266px"}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="text-primary-300 size-4">
                <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd"></path>
              </svg>
              Calculate my weight loss
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}