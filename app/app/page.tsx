'use client';

import Link from 'next/link';

function ArrowGraphic({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg className="arrow-graphic" viewBox="0 0 20 60" style={style}>
      <line x1="10" y1="0" x2="10" y2="55" />
      <line x1="10" y1="55" x2="2" y2="45" />
      <line x1="10" y1="55" x2="18" y2="45" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <nav>
        <div className="logo">BANG & OLUFSEN</div>
        <div className="nav-links">
          <Link href="/speakers">Speakers</Link>
          <Link href="/headphones">Headphones</Link>
          <Link href="/televisions">Televisions</Link>
          <Link href="/support">Support</Link>
        </div>
      </nav>

      <main>
        {/* Hero - Beolab 90 */}
        <div className="card dark hero-span">
          <div className="giant-letter">90</div>
          <div className="hero-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://pngimg.com/uploads/loudspeaker/loudspeaker_PNG101569.png"
              alt="Beolab 90"
              className="hero-img"
            />
          </div>
          <div className="hero-content" style={{ gridColumn: 1 }}>
            <div className="label text-orange">Flagship Innovation</div>
            <h1 className="overlay-text">
              THE SHAPE<br />
              OF SOUND<br />
              <span className="text-orange">REDEFINED</span>
            </h1>
          </div>
          <div className="hero-content" style={{ gridColumn: 2, alignItems: 'flex-end', textAlign: 'right' }}>
            <div className="price-tag">
              <span className="label">MSRP</span><br />
              $80,000.00
            </div>
            <div className="desc-block">
              In the years following its inception, the Beolab 90 has stood as the pinnacle of acoustic engineering. Active Room Compensation meets visionary design.
            </div>
          </div>
        </div>

        {/* Beoplay A9 */}
        <div className="card light product-span">
          <div className="price-tag">$2,999.00</div>
          <div className="orange-shape shape-rect" />
          <div className="vertical-text">Active Noise Cancellation</div>
          <h2 className="overlay-text" style={{ marginTop: 40 }}>
            BEOPLAY<br />
            <span className="text-orange">A9</span><br />
            ORIGINAL
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://pngimg.com/d/wireless_speaker_PNG18.png"
            alt="Beoplay A9"
            className="product-img"
          />
          <div className="pill-container">
            <div className="pill">
              COVER
              <div className="color-dot" style={{ background: '#ddd' }} />
            </div>
            <div className="pill">
              LEGS
              <div className="color-dot" style={{ background: '#8B4513' }} />
            </div>
          </div>
          <ArrowGraphic />
        </div>

        {/* Beoplay H95 */}
        <div className="card dark product-span">
          <div className="price-tag text-orange">$899.00</div>
          <div style={{ position: 'absolute', top: 100, left: -20, fontSize: '10rem', opacity: 0.1, fontWeight: 900 }}>
            H95
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://pngimg.com/uploads/headphones/headphones_PNG7645.png"
            alt="Beoplay H95"
            className="product-img"
            style={{ width: '70%' }}
          />
          <div style={{ zIndex: 3, padding: 30, marginTop: 'auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: 10 }}>BEOPLAY H95</h2>
            <div className="desc-block" style={{ color: '#888' }}>
              Ultimate over-ear headphones. Moving titanium drivers and lambskin memory foam.
            </div>
            <div className="pill-container" style={{ marginTop: 20 }}>
              <div className="pill filled">ADD TO CART</div>
            </div>
          </div>
        </div>

        {/* Beolit 20 */}
        <div className="card light product-span" style={{ backgroundColor: '#D4D4D4' }}>
          <div className="price-tag">$549.00</div>
          <div className="orange-shape shape-circle" style={{ backgroundColor: 'white' }} />
          <div style={{ zIndex: 3, padding: 30, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 className="overlay-text" style={{ color: 'black', fontSize: '2.5rem' }}>
              PORTABLE<br />POWER
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG36.png"
              alt="Beolit 20"
              className="product-img"
              style={{ width: '55%', top: '60%' }}
            />
            <div style={{ marginTop: 'auto' }}>
              <div className="label" style={{ marginBottom: 5 }}>BEOLIT 20</div>
              <div className="desc-block">
                Big sound for every moment. Long-lasting battery, integrated wireless Qi charging.
              </div>
              <ArrowGraphic style={{ right: 'auto', left: 30, bottom: 10, height: 40, stroke: 'black' }} />
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 60, flexDirection: 'row', alignItems: 'center', borderRadius: 'var(--radius)' }}>
          <div style={{ flex: 1 }}>
            <div className="label text-orange">NEWSLETTER</div>
            <h2 style={{ fontSize: '4vw', marginTop: 20 }}>JOIN THE<br />AUDIOPHILE CLUB</h2>
          </div>
          <div style={{ flex: 1, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'flex-end' }}>
            <input
              type="email"
              placeholder="ENTER EMAIL"
              style={{
                background: 'transparent',
                border: '1px solid #333',
                padding: 20,
                color: 'white',
                width: 300,
                fontFamily: 'monospace',
                textTransform: 'uppercase'
              }}
            />
            <button style={{
              background: 'var(--accent-orange)',
              border: 'none',
              padding: '20px 40px',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
