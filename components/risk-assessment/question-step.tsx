'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { type Question } from '@/lib/risk-assessment-questions'

interface QuestionStepProps {
  question: Question
  response?: any
  onUpdate: (value: any) => void
}

export function QuestionStep({ question, response, onUpdate }: QuestionStepProps) {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const currentResponses = Array.isArray(response) ? response : []
    
    if (checked) {
      // Handle "None of the above" logic
      if (optionValue === 'none') {
        onUpdate(['none'])
      } else {
        // Remove "none" if present and add the new option
        const filteredResponses = currentResponses.filter(value => value !== 'none')
        onUpdate([...filteredResponses, optionValue])
      }
    } else {
      // Remove the option
      const filteredResponses = currentResponses.filter(value => value !== optionValue)
      onUpdate(filteredResponses)
    }
  }

  const isCheckboxChecked = (optionValue: string): boolean => {
    return Array.isArray(response) && response.includes(optionValue)
  }

  return (
    <div className="space-y-6">
      {/* Question Title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {question.title}
        </h3>
        {question.description && (
          <p className="text-sm text-gray-600 mb-4">
            {question.description}
          </p>
        )}
      </div>

      {/* Question Content */}
      <div className="space-y-4">
        {question.type === 'yes_no' && (
          <RadioGroup
            value={response || ''}
            onValueChange={onUpdate}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="cursor-pointer flex-1">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="cursor-pointer flex-1">
                No
              </Label>
            </div>
          </RadioGroup>
        )}

        {question.type === 'multiple_choice' && question.options && (
          <RadioGroup
            value={response || ''}
            onValueChange={onUpdate}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'checkbox_list' && question.options && (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div
                key={option.id}
                className="flex items-start space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <Checkbox
                  id={option.id}
                  checked={isCheckboxChecked(option.value)}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(option.value, !!checked)
                  }
                  className="mt-1"
                />
                <Label htmlFor={option.id} className="cursor-pointer flex-1 leading-relaxed">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {question.type === 'text' && (
          <div className="space-y-2">
            <Textarea
              placeholder="Please provide your answer..."
              value={response || ''}
              onChange={(e) => onUpdate(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              Be as detailed as possible to help us provide the best care.
            </p>
          </div>
        )}
      </div>

      {/* Required indicator */}
      {question.required && (
        <p className="text-xs text-gray-500">
          <span className="text-red-500">*</span> This question is required
        </p>
      )}
    </div>
  )
}