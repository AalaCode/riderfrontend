'use client';

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    // Check karein ke browser service worker ko support karta hai ya nahi
    if ('serviceWorker' in navigator) {
      const handleLoad = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      };

      // Jab window poori load ho jaye tab register karein
      window.addEventListener('load', handleLoad);

      // Cleanup event listener
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Yeh component screen par kuch render nahi karega, bas background mein kaam karega
  return null;
}
