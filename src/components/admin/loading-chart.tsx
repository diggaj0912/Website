export function LoadingChart() {
  return (
    <div className="animate-pulse">
      <div className="h-[300px] bg-gray-200 rounded"></div>
      <div className="mt-4 flex justify-between">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 w-12 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  )
}