'use client';

import Link from 'next/link';
import { useState } from 'react';

// Mock orders data
const mockOrders = [
  { id: 'BO-12345678', customer: 'John Doe', email: 'john@example.com', total: 2999, status: 'processing', items: 1, date: '2024-02-11' },
  { id: 'BO-12345677', customer: 'Jane Smith', email: 'jane@example.com', total: 899, status: 'shipped', items: 1, date: '2024-02-10' },
  { id: 'BO-12345676', customer: 'Bob Wilson', email: 'bob@example.com', total: 18590, status: 'delivered', items: 1, date: '2024-02-09' },
  { id: 'BO-12345675', customer: 'Alice Brown', email: 'alice@example.com', total: 549, status: 'processing', items: 2, date: '2024-02-09' },
  { id: 'BO-12345674', customer: 'Charlie Davis', email: 'charlie@example.com', total: 3898, status: 'shipped', items: 2, date: '2024-02-08' },
  { id: 'BO-12345673', customer: 'Diana Ross', email: 'diana@example.com', total: 80000, status: 'delivered', items: 1, date: '2024-02-07' },
  { id: 'BO-12345672', customer: 'Edward King', email: 'edward@example.com', total: 1798, status: 'cancelled', items: 2, date: '2024-02-06' },
];

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders);
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(o => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return 'var(--accent-orange)';
      case 'cancelled': return '#f44336';
      default: return '#888';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // In production, this would update the database
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <>
      <nav style={{ background: '#000', mixBlendMode: 'normal' }}>
        <Link href="/" className="logo" style={{ color: 'white' }}>BANG & OLUFSEN</Link>
        <div className="nav-links">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders" style={{ color: 'var(--accent-orange)' }}>Orders</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/" style={{ marginLeft: 20 }}>← Back to Store</Link>
        </div>
      </nav>

      <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Admin Panel</div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Orders
          </h1>
        </div>

        {/* Stats */}
        <div className="card dark" style={{ gridColumn: 'span 3', padding: 25 }}>
          <div className="label" style={{ color: '#888' }}>Processing</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
            {orders.filter(o => o.status === 'processing').length}
          </div>
        </div>
        <div className="card dark" style={{ gridColumn: 'span 3', padding: 25 }}>
          <div className="label" style={{ color: '#888' }}>Shipped</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2196F3' }}>
            {orders.filter(o => o.status === 'shipped').length}
          </div>
        </div>
        <div className="card dark" style={{ gridColumn: 'span 3', padding: 25 }}>
          <div className="label" style={{ color: '#888' }}>Delivered</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4CAF50' }}>
            {orders.filter(o => o.status === 'delivered').length}
          </div>
        </div>
        <div className="card dark" style={{ gridColumn: 'span 3', padding: 25 }}>
          <div className="label" style={{ color: '#888' }}>Cancelled</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f44336' }}>
            {orders.filter(o => o.status === 'cancelled').length}
          </div>
        </div>

        {/* Filters */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20, marginTop: 20, display: 'flex', gap: 10 }}>
          {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '10px 20px',
                background: filter === f ? 'var(--accent-orange)' : 'white',
                color: filter === f ? 'white' : '#666',
                border: filter === f ? 'none' : '1px solid #ddd',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Order</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Items</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Total</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '20px', fontWeight: 700 }}>{order.id}</td>
                  <td style={{ padding: '20px' }}>
                    <div>{order.customer}</div>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{order.email}</div>
                  </td>
                  <td style={{ padding: '20px' }}>{order.items}</td>
                  <td style={{ padding: '20px', fontWeight: 700 }}>${order.total.toLocaleString()}</td>
                  <td style={{ padding: '20px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        background: getStatusColor(order.status),
                        color: 'white',
                        border: 'none',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '20px', color: '#888' }}>{order.date}</td>
                  <td style={{ padding: '20px', textAlign: 'right' }}>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
