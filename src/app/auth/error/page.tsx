'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const errorMessages: Record<string, string> = {
  'Configuration': 'There is a problem with the server configuration.',
  'AccessDenied': 'You do not have permission to sign in.',
  'Verification': 'The verification link was invalid or has expired.',
  'Default': 'An error occurred while trying to authenticate.'
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{errorMessage}</p>
          <div className="mt-4">
            <a
              href="/auth/signin"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Back to Sign In
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}