'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';

// SVG Icons
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6h15l-1.5 9h-12z" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
    <path d="M6 6L5 3H2" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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
          <Link href="/cart" className="nav-cart nav-icon">
            <CartIcon />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <Link href={mounted && isAuthenticated ? '/account' : '/login'} className="nav-account nav-icon">
            <UserIcon />
            <span className="nav-account-text">{mounted && isAuthenticated ? user?.firstName || 'Account' : 'Sign In'}</span>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="mobile-controls">
          <Link href="/cart" className="nav-cart nav-icon">
            <CartIcon />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <Link href={mounted && isAuthenticated ? '/account' : '/login'} className="nav-icon">
            <UserIcon />
          </Link>
          <button 
            className="hamburger" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
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
