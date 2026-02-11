import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--card-dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '15rem',
        fontWeight: 900,
        color: 'var(--accent-orange)',
        lineHeight: 0.8,
        marginBottom: 20,
      }}>
        404
      </div>
      
      <h1 style={{
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        marginBottom: 15,
      }}>
        Page Not Found
      </h1>
      
      <p style={{
        color: '#888',
        fontSize: '1.1rem',
        maxWidth: 400,
        marginBottom: 40,
        lineHeight: 1.6,
      }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>

      <div style={{ display: 'flex', gap: 15 }}>
        <Link
          href="/"
          style={{
            padding: '18px 40px',
            background: 'var(--accent-orange)',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 800,
            textTransform: 'uppercase',
          }}
        >
          Go Home
        </Link>
        <Link
          href="/support"
          style={{
            padding: '18px 40px',
            background: 'transparent',
            border: '1px solid #444',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 800,
            textTransform: 'uppercase',
          }}
        >
          Get Help
        </Link>
      </div>
    </div>
  );
}
