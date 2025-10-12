/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  console.log('Creating categories...')
  const tshirtCategory = await prisma.category.create({
    data: {
      name: 'T-shirts',
      description: 'Comfortable and stylish t-shirts for every occasion',
      slug: 't-shirts',
    },
  })

  const jeansCategory = await prisma.category.create({
    data: {
      name: 'Jeans',
      description: 'Classic and modern jeans for all styles',
      slug: 'jeans',
    },
  })

  const shoesCategory = await prisma.category.create({
    data: {
      name: 'Shoes',
      description: 'Quality footwear for every need',
      slug: 'shoes',
    },
  })

  console.log('✅ Categories created')

  // Create users
  console.log('Creating users...')
  const hashedPassword = await bcrypt.hash('password123', 12)

  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  const customer1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'CUSTOMER',
      emailVerified: new Date(),
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: hashedPassword,
      role: 'CUSTOMER',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Users created')

  // Create T-shirt products
  console.log('Creating T-shirt products...')
  const tshirt1 = await prisma.product.create({
    data: {
      name: 'Classic White T-Shirt',
      description: 'A comfortable and versatile white t-shirt made from 100% cotton',
      price: 19.99,
      images: ['/images/banner1.jpg'],
      slug: 'classic-white-t-shirt',
      sku: 'TSH-001',
      stock: 50,
      categoryId: tshirtCategory.id,
    },
  })

  const tshirt2 = await prisma.product.create({
    data: {
      name: 'Vintage Black T-Shirt',
      description: 'Soft black t-shirt with vintage styling',
      price: 24.99,
      images: ['/images/banner2.jpg'],
      slug: 'vintage-black-t-shirt',
      sku: 'TSH-002',
      stock: 30,
      categoryId: tshirtCategory.id,
    },
  })

  const tshirt3 = await prisma.product.create({
    data: {
      name: 'Graphic Print T-Shirt',
      description: 'Trendy t-shirt with modern graphic design',
      price: 29.99,
      images: ['/images/banner3.jpg'],
      slug: 'graphic-print-t-shirt',
      sku: 'TSH-003',
      stock: 25,
      categoryId: tshirtCategory.id,
    },
  })

  // Create Jeans products
  console.log('Creating Jeans products...')
  const jeans1 = await prisma.product.create({
    data: {
      name: 'Classic Blue Jeans',
      description: 'Timeless blue jeans with perfect fit',
      price: 79.99,
      images: ['/images/c-jeans.jpg'],
      slug: 'classic-blue-jeans',
      sku: 'JNS-001',
      stock: 40,
      categoryId: jeansCategory.id,
    },
  })

  const jeans2 = await prisma.product.create({
    data: {
      name: 'Black Skinny Jeans',
      description: 'Slim-fit black jeans for a modern look',
      price: 89.99,
      images: ['/images/c-jeans.jpg'],
      slug: 'black-skinny-jeans',
      sku: 'JNS-002',
      stock: 35,
      categoryId: jeansCategory.id,
    },
  })

  const jeans3 = await prisma.product.create({
    data: {
      name: 'Distressed Denim Jeans',
      description: 'Fashion-forward jeans with distressed details',
      price: 99.99,
      images: ['/images/c-jeans.jpg'],
      slug: 'distressed-denim-jeans',
      sku: 'JNS-003',
      stock: 20,
      categoryId: jeansCategory.id,
    },
  })

  // Create Shoes products
  console.log('Creating Shoes products...')
  const shoes1 = await prisma.product.create({
    data: {
      name: 'Classic White Sneakers',
      description: 'Comfortable white sneakers for everyday wear',
      price: 59.99,
      images: ['/images/c-shoes.jpg'],
      slug: 'classic-white-sneakers',
      sku: 'SHO-001',
      stock: 60,
      categoryId: shoesCategory.id,
    },
  })

  const shoes2 = await prisma.product.create({
    data: {
      name: 'Black Leather Boots',
      description: 'Stylish black leather boots for any occasion',
      price: 129.99,
      images: ['/images/c-shoes.jpg'],
      slug: 'black-leather-boots',
      sku: 'SHO-002',
      stock: 25,
      categoryId: shoesCategory.id,
    },
  })

  const shoes3 = await prisma.product.create({
    data: {
      name: 'Running Shoes',
      description: 'High-performance running shoes for athletes',
      price: 149.99,
      images: ['/images/c-shoes.jpg'],
      slug: 'running-shoes',
      sku: 'SHO-003',
      stock: 30,
      categoryId: shoesCategory.id,
    },
  })

  console.log('✅ Products created')

  // Create some product variants
  console.log('Creating product variants...')
  await prisma.productVariant.createMany({
    data: [
      {
        productId: tshirt1.id,
        name: 'Size',
        value: 'Small',
        stock: 10,
      },
      {
        productId: tshirt1.id,
        name: 'Size',
        value: 'Medium',
        stock: 20,
      },
      {
        productId: tshirt1.id,
        name: 'Size',
        value: 'Large',
        stock: 20,
      },
      {
        productId: jeans1.id,
        name: 'Size',
        value: '30',
        stock: 10,
      },
      {
        productId: jeans1.id,
        name: 'Size',
        value: '32',
        stock: 15,
      },
      {
        productId: jeans1.id,
        name: 'Size',
        value: '34',
        stock: 15,
      },
      {
        productId: shoes1.id,
        name: 'Size',
        value: '8',
        stock: 10,
      },
      {
        productId: shoes1.id,
        name: 'Size',
        value: '9',
        stock: 20,
      },
      {
        productId: shoes1.id,
        name: 'Size',
        value: '10',
        stock: 20,
      },
    ],
  })

  console.log('✅ Product variants created')

  // Create some reviews
  console.log('Creating reviews...')
  await prisma.review.createMany({
    data: [
      {
        userId: customer1.id,
        productId: tshirt1.id,
        rating: 5,
        title: 'Great quality!',
        comment: 'Love this t-shirt, very comfortable and fits perfectly.',
      },
      {
        userId: customer2.id,
        productId: tshirt1.id,
        rating: 4,
        title: 'Good value',
        comment: 'Nice t-shirt for the price.',
      },
      {
        userId: customer1.id,
        productId: jeans1.id,
        rating: 5,
        title: 'Perfect fit',
        comment: 'These jeans fit exactly as expected. Great quality.',
      },
      {
        userId: customer2.id,
        productId: shoes1.id,
        rating: 5,
        title: 'Comfortable',
        comment: 'Very comfortable sneakers, great for daily wear.',
      },
    ],
  })

  console.log('✅ Reviews created')

  // Create some cart items
  console.log('Creating cart items...')
  await prisma.cartItem.createMany({
    data: [
      {
        userId: customer1.id,
        productId: tshirt1.id,
        quantity: 2,
      },
      {
        userId: customer1.id,
        productId: jeans1.id,
        quantity: 1,
      },
      {
        userId: customer2.id,
        productId: shoes1.id,
        quantity: 1,
      },
    ],
  })

  console.log('✅ Cart items created')

  // Create some wishlist items
  console.log('Creating wishlist items...')
  await prisma.wishlistItem.createMany({
    data: [
      {
        userId: customer1.id,
        productId: shoes2.id,
      },
      {
        userId: customer2.id,
        productId: tshirt2.id,
      },
    ],
  })

  console.log('✅ Wishlist items created')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`- 3 Categories created`)
  console.log(`- 3 Users created (1 admin, 2 customers)`)
  console.log(`- 9 Products created (3 per category)`)
  console.log(`- 9 Product variants created`)
  console.log(`- 4 Reviews created`)
  console.log(`- 3 Cart items created`)
  console.log(`- 2 Wishlist items created`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
