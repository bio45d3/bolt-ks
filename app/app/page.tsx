'use client';

import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { useEffect, useState } from 'react';

interface FeaturedProduct {
  position: number;
  product: {
    id: string;
    name: string;
    slug: string;
    subtitle?: string;
    description?: string;
    price: number;
    images: string[];
    colors: { hex: string; name: string }[] | null;
    category: string;
    categorySlug: string;
    contactOnly: boolean;
  } | null;
}

// Default fallback products (used when no featured products are set)
const defaultProducts = {
  hero: {
    name: 'Beolab 90',
    slug: 'beolab-90',
    subtitle: 'Flagship Innovation',
    description: 'In the years following its inception, the Beolab 90 has stood as the pinnacle of acoustic engineering. Active Room Compensation meets visionary design.',
    price: 80000,
    image: 'https://pngimg.com/uploads/loudspeaker/loudspeaker_PNG101569.png',
    letter: '90',
  },
  featured1: {
    name: 'Beosound A9',
    slug: 'beosound-a9',
    subtitle: 'Iconic Design',
    description: 'Sound and shape unite in this iconic, customizable speaker.',
    price: 4550,
    image: 'https://pngimg.com/d/wireless_speaker_PNG18.png',
  },
  featured2: {
    name: 'Beoplay H95',
    slug: 'beoplay-h95',
    subtitle: 'Premium ANC',
    description: 'Ultimate over-ear headphones. Moving titanium drivers and lambskin memory foam.',
    price: 1250,
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
  },
  featured3: {
    name: 'Beolit 20',
    slug: 'beolit-20',
    subtitle: 'Portable Power',
    description: 'Big sound for every moment. Long-lasting battery, integrated wireless Qi charging.',
    price: 549,
    image: 'https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG36.png',
  },
};

function getProductLetter(name: string): string {
  const parts = name.split(' ');
  if (parts.length > 1) {
    const last = parts[parts.length - 1];
    if (/^\d+$/.test(last) || /^[A-Z]\d+$/i.test(last)) {
      return last;
    }
  }
  return name.substring(0, 2).toUpperCase();
}

