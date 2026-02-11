'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductForm from '@/components/admin/ProductForm';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function NewProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <AdminNav active="products" />
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
      <AdminNav active="products" />
      <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <Link href="/admin/products" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Back to Products
          </Link>
          <div className="label text-orange" style={{ marginBottom: 10, marginTop: 20 }}>Admin Panel</div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Add Product
          </h1>
        </div>

        {/* Form */}
        <div style={{ gridColumn: 'span 12' }}>
          <ProductForm categories={categories} />
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
