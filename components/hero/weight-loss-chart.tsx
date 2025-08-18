"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface WeightLossChartProps {
  results: {
    potentialLoss: number
    weightChange: number
    bmi: number
    currentWeight: number
  }
  onBack: () => void
}

export function WeightLossChart({ results, onBack }: WeightLossChartProps) {
  const [showStartAssessment, setShowStartAssessment] = useState(false)

  // Generate chart data for weight loss progression
  const generateChartData = () => {
    const startWeight = results.currentWeight
    const data = []
    
    const dates = [
      "19 Aug 23",
      "3 Feb 24", 
      "21 Jul 24",
      "5 Jan 25",
      "19 Nov 25",
      "5 Mar 27"
    ]

    for (let i = 0; i < 6; i++) {
      const progress = i / 5
      const weight = startWeight - (results.potentialLoss * progress)
      data.push({
        date: dates[i],
        weight: Math.round(weight),
        kg: Math.round(weight)
      })
    }

    return data
  }

  const chartData = generateChartData()

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardContent className="p-6">
        {/* Results Header */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">You could lose</div>
              <div className="text-lg font-bold text-gray-900">{results.potentialLoss}kg</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Weight change</div>
              <div className="text-lg font-bold text-gray-900">{results.weightChange}%</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">BMI (healthy)</div>
              <div className="text-lg font-bold text-gray-900">{results.bmi}</div>
            </div>
          </div>
        </div>

        {/* Weight Loss Chart */}
        <div className="mb-6">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs text-gray-400"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  className="text-xs text-gray-400"
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-500 text-center mt-2">
            Weight loss progression over time
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => setShowStartAssessment(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg"
          >
            Start assessment
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Start today, lose 7kg by 11 Nov</span>
          </div>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full mt-4 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to calculator
        </Button>

        {/* Assessment Modal/Redirect */}
        {showStartAssessment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Ready to start your journey?</h3>
              <p className="text-gray-600 mb-6">
                Our comprehensive assessment will create a personalized weight loss plan for you.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    // Redirect to assessment page
                    window.location.href = '/assessment'
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Start Assessment
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowStartAssessment(false)}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}