'use client';

import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="col-span-12 p-[60px] flex flex-row items-center rounded-[var(--radius)] bg-[var(--card-dark)] text-[var(--text-light)] gap-10">
      <div className="flex-1">
        <div className="font-mono uppercase text-[0.75rem] tracking-wide text-[var(--accent-orange)]">
          NEWSLETTER
        </div>
        <h2 className="text-[4vw] mt-5 font-extrabold uppercase leading-[0.9] tracking-tight">
          JOIN THE<br />AUDIOPHILE CLUB
        </h2>
      </div>
      
      <div className="flex-1 flex gap-5 items-center justify-end">
        <input
          type="email"
          placeholder="ENTER EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border border-gray-700 p-5 text-white w-[300px] font-mono uppercase outline-none focus:border-[var(--accent-orange)] transition-colors"
        />
        <button
          onClick={handleSubscribe}
          className="border-none px-10 py-5 font-extrabold uppercase cursor-pointer transition-colors text-white"
          style={{
            backgroundColor: subscribed ? '#4CAF50' : 'var(--accent-orange)',
          }}
        >
          {subscribed ? 'SUBSCRIBED!' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
}
