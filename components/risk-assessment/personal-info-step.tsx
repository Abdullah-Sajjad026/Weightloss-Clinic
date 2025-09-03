'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormData {
  name: string
  email: string
  phone: string
  heightFeet?: number
  heightInches?: number
  heightCm?: number
  weightStone?: number
  weightPounds?: number
  weightKg?: number
  unitSystem: 'imperial' | 'metric'
  responses: Record<string, any>
}

interface PersonalInfoStepProps {
  data: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

export function PersonalInfoStep({ data, onUpdate }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Personal Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please provide your contact details so we can reach you with your assessment results.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          />
          {data.name && data.name.length < 2 && (
            <p className="text-xs text-red-600">Name must be at least 2 characters</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          />
          {data.email && !data.email.includes('@') && (
            <p className="text-xs text-red-600">Please enter a valid email address</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            className="border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          />
          {data.phone && data.phone.length < 10 && (
            <p className="text-xs text-red-600">Please enter a valid phone number</p>
          )}
          <p className="text-xs text-gray-500">
            We'll use this to contact you about your assessment results
          </p>
        </div>
      </div>
    </div>
  )
}