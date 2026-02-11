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

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  const linkStyle = (link: string) => ({
    color: activeLink === link ? 'var(--accent-orange)' : 'white',
  });

  return (
    <nav>
      <Link href="/" className="logo">BANG & OLUFSEN</Link>
      <div className="nav-links">
        <Link href="/speakers" style={linkStyle('speakers')}>Speakers</Link>
        <Link href="/headphones" style={linkStyle('headphones')}>Headphones</Link>
        <Link href="/televisions" style={linkStyle('televisions')}>Televisions</Link>
        <Link href="/support" style={linkStyle('support')}>Support</Link>
        <Link href="/cart" style={{ position: 'relative', marginLeft: 20 }}>
          🛒
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: -8,
              right: -10,
              background: 'var(--accent-orange)',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 700,
              width: 18,
              height: 18,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {totalItems}
            </span>
          )}
        </Link>
        <Link href={mounted && isAuthenticated ? '/account' : '/login'} style={{ marginLeft: 15 }}>
          {mounted && isAuthenticated ? `👤 ${user?.firstName || 'Account'}` : '👤 Sign In'}
        </Link>
      </div>
    </nav>
  );
}
