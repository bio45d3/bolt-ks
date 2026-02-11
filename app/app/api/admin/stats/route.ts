import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get counts
    const [totalOrders, totalProducts, totalUsers] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
    ]);

    // Get total revenue
    const revenueResult = await prisma.order.aggregate({
      _sum: { total: true },
      where: { paymentStatus: 'PAID' },
    });
    const totalRevenue = Number(revenueResult._sum.total || 0);

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        items: true,
      },
    });

    // Get top products by order count
    const topProductsData = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 4,
    });

    const topProductIds = topProductsData.map((p) => p.productId);
    const topProductDetails = await prisma.product.findMany({
      where: { id: { in: topProductIds } },
    });

    const topProducts = topProductsData.map((p) => {
      const product = topProductDetails.find((d) => d.id === p.productId);
      return {
        name: product?.name || 'Unknown',
        sold: p._sum.quantity || 0,
        revenue: Number(p._sum.price || 0) * (p._sum.quantity || 1),
      };
    });

    return NextResponse.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      recentOrders: recentOrders.map((o) => ({
        id: o.orderNumber,
        customer: o.user
          ? `${o.user.firstName || ''} ${o.user.lastName || ''}`.trim() || o.user.email
          : o.guestEmail || 'Guest',
        total: Number(o.total),
        status: o.status.toLowerCase(),
        date: o.createdAt.toISOString().split('T')[0],
      })),
      topProducts,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
