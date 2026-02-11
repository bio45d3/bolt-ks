'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';

type BrandFilter = 'all' | 'bang-olufsen' | 'devialet' | 'loewe';
type BrandName = 'bang-olufsen' | 'devialet' | 'loewe';
type Category = 'all' | 'speakers' | 'headphones' | 'televisions' | 'soundbars';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number | null;
  image: string;
  brand: BrandName;
  category: Exclude<Category, 'all'>;
  colors: string[];
  contactOnly?: boolean;
}

// Mock data - will be replaced with API calls
const products: Product[] = [
  // Bang & Olufsen
  { id: 'beosound-2', name: 'Beosound 2', subtitle: 'Elegant Home Speaker', price: 4000, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', brand: 'bang-olufsen', category: 'speakers', colors: ['#C6A665', '#2F2F2F', '#C0C0C0'] },
  { id: 'beosound-a9', name: 'Beosound A9', subtitle: 'Iconic Design', price: 4550, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600', brand: 'bang-olufsen', category: 'speakers', colors: ['#1E3A5F', '#C6A665', '#2F2F2F'] },
  { id: 'beoplay-h95', name: 'Beoplay H95', subtitle: 'Premium ANC', price: 1250, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', brand: 'bang-olufsen', category: 'headphones', colors: ['#000000', '#C6A665', '#808080'] },
  { id: 'beovision-harmony', name: 'Beovision Harmony', subtitle: '77" OLED', price: 18590, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600', brand: 'bang-olufsen', category: 'televisions', colors: ['#8B4513', '#C0C0C0'] },
  { id: 'beolab-28', name: 'Beolab 28', subtitle: 'Hi-Fidelity', price: 22050, image: 'https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?w=600', brand: 'bang-olufsen', category: 'speakers', colors: ['#C0C0C0', '#2F2F2F'] },
  
  // Devialet
  { id: 'phantom-i', name: 'Phantom I', subtitle: '108 dB Speaker', price: 3200, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600', brand: 'devialet', category: 'speakers', colors: ['#FFFFFF', '#000000', '#C6A665'] },
  { id: 'phantom-ii', name: 'Phantom II', subtitle: '98 dB Compact', price: 1400, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', brand: 'devialet', category: 'speakers', colors: ['#FFFFFF', '#000000'] },
  { id: 'dione', name: 'Dione', subtitle: 'Soundbar', price: 2490, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600', brand: 'devialet', category: 'soundbars', colors: ['#000000'] },
  { id: 'gemini-ii', name: 'Gemini II', subtitle: 'True Wireless', price: 399, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', brand: 'devialet', category: 'headphones', colors: ['#000000', '#FFFFFF'] },
  
  // Loewe
  { id: 'stellar', name: 'Stellar', subtitle: '77" OLED TV', price: null, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600', brand: 'loewe', category: 'televisions', colors: ['#2F2F2F'], contactOnly: true },
  { id: 'iconic', name: 'Iconic', subtitle: '55" OLED TV', price: null, image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600', brand: 'loewe', category: 'televisions', colors: ['#C0C0C0', '#000000'], contactOnly: true },
  { id: 'klang-bar-i', name: 'Klang Bar i', subtitle: 'Soundbar', price: 1490, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600', brand: 'loewe', category: 'soundbars', colors: ['#2F2F2F', '#C0C0C0'] },
  { id: 'klang-s1', name: 'Klang S1', subtitle: 'Subwoofer', price: 990, image: 'https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?w=600', brand: 'loewe', category: 'speakers', colors: ['#2F2F2F'] },
];

const brandInfo = {
  'bang-olufsen': { name: 'Bang & Olufsen', logo: 'B&O', color: '#000000', country: 'Denmark' },
  'devialet': { name: 'Devialet', logo: 'DEVIALET', color: '#000000', country: 'France' },
  'loewe': { name: 'Loewe', logo: 'LOEWE', color: '#000000', country: 'Germany' },
};

function ColorDot({ color }: { color: string }) {
  return <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, border: '1px solid rgba(0,0,0,0.1)' }} />;
}

export default function ShopPage() {
  const [selectedBrand, setSelectedBrand] = useState<BrandFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const filteredProducts = products
    .filter(p => selectedBrand === 'all' || p.brand === selectedBrand)
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price ?? 999999) - (b.price ?? 999999);
      if (sortBy === 'price-desc') return (b.price ?? 0) - (a.price ?? 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const categories = ['all', 'speakers', 'headphones', 'televisions', 'soundbars'] as const;
  const brands = ['all', 'bang-olufsen', 'devialet', 'loewe'] as const;

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 100 }}>
        {/* Page Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Premium Audio & TV</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Shop All Products
          </h1>
          <p style={{ marginTop: 15, fontSize: '1rem', color: '#666', maxWidth: 600 }}>
            Explore our curated selection of premium audio and television products from the world&apos;s finest brands.
          </p>
        </div>

        {/* Brand Filter Pills */}
        <div style={{ gridColumn: 'span 12', display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              style={{
                padding: '12px 24px',
                background: selectedBrand === brand ? 'var(--accent-orange)' : 'transparent',
                border: selectedBrand === brand ? 'none' : '1px solid #ddd',
                color: selectedBrand === brand ? 'white' : '#333',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                cursor: 'pointer',
                borderRadius: 4,
              }}
            >
              {brand === 'all' ? 'All Brands' : brandInfo[brand].name}
            </button>
          ))}
        </div>

        {/* Category & Sort Row */}
        <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, flexWrap: 'wrap', gap: 15 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === cat ? '#000' : 'transparent',
                  border: selectedCategory === cat ? 'none' : '1px solid #ddd',
                  color: selectedCategory === cat ? 'white' : '#666',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: 4,
                }}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={{
              padding: '10px 15px',
              border: '1px solid #ddd',
              background: 'white',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        {/* Results Count */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20 }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="card light"
            style={{
              gridColumn: 'span 4',
              padding: 0,
              textDecoration: 'none',
              color: 'inherit',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Image */}
            <div style={{
              height: 280,
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Brand Badge */}
              <div style={{
                position: 'absolute',
                top: 15,
                left: 15,
                padding: '4px 10px',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {brandInfo[product.brand].name}
              </div>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
              />
            </div>

            {/* Info */}
            <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="label" style={{ marginBottom: 5, color: '#888' }}>
                {product.subtitle}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 10, textTransform: 'uppercase' }}>
                {product.name}
              </h3>
              
              {/* Colors */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 15 }}>
                {product.colors.slice(0, 4).map((color, i) => (
                  <ColorDot key={i} color={color} />
                ))}
              </div>

              {/* Price */}
              <div style={{ marginTop: 'auto', fontWeight: 800, fontSize: '1.1rem' }}>
                {product.price && !product.contactOnly ? (
                  `$${product.price.toLocaleString()}`
                ) : (
                  <span style={{ color: 'var(--accent-orange)' }}>Contact Us</span>
                )}
              </div>
            </div>
          </Link>
        ))}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div style={{ gridColumn: 'span 12', textAlign: 'center', padding: 60 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 10 }}>No products found</h3>
            <p style={{ color: '#666' }}>Try adjusting your filters</p>
          </div>
        )}
      </main>
    </>
  );
}
