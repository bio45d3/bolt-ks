'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    router.push('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      router.push('/account');
    } else {
      setError('Invalid email or password. Password must be at least 6 characters.');
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '18px 20px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    marginBottom: 20,
  };

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

      <main style={{ paddingTop: 120, display: 'flex', justifyContent: 'center' }}>
        <div style={{ gridColumn: 'span 12', maxWidth: 480, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              Sign In
            </h1>
            <p style={{ marginTop: 15, color: '#666' }}>
              Access your Bang & Olufsen account
            </p>
          </div>

          <div className="card light" style={{ padding: 50 }}>
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ 
                  background: '#fee', 
                  border: '1px solid #fcc', 
                  color: '#c00', 
                  padding: 15, 
                  marginBottom: 20,
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}

              <div style={{ marginBottom: 5 }}>
                <label className="label" style={{ display: 'block', marginBottom: 10 }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: 5 }}>
                <label className="label" style={{ display: 'block', marginBottom: 10 }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  style={inputStyle}
                />
              </div>

              <div style={{ textAlign: 'right', marginBottom: 25 }}>
                <Link href="/forgot-password" style={{ color: 'var(--accent-orange)', fontSize: '0.9rem', textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: loading ? '#888' : 'var(--accent-orange)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div style={{ marginTop: 30, textAlign: 'center', paddingTop: 30, borderTop: '1px solid #eee' }}>
              <p style={{ color: '#666' }}>
                Don&apos;t have an account?{' '}
                <Link href="/register" style={{ color: 'var(--accent-orange)', fontWeight: 700, textDecoration: 'none' }}>
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
