import { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
}

export function MetricCard({ title, value, description, icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <div className="p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="mt-2">
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}