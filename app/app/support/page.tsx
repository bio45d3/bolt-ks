'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';

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
      <Navigation activeLink="support" />

      <main>
        {/* Page Header */}
        <div style={{ gridColumn: 'span 12', marginBottom: 40 }}>
          <div className="label text-orange" style={{ marginBottom: 10 }}>Help Center</div>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
            Support
          </h1>
          <p style={{ marginTop: 15, fontSize: '1rem', color: '#666', maxWidth: 600 }}>
            We&apos;re here to help you get the most out of your Bang & Olufsen products.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '📦', title: 'Track Order', desc: 'Check your order status' },
            { icon: '🔧', title: 'Repairs', desc: 'Schedule a repair' },
            { icon: '📱', title: 'App Support', desc: 'Get help with the app' },
            { icon: '📍', title: 'Find Store', desc: 'Visit our showroom' },
          ].map((item, i) => (
            <div key={i} className="card light" style={{ padding: 30, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 15 }}>{item.icon}</div>
              <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 5 }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div style={{ gridColumn: 'span 7' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>
            Frequently Asked Questions
          </h2>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card light"
              style={{ marginBottom: 10, cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{faq.question}</h3>
                <span style={{ fontSize: '1.5rem', color: 'var(--accent-orange)', transform: openFaq === index ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}>
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
        <div style={{ gridColumn: 'span 5' }}>
          <div className="card dark" style={{ padding: 40 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 30 }}>
              Contact Us
            </h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: '3rem', marginBottom: 15 }}>✓</div>
                <h3 style={{ fontWeight: 800, marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: '#888' }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ ...inputStyle, background: '#2a2a2a', border: '1px solid #333', color: 'white' }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ ...inputStyle, background: '#2a2a2a', border: '1px solid #333', color: 'white' }}
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  style={{ ...inputStyle, background: '#2a2a2a', border: '1px solid #333', color: 'white' }}
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  style={{ ...inputStyle, background: '#2a2a2a', border: '1px solid #333', color: 'white', resize: 'vertical' }}
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
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Store Location */}
          <div className="card light" style={{ padding: 30, marginTop: 20 }}>
            <h3 style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: 15 }}>
              📍 Our Showroom
            </h3>
            <p style={{ lineHeight: 1.6, marginBottom: 15 }}>
              <strong>Bolt KS</strong><br />
              Rr. Agim Ramadani 15<br />
              10000 Pristina, Kosovo
            </p>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 15 }}>
              <strong>Hours:</strong><br />
              Mon-Fri: 10:00 - 19:00<br />
              Sat: 10:00 - 17:00<br />
              Sun: Closed
            </p>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              <strong>Contact:</strong><br />
              +383 44 123 456<br />
              info@bolt-ks.com
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
