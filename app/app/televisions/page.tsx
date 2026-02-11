'use client';
import { Navigation } from '@/components/Navigation';

import Link from 'next/link';

const televisions = [
  {
    id: 'beovision-harmony',
    name: 'Beovision Harmony',
    subtitle: 'OLED Art',
    price: '$18,590.00',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60',
    description: 'OLED TV with motorized oak & aluminium stand',
    colors: ['#8B4513', '#C0C0C0'],
    featured: true,
    size: '77"',
  },
  {
    id: 'beovision-contour',
    name: 'Beovision Contour',
    subtitle: 'All-in-One',
    price: '$7,990.00',
    image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=60',
    description: 'OLED TV with integrated soundbar',
    colors: ['#C0C0C0', '#000000'],
    size: '55"',
  },
  {
    id: 'beovision-theatre',
    name: 'Beovision Theatre',
    subtitle: 'Cinema',
    price: '$24,990.00',
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&auto=format&fit=crop&q=60',
    description: 'OLED with Dolby Atmos soundbar',
    colors: ['#2F2F2F', '#C0C0C0'],
    size: '83"',
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

export default function TelevisionsPage() {
  const featuredTV = televisions.find(t => t.featured);
  const otherTVs = televisions.filter(t => !t.featured);

  return (
    <>
      <Navigation activeLink="televisions" />

      <main>
        {/* Page Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Collection</div>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Televisions
          </h1>
          <p style={{ marginTop: 15, fontSize: '1rem', color: '#666', maxWidth: 600 }}>
            Experience cinema at home with our Beovision collection. Stunning OLED displays paired with legendary Bang & Olufsen sound.
          </p>
        </div>

        {/* Featured TV - Hero Card */}
        {featuredTV && (
          <Link href={`/product/${featuredTV.id}`} className="card dark hero-span" style={{ height: '60vh', textDecoration: 'none', color: 'inherit' }}>
            <div className="giant-letter" style={{ fontSize: '15rem', opacity: 0.15 }}>{featuredTV.size}</div>
            <div className="hero-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredTV.image}
                alt={featuredTV.name}
                className="hero-img"
                style={{ maxWidth: '70%' }}
              />
            </div>
            <div className="hero-content" style={{ gridColumn: 1 }}>
              <div className="label text-orange">Featured</div>
              <h2 className="overlay-text">
                {featuredTV.name.split(' ')[0]}<br />
                <span className="text-orange">{featuredTV.name.split(' ')[1]}</span>
              </h2>
            </div>
            <div className="hero-content" style={{ gridColumn: 2, alignItems: 'flex-end', textAlign: 'right' }}>
              <div className="price-tag">
                <span className="label">From</span><br />
                {featuredTV.price}
              </div>
              <div className="desc-block">
                {featuredTV.description}
              </div>
            </div>
          </Link>
        )}

        {/* Product Grid */}
        {otherTVs.map((tv, index) => {
          const isDark = index % 2 === 0;
          
          return (
            <Link 
              href={`/product/${tv.id}`} 
              key={tv.id} 
              className={`card ${isDark ? 'dark' : 'light'} product-span`}
              style={{ gridColumn: 'span 6', textDecoration: 'none', color: 'inherit' }}
            >
              <div className="price-tag" style={{ color: isDark ? 'var(--accent-orange)' : 'inherit' }}>
                {tv.price}
              </div>
              
              <div style={{ position: 'absolute', top: 80, right: 30, fontSize: '6rem', fontWeight: 900, opacity: 0.1 }}>
                {tv.size}
              </div>
              
              <h2 className="overlay-text" style={{ marginTop: 40, color: isDark ? 'white' : 'black', fontSize: '2rem' }}>
                {tv.name.split(' ')[0]}<br />
                <span className="text-orange">{tv.name.split(' ')[1]}</span>
              </h2>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tv.image}
                alt={tv.name}
                className="product-img"
                style={{ width: '85%' }}
              />
              
              <div style={{ zIndex: 3, marginTop: 'auto' }}>
                <div className="label" style={{ marginBottom: 5, color: isDark ? '#888' : 'inherit' }}>
                  {tv.subtitle} • {tv.size}
                </div>
                <div className="desc-block" style={{ color: isDark ? '#888' : '#666' }}>
                  {tv.description}
                </div>
                
                <div className="pill-container" style={{ marginTop: 15 }}>
                  {tv.colors.map((color, i) => (
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

        {/* CTA Banner */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 60, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div className="label text-orange">Experience</div>
            <h2 style={{ fontSize: '3vw', marginTop: 20, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Visit Our<br />Showroom
            </h2>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <p style={{ color: '#888', marginBottom: 20, maxWidth: 400, marginLeft: 'auto' }}>
              Experience our televisions in person at our Pristina showroom. See the picture quality and hear the sound for yourself.
            </p>
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
      </main>
    </>
  );
}
