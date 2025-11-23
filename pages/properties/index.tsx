import React, { useState, useMemo, useCallback, memo } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyCard from '@/components/common/PropertyCard';
import { useProperties } from '@/lib/useProperties';
import { PropertyFilters as Filters, Property } from '@/lib/types';
import { toEnglishDigits } from '@/lib/number';

export default function PropertiesPage() {
  const router = useRouter();
  const { properties, loading, error } = useProperties();
  const [filters, setFilters] = useState<Filters>({});

  // Get initial region from query params
  const initialRegion = useMemo(() => {
    return router.query.region as string | undefined;
  }, [router.query.region]);

  // Filter properties based on filters
  const filteredProperties = useMemo(() => {
    return properties.filter((property: Property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          property.title.toLowerCase().includes(searchLower) ||
          property.label.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower) ||
          property.region.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Region filter
      if (filters.region && property.region !== filters.region) return false;

      // Type filter
      if (filters.type && property.type !== filters.type) return false;

      // Rent/Sale filter
      if (filters.forRent && !property.forRent) return false;
      if (filters.forSale && !property.forSale) return false;

      // Price filter
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;

      // Bedrooms filter
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;

      // Bathrooms filter
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;

      return true;
    });
  }, [properties, filters]);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  if (error) {
    return (
      <Layout title="Properties - Red Sea Valley">
        <div className="container-custom py-20">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold">Error loading properties</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Properties - Red Sea Valley Real Estate"
      description="Browse our collection of luxury villas, apartments, and properties for rent and sale in Hurghada, Sahl Hasheesh, El Gouna, and Soma Bay."
    >
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Explore Our Properties
            </h1>
            <p className="text-lg text-gray-600">
            {loading
                ? 'Loading properties...'
                : `${toEnglishDigits(new Intl.NumberFormat('en-US').format(filteredProperties.length))} ${filteredProperties.length === 1 ? 'property' : 'properties'} available`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <PropertyFilters
                onFilterChange={handleFilterChange}
                initialRegion={initialRegion}
              />
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md animate-pulse">
                      <div className="h-64 bg-gray-200" />
                      <div className="p-5 space-y-3">
                        <div className="h-6 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <svg
                    className="w-24 h-24 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <button
                    onClick={() => setFilters({})}
                    className="btn-primary"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property: Property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
