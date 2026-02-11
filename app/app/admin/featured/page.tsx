'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
}

interface FeaturedSlot {
  position: number;
  label: string;
  description: string;
  productId: string | null;
  product: Product | null;
}

const SLOT_CONFIG = [
  { position: 1, label: 'Hero Product', description: 'Large hero card at the top of the page' },
  { position: 2, label: 'Featured 1', description: 'First product card below hero' },
  { position: 3, label: 'Featured 2', description: 'Second product card' },
  { position: 4, label: 'Featured 3', description: 'Third product card' },
];

export default function FeaturedSettingsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredSlots, setFeaturedSlots] = useState<FeaturedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all products
        const productsRes = await fetch('/api/products');
        const productsData = await productsRes.json();
        setProducts(productsData);

        // Fetch current featured settings
        const featuredRes = await fetch('/api/admin/featured');
        const featuredData = await featuredRes.json();
        
        // Map to slots
        const slots = SLOT_CONFIG.map(slot => {
          const featured = featuredData.find((f: { position: number }) => f.position === slot.position);
          const product = featured ? productsData.find((p: Product) => p.id === featured.productId) : null;
          return {
            ...slot,
            productId: featured?.productId || null,
            product: product || null,
          };
        });
        setFeaturedSlots(slots);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSelectProduct = async (slotPosition: number, productId: string | null) => {
    setSaving(true);
    try {
      await fetch('/api/admin/featured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: slotPosition, productId }),
      });

      // Update local state
      setFeaturedSlots(prev => prev.map(slot => {
        if (slot.position === slotPosition) {
          const product = productId ? products.find(p => p.id === productId) : null;
          return { ...slot, productId, product: product || null };
        }
        return slot;
      }));
      setActiveSlot(null);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <AdminNav active="featured" />
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
      <AdminNav active="featured" />
      <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <Link href="/admin" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Back to Dashboard
          </Link>
          <div className="label text-orange" style={{ marginBottom: 10, marginTop: 20 }}>Homepage Settings</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Featured Products
          </h1>
          <p style={{ color: '#666', marginTop: 15, maxWidth: 600 }}>
            Select which products appear on the homepage. Changes are saved automatically.
          </p>
        </div>

        {/* Featured Slots */}
        {featuredSlots.map((slot, index) => (
          <div
            key={slot.position}
            className="card light"
            style={{
              gridColumn: index === 0 ? 'span 12' : 'span 4',
              padding: 30,
              marginBottom: 20,
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div className="label text-orange" style={{ marginBottom: 8 }}>Position {slot.position}</div>
                <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 5 }}>{slot.label}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem' }}>{slot.description}</p>
              </div>
              <span style={{
                padding: '4px 12px',
                background: slot.product ? '#4CAF50' : '#888',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderRadius: 20,
              }}>
                {slot.product ? 'Active' : 'Empty'}
              </span>
            </div>

            {/* Current Product */}
            {slot.product ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: 20,
                background: '#f9f9f9',
                borderRadius: 12,
                marginBottom: 20,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slot.product.images?.[0] || 'https://pngimg.com/d/wireless_speaker_PNG18.png'}
                  alt={slot.product.name}
                  style={{ width: 80, height: 80, objectFit: 'contain', background: '#eee', borderRadius: 8 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, marginBottom: 5 }}>{slot.product.name}</div>
                  <div style={{ color: '#888', fontSize: '0.85rem' }}>{slot.product.category}</div>
                  <div style={{ fontWeight: 800, color: 'var(--accent-orange)', marginTop: 5 }}>
                    {slot.product.price > 0 ? `€${slot.product.price.toLocaleString()}` : 'Contact Us'}
                  </div>
                </div>
                <button
                  onClick={() => handleSelectProduct(slot.position, null)}
                  style={{
                    padding: '10px 20px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    borderRadius: 6,
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{
                padding: 40,
                background: '#f9f9f9',
                borderRadius: 12,
                textAlign: 'center',
                marginBottom: 20,
                border: '2px dashed #ddd',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 10, opacity: 0.3 }}>📦</div>
                <p style={{ color: '#888' }}>No product selected</p>
              </div>
            )}

            {/* Select Button / Product Picker */}
            {activeSlot === slot.position ? (
              <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 20 }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    marginBottom: 15,
                    fontSize: '0.95rem',
                  }}
                />
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {filteredProducts.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(slot.position, product.id)}
                      disabled={saving}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 15,
                        width: '100%',
                        padding: 12,
                        background: slot.productId === product.id ? '#fff3e0' : 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #eee',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images?.[0] || 'https://pngimg.com/d/wireless_speaker_PNG18.png'}
                        alt={product.name}
                        style={{ width: 50, height: 50, objectFit: 'contain', background: '#f5f5f5', borderRadius: 6 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{product.name}</div>
                        <div style={{ color: '#888', fontSize: '0.8rem' }}>{product.category}</div>
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--accent-orange)', fontSize: '0.9rem' }}>
                        {product.price > 0 ? `€${product.price.toLocaleString()}` : 'Contact'}
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { setActiveSlot(null); setSearchTerm(''); }}
                  style={{
                    width: '100%',
                    padding: 12,
                    background: '#eee',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: 15,
                    borderRadius: 8,
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveSlot(slot.position)}
                style={{
                  width: '100%',
                  padding: '15px 25px',
                  background: 'var(--accent-orange)',
                  color: 'white',
                  border: 'none',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: 8,
                }}
              >
                {slot.product ? 'Change Product' : 'Select Product'}
              </button>
            )}
          </div>
        ))}

        {/* Preview Link */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 40, marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 10 }}>Preview Changes</h3>
              <p style={{ color: '#888' }}>See how your featured products look on the homepage</p>
            </div>
            <Link
              href="/"
              target="_blank"
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
              View Homepage →
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
      <Link href="/" className="logo" style={{ color: 'white' }}>BOLD</Link>
      <div className="nav-links desktop-nav">
        <Link href="/admin" style={{ color: active === 'dashboard' ? 'var(--accent-orange)' : 'white' }}>Dashboard</Link>
        <Link href="/admin/products" style={{ color: active === 'products' ? 'var(--accent-orange)' : 'white' }}>Products</Link>
        <Link href="/admin/featured" style={{ color: active === 'featured' ? 'var(--accent-orange)' : 'white' }}>Featured</Link>
        <Link href="/admin/orders" style={{ color: active === 'orders' ? 'var(--accent-orange)' : 'white' }}>Orders</Link>
        <Link href="/" style={{ marginLeft: 20 }}>← Store</Link>
      </div>
    </nav>
  );
}
