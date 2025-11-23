import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function RegionsPage() {
  const regions = [
    {
      name: 'Hurghada',
      description: 'The heart of Egypt\'s Red Sea Riviera, Hurghada is a vibrant resort destination known for world-class diving, pristine beaches, and an exciting nightlife. As the region\'s largest city, it offers excellent infrastructure, international schools, healthcare facilities, and a wide selection of restaurants and entertainment venues. Perfect for those seeking both luxury living and dynamic coastal lifestyle.',
      highlights: [
        'World-class diving & snorkeling',
        'Vibrant nightlife & dining',
        'International schools',
        'Modern healthcare facilities',
        'Marina & yacht clubs',
        'Year-round sunshine',
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    },
    {
      name: 'Sahl Hasheesh',
      description: 'An exclusive bay stretching along 12 km of pristine coastline, Sahl Hasheesh represents the pinnacle of luxury Red Sea living. This meticulously planned resort community features championship golf courses, luxury hotels, private villas, and a stunning award-winning marina. With its emphasis on elegance and privacy, Sahl Hasheesh attracts discerning buyers seeking ultimate refinement.',
      highlights: [
        'Award-winning marina',
        'Championship golf courses',
        'Exclusive beach clubs',
        'Luxury hotels & resorts',
        'Private villa communities',
        'Premium shopping & dining',
      ],
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80',
    },
    {
      name: 'El Gouna',
      description: 'Often called the "Venice of the Red Sea," El Gouna is a sophisticated self-contained lagoon town built on a series of islands. This award-winning destination combines European architectural charm with Egyptian warmth, offering an unparalleled lifestyle with its own marina, golf courses, hospitals, international schools, and vibrant arts scene. El Gouna is perfect for families and lifestyle seekers.',
      highlights: [
        'Lagoon-style living',
        'World-class golf courses',
        'Abu Tig Marina',
        'International community',
        'Arts & cultural events',
        'Eco-friendly development',
      ],
      image: 'https://images.unsplash.com/photo-1586105251261-72a756497a12?auto=format&fit=crop&w=1400&q=80',
    },
    {
      name: 'Soma Bay',
      description: 'A secluded peninsula paradise, Soma Bay offers 10 km of pristine private beaches in an exclusive, gated resort environment. Renowned as one of the world\'s top kitesurfing destinations, it combines thrilling water sports with serene luxury. Home to world-class hotels, golf courses, diving centers, and thalasso spa facilities, Soma Bay provides an exclusive retreat for those seeking privacy and natural beauty.',
      highlights: [
        'World-class kitesurfing',
        'Pristine private beaches',
        'Exclusive gated community',
        'Luxury resort hotels',
        'Championship golf course',
        'Thalasso spa facilities',
      ],
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=80',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Layout
      title="Regions - Red Sea Valley Real Estate"
      description="Explore luxury real estate opportunities in Hurghada, Sahl Hasheesh, El Gouna, and Soma Bay. Discover the perfect region for your Red Sea dream home."
    >
      <div className="bg-gray-50">
        {/* Hero */}
        <div className="relative h-96 bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Our Regions</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Discover the unique charm and luxury of each Red Sea destination
              </p>
            </div>
          </div>
        </div>

        {/* Regions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-custom py-16 space-y-16"
        >
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              variants={itemVariants}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                index % 2 === 0 ? 'lg:grid lg:grid-cols-2' : 'lg:grid lg:grid-cols-2'
              }`}
            >
              <div className={`relative h-96 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={region.image}
                  alt={region.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{region.name}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{region.description}</p>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Highlights:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {region.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <svg
                          className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/properties?region=${encodeURIComponent(region.name)}`}
                  className="btn-primary inline-block text-center"
                >
                  Browse {region.name} Properties
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}
