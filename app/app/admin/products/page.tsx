'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  price: number | null;
  contactOnly: boolean;
  category: string;
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  image: string | null;
  images: string[];
}

const BRAND_LABELS: Record<string, string> = {
  'BANG_OLUFSEN': 'B&O',
  'DEVIALET': 'Devialet',
  'LOEWE': 'Loewe',
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (brandFilter) params.set('brand', brandFilter);
    
    fetch(`/api/admin/products?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

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

  const filteredProducts = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (brandFilter && p.brand !== brandFilter) {
      return false;
    }
    return true;
  });

  return (
    <>
      <AdminNav active="products" />
      <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="label text-orange" style={{ marginBottom: 10 }}>Admin Panel</div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              Products
            </h1>
            <p style={{ color: '#888', marginTop: 10 }}>{products.length} products</p>
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

        {/* Filters */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20 }}>
          <div className="card light" style={{ padding: 20, display: 'flex', gap: 15, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: 200,
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: '0.95rem',
              }}
            />
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: '0.95rem',
                background: 'white',
              }}
            >
              <option value="">All Brands</option>
              <option value="BANG_OLUFSEN">Bang & Olufsen</option>
              <option value="DEVIALET">Devialet</option>
              <option value="LOEWE">Loewe</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 50 }}>Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 80, color: '#888' }}>
              <div style={{ fontSize: '3rem', marginBottom: 15, opacity: 0.5 }}>📦</div>
              <h3 style={{ fontWeight: 800, marginBottom: 10 }}>No products found</h3>
              <p style={{ marginBottom: 25 }}>
                {search || brandFilter ? 'Try adjusting your filters.' : 'Get started by adding your first product.'}
              </p>
              {!search && !brandFilter && (
                <Link href="/admin/products/new" style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>
                  Add your first product →
                </Link>
              )}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee', background: '#fafafa' }}>
                    <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Product</th>
                    <th style={{ textAlign: 'left', padding: '15px 10px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Brand</th>
                    <th style={{ textAlign: 'left', padding: '15px 10px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Category</th>
                    <th style={{ textAlign: 'left', padding: '15px 10px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Price</th>
                    <th style={{ textAlign: 'center', padding: '15px 10px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Stock</th>
                    <th style={{ textAlign: 'center', padding: '15px 10px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Status</th>
                    <th style={{ textAlign: 'right', padding: '15px 20px', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#888' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                          <div style={{ width: 60, height: 60, background: '#f5f5f5', borderRadius: 8, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                            {product.image ? (
                              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain', padding: 5 }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '1.5rem' }}>📷</div>
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, marginBottom: 3 }}>{product.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'monospace' }}>{product.sku}</div>
                            {product.featured && (
                              <span style={{ fontSize: '0.65rem', background: 'var(--accent-orange)', color: 'white', padding: '2px 6px', borderRadius: 3, marginTop: 4, display: 'inline-block', fontWeight: 700 }}>
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ padding: '4px 10px', background: '#f0f0f0', borderRadius: 4, fontSize: '0.8rem', fontWeight: 600 }}>
                          {BRAND_LABELS[product.brand] || product.brand}
                        </span>
                      </td>
                      <td style={{ padding: '15px 10px', fontSize: '0.9rem' }}>{product.category}</td>
                      <td style={{ padding: '15px 10px', fontWeight: 700 }}>
                        {product.contactOnly || product.price === null ? (
                          <span style={{ color: 'var(--accent-orange)' }}>Contact</span>
                        ) : (
                          `€${product.price.toLocaleString()}`
                        )}
                      </td>
                      <td style={{ padding: '15px 10px', textAlign: 'center' }}>
                        <span style={{ fontWeight: 600, color: product.stockCount > 0 ? '#333' : '#888' }}>
                          {product.stockCount}
                        </span>
                      </td>
                      <td style={{ padding: '15px 10px', textAlign: 'center' }}>
                        <span style={{
                          padding: '5px 12px',
                          background: product.inStock ? '#e8f5e9' : '#ffebee',
                          color: product.inStock ? '#2e7d32' : '#c62828',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          borderRadius: 20,
                        }}>
                          {product.inStock ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <Link
                            href={`/product/${product.slug}`}
                            target="_blank"
                            style={{
                              padding: '8px 12px',
                              background: '#f5f5f5',
                              color: '#666',
                              textDecoration: 'none',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              borderRadius: 6,
                            }}
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/products/${product.id}`}
                            style={{
                              padding: '8px 14px',
                              background: '#333',
                              color: 'white',
                              textDecoration: 'none',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              borderRadius: 6,
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteProduct(product.id, product.name)}
                            disabled={deleting === product.id}
                            style={{
                              padding: '8px 14px',
                              background: '#f44336',
                              color: 'white',
                              border: 'none',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              borderRadius: 6,
                              cursor: deleting === product.id ? 'wait' : 'pointer',
                              opacity: deleting === product.id ? 0.5 : 1,
                            }}
                          >
                            {deleting === product.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
