export default function Home() {import { BannerCarousel } from '@/components/ui/banner-carousel'import { BannerCarousel } from "@/components/ui/banner-carousel";import { BannerCarousel } from "@/components/ui/banner-carousel";

  return (

    <main className="min-h-screen">import { LatestProducts } from '@/components/ui/latest-products'

      <h1>Home</h1>

    </main>import { prisma } from '@/lib/prisma'import { LatestProducts } from "@/components/ui/latest-products";import { LatestProducts } from "@/components/ui/latest-products";

  )

}

async function getLatestProducts() {import { prisma } from "@/lib/prisma";import { prisma } from "@/lib/prisma";

  const products = await prisma.product.findMany({

    take: 8,

    orderBy: {

      createdAt: 'desc'async function getLatestProducts() {async function getLatestProducts() {

    },

    select: {  const products = await prisma.product.findMany({  const products = await prisma.product.findMany({

      id: true,

      name: true,    take: 8,    take: 8,

      price: true,

      images: true,    orderBy: {    orderBy: {

      category: {

        select: {      createdAt: 'desc'      createdAt: 'desc'

          name: true,

          slug: true    },    },

        }

      },    select: {    select: {

      slug: true

    }      id: true,      id: true,

  })

      name: true,      name: true,

  return products.map(product => ({

    id: product.id,      price: true,      price: true,

    name: product.name,

    price: product.price,      images: true,      images: true,

    image: product.images[0],

    category: product.category.name,      category: {      category: {

    slug: product.slug

  }))        select: {        select: {

}

          name: true,          name: true,

export default async function Home() {

  const latestProducts = await getLatestProducts()          slug: true          slug: true



  return (        }        }

    <main className="min-h-screen">

      <BannerCarousel />      },      },

      <LatestProducts products={latestProducts} />

    </main>      slug: true      slug: true

  )

}    }    }

  });  });



  return products.map(product => ({  return products.map(product => ({

    id: product.id,    id: product.id,

    name: product.name,    name: product.name,

    price: product.price,    price: product.price,

    image: product.images[0],    image: product.images[0],

    category: product.category.name,    category: product.category.name,

    slug: product.slug    slug: product.slug

  }));  }));

}}



export default async function Home() {export default async function Home() {

  const latestProducts = await getLatestProducts();  const latestProducts = await getLatestProducts();



  return (  return (

    <main className="min-h-screen">    <main className="min-h-screen">

      <BannerCarousel />      <BannerCarousel />

      <LatestProducts       <LatestProducts 

        products={latestProducts}         products={latestProducts} 

      />      />

    </main>    </main>

  );  );

}                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/auth/signin">
                <Button variant="outline" size="lg" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Fast Shipping</h3>
              <p className="mt-1 text-base text-gray-500">
                Get your orders delivered quickly with our fast and reliable shipping.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Quality Guarantee</h3>
              <p className="mt-1 text-base text-gray-500">
                We guarantee the quality of all our products with our satisfaction promise.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">24/7 Support</h3>
              <p className="mt-1 text-base text-gray-500">
                Our customer support team is available around the clock to help you.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
