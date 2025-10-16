import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from './button'
import { Badge } from './badge'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  slug: string
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* Quick Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onAddToWishlist && (
            <Button
              variant="secondary"
              size="icon"
              className="bg-white shadow-lg hover:bg-gray-100"
              onClick={() => onAddToWishlist(product.id)}
            >
              <Heart className="h-4 w-4" />
            </Button>
          )}
          {onAddToCart && (
            <Button
              variant="secondary"
              size="icon"
              className="bg-white shadow-lg hover:bg-gray-100"
              onClick={() => onAddToCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sale Badge */}
        <Badge variant="destructive" className="absolute top-4 left-4">Sale</Badge>
      </div>

      <div className="p-4">
        <Link href={`/category/${product.category}`} className="text-sm text-blue-600 hover:underline">
          {product.category}
        </Link>
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-lg font-semibold mt-2 line-clamp-2 hover:text-blue-600">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </div>
          {onAddToCart && (
            <Button
              variant="secondary"
              size="sm"
              className="md:hidden"
              onClick={() => onAddToCart(product.id)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
