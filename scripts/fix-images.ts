import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixImagePaths() {
  console.log('🔍 Checking product images...')

  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  })

  for (const product of products) {
    let index = products.findIndex(p => p.id === product.id)
    const imageNumber = (index % 3) + 1 // Use mod 3 to get 1, 2, or 3
    const categoryPrefix = product.category.name.toLowerCase().startsWith('t') ? 'tshirt' : product.category.name.toLowerCase()
    const newImagePath = `/images/p-${categoryPrefix}${imageNumber}.jpg`

    console.log(`Updating product ${product.name} image to: ${newImagePath}`)

    await prisma.product.update({
      where: { id: product.id },
      data: {
        images: [newImagePath]
      }
    })
  }

  console.log('✅ Product images updated')
}

fixImagePaths()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })