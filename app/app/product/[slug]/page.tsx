'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Combined product data
const products: Record<string, {
  name: string;
  subtitle: string;
  price: string;
  image: string;
  description: string;
  longDescription: string;
  colors: { name: string; hex: string }[];
  specs: { label: string; value: string }[];
  category: string;
}> = {
  'beolab-90': {
    name: 'Beolab 90',
    subtitle: 'Flagship Loudspeaker',
    price: '$80,000.00',
    image: 'https://pngimg.com/uploads/loudspeaker/loudspeaker_PNG101569.png',
    description: 'The pinnacle of acoustic engineering',
    longDescription: 'Beolab 90 is the most advanced loudspeaker Bang & Olufsen has ever created. With 18 carefully positioned drivers and 8,200 watts of power, it delivers an unprecedented listening experience with Active Room Compensation technology that adapts to your space.',
    colors: [
      { name: 'Natural Aluminium', hex: '#C0C0C0' },
      { name: 'Black', hex: '#000000' },
    ],
    specs: [
      { label: 'Power Output', value: '8,200 watts' },
      { label: 'Drivers', value: '18 custom drivers' },
      { label: 'Frequency Range', value: '14 Hz - 49,200 Hz' },
      { label: 'Height', value: '128 cm' },
      { label: 'Weight', value: '137 kg' },
    ],
    category: 'speakers',
  },
  'beoplay-a9': {
    name: 'Beoplay A9',
    subtitle: 'Iconic Wireless Speaker',
    price: '$2,999.00',
    image: 'https://pngimg.com/d/wireless_speaker_PNG18.png',
    description: 'Iconic design meets powerful sound',
    longDescription: 'The iconic Beoplay A9 combines stunning Scandinavian design with room-filling 480-watt sound. Features built-in Google Assistant, Apple AirPlay 2, and Chromecast for seamless streaming.',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Walnut', hex: '#8B4513' },
    ],
    specs: [
      { label: 'Power Output', value: '480 watts' },
      { label: 'Woofer', value: '8-inch' },
      { label: 'Connectivity', value: 'WiFi, Bluetooth 5.0, AirPlay 2' },
      { label: 'Diameter', value: '70.1 cm' },
      { label: 'Weight', value: '14.7 kg' },
    ],
    category: 'speakers',
  },
  'beoplay-h95': {
    name: 'Beoplay H95',
    subtitle: 'Premium ANC Headphones',
    price: '$899.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
    description: 'Ultimate over-ear with titanium drivers',
    longDescription: 'Beoplay H95 represents the pinnacle of headphone engineering. Custom titanium drivers deliver exceptional clarity, while advanced Adaptive Active Noise Cancellation ensures perfect silence. Premium lambskin memory foam provides unparalleled comfort for all-day listening.',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gold Tone', hex: '#C6A665' },
      { name: 'Grey Mist', hex: '#808080' },
    ],
    specs: [
      { label: 'Driver', value: '40mm titanium' },
      { label: 'Battery Life', value: '38 hours (ANC on)' },
      { label: 'ANC', value: 'Adaptive Active' },
      { label: 'Bluetooth', value: '5.1 with aptX Adaptive' },
      { label: 'Weight', value: '323g' },
    ],
    category: 'headphones',
  },
  'beolit-20': {
    name: 'Beolit 20',
    subtitle: 'Portable Powerhouse',
    price: '$549.00',
    image: 'https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG36.png',
    description: 'Powerful portable speaker with Qi charging',
    longDescription: 'Beolit 20 delivers powerful, room-filling True360 sound in a portable package. Features built-in Qi wireless charging to power your phone, and up to 8 hours of playtime at typical listening levels.',
    colors: [
      { name: 'Black Anthracite', hex: '#2F2F2F' },
      { name: 'Grey Mist', hex: '#A0A0A0' },
    ],
    specs: [
      { label: 'Power Output', value: '70 watts' },
      { label: 'Battery Life', value: 'Up to 8 hours' },
      { label: 'Qi Charging', value: 'Built-in' },
      { label: 'Bluetooth', value: '5.0' },
      { label: 'Weight', value: '2.7 kg' },
    ],
    category: 'speakers',
  },
};

function ColorDot({ color, selected, onClick }: { color: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: selected ? 32 : 24,
        height: selected ? 32 : 24,
        borderRadius: '50%',
        background: color,
        border: selected ? '3px solid var(--accent-orange)' : '2px solid rgba(0,0,0,0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    />
  );
}

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products[slug];
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div style={{ padding: 100, textAlign: 'center' }}>
        <h1>Product not found</h1>
        <Link href="/" style={{ color: 'var(--accent-orange)' }}>Return home</Link>
      </div>
    );
  }

  return (
    <>
      <nav>
        <Link href="/" className="logo">BANG & OLUFSEN</Link>
        <div className="nav-links">
          <Link href="/speakers" style={{ color: product.category === 'speakers' ? 'var(--accent-orange)' : 'white' }}>Speakers</Link>
          <Link href="/headphones" style={{ color: product.category === 'headphones' ? 'var(--accent-orange)' : 'white' }}>Headphones</Link>
          <Link href="/televisions">Televisions</Link>
          <Link href="/support">Support</Link>
        </div>
      </nav>

      <main style={{ paddingTop: 120 }}>
        {/* Breadcrumb */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.85rem' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#888' }}>/</span>
            <Link href={`/${product.category}`} style={{ color: '#888', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category}</Link>
            <span style={{ color: '#888' }}>/</span>
            <span style={{ color: 'var(--accent-orange)' }}>{product.name}</span>
          </div>
        </div>

        {/* Product Image */}
        <div className="card dark" style={{ gridColumn: 'span 7', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20rem', fontWeight: 900, opacity: 0.1, color: 'var(--accent-orange)' }}>
            {product.name.split(' ')[1]?.substring(0, 2) || product.name.substring(0, 2)}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            style={{ maxWidth: '70%', maxHeight: '80%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))', zIndex: 2 }}
          />
        </div>

        {/* Product Info */}
        <div style={{ gridColumn: 'span 5', padding: '0 20px' }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>{product.subtitle}</div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 20 }}>
            {product.name}
          </h1>
          
          <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6, marginBottom: 30 }}>
            {product.longDescription}
          </p>

          {/* Price */}
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 30 }}>
            {product.price}
          </div>

          {/* Color Selection */}
          <div style={{ marginBottom: 30 }}>
            <div className="label" style={{ marginBottom: 15 }}>Color: {product.colors[selectedColor].name}</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {product.colors.map((color, i) => (
                <ColorDot
                  key={i}
                  color={color.hex}
                  selected={selectedColor === i}
                  onClick={() => setSelectedColor(i)}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 30 }}>
            <div className="label" style={{ marginBottom: 15 }}>Quantity</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: 40, height: 40, border: '1px solid #000', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                −
              </button>
              <span style={{ fontSize: '1.2rem', fontWeight: 600, width: 40, textAlign: 'center' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{ width: 40, height: 40, border: '1px solid #000', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            style={{
              width: '100%',
              padding: '20px 40px',
              background: 'var(--accent-orange)',
              border: 'none',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: 15,
            }}
          >
            Add to Cart
          </button>
          
          <button
            style={{
              width: '100%',
              padding: '20px 40px',
              background: 'transparent',
              border: '1px solid #000',
              color: '#000',
              fontSize: '1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Find in Store
          </button>
        </div>

        {/* Specifications */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 60, marginTop: 20 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>
            Specifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 30 }}>
            {product.specs.map((spec, i) => (
              <div key={i}>
                <div className="label" style={{ marginBottom: 8, color: '#888' }}>{spec.label}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
