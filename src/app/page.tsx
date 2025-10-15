import { BannerCarousel } from '@/components/ui/banner-carousel'
import { LatestProducts } from '@/components/ui/latest-products'
import { prisma } from '@/lib/prisma'

async function getLatestProducts() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      category: {
        select: {
          name: true,
          slug: true
        }
      },
      slug: true
    }
  })

  return products.map(product => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    image: product.images[0],
    category: product.category.name,
    slug: product.slug
  }))
}

export default async function Home() {
  const latestProducts = await getLatestProducts()
  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-full">
        <BannerCarousel />
      </div>
      <div className="container mx-auto py-12">
        <LatestProducts products={latestProducts} />
      </div>
    </main>
  )
}
