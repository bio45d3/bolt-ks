'use client';

import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="nav-blend fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-10 py-6 text-white">
      <Link href="/" className="font-black text-2xl tracking-tight">
        BANG & OLUFSEN
      </Link>
      
      <div className="flex gap-8">
        <Link 
          href="/" 
          className="text-white no-underline uppercase font-bold text-[0.8rem] hover:opacity-70 transition-opacity"
        >
          Speakers
        </Link>
        <Link 
          href="/headphones" 
          className="text-white no-underline uppercase font-bold text-[0.8rem] hover:opacity-70 transition-opacity"
        >
          Headphones
        </Link>
        <Link 
          href="/televisions" 
          className="text-white no-underline uppercase font-bold text-[0.8rem] hover:opacity-70 transition-opacity"
        >
          Televisions
        </Link>
        <Link 
          href="/support" 
          className="text-white no-underline uppercase font-bold text-[0.8rem] hover:opacity-70 transition-opacity"
        >
          Support
        </Link>
      </div>
    </nav>
  );
}
