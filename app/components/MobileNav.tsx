'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <>
      {/* Mobile Nav Bar */}
      <nav className="mobile-nav">
        <Link href="/" style={{ fontWeight: 900, fontSize: '1.1rem', color: 'white', textDecoration: 'none', letterSpacing: '-0.05em' }}>
          B&O
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <Link href="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative', fontSize: '1.2rem' }}>
            🛒
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: -8,
                right: -10,
                background: 'var(--accent-orange)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: 16,
                height: 16,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </Link>
          
          <Link href={mounted && isAuthenticated ? '/account' : '/login'} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
            👤
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 5,
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--card-dark)',
          zIndex: 99,
          paddingTop: 80,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <nav style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/speakers', label: 'Speakers' },
              { href: '/headphones', label: 'Headphones' },
              { href: '/televisions', label: 'Televisions' },
              { href: '/support', label: 'Support' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '15px 0',
                  borderBottom: '1px solid #333',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ padding: 20, marginTop: 'auto', marginBottom: 40 }}>
            <Link
              href={mounted && isAuthenticated ? '/account' : '/login'}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                padding: '18px',
                background: 'var(--accent-orange)',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              {mounted && isAuthenticated ? `Account (${user?.firstName || 'User'})` : 'Sign In'}
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                padding: '18px',
                background: 'transparent',
                border: '1px solid #444',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderRadius: 8,
              }}
            >
              Cart ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
