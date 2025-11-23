import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Property } from '@/lib/types';
import { propertyService } from '@/lib/propertyService';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface PropertyFormProps {
  property: Property | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  label: string;
  description: string;
  region: string;
  type: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  mainImage: string;
}

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  label: yup.string().required('Label is required'),
  description: yup.string().required('Description is required'),
  region: yup.string().required('Region is required'),
  type: yup.string().required('Type is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  currency: yup.string().required('Currency is required'),
  bedrooms: yup.number().min(0).required('Bedrooms is required'),
  bathrooms: yup.number().min(0).required('Bathrooms is required'),
  area: yup.number().positive().required('Area is required'),
  mainImage: yup.string().url('Must be a valid URL').required('Main image is required'),
});

const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSuccess, onCancel }) => {
  const [submitting, setSubmitting] = useState(false);
  const [forRent, setForRent] = useState(property?.forRent || false);
  const [forSale, setForSale] = useState(property?.forSale || false);
  const [isFeatured, setIsFeatured] = useState(property?.isFeatured || false);
  const [amenities, setAmenities] = useState<string[]>(property?.amenities || []);
  const [amenityInput, setAmenityInput] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>(property?.galleryImages || []);
  const [galleryInput, setGalleryInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: property || {
      title: '',
      label: '',
      description: '',
      region: 'Hurghada',
      type: 'Villa',
      price: 0,
      currency: 'USD',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      mainImage: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const propertyData = {
        ...data,
        region: data.region as 'Hurghada' | 'Sahl Hasheesh' | 'El Gouna' | 'Soma Bay',
        type: data.type as 'Villa' | 'Apartment' | 'Studio' | 'Shop',
        forRent,
        forSale,
        isFeatured,
        amenities,
        galleryImages,
      };

      if (property) {
        await propertyService.update(property.id, propertyData as any);
      } else {
        await propertyService.create(propertyData as any);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to save property');
    } finally {
      setSubmitting(false);
    }
  };

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput('');
    }
  };

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      setGalleryImages([...galleryImages, galleryInput.trim()]);
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {property ? 'Edit Property' : 'Add New Property'}
        </h2>
        <button onClick={onCancel} className="text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Title *</label>
            <input {...register('title')} type="text" className={`input-field ${errors.title ? 'border-red-500' : ''}`} />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="label">Label *</label>
            <input {...register('label')} type="text" className={`input-field ${errors.label ? 'border-red-500' : ''}`} />
            {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Description *</label>
          <textarea {...register('description')} rows={4} className={`input-field ${errors.description ? 'border-red-500' : ''}`} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Location & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Region *</label>
            <select {...register('region')} className="input-field">
              <option value="Hurghada">Hurghada</option>
              <option value="Sahl Hasheesh">Sahl Hasheesh</option>
              <option value="El Gouna">El Gouna</option>
              <option value="Soma Bay">Soma Bay</option>
            </select>
          </div>

          <div>
            <label className="label">Type *</label>
            <select {...register('type')} className="input-field">
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Shop">Shop / Commercial</option>
            </select>
          </div>
        </div>

        {/* Price & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Price *</label>
            <input {...register('price')} type="number" step="0.01" className={`input-field ${errors.price ? 'border-red-500' : ''}`} />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="label">Currency *</label>
            <input {...register('currency')} type="text" className="input-field" />
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="label">Bedrooms *</label>
            <input {...register('bedrooms')} type="number" className="input-field" />
          </div>

          <div>
            <label className="label">Bathrooms *</label>
            <input {...register('bathrooms')} type="number" className="input-field" />
          </div>

          <div>
            <label className="label">Area (m²) *</label>
            <input {...register('area')} type="number" className="input-field" />
          </div>
        </div>

        {/* Status Checkboxes */}
        <div>
          <label className="label">Status</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked={forRent} onChange={(e) => setForRent(e.target.checked)} className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <span className="text-gray-700">For Rent</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked={forSale} onChange={(e) => setForSale(e.target.checked)} className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <span className="text-gray-700">For Sale</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <span className="text-gray-700">Featured</span>
            </label>
          </div>
        </div>

        {/* Main Image */}
        <div>
          <label className="label">Main Image URL *</label>
          <input {...register('mainImage')} type="url" className={`input-field ${errors.mainImage ? 'border-red-500' : ''}`} placeholder="https://..." />
          {errors.mainImage && <p className="text-red-500 text-sm mt-1">{errors.mainImage.message}</p>}
        </div>

        {/* Gallery Images */}
        <div>
          <label className="label">Gallery Images</label>
          <div className="flex gap-2 mb-2">
            <input value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)} type="url" className="input-field" placeholder="Image URL" />
            <button type="button" onClick={addGalleryImage} className="btn-secondary whitespace-nowrap">Add</button>
          </div>
          {galleryImages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {galleryImages.map((img, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                  <span className="truncate max-w-xs">Image {index + 1}</span>
                  <button type="button" onClick={() => removeGalleryImage(index)} className="text-red-500 hover:text-red-700">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Amenities */}
        <div>
          <label className="label">Amenities</label>
          <div className="flex gap-2 mb-2">
            <input value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} type="text" className="input-field" placeholder="e.g., Pool, Sea View" />
            <button type="button" onClick={addAmenity} className="btn-secondary whitespace-nowrap">Add</button>
          </div>
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <div key={index} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                  <span>{amenity}</span>
                  <button type="button" onClick={() => removeAmenity(index)} className="text-primary-900 hover:text-primary-700">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {submitting ? 'Saving...' : property ? 'Update Property' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
