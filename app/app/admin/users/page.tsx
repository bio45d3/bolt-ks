'use client';

import Link from 'next/link';
import { useState } from 'react';

// Mock users data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', orders: 5, spent: 12450, joined: '2024-01-15', role: 'user' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: 4597, joined: '2024-01-20', role: 'user' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', orders: 1, spent: 18590, joined: '2024-02-01', role: 'user' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', orders: 8, spent: 8792, joined: '2023-12-10', role: 'user' },
  { id: '5', name: 'Admin User', email: 'admin@bolt-ks.com', orders: 0, spent: 0, joined: '2023-11-01', role: 'admin' },
  { id: '6', name: 'Charlie Davis', email: 'charlie@example.com', orders: 2, spent: 3898, joined: '2024-02-05', role: 'user' },
];

export default function AdminUsersPage() {
  const [users] = useState(mockUsers);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav style={{ background: '#000', mixBlendMode: 'normal' }}>
        <Link href="/" className="logo" style={{ color: 'white' }}>BANG & OLUFSEN</Link>
        <div className="nav-links">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/users" style={{ color: 'var(--accent-orange)' }}>Users</Link>
          <Link href="/" style={{ marginLeft: 20 }}>← Back to Store</Link>
        </div>
      </nav>

      <main style={{ paddingTop: 120, background: '#f5f5f5', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="label text-orange" style={{ marginBottom: 10 }}>Admin Panel</div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
              Users
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 15 }}>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '12px 20px',
                border: '1px solid #ddd',
                width: 250,
                fontSize: '0.95rem',
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="card dark" style={{ gridColumn: 'span 4', padding: 25 }}>
          <div className="label" style={{ color: '#888' }}>Total Users</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{users.length}</div>
        </div>
        <div className="card dark" style={{ gridColumn: 'span 4', padding: 25 }}>
          <div className="label" style={{ color: '#888' }}>Total Spent</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
            ${users.reduce((sum, u) => sum + u.spent, 0).toLocaleString()}
          </div>
        </div>
        <div className="card dark" style={{ gridColumn: 'span 4', padding: 25 }}>
          <div className="label" style={{ color: '#888' }}>Admins</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            {users.filter(u => u.role === 'admin').length}
          </div>
        </div>

        {/* Users Table */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 0, overflow: 'hidden', marginTop: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>User</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Orders</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Total Spent</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Role</th>
                <th style={{ textAlign: 'left', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Joined</th>
                <th style={{ textAlign: 'right', padding: '15px 20px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: user.role === 'admin' ? 'var(--accent-orange)' : '#ddd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: user.role === 'admin' ? 'white' : '#666',
                      }}>
                        {user.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px', color: '#666' }}>{user.email}</td>
                  <td style={{ padding: '20px', fontWeight: 600 }}>{user.orders}</td>
                  <td style={{ padding: '20px', fontWeight: 700 }}>${user.spent.toLocaleString()}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{
                      padding: '5px 12px',
                      background: user.role === 'admin' ? 'var(--accent-orange)' : '#eee',
                      color: user.role === 'admin' ? 'white' : '#666',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      borderRadius: 4,
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '20px', color: '#888' }}>{user.joined}</td>
                  <td style={{ padding: '20px', textAlign: 'right' }}>
                    <button style={{ color: 'var(--accent-orange)', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', marginRight: 15 }}>
                      View
                    </button>
                    <button style={{ color: '#888', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                      Edit Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
