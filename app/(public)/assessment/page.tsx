import { RiskAssessmentForm } from '@/components/risk-assessment-form'

export const metadata = {
  title: 'Medical Risk Assessment',
  description: 'Complete our comprehensive medical risk assessment to determine your suitability for weight loss treatments including Mounjaro and Wegovy at Northampton Clinic (Powered by Regent Pharmacy).',
  keywords: ['medical assessment', 'risk assessment', 'weight loss eligibility', 'Mounjaro assessment', 'Wegovy assessment', 'Northampton', 'medical screening'],
  openGraph: {
    title: 'Medical Risk Assessment - Northampton Clinic',
    description: 'Complete our medical assessment to determine your eligibility for weight loss treatments. Professional medical screening for safe treatment.',
  },
}

export default function RiskAssessmentPage() {
  return (
    <div>
      <RiskAssessmentForm />
    </div>
  )
}