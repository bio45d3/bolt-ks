import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Generate order number like BO-12345678
function generateOrderNumber() {
  const num = Math.floor(10000000 + Math.random() * 90000000);
  return `BO-${num}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shipping, payment, userId } = body;

    // Validate items and get product details
    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: 'Some products not found' }, { status: 400 });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const product = products.find((p) => p.id === item.productId)!;
      const price = Number(product.price);
      subtotal += price * item.quantity;

      return {
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        productImage: product.images[0] || null,
        quantity: item.quantity,
        price: price,
        color: item.color || null,
      };
    });

    const shippingCost = subtotal > 500 ? 0 : 29; // Free shipping over €500
    const tax = 0; // Kosovo has VAT included in price
    const total = subtotal + shippingCost + tax;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: userId || null,
        guestEmail: !userId ? shipping.email : null,
        guestPhone: !userId ? shipping.phone : null,
        shippingAddress: {
          firstName: shipping.firstName,
          lastName: shipping.lastName,
          street: shipping.address,
          city: shipping.city,
          postalCode: shipping.postalCode,
          country: shipping.country || 'Kosovo',
          phone: shipping.phone,
        },
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        paymentMethod: payment.method,
        status: 'PENDING',
        paymentStatus: payment.method === 'card' ? 'PAID' : 'PENDING',
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    // Update stock counts
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stockCount: { decrement: item.quantity } },
      });
    }

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      total: Number(order.total),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
