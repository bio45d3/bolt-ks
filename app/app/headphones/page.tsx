'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const headphones = [
  {
    id: 'beoplay-h95',
    name: 'Beoplay H95',
    subtitle: 'Premium ANC',
    price: '$1,250',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
    description: 'Immersive noise-cancelling. Hear every detail.',
    colors: ['#000000', '#C6A665', '#808080', '#E8E4DE'],
    featured: true,
    letter: 'H95',
  },
  {
    id: 'beoplay-hx',
    name: 'Beoplay HX',
    subtitle: 'All-Day Comfort',
    price: '$499',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
    description: 'All-day comfort. Premium sound. 35hr battery.',
    colors: ['#2F2F2F', '#C4B9A9', '#4A3728'],
    letter: 'HX',
  },
  {
    id: 'beoplay-portal',
    name: 'Beoplay Portal',
    subtitle: 'Gaming',
    price: '$599',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
    description: 'Immersive gaming. Superior sound.',
    colors: ['#2F2F2F', '#808080', '#1E3A5F'],
    letter: 'P',
  },
];

function ColorDot({ color }: { color: string }) {
  return <div className="color-dot" style={{ background: color }} />;
}

function ArrowGraphic({ dark = false }: { dark?: boolean }) {
  return (
    <svg className="arrow-graphic" viewBox="0 0 20 60" style={{ stroke: dark ? 'var(--accent-orange)' : 'black' }}>
      <line x1="10" y1="0" x2="10" y2="55" />
      <line x1="10" y1="55" x2="2" y2="45" />
      <line x1="10" y1="55" x2="18" y2="45" />
    </svg>
  );
}

export default function HeadphonesPage() {
  const featuredProduct = headphones.find(h => h.featured);
  const otherProducts = headphones.filter(h => !h.featured);

  return (
    <>
      <Navigation activeLink="headphones" />

      <main>
        {/* Featured - Hero Card */}
        {featuredProduct && (
          <Link href={`/product/${featuredProduct.id}`} className="card dark hero-span" style={{ height: '75vh', textDecoration: 'none', color: 'inherit' }}>
            <div className="giant-letter" style={{ fontSize: 'clamp(12rem, 25vw, 30rem)', opacity: 0.2 }}>{featuredProduct.letter}</div>
            <div className="hero-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="hero-img"
                style={{ maxWidth: '50%' }}
              />
            </div>
            <div className="hero-content" style={{ gridColumn: 1 }}>
              <div className="label text-orange">Premium Over-Ear</div>
              <h1 className="overlay-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                MOVING.<br />
                METICULOUS.<br />
                <span className="text-orange">MESMERISING.</span>
              </h1>
            </div>
            <div className="hero-content" style={{ gridColumn: 2, alignItems: 'flex-end', textAlign: 'right' }}>
              <div className="price-tag" style={{ position: 'relative', top: 'auto', right: 'auto' }}>
                <span className="label">From</span><br />
                {featuredProduct.price}
              </div>
              <div className="desc-block" style={{ marginTop: 20 }}>
                {featuredProduct.description} Premium lambskin memory foam. Titanium drivers.
              </div>
            </div>
          </Link>
        )}

        {/* Section Header */}
        <div style={{ gridColumn: 'span 12', marginTop: 20, marginBottom: 10 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Collection</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Headphones
          </h2>
          <p style={{ marginTop: 15, fontSize: '1rem', color: '#666', maxWidth: 600 }}>
            Immerse yourself in pure sound. From premium over-ear to gaming headsets.
          </p>
        </div>

        {/* Product Grid */}
        {otherProducts.map((product, index) => {
          const isDark = index % 2 === 0;
          const bgColor = !isDark ? '#D4D4D4' : undefined;
          const shape = index % 2 === 0 ? 'circle' : 'rect';
          
          return (
            <Link 
              href={`/product/${product.id}`} 
              key={product.id} 
              className={`card ${isDark ? 'dark' : 'light'}`}
              style={{ 
                gridColumn: 'span 6',
                height: 600,
                padding: 30,
                backgroundColor: bgColor, 
                textDecoration: 'none', 
                color: 'inherit' 
              }}
            >
              <div className="price-tag" style={{ color: isDark ? 'var(--accent-orange)' : 'inherit', fontFamily: 'monospace', fontWeight: 600 }}>
                {product.price}
              </div>
              
              {!isDark && (
                <div 
                  className={`orange-shape shape-${shape}`} 
                  style={shape === 'circle' ? { backgroundColor: 'white' } : undefined}
                />
              )}
              
              <div style={{ position: 'absolute', top: 80, left: isDark ? -10 : 20, fontSize: '10rem', fontWeight: 900, opacity: 0.1, pointerEvents: 'none' }}>
                {product.letter}
              </div>
              
              <h2 className="overlay-text" style={{ marginTop: 40, color: isDark ? 'white' : 'black', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                {product.name.split(' ')[0]}<br />
                <span className="text-orange">{product.name.split(' ').slice(1).join(' ')}</span>
              </h2>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
                style={{ width: '60%' }}
              />
              
              <div style={{ zIndex: 3, marginTop: 'auto' }}>
                <div className="label" style={{ marginBottom: 5, color: isDark ? '#888' : 'inherit' }}>
                  {product.subtitle}
                </div>
                <div className="desc-block" style={{ color: isDark ? '#888' : '#666' }}>
                  {product.description}
                </div>
                
                <div className="pill-container" style={{ marginTop: 15 }}>
                  {product.colors.slice(0, 3).map((color, i) => (
                    <div className="pill" key={i} style={{ padding: '6px 10px' }}>
                      <ColorDot color={color} />
                    </div>
                  ))}
                  <div className="pill filled" style={{ background: isDark ? 'white' : 'black', color: isDark ? 'black' : 'white', borderColor: isDark ? 'white' : 'black' }}>
                    View
                  </div>
                </div>
              </div>
              
              <ArrowGraphic dark={isDark} />
            </Link>
          );
        })}

        {/* CTA Banner */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, position: 'relative', overflow: 'hidden' }}>
          <div className="orange-shape shape-circle" style={{ width: '40%', paddingBottom: '40%', right: '-10%', left: 'auto', opacity: 0.5 }} />
          <div style={{ flex: 1, zIndex: 2 }}>
            <div className="label text-orange">Experience</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginTop: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Hear The<br />Difference
            </h2>
            <p style={{ marginTop: 15, color: '#666', maxWidth: 400 }}>
              Visit our showroom to experience premium audio in person.
            </p>
          </div>
          <div style={{ zIndex: 2 }}>
            <Link
              href="/support"
              style={{
                display: 'inline-block',
                padding: '20px 40px',
                background: 'var(--accent-orange)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              Find Location
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div className="label text-orange">Newsletter</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginTop: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Join The<br />Audiophile Club
            </h2>
          </div>
          <div style={{ flex: 1, display: 'flex', gap: 15, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="ENTER EMAIL"
              style={{
                background: 'transparent',
                border: '1px solid #333',
                padding: '18px 20px',
                color: 'white',
                width: 280,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
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
