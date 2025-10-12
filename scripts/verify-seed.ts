import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifySeed() {
  console.log('🔍 Verifying database seed...')

  try {
    // Check categories
    const categories = await prisma.category.findMany()
    console.log(`✅ Categories: ${categories.length}`)
    categories.forEach(cat => console.log(`  - ${cat.name} (${cat.slug})`))

    // Check users
    const users = await prisma.user.findMany()
    console.log(`✅ Users: ${users.length}`)
    users.forEach(user => console.log(`  - ${user.name} (${user.email}) - ${user.role}`))

    // Check products
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    })
    console.log(`✅ Products: ${products.length}`)
    products.forEach(product => console.log(`  - ${product.name} (${product.category.name}) - $${product.price}`))

    // Check product variants
    const variants = await prisma.productVariant.findMany()
    console.log(`✅ Product Variants: ${variants.length}`)

    // Check reviews
    const reviews = await prisma.review.findMany()
    console.log(`✅ Reviews: ${reviews.length}`)

    // Check cart items
    const cartItems = await prisma.cartItem.findMany()
    console.log(`✅ Cart Items: ${cartItems.length}`)

    // Check wishlist items
    const wishlistItems = await prisma.wishlistItem.findMany()
    console.log(`✅ Wishlist Items: ${wishlistItems.length}`)

    console.log('\n🎉 Database verification completed successfully!')
  } catch (error) {
    console.error('❌ Error verifying database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifySeed()
