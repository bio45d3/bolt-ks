'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ padding: 100, textAlign: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }

  const total = getTotalPrice();
  const shipping = total > 500 ? 0 : 49;
  const grandTotal = total + shipping;

  return (
    <>
      <nav>
        <Link href="/" className="logo">BANG & OLUFSEN</Link>
        <div className="nav-links">
          <Link href="/speakers">Speakers</Link>
          <Link href="/headphones">Headphones</Link>
          <Link href="/televisions">Televisions</Link>
          <Link href="/support">Support</Link>
        </div>
      </nav>

      <main style={{ paddingTop: 120 }}>
        {/* Breadcrumb */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.85rem' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#888' }}>/</span>
            <span style={{ color: 'var(--accent-orange)' }}>Cart</span>
          </div>
        </div>

        {/* Page Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 40 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Shopping Cart
          </h1>
          {items.length > 0 && (
            <p style={{ marginTop: 15, fontSize: '1rem', color: '#666' }}>
              {items.reduce((sum, i) => sum + i.quantity, 0)} items in your cart
            </p>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="card light" style={{ gridColumn: 'span 12', padding: 80, textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 20 }}>🛒</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 15 }}>
              Your Cart is Empty
            </h2>
            <p style={{ color: '#666', marginBottom: 30, maxWidth: 400, margin: '0 auto 30px' }}>
              Looks like you haven&apos;t added any products to your cart yet. Explore our collection and find your perfect sound.
            </p>
            <Link
              href="/speakers"
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
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ gridColumn: 'span 8' }}>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="card light"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 30,
                    marginBottom: 20,
                    gap: 30,
                  }}
                >
                  {/* Product Image */}
                  <div style={{ width: 150, height: 150, background: '#f5f5f5', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <Link href={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 5 }}>
                        {item.name}
                      </h3>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: item.color, border: '1px solid rgba(0,0,0,0.2)' }} />
                      <span style={{ color: '#888', fontSize: '0.9rem' }}>{item.color}</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                      style={{ width: 36, height: 36, border: '1px solid #000', background: 'transparent', fontSize: '1.25rem', cursor: 'pointer' }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600, width: 30, textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                      style={{ width: 36, height: 36, border: '1px solid #000', background: 'transparent', fontSize: '1.25rem', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div style={{ width: 120, textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                      ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id, item.color)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#888', padding: 10 }}
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                onClick={clearCart}
                style={{
                  background: 'transparent',
                  border: '1px solid #888',
                  padding: '12px 24px',
                  color: '#888',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div style={{ gridColumn: 'span 4' }}>
              <div className="card dark" style={{ padding: 40 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>
                  Order Summary
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15, color: '#888' }}>
                  <span>Subtotal</span>
                  <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15, color: '#888' }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>

                {shipping > 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-orange)', marginBottom: 15 }}>
                    Free shipping on orders over $500
                  </div>
                )}

                <div style={{ borderTop: '1px solid #333', paddingTop: 15, marginTop: 15, display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
                  <span>Total</span>
                  <span>${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <Link
                  href="/checkout"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '20px',
                    background: 'var(--accent-orange)',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginTop: 30,
                  }}
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/speakers"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '20px',
                    background: 'transparent',
                    border: '1px solid #444',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginTop: 15,
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
