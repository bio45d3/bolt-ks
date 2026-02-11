'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/lib/auth';

// Icons
const UserIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const PackageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const LocationIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export default function AccountPage() {
  const router = useRouter();
  const { user, orders, isAuthenticated, logout, updateProfile } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'profile' | 'addresses'>('overview');
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
      });
    }
  }, [mounted, isAuthenticated, router, user]);

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div style={{ padding: 100, textAlign: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return 'var(--accent-orange)';
      case 'cancelled': return '#f44336';
      default: return '#888';
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    marginBottom: 15,
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '15px 25px',
    background: isActive ? 'var(--accent-orange)' : 'transparent',
    border: isActive ? 'none' : '1px solid #ddd',
    color: isActive ? 'white' : '#666',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    cursor: 'pointer',
  });

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 120 }}>
        {/* Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="label text-orange" style={{ marginBottom: 10 }}>My Account</div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              Welcome, {user.firstName || user.email.split('@')[0]}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '15px 30px',
              background: 'transparent',
              border: '1px solid #000',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ gridColumn: 'span 12', display: 'flex', gap: 10, marginBottom: 30 }}>
          <button style={tabStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>Overview</button>
          <button style={tabStyle(activeTab === 'orders')} onClick={() => setActiveTab('orders')}>Orders</button>
          <button style={tabStyle(activeTab === 'profile')} onClick={() => setActiveTab('profile')}>Profile</button>
          <button style={tabStyle(activeTab === 'addresses')} onClick={() => setActiveTab('addresses')}>Addresses</button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <div className="card light" style={{ gridColumn: 'span 4', padding: 30 }}>
              <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 20 }}>Profile</h3>
              <p style={{ color: '#666', marginBottom: 5 }}>{user.firstName} {user.lastName}</p>
              <p style={{ color: '#666', marginBottom: 15 }}>{user.email}</p>
              <button onClick={() => setActiveTab('profile')} style={{ color: 'var(--accent-orange)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                Edit Profile →
              </button>
            </div>

            <div className="card light" style={{ gridColumn: 'span 4', padding: 30 }}>
              <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 20 }}>Recent Orders</h3>
              {orders.length === 0 ? (
                <p style={{ color: '#666' }}>No orders yet</p>
              ) : (
                <p style={{ color: '#666' }}>{orders.length} order(s)</p>
              )}
              <button onClick={() => setActiveTab('orders')} style={{ color: 'var(--accent-orange)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', marginTop: 15 }}>
                View Orders →
              </button>
            </div>

            <div className="card light" style={{ gridColumn: 'span 4', padding: 30 }}>
              <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 20 }}>Addresses</h3>
              {user.address ? (
                <p style={{ color: '#666' }}>{user.address.city}, {user.address.country}</p>
              ) : (
                <p style={{ color: '#666' }}>No addresses saved</p>
              )}
              <button onClick={() => setActiveTab('addresses')} style={{ color: 'var(--accent-orange)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', marginTop: 15 }}>
                Manage Addresses →
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card dark" style={{ gridColumn: 'span 12', padding: 40, marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 10 }}>Need Help?</h3>
                <p style={{ color: '#888' }}>Our support team is here to assist you with any questions.</p>
              </div>
              <Link
                href="/support"
                style={{
                  padding: '20px 40px',
                  background: 'var(--accent-orange)',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                }}
              >
                Contact Support
              </Link>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{ gridColumn: 'span 12' }}>
            {orders.length === 0 ? (
              <div className="card light" style={{ padding: 60, textAlign: 'center' }}>
                <div style={{ marginBottom: 20, color: '#888' }}><PackageIcon /></div>
                <h2 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 15 }}>No Orders Yet</h2>
                <p style={{ color: '#666', marginBottom: 30 }}>You haven&apos;t placed any orders yet. Start exploring our collection!</p>
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
              orders.map((order) => (
                <div key={order.id} className="card light" style={{ padding: 30, marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <div className="label" style={{ marginBottom: 5 }}>Order {order.id}</div>
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>
                        {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <span style={{
                        padding: '8px 16px',
                        background: getStatusColor(order.status),
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        borderRadius: 4,
                      }}>
                        {order.status}
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>
                        ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 15 }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ width: 80, height: 80, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain' }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="card light" style={{ gridColumn: 'span 8', padding: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
              <h2 style={{ fontWeight: 800, textTransform: 'uppercase' }}>Profile Information</h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  style={{ color: 'var(--accent-orange)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: 10 }}>First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: 10 }}>Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 10 }}>Email</label>
                  <input type="email" value={user.email} disabled style={{ ...inputStyle, background: '#f5f5f5', color: '#888' }} />
                </div>

                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 10 }}>Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+383 44 123 456"
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', gap: 15, marginTop: 20 }}>
                  <button
                    onClick={handleSaveProfile}
                    style={{
                      padding: '15px 30px',
                      background: 'var(--accent-orange)',
                      border: 'none',
                      color: 'white',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    style={{
                      padding: '15px 30px',
                      background: 'transparent',
                      border: '1px solid #ddd',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: 'grid', gap: 20 }}>
                <div>
                  <div className="label" style={{ marginBottom: 5, color: '#888' }}>Name</div>
                  <div style={{ fontSize: '1.1rem' }}>{user.firstName} {user.lastName || '—'}</div>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 5, color: '#888' }}>Email</div>
                  <div style={{ fontSize: '1.1rem' }}>{user.email}</div>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 5, color: '#888' }}>Phone</div>
                  <div style={{ fontSize: '1.1rem' }}>{user.phone || '—'}</div>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 5, color: '#888' }}>Member Since</div>
                  <div style={{ fontSize: '1.1rem' }}>
                    {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div style={{ gridColumn: 'span 12' }}>
            <div className="card light" style={{ padding: 40, textAlign: 'center' }}>
              <div style={{ marginBottom: 20, color: '#888' }}><LocationIcon /></div>
              <h2 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 15 }}>No Saved Addresses</h2>
              <p style={{ color: '#666', marginBottom: 30 }}>Add an address to speed up your checkout process.</p>
              <button
                style={{
                  padding: '20px 40px',
                  background: 'var(--accent-orange)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Add Address
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
