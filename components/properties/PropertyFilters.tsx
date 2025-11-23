import React, { useState, useEffect } from 'react';
import { PropertyFilters as Filters } from '@/lib/types';
import { toEnglishDigits } from '@/lib/number';

interface PropertyFiltersProps {
  onFilterChange: (filters: Filters) => void;
  initialRegion?: string;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilterChange, initialRegion }) => {
  const [filters, setFilters] = useState<Filters>({
    region: initialRegion || '',
    type: '',
    forRent: false,
    forSale: false,
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 0,
    bathrooms: 0,
    search: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (initialRegion) {
      setFilters(prev => ({ ...prev, region: initialRegion }));
    }
  }, [initialRegion]);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      region: '',
      type: '',
      forRent: false,
      forSale: false,
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: 0,
      bathrooms: 0,
      search: '',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search properties..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="input-field"
        />
      </div>

      {/* Toggle Filters Button (Mobile) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full md:hidden btn-primary mb-4"
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filters */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6`}>
        {/* Region & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Region</label>
            <select
              value={filters.region}
              onChange={(e) => handleChange('region', e.target.value)}
              className="input-field"
            >
              <option value="">All Regions</option>
              <option value="Hurghada">Hurghada</option>
              <option value="Sahl Hasheesh">Sahl Hasheesh</option>
              <option value="El Gouna">El Gouna</option>
              <option value="Soma Bay">Soma Bay</option>
            </select>
          </div>

          <div>
            <label className="label">Property Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="input-field"
            >
              <option value="">All Types</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Shop">Shop / Commercial</option>
            </select>
          </div>
        </div>

        {/* Rent / Sale */}
        <div>
          <label className="label">Availability</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.forRent || false}
                onChange={(e) => handleChange('forRent', e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-gray-700">For Rent</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.forSale || false}
                onChange={(e) => handleChange('forSale', e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-gray-700">For Sale</span>
            </label>
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Min Bedrooms</label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))}
              className="input-field"
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <label className="label">Min Bathrooms</label>
            <select
              value={filters.bathrooms}
              onChange={(e) => handleChange('bathrooms', parseInt(e.target.value))}
              className="input-field"
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="label">
            Price Range: $
            {toEnglishDigits(
              filters.minPrice !== undefined && filters.minPrice !== null
                ? new Intl.NumberFormat('en-US').format(filters.minPrice)
                : ''
            )}{' '}
            - $
            {toEnglishDigits(
              filters.maxPrice !== undefined && filters.maxPrice !== null
                ? new Intl.NumberFormat('en-US').format(filters.maxPrice)
                : ''
            )}
          </label>
          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full btn-secondary"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default React.memo(PropertyFilters);
