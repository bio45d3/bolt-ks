'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

type BrandFilter = 'all' | 'BANG_OLUFSEN' | 'DEVIALET' | 'LOEWE';
type Category = 'all' | 'speakers' | 'headphones' | 'televisions' | 'soundbars' | 'accessories';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  subtitle?: string;
  price: number;
  compareAt?: number;
  images: string[];
  colors: { hex: string; name: string }[];
  category: string;
  categorySlug: string;
  brand?: 'BANG_OLUFSEN' | 'DEVIALET' | 'LOEWE';
  contactOnly?: boolean;
  featured: boolean;
  inStock: boolean;
}

const PRODUCTS_PER_PAGE = 12;

const brandInfo = {
  'BANG_OLUFSEN': { name: 'Bang & Olufsen', abbr: 'B&O', country: 'Denmark' },
  'DEVIALET': { name: 'Devialet', abbr: 'DEV', country: 'France' },
  'LOEWE': { name: 'Loewe', abbr: 'LW', country: 'Germany' },
};

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

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_PAGE);
  const [selectedBrand, setSelectedBrand] = useState<BrandFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setAllProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(PRODUCTS_PER_PAGE);
  }, [selectedBrand, selectedCategory]);

  const filteredProducts = allProducts
    .filter(p => {
      if (selectedBrand === 'all') return true;
      return p.brand === selectedBrand;
    })
    .filter(p => {
      if (selectedCategory === 'all') return true;
      return p.categorySlug === selectedCategory;
    });

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  // Infinite scroll observer
  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      // Small delay for smooth UX
      setTimeout(() => {
        setDisplayCount(prev => prev + PRODUCTS_PER_PAGE);
        setLoadingMore(false);
      }, 300);
    }
  }, [hasMore, loadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  const categories = ['all', 'speakers', 'headphones', 'televisions', 'soundbars', 'accessories'] as const;
  const brands = ['all', 'BANG_OLUFSEN', 'DEVIALET', 'LOEWE'] as const;

  // Derive brand from SKU prefix if not set
  function getBrand(product: Product): 'BANG_OLUFSEN' | 'DEVIALET' | 'LOEWE' | null {
    if (product.brand) return product.brand;
    // Fallback: check name patterns
    const name = product.name.toLowerCase();
    if (name.includes('beo') || name.includes('b&o')) return 'BANG_OLUFSEN';
    if (name.includes('phantom') || name.includes('devialet') || name.includes('mania') || name.includes('dione') || name.includes('gemini')) return 'DEVIALET';
    if (name.includes('klang') || name.includes('stellar') || name.includes('iconic') || name.includes('we.') || name.includes('bild') || name.includes('inspire')) return 'LOEWE';
    return null;
  }

  return (
    <>
      <Navigation activeLink="shop" />

      <main>
        {/* Hero Header */}
        <div className="card dark" style={{ gridColumn: 'span 12', height: '40vh', minHeight: 300, position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(8rem, 20vw, 20rem)', fontWeight: 900, color: 'var(--accent-orange)', opacity: 0.15, pointerEvents: 'none' }}>
            SHOP
          </div>
          <div className="hero-content" style={{ height: '100%', justifyContent: 'center' }}>
            <div className="label text-orange" style={{ marginBottom: 15 }}>Premium Audio & Television</div>
            <h1 className="overlay-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: 15 }}>
              ALL<br />
              <span className="text-orange">PRODUCTS</span>
            </h1>
            <p style={{ color: '#888', maxWidth: 500, fontSize: '1rem' }}>
              Explore our curated selection from Bang & Olufsen, Devialet, and Loewe.
            </p>
          </div>
        </div>

        {/* Brand Filter Pills */}
        <div style={{ gridColumn: 'span 12', marginBottom: 10 }}>
          <div className="label" style={{ marginBottom: 15 }}>Filter by Brand</div>
          <div className="pill-container" style={{ marginTop: 0 }}>
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className="pill"
                style={{
                  background: selectedBrand === brand ? 'var(--accent-orange)' : 'transparent',
                  borderColor: selectedBrand === brand ? 'var(--accent-orange)' : 'currentColor',
                  color: selectedBrand === brand ? 'white' : 'inherit',
                  cursor: 'pointer',
                  padding: '10px 20px',
                }}
              >
                {brand === 'all' ? 'All Brands' : brandInfo[brand].name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 15 }}>
          <div className="pill-container" style={{ marginTop: 0 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="pill"
                style={{
                  background: selectedCategory === cat ? '#000' : 'transparent',
                  borderColor: selectedCategory === cat ? '#000' : 'currentColor',
                  color: selectedCategory === cat ? 'white' : 'inherit',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  textTransform: 'capitalize',
                }}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {loading ? 'Loading...' : `Showing ${displayedProducts.length} of ${filteredProducts.length}`}
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="card light" style={{ gridColumn: 'span 12', textAlign: 'center', padding: 80 }}>
            <div style={{ fontSize: '2rem', marginBottom: 20 }}>⏳</div>
            <p style={{ color: '#666' }}>Loading products...</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && displayedProducts.map((product, index) => {
          const isDark = index % 3 === 1;
          const bgColor = index % 3 === 2 ? '#D4D4D4' : undefined;
          const shape = index % 2 === 0 ? 'rect' : 'circle';
          const productBrand = getBrand(product);
          const isContactOnly = product.contactOnly || product.price === 0;
          const productImage = product.images?.[0] || 'https://pngimg.com/d/wireless_speaker_PNG18.png';
          
          return (
            <Link 
              href={`/product/${product.slug}`} 
              key={product.id} 
              className={`card ${isDark ? 'dark' : 'light'} product-span`}
              style={{ 
                backgroundColor: bgColor, 
                textDecoration: 'none', 
                color: 'inherit',
                height: 500,
              }}
            >
              <div className="price-tag" style={{ color: isDark ? 'var(--accent-orange)' : 'inherit', fontFamily: 'monospace', fontWeight: 600 }}>
                {!isContactOnly && product.price > 0
                  ? `€${product.price.toLocaleString()}`
                  : <span style={{ color: 'var(--accent-orange)' }}>Contact Us</span>
                }
              </div>
              
              {/* Brand badge */}
              {productBrand && (
                <div style={{ 
                  position: 'absolute', 
                  top: 25, 
                  left: 25, 
                  padding: '4px 10px', 
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.8)', 
                  color: isDark ? '#888' : 'white', 
                  fontSize: '0.6rem', 
                  fontWeight: 700, 
                  textTransform: 'uppercase',
                  zIndex: 4,
                  letterSpacing: '0.05em',
                }}>
                  {brandInfo[productBrand].name}
              </div>
              )}
              
              {!isDark && (
                <div 
                  className={`orange-shape shape-${shape}`} 
                  style={shape === 'circle' ? { backgroundColor: 'white' } : undefined}
                />
              )}
              
              {isDark && (
                <div style={{ 
                  position: 'absolute', 
                  top: 80, 
                  left: -10, 
                  fontSize: '8rem', 
                  fontWeight: 900, 
                  opacity: 0.1,
                  pointerEvents: 'none',
                }}>
                  {product.name.split(' ')[1]?.substring(0, 2) || product.name.substring(0, 2)}
                </div>
              )}
              
              <h2 className="overlay-text" style={{ marginTop: 60, color: isDark ? 'white' : 'black', fontSize: '2rem' }}>
                {product.name.split(' ')[0]}<br />
                <span className="text-orange">{product.name.split(' ').slice(1).join(' ') || product.subtitle || ''}</span>
              </h2>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImage}
                alt={product.name}
                className="product-img"
                style={{ width: '65%' }}
              />
              
              <div style={{ zIndex: 3, marginTop: 'auto' }}>
                <div className="label" style={{ marginBottom: 5, color: isDark ? '#888' : 'inherit' }}>
                  {product.subtitle || product.description?.substring(0, 40) || product.category}
                </div>
                
                {product.colors && product.colors.length > 0 && (
                  <div className="pill-container" style={{ marginTop: 10 }}>
                    {product.colors.slice(0, 3).map((color, i) => (
                      <div className="pill" key={i} style={{ padding: '6px 10px' }}>
                        <ColorDot color={color.hex} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <ArrowGraphic dark={isDark} />
            </Link>
          );
        })}

        {/* Load More Trigger (Infinite Scroll) */}
        {!loading && hasMore && (
          <div 
            ref={loaderRef}
            style={{ 
              gridColumn: 'span 12', 
              textAlign: 'center', 
              padding: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {loadingMore ? (
              <>
                <div style={{ 
                  width: 20, 
                  height: 20, 
                  border: '2px solid #ccc',
                  borderTopColor: 'var(--accent-orange)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <span style={{ color: '#666' }}>Loading more...</span>
              </>
            ) : (
              <span style={{ color: '#999', fontSize: '0.9rem' }}>Scroll for more</span>
            )}
          </div>
        )}

        {/* End of Products */}
        {!loading && !hasMore && filteredProducts.length > 0 && (
          <div style={{ gridColumn: 'span 12', textAlign: 'center', padding: 30, color: '#999', fontSize: '0.9rem' }}>
            — All {filteredProducts.length} products loaded —
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="card light" style={{ gridColumn: 'span 12', textAlign: 'center', padding: 80 }}>
            <div style={{ fontSize: '4rem', marginBottom: 20, opacity: 0.3 }}>∅</div>
            <h3 style={{ fontWeight: 800, marginBottom: 10, textTransform: 'uppercase' }}>No products found</h3>
            <p style={{ color: '#666' }}>Try adjusting your filters</p>
          </div>
        )}

        {/* Newsletter */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div className="label text-orange">Newsletter</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginTop: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Stay<br />Updated
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

      {/* Spinner animation */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Footer />
    </>
  );
}
