'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ColorOption {
  name: string;
  hex: string;
}

interface ProductFormProps {
  product?: {
    id: string;
    sku: string;
    name: string;
    slug: string;
    subtitle?: string;
    description?: string;
    longDescription?: string;
    brand: string;
    categoryId: string;
    price: number | null;
    compareAt: number | null;
    contactOnly: boolean;
    images: string[];
    colors: ColorOption[];
    specs: Record<string, string>;
    featured: boolean;
    inStock: boolean;
    stockCount: number;
  };
  categories: Category[];
}

const BRANDS = [
  { value: 'BANG_OLUFSEN', label: 'Bang & Olufsen' },
  { value: 'DEVIALET', label: 'Devialet' },
  { value: 'LOEWE', label: 'Loewe' },
];

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Form state
  const [form, setForm] = useState({
    sku: product?.sku || '',
    name: product?.name || '',
    slug: product?.slug || '',
    subtitle: product?.subtitle || '',
    description: product?.description || '',
    longDescription: product?.longDescription || '',
    brand: product?.brand || 'BANG_OLUFSEN',
    categoryId: product?.categoryId || categories[0]?.id || '',
    price: product?.price ?? '',
    compareAt: product?.compareAt ?? '',
    contactOnly: product?.contactOnly || false,
    featured: product?.featured || false,
    inStock: product?.inStock ?? true,
    stockCount: product?.stockCount || 0,
  });

  const [images, setImages] = useState<string[]>(product?.images || []);
  const [colors, setColors] = useState<ColorOption[]>(product?.colors || []);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
    product?.specs 
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from name
    if (name === 'name' && !product) {
      setForm(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }));
    }
  };

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Upload failed');
        }

        const { url } = await res.json();
        setImages(prev => [...prev, url]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;
    
    const newImages = [...images];
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    setImages(newImages);
  };

  const addImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    setImages(prev => [...prev, url]);
    setImageUrl('');
    setError('');
  };

  // Colors
  const addColor = () => {
    setColors(prev => [...prev, { name: '', hex: '#000000' }]);
  };

  const updateColor = (index: number, field: 'name' | 'hex', value: string) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
  };

  const removeColor = (index: number) => {
    setColors(prev => prev.filter((_, i) => i !== index));
  };

  // Specs
  const addSpec = () => {
    setSpecs(prev => [...prev, { key: '', value: '' }]);
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    setSpecs(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const removeSpec = (index: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const specsObj: Record<string, string> = {};
      specs.forEach(s => {
        if (s.key.trim()) specsObj[s.key.trim()] = s.value.trim();
      });

      const payload = {
        ...form,
        price: form.price !== '' ? parseFloat(String(form.price)) : null,
        compareAt: form.compareAt !== '' ? parseFloat(String(form.compareAt)) : null,
        stockCount: parseInt(String(form.stockCount)) || 0,
        images,
        colors: colors.filter(c => c.name.trim()),
        specs: specsObj,
      };

      const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = product ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: '1rem',
    marginTop: 8,
    background: 'white',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 700,
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#333',
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ 
          background: '#fee', 
          color: '#c00', 
          padding: '15px 20px', 
          borderRadius: 8, 
          marginBottom: 20,
          fontWeight: 600,
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
        {/* Left Column - Main Info */}
        <div>
          {/* Basic Info */}
          <div className="card light" style={{ padding: 30, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 25, textTransform: 'uppercase' }}>Basic Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={labelStyle}>
                  SKU *
                  <input
                    type="text"
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    required
                    placeholder="e.g., BO-H95-BLK"
                    style={inputStyle}
                  />
                </label>
              </div>
              <div>
                <label style={labelStyle}>
                  Brand *
                  <select
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  >
                    {BRANDS.map(b => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>
                Product Name *
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Beoplay H95"
                  style={inputStyle}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
              <div>
                <label style={labelStyle}>
                  URL Slug *
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    required
                    placeholder="e.g., beoplay-h95"
                    style={inputStyle}
                  />
                </label>
              </div>
              <div>
                <label style={labelStyle}>
                  Category *
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>
                Subtitle
                <input
                  type="text"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  placeholder="e.g., Premium Over-Ear Headphones"
                  style={inputStyle}
                />
              </label>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>
                Short Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Brief product description..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </label>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>
                Long Description
                <textarea
                  name="longDescription"
                  value={form.longDescription}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Detailed product description..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </label>
            </div>
          </div>

          {/* Images */}
          <div className="card light" style={{ padding: 30, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 25, textTransform: 'uppercase' }}>Images</h3>
            
            <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap', marginBottom: 20 }}>
              {images.map((img, i) => (
                <div key={i} style={{ position: 'relative', width: 120, height: 120, background: '#f5f5f5', borderRadius: 8, overflow: 'hidden' }}>
                  <Image src={img} alt={`Product ${i + 1}`} fill style={{ objectFit: 'contain' }} />
                  <div style={{ position: 'absolute', top: 5, right: 5, display: 'flex', gap: 3 }}>
                    {i > 0 && (
                      <button type="button" onClick={() => moveImage(i, 'up')} style={{ width: 24, height: 24, background: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem' }}>↑</button>
                    )}
                    {i < images.length - 1 && (
                      <button type="button" onClick={() => moveImage(i, 'down')} style={{ width: 24, height: 24, background: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem' }}>↓</button>
                    )}
                    <button type="button" onClick={() => removeImage(i)} style={{ width: 24, height: 24, background: '#f44336', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}>×</button>
                  </div>
                  {i === 0 && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--accent-orange)', color: 'white', fontSize: '0.65rem', fontWeight: 700, textAlign: 'center', padding: '3px 0', textTransform: 'uppercase' }}>
                      Main
                    </div>
                  )}
                </div>
              ))}
              
              <label style={{ 
                width: 120, 
                height: 120, 
                background: '#f5f5f5', 
                borderRadius: 8, 
                border: '2px dashed #ccc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: uploading ? 'wait' : 'pointer',
                opacity: uploading ? 0.5 : 1,
              }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
                <span style={{ fontSize: '2rem', color: '#888' }}>+</span>
                <span style={{ fontSize: '0.7rem', color: '#888', marginTop: 5 }}>
                  {uploading ? 'Uploading...' : 'Add Image'}
                </span>
              </label>
            </div>

            <div style={{ marginTop: 20, padding: 15, background: '#f9f9f9', borderRadius: 8, border: '1px solid #eee' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', color: '#666' }}>Or add image from URL</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  style={{ flex: 1, padding: '10px 14px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.9rem' }}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                />
                <button 
                  type="button" 
                  onClick={addImageUrl}
                  style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                >
                  Add URL
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 15 }}>
              First image is the main product image. Supports external URLs or file upload (max 2MB).
            </div>
          </div>

          {/* Colors */}
          <div className="card light" style={{ padding: 30, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontWeight: 800, textTransform: 'uppercase' }}>Color Options</h3>
              <button type="button" onClick={addColor} style={{ padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
                + Add Color
              </button>
            </div>

            {colors.length === 0 ? (
              <div style={{ color: '#888', fontSize: '0.9rem' }}>No color options. Click "Add Color" to add one.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {colors.map((color, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => updateColor(i, 'hex', e.target.value)}
                      style={{ width: 50, height: 40, border: 'none', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => updateColor(i, 'name', e.target.value)}
                      placeholder="Color name (e.g., Black Anthracite)"
                      style={{ flex: 1, padding: '10px 14px', border: '1px solid #ddd', borderRadius: 6 }}
                    />
                    <input
                      type="text"
                      value={color.hex}
                      onChange={(e) => updateColor(i, 'hex', e.target.value)}
                      placeholder="#000000"
                      style={{ width: 100, padding: '10px 14px', border: '1px solid #ddd', borderRadius: 6, fontFamily: 'monospace' }}
                    />
                    <button type="button" onClick={() => removeColor(i)} style={{ width: 36, height: 36, background: '#f44336', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="card light" style={{ padding: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontWeight: 800, textTransform: 'uppercase' }}>Specifications</h3>
              <button type="button" onClick={addSpec} style={{ padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
                + Add Spec
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => updateSpec(i, 'key', e.target.value)}
                    placeholder="Spec name (e.g., Battery Life)"
                    style={{ flex: 1, padding: '10px 14px', border: '1px solid #ddd', borderRadius: 6 }}
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    placeholder="Value (e.g., 38 hours)"
                    style={{ flex: 1, padding: '10px 14px', border: '1px solid #ddd', borderRadius: 6 }}
                  />
                  <button type="button" onClick={() => removeSpec(i)} style={{ width: 36, height: 36, background: '#f44336', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Pricing & Status */}
        <div>
          {/* Pricing */}
          <div className="card dark" style={{ padding: 30, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 25, textTransform: 'uppercase', color: 'white' }}>Pricing</h3>
            
            <div>
              <label style={{ ...labelStyle, color: '#888' }}>
                Price (€)
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="Leave empty for 'Contact Us'"
                  style={{ ...inputStyle, background: '#2a2a2a', border: '1px solid #444', color: 'white' }}
                />
              </label>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={{ ...labelStyle, color: '#888' }}>
                Compare At Price (€)
                <input
                  type="number"
                  name="compareAt"
                  value={form.compareAt}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="Original price (for sales)"
                  style={{ ...inputStyle, background: '#2a2a2a', border: '1px solid #444', color: 'white' }}
                />
              </label>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="contactOnly"
                  checked={form.contactOnly}
                  onChange={handleChange}
                  style={{ width: 20, height: 20, accentColor: 'var(--accent-orange)' }}
                />
                <span style={{ color: '#888', fontSize: '0.9rem' }}>Show "Contact Us" instead of price</span>
              </label>
            </div>
          </div>

          {/* Inventory */}
          <div className="card light" style={{ padding: 30, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 25, textTransform: 'uppercase' }}>Inventory</h3>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="inStock"
                  checked={form.inStock}
                  onChange={handleChange}
                  style={{ width: 20, height: 20, accentColor: 'var(--accent-orange)' }}
                />
                <span style={{ fontSize: '0.9rem' }}>In Stock</span>
              </label>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>
                Stock Count
                <input
                  type="number"
                  name="stockCount"
                  value={form.stockCount}
                  onChange={handleChange}
                  min="0"
                  style={inputStyle}
                />
              </label>
            </div>
          </div>

          {/* Visibility */}
          <div className="card light" style={{ padding: 30, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 25, textTransform: 'uppercase' }}>Visibility</h3>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                style={{ width: 20, height: 20, accentColor: 'var(--accent-orange)' }}
              />
              <span style={{ fontSize: '0.9rem' }}>Featured Product</span>
            </label>
            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: 8, marginLeft: 32 }}>
              Featured products appear in the homepage hero section.
            </p>
          </div>

          {/* Actions */}
          <div className="card dark" style={{ padding: 30 }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                width: '100%',
                padding: '18px',
                background: saving ? '#888' : 'var(--accent-orange)',
                color: 'white',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                cursor: saving ? 'wait' : 'pointer',
                borderRadius: 8,
                marginBottom: 12,
              }}
            >
              {saving ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              style={{
                width: '100%',
                padding: '18px',
                background: 'transparent',
                color: 'white',
                border: '1px solid #444',
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: 8,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
