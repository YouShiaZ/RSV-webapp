import '@/styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import { PropertiesProvider } from '@/lib/useProperties';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = 'en';
    }
  }, []);

  return (
    <PropertiesProvider>
      <Component {...pageProps} />
    </PropertiesProvider>
  );
}
