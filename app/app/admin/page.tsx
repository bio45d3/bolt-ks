'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: Array<{
    id: string;
    customer: string;
    total: number;
    status: string;
    date: string;
  }>;
  topProducts: Array<{
    name: string;
    sold: number;
    revenue: number;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return 'var(--accent-orange)';
      case 'confirmed': return '#9C27B0';
      case 'cancelled': return '#f44336';
      case 'pending': return '#FF9800';
      default: return '#888';
    }
  };

  if (loading) {
    return (
      <>
        <AdminNav active="dashboard" />
        <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
          <div style={{ gridColumn: 'span 12', textAlign: 'center', padding: 100 }}>
            Loading...
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminNav active="dashboard" />
      <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Admin Panel</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Dashboard
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="card dark" style={{ gridColumn: 'span 3', padding: 30, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -10, bottom: -20, fontSize: '6rem', fontWeight: 900, opacity: 0.1 }}>📦</div>
          <div className="label" style={{ color: '#888', marginBottom: 10 }}>Total Orders</div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>{stats?.totalOrders || 0}</div>
        </div>

        <div className="card dark" style={{ gridColumn: 'span 3', padding: 30, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -10, bottom: -20, fontSize: '6rem', fontWeight: 900, opacity: 0.1, color: 'var(--accent-orange)' }}>€</div>
          <div className="label" style={{ color: '#888', marginBottom: 10 }}>Total Revenue</div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--accent-orange)' }}>
            €{(stats?.totalRevenue || 0).toLocaleString()}
          </div>
        </div>

        <div className="card dark" style={{ gridColumn: 'span 3', padding: 30, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -10, bottom: -20, fontSize: '6rem', fontWeight: 900, opacity: 0.1 }}>🎧</div>
          <div className="label" style={{ color: '#888', marginBottom: 10 }}>Products</div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>{stats?.totalProducts || 0}</div>
        </div>

        <div className="card dark" style={{ gridColumn: 'span 3', padding: 30, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -10, bottom: -20, fontSize: '6rem', fontWeight: 900, opacity: 0.1 }}>👤</div>
          <div className="label" style={{ color: '#888', marginBottom: 10 }}>Users</div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>{stats?.totalUsers || 0}</div>
        </div>

        {/* Recent Orders */}
        <div className="card light" style={{ gridColumn: 'span 8', padding: 30, marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
            <h2 style={{ fontWeight: 800, textTransform: 'uppercase' }}>Recent Orders</h2>
            <Link href="/admin/orders" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
              View All →
            </Link>
          </div>

          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Order</th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Customer</th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Total</th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px 0', fontWeight: 600, fontFamily: 'monospace' }}>{order.id}</td>
                      <td style={{ padding: '15px 0' }}>{order.customer}</td>
                      <td style={{ padding: '15px 0', fontWeight: 700 }}>€{order.total.toLocaleString()}</td>
                      <td style={{ padding: '15px 0' }}>
                        <span style={{
                          padding: '5px 12px',
                          background: getStatusColor(order.status),
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          borderRadius: 20,
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '15px 0', color: '#888', fontSize: '0.9rem' }}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 50, color: '#888' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 15, opacity: 0.5 }}>📋</div>
              <p>No orders yet</p>
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="card light" style={{ gridColumn: 'span 4', padding: 30, marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
            <h2 style={{ fontWeight: 800, textTransform: 'uppercase' }}>Top Products</h2>
            <Link href="/admin/products" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
              View All →
            </Link>
          </div>

          {stats?.topProducts && stats.topProducts.length > 0 ? (
            stats.topProducts.map((product, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: i < stats.topProducts.length - 1 ? '1px solid #eee' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 3 }}>{product.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>{product.sold} sold</div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--accent-orange)' }}>
                  €{product.revenue.toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: 50, color: '#888' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 15, opacity: 0.5 }}>📊</div>
              <p>No sales data yet</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 40, marginTop: 10 }}>
          <h3 style={{ fontWeight: 800, marginBottom: 25, textTransform: 'uppercase' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
            <Link
              href="/admin/products/new"
              style={{
                flex: '1 1 200px',
                padding: '25px',
                background: 'var(--accent-orange)',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderRadius: 8,
              }}
            >
              + Add Product
            </Link>
            <Link
              href="/admin/products"
              style={{
                flex: '1 1 200px',
                padding: '25px',
                background: '#333',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderRadius: 8,
              }}
            >
              Manage Products
            </Link>
            <Link
              href="/admin/orders"
              style={{
                flex: '1 1 200px',
                padding: '25px',
                background: '#333',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderRadius: 8,
              }}
            >
              View Orders
            </Link>
            <Link
              href="/"
              style={{
                flex: '1 1 200px',
                padding: '25px',
                background: 'transparent',
                border: '1px solid #444',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderRadius: 8,
              }}
            >
              View Store
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function AdminNav({ active }: { active: string }) {
  return (
    <nav className="site-nav" style={{ background: '#000', mixBlendMode: 'normal' }}>
      <Link href="/" className="logo" style={{ color: 'white' }}>BOLT KS</Link>
      <div className="nav-links desktop-nav">
        <Link href="/admin" style={{ color: active === 'dashboard' ? 'var(--accent-orange)' : 'white' }}>Dashboard</Link>
        <Link href="/admin/products" style={{ color: active === 'products' ? 'var(--accent-orange)' : 'white' }}>Products</Link>
        <Link href="/admin/orders" style={{ color: active === 'orders' ? 'var(--accent-orange)' : 'white' }}>Orders</Link>
        <Link href="/" style={{ marginLeft: 20 }}>← Store</Link>
      </div>
    </nav>
  );
}
