'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { ChevronDown, MoreVertical } from 'lucide-react'

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface Order {
  id: string
  customerName: string
  total: number
  status: OrderStatus
  date: string
}

// Dummy data - replace with real data from API
const orders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    total: 125.99,
    status: 'pending',
    date: '2025-10-16',
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    total: 249.99,
    status: 'processing',
    date: '2025-10-15',
  },
  {
    id: 'ORD003',
    customerName: 'Bob Johnson',
    total: 79.99,
    status: 'shipped',
    date: '2025-10-14',
  },
]

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export function RecentOrdersTable() {
  const [sortField, setSortField] = useState<keyof Order>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const sortOrders = (a: Order, b: Order) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc'
        ? aValue - bValue
        : bValue - aValue
    }

    return 0
  }

  const toggleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort('id')}
            >
              Order ID
              {sortField === 'id' && (
                <ChevronDown
                  className={`ml-1 inline h-4 w-4 transition-transform ${
                    sortDirection === 'desc' ? 'rotate-180' : ''
                  }`}
                />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort('customerName')}
            >
              Customer
              {sortField === 'customerName' && (
                <ChevronDown
                  className={`ml-1 inline h-4 w-4 transition-transform ${
                    sortDirection === 'desc' ? 'rotate-180' : ''
                  }`}
                />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort('total')}
            >
              Total
              {sortField === 'total' && (
                <ChevronDown
                  className={`ml-1 inline h-4 w-4 transition-transform ${
                    sortDirection === 'desc' ? 'rotate-180' : ''
                  }`}
                />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort('status')}
            >
              Status
              {sortField === 'status' && (
                <ChevronDown
                  className={`ml-1 inline h-4 w-4 transition-transform ${
                    sortDirection === 'desc' ? 'rotate-180' : ''
                  }`}
                />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => toggleSort('date')}
            >
              Date
              {sortField === 'date' && (
                <ChevronDown
                  className={`ml-1 inline h-4 w-4 transition-transform ${
                    sortDirection === 'desc' ? 'rotate-180' : ''
                  }`}
                />
              )}
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...orders].sort(sortOrders).map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusColors[order.status]}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(order.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Cancel order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}