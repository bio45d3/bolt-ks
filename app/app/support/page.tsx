'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const faqs = [
  {
    question: 'What is the warranty period for Bang & Olufsen products?',
    answer: 'All Bang & Olufsen products come with a 2-year manufacturer warranty. Extended warranty options are available at the time of purchase.',
  },
  {
    question: 'Do you offer installation services?',
    answer: 'Yes, we provide professional installation services for all our products in Kosovo. Our certified technicians will ensure optimal setup and calibration for the best audio-visual experience.',
  },
  {
    question: 'Can I return or exchange a product?',
    answer: 'We offer a 30-day return policy for unused products in original packaging. Custom orders and personalized items are final sale.',
  },
  {
    question: 'How do I pair my Bang & Olufsen speaker with my device?',
    answer: 'Most of our speakers support Bluetooth, AirPlay 2, and Chromecast. Download the Bang & Olufsen app for easy setup and to access additional features like multi-room audio.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship within Kosovo and neighboring countries (Albania, North Macedonia, Montenegro). International shipping may be available upon request.',
  },
  {
    question: 'How can I get my product repaired?',
    answer: 'Contact our support team to arrange a repair. We have certified service centers in Pristina and can arrange pickup for your convenience.',
  },
];

const quickLinks = [
  { icon: '📦', title: 'Track Order', desc: 'Check your order status', letter: '01' },
  { icon: '🔧', title: 'Repairs', desc: 'Schedule a repair', letter: '02' },
  { icon: '📱', title: 'App Support', desc: 'Get help with the app', letter: '03' },
  { icon: '📍', title: 'Find Store', desc: 'Visit our showroom', letter: '04' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Navigation activeLink="support" />

      <main>
        {/* Hero Header */}
        <div className="card dark" style={{ gridColumn: 'span 12', height: '40vh', minHeight: 300, position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(8rem, 20vw, 18rem)', fontWeight: 900, color: 'var(--accent-orange)', opacity: 0.15, pointerEvents: 'none' }}>
            HELP
          </div>
          <div className="hero-content" style={{ height: '100%', justifyContent: 'center' }}>
            <div className="label text-orange" style={{ marginBottom: 15 }}>Help Center</div>
            <h1 className="overlay-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: 15 }}>
              WE&apos;RE HERE<br />
              <span className="text-orange">TO HELP</span>
            </h1>
            <p style={{ color: '#888', maxWidth: 500, fontSize: '1rem' }}>
              Get the most out of your premium audio experience.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        {quickLinks.map((item, i) => (
          <div 
            key={i} 
            className={`card ${i % 2 === 0 ? 'light' : 'dark'}`}
            style={{ 
              gridColumn: 'span 3', 
              height: 220, 
              padding: 25, 
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ 
              position: 'absolute', 
              bottom: -20, 
              right: -10, 
              fontSize: '8rem', 
              fontWeight: 900, 
              opacity: 0.1,
              pointerEvents: 'none',
              color: i % 2 === 0 ? 'black' : 'var(--accent-orange)',
            }}>
              {item.letter}
            </div>
            <div style={{ fontSize: '2.5rem', marginBottom: 15, zIndex: 2, position: 'relative' }}>{item.icon}</div>
            <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 8, fontSize: '1.1rem' }}>{item.title}</h3>
            <p style={{ color: i % 2 === 0 ? '#666' : '#888', fontSize: '0.85rem' }}>{item.desc}</p>
          </div>
        ))}

        {/* FAQ Section */}
        <div style={{ gridColumn: 'span 7', marginTop: 20 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Questions</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30, lineHeight: 0.9 }}>
            Frequently<br />Asked
          </h2>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card light"
              style={{ marginBottom: 10, cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', flex: 1, paddingRight: 20 }}>{faq.question}</h3>
                <span style={{ 
                  fontSize: '1.5rem', 
                  color: 'var(--accent-orange)', 
                  transform: openFaq === index ? 'rotate(45deg)' : 'none', 
                  transition: 'transform 0.3s ease',
                  flexShrink: 0,
                }}>
                  +
                </span>
              </div>
              {openFaq === index && (
                <div style={{ padding: '0 30px 20px', color: '#666', lineHeight: 1.6 }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div style={{ gridColumn: 'span 5', marginTop: 20 }}>
          <div className="card dark" style={{ padding: 40 }}>
            <div className="label text-orange" style={{ marginBottom: 10 }}>Get in Touch</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30, lineHeight: 0.9 }}>
              Contact<br />Us
            </h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: '3rem', marginBottom: 15 }}>✓</div>
                <h3 style={{ fontWeight: 800, marginBottom: 10, textTransform: 'uppercase' }}>Message Sent!</h3>
                <p style={{ color: '#888' }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px', 
                    marginBottom: 15,
                    background: '#2a2a2a', 
                    border: '1px solid #333', 
                    color: 'white',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                  }}
                />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px', 
                    marginBottom: 15,
                    background: '#2a2a2a', 
                    border: '1px solid #333', 
                    color: 'white',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                  }}
                />
                <input
                  type="text"
                  placeholder="SUBJECT"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px', 
                    marginBottom: 15,
                    background: '#2a2a2a', 
                    border: '1px solid #333', 
                    color: 'white',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                  }}
                />
                <textarea
                  placeholder="YOUR MESSAGE"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px', 
                    marginBottom: 15,
                    background: '#2a2a2a', 
                    border: '1px solid #333', 
                    color: 'white',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    resize: 'vertical',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'var(--accent-orange)',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Store Location */}
          <div className="card light" style={{ padding: 30, marginTop: 15, position: 'relative', overflow: 'hidden' }}>
            <div className="orange-shape shape-circle" style={{ width: '50%', paddingBottom: '50%', right: '-15%', left: 'auto', top: '-20%', opacity: 0.3 }} />
            <div style={{ zIndex: 2, position: 'relative' }}>
              <div className="label text-orange" style={{ marginBottom: 10 }}>Visit Us</div>
              <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 15, fontSize: '1.3rem' }}>
                Our Showroom
              </h3>
              <p style={{ lineHeight: 1.6, marginBottom: 15 }}>
                <strong>Bolt KS</strong><br />
                Rr. Agim Ramadani 15<br />
                10000 Pristina, Kosovo
              </p>
              <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: 15, lineHeight: 1.6 }}>
                <strong>Hours:</strong><br />
                Mon-Fri: 10:00 - 19:00<br />
                Sat: 10:00 - 17:00<br />
                Sun: Closed
              </p>
              <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>
                <strong>Contact:</strong><br />
                +383 44 123 456<br />
                info@bolt-ks.com
              </p>
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
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginTop: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9 }}>
              Premium<br />Audio Awaits
            </h2>
          </div>
          <div style={{ zIndex: 2 }}>
            <Link
              href="/shop"
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
              Shop Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
