import { RiskAssessmentForm } from '@/components/risk-assessment-form'

export const metadata = {
  title: 'Medical Risk Assessment - Northampton Clinic',
  description: 'Complete our comprehensive medical risk assessment to determine your suitability for weight loss treatments.',
}

export default function RiskAssessmentPage() {
  return (
    <div>
      <RiskAssessmentForm />
    </div>
  )
}