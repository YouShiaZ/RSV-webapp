import '@/styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import { PropertiesProvider } from '@/lib/useProperties';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PropertiesProvider>
      <Component {...pageProps} />
    </PropertiesProvider>
  );
}
