import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      
      // For OAuth users, fetch role from database
      if (token.email && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string }
        })
        if (dbUser) {
          token.role = dbUser.role
        } else {
          // Default role for new OAuth users
          token.role = "CUSTOMER"
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "CUSTOMER" | "ADMIN"
        session.accessToken = token.accessToken as string
      }
      return session
    },
    async signIn({ account }) {
      // Allow OAuth sign-ins
      if (account?.provider === "google" || account?.provider === "github") {
        return true
      }
      
      // For credentials provider, the authorize function handles validation
      return true
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
})
