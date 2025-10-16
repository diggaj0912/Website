'use client'

import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Button } from '@/components/ui/button'

// Dummy data - replace with real data from API
const data = [
  { date: '2025-10-10', revenue: 4000 },
  { date: '2025-10-11', revenue: 3000 },
  { date: '2025-10-12', revenue: 2000 },
  { date: '2025-10-13', revenue: 2780 },
  { date: '2025-10-14', revenue: 1890 },
  { date: '2025-10-15', revenue: 2390 },
  { date: '2025-10-16', revenue: 3490 },
]

const timeRanges = ['7D', '30D', '90D', '1Y'] as const
type TimeRange = typeof timeRanges[number]

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7D')

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Revenue Over Time</h3>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis
              tickFormatter={(value) => '$' + value.toLocaleString()}
            />
            <Tooltip
              formatter={(value: number) => ['$' + value.toLocaleString(), 'Revenue']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}