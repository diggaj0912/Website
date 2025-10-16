import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/admin/dashboard-nav'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin?callbackUrl=/admin')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <DashboardNav />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}