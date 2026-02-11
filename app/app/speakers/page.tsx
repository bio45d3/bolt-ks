'use client';
import { Navigation } from '@/components/Navigation';

import Link from 'next/link';

const speakers = [
  {
    id: 'beolab-90',
    name: 'Beolab 90',
    subtitle: 'Flagship',
    price: '$80,000.00',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&auto=format&fit=crop&q=60',
    description: 'The pinnacle of acoustic engineering',
    colors: ['#C0C0C0', '#000000'],
    featured: true,
  },
  {
    id: 'beosound-a9',
    name: 'Beosound A9',
    subtitle: 'Iconic Design',
    price: '$4,550.00',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=60',
    description: 'Modern meets classic. A design speaker icon.',
    colors: ['#1E3A5F', '#C6A665', '#2F2F2F'],
  },
  {
    id: 'beosound-2',
    name: 'Beosound 2',
    subtitle: '360° Sound',
    price: '$4,000.00',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60',
    description: 'Captivating beauty. Astonishing power.',
    colors: ['#C6A665', '#2F2F2F', '#C0C0C0'],
  },
  {
    id: 'beosound-balance',
    name: 'Beosound Balance',
    subtitle: 'Living Room',
    price: '$3,650.00',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60',
    description: 'Intelligent 360° sound. Fill any room.',
    colors: ['#8B7355', '#2F2F2F'],
  },
  {
    id: 'beolab-28',
    name: 'Beolab 28',
    subtitle: 'Hi-Fidelity',
    price: '$22,050.00',
    image: 'https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?w=800&auto=format&fit=crop&q=60',
    description: 'Wall mounted or floor-standing. Redefined.',
    colors: ['#C0C0C0', '#2F2F2F', '#D4B896'],
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

export default function SpeakersPage() {
  const featuredSpeaker = speakers.find(s => s.featured);
  const otherSpeakers = speakers.filter(s => !s.featured);

  return (
    <>
      <Navigation activeLink="shop" />

      <main>
        {/* Page Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Collection</div>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Speakers
          </h1>
          <p style={{ marginTop: 15, fontSize: '1rem', color: '#666', maxWidth: 600 }}>
            From iconic wireless speakers to our flagship Beolab series, discover sound perfection crafted for those who demand the extraordinary.
          </p>
        </div>

        {/* Featured Speaker - Hero Card */}
        {featuredSpeaker && (
          <Link href={`/product/${featuredSpeaker.id}`} className="card dark hero-span" style={{ height: '60vh', textDecoration: 'none', color: 'inherit' }}>
            <div className="giant-letter" style={{ fontSize: '25rem' }}>90</div>
            <div className="hero-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredSpeaker.image}
                alt={featuredSpeaker.name}
                className="hero-img"
              />
            </div>
            <div className="hero-content" style={{ gridColumn: 1 }}>
              <div className="label text-orange">Featured</div>
              <h2 className="overlay-text">
                {featuredSpeaker.name.split(' ')[0]}<br />
                <span className="text-orange">{featuredSpeaker.name.split(' ')[1]}</span>
              </h2>
            </div>
            <div className="hero-content" style={{ gridColumn: 2, alignItems: 'flex-end', textAlign: 'right' }}>
              <div className="price-tag">
                <span className="label">From</span><br />
                {featuredSpeaker.price}
              </div>
              <div className="desc-block">
                {featuredSpeaker.description}
              </div>
            </div>
          </Link>
        )}

        {/* Product Grid */}
        {otherSpeakers.map((speaker, index) => {
          const isDark = index % 3 === 1;
          const bgColor = index % 3 === 2 ? '#D4D4D4' : undefined;
          const shape = index % 2 === 0 ? 'rect' : 'circle';
          
          return (
            <Link 
              href={`/product/${speaker.id}`} 
              key={speaker.id} 
              className={`card ${isDark ? 'dark' : 'light'} product-span`}
              style={{ backgroundColor: bgColor, textDecoration: 'none', color: 'inherit' }}
            >
              <div className="price-tag" style={{ color: isDark ? 'var(--accent-orange)' : 'inherit' }}>
                {speaker.price}
              </div>
              
              {!isDark && (
                <div 
                  className={`orange-shape shape-${shape}`} 
                  style={shape === 'circle' ? { backgroundColor: 'white' } : undefined}
                />
              )}
              
              <h2 className="overlay-text" style={{ marginTop: 40, color: isDark ? 'white' : 'black' }}>
                {speaker.name.split(' ')[0]}<br />
                <span className="text-orange">{speaker.name.split(' ')[1] || speaker.subtitle}</span>
              </h2>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={speaker.image}
                alt={speaker.name}
                className="product-img"
                style={{ width: '70%' }}
              />
              
              <div style={{ zIndex: 3, marginTop: 'auto' }}>
                <div className="label" style={{ marginBottom: 5, color: isDark ? '#888' : 'inherit' }}>
                  {speaker.subtitle}
                </div>
                <div className="desc-block" style={{ color: isDark ? '#888' : '#666' }}>
                  {speaker.description}
                </div>
                
                <div className="pill-container" style={{ marginTop: 15 }}>
                  {speaker.colors.slice(0, 3).map((color, i) => (
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
