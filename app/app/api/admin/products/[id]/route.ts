import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...product,
      price: product.price ? Number(product.price) : null,
      compareAt: product.compareAt ? Number(product.compareAt) : null,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        sku: body.sku,
        name: body.name,
        slug: body.slug,
        subtitle: body.subtitle,
        description: body.description,
        longDescription: body.longDescription,
        brand: body.brand,
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

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'SKU or slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
