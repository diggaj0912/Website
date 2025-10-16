export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p className="mt-4 text-sm text-gray-600">Loading...</p>
    </div>
  )
}