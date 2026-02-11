import { Navigation } from '@/components/Navigation';
import { HeroCard } from '@/components/HeroCard';
import { ProductCard, H95Card, Beolit20Card } from '@/components/ProductCard';
import { Newsletter } from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pt-[100px] px-10 pb-10 grid grid-cols-12 gap-5 max-w-[1800px] mx-auto">
        <HeroCard />
        
        <ProductCard
          title="BEOPLAY"
          subtitle="A9"
          price="$2,999.00"
          image="https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80"
          shape="rect"
          verticalText="Active Noise Cancellation"
          pills={[
            { label: 'COVER', color: '#ddd' },
            { label: 'LEGS', color: '#8B4513' }
          ]}
        />
        
        <H95Card />
        
        <Beolit20Card />
        
        <Newsletter />
      </main>
    </>
  );
}
