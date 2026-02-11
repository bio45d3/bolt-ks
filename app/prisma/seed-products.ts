import { PrismaClient, Brand } from '@prisma/client';

const prisma = new PrismaClient();

// Color hex mappings
const colorHexMap: Record<string, string> = {
  // General
  'black': '#000000',
  'black anthracite': '#2F2F2F',
  'matte black': '#1A1A1A',
  'deep black': '#0A0A0A',
  'infinite black': '#0D0D0D',
  'white': '#FFFFFF',
  'iconic white': '#F5F5F5',
  'pure white': '#FFFFFF',
  'natural': '#C0C0C0',
  'natural aluminium': '#D4D4D4',
  'gold': '#C6A665',
  'gold tone': '#C6A665',
  'gold leaf': '#D4AF37',
  'honey tone': '#E5A850',
  'bronze': '#CD7F32',
  'bronze tone': '#CD7F32',
  'brass tone': '#B5A642',
  'copper tone': '#B87333',
  'grey': '#808080',
  'grey mist': '#A8A8A8',
  'light grey': '#D3D3D3',
  'basalt grey': '#5A5A5A',
  'storm grey': '#4F5D75',
  'graphite grey': '#4A4A4A',
  'mercury grey': '#6E6E6E',
  'silver': '#C0C0C0',
  'light chrome': '#E8E8E8',
  'dark chrome': '#3A3A3A',
  'aluminium': '#A8A8A8',
  'spaced aluminium': '#B8B8B8',
  'alu': '#A8A8A8',
  
  // Colored
  'green': '#4A7C59',
  'eucalyptus green': '#5F9F6F',
  'navy': '#1E3A5F',
  'chestnut': '#8B4513',
  'timber': '#4A3728',
  'pink': '#FFC0CB',
  'bonfire orange': '#FF4D00',
  'jupiter orange': '#FF6B35',
  'coral red': '#FF6B6B',
  'aqua blue': '#00CED1',
  'sunset apricot': '#FFAB76',
  'hourglass sand': '#D4C4A8',
  
  // Wood/Material
  'oak': '#8B7355',
  'dark oak': '#5D4037',
  'natural oak': '#A0826D',
  'black oak': '#3D2B1F',
  'smoked oak': '#6B5344',
  'light oak': '#D4B896',
  'nordic weave': '#C4B9A9',
  'white marble': '#F5F5F5',
  
  // Special
  'anthracite oxygen': '#4A4A4A',
  'concrete': '#95A5A6',
  'lava': '#3D3D3D',
  'ivory sands': '#F5E6D3',
  'diamond dust': '#E8E8E8',
  'midnight marble': '#1A1A2E',
};

function getColorHex(colorName: string): string {
  const normalized = colorName.toLowerCase().trim();
  return colorHexMap[normalized] || '#808080';
}

function parseColors(colorStr: string | null): { name: string; hex: string }[] {
  if (!colorStr || colorStr.includes('Na kontaktoni') || colorStr.includes('personalizueshëm')) {
    return [];
  }
  
  return colorStr.split('\n')
    .map(c => c.trim())
    .filter(c => c.length > 0)
    .map(name => ({
      name,
      hex: getColorHex(name),
    }));
}

