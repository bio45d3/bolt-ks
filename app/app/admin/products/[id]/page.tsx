'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;
  brand: string;
  categoryId: string;
  price: number | null;
  compareAt: number | null;
  contactOnly: boolean;
  images: string[];
  colors: { name: string; hex: string }[];
  specs: Record<string, string>;
  featured: boolean;
  inStock: boolean;
  stockCount: number;
}

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products/${productId}`).then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      }),
      fetch('/api/admin/categories').then(res => res.json()),
    ])
      .then(([productData, categoriesData]) => {
        setProduct({
          ...productData,
          colors: productData.colors || [],
          specs: productData.specs || {},
          images: productData.images || [],
        });
        setCategories(categoriesData.categories || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

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

  if (error || !product) {
    return (
      <>
        <AdminNav active="products" />
        <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
          <div className="card light" style={{ gridColumn: 'span 12', textAlign: 'center', padding: 80 }}>
            <h2 style={{ fontWeight: 800, marginBottom: 15 }}>Product Not Found</h2>
            <p style={{ color: '#888', marginBottom: 30 }}>{error || 'The requested product could not be found.'}</p>
            <Link
              href="/admin/products"
              style={{
                padding: '15px 30px',
                background: 'var(--accent-orange)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                borderRadius: 8,
              }}
            >
              Back to Products
            </Link>
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
            Edit Product
          </h1>
          <p style={{ color: '#888', marginTop: 10 }}>
            {product.name} ({product.sku})
          </p>
        </div>

        {/* Form */}
        <div style={{ gridColumn: 'span 12' }}>
          <ProductForm product={product} categories={categories} />
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
