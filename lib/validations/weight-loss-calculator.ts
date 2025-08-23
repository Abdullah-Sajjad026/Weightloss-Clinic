import * as z from 'zod'

export const weightLossCalculatorSchema = z.object({
  // Height validation
  heightFeet: z.number().min(3, 'Height must be at least 3 feet').max(8, 'Height must be less than 8 feet').optional(),
  heightInches: z.number().min(0, 'Inches must be 0 or more').max(11, 'Inches must be less than 12').optional(),
  heightCm: z.number().min(100, 'Height must be at least 100cm').max(250, 'Height must be less than 250cm').optional(),
  
  // Weight validation
  weightStone: z.number().min(5, 'Weight must be at least 5 stone').max(50, 'Weight must be less than 50 stone').optional(),
  weightPounds: z.number().min(0, 'Pounds must be 0 or more').max(13, 'Pounds must be less than 14').optional(),
  weightKg: z.number().min(30, 'Weight must be at least 30kg').max(300, 'Weight must be less than 300kg').optional(),
  
  // Unit system
  unitSystem: z.enum(['imperial', 'metric']),
}).refine((data) => {
  if (data.unitSystem === 'imperial') {
    return data.heightFeet !== undefined && data.heightInches !== undefined && 
           data.weightStone !== undefined && data.weightPounds !== undefined
  } else {
    return data.heightCm !== undefined && data.weightKg !== undefined
  }
}, {
  message: "All required fields must be filled",
})

export type WeightLossCalculatorFormData = z.infer<typeof weightLossCalculatorSchema>

// Utility functions for conversions
export const convertToMetric = (data: WeightLossCalculatorFormData) => {
  if (data.unitSystem === 'metric') {
    return {
      heightCm: data.heightCm!,
      weightKg: data.weightKg!,
    }
  }
  
  // Convert imperial to metric
  const totalInches = (data.heightFeet! * 12) + data.heightInches!
  const heightCm = totalInches * 2.54
  
  const totalPounds = (data.weightStone! * 14) + data.weightPounds!
  const weightKg = totalPounds * 0.453592
  
  return { heightCm, weightKg }
}

export const calculateBMI = (heightCm: number, weightKg: number): number => {
  const heightM = heightCm / 100
  return weightKg / (heightM * heightM)
}

export const getBMICategory = (bmi: number): { category: string; color: string } => {
  if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' }
  if (bmi < 25) return { category: 'Healthy', color: 'text-green-600' }
  if (bmi < 30) return { category: 'Overweight', color: 'text-orange-600' }
  return { category: 'Obese', color: 'text-red-600' }
}