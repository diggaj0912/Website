import { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: Role
    }
    accessToken?: string
  }

  interface User {
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
    accessToken?: string
  }
}
