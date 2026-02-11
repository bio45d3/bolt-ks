'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const speakers = [
  {
    id: 'beolab-90',
    name: 'Beolab 90',
    subtitle: 'Flagship',
    price: '$80,000',
    image: 'https://pngimg.com/uploads/loudspeaker/loudspeaker_PNG101569.png',
    description: 'The pinnacle of acoustic engineering',
    colors: ['#C0C0C0', '#000000'],
    featured: true,
    letter: '90',
  },
  {
    id: 'beosound-a9',
    name: 'Beosound A9',
    subtitle: 'Iconic Design',
    price: '$4,550',
    image: 'https://pngimg.com/d/wireless_speaker_PNG18.png',
    description: 'Modern meets classic. A design speaker icon.',
    colors: ['#1E3A5F', '#C6A665', '#2F2F2F'],
    letter: 'A9',
  },
  {
    id: 'beosound-2',
    name: 'Beosound 2',
    subtitle: '360° Sound',
    price: '$4,000',
    image: 'https://pngimg.com/d/wireless_speaker_PNG18.png',
    description: 'Captivating beauty. Astonishing power.',
    colors: ['#C6A665', '#2F2F2F', '#C0C0C0'],
    letter: '2',
  },
  {
    id: 'beosound-balance',
    name: 'Beosound Balance',
    subtitle: 'Living Room',
    price: '$3,650',
    image: 'https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG36.png',
    description: 'Intelligent 360° sound. Fill any room.',
    colors: ['#8B7355', '#2F2F2F'],
    letter: 'BL',
  },
  {
    id: 'beolab-28',
    name: 'Beolab 28',
    subtitle: 'Hi-Fidelity',
    price: '$22,050',
    image: 'https://pngimg.com/uploads/loudspeaker/loudspeaker_PNG101569.png',
    description: 'Wall mounted or floor-standing. Redefined.',
    colors: ['#C0C0C0', '#2F2F2F', '#D4B896'],
    letter: '28',
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

export default function SpeakersPage() {
  const featuredSpeaker = speakers.find(s => s.featured);
  const otherSpeakers = speakers.filter(s => !s.featured);

  return (
    <>
      <Navigation activeLink="speakers" />

      <main>
        {/* Featured Speaker - Hero Card */}
        {featuredSpeaker && (
          <Link href={`/product/${featuredSpeaker.id}`} className="card dark hero-span" style={{ height: '75vh', textDecoration: 'none', color: 'inherit' }}>
            <div className="giant-letter" style={{ fontSize: 'clamp(15rem, 30vw, 35rem)' }}>{featuredSpeaker.letter}</div>
            <div className="hero-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredSpeaker.image}
                alt={featuredSpeaker.name}
                className="hero-img"
              />
            </div>
            <div className="hero-content" style={{ gridColumn: 1 }}>
              <div className="label text-orange">Flagship Innovation</div>
              <h1 className="overlay-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                THE SHAPE<br />
                OF SOUND<br />
                <span className="text-orange">REDEFINED</span>
              </h1>
            </div>
            <div className="hero-content" style={{ gridColumn: 2, alignItems: 'flex-end', textAlign: 'right' }}>
              <div className="price-tag" style={{ position: 'relative', top: 'auto', right: 'auto' }}>
                <span className="label">MSRP</span><br />
                {featuredSpeaker.price}
              </div>
              <div className="desc-block" style={{ marginTop: 20 }}>
                {featuredSpeaker.description}. Active Room Compensation meets visionary design.
              </div>
            </div>
          </Link>
        )}

        {/* Section Header */}
        <div style={{ gridColumn: 'span 12', marginTop: 20, marginBottom: 10 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Collection</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Speakers
          </h2>
          <p style={{ marginTop: 15, fontSize: '1rem', color: '#666', maxWidth: 600 }}>
            From iconic wireless speakers to our flagship Beolab series, discover sound perfection.
          </p>
        </div>

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
              <div className="price-tag" style={{ color: isDark ? 'var(--accent-orange)' : 'inherit', fontFamily: 'monospace', fontWeight: 600 }}>
                {speaker.price}
              </div>
              
              {!isDark && (
                <div 
                  className={`orange-shape shape-${shape}`} 
                  style={shape === 'circle' ? { backgroundColor: 'white' } : undefined}
                />
              )}
              
              {isDark && (
                <div style={{ position: 'absolute', top: 80, left: -10, fontSize: '10rem', fontWeight: 900, opacity: 0.1, pointerEvents: 'none' }}>
                  {speaker.letter}
                </div>
              )}
              
              <div className="vertical-text">{speaker.subtitle}</div>
              
              <h2 className="overlay-text" style={{ marginTop: 40, color: isDark ? 'white' : 'black', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                {speaker.name.split(' ')[0]}<br />
                <span className="text-orange">{speaker.name.split(' ').slice(1).join(' ')}</span>
              </h2>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={speaker.image}
                alt={speaker.name}
                className="product-img"
                style={{ width: '70%' }}
              />
              
              <div style={{ zIndex: 3, marginTop: 'auto' }}>
                <div className="desc-block" style={{ color: isDark ? '#888' : '#666' }}>
                  {speaker.description}
                </div>
                
                <div className="pill-container" style={{ marginTop: 15 }}>
                  {speaker.colors.slice(0, 3).map((color, i) => (
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
