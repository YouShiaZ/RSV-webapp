import React, { useMemo, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => mod.SwiperSlide),
  { ssr: false }
);

const slidesData = [
  {
    image: 'https://images.unsplash.com/photo-1600585154154-8f44c12d3f32?auto=format&fit=crop&w=1200&q=80',
    title: 'Luxury Villas by the Red Sea',
    subtitle: 'Discover your dream home in paradise',
  },
  {
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    title: 'Beachfront Living at Its Finest',
    subtitle: 'Wake up to stunning sea views every day',
  },
  {
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
    title: 'Modern Design Meets Coastal Charm',
    subtitle: 'Premium properties in exclusive locations',
  },
  {
    image: 'https://images.unsplash.com/photo-1518733057094-95b53151d6d3?auto=format&fit=crop&w=1200&q=80',
    title: 'Your Gateway to Red Sea Lifestyle',
    subtitle: "Experience luxury living in Egypt's finest resorts",
  },
];

const blurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAnsB9Rr3rgkAAAAASUVORK5CYII=';

const swiperModules = [Navigation, Pagination, Autoplay];

const Hero: React.FC = React.memo(() => {
  const slides = useMemo(() => slidesData, []);
  const handleSwiper = useCallback(() => {}, []);
  const handleSlideChange = useCallback(() => {}, []);

  return (
    <div className="relative h-[600px] lg:h-[700px]">
      <Swiper
        modules={swiperModules}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full"
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurDataURL}
                sizes="100vw"
                priority={index === 0}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-white"
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a href="/properties" className="btn-primary">
                        Browse Properties
                      </a>
                      <a href="/contact" className="btn-secondary bg-white/90 hover:bg-white border-white">
                        Contact Us
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default Hero;
