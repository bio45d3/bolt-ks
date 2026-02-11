'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const success = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    
    if (success) {
      router.push('/account');
    } else {
      setError('Registration failed. Please try again.');
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
      <Navigation />

      <main style={{ paddingTop: 120, display: 'flex', justifyContent: 'center' }}>
        <div style={{ gridColumn: 'span 12', maxWidth: 480, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              Create Account
            </h1>
            <p style={{ marginTop: 15, color: '#666' }}>
              Join the Bang & Olufsen community
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 10 }}>First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 10 }}>Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="label" style={{ display: 'block', marginBottom: 10 }}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="label" style={{ display: 'block', marginBottom: 10 }}>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="label" style={{ display: 'block', marginBottom: 10 }}>Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: 25, fontSize: '0.85rem', color: '#666' }}>
                By creating an account, you agree to our{' '}
                <Link href="/terms" style={{ color: 'var(--accent-orange)', textDecoration: 'none' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" style={{ color: 'var(--accent-orange)', textDecoration: 'none' }}>Privacy Policy</Link>.
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
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div style={{ marginTop: 30, textAlign: 'center', paddingTop: 30, borderTop: '1px solid #eee' }}>
              <p style={{ color: '#666' }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: 'var(--accent-orange)', fontWeight: 700, textDecoration: 'none' }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
