'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from './product-card'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  slug: string
}

interface LatestProductsProps {
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export function LatestProducts({ onAddToCart, onAddToWishlist }: LatestProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products/latest')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {isLoading ? (
        Array(8)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart?.(product.id)}
            onAddToWishlist={() => onAddToWishlist?.(product.id)}
          />
        ))
      )}
    </div>
  )
}
