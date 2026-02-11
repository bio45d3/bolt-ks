'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ background: 'var(--card-dark)', color: 'var(--text-light)', marginTop: 60 }}>
      {/* Main Footer */}
      <div style={{ 
        maxWidth: 1800, 
        margin: '0 auto', 
        padding: '60px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 40,
      }}>
        {/* Brand */}
        <div>
          <div style={{ fontWeight: 900, fontSize: '1.25rem', marginBottom: 20, letterSpacing: '-0.05em' }}>
            BANG & OLUFSEN
          </div>
          <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
            Premium audio and video products crafted with exceptional sound quality and timeless Danish design.
          </p>
          <div style={{ display: 'flex', gap: 15 }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '1.25rem' }}>📷</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '1.25rem' }}>📘</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '1.25rem' }}>🐦</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '1.25rem' }}>▶️</a>
          </div>
        </div>

        {/* Products */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 20, color: 'var(--accent-orange)' }}>
            Products
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/speakers" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Speakers</Link>
            <Link href="/headphones" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Headphones</Link>
            <Link href="/televisions" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Televisions</Link>
            <Link href="/speakers" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Accessories</Link>
          </nav>
        </div>

        {/* Support */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 20, color: 'var(--accent-orange)' }}>
            Support
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/support" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Help Center</Link>
            <Link href="/support" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Track Order</Link>
            <Link href="/support" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Returns</Link>
            <Link href="/support" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</Link>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 20, color: 'var(--accent-orange)' }}>
            Visit Us
          </div>
          <address style={{ fontStyle: 'normal', color: '#888', fontSize: '0.9rem', lineHeight: 1.8 }}>
            <strong style={{ color: 'white' }}>Bolt KS</strong><br />
            Rr. Agim Ramadani 15<br />
            10000 Pristina, Kosovo<br /><br />
            <a href="tel:+38344123456" style={{ color: '#888', textDecoration: 'none' }}>+383 44 123 456</a><br />
            <a href="mailto:info@bolt-ks.com" style={{ color: '#888', textDecoration: 'none' }}>info@bolt-ks.com</a>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ 
        borderTop: '1px solid #333',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1800,
        margin: '0 auto',
      }}>
        <div style={{ color: '#666', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Bolt KS. All rights reserved. Authorized Bang & Olufsen retailer.
        </div>
        <div style={{ display: 'flex', gap: 25 }}>
          <Link href="/privacy" style={{ color: '#666', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: '#666', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
