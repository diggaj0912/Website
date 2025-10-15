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
  products: Product[]
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export function LatestProducts({ products, onAddToCart, onAddToWishlist }: LatestProductsProps) {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  )
}