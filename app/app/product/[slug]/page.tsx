'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/Toast';

// Combined product data - Updated with real B&O specifications
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
  // SPEAKERS
  'beosound-2': {
    name: 'Beosound 2',
    subtitle: 'Elegant Home Speaker',
    price: '$4,000.00',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60',
    description: 'Captivating beauty. Astonishing power.',
    longDescription: 'Captivating no matter where you place it, this powerful home speaker sounds as beautiful as it looks. Beosound 2 delivers stellar and truly powerful sound performance. Applying our Acoustic Lens Technology into the conical speaker body creates a 360-degree sound experience.',
    colors: [
      { name: 'Gold Tone', hex: '#C6A665' },
      { name: 'Black Anthracite', hex: '#2F2F2F' },
      { name: 'Natural', hex: '#C0C0C0' },
    ],
    specs: [
      { label: 'Power Output', value: '105 watts' },
      { label: 'Drivers', value: '4 (tweeter, 2 mid, woofer)' },
      { label: 'Frequency Range', value: '33 - 23,400 Hz' },
      { label: 'Room Size', value: '10-60 m²' },
      { label: 'Connectivity', value: 'WiFi, Bluetooth 5.3, AirPlay' },
    ],
    category: 'speakers',
  },
  'beosound-a9': {
    name: 'Beosound A9',
    subtitle: 'Powerful Minimalist Speaker',
    price: '$4,550.00',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=60',
    description: 'Modern meets classic. A design speaker icon.',
    longDescription: 'Sound and shape unite in this iconic, customizable speaker. Seven drivers bring the power. A century of craft brings the beauty. Beosound A9 is designed for flexibility - delivering rich, room-filling sound with an adaptable design that fits everywhere in your home.',
    colors: [
      { name: 'Century Blue', hex: '#1E3A5F' },
      { name: 'Gold Tone', hex: '#C6A665' },
      { name: 'Black Anthracite', hex: '#2F2F2F' },
      { name: 'Natural Oak', hex: '#8B7355' },
    ],
    specs: [
      { label: 'Power Output', value: '480 watts' },
      { label: 'Drivers', value: '7 custom drivers' },
      { label: 'Woofer', value: '8-inch' },
      { label: 'Connectivity', value: 'WiFi, Bluetooth 5.3, AirPlay 2' },
      { label: 'Diameter', value: '70.1 cm' },
    ],
    category: 'speakers',
  },
  'beosound-balance': {
    name: 'Beosound Balance',
    subtitle: 'Outstanding Living Room Speaker',
    price: '$3,650.00',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60',
    description: 'Intelligent 360° sound. Fill any room.',
    longDescription: 'Opulent, tactile materials crafted to last. Fill any room with powerful, omnidirectional sound. Beosound Balance is a design statement with the smarts to match. Features Google Assistant built-in for voice control.',
    colors: [
      { name: 'Natural Oak', hex: '#8B7355' },
      { name: 'Black Oak', hex: '#2F2F2F' },
    ],
    specs: [
      { label: 'Power Output', value: '200 watts' },
      { label: 'Drivers', value: '7 (2 tweeters, 2 mid, 2 bass, 1 woofer)' },
      { label: 'Voice Assistant', value: 'Google Assistant' },
      { label: 'Connectivity', value: 'WiFi, Bluetooth 5.0, AirPlay 2' },
      { label: 'Dimensions', value: '38.7 x 20 cm' },
    ],
    category: 'speakers',
  },
  'beolab-28': {
    name: 'Beolab 28',
    subtitle: 'Hi-Fidelity Wireless Speakers',
    price: '$22,050.00',
    image: 'https://images.unsplash.com/photo-1593078165899-c7d2ac0d6aea?w=800&auto=format&fit=crop&q=60',
    description: 'Wall mounted or floor-standing. Redefined.',
    longDescription: 'Wall mounted. Floor-standing. It\'s your choice. Slim, iconic speakers that enhance every space with hi-res sound. Designed with complete flexibility in mind. Effortlessly connect your Bang & Olufsen speakers to any audio system.',
    colors: [
      { name: 'Natural Aluminium', hex: '#C0C0C0' },
      { name: 'Black Anthracite', hex: '#2F2F2F' },
      { name: 'Light Oak', hex: '#D4B896' },
    ],
    specs: [
      { label: 'Power Output', value: '645 watts per speaker' },
      { label: 'Drivers', value: '3-way system' },
      { label: 'Frequency Range', value: '33 - 23,500 Hz' },
      { label: 'Active Room Comp', value: 'Yes' },
      { label: 'Height', value: '120 cm' },
    ],
    category: 'speakers',
  },
  'beolab-90': {
    name: 'Beolab 90',
    subtitle: 'Flagship Loudspeaker',
    price: '$80,000.00',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&auto=format&fit=crop&q=60',
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
  
  // HEADPHONES
  'beoplay-h95': {
    name: 'Beoplay H95',
    subtitle: 'Premium Over-Ear Headphones',
    price: '$1,250.00',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    description: 'Immersive noise-cancelling. Hear every detail.',
    longDescription: 'Moving. Meticulous. Mesmerising. Immersive, adjustable noise-cancelling headphones for on-the-go and stay-at-home listening. Premium lambskin memory foam provides unparalleled comfort while custom titanium drivers deliver exceptional clarity.',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gold Tone', hex: '#C6A665' },
      { name: 'Grey Mist', hex: '#808080' },
      { name: 'Nordic Ice', hex: '#E8E4DE' },
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
  'beoplay-hx': {
    name: 'Beoplay HX',
    subtitle: 'Comfortable ANC Headphones',
    price: '$499.00',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60',
    description: 'All-day comfort. Premium sound.',
    longDescription: 'Experience premium Bang & Olufsen sound with class-leading Active Noise Cancellation. Designed for all-day comfort with memory foam ear cushions and lightweight construction. Up to 35 hours of battery life.',
    colors: [
      { name: 'Black Anthracite', hex: '#2F2F2F' },
      { name: 'Sand', hex: '#C4B9A9' },
      { name: 'Timber', hex: '#4A3728' },
    ],
    specs: [
      { label: 'Driver', value: '40mm custom' },
      { label: 'Battery Life', value: '35 hours (ANC on)' },
      { label: 'ANC', value: 'Adaptive Active' },
      { label: 'Bluetooth', value: '5.1' },
      { label: 'Weight', value: '285g' },
    ],
    category: 'headphones',
  },
  'beoplay-portal': {
    name: 'Beoplay Portal',
    subtitle: 'Gaming & Entertainment Headset',
    price: '$599.00',
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&auto=format&fit=crop&q=60',
    description: 'Immersive gaming. Superior sound.',
    longDescription: 'Wireless gaming headphones with Bang & Olufsen Signature Sound. Features low-latency connection for gaming and premium Active Noise Cancellation for everyday use. Dual-mode for Xbox/PC wireless and Bluetooth.',
    colors: [
      { name: 'Black Anthracite', hex: '#2F2F2F' },
      { name: 'Grey Mist', hex: '#808080' },
      { name: 'Navy', hex: '#1E3A5F' },
    ],
    specs: [
      { label: 'Driver', value: '40mm custom' },
      { label: 'Battery Life', value: '42 hours' },
      { label: 'Latency', value: 'Ultra-low wireless' },
      { label: 'Connectivity', value: 'Xbox/PC + Bluetooth 5.1' },
      { label: 'Weight', value: '282g' },
    ],
    category: 'headphones',
  },
  
  // TELEVISIONS
  'beovision-harmony': {
    name: 'Beovision Harmony',
    subtitle: '77" OLED TV',
    price: '$18,590.00',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=60',
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
    subtitle: '83" OLED Cinema',
    price: '$24,990.00',
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&auto=format&fit=crop&q=60',
    description: 'OLED with Dolby Atmos soundbar',
    longDescription: 'Beovision Theatre delivers the ultimate home cinema experience. The massive 83" OLED display provides breathtaking detail, while the integrated Dolby Atmos soundbar creates an immersive 3D sound field. Perfect for movie enthusiasts.',
    colors: [
      { name: 'Anthracite', hex: '#2F2F2F' },
      { name: 'Aluminium', hex: '#C0C0C0' },
    ],
    specs: [
      { label: 'Screen Size', value: '83 inches' },
      { label: 'Resolution', value: '4K OLED' },
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
      <Navigation activeLink="shop" />

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
