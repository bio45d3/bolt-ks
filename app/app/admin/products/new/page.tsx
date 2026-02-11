'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    subtitle: '',
    description: '',
    longDescription: '',
    price: '',
    category: 'speakers',
    stock: '',
    featured: false,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // In production, this would save to database
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    router.push('/admin/products');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    marginBottom: 20,
  };

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
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <Link href="/admin/products" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Back to Products
          </Link>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9, marginTop: 15 }}>
            Add Product
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="card light" style={{ gridColumn: 'span 8', padding: 40, marginBottom: 20 }}>
            <h2 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>Basic Information</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: 10 }}>Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Beoplay A9"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: 10 }}>Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="beoplay-a9"
                  required
                  style={{ ...inputStyle, background: '#f5f5f5' }}
                />
              </div>
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: 10 }}>Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Iconic Wireless Speaker"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: 10 }}>Short Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief product description"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: 10 }}>Full Description</label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                placeholder="Detailed product description..."
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="card light" style={{ gridColumn: 'span 4', padding: 40, marginBottom: 20 }}>
            <h2 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>Pricing & Inventory</h2>
            
            <div>
              <label className="label" style={{ display: 'block', marginBottom: 10 }}>Price (USD)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: 10 }}>Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                required
                min="0"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="label" style={{ display: 'block', marginBottom: 10 }}>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ ...inputStyle, background: 'white' }}
              >
                <option value="speakers">Speakers</option>
                <option value="headphones">Headphones</option>
                <option value="televisions">Televisions</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: 30, marginTop: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: 18, height: 18 }}
                />
                <span>Featured</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  style={{ width: 18, height: 18 }}
                />
                <span>Active</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div style={{ gridColumn: 'span 12', display: 'flex', gap: 15, justifyContent: 'flex-end' }}>
            <Link
              href="/admin/products"
              style={{
                padding: '18px 40px',
                background: 'transparent',
                border: '1px solid #ddd',
                color: '#666',
                textDecoration: 'none',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '18px 40px',
                background: saving ? '#888' : 'var(--accent-orange)',
                border: 'none',
                color: 'white',
                fontWeight: 800,
                textTransform: 'uppercase',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Saving...' : 'Create Product'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
