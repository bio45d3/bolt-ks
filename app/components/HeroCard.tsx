'use client';

import { useState } from 'react';
import Image from 'next/image';

export function HeroCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="col-span-12 h-[85vh] grid grid-cols-2 relative rounded-[var(--radius)] bg-[var(--card-dark)] text-[var(--text-light)] overflow-hidden cursor-pointer card-hover"
      style={{ transform: isHovered ? 'translateY(-5px)' : 'translateY(0)' }}
    >
      {/* Big "90" background */}
      <div className="absolute text-[35rem] font-black text-[var(--accent-orange)] leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 select-none pointer-events-none">
        90
      </div>

      {/* Product image */}
      <div className="absolute inset-0 flex justify-center items-center z-[2]">
        <img
          src="https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
          alt="Beolab 90"
          className="max-h-[90%] max-w-[60%] object-contain drop-shadow-2xl transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05) rotate(-2deg)' : 'scale(1)' }}
        />
      </div>

      {/* Left content */}
      <div className="p-[60px] z-[2] flex flex-col justify-end col-start-1">
        <div className="font-mono uppercase text-[0.75rem] tracking-wide text-[var(--accent-orange)]">
          Flagship Innovation
        </div>
        <h1 className="text-[3.5rem] leading-[0.85] mb-5 font-extrabold uppercase tracking-tight pointer-events-none">
          THE SHAPE<br />
          OF SOUND<br />
          <span className="text-[var(--accent-orange)]">REDEFINED</span>
        </h1>
      </div>

      {/* Right content */}
      <div className="p-[60px] z-[2] flex flex-col justify-end col-start-2 items-end text-right">
        <div className="absolute top-6 right-6 z-[4]">
          <span className="font-mono uppercase text-[0.75rem] tracking-wide">MSRP</span><br />
          $80,000.00
        </div>
        <div className="text-[0.9rem] leading-relaxed max-w-[80%] mt-2.5 z-[3] relative">
          In the years following its inception, the Beolab 90 has stood as the pinnacle of acoustic engineering. 
          Active Room Compensation meets visionary design.
        </div>
      </div>
    </div>
  );
}
