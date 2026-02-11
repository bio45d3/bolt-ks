'use client';

import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { useEffect } from 'react';

export default function Home() {
  // Mouse move effect for product images
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.card');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      cards.forEach(card => {
        const img = card.querySelector('.product-img, .hero-img') as HTMLElement;
        if (img) {
          const moveX = (x - 0.5) * 10;
          const moveY = (y - 0.5) * 10;
          img.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
        }
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Navigation />

      <main className="home-main">
        {/* Hero Card - Beolab 90 */}
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
          <div className="hero-content hero-content-right">
            <div className="price-tag">
              <span className="label">MSRP</span><br />
              $80,000.00
            </div>
            <div className="desc-block">
              In the years following its inception, the Beolab 90 has stood as the pinnacle of acoustic engineering. Active Room Compensation meets visionary design.
            </div>
          </div>
        </div>

        {/* Product Card 1 - Beosound A9 */}
        <Link href="/product/beosound-a9" className="card light product-span">
          <div className="price-tag">$4,550.00</div>
          <div className="orange-shape shape-rect"></div>
          <div className="vertical-text">Active Noise Cancellation</div>
          <h2 className="overlay-text" style={{ marginTop: 40 }}>
            BEOPLAY<br />
            <span className="text-orange">A9</span><br />
            ORIGINAL
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://pngimg.com/d/wireless_speaker_PNG18.png" 
            alt="Beosound A9" 
            className="product-img"
          />
          <div className="pill-container">
            <div className="pill">
              COVER
              <div className="color-dot" style={{ background: '#ddd' }}></div>
            </div>
            <div className="pill">
              LEGS
              <div className="color-dot" style={{ background: '#8B4513' }}></div>
            </div>
          </div>
          <svg className="arrow-graphic" viewBox="0 0 20 60">
            <line x1="10" y1="0" x2="10" y2="55"></line>
            <line x1="10" y1="55" x2="2" y2="45"></line>
            <line x1="10" y1="55" x2="18" y2="45"></line>
          </svg>
        </Link>

        {/* Product Card 2 - Beoplay H95 */}
        <Link href="/product/beoplay-h95" className="card dark product-span">
          <div className="price-tag text-orange">$1,250.00</div>
          <div className="ghost-text">H95</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://pngimg.com/uploads/headphones/headphones_PNG7645.png" 
            alt="Beoplay H95" 
            className="product-img"
            style={{ width: '70%' }}
          />
          <div className="product-info">
            <h2 style={{ fontSize: '2.5rem', marginBottom: 10 }}>BEOPLAY H95</h2>
            <div className="desc-block" style={{ color: '#888' }}>
              Ultimate over-ear headphones. Moving titanium drivers and lambskin memory foam.
            </div>
            <div className="pill-container" style={{ marginTop: 20 }}>
              <div className="pill filled">ADD TO CART</div>
            </div>
          </div>
        </Link>

        {/* Product Card 3 - Beolit 20 */}
        <Link href="/product/beolit-20" className="card light product-span" style={{ backgroundColor: '#D4D4D4' }}>
          <div className="price-tag">$549.00</div>
          <div className="orange-shape shape-circle" style={{ backgroundColor: 'white' }}></div>
          <div className="product-content-full">
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
              <svg className="arrow-graphic arrow-left" viewBox="0 0 20 60">
                <line x1="10" y1="0" x2="10" y2="55"></line>
                <line x1="10" y1="55" x2="2" y2="45"></line>
                <line x1="10" y1="55" x2="18" y2="45"></line>
              </svg>
            </div>
          </div>
        </Link>

        {/* Newsletter Section */}
        <div className="card dark newsletter-section">
          <div className="newsletter-content">
            <div className="label text-orange">NEWSLETTER</div>
            <h2 className="newsletter-title">JOIN THE<br />AUDIOPHILE CLUB</h2>
          </div>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="ENTER EMAIL" 
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .home-main {
          padding: 100px 40px 40px 40px;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
          max-width: 1800px;
          margin: 0 auto;
        }

        .card {
          border-radius: var(--radius);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid rgba(0,0,0,0.1);
          text-decoration: none;
          color: inherit;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card.dark {
          background-color: var(--card-dark);
          color: var(--text-light);
          border: none;
        }

        .card.light {
          background-color: var(--card-light);
          color: var(--text-dark);
          border: 1px solid var(--text-dark);
        }

        /* Hero Card */
        .hero-span {
          grid-column: span 12;
          height: 85vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
        }

        .hero-content {
          padding: 60px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .hero-content-right {
          grid-column: 2;
          align-items: flex-end;
          text-align: right;
        }

        .giant-letter {
          position: absolute;
          font-size: 35rem;
          font-weight: 900;
          color: var(--accent-orange);
          opacity: 1;
          line-height: 0;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-visual {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }

        .hero-img {
          max-height: 90%;
          max-width: 60%;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
          transition: transform 0.5s ease;
        }

        .card:hover .hero-img {
          transform: scale(1.05) rotate(-2deg);
        }

        /* Product Cards */
        .product-span {
          grid-column: span 4;
          height: 600px;
          padding: 30px;
        }

        .orange-shape {
          position: absolute;
          background-color: var(--accent-orange);
          z-index: 0;
        }

        .shape-rect {
          width: 60%;
          height: 80%;
          top: 10%;
          left: 20%;
          transform: rotate(-5deg);
        }

        .shape-circle {
          width: 80%;
          padding-bottom: 80%;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .product-img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          z-index: 2;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
          transition: transform 0.3s ease;
        }

        .card:hover .product-img {
          transform: translate(-50%, -55%) scale(1.02);
        }

        .vertical-text {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-orange);
          white-space: nowrap;
        }

        .ghost-text {
          position: absolute;
          top: 100px;
          left: -20px;
          font-size: 10rem;
          opacity: 0.1;
          font-weight: 900;
        }

        .product-info {
          z-index: 3;
          padding: 30px;
          margin-top: auto;
        }

        .product-content-full {
          z-index: 3;
          padding: 30px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Pills */
        .pill-container {
          display: flex;
          gap: 10px;
          margin-top: auto;
          z-index: 3;
          position: relative;
        }

        .pill {
          border: 1px solid currentColor;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pill.filled {
          background: currentColor;
          color: var(--bg-color);
        }

        .color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #C6A665;
          border: 1px solid rgba(0,0,0,0.2);
        }

        /* Typography */
        .overlay-text {
          font-size: 3.5rem;
          line-height: 0.85;
          position: relative;
          z-index: 3;
          margin-bottom: 20px;
          pointer-events: none;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }

        .price-tag {
          position: absolute;
          top: 25px;
          right: 25px;
          z-index: 4;
          font-family: monospace;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .desc-block {
          font-size: 0.9rem;
          line-height: 1.4;
          max-width: 80%;
          margin-top: 10px;
          z-index: 3;
          position: relative;
        }

        .label {
          font-family: monospace;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .text-orange {
          color: var(--accent-orange);
        }

        /* Arrow Graphic */
        .arrow-graphic {
          width: 20px;
          height: 60px;
          position: absolute;
          bottom: 30px;
          right: 30px;
          stroke: var(--accent-orange);
          stroke-width: 2;
          fill: none;
        }

        .arrow-left {
          right: auto;
          left: 30px;
          bottom: 10px;
          height: 40px;
          stroke: black;
        }

        /* Newsletter */
        .newsletter-section {
          grid-column: span 12;
          padding: 60px;
          flex-direction: row;
          align-items: center;
          border-radius: var(--radius);
        }

        .newsletter-content {
          flex: 1;
        }

        .newsletter-title {
          font-size: 4vw;
          margin-top: 20px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 0.9;
        }

        .newsletter-form {
          flex: 1;
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: flex-end;
        }

        .newsletter-input {
          background: transparent;
          border: 1px solid #333;
          padding: 20px;
          color: white;
          width: 300px;
          font-family: monospace;
          text-transform: uppercase;
        }

        .newsletter-btn {
          background: var(--accent-orange);
          border: none;
          padding: 20px 40px;
          font-weight: 800;
          text-transform: uppercase;
          cursor: pointer;
          color: white;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .product-span {
            grid-column: span 6;
          }
        }

        @media (max-width: 900px) {
          .home-main {
            padding: 100px 20px 20px 20px;
            gap: 15px;
          }

          .product-span {
            grid-column: span 12;
            height: 500px;
          }

          .hero-span {
            height: auto;
            min-height: 80vh;
            grid-template-columns: 1fr;
          }

          .hero-content-right {
            grid-column: 1;
            align-items: flex-start;
            text-align: left;
          }

          .giant-letter {
            font-size: 15rem;
          }

          .overlay-text {
            font-size: 2.5rem;
          }

          .newsletter-section {
            flex-direction: column;
            gap: 30px;
            padding: 40px;
          }

          .newsletter-form {
            flex-direction: column;
            width: 100%;
          }

          .newsletter-input {
            width: 100%;
          }

          .newsletter-title {
            font-size: 8vw;
          }
        }

        @media (max-width: 600px) {
          .home-main {
            padding: 80px 15px 15px 15px;
          }

          .giant-letter {
            font-size: 10rem;
          }

          .hero-content {
            padding: 30px;
          }

          .overlay-text {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
