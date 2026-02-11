import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const where: any = { inStock: true };
    if (category) where.category = { slug: category };
    if (featured === 'true') where.featured = true;

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(
      products.map((p) => ({
        id: p.id,
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: Number(p.price),
        compareAt: p.compareAt ? Number(p.compareAt) : null,
        images: p.images,
        colors: p.colors,
        specs: p.specs,
        category: p.category.name,
        categorySlug: p.category.slug,
        featured: p.featured,
        inStock: p.inStock,
      }))
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
