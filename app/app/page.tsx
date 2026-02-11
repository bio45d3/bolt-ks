'use client';

import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

const brands = [
  {
    id: 'bang-olufsen',
    name: 'Bang & Olufsen',
    country: 'Denmark',
    tagline: 'Exceptional sound. Timeless design.',
    description: 'Since 1925, crafting audio experiences that define generations.',
    color: '#000000',
    featured: {
      name: 'Beosound A9',
      price: '$4,550',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=60',
    },
  },
  {
    id: 'devialet',
    name: 'Devialet',
    country: 'France',
    tagline: 'Engineering emotion.',
    description: 'Parisian innovation pushing the boundaries of acoustic engineering.',
    color: '#000000',
    featured: {
      name: 'Phantom I',
      price: '$3,200',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60',
    },
  },
  {
    id: 'loewe',
    name: 'Loewe',
    country: 'Germany',
    tagline: 'German engineering. Iconic design.',
    description: 'Premium televisions and audio since 1923.',
    color: '#000000',
    featured: {
      name: 'Stellar TV',
      price: 'Contact Us',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60',
    },
  },
];

const featuredProducts = [
  { id: 'beosound-2', name: 'Beosound 2', brand: 'Bang & Olufsen', price: '$4,000', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', category: 'Speakers' },
  { id: 'phantom-ii', name: 'Phantom II', brand: 'Devialet', price: '$1,400', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600', category: 'Speakers' },
  { id: 'beoplay-h95', name: 'Beoplay H95', brand: 'Bang & Olufsen', price: '$1,250', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', category: 'Headphones' },
  { id: 'dione', name: 'Dione', brand: 'Devialet', price: '$2,490', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600', category: 'Soundbars' },
];

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        {/* Hero Section */}
        <div className="card dark hero-span" style={{ minHeight: '80vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)' }} />
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '60px' }}>
            <div className="label text-orange" style={{ marginBottom: 20 }}>Authorized Retailer in Kosovo</div>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 30 }}>
              Premium<br />
              Audio &<br />
              <span className="text-orange">Television</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#888', maxWidth: 500, marginBottom: 40, lineHeight: 1.6 }}>
              Experience world-class sound and vision from Bang & Olufsen, Devialet, and Loewe. 
              Curated for discerning audiophiles in Kosovo.
            </p>
            <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
              <Link
                href="/shop"
                style={{
                  padding: '20px 40px',
                  background: 'var(--accent-orange)',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                }}
              >
                Shop Now
              </Link>
              <Link
                href="/support"
                style={{
                  padding: '20px 40px',
                  background: 'transparent',
                  border: '1px solid #444',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                }}
              >
                Visit Showroom
              </Link>
            </div>
          </div>
          {/* Decorative element */}
          <div style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', width: '50%', height: '120%', background: 'var(--accent-orange)', opacity: 0.1, borderRadius: '50%', filter: 'blur(100px)' }} />
        </div>

        {/* Brand Selector Section */}
        <div style={{ gridColumn: 'span 12', padding: '60px 0 30px' }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Our Brands</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            Three Legends. One Destination.
          </h2>
        </div>

        {/* Brand Cards */}
        {brands.map((brand, index) => (
          <Link
            key={brand.id}
            href={`/shop?brand=${brand.id}`}
            className={`card ${index === 1 ? 'dark' : 'light'}`}
            style={{
              gridColumn: 'span 4',
              minHeight: 450,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Brand Image */}
            <div style={{
              height: 220,
              background: index === 1 ? '#1a1a1a' : '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.featured.image}
                alt={brand.featured.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
            </div>

            {/* Brand Info */}
            <div style={{ padding: 25, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="label" style={{ marginBottom: 5, color: index === 1 ? '#666' : '#888' }}>
                {brand.country}
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: 10,
                color: index === 1 ? 'white' : 'black',
              }}>
                {brand.name}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: index === 1 ? '#888' : '#666',
                lineHeight: 1.5,
                marginBottom: 20,
              }}>
                {brand.tagline}
              </p>
              <div style={{
                marginTop: 'auto',
                color: 'var(--accent-orange)',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
              }}>
                Explore {brand.name} →
              </div>
            </div>
          </Link>
        ))}

        {/* Featured Products Section */}
        <div style={{ gridColumn: 'span 12', padding: '60px 0 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="label text-orange" style={{ marginBottom: 10 }}>Featured</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                Popular Products
              </h2>
            </div>
            <Link
              href="/shop"
              style={{
                color: 'var(--accent-orange)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
              }}
            >
              View All Products →
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="card light"
            style={{
              gridColumn: 'span 3',
              padding: 0,
              textDecoration: 'none',
              color: 'inherit',
              overflow: 'hidden',
            }}
          >
            <div style={{
              height: 200,
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: 20 }}>
              <div className="label" style={{ marginBottom: 5, color: '#888', fontSize: '0.7rem' }}>
                {product.brand} • {product.category}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8, textTransform: 'uppercase' }}>
                {product.name}
              </h3>
              <div style={{ fontWeight: 800, color: product.price === 'Contact Us' ? 'var(--accent-orange)' : 'inherit' }}>
                {product.price}
              </div>
            </div>
          </Link>
        ))}

        {/* CTA Banner */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 'clamp(40px, 6vw, 80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 30, marginTop: 20 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className="label text-orange" style={{ marginBottom: 10 }}>Experience in Person</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}>
              Visit Our<br />Pristina Showroom
            </h2>
            <p style={{ marginTop: 15, color: '#888', maxWidth: 400 }}>
              See, hear, and feel the difference. Our experts will help you find the perfect audio solution.
            </p>
          </div>
          <Link
            href="/support"
            style={{
              padding: '20px 40px',
              background: 'var(--accent-orange)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
            }}
          >
            Get Directions
          </Link>
        </div>

        {/* Newsletter */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 'clamp(40px, 6vw, 60px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 30 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className="label text-orange">Newsletter</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: 10 }}>
              Stay Updated
            </h2>
            <p style={{ marginTop: 10, color: '#666' }}>
              New arrivals, exclusive offers, and audio insights.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Your email"
              style={{
                padding: '18px 20px',
                border: '1px solid #ddd',
                width: 280,
                fontSize: '1rem',
              }}
            />
            <button style={{
              background: 'var(--accent-orange)',
              border: 'none',
              padding: '18px 35px',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: 'white',
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
