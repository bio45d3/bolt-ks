'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  customer: { name: string; email: string };
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
      }
    } catch {
      alert('Failed to update order');
    }
    setUpdating(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return 'var(--accent-orange)';
      case 'confirmed': return '#9C27B0';
      case 'cancelled': return '#f44336';
      case 'pending': return '#FF9800';
      default: return '#888';
    }
  };

  return (
    <>
      <AdminNav active="orders" />
      <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Admin Panel</div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Orders
          </h1>
        </div>

        <div className="card light" style={{ gridColumn: 'span 12', padding: 30 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 50 }}>Loading...</div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 50, color: '#888' }}>
              No orders yet.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Order</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Total</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Payment</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px 0', fontWeight: 600 }}>{order.orderNumber}</td>
                    <td style={{ padding: '15px 0' }}>
                      <div>{order.customer.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#888' }}>{order.customer.email}</div>
                    </td>
                    <td style={{ padding: '15px 0', fontWeight: 600 }}>€{order.total.toLocaleString()}</td>
                    <td style={{ padding: '15px 0' }}>
                      <span style={{
                        padding: '5px 12px',
                        background: order.paymentStatus === 'PAID' ? '#4CAF50' : '#FF9800',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        borderRadius: 4,
                      }}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '15px 0' }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        disabled={updating === order.id}
                        style={{
                          padding: '8px 12px',
                          background: getStatusColor(order.status),
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} style={{ background: '#333' }}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '15px 0', color: '#888' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}

function AdminNav({ active }: { active: string }) {
  return (
    <nav style={{ background: '#000', mixBlendMode: 'normal' }}>
      <Link href="/" className="logo" style={{ color: 'white' }}>BANG & OLUFSEN</Link>
      <div className="nav-links">
        <Link href="/admin" style={{ color: active === 'dashboard' ? 'var(--accent-orange)' : 'white' }}>Dashboard</Link>
        <Link href="/admin/products" style={{ color: active === 'products' ? 'var(--accent-orange)' : 'white' }}>Products</Link>
        <Link href="/admin/orders" style={{ color: active === 'orders' ? 'var(--accent-orange)' : 'white' }}>Orders</Link>
        <Link href="/admin/users" style={{ color: active === 'users' ? 'var(--accent-orange)' : 'white' }}>Users</Link>
        <Link href="/" style={{ marginLeft: 20 }}>← Back to Store</Link>
      </div>
    </nav>
  );
}
