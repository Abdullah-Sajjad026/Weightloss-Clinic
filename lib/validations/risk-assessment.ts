import * as z from 'zod'

export const riskAssessmentSchema = z.object({
  // Physical Information (personal info now comes from user account)
  heightFeet: z.number().min(3).max(8).optional(),
  heightInches: z.number().min(0).max(11).optional(),
  heightCm: z.number().min(100).max(250).optional(),
  weightStone: z.number().min(5).max(50).optional(),
  weightPounds: z.number().min(0).max(13).optional(),
  weightKg: z.number().min(30).max(300).optional(),
  unitSystem: z.enum(['imperial', 'metric']),
  
  // Assessment Responses (flexible JSON structure)
  responses: z.record(z.any()),
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

export type RiskAssessmentFormData = z.infer<typeof riskAssessmentSchema>