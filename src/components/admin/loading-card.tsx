import { Card } from '@/components/ui/card'

export function LoadingCard() {
  return (
    <Card>
      <div className="p-6 flex flex-col animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-2">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="mt-2 h-4 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    </Card>
  )
}