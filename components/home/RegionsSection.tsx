import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};


const blurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAnsB9Rr3rgkAAAAASUVORK5CYII=';

const RegionCard = memo(({ region }: { region: typeof regionsData[number] }) => (
  <motion.div variants={itemVariants}>
    <Link href={`/properties?region=${encodeURIComponent(region.name)}`}>
      <div className="card group cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={region.image}
            alt={region.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            placeholder="blur"
            blurDataURL={blurDataURL}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{region.name}</h3>
            <p className="text-sm text-gray-200 mb-4 line-clamp-2">
              {region.description}
            </p>
            <span className="inline-block text-primary-400 font-semibold group-hover:translate-x-2 transition-transform">
              View Properties &gt;
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
));

const regionsData = [
    {
      name: 'Hurghada',
      description: 'Egypt\'s premier Red Sea resort destination with vibrant nightlife and world-class diving',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Sahl Hasheesh',
      description: 'Exclusive bay with pristine beaches and luxury resorts offering ultimate relaxation',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'El Gouna',
      description: 'Sophisticated lagoon town with European charm, golf courses, and marina lifestyle',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Soma Bay',
      description: 'Exclusive peninsula offering luxury hotels, pristine beaches, and world-class kite surfing',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
    },
  ];

const RegionsSection: React.FC = React.memo(() => {
  const regions = useMemo(() => regionsData, []);
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
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Regions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium properties across the most sought-after destinations along the Red Sea coast
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {regions.map((region) => (
            <RegionCard key={region.name} region={region} />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default RegionsSection;
