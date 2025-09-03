'use client'

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

interface TimelineData {
  month: string
  weight: number
  displayWeight: string
  rawWeight: number
}

interface WeightLossTimelineChartProps {
  data: TimelineData[]
  unitSystem: 'imperial' | 'metric'
}

export function WeightLossTimelineChart({ data, unitSystem }: WeightLossTimelineChartProps) {
  if (!data || data.length === 0) return null

  // Calculate Y-axis domain with some padding
  const weights = data.map(d => d.weight)
  const minWeight = Math.min(...weights)
  const maxWeight = Math.max(...weights)
  const padding = (maxWeight - minWeight) * 0.1
  
  const yAxisDomain = [
    Math.max(0, minWeight - padding),
    maxWeight + padding
  ]

  // Format Y-axis labels based on unit system
  const formatYAxisLabel = (value: number) => {
    if (unitSystem === 'imperial') {
      const stone = Math.floor(value / 14)
      const pounds = Math.round(value % 14)
      return `${stone}st ${pounds}lb`
    } else {
      return `${Math.round(value)}kg`
    }
  }

  // Custom tooltip (optional - can be added later)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-primary-600">
            Weight: {data.displayWeight}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis 
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={yAxisDomain}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickFormatter={formatYAxisLabel}
            width={60}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#14B8A6"
            strokeWidth={3}
            dot={false}
            activeDot={{ 
              r: 6, 
              fill: '#14B8A6',
              stroke: '#14B8A6',
              strokeWidth: 2 
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}