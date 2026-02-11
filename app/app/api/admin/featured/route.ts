import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch featured product settings
export async function GET() {
  try {
    const featured = await prisma.featuredProduct.findMany({
      orderBy: { position: 'asc' },
      include: {
        product: true,
      },
    });

    return NextResponse.json(featured);
  } catch (error) {
    console.error('Failed to fetch featured:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Set a featured product slot
export async function POST(request: Request) {
  try {
    const { position, productId } = await request.json();

    if (!position || position < 1 || position > 4) {
      return NextResponse.json({ error: 'Invalid position' }, { status: 400 });
    }

    if (productId === null) {
      // Remove featured product from this slot
      await prisma.featuredProduct.deleteMany({
        where: { position },
      });
      return NextResponse.json({ success: true, message: 'Removed' });
    }

    // Upsert the featured product slot
    const featured = await prisma.featuredProduct.upsert({
      where: { position },
      update: { productId },
      create: { position, productId },
    });

    return NextResponse.json(featured);
  } catch (error) {
    console.error('Failed to set featured:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
