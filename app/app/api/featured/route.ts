import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch featured products for homepage display
export async function GET() {
  try {
    const featured = await prisma.featuredProduct.findMany({
      orderBy: { position: 'asc' },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    // Transform to match expected format
    const products = featured.map(f => ({
      position: f.position,
      product: f.product ? {
        id: f.product.id,
        name: f.product.name,
        slug: f.product.slug,
        subtitle: f.product.subtitle,
        description: f.product.description,
        price: f.product.price ? Number(f.product.price) : 0,
        images: f.product.images,
        colors: f.product.colors,
        category: f.product.category.name,
        categorySlug: f.product.category.slug,
        contactOnly: f.product.contactOnly,
      } : null,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return NextResponse.json([], { status: 200 });
  }
}
