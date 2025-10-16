import { BannerCarousel } from '@/components/ui/banner-carousel'
import { FeaturedCategories } from '@/components/ui/featured-categories'
import { LatestProducts } from '@/components/ui/latest-products'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <BannerCarousel />
      <FeaturedCategories />
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Products</h2>
            <p className="text-gray-600">Check out our newest arrivals</p>
          </div>
          <LatestProducts />
        </div>
      </section>
    </main>
  )
}
