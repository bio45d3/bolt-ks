'use client';

import Link from 'next/link';

// Social Icons
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

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
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', display: 'flex' }}><InstagramIcon /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', display: 'flex' }}><FacebookIcon /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', display: 'flex' }}><TwitterIcon /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', display: 'flex' }}><YouTubeIcon /></a>
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
