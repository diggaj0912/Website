// Auth configuration constants
export const publicPaths = new Set([
  '/',
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/api/auth'
])

export const adminPaths = new Set(['/admin'])

export const ignoredPaths = new Set([
  '/api',
  '/_next',
  '/static',
  '/public',
  '/favicon.ico',
  '/robots.txt',
  '/site.webmanifest'
])