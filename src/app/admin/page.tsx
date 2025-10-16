import { Suspense } from 'react'
import { BarChart3, Package, ShoppingCart, Users } from 'lucide-react'
import { MetricCard } from '@/components/admin/metric-card'
import { RevenueChart } from '@/components/admin/revenue-chart'
import { RecentOrdersTable } from '@/components/admin/recent-orders-table'
import { TopProducts } from '@/components/admin/top-products'
import { LoadingCard } from '@/components/admin/loading-card'
import { LoadingChart } from '@/components/admin/loading-chart'
import { requireAdmin } from "@/lib/auth"

export default async function AdminDashboardPage() {
  const user = await requireAdmin()
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-gray-600">Welcome back, {user.name || user.email}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<LoadingCard />}>
          <MetricCard
            title="Total Revenue"
            value="$15,231.89"
            icon={BarChart3}
            description="+20.1% from last month"
          />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <MetricCard
            title="Total Orders"
            value="126"
            icon={ShoppingCart}
            description="+12.5% from last month"
          />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <MetricCard
            title="Products"
            value="238"
            icon={Package}
            description="24 added this month"
          />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <MetricCard
            title="Active Users"
            value="573"
            icon={Users}
            description="+201 since last month"
          />
        </Suspense>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Suspense fallback={<LoadingChart />}>
            <RevenueChart />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<LoadingChart />}>
            <TopProducts />
          </Suspense>
        </div>
      </div>

      <div className="grid gap-4">
        <Suspense fallback={<LoadingChart />}>
          <RecentOrdersTable />
        </Suspense>
      </div>
    </div>
  )
}