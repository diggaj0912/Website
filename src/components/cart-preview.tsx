import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

// This would typically come from your cart state management
const cartItems: CartItem[] = [
  {
    id: '1',
    name: 'Sample Product',
    price: 99.99,
    quantity: 1,
    image: '/placeholder.jpg',
  },
]

export function CartPreview() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <DropdownMenuItem key={item.id} className="flex items-center p-4">
                <div className="h-16 w-16 bg-muted rounded-md mr-4">
                  {/* Replace with actual image */}
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    IMG
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex justify-between text-sm mb-4">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full">
                View Cart
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}