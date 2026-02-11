'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Navigation />
        <main>
          <div className="card dark" style={{ gridColumn: 'span 12', height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '1.5rem', color: '#888' }}>Loading...</div>
          </div>
        </main>
      </>
    );
  }

  const total = getTotalPrice();
  const shipping = total > 500 ? 0 : 49;
  const grandTotal = total + shipping;

  return (
    <>
      <Navigation />

      <main>
        {/* Hero Header */}
        <div className="card dark" style={{ gridColumn: 'span 12', height: '30vh', minHeight: 200, position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(6rem, 15vw, 15rem)', fontWeight: 900, color: 'var(--accent-orange)', opacity: 0.15, pointerEvents: 'none' }}>
            CART
          </div>
          <div className="hero-content" style={{ height: '100%', justifyContent: 'center' }}>
            <div className="label text-orange" style={{ marginBottom: 15 }}>Shopping</div>
            <h1 className="overlay-text" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: 10 }}>
              YOUR<br />
              <span className="text-orange">CART</span>
            </h1>
            {items.length > 0 && (
              <p style={{ color: '#888', fontSize: '1rem' }}>
                {items.reduce((sum, i) => sum + i.quantity, 0)} items
              </p>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="card light" style={{ gridColumn: 'span 12', padding: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="orange-shape shape-circle" style={{ width: '30%', paddingBottom: '30%', opacity: 0.2 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '4rem', marginBottom: 20, opacity: 0.5 }}>🛒</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 15 }}>
                Your Cart<br /><span className="text-orange">is Empty</span>
              </h2>
              <p style={{ color: '#666', marginBottom: 30, maxWidth: 400, margin: '0 auto 30px' }}>
                Looks like you haven&apos;t added any products yet. Explore our collection.
              </p>
              <Link
                href="/shop"
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
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ gridColumn: 'span 8' }}>
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className={`card ${index % 2 === 0 ? 'light' : 'dark'}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 25,
                    marginBottom: 15,
                    gap: 25,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background letter */}
                  <div style={{ 
                    position: 'absolute', 
                    right: -20, 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    fontSize: '8rem', 
                    fontWeight: 900, 
                    opacity: 0.05,
                    pointerEvents: 'none',
                  }}>
                    {item.name.charAt(0)}
                  </div>

                  {/* Product Image */}
                  <div style={{ 
                    width: 120, 
                    height: 120, 
                    background: index % 2 === 0 ? '#e0e0e0' : '#2a2a2a', 
                    borderRadius: 'var(--radius)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link href={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 5 }}>
                        {item.name}
                      </h3>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div className="color-dot" style={{ background: item.color }} />
                      <span style={{ color: index % 2 === 0 ? '#888' : '#666', fontSize: '0.85rem' }}>{item.color}</span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                      style={{ 
                        width: 36, 
                        height: 36, 
                        border: `1px solid ${index % 2 === 0 ? '#000' : '#444'}`, 
                        background: 'transparent', 
                        fontSize: '1.25rem', 
                        cursor: 'pointer',
                        color: 'inherit',
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600, width: 30, textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                      style={{ 
                        width: 36, 
                        height: 36, 
                        border: `1px solid ${index % 2 === 0 ? '#000' : '#444'}`, 
                        background: 'transparent', 
                        fontSize: '1.25rem', 
                        cursor: 'pointer',
                        color: 'inherit',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div style={{ width: 100, textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                      ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id, item.color)}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      cursor: 'pointer', 
                      fontSize: '1.5rem', 
                      color: index % 2 === 0 ? '#888' : '#666', 
                      padding: 10,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="pill"
                style={{
                  cursor: 'pointer',
                  background: 'transparent',
                  padding: '12px 24px',
                  marginTop: 10,
                }}
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div style={{ gridColumn: 'span 4' }}>
              <div className="card dark" style={{ padding: 35, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -30, bottom: -30, fontSize: '10rem', fontWeight: 900, opacity: 0.05, color: 'var(--accent-orange)', pointerEvents: 'none' }}>
                  $
                </div>
                <div className="label text-orange" style={{ marginBottom: 10 }}>Summary</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 25, lineHeight: 0.9 }}>
                  Order<br />Total
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#888' }}>
                  <span>Subtotal</span>
                  <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#888' }}>
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? 'var(--accent-orange)' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', marginBottom: 12 }}>
                    Free shipping on orders over $500
                  </div>
                )}

                <div style={{ borderTop: '1px solid #333', paddingTop: 15, marginTop: 15, display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800 }}>
                  <span>Total</span>
                  <span>${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <Link
                  href="/checkout"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '18px',
                    background: 'var(--accent-orange)',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginTop: 25,
                    fontSize: '0.9rem',
                  }}
                >
                  Checkout
                </Link>

                <Link
                  href="/shop"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '18px',
                    background: 'transparent',
                    border: '1px solid #444',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginTop: 10,
                    fontSize: '0.9rem',
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
