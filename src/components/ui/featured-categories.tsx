import Link from 'next/link'
import Image from 'next/image'

const CATEGORIES = [
  {
    id: 1,
    name: 'Men\'s Fashion',
    image: '/images/categories/mens.jpg',
    href: '/category/men',
    itemCount: 150
  },
  {
    id: 2,
    name: 'Women\'s Fashion',
    image: '/images/categories/womens.jpg',
    href: '/category/women',
    itemCount: 200
  },
  {
    id: 3,
    name: 'Accessories',
    image: '/images/categories/accessories.jpg',
    href: '/category/accessories',
    itemCount: 80
  },
  {
    id: 4,
    name: 'Footwear',
    image: '/images/categories/footwear.jpg',
    href: '/category/footwear',
    itemCount: 100
  }
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600">Discover our wide selection of products across popular categories</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group block"
            >
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.itemCount}+ Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}