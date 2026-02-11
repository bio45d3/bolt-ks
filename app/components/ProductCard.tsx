'use client';

import { useState, ReactNode } from 'react';

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  bgColor?: string;
  textColor?: string;
  shape?: 'rect' | 'circle';
  shapeColor?: string;
  verticalText?: string;
  description?: string;
  pills?: Array<{ label: string; color?: string }>;
  darkMode?: boolean;
  children?: ReactNode;
}

function ColorDot({ color }: { color: string }) {
  return (
    <div
      className="w-2.5 h-2.5 rounded-full border border-black/20"
      style={{ backgroundColor: color }}
    />
  );
}

function ArrowGraphic({ color = 'var(--accent-orange)', className = '' }: { color?: string; className?: string }) {
  return (
    <svg
      className={`w-5 h-[60px] absolute bottom-8 right-8 ${className}`}
      style={{ stroke: color, strokeWidth: 2, fill: 'none' }}
      viewBox="0 0 20 60"
    >
      <line x1="10" y1="0" x2="10" y2="55" />
      <line x1="10" y1="55" x2="2" y2="45" />
      <line x1="10" y1="55" x2="18" y2="45" />
    </svg>
  );
}

export function ProductCard({
  title,
  subtitle,
  price,
  image,
  bgColor = 'var(--card-light)',
  textColor = 'var(--text-dark)',
  shape = 'rect',
  shapeColor = 'var(--accent-orange)',
  verticalText,
  pills,
  darkMode = false,
  children,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="col-span-4 grid-span-4 h-[600px] p-8 rounded-[var(--radius)] relative overflow-hidden flex flex-col justify-between cursor-pointer card-hover"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: darkMode ? 'none' : '1px solid var(--text-dark)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
    >
      {/* Price */}
      <div
        className="absolute top-6 right-6 z-[4] font-mono font-semibold text-[0.9rem]"
        style={{ color: darkMode ? 'var(--accent-orange)' : 'inherit' }}
      >
        {price}
      </div>

      {/* Background shape */}
      {shape && (
        <div
          className="absolute z-0"
          style={{
            backgroundColor: shapeColor,
            ...(shape === 'rect'
              ? {
                  width: '60%',
                  height: '80%',
                  top: '10%',
                  left: '20%',
                  transform: 'rotate(-5deg)',
                }
              : {
                  width: '80%',
                  paddingBottom: '80%',
                  borderRadius: '50%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }),
          }}
        />
      )}

      {/* Vertical text */}
      {verticalText && (
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[0.8rem] font-bold uppercase tracking-widest text-[var(--accent-orange)] whitespace-nowrap"
          style={{ transformOrigin: 'center' }}
        >
          {verticalText}
        </div>
      )}

      {children ? (
        children
      ) : (
        <>
          {/* Title */}
          <h2 className="text-[2.5rem] leading-[0.85] relative z-[3] mb-5 mt-10 font-extrabold uppercase tracking-tight">
            {title}<br />
            <span className="text-[var(--accent-orange)]">{subtitle}</span>
          </h2>

          {/* Product image */}
          <img
            src={image}
            alt={`${title} ${subtitle}`}
            className="absolute top-1/2 left-1/2 w-[80%] z-[2] drop-shadow-xl transition-transform duration-300"
            style={{
              transform: isHovered
                ? 'translate(-50%, -55%) scale(1.02)'
                : 'translate(-50%, -50%)',
            }}
          />

          {/* Pills */}
          {pills && (
            <div className="flex gap-2.5 mt-auto z-[3] relative">
              {pills.map((pill, idx) => (
                <div
                  key={idx}
                  className="border border-current px-4 py-1.5 rounded-full text-[0.7rem] font-bold uppercase inline-flex items-center gap-1.5"
                >
                  {pill.label}
                  {pill.color && <ColorDot color={pill.color} />}
                </div>
              ))}
            </div>
          )}

          <ArrowGraphic />
        </>
      )}
    </div>
  );
}

export function H95Card() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="col-span-4 grid-span-4 h-[600px] p-8 rounded-[var(--radius)] relative overflow-hidden flex flex-col justify-between cursor-pointer card-hover bg-[var(--card-dark)] text-[var(--text-light)]"
      style={{ transform: isHovered ? 'translateY(-5px)' : 'translateY(0)' }}
    >
      {/* Price */}
      <div className="absolute top-6 right-6 z-[4] font-mono font-semibold text-[0.9rem] text-[var(--accent-orange)]">
        $899.00
      </div>

      {/* Background text */}
      <div className="absolute top-[100px] -left-5 text-[10rem] opacity-10 font-black select-none">
        H95
      </div>

      {/* Product image */}
      <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
        alt="Beoplay H95"
        className="absolute top-1/2 left-1/2 w-[70%] z-[2] drop-shadow-xl transition-transform duration-300"
        style={{
          transform: isHovered
            ? 'translate(-50%, -55%) scale(1.02)'
            : 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="z-[3] p-8 mt-auto">
        <h2 className="text-[2.5rem] mb-2.5 font-extrabold uppercase">
          BEOPLAY H95
        </h2>
        <div className="text-[0.9rem] leading-relaxed max-w-[80%] mt-2.5 text-gray-400">
          Ultimate over-ear headphones. Moving titanium drivers and lambskin memory foam.
        </div>
        <div className="flex gap-2.5 mt-5">
          <button className="bg-white text-[var(--bg-color)] border-none px-10 py-5 font-extrabold uppercase cursor-pointer hover:bg-gray-200 transition-colors">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export function Beolit20Card() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="col-span-4 grid-span-4 h-[600px] p-8 rounded-[var(--radius)] relative overflow-hidden flex flex-col justify-between cursor-pointer card-hover border border-[var(--text-dark)]"
      style={{
        backgroundColor: '#D4D4D4',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
    >
      {/* Price */}
      <div className="absolute top-6 right-6 z-[4] font-mono font-semibold text-[0.9rem]">
        $549.00
      </div>

      {/* Circle background */}
      <div
        className="absolute bg-white z-0 rounded-full"
        style={{
          width: '80%',
          paddingBottom: '80%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="z-[3] p-8 h-full flex flex-col">
        <h2 className="text-[2.5rem] leading-[0.85] relative z-[3] mb-5 text-black font-extrabold uppercase tracking-tight">
          PORTABLE<br />POWER
        </h2>

        <img
          src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80"
          alt="Beolit 20"
          className="absolute top-[60%] left-1/2 w-[55%] z-[2] drop-shadow-xl transition-transform duration-300"
          style={{
            transform: isHovered
              ? 'translate(-50%, -55%) scale(1.02)'
              : 'translate(-50%, -50%)',
          }}
        />

        <div className="mt-auto">
          <div className="font-mono uppercase text-[0.75rem] tracking-wide mb-1">
            BEOLIT 20
          </div>
          <div className="text-[0.9rem] leading-relaxed max-w-[80%] mt-2.5 z-[3] relative">
            Big sound for every moment. Long-lasting battery, integrated wireless Qi charging.
          </div>
          <ArrowGraphic color="black" className="!left-8 !right-auto !bottom-2.5 !h-10" />
        </div>
      </div>
    </div>
  );
}
