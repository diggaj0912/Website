# OAuth Setup Guide

This guide will help you set up Google and GitHub OAuth providers for your NextAuth.js application.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
AUTH_SECRET=0201eb61d73778f8652005d2324bac946cd8630c1ec7bb66057df4123356d337
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client IDs
5. Set the authorized redirect URIs to:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
6. Copy the Client ID and Client Secret to your `.env.local` file

## GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000` (for development)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local` file

## Features Implemented

### ✅ Email/Password Authentication
- Credentials provider with bcrypt password hashing
- Form validation with Zod
- Secure password requirements

### ✅ OAuth Providers
- Google OAuth integration
- GitHub OAuth integration
- Automatic user creation for OAuth users
- Role assignment (default: CUSTOMER)

### ✅ JWT Handling
- JWT-based sessions
- Token refresh handling
- Secure token storage
- Access token persistence for OAuth

### ✅ Protected Routes
- Middleware-based route protection
- Role-based access control
- Admin route restrictions
- Automatic redirects for unauthenticated users

## Usage

### Sign In Methods
Users can sign in using:
1. Email and password (existing accounts)
2. Google OAuth (creates account automatically)
3. GitHub OAuth (creates account automatically)

### Protected Routes
- `/profile` - Requires authentication
- `/admin` - Requires ADMIN role
- All other routes except public ones require authentication

### Public Routes
- `/` - Home page
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- `/auth/forgot-password` - Password reset
- `/api/auth/*` - Auth API routes

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/auth/signin`
3. Test each authentication method:
   - Email/password sign in
   - Google OAuth (requires setup)
   - GitHub OAuth (requires setup)

## Security Features

- Password hashing with bcrypt
- JWT token security
- CSRF protection
- Secure session management
- Role-based authorization
- Environment variable protection
