'use client';

import Link from 'next/link';
import { useState } from 'react';

// Mock products data
const mockProducts = [
  { id: '1', slug: 'beolab-90', name: 'Beolab 90', category: 'Speakers', price: 80000, stock: 3, active: true },
  { id: '2', slug: 'beoplay-a9', name: 'Beoplay A9', category: 'Speakers', price: 2999, stock: 15, active: true },
  { id: '3', slug: 'beoplay-h95', name: 'Beoplay H95', category: 'Headphones', price: 899, stock: 45, active: true },
  { id: '4', slug: 'beolit-20', name: 'Beolit 20', category: 'Speakers', price: 549, stock: 28, active: true },
  { id: '5', slug: 'beovision-harmony', name: 'Beovision Harmony', category: 'Televisions', price: 18590, stock: 5, active: true },
  { id: '6', slug: 'beoplay-hx', name: 'Beoplay HX', category: 'Headphones', price: 499, stock: 0, active: false },
];

export default function AdminProductsPage() {
  const [products] = useState(mockProducts);
  const [filter, setFilter] = useState('all');

  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'active') return p.active;
    if (filter === 'outofstock') return p.stock === 0;
    return p.category.toLowerCase() === filter;
  });

  return (
    <>
      <nav style={{ background: '#000', mixBlendMode: 'normal' }}>
        <Link href="/" className="logo" style={{ color: 'white' }}>BANG & OLUFSEN</Link>
        <div className="nav-links">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products" style={{ color: 'var(--accent-orange)' }}>Products</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/" style={{ marginLeft: 20 }}>← Back to Store</Link>
        </div>
      </nav>

      <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="label text-orange" style={{ marginBottom: 10 }}>Admin Panel</div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              Products
            </h1>
          </div>
          <Link
            href="/admin/products/new"
            style={{
              padding: '15px 30px',
              background: 'var(--accent-orange)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            + Add Product
          </Link>
        </div>

        {/* Filters */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20, display: 'flex', gap: 10 }}>
          {['all', 'speakers', 'headphones', 'televisions', 'active', 'outofstock'].map((f) => (
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
              {f === 'outofstock' ? 'Out of Stock' : f}
            </button>
          ))}
        </div>

        {/* Products Table */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Product</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Stock</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '20px' }}>
                    <div style={{ fontWeight: 700 }}>{product.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{product.slug}</div>
                  </td>
                  <td style={{ padding: '20px' }}>{product.category}</td>
                  <td style={{ padding: '20px', fontWeight: 600 }}>${product.price.toLocaleString()}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ color: product.stock === 0 ? '#f44336' : product.stock < 10 ? 'var(--accent-orange)' : '#4CAF50', fontWeight: 600 }}>
                      {product.stock}
                    </span>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <span style={{
                      padding: '5px 12px',
                      background: product.active ? '#4CAF50' : '#888',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      borderRadius: 4,
                    }}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '20px', textAlign: 'right' }}>
                    <Link
                      href={`/admin/products/${product.id}`}
                      style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 600, marginRight: 15 }}
                    >
                      Edit
                    </Link>
                    <button style={{ color: '#f44336', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                      Delete
                    </button>
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
