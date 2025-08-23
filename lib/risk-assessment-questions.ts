export interface QuestionOption {
  id: string
  label: string
  value: string
}

export interface Question {
  id: string
  type: 'yes_no' | 'multiple_choice' | 'text' | 'checkbox_list'
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  followUpQuestions?: string[] // IDs of questions to show if specific answers selected
  showIfAnswer?: { questionId: string; values: string[] } // Show this question only if another question has specific answers
}

export const riskAssessmentQuestions: Question[] = [
  // Medical Conditions Question
  {
    id: 'medical_conditions',
    type: 'checkbox_list',
    title: 'Do you have any of the following conditions?',
    description: 'These conditions may affect how we monitor your care',
    required: true,
    options: [
      { id: 'thyroid_history', label: 'A personal or family history of thyroid disease or cancer', value: 'thyroid_history' },
      { id: 'diabetes_type1', label: 'Diabetes (type 1)', value: 'diabetes_type1' },
      { id: 'diabetes_type2', label: 'Diabetes (type 2)', value: 'diabetes_type2' },
      { id: 'liver_problems', label: 'Problems with your liver', value: 'liver_problems' },
      { id: 'kidney_problems', label: 'Problems with your kidney', value: 'kidney_problems' },
      { id: 'gut_problems', label: 'Problems with your gut that are controlled by medications', value: 'gut_problems' },
      { id: 'gallbladder_problems', label: 'Problems with your gallbladder', value: 'gallbladder_problems' },
      { id: 'pancreas_problems', label: 'Problems with your pancreas', value: 'pancreas_problems' },
      { id: 'organ_transplant', label: 'A history of organ transplant', value: 'organ_transplant' },
      { id: 'active_cancer', label: 'Active cancer', value: 'active_cancer' },
      { id: 'colon_cancer', label: 'Colon cancer current or in the past', value: 'colon_cancer' },
      { id: 'none', label: 'None of the above', value: 'none' },
    ],
    followUpQuestions: ['medical_conditions_details'],
  },

  // Medical Conditions Details (follow-up)
  {
    id: 'medical_conditions_details',
    type: 'text',
    title: 'Please provide more details about your medical conditions',
    description: 'Tell us more about the conditions you selected above, including when you were diagnosed and any current treatments.',
    required: false,
    showIfAnswer: { questionId: 'medical_conditions', values: ['thyroid_history', 'diabetes_type1', 'diabetes_type2', 'liver_problems', 'kidney_problems', 'gut_problems', 'gallbladder_problems', 'pancreas_problems', 'organ_transplant', 'active_cancer', 'colon_cancer'] },
  },

  // Current Weight Loss Medication
  {
    id: 'current_weight_loss_medication',
    type: 'multiple_choice',
    title: 'Are you currently taking weight loss medication?',
    required: true,
    options: [
      { id: 'no', label: 'No', value: 'no' },
      { id: 'oral', label: 'Yes, Oral (Tablets)', value: 'oral' },
      { id: 'injections', label: 'Yes, Injections', value: 'injections' },
      { id: 'both', label: 'Yes, Both (Oral and Injections)', value: 'both' },
    ],
    followUpQuestions: ['current_medication_details'],
  },

  // Current Medication Details (follow-up)
  {
    id: 'current_medication_details',
    type: 'text',
    title: 'Please tell us about your current weight loss medication',
    description: 'Include the name of the medication, dosage, and how long you\'ve been taking it.',
    required: false,
    showIfAnswer: { questionId: 'current_weight_loss_medication', values: ['oral', 'injections', 'both'] },
  },

  // Previous Weight Loss Injections
  {
    id: 'previous_injections',
    type: 'yes_no',
    title: 'Have you used weight loss injections before but stopped?',
    required: true,
    followUpQuestions: ['injection_timeline', 'stopped_reason'],
  },

  // When stopped injections (follow-up)
  {
    id: 'injection_timeline',
    type: 'multiple_choice',
    title: 'When was the last time you took weight loss injections?',
    required: true,
    options: [
      { id: 'over_2_months', label: 'Over 2 months ago', value: 'over_2_months' },
      { id: 'less_2_months', label: 'Less than 2 months ago', value: 'less_2_months' },
    ],
    showIfAnswer: { questionId: 'previous_injections', values: ['yes'] },
  },

  // Reason for stopping (follow-up)
  {
    id: 'stopped_reason',
    type: 'multiple_choice',
    title: 'Please let us know why you previously stopped using weight loss injections',
    required: true,
    options: [
      { id: 'target_weight', label: 'I reached my target weight', value: 'target_weight' },
      { id: 'side_effects', label: 'Side effects', value: 'side_effects' },
      { id: 'availability', label: 'Availability', value: 'availability' },
      { id: 'financial', label: 'Financial decision', value: 'financial' },
      { id: 'other', label: 'Other', value: 'other' },
    ],
    showIfAnswer: { questionId: 'previous_injections', values: ['yes'] },
    followUpQuestions: ['stopped_reason_details'],
  },

  // Stopped reason details (follow-up)
  {
    id: 'stopped_reason_details',
    type: 'text',
    title: 'Please provide more details about why you stopped',
    description: 'If you experienced side effects or other issues, please describe them.',
    required: false,
    showIfAnswer: { questionId: 'stopped_reason', values: ['side_effects', 'other'] },
  },

  // Current Medications
  {
    id: 'other_medications',
    type: 'yes_no',
    title: 'Are you currently taking any other medications?',
    description: 'Include prescription medications, over-the-counter drugs, and supplements.',
    required: true,
    followUpQuestions: ['medications_list'],
  },

  // Medications List (follow-up)
  {
    id: 'medications_list',
    type: 'text',
    title: 'Please list all medications you are currently taking',
    description: 'Include the medication name, dosage, and how often you take it.',
    required: true,
    showIfAnswer: { questionId: 'other_medications', values: ['yes'] },
  },

  // Allergies
  {
    id: 'allergies',
    type: 'yes_no',
    title: 'Do you have any known allergies?',
    description: 'Include food allergies, medication allergies, and environmental allergies.',
    required: true,
    followUpQuestions: ['allergies_list'],
  },

  // Allergies List (follow-up)
  {
    id: 'allergies_list',
    type: 'text',
    title: 'Please list your allergies',
    description: 'Describe what you\'re allergic to and what reaction you have.',
    required: true,
    showIfAnswer: { questionId: 'allergies', values: ['yes'] },
  },

  // Pregnancy/Breastfeeding
  {
    id: 'pregnancy_breastfeeding',
    type: 'multiple_choice',
    title: 'Are you currently pregnant, planning to become pregnant, or breastfeeding?',
    required: true,
    options: [
      { id: 'no', label: 'No', value: 'no' },
      { id: 'pregnant', label: 'Currently pregnant', value: 'pregnant' },
      { id: 'planning', label: 'Planning to become pregnant', value: 'planning' },
      { id: 'breastfeeding', label: 'Currently breastfeeding', value: 'breastfeeding' },
      { id: 'not_applicable', label: 'Not applicable', value: 'not_applicable' },
    ],
  },

  // Previous Weight Loss Attempts
  {
    id: 'previous_weight_loss',
    type: 'yes_no',
    title: 'Have you tried other weight loss methods in the past?',
    description: 'Include diets, exercise programs, or other treatments.',
    required: true,
    followUpQuestions: ['weight_loss_methods'],
  },

  // Weight Loss Methods (follow-up)
  {
    id: 'weight_loss_methods',
    type: 'text',
    title: 'Please describe the weight loss methods you\'ve tried',
    description: 'Tell us what you tried, how long you tried it, and what results you had.',
    required: false,
    showIfAnswer: { questionId: 'previous_weight_loss', values: ['yes'] },
  },

  // Weight Loss Goals
  {
    id: 'weight_loss_goals',
    type: 'text',
    title: 'What are your weight loss goals?',
    description: 'Tell us about your target weight, timeline, and what success looks like to you.',
    required: true,
  },

  // Additional Information
  {
    id: 'additional_info',
    type: 'text',
    title: 'Is there anything else you\'d like us to know?',
    description: 'Share any additional medical history, concerns, or questions you have.',
    required: false,
  },
]

