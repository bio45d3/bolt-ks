import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.admin.deleteMany()

  // Create categories
  const speakers = await prisma.category.create({
    data: {
      name: 'Speakers',
      slug: 'speakers',
      description: 'Wireless speakers and sound systems',
      sortOrder: 1,
    },
  })

  const headphones = await prisma.category.create({
    data: {
      name: 'Headphones',
      slug: 'headphones',
      description: 'Premium headphones and earphones',
      sortOrder: 2,
    },
  })

  const televisions = await prisma.category.create({
    data: {
      name: 'Televisions',
      slug: 'televisions',
      description: 'High-end television systems',
      sortOrder: 3,
    },
  })

  console.log('✅ Categories created')

  // Create products
  const products = [
    // Speakers
    {
      sku: 'BL-A9-BLK',
      name: 'Beolab 90',
      slug: 'beolab-90',
      description: 'The pinnacle of Bang & Olufsen loudspeaker design. Active room compensation creates perfect sound in any space.',
      categoryId: speakers.id,
      price: 84995,
      images: ['https://www.pngimg.com/uploads/audio_speakers/audio_speakers_PNG11133.png'],
      colors: [
        { name: 'Black', hex: '#1a1a1a' },
        { name: 'White', hex: '#f5f5f5' },
      ],
      specs: {
        'Power Output': '8200W total',
        'Drivers': '18 custom drivers',
        'Connectivity': 'WiSA, HDMI eARC, Optical',
        'Dimensions': '121 x 54.5 x 53.5 cm',
      },
      featured: true,
      stockCount: 5,
    },
    {
      sku: 'BS-50-GRY',
      name: 'Beosound A5',
      slug: 'beosound-a5',
      description: 'Powerful portable speaker with 360° sound. Built-in battery for music anywhere.',
      categoryId: speakers.id,
      price: 1299,
      images: ['https://www.pngimg.com/uploads/audio_speakers/audio_speakers_PNG11118.png'],
      colors: [
        { name: 'Nordic Weave', hex: '#8b8b8b' },
        { name: 'Dark Oak', hex: '#3d2b1f' },
        { name: 'Spaced Aluminum', hex: '#c0c0c0' },
      ],
      specs: {
        'Power Output': '280W',
        'Battery Life': 'Up to 12 hours',
        'Connectivity': 'Bluetooth 5.2, Wi-Fi, AirPlay 2',
        'Weight': '3.5 kg',
      },
      featured: true,
      stockCount: 25,
    },
    {
      sku: 'BS-BAL-BLK',
      name: 'Beosound Balance',
      slug: 'beosound-balance',
      description: 'Home speaker with Bang & Olufsen Acoustic Lens Technology for natural, room-filling sound.',
      categoryId: speakers.id,
      price: 2299,
      images: ['https://www.pngimg.com/uploads/audio_speakers/audio_speakers_PNG11115.png'],
      colors: [
        { name: 'Black Oak', hex: '#1a1a1a' },
        { name: 'Natural Oak', hex: '#c4a77d' },
      ],
      specs: {
        'Power Output': '400W',
        'Drivers': '7 custom drivers',
        'Voice Assistant': 'Google Assistant built-in',
        'Dimensions': '20 x 20 x 38 cm',
      },
      featured: false,
      stockCount: 15,
    },
    {
      sku: 'BL-28-BLK',
      name: 'Beolab 28',
      slug: 'beolab-28',
      description: 'Wireless floor-standing loudspeaker with active room compensation.',
      categoryId: speakers.id,
      price: 13490,
      images: ['https://www.pngimg.com/uploads/audio_speakers/audio_speakers_PNG11122.png'],
      colors: [
        { name: 'Black Anthracite', hex: '#2d2d2d' },
        { name: 'Silver', hex: '#a0a0a0' },
        { name: 'Gold Tone', hex: '#b8860b' },
      ],
      specs: {
        'Power Output': '1250W',
        'Drivers': '4 custom drivers',
        'Connectivity': 'WiSA, Power Link, Optical',
        'Height': '133 cm',
      },
      featured: true,
      stockCount: 8,
    },

    // Headphones
    {
      sku: 'BP-HX-BLK',
      name: 'Beoplay HX',
      slug: 'beoplay-hx',
      description: 'Premium over-ear headphones with adaptive ANC and 35-hour battery.',
      categoryId: headphones.id,
      price: 499,
      images: ['https://www.pngimg.com/uploads/headphones/headphones_PNG101961.png'],
      colors: [
        { name: 'Black Anthracite', hex: '#2d2d2d' },
        { name: 'Timber', hex: '#8b4513' },
        { name: 'Sand', hex: '#c2b280' },
      ],
      specs: {
        'Battery Life': '35 hours with ANC',
        'Driver Size': '40mm',
        'ANC': 'Adaptive Active Noise Cancellation',
        'Weight': '285g',
      },
      featured: true,
      stockCount: 50,
    },
    {
      sku: 'BP-H95-BLK',
      name: 'Beoplay H95',
      slug: 'beoplay-h95',
      description: 'Our finest headphones. Exceptional ANC, luxurious materials, and exquisite sound.',
      categoryId: headphones.id,
      price: 899,
      images: ['https://www.pngimg.com/uploads/headphones/headphones_PNG101955.png'],
      colors: [
        { name: 'Black', hex: '#1a1a1a' },
        { name: 'Grey Mist', hex: '#9a9a9a' },
        { name: 'Navy', hex: '#1a2744' },
      ],
      specs: {
        'Battery Life': '38 hours with ANC',
        'Driver Size': '40mm titanium',
        'ANC': 'Adaptive with Transparency Mode',
        'Materials': 'Aluminum, lambskin leather',
      },
      featured: true,
      stockCount: 30,
    },
    {
      sku: 'BP-EX-BLK',
      name: 'Beoplay EX',
      slug: 'beoplay-ex',
      description: 'Premium true wireless earphones with adaptive ANC and IP57 rating.',
      categoryId: headphones.id,
      price: 399,
      images: ['https://www.pngimg.com/uploads/headphones/headphones_PNG101946.png'],
      colors: [
        { name: 'Black Anthracite', hex: '#2d2d2d' },
        { name: 'Gold Tone', hex: '#b8860b' },
        { name: 'Anthracite Oxygen', hex: '#4a4a4a' },
      ],
      specs: {
        'Battery Life': '6 hours (20 with case)',
        'ANC': 'Adaptive Active Noise Cancellation',
        'IP Rating': 'IP57',
        'Codec': 'aptX Adaptive, AAC',
      },
      featured: false,
      stockCount: 45,
    },
    {
      sku: 'BP-PORTAL-BLK',
      name: 'Beoplay Portal',
      slug: 'beoplay-portal',
      description: 'Gaming headphones with Bang & Olufsen Signature Sound and low-latency wireless.',
      categoryId: headphones.id,
      price: 599,
      images: ['https://www.pngimg.com/uploads/headphones/headphones_PNG101940.png'],
      colors: [
        { name: 'Black Anthracite', hex: '#2d2d2d' },
        { name: 'Grey Mist', hex: '#9a9a9a' },
        { name: 'Navy', hex: '#1a2744' },
      ],
      specs: {
        'Battery Life': '24 hours',
        'Latency': '< 30ms wireless',
        'Platforms': 'PC, PlayStation, Xbox',
        'Mic': 'Virtual boom arm',
      },
      featured: false,
      stockCount: 20,
    },

    // Televisions
    {
      sku: 'BV-CONT-55',
      name: 'Beovision Contour 55"',
      slug: 'beovision-contour-55',
      description: 'OLED TV with integrated 3-channel speaker system and motorized floor stand.',
      categoryId: televisions.id,
      price: 7990,
      images: ['https://www.pngimg.com/uploads/tv/tv_PNG39244.png'],
      colors: [
        { name: 'Light Oak', hex: '#c4a77d' },
        { name: 'Warm Grey Oak', hex: '#8b8b8b' },
        { name: 'Black Anthracite', hex: '#2d2d2d' },
      ],
      specs: {
        'Screen Size': '55 inches',
        'Resolution': '4K OLED',
        'Sound': '3.1 integrated soundbar',
        'Stand': 'Motorized floor stand included',
      },
      featured: true,
      stockCount: 10,
    },
    {
      sku: 'BV-HARM-65',
      name: 'Beovision Harmony 65"',
      slug: 'beovision-harmony-65',
      description: 'When turned on, the sound bar glides into position revealing the screen in a choreographed movement.',
      categoryId: televisions.id,
      price: 18590,
      images: ['https://www.pngimg.com/uploads/tv/tv_PNG39236.png'],
      colors: [
        { name: 'Grey Melange Oak', hex: '#a0a0a0' },
        { name: 'Walnut', hex: '#5d4e37' },
      ],
      specs: {
        'Screen Size': '65 inches',
        'Resolution': '4K OLED',
        'Sound': 'Integrated Beolab soundbar',
        'Feature': 'Choreographed movement',
      },
      featured: true,
      stockCount: 5,
    },
    {
      sku: 'BV-THEA-77',
      name: 'Beovision Theatre 77"',
      slug: 'beovision-theatre-77',
      description: 'The ultimate home cinema experience with LG OLED panel and Bang & Olufsen sound.',
      categoryId: televisions.id,
      price: 24990,
      images: ['https://www.pngimg.com/uploads/tv/tv_PNG39233.png'],
      colors: [
        { name: 'Natural Aluminum', hex: '#c0c0c0' },
        { name: 'Brass Tone', hex: '#b5a642' },
      ],
      specs: {
        'Screen Size': '77 inches',
        'Resolution': '4K OLED',
        'Sound': '12.3 channel Dolby Atmos',
        'Power': '2100W total',
      },
      featured: true,
      stockCount: 3,
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: {
        sku: product.sku,
        name: product.name,
        slug: product.slug,
        description: product.description,
        categoryId: product.categoryId,
        price: product.price,
        images: product.images,
        colors: product.colors,
        specs: product.specs,
        featured: product.featured,
        inStock: true,
        stockCount: product.stockCount,
      },
    })
  }

  console.log(`✅ ${products.length} products created`)

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.admin.create({
    data: {
      email: 'admin@bolt-ks.com',
      passwordHash: adminPassword,
      name: 'Admin',
      role: 'superadmin',
    },
  })

  console.log('✅ Admin user created (admin@bolt-ks.com / admin123)')

  // Create a demo user
  const userPassword = await bcrypt.hash('demo123', 10)
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      passwordHash: userPassword,
      firstName: 'Demo',
      lastName: 'User',
    },
  })

  await prisma.address.create({
    data: {
      userId: demoUser.id,
      label: 'Home',
      firstName: 'Demo',
      lastName: 'User',
      street: 'Rr. Bill Clinton 12',
      city: 'Pristina',
      postalCode: '10000',
      country: 'Kosovo',
      phone: '+383 44 123 456',
      isDefault: true,
    },
  })

  console.log('✅ Demo user created (demo@example.com / demo123)')

  console.log('\n🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
