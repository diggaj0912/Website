'use client'
 
import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log any errors to console in development
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-gray-600 mt-2">
              {process.env.NODE_ENV === 'development' 
                ? `Error: ${error.message}` 
                : 'We apologize for the inconvenience'}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
              onClick={() => reset()}
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-md bg-gray-500 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-600"
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}