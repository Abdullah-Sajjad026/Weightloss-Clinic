'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  weightLossCalculatorSchema, 
  type WeightLossCalculatorFormData,
  convertToMetric,
  calculateBMI,
  getBMICategory
} from '@/lib/validations/weight-loss-calculator'
import { WeightLossResultsModal } from './weight-loss-results-modal'
import { Sparkles } from 'lucide-react'

export function WeightLossCalculator() {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial')
  const [showResults, setShowResults] = useState(false)
  const [calculatedResults, setCalculatedResults] = useState<any>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<WeightLossCalculatorFormData>({
    resolver: zodResolver(weightLossCalculatorSchema),
    defaultValues: {
      unitSystem: 'imperial',
      heightFeet: 5,
      heightInches: 8,
      weightStone: 15,
      weightPounds: 9,
    },
    mode: 'onChange',
  })

  // Update form when unit system changes
  useEffect(() => {
    setValue('unitSystem', unitSystem)
    // Reset form values when switching units
    if (unitSystem === 'metric') {
      setValue('heightCm', 175)
      setValue('weightKg', 85)
    } else {
      setValue('heightFeet', 5)
      setValue('heightInches', 8)
      setValue('weightStone', 15)
      setValue('weightPounds', 9)
    }
  }, [unitSystem, setValue])

  // Remember user's unit preference
  useEffect(() => {
    const savedUnit = localStorage.getItem('weightLossCalculator-unit')
    if (savedUnit && (savedUnit === 'imperial' || savedUnit === 'metric')) {
      setUnitSystem(savedUnit)
    }
  }, [])

  const switchToMetric = () => {
    setUnitSystem('metric')
    localStorage.setItem('weightLossCalculator-unit', 'metric')
  }

  const switchToImperial = () => {
    setUnitSystem('imperial')
    localStorage.setItem('weightLossCalculator-unit', 'imperial')
  }

  const calculateWeightLoss = (data: WeightLossCalculatorFormData) => {
    const { heightCm, weightKg } = convertToMetric(data)
    const currentBMI = calculateBMI(heightCm, weightKg)
    const { category } = getBMICategory(currentBMI)
    
    // Calculate target weight (BMI of 22 - middle of healthy range)
    const targetBMI = 22
    const heightM = heightCm / 100
    const targetWeightKg = targetBMI * (heightM * heightM)
    
    const weightLossKg = Math.max(0, weightKg - targetWeightKg)
    const weightLossPercentage = weightLossKg > 0 ? (weightLossKg / weightKg) * 100 : 0
    
    // Convert back to user's preferred units for display
    let weightLossDisplay = ''
    if (data.unitSystem === 'imperial') {
      const weightLossPounds = weightLossKg * 2.20462
      const stone = Math.floor(weightLossPounds / 14)
      const pounds = Math.round(weightLossPounds % 14)
      weightLossDisplay = stone > 0 ? `${stone}st ${pounds}lb` : `${pounds}lb`
    } else {
      weightLossDisplay = `${Math.round(weightLossKg)}kg`
    }
    
    // Generate weight loss timeline (simplified algorithm)
    const generateTimeline = () => {
      const months = 18 // 18 month timeline
      const timeline = []
      const monthlyLossRate = 0.08 // 8% loss per month initially, decreasing over time
      
      let currentWeight = weightKg
      const today = new Date()
      
      for (let i = 0; i <= months; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() + i, today.getDate())
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        
        // Exponential decay for weight loss rate (slows down over time)
        const lossRate = monthlyLossRate * Math.exp(-i * 0.1)
        const monthlyLoss = currentWeight * lossRate
        currentWeight = Math.max(targetWeightKg, currentWeight - monthlyLoss)
        
        // Convert to display units
        let displayWeight = currentWeight
        let unit = 'kg'
        
        if (data.unitSystem === 'imperial') {
          const totalPounds = currentWeight * 2.20462
          const stone = Math.floor(totalPounds / 14)
          const pounds = Math.round(totalPounds % 14)
          displayWeight = totalPounds
          unit = 'lbs'
        }
        
        timeline.push({
          month: monthName,
          weight: displayWeight,
          displayWeight: data.unitSystem === 'imperial' 
            ? `${Math.floor(displayWeight / 14)}st ${Math.round(displayWeight % 14)}lb`
            : `${Math.round(displayWeight)}kg`,
          rawWeight: currentWeight,
        })
      }
      
      return timeline
    }

    return {
      currentBMI: Math.round(currentBMI * 10) / 10,
      targetBMI,
      category,
      weightLossKg: Math.round(weightLossKg * 10) / 10,
      weightLossDisplay,
      weightLossPercentage: Math.round(weightLossPercentage),
      timeline: generateTimeline(),
      unitSystem: data.unitSystem,
    }
  }

  const onSubmit = (data: WeightLossCalculatorFormData) => {
    const results = calculateWeightLoss(data)
    setCalculatedResults(results)
    setShowResults(true)
  }

  return (
    <>
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            See how much you could lose
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Based on the results of a clinical study with 806 participants.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Height Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  What is your height?
                </h3>
                <button
                  type="button"
                  onClick={unitSystem === 'imperial' ? switchToMetric : switchToImperial}
                  className="text-purple-600 text-sm font-medium hover:text-purple-700 underline transition-colors"
                >
                  Switch to {unitSystem === 'imperial' ? 'metric' : 'imperial'}
                </button>
              </div>
              
              {unitSystem === 'imperial' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Input
                      type="number"
                      {...register('heightFeet', { valueAsNumber: true })}
                      placeholder="5"
                      className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl"
                      min="3"
                      max="8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      Feet
                    </span>
                    {errors.heightFeet && (
                      <p className="text-red-500 text-xs mt-1">{errors.heightFeet.message}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <Input
                      type="number"
                      {...register('heightInches', { valueAsNumber: true })}
                      placeholder="8"
                      className="text-center text-lg py-3 pr-16 border-gray-300 rounded-xl"
                      min="0"
                      max="11"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      Inches
                    </span>
                    {errors.heightInches && (
                      <p className="text-red-500 text-xs mt-1">{errors.heightInches.message}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    type="number"
                    {...register('heightCm', { valueAsNumber: true })}
                    placeholder="175"
                    className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl"
                    min="100"
                    max="250"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    CM
                  </span>
                  {errors.heightCm && (
                    <p className="text-red-500 text-xs mt-1">{errors.heightCm.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Weight Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  What is your weight?
                </h3>
                <button
                  type="button"
                  onClick={unitSystem === 'imperial' ? switchToMetric : switchToImperial}
                  className="text-purple-600 text-sm font-medium hover:text-purple-700 underline transition-colors"
                >
                  Switch to {unitSystem === 'imperial' ? 'metric' : 'imperial'}
                </button>
              </div>
              
              {unitSystem === 'imperial' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Input
                      type="number"
                      {...register('weightStone', { valueAsNumber: true })}
                      placeholder="15"
                      className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl"
                      min="5"
                      max="50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      Stone
                    </span>
                    {errors.weightStone && (
                      <p className="text-red-500 text-xs mt-1">{errors.weightStone.message}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <Input
                      type="number"
                      {...register('weightPounds', { valueAsNumber: true })}
                      placeholder="9"
                      className="text-center text-lg py-3 pr-16 border-gray-300 rounded-xl"
                      min="0"
                      max="13"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      Pounds
                    </span>
                    {errors.weightPounds && (
                      <p className="text-red-500 text-xs mt-1">{errors.weightPounds.message}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    type="number"
                    {...register('weightKg', { valueAsNumber: true })}
                    placeholder="85"
                    className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl"
                    min="30"
                    max="300"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    KG
                  </span>
                  {errors.weightKg && (
                    <p className="text-red-500 text-xs mt-1">{errors.weightKg.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Calculate Button */}
            <Button
              type="submit"
              disabled={!isValid}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 rounded-full text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Calculate my weight loss
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Modal */}
      <WeightLossResultsModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        results={calculatedResults}
      />
    </>
  )
}