// Helper function to get questions that should be shown based on current responses
export function getVisibleQuestions(responses: Record<string, any>): Question[] {
  return riskAssessmentQuestions.filter(question => {
    // If no showIfAnswer condition, always show
    if (!question.showIfAnswer) return true
    
    const { questionId, values } = question.showIfAnswer
    const response = responses[questionId]
    
    // For checkbox_list questions, check if any selected value matches
    if (Array.isArray(response)) {
      return response.some(value => values.includes(value))
    }
    
    // For other question types, check if response matches
    return values.includes(response)
  })
}

// Helper function to get the next question ID
export function getNextQuestionId(currentQuestionId: string, responses: Record<string, any>): string | null {
  const visibleQuestions = getVisibleQuestions(responses)
  const currentIndex = visibleQuestions.findIndex(q => q.id === currentQuestionId)
  
  if (currentIndex === -1 || currentIndex === visibleQuestions.length - 1) {
    return null // No next question
  }
  
  return visibleQuestions[currentIndex + 1].id
}

// Helper function to get the previous question ID
export function getPreviousQuestionId(currentQuestionId: string, responses: Record<string, any>): string | null {
  const visibleQuestions = getVisibleQuestions(responses)
  const currentIndex = visibleQuestions.findIndex(q => q.id === currentQuestionId)
  
  if (currentIndex <= 0) {
    return null // No previous question or this is the first
  }
  
  return visibleQuestions[currentIndex - 1].id
}

// Helper function to calculate progress
export function getProgressPercentage(currentQuestionId: string, responses: Record<string, any>): number {
  const visibleQuestions = getVisibleQuestions(responses)
  const currentIndex = visibleQuestions.findIndex(q => q.id === currentQuestionId)
  
  if (currentIndex === -1) return 0
  
  return Math.round(((currentIndex + 1) / visibleQuestions.length) * 100)
}