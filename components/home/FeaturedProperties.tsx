import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../common/PropertyCard';
import { Property } from '@/lib/types';
import { useProperties } from '@/lib/useProperties';

const FeaturedProperties: React.FC = () => {
  const { properties, loading } = useProperties();
  const featured = useMemo<Property[]>(() => {
    return properties.filter((property) => property.isFeatured).slice(0, 6);
  }, [properties]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4" />
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featured.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked selection of our finest properties along the Red Sea
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featured.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <a href="/properties" className="btn-primary inline-block">
            View All Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeaturedProperties);
