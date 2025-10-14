import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Role } from "@prisma/client"

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/auth/signin")
  }
  return user
}

export async function requireRole(role: Role) {
  const user = await requireAuth()
  if (user.role !== role) {
    redirect("/")
  }
  return user
}

export async function requireAdmin() {
  return requireRole("ADMIN")
}
