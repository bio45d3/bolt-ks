'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
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
  letter: string;
}> = {
  // SPEAKERS
  'beosound-2': {
    name: 'Beosound 2',
    subtitle: 'Elegant Home Speaker',
    price: '$4,000.00',
    image: 'https://pngimg.com/d/wireless_speaker_PNG18.png',
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
    letter: '2',
  },
  'beosound-a9': {
    name: 'Beosound A9',
    subtitle: 'Powerful Minimalist Speaker',
    price: '$4,550.00',
    image: 'https://pngimg.com/d/wireless_speaker_PNG18.png',
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
    letter: 'A9',
  },
  'beosound-balance': {
    name: 'Beosound Balance',
    subtitle: 'Outstanding Living Room Speaker',
    price: '$3,650.00',
    image: 'https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG36.png',
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
    letter: 'BL',
  },
  'beolab-28': {
    name: 'Beolab 28',
    subtitle: 'Hi-Fidelity Wireless Speakers',
    price: '$22,050.00',
    image: 'https://pngimg.com/uploads/loudspeaker/loudspeaker_PNG101569.png',
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
    letter: '28',
  },
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
    letter: '90',
  },
  
  // HEADPHONES
  'beoplay-h95': {
    name: 'Beoplay H95',
    subtitle: 'Premium Over-Ear Headphones',
    price: '$1,250.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
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
    letter: 'H95',
  },
  'beoplay-hx': {
    name: 'Beoplay HX',
    subtitle: 'Comfortable ANC Headphones',
    price: '$499.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
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
    letter: 'HX',
  },
  'beoplay-portal': {
    name: 'Beoplay Portal',
    subtitle: 'Gaming & Entertainment Headset',
    price: '$599.00',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG7645.png',
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
    letter: 'P',
  },
  
  // TELEVISIONS
  'beovision-harmony': {
    name: 'Beovision Harmony',
    subtitle: '77" OLED TV',
    price: '$18,590.00',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39225.png',
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
    letter: '77"',
  },
  'beovision-contour': {
    name: 'Beovision Contour',
    subtitle: '55" OLED All-in-One',
    price: '$7,990.00',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39225.png',
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
    letter: '55"',
  },
  'beovision-theatre': {
    name: 'Beovision Theatre',
    subtitle: '83" OLED Cinema',
    price: '$24,990.00',
    image: 'https://pngimg.com/uploads/tv/tv_PNG39225.png',
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
    letter: '83"',
  },
  // Additional products for other pages
  'beolit-20': {
    name: 'Beolit 20',
    subtitle: 'Portable Power',
    price: '$549.00',
    image: 'https://pngimg.com/uploads/bluetooth_speaker/bluetooth_speaker_PNG36.png',
    description: 'Big sound for every moment.',
    longDescription: 'Take powerful, portable Bang & Olufsen sound wherever you go. Beolit 20 features integrated wireless Qi charging and up to 8 hours of battery life for all-day listening.',
    colors: [
      { name: 'Black Anthracite', hex: '#2F2F2F' },
      { name: 'Grey Mist', hex: '#808080' },
    ],
    specs: [
      { label: 'Power Output', value: '70 watts' },
      { label: 'Battery Life', value: '8 hours' },
      { label: 'Qi Charging', value: 'Yes' },
      { label: 'Bluetooth', value: '5.0' },
      { label: 'Weight', value: '2.7 kg' },
    ],
    category: 'speakers',
    letter: '20',
  },
};

function ColorDot({ color, selected, onClick }: { color: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: selected ? 36 : 28,
        height: selected ? 36 : 28,
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
      <>
        <Navigation />
        <main>
          <div className="card dark" style={{ gridColumn: 'span 12', height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className="overlay-text" style={{ fontSize: '3rem', marginBottom: 20 }}>
              PRODUCT<br /><span className="text-orange">NOT FOUND</span>
            </h1>
            <Link href="/shop" style={{ color: 'var(--accent-orange)', textDecoration: 'none', fontWeight: 700 }}>
              ← Return to Shop
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation activeLink="shop" />

      <main>
        {/* Breadcrumb */}
        <div style={{ gridColumn: 'span 12', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#888' }}>/</span>
            <Link href={`/${product.category}`} style={{ color: '#888', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category}</Link>
            <span style={{ color: '#888' }}>/</span>
            <span style={{ color: 'var(--accent-orange)' }}>{product.name}</span>
          </div>
        </div>

        {/* Product Image */}
        <div className="card dark" style={{ gridColumn: 'span 7', height: '70vh', minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(10rem, 25vw, 25rem)', fontWeight: 900, opacity: 0.1, color: 'var(--accent-orange)', pointerEvents: 'none' }}>
            {product.letter}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            style={{ maxWidth: '60%', maxHeight: '70%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))', zIndex: 2 }}
          />
        </div>

        {/* Product Info */}
        <div style={{ gridColumn: 'span 5', padding: '20px 0' }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>{product.subtitle}</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 20 }}>
            {product.name}
          </h1>
          
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, marginBottom: 25 }}>
            {product.longDescription}
          </p>

          {/* Price */}
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 30 }}>
            {product.price}
          </div>

          {/* Color Selection */}
          <div style={{ marginBottom: 25 }}>
            <div className="label" style={{ marginBottom: 12 }}>Color: <span className="text-orange">{product.colors[selectedColor].name}</span></div>
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
          <div style={{ marginBottom: 25 }}>
            <div className="label" style={{ marginBottom: 12 }}>Quantity</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: 44, height: 44, border: '1px solid #000', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                −
              </button>
              <span style={{ fontSize: '1.3rem', fontWeight: 600, width: 40, textAlign: 'center' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{ width: 44, height: 44, border: '1px solid #000', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={handleAddToCart}
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
              marginBottom: 12,
              transition: 'background 0.3s ease',
            }}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
          
          <Link
            href="/cart"
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
              marginBottom: 12,
              boxSizing: 'border-box',
            }}
          >
            View Cart
          </Link>
          
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
        <div className="card light" style={{ gridColumn: 'span 12', padding: 'clamp(30px, 5vw, 60px)', marginTop: 20, position: 'relative', overflow: 'hidden' }}>
          <div className="orange-shape shape-rect" style={{ width: '30%', height: '150%', left: 'auto', right: '-10%', transform: 'rotate(15deg)', opacity: 0.3 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="label text-orange" style={{ marginBottom: 10 }}>Technical</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30, lineHeight: 0.9 }}>
              Specifications
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'clamp(20px, 4vw, 40px)' }}>
              {product.specs.map((spec, i) => (
                <div key={i}>
                  <div className="label" style={{ marginBottom: 8, color: '#888' }}>{spec.label}</div>
                  <div style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 700 }}>{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card dark" style={{ gridColumn: 'span 12', padding: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: '50%', transform: 'translateY(-50%)', fontSize: '12rem', fontWeight: 900, opacity: 0.1, pointerEvents: 'none', color: 'var(--accent-orange)' }}>
            B&O
          </div>
          <div style={{ flex: 1, zIndex: 2 }}>
            <div className="label text-orange">Experience</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginTop: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Visit Our<br />Showroom
            </h2>
            <p style={{ marginTop: 15, color: '#888', maxWidth: 350 }}>
              See and hear the {product.name} in person at our Pristina showroom.
            </p>
          </div>
          <div style={{ zIndex: 2 }}>
            <Link
              href="/support"
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
              Find Location
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
