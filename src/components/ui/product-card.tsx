import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent, CardFooter } from './card'

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
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        {onAddToWishlist && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => onAddToWishlist(product.id)}
          >
            <Heart className="h-5 w-5" />
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <Link href={`/category/${product.category}`} className="text-sm text-muted-foreground hover:underline">
          {product.category}
        </Link>
        <Link href={`/products/${product.slug}`} className="font-semibold hover:underline">
          {product.name}
        </Link>
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
          {onAddToCart && (
            <Button variant="secondary" onClick={() => onAddToCart(product.id)}>
              Add to Cart
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}