'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  image: string | null;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch {
      alert('Failed to delete product');
    }
    setDeleting(null);
  };

  return (
    <>
      <AdminNav active="products" />
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
              borderRadius: 8,
            }}
          >
            + Add Product
          </Link>
        </div>

        {/* Products Table */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 30 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 50 }}>Loading...</div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 50, color: '#888' }}>
              No products yet.{' '}
              <Link href="/admin/products/new" style={{ color: 'var(--accent-orange)' }}>
                Add your first product
              </Link>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Product</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>SKU</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Stock</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Status</th>
                  <th style={{ textAlign: 'right', padding: '12px 0', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        {product.image && (
                          <div style={{ width: 50, height: 50, background: '#f0f0f0', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                            <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} />
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 600 }}>{product.name}</div>
                          {product.featured && (
                            <span style={{ fontSize: '0.7rem', background: 'var(--accent-orange)', color: 'white', padding: '2px 6px', borderRadius: 3, marginTop: 4, display: 'inline-block' }}>
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '15px 0', fontFamily: 'monospace', fontSize: '0.9rem' }}>{product.sku}</td>
                    <td style={{ padding: '15px 0' }}>{product.category}</td>
                    <td style={{ padding: '15px 0', fontWeight: 600 }}>€{product.price.toLocaleString()}</td>
                    <td style={{ padding: '15px 0' }}>{product.stockCount}</td>
                    <td style={{ padding: '15px 0' }}>
                      <span style={{
                        padding: '5px 12px',
                        background: product.inStock ? '#4CAF50' : '#f44336',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        borderRadius: 4,
                      }}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '15px 0', textAlign: 'right' }}>
                      <Link
                        href={`/admin/products/${product.id}`}
                        style={{
                          padding: '8px 15px',
                          background: '#333',
                          color: 'white',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          borderRadius: 4,
                          marginRight: 8,
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        disabled={deleting === product.id}
                        style={{
                          padding: '8px 15px',
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          borderRadius: 4,
                          cursor: deleting === product.id ? 'wait' : 'pointer',
                          opacity: deleting === product.id ? 0.5 : 1,
                        }}
                      >
                        {deleting === product.id ? '...' : 'Delete'}
                      </button>
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
