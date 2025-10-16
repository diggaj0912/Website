import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { Role } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  // @ts-expect-error - Type mismatch between next-auth and @auth/prisma-adapter
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials)
          
          const user = await prisma.user.findUnique({
            where: { email }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(password, user.password)
          
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch {
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      
      if (token.email && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string }
        })
        if (dbUser) {
          token.role = dbUser.role
        } else {
          token.role = "CUSTOMER"
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.email = token.email as string
      }
      return session
    },
  }
})