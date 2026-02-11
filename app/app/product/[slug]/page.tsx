'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/Toast';

interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  subtitle?: string;
  price: number;
  compareAt?: number;
  images: string[];
  colors: { hex: string; name: string }[];
  specs: Record<string, string> | null;
  category: string;
  categorySlug: string;
  brand?: string;
  contactOnly?: boolean;
  featured: boolean;
  inStock: boolean;
}

function ColorDot({ color, selected, onClick }: { color: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: selected ? 36 : 28,
        height: selected ? 36 : 28,
        borderRadius: '50%',
        background: color,
        border: selected ? '3px solid var(--accent-orange)' : '2px solid rgba(0,0,0,0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    />
  );
}

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    const colorName = product.colors?.[selectedColor]?.name || 'Default';
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: slug,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '',
        color: colorName,
      });
    }
    setAdded(true);
    addToast(`${product.name} added to cart!`, 'success');
    setTimeout(() => setAdded(false), 2000);
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navigation />
        <main>
          <div className="card dark" style={{ gridColumn: 'span 12', height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 20 }}>⏳</div>
            <p style={{ color: '#888' }}>Loading product...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Product not found
  if (!product) {
    return (
      <>
        <Navigation />
        <main>
          <div className="card dark" style={{ gridColumn: 'span 12', height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className="overlay-text" style={{ fontSize: '3rem', marginBottom: 20 }}>
              PRODUCT<br /><span className="text-orange">NOT FOUND</span>
            </h1>
            <Link href="/shop" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 700 }}>
              ← Return to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isContactOnly = product.contactOnly || product.price === 0;
  const productImage = product.images?.[0] || 'https://pngimg.com/d/wireless_speaker_PNG18.png';
  const letter = product.name.split(' ')[1]?.substring(0, 3) || product.name.substring(0, 2);
  const specs = product.specs ? Object.entries(product.specs) : [];

  return (
    <>
      <Navigation activeLink="shop" />

      <main>
        {/* Breadcrumb */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#888' }}>/</span>
            <Link href={`/${product.categorySlug}`} style={{ color: '#888', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category}</Link>
            <span style={{ color: '#888' }}>/</span>
            <span style={{ color: 'var(--accent-orange)' }}>{product.name}</span>
          </div>
        </div>

        {/* Product Image */}
        <div className="card dark product-image-card" style={{ gridColumn: 'span 7', height: '70vh', minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(10rem, 25vw, 25rem)', fontWeight: 900, opacity: 0.1, color: 'var(--accent-orange)', pointerEvents: 'none' }}>
            {letter}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImage}
            alt={product.name}
            style={{ maxWidth: '60%', maxHeight: '70%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))', zIndex: 2 }}
          />
        </div>

        {/* Product Info */}
        <div className="product-info-card" style={{ gridColumn: 'span 5', padding: '20px 0' }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>{product.subtitle || product.category}</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 20 }}>
            {product.name}
          </h1>
          
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, marginBottom: 25 }}>
            {product.longDescription || product.description}
          </p>

          {/* Price */}
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 30 }}>
            {isContactOnly ? (
              <span style={{ color: 'var(--accent-orange)' }}>Contact Us for Price</span>
            ) : (
              `€${product.price.toLocaleString()}`
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: 25 }}>
              <div className="label" style={{ marginBottom: 12 }}>Color: <span className="text-orange">{product.colors[selectedColor]?.name}</span></div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {product.colors.map((color, i) => (
                  <ColorDot
                    key={i}
                    color={color.hex}
                    selected={selectedColor === i}
                    onClick={() => setSelectedColor(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity - only show if not contact only */}
          {!isContactOnly && (
            <div style={{ marginBottom: 25 }}>
              <div className="label" style={{ marginBottom: 12 }}>Quantity</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ width: 44, height: 44, border: '1px solid #000', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  −
                </button>
                <span style={{ fontSize: '1.3rem', fontWeight: 600, width: 40, textAlign: 'center' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{ width: 44, height: 44, border: '1px solid #000', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          {isContactOnly ? (
            <Link
              href="/support"
              style={{
                display: 'block',
                width: '100%',
                padding: '20px 40px',
                background: 'var(--accent-orange)',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                textAlign: 'center',
                textDecoration: 'none',
                marginBottom: 12,
                boxSizing: 'border-box',
              }}
            >
              Contact Us
            </Link>
          ) : (
            <>
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '20px 40px',
                  background: added ? '#4CAF50' : 'var(--accent-orange)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  marginBottom: 12,
                  transition: 'background 0.3s ease',
                }}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              
              <Link
                href="/cart"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '20px 40px',
                  background: '#000',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                  marginBottom: 12,
                  boxSizing: 'border-box',
                }}
              >
                View Cart
              </Link>
            </>
          )}
          
          <button
            style={{
              width: '100%',
              padding: '20px 40px',
              background: 'transparent',
              border: '1px solid #000',
              color: '#000',
              fontSize: '1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Find in Store
          </button>
        </div>

        {/* Specifications */}
        {specs.length > 0 && (
          <div className="card light" style={{ gridColumn: 'span 12', padding: 'clamp(30px, 5vw, 60px)', marginTop: 20, position: 'relative', overflow: 'hidden' }}>
            <div className="orange-shape shape-rect" style={{ width: '30%', height: '150%', left: 'auto', right: '-10%', transform: 'rotate(15deg)', opacity: 0.3 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="label text-orange" style={{ marginBottom: 10 }}>Technical</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30, lineHeight: 0.9 }}>
                Specifications
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'clamp(20px, 4vw, 40px)' }}>
                {specs.map(([label, value], i) => (
                  <div key={i}>
                    <div className="label" style={{ marginBottom: 8, color: '#888' }}>{label}</div>
                    <div style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 700 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: '50%', transform: 'translateY(-50%)', fontSize: '12rem', fontWeight: 900, opacity: 0.1, pointerEvents: 'none', color: 'var(--accent-orange)' }}>
            B&O
          </div>
          <div style={{ flex: 1, zIndex: 2 }}>
            <div className="label text-orange">Experience</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginTop: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Visit Our<br />Showroom
            </h2>
            <p style={{ marginTop: 15, color: '#888', maxWidth: 350 }}>
              See and hear the {product.name} in person at our Pristina showroom.
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
      </main>

      <Footer />
    </>
  );
}
