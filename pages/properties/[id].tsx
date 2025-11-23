import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { Property } from '@/lib/types';
import { propertyService } from '@/lib/propertyService';
import { BedIcon, BathIcon, AreaIcon, LocationIcon, PropertyTypeIcon } from '@/components/common/Icons';

const LeadModal = lazy(() => import('@/components/properties/LeadModal'));

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useEffect(() => {
    if (id && typeof id === 'string') {
      loadProperty(id);
    }
  }, [id]);

  const loadProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      const data = await propertyService.getById(propertyId);
      setProperty(data);
    } catch (error) {
      console.error('Error loading property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/2" />
            <div className="h-96 bg-gray-200 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist.</p>
          <a href="/properties" className="btn-primary">
            Browse Properties
          </a>
        </div>
      </Layout>
    );
  }

  const allImages = [property.mainImage, ...property.galleryImages];

  return (
    <Layout
      title={`${property.title} - Red Sea Valley`}
      description={property.description}
    >
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {property.forRent && (
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  For Rent
                </span>
              )}
              {property.forSale && (
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  For Sale
                </span>
              )}
              {property.isFeatured && (
                <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{property.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{property.label}</p>
            <div className="flex items-center text-gray-600">
              <LocationIcon className="mr-2" />
              <span className="text-lg">{property.region}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Gallery */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={allImages[selectedImage]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-4 ring-primary-500' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700">
                        <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              {property.coordinates && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
                  <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Details & CTA */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                {/* Price */}
                <div className="mb-6 pb-6 border-b">
                  <div className="text-4xl font-bold text-primary-600">
                    {property.price.toLocaleString()}
                    <span className="text-xl text-gray-600 ml-2">{property.currency}</span>
                  </div>
                </div>

                {/* Key Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <PropertyTypeIcon type={property.type} />
                      <span>Type</span>
                    </div>
                    <span className="font-semibold text-gray-800">{property.type}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <BedIcon />
                      <span>Bedrooms</span>
                    </div>
                    <span className="font-semibold text-gray-800">{property.bedrooms}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <BathIcon />
                      <span>Bathrooms</span>
                    </div>
                    <span className="font-semibold text-gray-800">{property.bathrooms}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <AreaIcon />
                      <span>Area</span>
                    </div>
                    <span className="font-semibold text-gray-800">{property.area} m²</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setLeadModalOpen(true)}
                  className="w-full btn-primary mb-4"
                >
                  I'm Interested
                </button>

                {/* Contact Info */}
                <div className="text-center text-sm text-gray-600">
                  <p>Or contact us directly</p>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '201224470757'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    WhatsApp
                  </a>
                  {' · '}
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL || 'mafdyzakaria2050@gmail.com'}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Modal */}
      <Suspense fallback={null}>
        <LeadModal
          isOpen={leadModalOpen}
          onClose={() => setLeadModalOpen(false)}
          propertyId={property.id}
          propertyTitle={property.title}
        />
      </Suspense>
    </Layout>
  );
}
