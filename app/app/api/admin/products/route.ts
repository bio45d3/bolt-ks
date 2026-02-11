import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');

    const where: any = {};
    if (category) where.category = { slug: category };
    if (brand) where.brand = brand;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products: products.map((p) => ({
        id: p.id,
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        subtitle: p.subtitle,
        brand: p.brand,
        price: p.price ? Number(p.price) : null,
        compareAt: p.compareAt ? Number(p.compareAt) : null,
        contactOnly: p.contactOnly,
        category: p.category.name,
        categoryId: p.categoryId,
        inStock: p.inStock,
        stockCount: p.stockCount,
        featured: p.featured,
        images: p.images,
        image: p.images[0] || null,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate slug from name if not provided
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const product = await prisma.product.create({
      data: {
        sku: body.sku,
        name: body.name,
        slug,
        subtitle: body.subtitle,
        description: body.description,
        longDescription: body.longDescription,
        brand: body.brand || 'BANG_OLUFSEN',
        categoryId: body.categoryId,
        price: body.price !== null && body.price !== '' ? body.price : null,
        compareAt: body.compareAt !== null && body.compareAt !== '' ? body.compareAt : null,
        contactOnly: body.contactOnly || false,
        images: body.images || [],
        colors: body.colors || [],
        specs: body.specs || {},
        featured: body.featured || false,
        inStock: body.inStock ?? true,
        stockCount: body.stockCount || 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'SKU or slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
