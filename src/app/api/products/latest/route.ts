import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
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

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.images[0],
      category: product.category.name,
      slug: product.slug
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}