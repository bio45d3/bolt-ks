'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Kosovo',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ padding: 100, textAlign: 'center' }}>Loading...</div>;
  }

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const total = getTotalPrice();
  const shipping = total > 500 ? 0 : 49;
  const tax = total * 0.18; // 18% VAT for Kosovo
  const grandTotal = total + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    router.push('/checkout/success');
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

  return (
    <>
      <Navigation />

      <main style={{ paddingTop: 120 }}>
        {/* Breadcrumb */}
        <div style={{ gridColumn: 'span 12', marginBottom: 30 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.85rem' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#888' }}>/</span>
            <Link href="/cart" style={{ color: '#888', textDecoration: 'none' }}>Cart</Link>
            <span style={{ color: '#888' }}>/</span>
            <span style={{ color: 'var(--accent-orange)' }}>Checkout</span>
          </div>
        </div>

        {/* Page Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 40 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Checkout
          </h1>
          
          {/* Steps */}
          <div style={{ display: 'flex', gap: 40, marginTop: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: step >= 1 ? 'var(--accent-orange)' : '#ddd',
                color: step >= 1 ? 'white' : '#888',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.9rem'
              }}>1</div>
              <span style={{ fontWeight: step === 1 ? 700 : 400 }}>Shipping</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: step >= 2 ? 'var(--accent-orange)' : '#ddd',
                color: step >= 2 ? 'white' : '#888',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.9rem'
              }}>2</div>
              <span style={{ fontWeight: step === 2 ? 700 : 400 }}>Payment</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{ gridColumn: 'span 7' }}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="card light" style={{ padding: 40 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>
                  Shipping Information
                </h2>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 15 }}>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                </div>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, background: 'white' }}
                >
                  <option value="Kosovo">Kosovo</option>
                  <option value="Albania">Albania</option>
                  <option value="North Macedonia">North Macedonia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Serbia">Serbia</option>
                </select>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'var(--accent-orange)',
                    border: 'none',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: 15,
                  }}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="card light" style={{ padding: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    Payment
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-orange)', cursor: 'pointer', fontWeight: 700 }}
                  >
                    ← Edit Shipping
                  </button>
                </div>

                {/* Shipping Summary */}
                <div style={{ background: '#f5f5f5', padding: 20, marginBottom: 30, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 5 }}>Shipping to:</div>
                  <div style={{ fontWeight: 600 }}>{formData.firstName} {formData.lastName}</div>
                  <div style={{ color: '#666' }}>{formData.address}, {formData.city} {formData.postalCode}</div>
                  <div style={{ color: '#666' }}>{formData.country}</div>
                </div>

                <div className="label" style={{ marginBottom: 15 }}>Card Information</div>

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM / YY"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="cardCvc"
                    placeholder="CVC"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: isProcessing ? '#888' : 'var(--accent-orange)',
                    border: 'none',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    marginTop: 15,
                  }}
                >
                  {isProcessing ? 'Processing...' : `Pay $${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                </button>

                <div style={{ marginTop: 20, textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
                  🔒 Your payment information is secure and encrypted
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ gridColumn: 'span 5' }}>
          <div className="card dark" style={{ padding: 40 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>
              Order Summary
            </h2>

            {/* Items */}
            {items.map((item) => (
              <div key={`${item.id}-${item.color}`} style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
                <div style={{ width: 60, height: 60, background: '#2a2a2a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 600 }}>
                  ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #333', marginTop: 20, paddingTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, color: '#888' }}>
                <span>Subtotal</span>
                <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, color: '#888' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, color: '#888' }}>
                <span>VAT (18%)</span>
                <span>${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #333', paddingTop: 15, marginTop: 15, display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
              <span>Total</span>
              <span>${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
