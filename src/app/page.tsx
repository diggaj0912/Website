import { BannerCarousel } from '@/components/ui/banner-carousel'
import { LatestProducts } from '@/components/ui/latest-products'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-full">
        <BannerCarousel />
      </div>
      <div className="container mx-auto py-12">
        <LatestProducts />
      </div>
    </main>
  )
}