export default function Home() {
  const [featured, setFeatured] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/featured');
        if (res.ok) {
          const data = await res.json();
          setFeatured(data);
        }
      } catch (error) {
        console.error('Failed to fetch featured:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

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

  // Get products by position (fallback to defaults)
  const heroProduct = featured.find(f => f.position === 1)?.product;
  const featured1 = featured.find(f => f.position === 2)?.product;
  const featured2 = featured.find(f => f.position === 3)?.product;
  const featured3 = featured.find(f => f.position === 4)?.product;

  const hero = heroProduct || defaultProducts.hero;
  const prod1 = featured1 || defaultProducts.featured1;
  const prod2 = featured2 || defaultProducts.featured2;
  const prod3 = featured3 || defaultProducts.featured3;

  const formatPrice = (price: number, contactOnly?: boolean) => {
    if (contactOnly || price === 0) return 'Contact Us';
    return `€${price.toLocaleString()}`;
  };

  return (
    <>
      <Navigation />

      <main className="home-main">
        {/* Hero Card */}
        <Link href={`/product/${heroProduct?.slug || hero.slug}`} className="card dark hero-span">
          <div className="giant-letter">{heroProduct ? getProductLetter(heroProduct.name) : hero.letter}</div>
          <div className="hero-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={heroProduct?.images?.[0] || hero.image} 
              alt={heroProduct?.name || hero.name} 
              className="hero-img"
            />
          </div>
          <div className="hero-content" style={{ gridColumn: 1 }}>
            <div className="label text-orange">{heroProduct?.subtitle || hero.subtitle}</div>
            <h1 className="overlay-text">
              THE SHAPE<br />
              OF SOUND<br />
              <span className="text-orange">REDEFINED</span>
            </h1>
          </div>
          <div className="hero-content hero-content-right">
            <div className="price-tag">
              <span className="label">MSRP</span><br />
              {formatPrice(heroProduct?.price || hero.price, heroProduct?.contactOnly)}
            </div>
            <div className="desc-block">
              {heroProduct?.description || hero.description}
            </div>
          </div>
        </Link>

        {/* Product Card 1 */}
        <Link href={`/product/${featured1?.slug || prod1.slug}`} className="card light product-span">
          <div className="price-tag">{formatPrice(featured1?.price || prod1.price, featured1?.contactOnly)}</div>
          <div className="orange-shape shape-rect"></div>
          <div className="vertical-text">{featured1?.subtitle || prod1.subtitle}</div>
          <h2 className="overlay-text" style={{ marginTop: 40 }}>
            {(featured1?.name || prod1.name).split(' ')[0]}<br />
            <span className="text-orange">{(featured1?.name || prod1.name).split(' ').slice(1).join(' ')}</span>
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={featured1?.images?.[0] || prod1.image} 
            alt={featured1?.name || prod1.name} 
            className="product-img"
          />
          {featured1?.colors && featured1.colors.length > 0 && (
            <div className="pill-container">
              {featured1.colors.slice(0, 2).map((color, i) => (
                <div className="pill" key={i}>
                  {color.name}
                  <div className="color-dot" style={{ background: color.hex }}></div>
                </div>
              ))}
            </div>
          )}
          <svg className="arrow-graphic" viewBox="0 0 20 60">
            <line x1="10" y1="0" x2="10" y2="55"></line>
            <line x1="10" y1="55" x2="2" y2="45"></line>
            <line x1="10" y1="55" x2="18" y2="45"></line>
          </svg>
        </Link>

        {/* Product Card 2 */}
        <Link href={`/product/${featured2?.slug || prod2.slug}`} className="card dark product-span">
          <div className="price-tag text-orange">{formatPrice(featured2?.price || prod2.price, featured2?.contactOnly)}</div>
          <div className="ghost-text">{featured2 ? getProductLetter(featured2.name) : 'H95'}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={featured2?.images?.[0] || prod2.image} 
            alt={featured2?.name || prod2.name} 
            className="product-img"
            style={{ width: '70%' }}
          />
          <div className="product-info">
            <h2 style={{ fontSize: '2.5rem', marginBottom: 10 }}>{featured2?.name || prod2.name}</h2>
            <div className="desc-block" style={{ color: '#888' }}>
              {featured2?.description || prod2.description}
            </div>
            <div className="pill-container" style={{ marginTop: 20 }}>
              <div className="pill filled">VIEW PRODUCT</div>
            </div>
          </div>
        </Link>

        {/* Product Card 3 */}
        <Link href={`/product/${featured3?.slug || prod3.slug}`} className="card light product-span" style={{ backgroundColor: '#D4D4D4' }}>
          <div className="price-tag">{formatPrice(featured3?.price || prod3.price, featured3?.contactOnly)}</div>
          <div className="orange-shape shape-circle" style={{ backgroundColor: 'white' }}></div>
          <div className="product-content-full">
            <h2 className="overlay-text" style={{ color: 'black', fontSize: '2.5rem' }}>
              {(featured3?.name || prod3.name).split(' ')[0]}<br />{(featured3?.name || prod3.name).split(' ').slice(1).join(' ')}
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={featured3?.images?.[0] || prod3.image} 
              alt={featured3?.name || prod3.name} 
              className="product-img"
              style={{ width: '55%', top: '60%' }}
            />
            <div style={{ marginTop: 'auto' }}>
              <div className="label" style={{ marginBottom: 5 }}>{featured3?.subtitle || prod3.subtitle}</div>
              <div className="desc-block">
                {featured3?.description || prod3.description}
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
          z-index: 1;
        }

        .hero-img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 45%;
          max-height: 70%;
          object-fit: contain;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.5));
          z-index: 1;
        }

        .overlay-text {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 0.9;
        }

        .price-tag {
          position: absolute;
          top: 25px;
          right: 25px;
          text-align: right;
          z-index: 3;
          font-family: monospace;
          font-weight: 700;
        }

        .desc-block {
          max-width: 320px;
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.7);
          margin-top: 20px;
        }

        /* Product Cards */
        .product-span {
          grid-column: span 4;
          height: 600px;
          padding: 30px;
        }

        .product-img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 75%;
          object-fit: contain;
          z-index: 1;
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.2));
        }

        .orange-shape {
          position: absolute;
          z-index: 0;
        }

        .shape-rect {
          width: 40%;
          height: 120%;
          background: var(--accent-orange);
          top: -10%;
          right: 0;
        }

        .shape-circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: var(--accent-orange);
          bottom: 15%;
          left: 10%;
        }

        .vertical-text {
          position: absolute;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-family: monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          top: 30px;
          left: 30px;
          z-index: 2;
        }

        .ghost-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 10rem;
          font-weight: 900;
          color: rgba(255,255,255,0.05);
          pointer-events: none;
          z-index: 0;
        }

        .product-info {
          z-index: 2;
          margin-top: auto;
        }

        .product-content-full {
          display: flex;
          flex-direction: column;
          height: 100%;
          z-index: 2;
        }

        /* Pills */
        .pill-container {
          display: flex;
          gap: 10px;
          z-index: 3;
          margin-top: auto;
          flex-wrap: wrap;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          border: 1px solid currentColor;
          font-family: monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
        }

        .pill.filled {
          background: var(--accent-orange);
          border: none;
          color: white;
        }

        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        /* Arrow */
        .arrow-graphic {
          position: absolute;
          bottom: 30px;
          right: 30px;
          width: 20px;
          height: 60px;
          stroke: currentColor;
          stroke-width: 1;
          fill: none;
          z-index: 3;
        }

        .arrow-left {
          right: auto;
          left: 30px;
        }

        /* Newsletter */
        .newsletter-section {
          grid-column: span 12;
          padding: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .newsletter-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 0.9;
          margin-top: 15px;
        }

        .newsletter-form {
          display: flex;
          gap: 15px;
        }

        .newsletter-input {
          background: transparent;
          border: 1px solid #333;
          padding: 20px;
          width: 300px;
          font-family: monospace;
          text-transform: uppercase;
          color: white;
        }

        .newsletter-input::placeholder {
          color: #666;
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

        /* Text utilities */
        .text-orange {
          color: var(--accent-orange);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .hero-span {
            height: 70vh;
          }
          .giant-letter {
            font-size: 25rem;
          }
          .product-span {
            grid-column: span 6;
          }
        }

        @media (max-width: 900px) {
          .home-main {
            padding: 100px 20px 20px 20px;
            gap: 15px;
          }
          .hero-span {
            grid-template-columns: 1fr;
            height: auto;
            min-height: 80vh;
          }
          .hero-content-right {
            grid-column: 1;
            align-items: flex-start;
            text-align: left;
          }
          .giant-letter {
            font-size: 15rem;
          }
          .product-span {
            grid-column: span 12;
            height: 500px;
          }
          .newsletter-section {
            flex-direction: column;
            text-align: center;
            gap: 30px;
          }
          .newsletter-form {
            flex-direction: column;
            width: 100%;
          }
          .newsletter-input {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
