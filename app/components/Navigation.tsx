'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';

interface NavigationProps {
  activeLink?: 'speakers' | 'headphones' | 'televisions' | 'support';
}

export function Navigation({ activeLink }: NavigationProps) {
  const { getTotalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  const linkStyle = (link: string) => ({
    color: activeLink === link ? 'var(--accent-orange)' : undefined,
  });

  return (
    <>
      <nav className="site-nav">
        <Link href="/" className="logo">BANG & OLUFSEN</Link>
        
        {/* Desktop nav links */}
        <div className="nav-links desktop-nav">
          <Link href="/speakers" style={linkStyle('speakers')}>Speakers</Link>
          <Link href="/headphones" style={linkStyle('headphones')}>Headphones</Link>
          <Link href="/televisions" style={linkStyle('televisions')}>Televisions</Link>
          <Link href="/support" style={linkStyle('support')}>Support</Link>
          <Link href="/cart" className="nav-cart">
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <Link href={mounted && isAuthenticated ? '/account' : '/login'} className="nav-account">
            {mounted && isAuthenticated ? `👤 ${user?.firstName || 'Account'}` : '👤 Sign In'}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="mobile-controls">
          <Link href="/cart" className="nav-cart">
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <Link href={mounted && isAuthenticated ? '/account' : '/login'}>👤</Link>
          <button 
            className="hamburger" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-links">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/speakers" onClick={() => setMenuOpen(false)}>Speakers</Link>
            <Link href="/headphones" onClick={() => setMenuOpen(false)}>Headphones</Link>
            <Link href="/televisions" onClick={() => setMenuOpen(false)}>Televisions</Link>
            <Link href="/support" onClick={() => setMenuOpen(false)}>Support</Link>
          </div>
          <div className="mobile-menu-actions">
            <Link 
              href={mounted && isAuthenticated ? '/account' : '/login'} 
              onClick={() => setMenuOpen(false)}
              className="mobile-menu-btn primary"
            >
              {mounted && isAuthenticated ? 'My Account' : 'Sign In'}
            </Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)} className="mobile-menu-btn">
              Cart ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
