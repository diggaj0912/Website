'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Box,
  Home,
  LucideIcon,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: Users,
  },
  {
    title: 'Inventory',
    href: '/admin/inventory',
    icon: Box,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 min-h-screen bg-white border-r">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>
      <div className="px-3 py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900',
              pathname === item.href ? 'bg-gray-100 text-gray-900' : ''
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}