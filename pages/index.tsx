import React, { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';

// Lazy load heavy components for better performance
const Hero = lazy(() => import('@/components/home/Hero'));
const RegionsSection = lazy(() => import('@/components/home/RegionsSection'));
const FeaturedProperties = lazy(() => import('@/components/home/FeaturedProperties'));
const CTASection = lazy(() => import('@/components/home/CTASection'));

// Loading skeleton component
const SectionSkeleton = () => (
  <div className="py-20">
    <div className="container-custom">
      <div className="animate-pulse space-y-8">
        <div className="h-12 bg-gray-200 rounded w-64 mx-auto" />
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <Layout
      title="Red Sea Valley - Premium Real Estate in Hurghada, El Gouna & More"
      description="Discover luxury properties for rent and sale in Hurghada, Sahl Hasheesh, El Gouna, and Soma Bay. Villas, apartments, and premium real estate along the Red Sea coast."
    >
      <Suspense fallback={<div className="h-[700px] bg-gray-100 animate-pulse" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <RegionsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedProperties />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-gray-100" />}>
        <CTASection />
      </Suspense>
    </Layout>
  );
}
