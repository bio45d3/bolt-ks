'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const televisions = [
  {
    id: 'beovision-harmony',
    name: 'Beovision Harmony',
    subtitle: 'OLED Art',
    price: '$18,590',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39225.png',
    description: 'OLED TV with motorized oak & aluminium stand',
    colors: ['#8B4513', '#C0C0C0'],
    featured: true,
    size: '77"',
  },
  {
    id: 'beovision-contour',
    name: 'Beovision Contour',
    subtitle: 'All-in-One',
    price: '$7,990',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39225.png',
    description: 'OLED TV with integrated soundbar',
    colors: ['#C0C0C0', '#000000'],
    size: '55"',
  },
  {
    id: 'beovision-theatre',
    name: 'Beovision Theatre',
    subtitle: 'Cinema',
    price: '$24,990',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39225.png',
    description: 'OLED with Dolby Atmos soundbar',
    colors: ['#2F2F2F', '#C0C0C0'],
    size: '83"',
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

export default function TelevisionsPage() {
  const featuredTV = televisions.find(t => t.featured);
  const otherTVs = televisions.filter(t => !t.featured);

  return (
    <>
      <Navigation activeLink="televisions" />

      <main>
        {/* Featured TV - Hero Card */}
        {featuredTV && (
          <Link href={`/product/${featuredTV.id}`} className="card dark hero-span" style={{ height: '75vh', textDecoration: 'none', color: 'inherit' }}>
            <div className="giant-letter" style={{ fontSize: 'clamp(12rem, 25vw, 30rem)', opacity: 0.2 }}>{featuredTV.size}</div>
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
              <div className="label text-orange">Cinema at Home</div>
              <h1 className="overlay-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                PICTURE<br />
                PERFECT<br />
                <span className="text-orange">VISION</span>
              </h1>
            </div>
            <div className="hero-content" style={{ gridColumn: 2, alignItems: 'flex-end', textAlign: 'right' }}>
              <div className="price-tag" style={{ position: 'relative', top: 'auto', right: 'auto' }}>
                <span className="label">From</span><br />
                {featuredTV.price}
              </div>
              <div className="desc-block" style={{ marginTop: 20 }}>
                {featuredTV.description}. Stunning OLED display with legendary Bang & Olufsen sound.
              </div>
            </div>
          </Link>
        )}

        {/* Section Header */}
        <div style={{ gridColumn: 'span 12', marginTop: 20, marginBottom: 10 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Collection</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Televisions
          </h2>
          <p style={{ marginTop: 15, fontSize: '1rem', color: '#666', maxWidth: 600 }}>
            Experience cinema at home. Stunning OLED displays paired with legendary sound.
          </p>
        </div>

        {/* Product Grid */}
        {otherTVs.map((tv, index) => {
          const isDark = index % 2 === 0;
          
          return (
            <Link 
              href={`/product/${tv.id}`} 
              key={tv.id} 
              className={`card ${isDark ? 'dark' : 'light'}`}
              style={{ 
                gridColumn: 'span 6', 
                height: 550,
                padding: 30,
                textDecoration: 'none', 
                color: 'inherit',
                backgroundColor: !isDark ? '#D4D4D4' : undefined,
              }}
            >
              <div className="price-tag" style={{ color: isDark ? 'var(--accent-orange)' : 'inherit', fontFamily: 'monospace', fontWeight: 600 }}>
                {tv.price}
              </div>
              
              <div style={{ position: 'absolute', top: 60, right: 30, fontSize: 'clamp(5rem, 10vw, 8rem)', fontWeight: 900, opacity: 0.1, pointerEvents: 'none' }}>
                {tv.size}
              </div>
              
              <h2 className="overlay-text" style={{ marginTop: 40, color: isDark ? 'white' : 'black', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                {tv.name.split(' ')[0]}<br />
                <span className="text-orange">{tv.name.split(' ').slice(1).join(' ')}</span>
              </h2>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tv.image}
                alt={tv.name}
                className="product-img"
                style={{ width: '80%' }}
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
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%)', fontSize: '15rem', fontWeight: 900, opacity: 0.1, pointerEvents: 'none' }}>
            4K
          </div>
          <div style={{ flex: 1, zIndex: 2 }}>
            <div className="label text-orange">Experience</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginTop: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Visit Our<br />Showroom
            </h2>
            <p style={{ marginTop: 15, color: '#888', maxWidth: 400 }}>
              See the picture quality and hear the sound for yourself.
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
        <div className="card light" style={{ gridColumn: 'span 12', padding: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, position: 'relative', overflow: 'hidden' }}>
          <div className="orange-shape shape-rect" style={{ width: '30%', height: '120%', left: 'auto', right: '-5%', transform: 'rotate(10deg)' }} />
          <div style={{ flex: 1, zIndex: 2 }}>
            <div className="label text-orange">Newsletter</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginTop: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Join The<br />Audiophile Club
            </h2>
          </div>
          <div style={{ flex: 1, display: 'flex', gap: 15, justifyContent: 'flex-end', flexWrap: 'wrap', zIndex: 2 }}>
            <input
              type="email"
              placeholder="ENTER EMAIL"
              style={{
                background: 'white',
                border: '1px solid #000',
                padding: '18px 20px',
                color: 'black',
                width: 280,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
              }}
            />
            <button style={{
              background: 'black',
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