function parsePrice(priceStr: string | number | null): number | null {
  if (!priceStr || priceStr === 'Na kontaktoni') return null;
  
  if (typeof priceStr === 'number') return priceStr;
  
  // Take first price if multiple
  const firstPrice = priceStr.split('\n')[0].trim();
  if (firstPrice === 'Na kontaktoni') return null;
  
  const cleaned = firstPrice.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function generateSlug(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateSku(brand: string, name: string): string {
  const brandPrefix = brand === 'BANG_OLUFSEN' ? 'BO' : brand === 'DEVIALET' ? 'DEV' : 'LW';
  const namePart = name.split(' ').slice(0, 2).join('').toUpperCase().substring(0, 8);
  return `${brandPrefix}-${namePart}`;
}

interface ProductData {
  name: string;
  brand: Brand;
  category: string;
  colors: string | null;
  price: string | number | null;
  subtitle?: string;
  description?: string;
}

const products: ProductData[] = [
  // ========== BANG & OLUFSEN - SPEAKERS ==========
  { name: 'Beosound Explore', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Black Anthracite\nBonfire Orange\nGreen\nNavy\nChestnut\nGrey Mist', price: 249, subtitle: 'Rugged Portable Speaker', description: 'Adventure-ready Bluetooth speaker with IP67 waterproof rating.' },
  { name: 'Beosound A1 3rd Gen', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Natural Aluminium\nHoney Tone\nEucalyptus Green', price: 349, subtitle: 'Portable Speaker', description: 'Powerful 360° sound in an ultra-portable design.' },
  { name: 'Beosound A1 2nd Gen', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Gold Tone\nBlack Anthracite\nAnthracite Oxygen\nGreen\nGrey Mist\nPink', price: 299, subtitle: 'Classic Portable', description: 'Iconic portable speaker with Alexa built-in.' },
  { name: 'Beolit 20', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Grey Mist\nBlack Anthracite', price: 649, subtitle: 'Wireless Speaker', description: 'Powerful portable speaker with Qi wireless charging.' },
  { name: 'Beosound A5', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Dark Oak\nNordic Weave\nSpaced Aluminium', price: 1799, subtitle: 'Home Speaker', description: 'Elegant home speaker with powerful sound.' },
  { name: 'Beosound A9', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Gold Tone\nNatural Aluminium\nBlack Anthracite', price: 4199, subtitle: 'Iconic Design Speaker', description: 'The iconic speaker. Sound and shape unite.' },
  { name: 'Beosound Emerge', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Gold Tone', price: 1099, subtitle: 'Bookshelf Speaker', description: 'Book-shaped speaker with room-filling sound.' },
  { name: 'Beosound Level', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Gold Tone\nNatural', price: 1999, subtitle: 'Versatile Speaker', description: 'Portable and adaptable premium speaker.' },
  { name: 'Beosound Balance', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Natural Oak\nBlack Oak\nWhite Marble', price: 3555, subtitle: 'Living Room Speaker', description: 'Intelligent 360° sound for any room.' },
  { name: 'Beosound 2 3rd Gen', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Gold Tone\nBlack Anthracite\nNatural', price: 3699, subtitle: 'Premium Home Speaker', description: 'Captivating beauty. Astonishing power.' },
  { name: 'Beosound Stage', brand: 'BANG_OLUFSEN', category: 'Soundbars', colors: 'Natural\nSmoked Oak\nGold Tone\nBlack Anthracite', price: 2355, subtitle: 'Premium Soundbar', description: 'Powerful soundbar with Dolby Atmos.' },
  { name: 'Beolab 8', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: null, price: null, subtitle: 'Customizable Speakers', description: 'Fully customizable premium speakers.' },
  { name: 'Beolab 18', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: null, price: null, subtitle: 'Floor Standing', description: 'Elegant floor standing speakers.' },
  { name: 'Beolab 19', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: null, price: null, subtitle: 'Subwoofer', description: 'Powerful wireless subwoofer.' },
  { name: 'Beolab 28', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: null, price: null, subtitle: 'Hi-Fidelity Speakers', description: 'Wall mounted or floor-standing. Redefined.' },
  { name: 'Beolab 50', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: null, price: null, subtitle: 'Statement Speakers', description: 'The ultimate statement in sound.' },
  { name: 'Beolab 90', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: null, price: null, subtitle: 'Flagship Loudspeaker', description: 'The pinnacle of acoustic engineering.' },
  { name: 'Beosound Shape', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: null, price: null, subtitle: 'Wall of Sound', description: 'Customizable wall-mounted speaker system.' },
  { name: 'Beosound Theatre', brand: 'BANG_OLUFSEN', category: 'Soundbars', colors: null, price: null, subtitle: 'Dolby Atmos Soundbar', description: 'Powerful Dolby Atmos soundbar.' },
  { name: 'Beosound Bollard', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Black\nNatural\nBronze', price: null, subtitle: 'Outdoor Speaker', description: 'Weather-resistant outdoor speaker.' },
  { name: 'Celestial', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Natural\nBronze Tone\nBrass Tone\nBlack Anthracite\nGold Tone', price: null, subtitle: 'Premium Collection', description: 'Exclusive premium speaker collection.' },
  { name: 'Palatial', brand: 'BANG_OLUFSEN', category: 'Speakers', colors: 'Natural\nBlack Anthracite\nGold Tone', price: null, subtitle: 'Luxury Collection', description: 'Luxury architectural speaker system.' },
  
  // ========== BANG & OLUFSEN - HEADPHONES ==========
  { name: 'Beoplay EX', brand: 'BANG_OLUFSEN', category: 'Headphones', colors: 'Black Anthracite\nAnthracite Oxygen\nGold Tone', price: 399, subtitle: 'True Wireless Earbuds', description: 'Premium true wireless earbuds with ANC.' },
  { name: 'Beoplay Eleven', brand: 'BANG_OLUFSEN', category: 'Headphones', colors: 'Natural Aluminium\nCopper Tone', price: 499, subtitle: 'Wireless Earbuds', description: 'Next-generation wireless earbuds.' },
  { name: 'Beoplay HX', brand: 'BANG_OLUFSEN', category: 'Headphones', colors: 'Gold Tone\nTimber\nBlack Anthracite', price: 599, subtitle: 'ANC Headphones', description: 'All-day comfort. Premium sound.' },
  { name: 'Beoplay H95', brand: 'BANG_OLUFSEN', category: 'Headphones', colors: 'Black\nGold Tone\nChestnut\nNavy', price: 999, subtitle: 'Premium Over-Ear', description: 'Immersive noise-cancelling headphones.' },
  { name: 'Beoplay H100', brand: 'BANG_OLUFSEN', category: 'Headphones', colors: 'Sunset Apricot\nInfinite Black\nHourglass Sand', price: 1850, subtitle: 'Ultimate Over-Ear', description: 'The ultimate listening experience.' },
  
  // ========== BANG & OLUFSEN - TVs ==========
  { name: 'Beovision Harmony', brand: 'BANG_OLUFSEN', category: 'Televisions', colors: null, price: null, subtitle: 'OLED TV', description: 'Motorized OLED TV with oak & aluminium stand.' },
  { name: 'Beovision Theatre TV', brand: 'BANG_OLUFSEN', category: 'Televisions', colors: null, price: null, subtitle: 'OLED Cinema', description: 'OLED TV with integrated Dolby Atmos.' },
  { name: 'Beovision Contour', brand: 'BANG_OLUFSEN', category: 'Televisions', colors: null, price: null, subtitle: 'All-in-One TV', description: 'OLED TV with integrated soundbar.' },
  
  // ========== DEVIALET - SPEAKERS ==========
  { name: 'Phantom I 103 dB', brand: 'DEVIALET', category: 'Speakers', colors: 'Light Chrome\nMatte Black', price: 2655.95, subtitle: '103 dB Speaker', description: 'Compact speaker with 103 dB power.' },
  { name: 'Phantom I 108 dB', brand: 'DEVIALET', category: 'Speakers', colors: 'Gold\nDark Chrome', price: 3755.95, subtitle: '108 dB Speaker', description: 'Powerful speaker with 108 dB.' },
  { name: 'Phantom I 108 dB Opera de Paris', brand: 'DEVIALET', category: 'Speakers', colors: 'Gold Leaf', price: 4355.95, subtitle: 'Opera Edition', description: 'Exclusive Opera de Paris edition.' },
  { name: 'Phantom II 95 dB', brand: 'DEVIALET', category: 'Speakers', colors: 'Iconic White\nMatte Black', price: 1499.95, subtitle: '95 dB Compact', description: 'Compact 95 dB speaker.' },
  { name: 'Phantom II 98 dB', brand: 'DEVIALET', category: 'Speakers', colors: 'Iconic White\nMatte Black', price: 1755.95, subtitle: '98 dB Compact', description: 'Compact 98 dB speaker.' },
  { name: 'Phantom II 98 dB Opera de Paris', brand: 'DEVIALET', category: 'Speakers', colors: 'Gold Leaf', price: 2199.95, subtitle: 'Opera Edition', description: 'Exclusive Opera de Paris edition.' },
  { name: 'Devialet Mania', brand: 'DEVIALET', category: 'Speakers', colors: 'Light Grey\nDeep Black', price: 1099.95, subtitle: 'Portable Speaker', description: 'Portable speaker with 360° sound.' },
  { name: 'Devialet Mania Opera de Paris', brand: 'DEVIALET', category: 'Speakers', colors: 'Gold', price: 1155.95, subtitle: 'Opera Edition', description: 'Exclusive Opera de Paris portable.' },
  
  // ========== DEVIALET - SOUNDBAR ==========
  { name: 'Devialet Dione', brand: 'DEVIALET', category: 'Soundbars', colors: 'Matte Black', price: 2399.95, subtitle: 'Dolby Atmos Soundbar', description: 'Premium soundbar with Dolby Atmos.' },
  { name: 'Devialet Dione Opera de Paris', brand: 'DEVIALET', category: 'Soundbars', colors: 'Gold Leaf', price: 3399.95, subtitle: 'Opera Edition', description: 'Exclusive Opera de Paris soundbar.' },
  
  // ========== DEVIALET - HEADPHONES ==========
  { name: 'Devialet Gemini II', brand: 'DEVIALET', category: 'Headphones', colors: 'Iconic White\nMatte Black', price: 449.95, subtitle: 'True Wireless', description: 'High-fidelity true wireless earbuds.' },
  { name: 'Devialet Gemini II Opera de Paris', brand: 'DEVIALET', category: 'Headphones', colors: 'Gold', price: 669.95, subtitle: 'Opera Edition', description: 'Exclusive Opera de Paris earbuds.' },
  
  // ========== DEVIALET - ACCESSORIES ==========
  { name: 'Gecko Phantom I', brand: 'DEVIALET', category: 'Accessories', colors: 'Iconic White', price: 339.95, subtitle: 'Wall Mount', description: 'Wall mount for Phantom I.' },
  { name: 'Tree Phantom I', brand: 'DEVIALET', category: 'Accessories', colors: 'Iconic White\nMatte Black', price: 505.95, subtitle: 'Floor Stand', description: 'Floor stand for Phantom I.' },
  { name: 'Treepod Phantom I', brand: 'DEVIALET', category: 'Accessories', colors: 'Iconic White\nMatte Black', price: 399.95, subtitle: 'Tripod Stand', description: 'Tripod stand for Phantom I.' },
  { name: 'Cocoon Phantom I', brand: 'DEVIALET', category: 'Accessories', colors: 'Mercury Grey', price: 479.95, subtitle: 'Carrying Case', description: 'Protective carrying case.' },
  { name: 'Devialet Remote', brand: 'DEVIALET', category: 'Accessories', colors: 'Iconic White\nMatte Black', price: 259.95, subtitle: 'Remote Control', description: 'Premium remote control.' },
  { name: 'Gecko Phantom II', brand: 'DEVIALET', category: 'Accessories', colors: 'Iconic White', price: 209.95, subtitle: 'Wall Mount', description: 'Wall mount for Phantom II.' },
  { name: 'Cocoon Phantom II', brand: 'DEVIALET', category: 'Accessories', colors: 'Jupiter Orange\nMercury Grey', price: 355.95, subtitle: 'Carrying Case', description: 'Protective carrying case.' },
  { name: 'Devialet Mania Cocoon', brand: 'DEVIALET', category: 'Accessories', colors: 'Light Grey', price: 125.95, subtitle: 'Carrying Case', description: 'Protective case for Mania.' },
  { name: 'Devialet Mania Station', brand: 'DEVIALET', category: 'Accessories', colors: 'Light Grey', price: 125.95, subtitle: 'Charging Station', description: 'Charging station for Mania.' },
  
  // ========== LOEWE - TVs ==========
  { name: 'WE.SEE 32 LCD', brand: 'LOEWE', category: 'Televisions', colors: null, price: 575, subtitle: '32" LCD TV', description: 'Compact 32" LCD TV.' },
  { name: 'WE.SEE 43 LCD', brand: 'LOEWE', category: 'Televisions', colors: null, price: 1355, subtitle: '43" LCD TV', description: '43" LCD TV for living rooms.' },
  { name: 'WE.SEE 48 OLED', brand: 'LOEWE', category: 'Televisions', colors: null, price: 1999, subtitle: '48" OLED TV', description: '48" OLED with stunning picture.' },
  { name: 'WE.SEE 55 OLED', brand: 'LOEWE', category: 'Televisions', colors: null, price: 2355, subtitle: '55" OLED TV', description: '55" OLED TV.' },
  { name: 'WE.SEE 65 OLED', brand: 'LOEWE', category: 'Televisions', colors: null, price: 3199, subtitle: '65" OLED TV', description: '65" OLED TV.' },
  { name: 'WE.SEE Aqua Blue', brand: 'LOEWE', category: 'Televisions', colors: 'Aqua Blue', price: 575, subtitle: 'Colored TV', description: 'Available in 32", 43", 50", 55".' },
  { name: 'WE.SEE Coral Red', brand: 'LOEWE', category: 'Televisions', colors: 'Coral Red', price: 575, subtitle: 'Colored TV', description: 'Available in 32", 43", 50", 55".' },
  { name: 'WE.SEE Storm Grey', brand: 'LOEWE', category: 'Televisions', colors: 'Storm Grey', price: 575, subtitle: 'Colored TV', description: 'Available in 32", 43", 50", 55".' },
  { name: 'WE.BEAM', brand: 'LOEWE', category: 'Televisions', colors: null, price: 1255, subtitle: 'Projector', description: 'Portable LED projector.' },
  { name: 'BILD I.48 DR+', brand: 'LOEWE', category: 'Televisions', colors: null, price: 2799, subtitle: '48" OLED', description: 'Premium 48" OLED TV.' },
  { name: 'BILD I.65 DR+', brand: 'LOEWE', category: 'Televisions', colors: null, price: 3999, subtitle: '65" OLED', description: 'Premium 65" OLED TV.' },
  { name: 'BILD I.77 DR+', brand: 'LOEWE', category: 'Televisions', colors: null, price: 9999, subtitle: '77" OLED', description: 'Premium 77" OLED TV.' },
  { name: 'INSPIRE 55 DR+', brand: 'LOEWE', category: 'Televisions', colors: null, price: 3099, subtitle: '55" OLED', description: 'INSPIRE 55" OLED TV.' },
  { name: 'INSPIRE 65 DR+', brand: 'LOEWE', category: 'Televisions', colors: null, price: 3999, subtitle: '65" OLED', description: 'INSPIRE 65" OLED TV.' },
  { name: 'STELLAR 42 DR+', brand: 'LOEWE', category: 'Televisions', colors: 'Concrete\nLava\nAlu', price: 3699, subtitle: '42" OLED', description: 'STELLAR 42" OLED TV.' },
  { name: 'STELLAR 48 DR+', brand: 'LOEWE', category: 'Televisions', colors: 'Concrete\nLava\nAlu', price: 4199, subtitle: '48" OLED', description: 'STELLAR 48" OLED TV.' },
  { name: 'STELLAR 55 DR+', brand: 'LOEWE', category: 'Televisions', colors: 'Concrete\nLava\nAlu', price: 4699, subtitle: '55" OLED', description: 'STELLAR 55" OLED TV.' },
  { name: 'STELLAR 65 DR+', brand: 'LOEWE', category: 'Televisions', colors: 'Concrete\nLava\nAlu', price: 6499, subtitle: '65" OLED', description: 'STELLAR 65" OLED TV.' },
  { name: 'STELLAR 77 DR+', brand: 'LOEWE', category: 'Televisions', colors: 'Alu', price: null, subtitle: '77" OLED', description: 'STELLAR 77" OLED TV.' },
  { name: 'STELLAR 83 DR+', brand: 'LOEWE', category: 'Televisions', colors: 'Alu', price: null, subtitle: '83" OLED', description: 'STELLAR 83" OLED TV.' },
  { name: 'ICONIC INSPIRE 55', brand: 'LOEWE', category: 'Televisions', colors: 'Graphite Grey\nPure White\nIvory Sands\nDiamond Dust\nBronze\nMidnight Marble', price: 6999, subtitle: '55" OLED', description: 'ICONIC 55" OLED with premium finishes.' },
  { name: 'ICONIC INSPIRE 65', brand: 'LOEWE', category: 'Televisions', colors: 'Graphite Grey\nPure White\nIvory Sands\nDiamond Dust\nBronze\nMidnight Marble', price: 8599, subtitle: '65" OLED', description: 'ICONIC 65" OLED with premium finishes.' },
  
  // ========== LOEWE - AUDIO ==========
  { name: 'KLANG MR1', brand: 'LOEWE', category: 'Speakers', colors: null, price: 429, subtitle: 'Multiroom Speaker', description: 'Compact multiroom speaker.' },
  { name: 'KLANG MR3', brand: 'LOEWE', category: 'Speakers', colors: null, price: 625, subtitle: 'Multiroom Speaker', description: 'Mid-size multiroom speaker.' },
  { name: 'KLANG MR5', brand: 'LOEWE', category: 'Speakers', colors: null, price: 755, subtitle: 'Multiroom Speaker', description: 'Large multiroom speaker.' },
  { name: 'HOME.CINEMA SET 553', brand: 'LOEWE', category: 'Speakers', colors: null, price: 4199, subtitle: 'Home Theater Set', description: 'Complete home theater system.' },
  { name: 'HOME CINEMA SET 531', brand: 'LOEWE', category: 'Speakers', colors: null, price: 3599, subtitle: 'Home Theater Set', description: 'Home theater system.' },
  { name: 'RADIO.FREQUENCY', brand: 'LOEWE', category: 'Speakers', colors: null, price: 215, subtitle: 'Digital Radio', description: 'DAB+ digital radio.' },
  { name: 'KLANG S1', brand: 'LOEWE', category: 'Speakers', colors: 'Basalt Grey\nLight Grey', price: 555, subtitle: 'Stereo Speaker', description: 'Compact stereo speaker.' },
  { name: 'KLANG S3', brand: 'LOEWE', category: 'Speakers', colors: 'Basalt Grey\nLight Grey', price: 799, subtitle: 'Stereo Speaker', description: 'Premium stereo speaker.' },
  { name: 'KLANG BAR I', brand: 'LOEWE', category: 'Soundbars', colors: null, price: 299, subtitle: 'Soundbar', description: 'Entry soundbar.' },
  { name: 'KLANG BAR3 MR', brand: 'LOEWE', category: 'Soundbars', colors: null, price: 1099, subtitle: 'Multiroom Soundbar', description: 'Premium multiroom soundbar.' },
  { name: 'WE.HEAR 1', brand: 'LOEWE', category: 'Speakers', colors: null, price: 111, subtitle: 'Bluetooth Speaker', description: 'Compact Bluetooth speaker.' },
  { name: 'WE.HEAR 2', brand: 'LOEWE', category: 'Speakers', colors: null, price: 185, subtitle: 'Bluetooth Speaker', description: 'Portable Bluetooth speaker.' },
  { name: 'WE.HEAR PRO', brand: 'LOEWE', category: 'Speakers', colors: null, price: 299, subtitle: 'Bluetooth Speaker', description: 'Premium Bluetooth speaker.' },
  { name: 'Klang MR Amplifier', brand: 'LOEWE', category: 'Accessories', colors: null, price: 1055, subtitle: 'Amplifier', description: 'Multiroom amplifier.' },
];

async function main() {
  console.log('Starting product seed...');
  
  // Get categories
  const categories = await prisma.category.findMany();
  const categoryMap = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));
  
  // Create missing categories
  const neededCategories = [...new Set(products.map(p => p.category))];
  for (const catName of neededCategories) {
    if (!categoryMap.has(catName.toLowerCase())) {
      const cat = await prisma.category.create({
        data: {
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, '-'),
        },
      });
      categoryMap.set(catName.toLowerCase(), cat.id);
      console.log(`Created category: ${catName}`);
    }
  }
  
  // Seed products
  let created = 0;
  let skipped = 0;
  
  for (const p of products) {
    const slug = generateSlug(p.name);
    const sku = generateSku(p.brand, p.name);
    
    // Check if exists
    const existing = await prisma.product.findFirst({
      where: { OR: [{ slug }, { sku }] },
    });
    
    if (existing) {
      console.log(`Skipping ${p.name} (already exists)`);
      skipped++;
      continue;
    }
    
    const categoryId = categoryMap.get(p.category.toLowerCase());
    if (!categoryId) {
      console.log(`Skipping ${p.name} (no category)`);
      skipped++;
      continue;
    }
    
    const price = parsePrice(p.price);
    const colors = parseColors(p.colors);
    const contactOnly = price === null;
    
    await prisma.product.create({
      data: {
        sku,
        name: p.name,
        slug,
        subtitle: p.subtitle,
        description: p.description,
        brand: p.brand,
        categoryId,
        price,
        contactOnly,
        colors,
        inStock: true,
        stockCount: price ? 10 : 0,
        featured: false,
      },
    });
    
    created++;
    console.log(`Created: ${p.name} (${p.brand})`);
  }
  
  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
