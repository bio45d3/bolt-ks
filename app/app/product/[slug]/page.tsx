'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/Toast';

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
  'beovision-harmony': {
    name: 'Beovision Harmony',
    subtitle: '77" OLED TV',
    price: '$18,590.00',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39244.png',
    description: 'OLED TV with motorized oak & aluminium stand',
    longDescription: 'Beovision Harmony is a masterpiece of design and technology. The 77" OLED display delivers stunning picture quality, while the motorized oak and aluminium stand creates a theatrical reveal. Integrated sound system with Dolby Atmos for an immersive experience.',
    colors: [
      { name: 'Oak/Aluminium', hex: '#8B4513' },
      { name: 'Grey/Aluminium', hex: '#C0C0C0' },
    ],
    specs: [
      { label: 'Screen Size', value: '77 inches' },
      { label: 'Resolution', value: '4K OLED' },
      { label: 'Sound', value: 'Integrated soundbar' },
      { label: 'Stand', value: 'Motorized' },
      { label: 'HDR', value: 'Dolby Vision, HDR10' },
    ],
    category: 'televisions',
  },
  'beovision-contour': {
    name: 'Beovision Contour',
    subtitle: '55" OLED All-in-One',
    price: '$7,990.00',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39233.png',
    description: 'OLED TV with integrated soundbar',
    longDescription: 'Beovision Contour combines a stunning 55" OLED display with a powerful integrated soundbar. The slim profile and premium materials make it a beautiful addition to any room, while delivering exceptional picture and sound quality.',
    colors: [
      { name: 'Aluminium', hex: '#C0C0C0' },
      { name: 'Black', hex: '#000000' },
    ],
    specs: [
      { label: 'Screen Size', value: '55 inches' },
      { label: 'Resolution', value: '4K OLED' },
      { label: 'Sound', value: '450W integrated' },
      { label: 'Speakers', value: '11 drivers' },
      { label: 'Smart TV', value: 'webOS' },
    ],
    category: 'televisions',
  },
  'beovision-theatre': {
    name: 'Beovision Theatre',
    subtitle: '83" 8K OLED Cinema',
    price: '$24,990.00',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39252.png',
    description: '8K OLED with Dolby Atmos soundbar',
    longDescription: 'Beovision Theatre delivers the ultimate home cinema experience. The massive 83" 8K OLED display provides breathtaking detail, while the integrated Dolby Atmos soundbar creates an immersive 3D sound field. Perfect for movie enthusiasts.',
    colors: [
      { name: 'Anthracite', hex: '#2F2F2F' },
      { name: 'Aluminium', hex: '#C0C0C0' },
    ],
    specs: [
      { label: 'Screen Size', value: '83 inches' },
      { label: 'Resolution', value: '8K OLED' },
      { label: 'Sound', value: 'Dolby Atmos' },
      { label: 'Soundbar', value: 'Integrated 12ch' },
      { label: 'HDMI', value: '4x HDMI 2.1' },
    ],
    category: 'televisions',
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
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    const priceNum = parseFloat(product.price.replace(/[$,]/g, ''));
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: slug,
        name: product.name,
        price: priceNum,
        image: product.image,
        color: product.colors[selectedColor].name,
      });
    }
    setAdded(true);
    addToast(`${product.name} added to cart!`, 'success');
    setTimeout(() => setAdded(false), 2000);
  };

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
      <Navigation activeLink={product.category as 'speakers' | 'headphones' | 'televisions'} />

      <main style={{ paddingTop: 100 }}>
        {/* Breadcrumb */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20, padding: '0 10px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#888' }}>/</span>
            <Link href={`/${product.category}`} style={{ color: '#888', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category}</Link>
            <span style={{ color: '#888' }}>/</span>
            <span style={{ color: 'var(--accent-orange)' }}>{product.name}</span>
          </div>
        </div>

        {/* Product Layout */}
        <div className="product-layout" style={{ gridColumn: 'span 12' }}>
          {/* Product Image */}
          <div className="card dark product-image-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="product-bg-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(8rem, 20vw, 20rem)', fontWeight: 900, opacity: 0.1, color: 'var(--accent-orange)', whiteSpace: 'nowrap' }}>
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
          <div className="product-info">
            <div className="label text-orange" style={{ marginBottom: 10 }}>{product.subtitle}</div>
            <h1 className="product-title">
              {product.name}
            </h1>
            
            <p className="product-desc" style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6, marginBottom: 30 }}>
              {product.longDescription}
            </p>

            {/* Price */}
            <div className="product-price">
              {product.price}
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: 30 }}>
              <div className="label" style={{ marginBottom: 15 }}>Color: {product.colors[selectedColor].name}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
              onClick={handleAddToCart}
              className="product-btn"
              style={{
                width: '100%',
                padding: '20px 40px',
                background: added ? '#4CAF50' : 'var(--accent-orange)',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginBottom: 15,
                transition: 'background 0.3s ease',
              }}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            
            <Link
              href="/cart"
              className="product-btn"
              style={{
                display: 'block',
                width: '100%',
                padding: '20px 40px',
                background: '#000',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                textAlign: 'center',
                textDecoration: 'none',
                marginBottom: 15,
                boxSizing: 'border-box',
              }}
            >
              View Cart
            </Link>
            
            <button
              className="product-btn"
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
        </div>

        {/* Specifications */}
        <div className="card light" style={{ gridColumn: 'span 12', padding: 'clamp(30px, 5vw, 60px)', marginTop: 20 }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>
            Specifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'clamp(15px, 3vw, 30px)' }}>
            {product.specs.map((spec, i) => (
              <div key={i}>
                <div className="label" style={{ marginBottom: 8, color: '#888' }}>{spec.label}</div>
                <div style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 600 }}>{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
