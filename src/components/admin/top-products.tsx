'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Button } from '@/components/ui/button'

// Dummy data - replace with real data from API
const data = [
  { name: 'Classic Blue Jeans', revenue: 4500 },
  { name: 'White Sneakers', revenue: 3800 },
  { name: 'Graphic T-Shirt', revenue: 3200 },
  { name: 'Black Boots', revenue: 2800 },
  { name: 'Denim Jacket', revenue: 2500 },
]

const timeRanges = ['7D', '30D', '90D', '1Y'] as const
type TimeRange = typeof timeRanges[number]

export function TopProducts() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7D')

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Top Products</h3>
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
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 100,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => '$' + value.toLocaleString()} />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip
              formatter={(value: number) => ['$' + value.toLocaleString(), 'Revenue']}
            />
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}