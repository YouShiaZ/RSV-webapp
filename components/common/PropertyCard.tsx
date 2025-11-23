import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/lib/types';
import { BedIcon, BathIcon, AreaIcon, LocationIcon, PropertyTypeIcon } from './Icons';
import { toEnglishDigits } from '@/lib/number';

interface PropertyCardProps {
  property: Property;
}

const PropertyCardComponent: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/properties/${property.id}`} className="card group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.mainImage}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={false}
        />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.forRent && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              For Rent
            </span>
          )}
          {property.forSale && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              For Sale
            </span>
          )}
          {property.isFeatured && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {property.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
          {property.label}
        </p>

        <div className="flex items-center text-gray-600 mb-3">
          <LocationIcon className="w-6 h-6 text-gray-500 mr-2" />
          <span className="text-sm">{property.region}</span>
        </div>

        <div className="flex items-center justify-between mb-4 text-gray-700">
          <div className="flex items-center space-x-1" title="Bedrooms">
            <BedIcon />
            <span className="text-sm font-medium">{toEnglishDigits(property.bedrooms)}</span>
          </div>
          <div className="flex items-center space-x-1" title="Bathrooms">
            <BathIcon />
            <span className="text-sm font-medium">{toEnglishDigits(property.bathrooms)}</span>
          </div>
          <div className="flex items-center space-x-1" title="Area">
            <AreaIcon />
            <span className="text-sm font-medium">{toEnglishDigits(property.area)} sqm</span>
          </div>
          <div className="flex items-center space-x-1" title={property.type}>
            <PropertyTypeIcon type={property.type} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              {toEnglishDigits(new Intl.NumberFormat('en-US').format(property.price))}
            </span>
            <span className="text-sm text-gray-600 ml-1">{property.currency}</span>
          </div>
          <span className="text-primary-600 font-semibold group-hover:translate-x-1 transition-transform">
            View Details &gt;
          </span>
        </div>
      </div>
    </Link>
  );
};

const PropertyCard = React.memo(
  PropertyCardComponent,
  (prev, next) =>
    prev.property.id === next.property.id &&
    prev.property.price === next.property.price &&
    prev.property.updatedAt?.valueOf() === next.property.updatedAt?.valueOf()
);

export default PropertyCard;
