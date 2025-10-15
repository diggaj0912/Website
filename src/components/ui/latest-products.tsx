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
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(8)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg"></div>
                  <div className="space-y-3 mt-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}