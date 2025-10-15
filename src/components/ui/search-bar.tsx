import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// This would typically come from your API/database
const sampleProducts = [
  { id: '1', name: 'Classic T-Shirt', category: 'Clothing', price: 29.99, image: '/placeholder.jpg' },
  { id: '2', name: 'Wireless Earbuds', category: 'Electronics', price: 99.99, image: '/placeholder.jpg' },
  { id: '3', name: 'Leather Wallet', category: 'Accessories', price: 49.99, image: '/placeholder.jpg' },
]

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Filter products based on search query
  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative w-full max-w-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search products..." value={search} onValueChange={setSearch} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Products">
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    className="flex items-center gap-4 p-2"
                    onSelect={() => {
                      setOpen(false)
                      // Navigate to product page (implement actual navigation)
                    }}
                  >
                    <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                      IMG
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                      <span className="text-sm font-medium">${product.price}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {search && (
                <div className="p-2 border-t">
                  <Button variant="secondary" className="w-full" onClick={() => setOpen(false)}>
                    View all results
                  </Button>
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}