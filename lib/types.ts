export interface Property {
  id: string;
  title: string;
  label: string;
  description: string;
  region: 'Hurghada' | 'Sahl Hasheesh' | 'El Gouna' | 'Soma Bay';
  type: 'Villa' | 'Apartment' | 'Studio' | 'Shop';
  forRent: boolean;
  forSale: boolean;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  mainImage: string;
  galleryImages: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  propertyId?: string;
  createdAt: Date;
}

export interface PropertyFilters {
  type?: string;
  region?: string;
  forRent?: boolean;
  forSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  search?: string;
}
