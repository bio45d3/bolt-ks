'use client';

import Link from 'next/link';

const headphones = [
  {
    id: 'beoplay-h95',
    name: 'Beoplay H95',
    subtitle: 'Premium ANC',
    price: '$899.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
    description: 'Ultimate over-ear with titanium drivers',
    colors: ['#000000', '#C6A665', '#808080'],
    featured: true,
  },
  {
    id: 'beoplay-hx',
    name: 'Beoplay HX',
    subtitle: 'Everyday Luxury',
    price: '$499.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7647.png',
    description: 'Premium comfort for all-day listening',
    colors: ['#000000', '#556B2F', '#8B4513'],
  },
  {
    id: 'beoplay-portal',
    name: 'Beoplay Portal',
    subtitle: 'Gaming',
    price: '$499.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7627.png',
    description: 'Designed for Xbox and PC gaming',
    colors: ['#000000', '#808080'],
  },
  {
    id: 'beoplay-h4',
    name: 'Beoplay H4',
    subtitle: '3rd Gen',
    price: '$299.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7625.png',
    description: 'Wireless freedom with premium sound',
    colors: ['#2F2F2F', '#D2B48C'],
  },
  {
    id: 'beoplay-ex',
    name: 'Beoplay EX',
    subtitle: 'Earbuds',
    price: '$399.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG101008.png',
    description: 'True wireless with adaptive ANC',
    colors: ['#000000', '#C0C0C0', '#C6A665'],
  },
  {
    id: 'beoplay-eq',
    name: 'Beoplay EQ',
    subtitle: 'Premium Earbuds',
    price: '$499.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG101927.png',
    description: 'Reference-grade true wireless',
    colors: ['#000000', '#2F2F2F'],
  },
];

function ColorDot({ color }: { color: string }) {
  return <div className="color-dot" style={{ background: color }} />;
}

function ArrowGraphic({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg className="arrow-graphic" viewBox="0 0 20 60" style={style}>
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
      <nav>
        <Link href="/" className="logo">BANG & OLUFSEN</Link>
        <div className="nav-links">
          <Link href="/speakers">Speakers</Link>
          <Link href="/headphones" style={{ color: 'var(--accent-orange)' }}>Headphones</Link>
          <Link href="/televisions">Televisions</Link>
          <Link href="/support">Support</Link>
        </div>
      </nav>

      <main>
        {/* Page Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Collection</div>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Headphones
          </h1>
          <p style={{ marginTop: 15, fontSize: '1rem', color: '#666', maxWidth: 600 }}>
            Immerse yourself in pure sound. From premium over-ear headphones to true wireless earbuds, experience audio perfection.
          </p>
        </div>

        {/* Featured - Hero Card */}
        {featuredProduct && (
          <Link href={`/product/${featuredProduct.id}`} className="card dark hero-span" style={{ height: '60vh', textDecoration: 'none', color: 'inherit' }}>
            <div className="giant-letter" style={{ fontSize: '20rem', opacity: 0.15 }}>H95</div>
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
              <div className="label text-orange">Featured</div>
              <h2 className="overlay-text">
                {featuredProduct.name.split(' ')[0]}<br />
                <span className="text-orange">{featuredProduct.name.split(' ')[1]}</span>
              </h2>
            </div>
            <div className="hero-content" style={{ gridColumn: 2, alignItems: 'flex-end', textAlign: 'right' }}>
              <div className="price-tag">
                <span className="label">From</span><br />
                {featuredProduct.price}
              </div>
              <div className="desc-block">
                {featuredProduct.description}
              </div>
            </div>
          </Link>
        )}

        {/* Product Grid */}
        {otherProducts.map((product, index) => {
          const isDark = index % 3 === 0;
          const bgColor = index % 3 === 2 ? '#D4D4D4' : undefined;
          const shape = index % 2 === 0 ? 'circle' : 'rect';
          
          return (
            <Link 
              href={`/product/${product.id}`} 
              key={product.id} 
              className={`card ${isDark ? 'dark' : 'light'} product-span`}
              style={{ backgroundColor: bgColor, textDecoration: 'none', color: 'inherit' }}
            >
              <div className="price-tag" style={{ color: isDark ? 'var(--accent-orange)' : 'inherit' }}>
                {product.price}
              </div>
              
              {!isDark && (
                <div 
                  className={`orange-shape shape-${shape}`} 
                  style={shape === 'circle' ? { backgroundColor: 'white' } : undefined}
                />
              )}
              
              <h2 className="overlay-text" style={{ marginTop: 40, color: isDark ? 'white' : 'black', fontSize: '2rem' }}>
                {product.name.split(' ')[0]}<br />
                <span className="text-orange">{product.name.split(' ')[1]}</span>
              </h2>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
                style={{ width: '65%' }}
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
                </div>
              </div>
              
              <ArrowGraphic style={{ stroke: isDark ? 'var(--accent-orange)' : 'black' }} />
            </Link>
          );
        })}
      </main>
    </>
  );
}
