'use client';
import { Navigation } from '@/components/Navigation';

import Link from 'next/link';

const speakers = [
  {
    id: 'beolab-90',
    name: 'Beolab 90',
    subtitle: 'Flagship',
    price: '$80,000.00',
    image: 'https://pngimg.com/uploads/loudspeaker/loudspeaker_PNG101569.png',
    description: 'The pinnacle of acoustic engineering',
    colors: ['#C0C0C0', '#000000'],
    featured: true,
  },
  {
    id: 'beoplay-a9',
    name: 'Beoplay A9',
    subtitle: 'Iconic',
    price: '$2,999.00',
    image: 'https://pngimg.com/d/wireless_speaker_PNG18.png',
    description: 'Iconic design meets powerful sound',
    colors: ['#FFFFFF', '#000000', '#8B4513'],
  },
  {
    id: 'beosound-2',
    name: 'Beosound 2',
    subtitle: '360° Sound',
    price: '$2,250.00',
    image: 'https://pngimg.com/uploads/speakers/speakers_PNG11115.png',
    description: '360-degree sound in a stunning design',
    colors: ['#C0C0C0', '#D4AF37'],
  },
  {
    id: 'beolit-20',
    name: 'Beolit 20',
    subtitle: 'Portable',
    price: '$549.00',
    image: 'https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG36.png',
    description: 'Powerful portable speaker with Qi charging',
    colors: ['#2F2F2F', '#A0A0A0'],
  },
  {
    id: 'beosound-a1',
    name: 'Beosound A1',
    subtitle: '2nd Gen',
    price: '$279.00',
    image: 'https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG11.png',
    description: 'Ultra-portable with 18hr battery life',
    colors: ['#000000', '#808080', '#556B2F'],
  },
  {
    id: 'beoplay-a1',
    name: 'Beoplay A1',
    subtitle: 'Compact',
    price: '$250.00',
    image: 'https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG36.png',
    description: 'Compact Bluetooth speaker',
    colors: ['#C0C0C0', '#2F4F4F'],
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
      <Navigation activeLink="speakers" />

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
