'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

export default function CheckoutSuccessPage() {
  const orderNumber = `BO-${Date.now().toString().slice(-8)}`;

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 120 }}>
        <div className="card light" style={{ gridColumn: 'span 12', padding: 80, textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', marginBottom: 20 }}>✓</div>
          
          <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 20 }}>
            Thank You!
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: 10 }}>
            Your order has been placed successfully.
          </p>
          
          <div style={{ marginBottom: 40 }}>
            <div className="label" style={{ marginBottom: 5 }}>Order Number</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)' }}>{orderNumber}</div>
          </div>

          <div style={{ background: '#f5f5f5', padding: 30, borderRadius: 'var(--radius)', maxWidth: 500, margin: '0 auto 40px' }}>
            <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 15 }}>What&apos;s Next?</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              You&apos;ll receive an email confirmation shortly with your order details. 
              We&apos;ll notify you when your order ships. Premium products are typically 
              delivered within 3-5 business days in Kosovo.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
            <Link
              href="/"
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
              Continue Shopping
            </Link>
            <Link
              href="/support"
              style={{
                display: 'inline-block',
                padding: '20px 40px',
                background: 'transparent',
                border: '1px solid #000',
                color: '#000',
                textDecoration: 'none',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              Track Order
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
