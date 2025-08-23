'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
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

interface PhysicalInfoStepProps {
  data: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

export function PhysicalInfoStep({ data, onUpdate }: PhysicalInfoStepProps) {
  const switchToImperial = () => {
    // Clear metric values when switching
    onUpdate({ 
      unitSystem: 'imperial', 
      heightCm: undefined, 
      weightKg: undefined 
    })
  }

  const switchToMetric = () => {
    // Clear imperial values when switching
    onUpdate({ 
      unitSystem: 'metric', 
      heightFeet: undefined, 
      heightInches: undefined,
      weightStone: undefined, 
      weightPounds: undefined 
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Physical Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          We need your height and weight to assess your suitability for weight loss treatments.
        </p>
      </div>

      {/* Unit System Toggle */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <Button
          type="button"
          variant={data.unitSystem === 'imperial' ? 'default' : 'ghost'}
          size="sm"
          onClick={switchToImperial}
          className="flex-1"
        >
          Imperial (ft/in, st/lb)
        </Button>
        <Button
          type="button"
          variant={data.unitSystem === 'metric' ? 'default' : 'ghost'}
          size="sm"
          onClick={switchToMetric}
          className="flex-1"
        >
          Metric (cm, kg)
        </Button>
      </div>

      <div className="space-y-6">
        {/* Height Section */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Height <span className="text-red-500">*</span>
          </Label>
          
          {data.unitSystem === 'imperial' ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="5"
                  min="3"
                  max="8"
                  value={data.heightFeet || ''}
                  onChange={(e) => onUpdate({ heightFeet: e.target.value ? Number(e.target.value) : undefined })}
                  className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                  ft
                </span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="8"
                  min="0"
                  max="11"
                  value={data.heightInches || ''}
                  onChange={(e) => onUpdate({ heightInches: e.target.value ? Number(e.target.value) : undefined })}
                  className="text-center text-lg py-3 pr-16 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                  in
                </span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Input
                type="number"
                placeholder="170"
                min="100"
                max="250"
                value={data.heightCm || ''}
                onChange={(e) => onUpdate({ heightCm: e.target.value ? Number(e.target.value) : undefined })}
                className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-purple-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                cm
              </span>
            </div>
          )}
        </div>

        {/* Weight Section */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Weight <span className="text-red-500">*</span>
          </Label>
          
          {data.unitSystem === 'imperial' ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="12"
                  min="5"
                  max="50"
                  value={data.weightStone || ''}
                  onChange={(e) => onUpdate({ weightStone: e.target.value ? Number(e.target.value) : undefined })}
                  className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                  st
                </span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="7"
                  min="0"
                  max="13"
                  value={data.weightPounds || ''}
                  onChange={(e) => onUpdate({ weightPounds: e.target.value ? Number(e.target.value) : undefined })}
                  className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                  lb
                </span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Input
                type="number"
                placeholder="75"
                min="30"
                max="300"
                value={data.weightKg || ''}
                onChange={(e) => onUpdate({ weightKg: e.target.value ? Number(e.target.value) : undefined })}
                className="text-center text-lg py-3 pr-12 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-purple-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                kg
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Validation Messages */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• All fields are required to continue</p>
        <p>• Your information is kept confidential and secure</p>
      </div>
    </div>
  )
}