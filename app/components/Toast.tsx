'use client';

import { create } from 'zustand';
import { useEffect } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    // Auto remove after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'error': return '#f44336';
      case 'info': return '#2196F3';
      default: return '#4CAF50';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 100,
      right: 20,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: '15px 20px',
            background: getColor(toast.type),
            color: 'white',
            borderRadius: 8,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            minWidth: 250,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'slideIn 0.3s ease',
          }}
        >
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.2rem',
              opacity: 0.7,
            }}
          >
            ×
          </button>
        </div>
      ))}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
